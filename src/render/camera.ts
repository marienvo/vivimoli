export type CameraState = {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

export type CameraBoundsInput = {
  mapCols: number;
  mapRows: number;
  tileSizePx: number;
  viewportWidth: number;
  viewportHeight: number;
};

export function computeAutoZoom(viewportWidth: number): number {
  if (viewportWidth >= 1024) {
    return 1;
  }
  if (viewportWidth >= 768) {
    return 0.875;
  }
  return 0.75;
}

export function clampCamera(camera: CameraState, input: CameraBoundsInput): CameraState {
  const worldWidth = input.mapCols * input.tileSizePx;
  const worldHeight = input.mapRows * input.tileSizePx;
  const visibleWidth = input.viewportWidth / camera.zoom;
  const visibleHeight = input.viewportHeight / camera.zoom;
  const maxOffsetX = Math.max(0, worldWidth - visibleWidth);
  const maxOffsetY = Math.max(0, worldHeight - visibleHeight);

  return {
    ...camera,
    offsetX: clamp(camera.offsetX, 0, maxOffsetX),
    offsetY: clamp(camera.offsetY, 0, maxOffsetY),
  };
}

export function applyPan(
  camera: CameraState,
  deltaScreenX: number,
  deltaScreenY: number,
  input: CameraBoundsInput,
): CameraState {
  const next: CameraState = {
    ...camera,
    offsetX: camera.offsetX - deltaScreenX / camera.zoom,
    offsetY: camera.offsetY - deltaScreenY / camera.zoom,
  };

  return clampCamera(next, input);
}

export function setAutoZoom(
  camera: CameraState,
  viewportWidth: number,
  input: CameraBoundsInput,
): CameraState {
  const next: CameraState = {
    ...camera,
    zoom: computeAutoZoom(viewportWidth),
  };
  return clampCamera(next, input);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
