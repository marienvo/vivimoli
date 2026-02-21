import type { CameraState } from "@render/camera";
import { calculateVisibleTileRange } from "@render/sync/syncTileGrid";
import { describe, expect, it } from "vitest";

describe("calculateVisibleTileRange", () => {
  it("returns a clamped range with culling margins", () => {
    const camera: CameraState = {
      offsetX: 160,
      offsetY: 96,
      zoom: 1,
    };

    const range = calculateVisibleTileRange(camera, 320, 192, 128, 128, 32);

    expect(range).toEqual({
      startCol: 4,
      endCol: 16,
      startRow: 2,
      endRow: 10,
    });
  });

  it("clamps near world edges", () => {
    const camera: CameraState = {
      offsetX: 0,
      offsetY: 0,
      zoom: 0.75,
    };

    const range = calculateVisibleTileRange(camera, 300, 240, 8, 8, 32);

    expect(range.startCol).toBe(0);
    expect(range.startRow).toBe(0);
    expect(range.endCol).toBe(7);
    expect(range.endRow).toBe(7);
  });
});
