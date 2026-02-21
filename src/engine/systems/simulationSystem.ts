import type { EngineMutableState } from "@engine/state";

export function simulationSystem(state: EngineMutableState, fixedDeltaMs: number): void {
  state.lastStepMs = fixedDeltaMs;
}
