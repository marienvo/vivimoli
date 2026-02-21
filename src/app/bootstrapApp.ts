import { createTimeAdapter } from "@adapters/time/performanceTimeAdapter";
import { createEngine } from "@engine/public";
import { createRenderer } from "@render/public";
import { mountUi } from "@ui/public";

export function bootstrapApp(): void {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Missing #root mount element.");
  }

  const time = createTimeAdapter();
  const engine = createEngine({ time });
  const renderer = createRenderer({ root, engine });
  const unmountUi = mountUi({ root, engine });

  let last = time.now();
  let frameHandle = 0;

  const frame = (): void => {
    const now = time.now();
    const deltaMs = now - last;
    last = now;

    engine.tick(deltaMs);
    renderer.sync();

    frameHandle = requestAnimationFrame(frame);
  };

  frameHandle = requestAnimationFrame(frame);

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(frameHandle);
    renderer.destroy();
    unmountUi();
  });
}
