import { Emoji } from "emoji-picker-react";
import PropTypes from "prop-types";

import { Box, Card, CardMedia, Grid } from "@mui/material";

import "./CardMovie.scss";
import { useCardDetail, useCardDetailUpdate } from "../../Context/CardDetailContext";
import Star from "./star";

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
                <Emoji unified={data?.category} size={22} />
              </Box>
              <Box
                key="note_img"
                borderRadius={"0px 0px 0px 5px"}
                style={{ background: "#00000073", padding: "0.12rem" }}
              >
                <Star isSmall={true} data={data?.rating} />
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
