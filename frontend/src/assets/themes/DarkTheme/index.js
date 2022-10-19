import { createTheme } from "@mui/material/styles";

const darkColors = {
  background: "#262626",
  foreground: "#181818",
  text: "#ffffff",
  textSubtitle: "#ffffff99",
  red: "#FF0000",
};

// Dark theme
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
    textColor: darkColors.text,
    textSubtitleColor: darkColors.textSubtitle,
    type: "dark",
    primary: {
      main: "#8980E8",
      light: "rgb(81, 91, 95)",
      dark: "rgb(26, 35, 39)",
      contrastText: "#ffffff",
    },

    background: {
      default: "#262626",
      foreground: darkColors.foreground,
    },
    text: {
      secondary: darkColors.textSubtitle,
    },
    action: {
      active: "#fff",
    },
  },
  components: {
    MuiAppBar: {
      variants: [
        {
          props: { variant: "menu" },
          style: {
            backgroundColor: darkColors.foreground,
            color: darkColors.text,
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: darkColors.text,
          backgroundColor: darkColors.foreground,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: darkColors.text,
          backgroundColor: darkColors.foreground,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          color: darkColors.textSubtitle,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: darkColors.text,
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconEmpty: {
          color: darkColors.textSubtitle,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: darkColors.textSubtitle,
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined-cancel" },
          style: {
            border: "1px solid " + darkColors.textSubtitle,
            color: darkColors.textSubtitle,
          },
        },
        {
          props: { variant: "outlined-delete" },
          style: {
            border: "1px solid " + darkColors.red,
            color: darkColors.red,
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.foreground,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: darkColors.text,
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "text-placeholder" },
          style: {
            color: darkColors.textSubtitle,
          },
        },
        {
          props: { variant: "text-placeholder-small" },
          style: {
            color: darkColors.textSubtitle,
            fontSize: "12px",
          },
        },
      ],
    },
  },
});

export default theme;
