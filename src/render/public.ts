import type { EngineApi } from "@engine/public";
import { createPixiRoot } from "@render/pixi/createPixiRoot";
import { syncDebugOverlay } from "@render/sync/syncDebugOverlay";

export type RendererDependencies = {
  root: HTMLElement;
  engine: EngineApi;
};

export type RendererApi = {
  sync: () => void;
  destroy: () => void;
};

export function createRenderer({ root, engine }: RendererDependencies): RendererApi {
  const pixiRoot = createPixiRoot(root);
  const debugLine = document.createElement("div");
  debugLine.dataset.role = "render-debug";
  debugLine.style.position = "absolute";
  debugLine.style.left = "8px";
  debugLine.style.bottom = "8px";
  debugLine.style.fontFamily = "monospace";
  debugLine.style.fontSize = "12px";
  debugLine.style.color = "#e5e7eb";
  pixiRoot.container.append(debugLine);

  return {
    sync() {
      syncDebugOverlay(engine.getReadModel(), debugLine);
    },
    destroy() {
      pixiRoot.container.remove();
    },
  };
}
