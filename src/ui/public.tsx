import type { EngineApi } from "@engine/public";
import { AppShell } from "@ui/components/AppShell";
import "@ui/styles.css";
import { createRoot } from "react-dom/client";

export type UiDependencies = {
  root: HTMLElement;
  engine: EngineApi;
};

export type MountedUi = {
  canvasHost: HTMLDivElement;
  unmount: () => void;
};

export async function mountUi({ root, engine }: UiDependencies): Promise<MountedUi> {
  root.textContent = "";

  const container = document.createElement("div");
  container.dataset.role = "ui-root";
  container.style.width = "100%";
  container.style.height = "100%";
  root.append(container);

  const reactRoot = createRoot(container);

  return new Promise<MountedUi>((resolve) => {
    reactRoot.render(
      <AppShell
        engine={engine}
        onCanvasHostReady={(canvasHost) => {
          resolve({
            canvasHost,
            unmount: () => {
              reactRoot.unmount();
              container.remove();
            },
          });
        }}
      />,
    );
  });
}
