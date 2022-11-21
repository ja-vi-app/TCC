import * as React from "react";

import { Typography, Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0: "Insuportável (0)",
  0.5: "Menos Insuportável (0.5)",
  1: "Péssimo (1)",
  1.5: "Menos péssimo (1.5)",
  2: "Horroroso (2)",
  2.5: "Menos horroroso (2.5)",
  3: "Desagradável (3)",
  3.5: "Menos desagradável (3.5)",
  4: "Fraco (4)",
  4.5: "Menos fraco (4.5)",
  5: "Assistível (5)",
  5.5: "Mais assistível (5.5)",
  6: "Ok (6)",
  6.5: "Mais Ok (6.5)",
  7: "Bom (7) ",
  7.5: "Muito bom (7.5)",
  8: "Sensacional (8)",
  8.5: "Muito Sensacional (8.5)",
  9: "Exelente (9)",
  9.5: "Brilhante (9.5)",
  10: "Obra prima (10)",
};

function getLabelText(ratingValue) {
  return `${ratingValue} Star${ratingValue !== 1 ? "s" : ""}, ${
    labels[ratingValue]
  }`;
}

export default function FormRatingSelector(props) {
  const [hover, setHover] = React.useState(-1);

  function changeForm(rating) {
    props.setData({ ...props.data, rating });
  }

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        flexWrap: "nowrap",
      }}
    >
      <Typography color="textSubtitleColor" sx={{ whiteSpace: "nowrap" }}>
        Nota:
      </Typography>
      <Rating
        name="hover-feedback"
        max={10}
        precision={0.5}
        getLabelText={() => getLabelText(props.data.rating)}
        onChange={(event, rating) => {
          changeForm(rating);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        value={props.data.rating ?? ""}
      />
      {props?.data?.rating !== null && (
        <Typography sx={{ whiteSpace: "nowrap" }}>
          {labels[hover !== -1 ? hover : props?.data?.rating ?? 0]}
        </Typography>
      )}
    </Box>
  );
}
