import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Avatar,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import { SESSION_STORAGE_ITEM, THEME, URLS } from "Utils/Constants";
import { CustomThemeContext } from "Context/Theme";

const AppHeader = () => {
  const navigate = useNavigate();
  const session = sessionStorage.getItem(SESSION_STORAGE_ITEM.photoUser);

  const handleAccountPage = (url) => {
    navigate(URLS.account);
  };

  const { currentTheme, setTheme } = useContext(CustomThemeContext);

  const handleThemeChange = () => {
    if (currentTheme === THEME.normal) setTheme(THEME.dark);
    else setTheme(THEME.normal);
  };

  return (
    <AppBar variant="menu" position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
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

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleThemeChange}
              style={{ marginRight: "12px" }}
            >
              {currentTheme === THEME.dark ? (
                <DarkMode />
              ) : (
                <LightMode style={{ color: "black" }} />
              )}
            </IconButton>
            <IconButton onClick={handleAccountPage} sx={{ p: 0 }}>
              <Avatar src={session} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
