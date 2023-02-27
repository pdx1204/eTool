import { useEffect, useState } from "react";

const MediaDevice: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await getMedia({ audio: false, video: true });
  };

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

  return <video />;
};

export default MediaDevice;
