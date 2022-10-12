import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={"https://ja-vi-app.github.io/TCC/"}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
