import { createTheme } from "@mui/material/styles";

import colors from "./base/colors";
import breakpoints from "./base/breakpoints";
import colorsDark from "./base/colorsDark";

export const themeLight = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
});

export const themeDark = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colorsDark },
});
