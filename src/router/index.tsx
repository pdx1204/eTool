import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import OCR from "../pages/ocr";
import MediaDevice from "../pages/media_device";
import Webview from "../pages/webview";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <OCR />,
      },
      {
        path: "/media_device",
        element: <MediaDevice />,
      },
    ],
  },
]);

export default router;
