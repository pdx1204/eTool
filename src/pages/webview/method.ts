import { Message } from "@arco-design/web-react";
import { invoke } from "@tauri-apps/api";
import { sendNotification } from "@tauri-apps/api/notification";
import { appWindow } from "@tauri-apps/api/window";
import { fabric } from "fabric";

export const capture_region = (canvas: fabric.Canvas) => {
  let isMouseDown = false;
  let startX: number;
  let startY: number;
  let rect: fabric.Rect;
  canvas.on("mouse:down", (event) => {
    startX = event.pointer?.x as number;
    startY = event.pointer?.y as number;
    isMouseDown = true;
    rect = new fabric.Rect({
      left: startX,
      top: startY,
      fill: "rgba(0,0,0,0.2)",
      width: 0,
      height: 0,
      selectable: false,
    });
    canvas.add(rect);
  });
  canvas.on("mouse:move", (event) => {
    if (!isMouseDown) {
      return;
    }
    const endX = event.pointer?.x as number;
    const endY = event.pointer?.y as number;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    rect.set("width", width).set("height", height);
    if (endX < startX) {
      rect.set("left", endX);
    }
    if (endY < startY) {
      rect.set("top", endY);
    }
    canvas.renderAll();
  });
  canvas.on("mouse:up", async () => {
    isMouseDown = false;
    const endX = (rect.left as number) + (rect.width as number);
    const endY = (rect.top as number) + (rect.height as number);
    const x = Math.min(rect.left as number, endX);
    const y = Math.min(rect.top as number, endY);
    const width = Math.abs(rect.width as number);
    const height = Math.abs(rect.height as number);

    canvas.remove(rect);
    if (width <= 0 || height <= 0) {
      Message.error("截屏区域无效，请重新选择区域");
      return;
    }

    // 延迟执行， 防止未删除 rect
    setTimeout(async () => {
      const result = await invoke("capture_region", {
        x,
        y,
        width,
        height,
      });

      if (result) {
        // 截屏成功后关闭截屏窗口并通知
        sendNotification("截屏成功");
        appWindow.emit("screenshot_success");
        appWindow.close();
      }
    }, 100);
  });
};
