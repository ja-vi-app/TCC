import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { HourglassEmpty } from "@mui/icons-material";
import { Button, Box, Typography } from "@mui/material";

import WelcomePart from "Components/Welcome/WelcomePart";
import AppFooter from "Components/AppFooter/AppFooter";
import { firebaseApp } from "Service/dbConection";
import { SESSION_STORAGE_ITEM, TOAST_TYPE, URLS } from "Utils/Constants";
import { toasterModel } from "Utils/Functions";
import { welcomeData } from "./WelcomeData";

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

  function onAnchor(id) {
    window.location.href = `#${id}`;
  }

  return (
    <div className="welcome-bg">
      <Box className="min">
        <Box
          sx={{
            maxWidth: "1500px",
            margin: "auto",
            padding: "0 1rem",
            minHeight: "730px",
            backgroundImage:
              "url(https://user-images.githubusercontent.com/62115215/202863039-3e0f7845-bcfe-438a-99bd-78428d24dc47.png)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2rem 0",
            }}
          >
            <Box
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                gap: "1rem",
              }}
            >
              <img
                src="https://user-images.githubusercontent.com/62115215/196580219-eae5e6dd-db57-48c8-a937-11b3c5e845bb.svg"
                alt="logo"
                width={150}
              />
            </Box>
            <Box component="form" role="form">
              {isLogin ? (
                <Button disabled={true} fullWidth variant="contained">
                  <HourglassEmpty /> Logando...
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={signInGoolgle}
                  fullWidth
                  className="btn-more-anchor"
                >
                  Login com Google
                </Button>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: "12rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "50%",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography sx={{ fontSize: "2.5rem" }}>
                CRIE SEUS CARDS
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                LEMBRE-SE DE SEUS FILMES E SÉRIES FAVORITOS
              </Typography>
              <Button
                sx={{ width: "15rem", height: "3rem" }}
                onClick={() => onAnchor(1)}
                className="btn-more-anchor"
              >
                Saiba mais
              </Button>
            </Box>
            <Box>
              <img
                width="260px"
                height="260px"
                src={
                  "https://user-images.githubusercontent.com/62115215/202863106-8a289a8a-9662-4530-821e-3969911cba69.png"
                }
                alt={"cards"}
              />
            </Box>
          </Box>
        </Box>

        <Box
          className="flex-collum-center-05"
          sx={{
            maxWidth: "1500px",
            margin: "auto",
            width: "100%",
            gap: "1rem",
          }}
        >
          {welcomeData.map((data) => (
            <WelcomePart data={data} key={data.id}></WelcomePart>
          ))}

          <Box
            sx={{ padding: "5rem 0", width: "25rem" }}
            id="crie-seu-primeiro-card"
          >
            {isLogin ? (
              <Button
                disabled={true}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "5rem", fontSize: "1rem" }}
              >
                <HourglassEmpty /> Logando...
              </Button>
            ) : (
              <Button
                id="organize"
                type="submit"
                onClick={signInGoolgle}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "5rem", fontSize: "1rem" }}
              >
                Crie seu primeiro card
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <AppFooter color={true} />
    </div>
  );
}
