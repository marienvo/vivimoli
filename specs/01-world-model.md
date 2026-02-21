# World Model

## Scope

Definieert invarianten, mutatieregels en ownership van de game world.

## Invariants

- Engine world is single source of truth.
- UI stores bevatten geen per-frame ECS component data.
- Alle writes lopen via commands.
