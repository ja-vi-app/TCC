import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import getTheme from "../assets/themes";
import { SESSION_STORAGE_ITEM, THEME } from "../Utils/Constants";

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
  currentTheme: THEME.normal,
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  const currentTheme = localStorage.getItem(SESSION_STORAGE_ITEM.appTheme) || THEME.normal;

  const [themeName, _setThemeName] = useState(currentTheme);

  const theme = getTheme(themeName);

  const setThemeName = (name) => {
    localStorage.setItem(SESSION_STORAGE_ITEM.appTheme, name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
