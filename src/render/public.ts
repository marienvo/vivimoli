import type { EngineApi } from "@engine/public";
import { applyPan, clampCamera, computeAutoZoom, type CameraState } from "@render/camera";
import { attachPanHandler } from "@render/input/panHandler";
import { createPixiRoot } from "@render/pixi/createPixiRoot";
import { syncDebugOverlay } from "@render/sync/syncDebugOverlay";
import { syncTileGrid } from "@render/sync/syncTileGrid";

export type RendererDependencies = {
  host: HTMLElement;
  engine: EngineApi;
};

export type RendererApi = {
  sync: () => void;
  destroy: () => void;
};

export async function createRenderer({ host, engine }: RendererDependencies): Promise<RendererApi> {
  const pixiRoot = await createPixiRoot(host);
  const debugLine = document.createElement("div");
  debugLine.dataset.role = "render-debug";
  debugLine.style.position = "absolute";
  debugLine.style.left = "8px";
  debugLine.style.bottom = "8px";
  debugLine.style.fontFamily = "monospace";
  debugLine.style.fontSize = "12px";
  debugLine.style.color = "#e5e7eb";
  pixiRoot.host.append(debugLine);

  let camera: CameraState = {
    offsetX: 0,
    offsetY: 0,
    zoom: computeAutoZoom(window.innerWidth),
  };

  const updateCameraForBounds = (): void => {
    const model = engine.getReadModel();
    camera = clampCamera(camera, {
      mapCols: model.mapCols,
      mapRows: model.mapRows,
      tileSizePx: model.tileSizePx,
      viewportWidth: pixiRoot.host.clientWidth,
      viewportHeight: pixiRoot.host.clientHeight,
    });
  };

  const detachPan = attachPanHandler({
    target: pixiRoot.app.canvas,
    onPan(dx, dy) {
      const model = engine.getReadModel();
      camera = applyPan(camera, dx, dy, {
        mapCols: model.mapCols,
        mapRows: model.mapRows,
        tileSizePx: model.tileSizePx,
        viewportWidth: pixiRoot.host.clientWidth,
        viewportHeight: pixiRoot.host.clientHeight,
      });
    },
  });

  const resizeObserver = new ResizeObserver(() => {
    const width = pixiRoot.host.clientWidth;
    const height = pixiRoot.host.clientHeight;
    if (width <= 0 || height <= 0) {
      return;
    }

    camera = {
      ...camera,
      zoom: computeAutoZoom(window.innerWidth),
    };
    updateCameraForBounds();
  });
  resizeObserver.observe(pixiRoot.host);

  return {
    sync() {
      const model = engine.getReadModel();
      const viewportWidth = pixiRoot.host.clientWidth;
      const viewportHeight = pixiRoot.host.clientHeight;
      if (viewportWidth <= 0 || viewportHeight <= 0) {
        return;
      }

      camera = clampCamera(camera, {
        mapCols: model.mapCols,
        mapRows: model.mapRows,
        tileSizePx: model.tileSizePx,
        viewportWidth,
        viewportHeight,
      });

      pixiRoot.worldLayer.scale.set(camera.zoom);
      pixiRoot.worldLayer.position.set(
        -camera.offsetX * camera.zoom,
        -camera.offsetY * camera.zoom,
      );

      syncTileGrid({
        graphics: pixiRoot.gridGraphics,
        camera,
        viewportWidth,
        viewportHeight,
        mapCols: model.mapCols,
        mapRows: model.mapRows,
        tileSizePx: model.tileSizePx,
      });
      syncDebugOverlay(model, debugLine);
    },
    destroy() {
      resizeObserver.disconnect();
      detachPan();
      debugLine.remove();
      pixiRoot.app.destroy(true, { children: true });
    },
  };
}
