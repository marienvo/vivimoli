export type PanHandlerOptions = {
  target: HTMLElement;
  onPan: (deltaScreenX: number, deltaScreenY: number) => void;
};

export function attachPanHandler({ target, onPan }: PanHandlerOptions): () => void {
  let activePointerId: number | null = null;
  let lastX = 0;
  let lastY = 0;

  target.style.touchAction = "none";
  target.style.cursor = "grab";

  const onPointerDown = (event: PointerEvent): void => {
    activePointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    target.style.cursor = "grabbing";
    target.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (activePointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    onPan(dx, dy);
  };

  const onPointerEnd = (event: PointerEvent): void => {
    if (activePointerId !== event.pointerId) {
      return;
    }
    activePointerId = null;
    target.style.cursor = "grab";
    target.releasePointerCapture(event.pointerId);
  };

  target.addEventListener("pointerdown", onPointerDown);
  target.addEventListener("pointermove", onPointerMove);
  target.addEventListener("pointerup", onPointerEnd);
  target.addEventListener("pointercancel", onPointerEnd);

  return () => {
    target.removeEventListener("pointerdown", onPointerDown);
    target.removeEventListener("pointermove", onPointerMove);
    target.removeEventListener("pointerup", onPointerEnd);
    target.removeEventListener("pointercancel", onPointerEnd);
    target.style.cursor = "";
    target.style.touchAction = "";
  };
}
