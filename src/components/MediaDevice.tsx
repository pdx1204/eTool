import { useEffect, useState } from "react";

const MediaDevice: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // const devices = await getDevices();
    // console.log(devices);
    // await getMedia({ audio: false, video: true });
  };

  async function getDevices() {
    const devices = navigator.mediaDevices.enumerateDevices();
    return devices;
  }

  async function getMedia(constraints: MediaStreamConstraints) {
    let s = null;

    try {
      s = await navigator.mediaDevices.getDisplayMedia(constraints);
      console.log(s);

      setStream(s);

      const video = document.querySelector("video") as HTMLVideoElement;

      video.srcObject = s;
      video.onloadedmetadata = () => {
        video.play();
      };
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <video />
      <button
        onClick={() => {
          getMedia({ audio: false, video: true });
        }}
      >
        点击
      </button>
    </>
  );
};

export default MediaDevice;
