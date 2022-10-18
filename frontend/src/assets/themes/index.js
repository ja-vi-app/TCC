import normal from "./LightTheme";
import dark from "./DarkTheme";

const themes = {
  normal,
  dark,
};

export default function getTheme(theme) {
  return themes[theme];
}
