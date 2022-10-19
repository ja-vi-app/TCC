import { createTheme } from "@mui/material/styles";

const lightColors = {
  background: "#EBEBEB",
  foreground: "#fff",
  text: "#000",
  textSubtitle: "#00000099",
  red: "#FF0000",
};

// Normal or default theme
const theme = createTheme({
  typography: {
    fontSize: 12,
    fontFamily: [
      "Lato",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
  palette: {
    textColor: lightColors.text,
    textSubtitleColor: lightColors.textSubtitle,
    primary: {
      main: "#8980E8",
      light: "rgb(81, 91, 95)",
      dark: "rgb(26, 35, 39)",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#cc4444",
    },
    background: {
      default: "#EBEBEB",
      foreground: lightColors.foreground,
    },
    text: {
      secondary: lightColors.textSubtitle,
    },
  },
  styleOverrides: {
    MuiContainer: {
      root: {
        color: "#000",
        backgroundColor: "#454545",
      },
    },
  },
  components: {
    MuiAppBar: {
      variants: [
        {
          props: { variant: "menu" },
          style: {
            backgroundColor: lightColors.foreground,
            color: lightColors.text,
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: lightColors.text,
          backgroundColor: lightColors.foreground,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: lightColors.text,
          backgroundColor: lightColors.foreground,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          color: lightColors.textSubtitle,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: lightColors.text,
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "text-placeholder" },
          style: {
            color: lightColors.textSubtitle,
          },
        },
        {
          props: { variant: "text-placeholder-small" },
          style: {
            color: lightColors.textSubtitle,
            fontSize: "12px",
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined-cancel" },
          style: {
            border: "1px solid " + lightColors.textSubtitle,
            color: lightColors.textSubtitle,
          },
        },
        {
          props: { variant: "outlined-delete" },
          style: {
            border: "1px solid " + lightColors.red,
            color: lightColors.red,
          },
        },
      ],
    },
    MuiCircularProgress: {
      styleOverrides: {
        color: "red",
      },
    },
  },
});

export default theme;
