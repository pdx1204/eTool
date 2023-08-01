import { emit } from "@tauri-apps/api/event";
import {
  WebviewWindow,
  WindowLabel,
  WindowOptions,
} from "@tauri-apps/api/window";

export const createWebviewWindow = (
  id: WebviewWindowLabel,
  options: WindowOptions,
  fileName: string
) => {
  const webview = new WebviewWindow(
    `${window.crypto.randomUUID()}-${id}`,
    options
  );

  webview.once("tauri://created", function () {
    // webview window successfully created
    console.log("window successfully");
    emit("send_full_screen_file_name", { fileName });
  });

  webview.once("tauri://error", function (e) {
    // an error happened creating the webview window
    console.log(e);
  });
  return webview;
};

export type WebviewWindowLabel = WindowLabel | number;
