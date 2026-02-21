import { create } from "zustand";

export type UiState = {
  selectedTool: "inspect" | "paint";
  showDebugOverlay: boolean;
  simPaused: boolean;
  setSelectedTool: (tool: UiState["selectedTool"]) => void;
  setShowDebugOverlay: (show: boolean) => void;
  setSimPaused: (paused: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  selectedTool: "inspect",
  showDebugOverlay: false,
  simPaused: false,
  setSelectedTool: (selectedTool) => set({ selectedTool }),
  setShowDebugOverlay: (showDebugOverlay) => set({ showDebugOverlay }),
  setSimPaused: (simPaused) => set({ simPaused }),
}));
