# Repository Rules

- Engine is pure: `src/engine/**` gebruikt geen browser API's en importeert geen `ui`/`render`.
- UI gebruikt engine alleen via `src/engine/public.ts`.
- Render bevat geen gameplay logic; alleen visual synchronisatie.
- Zustand bevat alleen UI/debug/sim-control state, nooit per-frame ECS data.
- Systems eindigen op `*System.ts`.
- Commands zijn discriminated unions in `src/engine/commands/`.
- Entity factories staan in `src/engine/ecs/entities/` (`createHouse`, `createNpc`, etc.).
- Gebruik alleen named exports (geen default exports).
- Prefer imports via `*/public.ts` entrypoints.
- Geen circular imports.
- Nieuwe system vereist debug hook/snapshot plus UI debug toggle.
- Bij relevante wijzigingen: update `specs/`.
- Bij architectuurkeuzes: update `adr/`.
