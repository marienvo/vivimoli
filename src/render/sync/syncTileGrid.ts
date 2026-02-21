import type { CameraState } from "@render/camera";

export type TileGridGraphics = {
  clear: () => void;
  rect: (x: number, y: number, width: number, height: number) => TileGridGraphics;
  fill: (color: number) => TileGridGraphics;
  stroke: (style: { color: number; width: number; alpha: number }) => TileGridGraphics;
};

export type TileGridSyncInput = {
  graphics: TileGridGraphics;
  camera: CameraState;
  viewportWidth: number;
  viewportHeight: number;
  mapCols: number;
  mapRows: number;
  tileSizePx: number;
};

export type VisibleTileRange = {
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
};

export function calculateVisibleTileRange(
  camera: CameraState,
  viewportWidth: number,
  viewportHeight: number,
  mapCols: number,
  mapRows: number,
  tileSizePx: number,
): VisibleTileRange {
  const worldLeft = camera.offsetX;
  const worldTop = camera.offsetY;
  const worldRight = worldLeft + viewportWidth / camera.zoom;
  const worldBottom = worldTop + viewportHeight / camera.zoom;

  const startCol = clampInt(Math.floor(worldLeft / tileSizePx) - 1, 0, mapCols - 1);
  const endCol = clampInt(Math.ceil(worldRight / tileSizePx) + 1, 0, mapCols - 1);
  const startRow = clampInt(Math.floor(worldTop / tileSizePx) - 1, 0, mapRows - 1);
  const endRow = clampInt(Math.ceil(worldBottom / tileSizePx) + 1, 0, mapRows - 1);

  return { startCol, endCol, startRow, endRow };
}

export function syncTileGrid(input: TileGridSyncInput): void {
  const { graphics, camera, viewportWidth, viewportHeight, mapCols, mapRows, tileSizePx } = input;
  const visible = calculateVisibleTileRange(
    camera,
    viewportWidth,
    viewportHeight,
    mapCols,
    mapRows,
    tileSizePx,
  );
  const light = 0x334155;
  const dark = 0x1e293b;
  const strokeColor = 0x475569;

  graphics.clear();

  for (let row = visible.startRow; row <= visible.endRow; row += 1) {
    for (let col = visible.startCol; col <= visible.endCol; col += 1) {
      const x = col * tileSizePx;
      const y = row * tileSizePx;
      const isEven = (col + row) % 2 === 0;
      const color = isEven ? light : dark;

      graphics.rect(x, y, tileSizePx, tileSizePx).fill(color).stroke({
        color: strokeColor,
        width: 1,
        alpha: 0.45,
      });
    }
  }
}

function clampInt(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
}
