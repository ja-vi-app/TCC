import * as React from "react";
import { TextField } from "@mui/material";

export default function FormTitleSelector(props) {
  function changeForm(title) {
    props.setData({ ...props.data, title });
  }

  return (
    <TextField
      margin="dense"
      id="name"
      label="Título"
      type="title"
      fullWidth
      variant="standard"
      value={props.data.title}
      onChange={(value) => changeForm(value?.target?.value)}
    />
  );
}
