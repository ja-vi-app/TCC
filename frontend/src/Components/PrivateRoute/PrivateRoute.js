import React from "react";
import { Navigate } from "react-router-dom";

import { SESSION_STORAGE_ITEM, URLS } from "Utils/Constants";

const isAuthenticated = () =>
  sessionStorage.getItem(SESSION_STORAGE_ITEM.isLoggedIn) !== null;

export const PrivateRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to={URLS.welcome} />;
