import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import "./registers/screenshot";
import "./styles/style.css";
import "@arco-design/web-react/dist/css/arco.css";

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

if (!localStorage.theme) {
  if (darkThemeMq.matches) {
    document.body.setAttribute("arco-theme", "dark");
    localStorage.theme = "dark";
  } else {
    document.body.setAttribute("arco-theme", "light");
    localStorage.theme = "light";
  }
} else {
  document.body.setAttribute("arco-theme", localStorage.theme);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
