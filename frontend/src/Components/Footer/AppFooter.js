import React from "react";
import { Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

export function AppFooter() {
  const theme = useTheme();

  return (
    <Paper
      style={{
        width: "100%",
        fontSize: "11px",
        padding: "1rem",
      }}
      sx={{ color: theme.palette.textColor }}
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
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}
        >
          <Typography variant="body3">Created by: </Typography>
          <Box alignItems="center" sx={{ color: theme.palette.textSubtitleColor }}>
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
          <Typography variant="body3" color="text.secondary" align="center">
            {"Copyright © Já vi "}
            {new Date().getFullYear()}
            {"."}
          </Typography>

          <Link variant="body3" target="_blank" href="https://github.com/ja-vi-app/TCC">
            GITHUB REPOSITORY
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}
