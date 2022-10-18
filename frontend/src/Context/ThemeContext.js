import React from "react";
import { useEffect, useContext, useState } from "react";
import { THEME } from "../Utils/Constants";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeScssProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("javi-theme") ?? THEME.light);

  useEffect(() => {
    localStorage.setItem("javi-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function changeTheme() {
    setTheme(theme === THEME.light ? THEME.dark : THEME.light);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={changeTheme}>{children}</ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
