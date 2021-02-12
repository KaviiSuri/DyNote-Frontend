import { extendTheme } from "@chakra-ui/react";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    light: "#F4F7F6",
    medium: "#49C5B6",
    dark: "#041D2C",
    highlight: "#3EC7C2",
  },
};
export const theme = extendTheme({ colors });
