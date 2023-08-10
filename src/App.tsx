import { Link, Outlet } from "react-router-dom";
import { IconSettings } from "@arco-design/web-react/icon";
import { useDark } from "./hooks/useDark";
import { useCallback } from "react";
import MaterialSymbolsDarkMode from "~icons/material-symbols/dark-mode";
import MaterialSymbolsSunny from "~icons/material-symbols/sunny";

function App() {
  const { isDark, toggleDark } = useDark();

  return (
    <div className="easy-tool h-screen">
      <Outlet />

      <footer className=" mt-10 flex justify-center items-center">
        <div className="toggle-dark cursor-pointer" onClick={toggleDark}>
          {isDark ? <MaterialSymbolsSunny /> : <MaterialSymbolsDarkMode />}
        </div>
      </footer>
    </div>
  );
}

export default App;
