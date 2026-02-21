import type { EngineApi } from "@engine/public";
import { GameHud } from "@ui/components/GameHud";
import { useEffect, useRef } from "react";

type AppShellProps = {
  engine: EngineApi;
  onCanvasHostReady: (element: HTMLDivElement) => void;
};

export function AppShell({ engine, onCanvasHostReady }: AppShellProps) {
  const canvasHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (host) {
      onCanvasHostReady(host);
    }
  }, [onCanvasHostReady]);

  return (
    <div className="app-shell">
      <aside className="sidebar sidebar-left">
        <h2 className="sidebar-title">Controls</h2>
        <GameHud className="hud" engine={engine} />
      </aside>

      <main className="canvas-area">
        <div className="canvas-host" ref={canvasHostRef} />
        <div className="mobile-overlay">
          <GameHud className="hud hud-mobile" engine={engine} />
        </div>
      </main>

      <aside className="sidebar sidebar-right">
        <h2 className="sidebar-title">Panels</h2>
        <p className="sidebar-placeholder">Space for menus, tooltips and inspectors.</p>
      </aside>
    </div>
  );
}
