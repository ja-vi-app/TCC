import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useFormCreateCard, useFormCreateCardUpdate } from "../../../Context/FormCreateCardContext";
import { Typography } from "@mui/material";

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

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function RatingCustom() {
  const [hover, setHover] = React.useState(-1);

  const formCreateCard = useFormCreateCard();
  const changeFormCreateCard = useFormCreateCardUpdate();

  function changeForm(newValue) {
    changeFormCreateCard((prevState) => ({ ...prevState, rating: newValue }));
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
      <Typography sx={{ whiteSpace: "nowrap" }}>Nota:</Typography>
      <Rating
        name="hover-feedback"
        max={10}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          changeForm(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {formCreateCard?.rating !== null && (
        <Typography sx={{ whiteSpace: "nowrap" }}>
          {labels[hover !== -1 ? hover : formCreateCard?.rating ?? 0]}
        </Typography>
      )}
    </Box>
  );
}
