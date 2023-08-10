import { useCallback, useEffect, useRef, useState } from "react";

export function useDark() {
  const [isDark, setIsDark] = useState(localStorage.theme === "dark");

  const toggleDark = useCallback(() => {
    if (isDark) {
      document.body.setAttribute("arco-theme", "light");
      localStorage.theme = "light";
    } else {
      document.body.setAttribute("arco-theme", "dark");
      localStorage.theme = "dark";
    }
    setIsDark(!isDark);
  }, [isDark]);

  return { isDark, toggleDark };
}
