import type { EngineReadModel } from "@engine/public";

export function syncDebugOverlay(model: EngineReadModel, target: HTMLElement): void {
  target.textContent = `tick=${model.tick} speed=${model.simSpeed.toFixed(2)} paused=${model.paused}`;
}
