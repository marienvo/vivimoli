import type { EngineApi } from "@engine/public";
import { useUiStore } from "@ui/state/uiStore";

type GameHudProps = {
  engine: EngineApi;
  className?: string;
};

export function GameHud({ engine, className }: GameHudProps) {
  const showDebugOverlay = useUiStore((state) => state.showDebugOverlay);
  const setShowDebugOverlay = useUiStore((state) => state.setShowDebugOverlay);
  const simPaused = useUiStore((state) => state.simPaused);
  const setSimPaused = useUiStore((state) => state.setSimPaused);

  return (
    <div className={className}>
      <button
        className="hud-button"
        onClick={() => {
          const next = !simPaused;
          setSimPaused(next);
          engine.dispatch({ type: next ? "sim/pause" : "sim/start" });
        }}
      >
        {simPaused ? "Resume sim" : "Pause sim"}
      </button>
      <button
        className="hud-button"
        onClick={() => {
          const next = !showDebugOverlay;
          setShowDebugOverlay(next);
          engine.dispatch({ type: "debug/toggleOverlay", enabled: next });
        }}
      >
        {showDebugOverlay ? "Hide debug" : "Show debug"}
      </button>
    </div>
  );
}
