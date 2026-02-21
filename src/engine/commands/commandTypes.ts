export type EngineCommand =
  | { type: "sim/start" }
  | { type: "sim/pause" }
  | { type: "sim/setSpeed"; speed: number }
  | { type: "debug/toggleOverlay"; enabled: boolean };
