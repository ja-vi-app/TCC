import React from "react";
import { Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";

export function AppFooter() {
  const theme = useTheme();

  return (
    <Paper
      style={{
        width: "100%",

        padding: "3rem 3rem 1rem 3rem",
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
          gap: "2rem",
        }}
      >
        <Typography textAlign="justify">
          JA VI é uma aplicação com intuito de auxiliar as pessoas a se lembrar de filmes/series e
          outros entreterimentos audio/visuais com um layout simples e conciso, em que é
          possibilitado a configuração de cards de memória ou alertas organizados por categoria e
          classificados com um sistema de quantidade de estrelas. Nosso objetivo é auxiliar as
          pessoas a se lembrarem das emoções e lembranças proporcionadas por essas criações
          audio/visuais
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <Typography>CRIADO POR:</Typography>
          <Box alignItems="center" sx={{ color: theme.palette.textSubtitleColor }}>
            <Grid container spacing={4}>
              <Grid item>Daniel Liberato</Grid>
              <Grid item>Felipe Scherer</Grid>
              <Grid item>Jehan Dias</Grid>
              <Grid item>Kelly Dena</Grid>
              <Grid item>Vinicius Guidi</Grid>
            </Grid>
          </Box>
        </Box>

        <Link target="_blank" href="https://github.com/ja-vi-app/TCC">
          SEE GITHUB REPOSITORY
        </Link>

        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © Já vi "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Paper>
  );
}
