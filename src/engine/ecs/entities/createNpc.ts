import type { TransformComponent } from "@engine/ecs/components/TransformComponent";

export type Npc = {
  id: number;
  transform: TransformComponent;
};

export function createNpc(id: number, x: number, y: number): Npc {
  return {
    id,
    transform: { x, y },
  };
}
