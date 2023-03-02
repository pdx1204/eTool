import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { fabric } from "fabric";
import { Message } from "@arco-design/web-react";
import { appWindow, getCurrent } from "@tauri-apps/api/window";
import { emit } from "@tauri-apps/api/event";
import { sendNotification } from "@tauri-apps/api/notification";

export default function Screenshot() {
  useEffect(() => {
    executeGetScreenshot();
  }, []);

  const executeGetScreenshot = async () => {
    // 获取截屏窗口
    const screenshotWindow = getCurrent();
    console.log(screenshotWindow);

    const canvas = new fabric.Canvas("canvas", {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      // width: screen.width,
      // height: screen.height,
    });
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
          sendNotification('截屏成功');
          screenshotWindow.close();
        }
      }, 100);
    });

    // // 根据打开的截屏窗口告诉后端对哪个窗口进行截屏
    // const screenshotWindow = getCurrent();
    // console.log(screenshotWindow);
    // // 获取截屏窗口的位置，生成截取全屏的图片
    // const factor = await screenshotWindow?.scaleFactor();
    // const innerPosition = await screenshotWindow?.innerPosition();
    // const position = innerPosition?.toLogical(factor as number);
    // console.log(position);
    // await invoke("get_position", { position });
    // // 获取保存起来的图片
    // const contents = await readBinaryFile("fullscreen.png", {
    //   dir: BaseDirectory.Desktop,
    // });
    // // 渲染到 canvas 中
    // const canvas = new fabric.Canvas("canvas");
    // const blob = new Blob([contents.buffer], { type: "image/png" });
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(blob);
    // fileReader.onload = (e) => {
    //   const imageUrl = e.target?.result as string;
    //   fabric.Image.fromURL(imageUrl, (image) => {
    //     image.scaleToWidth(canvas.width as number);
    //     image.scaleToHeight(canvas.height as number);
    //     canvas.add(image);
    //   });
    // };
  };

  return (
    <canvas id="canvas">
      <GlobalStyle />
    </canvas>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: transparent !important;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      background-color: transparent !important;
    }
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  canvas {
    background-color: transparent;
    cursor: crosshair !important;
  }
`;
