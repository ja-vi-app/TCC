import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { LOCAL_STORAGE_ITEM, URLS } from "../Utils/Constants";

export default function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(LOCAL_STORAGE_ITEM.is_logged_in);
    navigate(URLS.login);
  }

  return (
    <>
      <h1>HOME</h1>
      <Button onClick={handleLogout} variant="contained" sx={{ mt: 3, mb: 2 }}>
        Logout
      </Button>
      <Button onClick={handleLogout} variant="contained" sx={{ mt: 3, mb: 2 }}>
        Logout
      </Button>
    </>
  );
}
