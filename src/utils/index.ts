import { WebviewWindow, WindowOptions } from "@tauri-apps/api/window";

export const createWebviewWindow = (options: WindowOptions) => {
  const webview = new WebviewWindow(window.crypto.randomUUID(), options);

  webview.once("tauri://created", function () {
    // webview window successfully created
    console.log("window successfully");
  });

  webview.once("tauri://error", function (e) {
    // an error happened creating the webview window
    console.log(e);
  });
  return webview;
};
