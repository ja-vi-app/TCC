import { createTheme } from "@mui/material/styles";

import colors from "./base/colors";
import breakpoints from "./base/breakpoints";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
});
