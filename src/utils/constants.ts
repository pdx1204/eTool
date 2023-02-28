import { type } from "@tauri-apps/api/os";

export const GET_SHORTCUT_KEYS = async () => {
  const osType = await type();
  const SHORTCUT_KEY = {
    screenshot: osType === "Darwin" ? "Command+J" : "Ctrl+J",
  };
  return SHORTCUT_KEY;
};
