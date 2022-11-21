import { Avatar, Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SESSION_STORAGE_ITEM, URLS } from "Utils/Constants";

export default function Account() {
  const navigate = useNavigate();
  const photoUser = sessionStorage.getItem(SESSION_STORAGE_ITEM?.photoUser);
  const email = sessionStorage.getItem(SESSION_STORAGE_ITEM?.email);
  const name = sessionStorage.getItem(SESSION_STORAGE_ITEM?.nameUser);

  useEffect(() => {}, [photoUser, email, name]);

  function handleLogout() {
    sessionStorage.clear();
    navigate(URLS.welcome);
  }
  return (
    <Box sx={{ width: "600px", margin: "auto", marginTop: "2rem" }}>
      <Card
        sx={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Typography align="center">SUA CONTA</Typography>

        <Avatar src={photoUser} />

        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="text-placeholder-small">Nome:</Typography>
          <Typography>{name}</Typography>
        </Box>

        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="text-placeholder-small">Email:</Typography>
          <Typography>{email}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            sx={{ width: "130px" }}
            variant="outlined-cancel"
            onClick={handleLogout}
          >
            Sair
          </Button>
          <Button sx={{ width: "130px" }} variant="outlined-delete">
            DELETAR CONTA
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
