import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";

import "./Styles/GlobalStyles.scss";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import ResponsiveAppBar from "./Components/AppBar/AppBar";
import { CardDetailProvider } from "./Context/CardDetailContext";
import CustomThemeProvider from "./Context/ThemeMUI";
import { FormCreateCardProvider } from "./Context/FormCreateCardContext";
import { SESSION_STORAGE_ITEM, URLS } from "./Utils/Constants";
import routes from "./Utils/route";
import Login from "./Pages/Login";
import { AppFooter } from "./Components/Footer/AppFooter";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {}, [pathname]);

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
        <CardDetailProvider>
          <CssBaseline />
          <div className="bg-background ">
            {sessionStorage.getItem(SESSION_STORAGE_ITEM.isLoggedIn) ? (
              <div style={{ position: "relative" }} className="min">
                <ResponsiveAppBar />
                <Routes key="privateRoute">
                  {getRoutes(routes)}
                  <Route path="*" element={<Navigate to={URLS.home} />} />
                </Routes>
              </div>
            ) : (
              <div className="min">
                <Routes key="allRoute">
                  {getRoutes(routes)}
                  <Route path={"login-page"} element={<Login />} />
                  <Route path="/*" element={<Navigate to={URLS.login} replace={true} />} />
                </Routes>
              </div>
            )}
            <AppFooter></AppFooter>
            <ToastContainer pauseOnFocusLoss={false} />
          </div>
        </CardDetailProvider>
      </FormCreateCardProvider>
    </CustomThemeProvider>
  );
}

export default App;
