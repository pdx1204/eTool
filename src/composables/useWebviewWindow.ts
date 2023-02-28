import { getAll, WebviewWindow, WindowOptions } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { createWebviewWindow } from "../utils";

export default (options: WindowOptions) => {
  const [webviewWindow, setWebviewWindow] = useState<WebviewWindow>();

  useEffect(() => {
    const webview = createWebviewWindow(options);

    setWebviewWindow(() => {
      return webview;
    });

    return () => {
      webview.close();
    };
  }, []);

  return webviewWindow;
};
