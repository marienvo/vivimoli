import { createMachine } from "xstate";

export const simMachine = createMachine({
  id: "sim",
  initial: "running",
  states: {
    running: {
      on: {
        PAUSE: "paused",
      },
    },
    paused: {
      on: {
        RESUME: "running",
      },
    },
  },
});
