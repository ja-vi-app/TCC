import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { Typography, Button, Box } from "@mui/material";
import { HourglassEmpty } from "@mui/icons-material";
import { firebaseApp } from "../../Service/dbConection";
import { SESSION_STORAGE_ITEM, TOAST_TYPE, URLS } from "../../Utils/Constants";
import { toasterModel } from "../../Utils/Functions";

export default function Welcome() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);

  const [isLogin, setIsLogin] = useState(false);

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
    <div class="welcome-bg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1500px",
          margin: "auto",
          padding: "0 1rem",
        }}
      >
        <Box
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: "flex",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <img
            src="https://user-images.githubusercontent.com/62115215/196580219-eae5e6dd-db57-48c8-a937-11b3c5e845bb.svg"
            alt="logo"
            width={150}
          />
        </Box>

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

      <Box
        className="flex-collum-center-05"
        sx={{ maxWidth: "1500px", margin: "auto", width: "100%" }}
      >
        <Box className="flex-center-center-100">CRIE SEU CARD</Box>
        <Box className="flex-center-center-100">
          <Typography sx={{ width: "50%" }}>img</Typography>
          <Box
            sx={{
              width: "50%",
              padding: ".5rem 0",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                backgroundColor: "#8980E8",
                padding: "5% 20%",
                borderRadius: "50px 0 0 50px ",
              }}
            >
              Salve seus filmes
              <br />
              <span>
                Não consegue lembrar aquele filme que assistiu a uns anos atrás? Crie um card e
                tenha a lembrança sempre disponível
              </span>
              <br />
              <button>Saiba mais</button>
            </Typography>
          </Box>
          <Box
            sx={{ width: "7px", height: "170px", background: "#8980E8", borderRadius: "6px" }}
          ></Box>
        </Box>
        <Box className="flex-center-center-100">Organize</Box>
        <Box className="flex-center-center-100">Salve detalhes</Box>
        <Box className="flex-center-center-100"> Economize tempo</Box>

        <Box>
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
              Crie seu primeiro card
            </Button>
          )}
        </Box>
      </Box>

      {/* <Container component="main" maxWidth="xs">
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
      </Container> */}
    </div>
  );
}
