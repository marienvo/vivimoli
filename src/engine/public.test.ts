import { describe, expect, it } from "vitest";
import { createEngine } from "@engine/public";

describe("engine fixed timestep", () => {
  it("advances exactly one tick per fixed step", () => {
    const engine = createEngine({
      time: { now: () => 0 },
    });

    engine.tick(1000 / 120);
    expect(engine.getReadModel().tick).toBe(0);

    engine.tick(1000 / 120);
    expect(engine.getReadModel().tick).toBe(1);
  });
});
