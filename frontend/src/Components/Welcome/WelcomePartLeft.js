import React from "react";
import { Typography, Box, Button } from "@mui/material";

export default function WelcomePartLeft(props) {
  return (
    <Box className="flex-center-center-100">
      <Box
        sx={{
          width: "50%",
          padding: ".5rem 0",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box
            sx={{ width: "7px", height: "320px", background: "#8980E8", borderRadius: "6px" }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "288px",
              width: "100%",
              backgroundColor: "#8980E8",
              borderRadius: " 0 50px 50px 0  ",
              color: "#FFFFFF",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                gap: "1.5rem",
              }}
            >
              <Typography sx={{ fontSize: "2rem", fontWeight: "medium", letterSpacing: "4%" }}>
                {props.data.title}
              </Typography>

              <Typography sx={{ maxWidth: "70%", textAlign: "center" }}>
                {props.data.desc}
              </Typography>

              <Button className="btn-more-anchor">Saiba mais</Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", width: "50%", justifyContent: "center", alignItems: "center" }}>
        <img width={220} height={220} src={props.data.url} alt={props.data.title} />
      </Box>
    </Box>
  );
}
