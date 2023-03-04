import { appWindow } from "@tauri-apps/api/window";
import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";
import { GET_HANDLER_FN } from "./constants";
import { type } from "@tauri-apps/api/os";
import { GET_SHORTCUT_KEYS } from "../constants";

export const registerScreenshot = async () => {
  const osType = await type();

  const SHORTCUT_KEY = await GET_SHORTCUT_KEYS(osType);

  const screenshot = await isRegistered(SHORTCUT_KEY.screenshot);
  console.log(screenshot);

  const registerFn = async () => {
    await register(SHORTCUT_KEY.screenshot, GET_HANDLER_FN(osType));
  };

  if (screenshot) {
    if (appWindow.label === "main") {
      await unregister(SHORTCUT_KEY.screenshot);
      registerFn();
    }
  } else {
    registerFn();
  }
};

registerScreenshot();
