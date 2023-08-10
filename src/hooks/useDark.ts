import { useCallback, useEffect, useRef, useState } from "react";

export function useDark() {
  const isDarkRef = useRef(localStorage.theme === "dark");
  const [isDark, setIsDark] = useState(localStorage.theme === "dark");

  const toggleDark = useCallback(() => {
    if (isDarkRef.current) {
      document.body.setAttribute("arco-theme", "light");
      localStorage.theme = "light";
    } else {
      document.body.setAttribute("arco-theme", "dark");
      localStorage.theme = "dark";
    }
    isDarkRef.current = !isDarkRef.current;
    setIsDark(isDarkRef.current);
  }, []);

  return { isDark, toggleDark };
}
