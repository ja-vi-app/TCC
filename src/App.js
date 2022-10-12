import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import Login from "./Pages/Login";
import { SESSION_STORAGE_ITEM, URLS } from "./Utils/Constants";
import routes from "./Utils/route";
import { themeDark, themeLight } from "./assets/theme";
import ResponsiveAppBar from "./Components/AppBar/AppBar";
import { CardDetailProvider } from "./Context/CardDetailContext";
import { ThemeScssProvider, useTheme } from "./Context/ThemeContext";
import "./Styles/GlobalStyles.scss";
import CustomThemeProvider from "./Context/ThemeMUI";
import { FormCreateCardProvider } from "./Context/FormCreateCardContext";

function App() {
  const themeContext = useTheme();

  const getRoutes = (allRoutes) =>
    allRoutes.map((route, key) => {
      if (route.isPrivate) {
        return (
          <Route
            path={route.route}
            key={key}
            element={<PrivateRoute>{route.component}</PrivateRoute>}
          />
        );
      }
      return <Route path={route.route} element={route.component} key={key} />;
    });

  return (
    <CustomThemeProvider>
      <FormCreateCardProvider>
        {/* <ThemeProvider theme={themeContext === "dark" ? themeLight : themeDark}>
        <ThemeScssProvider> */}
        <CardDetailProvider>
          <CssBaseline />
          <div className=" bg-background">
            {sessionStorage.getItem(SESSION_STORAGE_ITEM.isLoggedIn) ? (
              <>
                <ResponsiveAppBar />
                <Routes key="privateRoute">
                  {getRoutes(routes)}
                  <Route path="*" element={<Navigate to={URLS.home} />} />
                </Routes>
              </>
            ) : (
              <Routes key="allRoute">
                {getRoutes(routes)}
                <Route path={"login-page"} element={<Login />} />
                <Route path="/*" element={<Navigate to={URLS.login} replace={true} />} />
              </Routes>
            )}
            <ToastContainer pauseOnFocusLoss={false} />
          </div>
        </CardDetailProvider>
        {/* </ThemeScssProvider>
      </ThemeProvider> */}
      </FormCreateCardProvider>
    </CustomThemeProvider>
  );
}

export default App;
