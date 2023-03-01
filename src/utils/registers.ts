import {
  appWindow,
  availableMonitors,
  currentMonitor,
  getCurrent,
  WebviewWindow,
} from "@tauri-apps/api/window";
import { createWebviewWindow } from "./index";
import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";
import { GET_SHORTCUT_KEYS } from "./constants";
import { invoke } from "@tauri-apps/api";

export const registerScreenshot = async () => {
  const SHORTCUT_KEY = await GET_SHORTCUT_KEYS();
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
      } else {
        webview = createWebviewWindow({
          url: "/webview",
          decorations: false,
          // fullscreen: true,
          transparent: true,
        });

        setTimeout(async () => {
          const factor = await webview?.scaleFactor();
          const innerPosition = await webview?.innerPosition();
          const position = innerPosition?.toLogical(factor as number);
          await invoke("get_position", { position });
        }, 1000);
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
