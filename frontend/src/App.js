import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";

import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";

import routes from "./Utils/route";
import Login from "./Pages/Login";
import { SESSION_STORAGE_ITEM, URLS } from "./Utils/Constants";
import AppHeader from "./Components/AppHeader/AppHeader";
import AppFooter from "./Components/AppFooter/AppFooter";
import { AppContextProvider } from "./Context/GlobalContext";

import "./App.scss";
import "./Styles/GlobalStyles.scss";

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
    <AppContextProvider>
      <CssBaseline />
      <div className="bg-background " sx={{ height: "100vh" }}>
        {sessionStorage.getItem(SESSION_STORAGE_ITEM.isLoggedIn) ? (
          <div style={{ position: "relative" }} className="min ">
            <AppHeader />
            <div className="wrapper">
              <Routes key="privateRoute">
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to={URLS.home} />} />
              </Routes>
            </div>
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
        <AppFooter />
        <ToastContainer pauseOnFocusLoss={false} />
      </div>
    </AppContextProvider>
  );
}

export default App;
