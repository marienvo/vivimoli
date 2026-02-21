import { createTimeAdapter } from "@adapters/time/performanceTimeAdapter";
import { createEngine } from "@engine/public";
import { createRenderer } from "@render/public";
import { mountUi } from "@ui/public";

export async function bootstrapApp(): Promise<void> {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Missing #root mount element.");
  }

  const time = createTimeAdapter();
  const engine = createEngine({ time });
  const mountedUi = await mountUi({ root, engine });
  const renderer = await createRenderer({ host: mountedUi.canvasHost, engine });

  let last = time.now();
  let frameHandle = 0;
  let active = true;

  const frame = (): void => {
    if (!active) {
      return;
    }
    const now = time.now();
    const deltaMs = now - last;
    last = now;

    engine.tick(deltaMs);
    renderer.sync();

    frameHandle = requestAnimationFrame(frame);
  };

  frameHandle = requestAnimationFrame(frame);

  const onBeforeUnload = (): void => {
    active = false;
    cancelAnimationFrame(frameHandle);
    renderer.destroy();
    mountedUi.unmount();
    window.removeEventListener("beforeunload", onBeforeUnload);
  };
  window.addEventListener("beforeunload", onBeforeUnload);
}
