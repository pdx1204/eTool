import React, { useCallback, useEffect, useRef, useState } from "react";

import { Input, Image, Button, Spin } from "@arco-design/web-react";
const TextArea = Input.TextArea;

import { createWorker } from "tesseract.js";
import { OCRWrapper } from "./styled";
import { listen } from "@tauri-apps/api/event";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import { getCurrent } from "@tauri-apps/api/window";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string>();
  const [parseText, setParseText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const parse = useCallback(async (imgSrcUrl: string) => {
    setParseText("");
    setLoading(true);
    const worker = await createWorker();
    const {
      data: { text },
    } = await worker.recognize(imgSrcUrl);
    setParseText(text);
    await worker.terminate();
    setLoading(false);
  }, []);

  const handleClick = useCallback(() => {
    const inputFile = inputFileRef.current as HTMLInputElement;
    inputFile.click();
    inputFile.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const tempFiles = target.files as FileList;

      checkFile(tempFiles[0], setImageSrc, parse);
      target.value = ""; // 同一个文件做两次上传操作，第二次无效解决办法
    };
  }, []);

  useEffect(() => {
    const textarea = document.querySelector("textarea.shadow-lg");
    textarea?.classList.remove("arco-textarea-disabled");
    screenshotSuccess(setImageSrc, parse);
  }, []);

  return (
    <OCRWrapper>
      <div className="flex justify-center p-[20px]">
        <Button type="primary" loading={loading} onClick={handleClick}>
          {loading ? "正在解析" : "上传图片"}
        </Button>
      </div>

      <div className="flex justify-around">
        <Image
          width="49%"
          height="300px"
          style={{ display: "flex" }}
          className="justify-center items-center shadow-lg"
          src={imageSrc}
          alt="请上传图片..."
        />

        <TextArea
          style={{
            width: "49%",
            height: "300px",
          }}
          className="shadow-lg text-black"
          placeholder="请上传图片..."
          value={parseText}
          disabled
          onChange={(value) => {
            setParseText(value);
          }}
        />
      </div>

      <input
        type="file"
        ref={inputFileRef}
        id="fileUpload"
        accept="image/*"
        hidden
      />
    </OCRWrapper>
  );
}

const checkFile = (
  tempFile: File,
  setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
  parse: (imgSrcUrl: string) => Promise<void>
) => {
  if (!tempFile) {
    return false;
  }
  if (tempFile.type.substring(0, 5) !== "image") {
    return;
  }
  const imgSrcUrl = URL.createObjectURL(tempFile);
  setImageSrc(imgSrcUrl);
  parse(imgSrcUrl);
};

const screenshotSuccess = (
  setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
  parse: (imgSrcUrl: string) => Promise<void>
) => {
  const current = getCurrent();
  listen(
    "screenshot_success",
    async (event: { payload: { fileName: string } }) => {
      current.show();
      current.setFocus();
      const array = await readBinaryFile(
        `.eTool/${event.payload.fileName}.png`,
        {
          dir: BaseDirectory.Home,
        }
      );
      const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageSrc(imageUrl);
        parse(imageUrl);
      };
    }
  );
};
