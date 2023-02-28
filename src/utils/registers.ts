import { getCurrent, WebviewWindow } from "@tauri-apps/api/window";
import { createWebviewWindow } from "./index";
import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";
import { SHORTCUT_KEY } from "./constants";

export const registerScreenshot = async () => {
  const screenshot = await isRegistered(SHORTCUT_KEY.screenshot);
  console.log(screenshot);

  let webview: WebviewWindow | null = null;

  const registerFn = async () => {
    await register(SHORTCUT_KEY.screenshot, async (shortcut) => {
      console.log("截屏", shortcut);
      if (webview) {
        webview?.close();
        webview = null;
        return;
      }
      webview = createWebviewWindow({
        url: "/webview",
        decorations: false,
        maximized: true,
        transparent: true,
      });
    });
  };

  if (screenshot) {
    const current = getCurrent();
    if (current.label === "main") {
      await unregister(SHORTCUT_KEY.screenshot);
      registerFn();
    }
  } else {
    registerFn();
  }
};

registerScreenshot();
