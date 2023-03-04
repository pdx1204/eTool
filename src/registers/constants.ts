import { OsType } from "@tauri-apps/api/os";

export const GET_SHORTCUT_KEYS = async (osType: OsType) => {
  const SHORTCUT_KEY: ShortcutKeyType = {
    screenshot: osType === "Darwin" ? "Command+J" : "Ctrl+J", // 截屏快捷键
  };

  return SHORTCUT_KEY;
};

export type ShortcutKeyType = {
  screenshot: "Command+J" | "Ctrl+J";
};
