import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { Box, CardMedia, Typography } from "@mui/material";
import minions from "../../assets/img/minions.jpg";

function CardMovie({ color, icon, title, description, value }) {
  return (
    <Card>
      <CardMedia component="img" height="100%" image={minions} alt="teste" />
      {/* <Box p={2} mx={4} display="flex" justifyContent="center">
        <Box
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          style={{ background: "red" }}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </Box>
      </Box>
      <Box pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <Typography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </Typography>
        {description && (
          <Typography variant="caption" color="text" fontWeight="regular">
            {description}
          </Typography>
        )}
        {description && !value ? null : <Divider />}
        {value && (
          <Typography variant="h5" fontWeight="medium">
            {value}
          </Typography>
        )}
      </Box> */}
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
