import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { collection } from "firebase/firestore";
import { Avatar, Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { db } from "Service/dbConection";
import {
  deleteAllDataByUser,
  deleteCurrentUser,
} from "Service/Utils/Functions";
import { RECORDED_MOVIES } from "Service/Utils/Tables";
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

  async function handleDeleteUser() {
    const isDelete = await deleteCurrentUser();

    if (isDelete) {
      const recordedMoviesCollectionRef = collection(db, RECORDED_MOVIES);
      await deleteAllDataByUser(
        recordedMoviesCollectionRef,
        sessionStorage.getItem(SESSION_STORAGE_ITEM.userUid)
      );
      handleLogout();
    }
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
          <Button
            sx={{ width: "130px" }}
            variant="outlined-delete"
            onClick={handleDeleteUser}
          >
            DELETAR CONTA
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
