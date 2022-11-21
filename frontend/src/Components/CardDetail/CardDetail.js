import React from "react";
import { Card } from "@mui/material";

import "./CardDetail.scss";
import CardDetailDescription from "Components/CardDetailDescription.js/CardDetailDescription";
import CardDetailYoutubeVideo from "Components/CardDetailYoutubeVideo/CardDetailYoutubeVideo";
import CardDetailSummary from "Components/CardDetailSummary/CardDetailSummary";

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
      <CardDetailSummary />
      <CardDetailYoutubeVideo />
      <CardDetailDescription />
    </Card>
  );
}

export default CardDetail;
