import { type } from "@tauri-apps/api/os";
import { WindowOptions } from "@tauri-apps/api/window";

export const GET_SHORTCUT_KEYS = async () => {
  const osType = await type();
  const SHORTCUT_KEY: ShortcutKeyType = {
    screenshot: osType === "Darwin" ? "Command+J" : "Ctrl+J",
    windowOptions: {
      url: '/webview',
      alwaysOnTop: true,
      decorations: false, // 去除边框与标题栏
      resizable: false, // 禁止调整窗口大小
      transparent: true, // 窗口透明
    },
  };

  if (osType === "Darwin") {
    SHORTCUT_KEY.windowOptions.maximized = true;
  } else {
    SHORTCUT_KEY.windowOptions.fullscreen = true;
  }
  return SHORTCUT_KEY;
};

export type ShortcutKeyType = {
  screenshot: "Command+J" | "Ctrl+J";
  windowOptions: WindowOptions;
};
