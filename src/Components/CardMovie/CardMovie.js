import PropTypes from "prop-types";
import "./CardMovie.scss";

import { Box, Card, CardMedia, Grid } from "@mui/material";
import { useCardDetail, useCardDetailUpdate } from "../../Context/CardDetailContext";
import Star from "./star";
import { Emoji } from "emoji-picker-react";

function CardMovie({ data }) {
  const changeCardDetail = useCardDetailUpdate();
  const cardDetail = useCardDetail();

  const handleCardDetail = () => {
    if (cardDetail === data) changeCardDetail(null);
    else changeCardDetail(data);
  };

  return (
    <div onClick={handleCardDetail}>
      <Card className="container ">
        <div className="relative">
          <Grid container display="flex">
            <div
              style={{
                position: "absolute",
                left: "0%",
                right: "0%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                key="icon_img"
                borderRadius={"0px 0px 5px 0px"}
                style={{
                  background: " #ffffffb3",
                  padding: "0.12rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Emoji unified={data?.category} size={22}></Emoji>
              </Box>
              <Box
                key="note_img"
                borderRadius={"0px 0px 0px 5px"}
                style={{ background: "#00000073", padding: "0.12rem" }}
              >
                <Star data={data?.rating}></Star>
              </Box>
            </div>
          </Grid>
          <CardMedia component="img" height="100%" image={data?.url_image} alt="teste" />
        </div>
        <CardMedia
          className="blur"
          component="img"
          height="100%"
          width="100%"
          image={data?.url_image}
          alt="blur"
        />
      </Card>
    </div>
  );
}

CardMovie.defaultProps = {
  data: {
    name: "",
    image: "",
  },
};

CardMovie.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardMovie;