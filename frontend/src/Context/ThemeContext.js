import React from "react";
import { useEffect, useContext, useState } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeScssProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("javi-theme") ?? "light");

  useEffect(() => {
    localStorage.setItem("javi-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={changeTheme}>{children}</ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
