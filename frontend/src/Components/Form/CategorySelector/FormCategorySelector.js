import * as React from "react";
import { TextField } from "@mui/material";

export default function FormCategorySelector(props) {
  function changeForm(category) {
    props.setData({ ...props.data, category });
  }

  return (
    <TextField
      margin="dense"
      id="name"
      label="Categoria"
      type="category"
      fullWidth
      variant="standard"
      value={props.data.category}
      onChange={(value) => changeForm(value?.target?.value)}
    />
  );
}
