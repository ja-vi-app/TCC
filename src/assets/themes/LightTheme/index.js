import { createTheme } from "@mui/material/styles";

const lightColors = {
  background: "#EBEBEB",
  foreground: "#fff",
  text: "#000",
  textSubtitle: "#00000099",
};

// Normal or default theme
const theme = createTheme({
  palette: {
    textColor: lightColors.text,
    textSubtitleColor: lightColors.textSubtitle,
    primary: {
      main: "#8980E8",
    },
    secondary: {
      main: "#cc4444",
    },
    background: {
      default: "#EBEBEB",
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
  },
});

export default theme;
