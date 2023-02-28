import ReactDOM from "react-dom/client";
import "./styles/style.css";

import "@arco-design/web-react/dist/css/arco.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import "./utils/registers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
