import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";

import routes from "./Utils/route";
import { SESSION_STORAGE_ITEM, URLS } from "./Utils/Constants";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import AppHeader from "./Components/AppHeader/AppHeader";
import AppFooter from "./Components/AppFooter/AppFooter";
import { AppContextProvider } from "./Context/GlobalContext";

import "./App.scss";
import "./Styles/GlobalStyles.scss";
import Welcome from "./Pages/Welcome/Welcome";

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
          <div style={{ position: "relative" }} className=" ">
            <AppHeader />
            <div className="wrapper min">
              <Routes key="privateRoute">
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to={URLS.home} />} />
              </Routes>
            </div>
            <AppFooter />
          </div>
        ) : (
          <div className="min">
            <Routes key="allRoute">
              {getRoutes(routes)}
              <Route path={"welcome"} element={<Welcome />} />
              <Route
                path="/*"
                element={<Navigate to={URLS.welcome} replace={true} />}
              />
            </Routes>
          </div>
        )}

        <ToastContainer pauseOnFocusLoss={false} />
      </div>
    </AppContextProvider>
  );
}

export default App;
