import React from "react";
import { Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

const AppFooter = (props) => {
  const theme = useTheme();

  return (
    <Paper
      style={{
        width: "100%",
        fontSize: "11px",
        padding: "1rem",
      }}
      sx={{
        color: props.color ? "#fff" : theme.palette.textColor,
        background: props.color ? "#8980e8" : "",
      }}
    >
      <Box
        sx={{
          maxWidth: "xl",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <Typography variant="body3">Created by: </Typography>
          <Box
            alignItems="center"
            sx={{
              color: props.color ? "#fff" : theme.palette.textSubtitleColor,
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item>Daniel Liberato</Grid>
              <Grid item>Felipe Scherer</Grid>
              <Grid item>Jehan Dias</Grid>
              <Grid item>Kelly Dena</Grid>
              <Grid item>Vinicius Guidi</Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Typography
            variant="body3"
            color={props.color ? "#fff" : "text.secondary"}
            align="center"
          >
            {"Copyright © Já vi "}
            {new Date().getFullYear()}
            {"."}
          </Typography>

          <Link
            sx={{ color: props.color ? "#fff" : "" }}
            target="_blank"
            href="https://github.com/ja-vi-app/TCC"
          >
            GITHUB REPOSITORY
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default AppFooter;
