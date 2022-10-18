import React from "react";
import { Typography } from "@mui/material";

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © Já vi "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
