import { useEffect, useState } from "react";

export default function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const body = document.querySelector("body");
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    body.classList.remove(colorTheme);
    body.classList.add(theme);

    // save theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
