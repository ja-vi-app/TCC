import React from "react";
import { Typography, Box } from "@mui/material";

export default function WelcomePart(props) {
  return (
    <Box className="flex-center-center-100" id={props.data.id}>
      {props.data.id % 2 === 0 ? null : (
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            width={220}
            height={220}
            src={props.data.url}
            alt={props.data.title}
          />
        </Box>
      )}

      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          padding: ".5rem 0",
          display: "flex",
          justifyContent: `${
            props.data.id % 2 === 0 ? "flex-start" : "flex-end"
          }`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          {props.data.id % 2 === 0 ? (
            <Box
              sx={{
                width: "7px",
                height: "320px",
                background: "#8980E8",
                borderRadius: "6px",
              }}
            />
          ) : null}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "288px",
              width: "100%",
              backgroundColor: "#8980E8",
              borderRadius: `${
                props.data.id % 2 === 0 ? "0 50px 50px 0" : "50px 0 0 50px"
              }`,
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
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "medium",
                  letterSpacing: "4%",
                }}
              >
                {props.data.title}
              </Typography>
              <Typography sx={{ maxWidth: "70%", textAlign: "center" }}>
                {props.data.desc}
              </Typography>
              {props.children}
            </Box>
          </Box>
        </Box>
        {props.data.id % 2 === 0 ? null : (
          <Box
            sx={{
              width: "7px",
              height: "320px",
              background: "#8980E8",
              borderRadius: "6px",
            }}
          />
        )}
      </Box>
      {props.data.id % 2 === 0 ? (
        <Box
          sx={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <img
            width={220}
            height={220}
            src={props.data.url}
            alt={props.data.title}
          />
        </Box>
      ) : null}
    </Box>
  );
}
