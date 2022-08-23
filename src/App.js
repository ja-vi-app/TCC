import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { PrivateRoute } from "./Components/PrivateRoute";
import Login from "./Pages/Login";
import { LOCAL_STORAGE_ITEM, URLS } from "./Utils/Constants";
import routes from "./Utils/route";

const theme = createTheme();

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
      <CssBaseline />
      <>
        {localStorage.getItem(LOCAL_STORAGE_ITEM.is_logged_in) ? (
          <Routes key="privateRoute">
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to={URLS.home} />} />
          </Routes>
        ) : (
          <Routes key="allRoute">
            {getRoutes(routes)}
            <Route path={"login-page"} element={<Login />} />
            <Route path="/*" element={<Navigate to={URLS.login} replace={true} />} />
          </Routes>
        )}
        <ToastContainer pauseOnFocusLoss={false} />
      </>
    </ThemeProvider>
  );
}

export default App;
