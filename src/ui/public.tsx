import type { EngineApi } from "@engine/public";
import { GameHud } from "@ui/components/GameHud";
import { createRoot } from "react-dom/client";

export type UiDependencies = {
  root: HTMLElement;
  engine: EngineApi;
};

export function mountUi({ root, engine }: UiDependencies): () => void {
  const container = document.createElement("div");
  container.dataset.role = "ui-root";
  container.style.position = "absolute";
  container.style.inset = "0";
  container.style.pointerEvents = "none";
  root.append(container);

  const interactiveLayer = document.createElement("div");
  interactiveLayer.style.pointerEvents = "auto";
  container.append(interactiveLayer);

  const reactRoot = createRoot(interactiveLayer);
  reactRoot.render(<GameHud engine={engine} />);

  return () => {
    reactRoot.unmount();
    container.remove();
  };
}
