import { UnistylesRegistry } from "react-native-unistyles";
import { breakpoints, lightTheme, darkTheme } from "@/styles/theme";

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof darkTheme;
  dark: typeof darkTheme;
};
declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: darkTheme,
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true,
  });
