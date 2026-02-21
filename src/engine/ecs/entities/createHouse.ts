import type { TransformComponent } from "@engine/ecs/components/TransformComponent";

export type House = {
  id: number;
  transform: TransformComponent;
};

export function createHouse(id: number, x: number, y: number): House {
  return {
    id,
    transform: { x, y },
  };
}
