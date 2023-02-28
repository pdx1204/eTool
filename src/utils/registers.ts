import { WebviewWindow } from "@tauri-apps/api/window";
import { createWebviewWindow } from "./index";
import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";
import { SHORTCUT_KEY } from "./constants";

const screenshot = await isRegistered(SHORTCUT_KEY.screenshot);

if (screenshot) {
  await unregister(SHORTCUT_KEY.screenshot);
}

let webview: WebviewWindow | null = null;
await register(SHORTCUT_KEY.screenshot, (shortcut) => {
  console.log("截屏", shortcut);
  if (webview) {
    webview?.close();
    webview = null;
    return;
  }
  webview = createWebviewWindow({
    url: "http://www.baidu.com",
    decorations: false,
    maximized: true,
  });
});
