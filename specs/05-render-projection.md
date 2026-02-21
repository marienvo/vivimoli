# Render Projection

Render leest uitsluitend engine read-model/snapshots.

## Rules

- Geen game logic in render loop.
- Render sync is idempotent op basis van read-model.
