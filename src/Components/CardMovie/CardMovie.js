import PropTypes from "prop-types";

import { Box, Card, CardMedia, Grid } from "@mui/material";
import minions from "../../assets/img/minions.jpg";

function CardMovie({ image, iconOrDate, emoji }) {
  return (
    <Card>
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
        <CardMedia component="img" height="100%" image={image} alt="teste" />
      </div>
    </Card>
  );
}

CardMovie.defaultProps = {
  image: minions,
};

CardMovie.propTypes = {
  iconOrDate: PropTypes.node.isRequired,
  emoji: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default CardMovie;
