import { Application, Container, Graphics } from "pixi.js";

export type PixiRoot = {
  host: HTMLElement;
  app: Application;
  worldLayer: Container;
  gridGraphics: Graphics;
};

export async function createPixiRoot(host: HTMLElement): Promise<PixiRoot> {
  host.dataset.renderer = "pixi-root";
  host.style.position = "relative";
  host.style.overflow = "hidden";

  const app = new Application();
  await app.init({
    resizeTo: host,
    background: "#0b1220",
    antialias: false,
    autoDensity: true,
  });

  const canvas = app.canvas;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  host.append(canvas);

  const worldLayer = new Container();
  const gridGraphics = new Graphics();
  worldLayer.addChild(gridGraphics);
  app.stage.addChild(worldLayer);

  return {
    host,
    app,
    worldLayer,
    gridGraphics,
  };
}
