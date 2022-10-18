import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
);
