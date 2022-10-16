import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Emoji } from "emoji-picker-react";

import "./CardDetail.scss";
import CardDetailDescription from "../CardDetailDescription.js/CardDetailDescription";
import CardDetailYoutubeVideo from "../CardDetailYoutubeVideo/CardDetailYoutubeVideo";

function CardDetail() {
  return (
    <Card
      sx={{
        padding: "1rem",
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Typography>{JSON.stringify(CardDetail)}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <img
            style={{ width: "150px", height: "201px" }}
            src={CardDetail?.url_image}
            alt="logo-img"
          />
        </Grid>
        <Grid item container direction="column" xs={12} sm={8} spacing={2}>
          <Grid item>
            <Typography sx={{ textTransform: "uppercase" }}>{CardDetail?.title}</Typography>
          </Grid>
          <Grid item container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={4} display="flex" justifyContent="center">
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography>CATEGORIA</Typography>
                <Emoji unified={CardDetail?.category}></Emoji>
              </Box>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography>NOTA</Typography>
                <Emoji unified={CardDetail?.category}></Emoji>
              </Box>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography>FAVORITO</Typography>
                <Emoji unified={CardDetail?.category}></Emoji>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CardDetailYoutubeVideo></CardDetailYoutubeVideo>
      <CardDetailDescription></CardDetailDescription>
    </Card>
  );
}

export default CardDetail;
