export type PixiRoot = {
  container: HTMLDivElement;
  canvasHost: HTMLDivElement;
};

export function createPixiRoot(root: HTMLElement): PixiRoot {
  const container = document.createElement("div");
  container.dataset.role = "render-root";
  container.style.position = "absolute";
  container.style.inset = "0";
  container.style.pointerEvents = "none";

  const canvasHost = document.createElement("div");
  canvasHost.dataset.renderer = "pixi-placeholder";
  container.append(canvasHost);
  root.append(container);

  return { container, canvasHost };
}
