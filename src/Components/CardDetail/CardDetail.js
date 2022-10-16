import React, { useState } from "react";
import { Card, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Emoji } from "emoji-picker-react";

import "./CardDetail.scss";
import CardDetailDescription from "../CardDetailDescription.js/CardDetailDescription";
import CardDetailYoutubeVideo from "../CardDetailYoutubeVideo/CardDetailYoutubeVideo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCardDetail } from "../../Context/CardDetailContext";

function CardDetail() {
  const CardDetail = useCardDetail();

  const [isFavorite, setIsFavorited] = useState();
  const theme = useTheme();

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
            <Typography textAlign="center" sx={{ textTransform: "uppercase" }}>
              {CardDetail?.title}
            </Typography>
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
                <IconButton onClick={() => setIsFavorited(!isFavorite)}>
                  <FavoriteIcon
                    sx={{ color: isFavorite ? "#D0000B" : theme.palette.textSubtitleColor }}
                  ></FavoriteIcon>
                </IconButton>
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
