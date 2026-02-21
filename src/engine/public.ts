import type { EngineCommand } from "@engine/commands/commandTypes";
import type { DebugSnapshot } from "@engine/debug/debugSnapshot";
import type { TimePort } from "@engine/ports/timePort";
import {
  createInitialEngineState,
  reduceCommand,
  toDebugSnapshot,
  toReadModel,
} from "@engine/state";
import { simulationSystem } from "@engine/systems/simulationSystem";
export type { EngineReadModel } from "@engine/state";
import type { EngineReadModel } from "@engine/state";

export type EngineDependencies = {
  time: TimePort;
};

export type EngineApi = {
  dispatch: (command: EngineCommand) => void;
  tick: (deltaMs: number) => void;
  getReadModel: () => EngineReadModel;
  getDebugSnapshot: () => DebugSnapshot;
};

export function createEngine(_deps: EngineDependencies): EngineApi {
  const state = createInitialEngineState();
  const systems = [simulationSystem];

  return {
    dispatch(command) {
      reduceCommand(state, command);
    },
    tick(deltaMs) {
      if (state.paused) {
        return;
      }

      state.accumulatorMs += deltaMs * state.simSpeed;
      while (state.accumulatorMs >= state.fixedStepMs) {
        for (const runSystem of systems) {
          runSystem(state, state.fixedStepMs);
        }

        state.tick += 1;
        state.accumulatorMs -= state.fixedStepMs;
      }
    },
    getReadModel() {
      return toReadModel(state);
    },
    getDebugSnapshot() {
      return toDebugSnapshot(state, systems.length);
    },
  };
}
