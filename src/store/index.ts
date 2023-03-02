import { WebviewWindow } from "@tauri-apps/api/window";
import { create } from "zustand";

export const useScreenshotStore = create<ScreenshotState>((set) => ({
  screenshotWindow: null,
  setValue: (value) => {
    set(() => ({
      screenshotWindow: value,
    }));
  },
}));

export type ScreenshotState = {
  screenshotWindow: WebviewWindow | null;

  setValue: (value: WebviewWindow | null) => void;
};
