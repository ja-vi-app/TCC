import React from "react";
import {  Navigate,  } from "react-router-dom";

import { LOCAL_STORAGE_ITEM, URLS } from "../Utils/Constants";

const isAuthenticated = () => localStorage.getItem(LOCAL_STORAGE_ITEM.is_logged_in) !== null;

export  const PrivateRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to={URLS.login} />;