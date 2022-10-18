import React from "react";
import { Card } from "@mui/material";

import "./CardDetail.scss";
import CardDetailDescription from "../CardDetailDescription.js/CardDetailDescription";
import CardDetailYoutubeVideo from "../CardDetailYoutubeVideo/CardDetailYoutubeVideo";
import CardDetailBadge from "../CardDetailBadge/CardDetailBadge";

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
      <CardDetailBadge></CardDetailBadge>

      <CardDetailYoutubeVideo></CardDetailYoutubeVideo>
      <CardDetailDescription></CardDetailDescription>
    </Card>
  );
}

export default CardDetail;
