import PropTypes from "prop-types";

import { Box, Card, CardMedia, Grid } from "@mui/material";
import { useCardDetail, useCardDetailUpdate } from "../../Context/CardDetailContext";

function CardMovie({ data }) {
  const changeCardDetail = useCardDetailUpdate();
  const cardDetail = useCardDetail();

  const handleCardDetail = () => {
    if (cardDetail === data) changeCardDetail(null);
    else changeCardDetail(data);
  };

  return (
    <Card onClick={handleCardDetail}>
      <div style={{ position: "relative" }}>
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
              width="3rem"
              height="2rem"
              borderRadius={"0px 0px 5px 0px"}
              style={{ background: " #ffffffb3" }}
            >
              {/* TODO: aceitar o emoji como parametro */}
            </Box>
            <Box
              key="note_img"
              width="3rem"
              height="3rem"
              borderRadius={"0px 0px 0px 5px"}
              style={{ background: "#00000073" }}
            >
              {/* TODO: aceitar a icone/data como parametro */}
            </Box>
          </div>
        </Grid>
        <CardMedia component="img" height="100%" image={data?.url_image} alt="teste" />
      </div>
    </Card>
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
