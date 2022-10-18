import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { Typography, Container, Button, Avatar, Box, useTheme } from "@mui/material";
import { HourglassEmpty, LockOutlined } from "@mui/icons-material";

import { firebaseApp } from "../Service/dbConection";
import { SESSION_STORAGE_ITEM, TOAST_TYPE, URLS } from "../Utils/Constants";
import { toasterModel } from "../Utils/Functions";

export default function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);

  const [isLogin, setIsLogin] = useState(false);

  const theme = useTheme();

  async function signInGoolgle(event) {
    event.preventDefault();
    setIsLogin(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        sessionStorage.setItem(SESSION_STORAGE_ITEM.isLoggedIn, true);
        sessionStorage.setItem(SESSION_STORAGE_ITEM.nameUser, user.displayName);
        sessionStorage.setItem(SESSION_STORAGE_ITEM.email, user.email);
        sessionStorage.setItem(SESSION_STORAGE_ITEM.photoUser, user.photoURL);
        sessionStorage.setItem(SESSION_STORAGE_ITEM.userUid, user.uid);

        navigate(URLS.home);
      })
      .catch(() => {
        toasterModel(
          "Falha ao fazer login com o Google. Tente novamente mais tarde!",
          TOAST_TYPE.error
        );
      })
      .finally(() => {
        setIsLogin(false);
      });
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            paddingTop: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", color: "#fff" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: theme.palette.textColor }}>
            Entrar
          </Typography>
          <Box component="form" role="form" sx={{ mt: 1 }}>
            {isLogin ? (
              <Button disabled={true} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                <HourglassEmpty /> Logando...
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={signInGoolgle}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login com Google
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}