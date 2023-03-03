import { useEffect, useState } from "react";

import { Input, Image, Button, Spin } from "@arco-design/web-react";
const TextArea = Input.TextArea;

import { createWorker } from "tesseract.js";
import { OCRWrapper } from "./styled";
import { appWindow } from "@tauri-apps/api/window";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string>();
  const [parseText, setParseText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const parse = async (imgSrcUrl: string) => {
    setParseText("");
    setLoading(true);
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage("eng+chi_sim");
    await worker.initialize("eng+chi_sim");
    const {
      data: { text },
    } = await worker.recognize(imgSrcUrl);
    setParseText(text);
    await worker.terminate();
    setLoading(false);
  };

  const checkFile = (tempFile: File) => {
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

  const handleClick = () => {
    const inputFile = document.querySelector("#fileUpload") as HTMLInputElement;
    inputFile.click();
    inputFile.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const tempFiles = target.files as FileList;

      checkFile(tempFiles[0]);
      target.value = ""; // 同一个文件做两次上传操作，第二次无效解决办法
    };
  };

  useEffect(() => {
    const textarea = document.querySelector("textarea.shadow-lg");
    textarea?.classList.remove("arco-textarea-disabled");

    appWindow.listen("screenshot_success", async () => {
      const array = await readBinaryFile(".eTool/screenshot.png", {
        dir: BaseDirectory.Home,
      });
      const blob = new Blob([new Uint8Array(array)], { type: "image/png" });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageSrc(imageUrl);
        parse(imageUrl);
      };
    });
  }, []);

  return (
    <OCRWrapper>
      <Spin block dot loading={loading} tip="正在解析图片中的文字，请稍候...">
        <div className="flex justify-center p-[20px]">
          <Button type="primary" onClick={handleClick}>
            上传图片解析
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
      </Spin>

      <input type="file" id="fileUpload" accept="image/*" hidden />
    </OCRWrapper>
  );
}
