import { getAll, WebviewWindow, WindowOptions } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { createWebviewWindow, WebviewWindowLabel } from "../utils";

export default (id: WebviewWindowLabel, options: WindowOptions) => {
  const [webviewWindow, setWebviewWindow] = useState<WebviewWindow>();

  useEffect(() => {
    const webview = createWebviewWindow(id, options);

    setWebviewWindow(() => {
      return webview;
    });

    return () => {
      webview.close();
    };
  }, []);

  return webviewWindow;
};
