import PropTypes from "prop-types";

import { Box, Card, CardMedia, Grid } from "@mui/material";

function CardMovie({ image, icon, title, description, value }) {
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
  color: "info",
  value: "",
  description: "",
};

CardMovie.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CardMovie;
