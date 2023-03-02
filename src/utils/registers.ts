import { useScreenshotStore } from "./../store/index";
import { getAll, getCurrent } from "@tauri-apps/api/window";
import { createWebviewWindow } from "./index";
import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";
import { GET_SHORTCUT_KEYS } from "./constants";

export const registerScreenshot = async () => {
  const SHORTCUT_KEY = await GET_SHORTCUT_KEYS();
  const screenshot = await isRegistered(SHORTCUT_KEY.screenshot);
  console.log(screenshot);

  const registerFn = async () => {
    await register(SHORTCUT_KEY.screenshot, async (shortcut) => {
      // 获取所有窗口
      const webViews = getAll();

      const webview = webViews.find((webview) => {
        return webview.label.includes("screenshot");
      });
      console.log("截屏", shortcut);

      if (webview) {
        webview?.close();
        return;
      } else {
        createWebviewWindow("screenshot", {
          url: "/webview",
          decorations: false,
          maximized: true,
          resizable: false,
          // fullscreen: true,
          transparent: true,
        });
      }
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
