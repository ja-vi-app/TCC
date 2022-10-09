import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import Login from "./Pages/Login";
import { SESSION_STORAGE_ITEM, URLS } from "./Utils/Constants";
import routes from "./Utils/route";
import theme from "./assets/theme";
import ResponsiveAppBar from "./Components/AppBar/AppBar";
import { CardDetailProvider } from "./Context/CardDetailContext";
import { ThemeScssProvider } from "./Context/ThemeContext";
import "./Styles/GlobalStyles.scss";

function App() {
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
    <ThemeProvider theme={theme}>
      <ThemeScssProvider>
        <CardDetailProvider>
          <CssBaseline />
          <div className=" bg-background h100" style={{ height: "100vh" }}>
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
      </ThemeScssProvider>
    </ThemeProvider>
  );
}

export default App;
