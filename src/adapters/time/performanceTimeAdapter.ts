import type { TimePort } from "@engine/ports/timePort";

export function createTimeAdapter(): TimePort {
  return {
    now() {
      return performance.now();
    },
  };
}
