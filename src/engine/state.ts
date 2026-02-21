import type { EngineCommand } from "@engine/commands/commandTypes";
import type { DebugSnapshot } from "@engine/debug/debugSnapshot";

export type EngineReadModel = {
  tick: number;
  simSpeed: number;
  paused: boolean;
};

export type EngineMutableState = {
  accumulatorMs: number;
  fixedStepMs: number;
  lastStepMs: number;
  tick: number;
  simSpeed: number;
  paused: boolean;
  debugOverlayEnabled: boolean;
};

export function createInitialEngineState(): EngineMutableState {
  return {
    accumulatorMs: 0,
    fixedStepMs: 1000 / 60,
    lastStepMs: 0,
    tick: 0,
    simSpeed: 1,
    paused: false,
    debugOverlayEnabled: false,
  };
}

export function reduceCommand(state: EngineMutableState, command: EngineCommand): void {
  if (command.type === "sim/start") {
    state.paused = false;
    return;
  }
  if (command.type === "sim/pause") {
    state.paused = true;
    return;
  }
  if (command.type === "sim/setSpeed") {
    state.simSpeed = command.speed;
    return;
  }
  state.debugOverlayEnabled = command.enabled;
}

export function toReadModel(state: EngineMutableState): EngineReadModel {
  return {
    tick: state.tick,
    simSpeed: state.simSpeed,
    paused: state.paused,
  };
}

export function toDebugSnapshot(state: EngineMutableState, systemCount: number): DebugSnapshot {
  return {
    systemCount,
    tick: state.tick,
    simSpeed: state.simSpeed,
    overlayEnabled: state.debugOverlayEnabled,
  };
}
