import { PaperProvider } from "react-native-paper";
import Router from "./router/router";
import { StatusBar } from "react-native";

export default function Index() {
  const theme = {
    colors: {
      primary: "rgb(53, 107, 0)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(156, 250, 81)",
      onPrimaryContainer: "rgb(12, 32, 0)",
      secondary: "rgb(86, 98, 75)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(218, 231, 201)",
      onSecondaryContainer: "rgb(20, 30, 12)",
      tertiary: "rgb(56, 102, 101)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(187, 236, 234)",
      onTertiaryContainer: "rgb(0, 32, 31)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(253, 253, 245)",
      onBackground: "rgb(26, 28, 24)",
      surface: "rgb(253, 253, 245)",
      onSurface: "rgb(26, 28, 24)",
      surfaceVariant: "rgb(224, 228, 214)",
      onSurfaceVariant: "rgb(68, 72, 62)",
      outline: "rgb(116, 121, 109)",
      outlineVariant: "rgb(196, 200, 186)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(47, 49, 44)",
      inverseOnSurface: "rgb(241, 241, 234)",
      inversePrimary: "rgb(129, 221, 54)",
      elevation: {
        level0: "transparent",
        level1: "rgb(243, 246, 233)",
        level2: "rgb(237, 241, 225)",
        level3: "rgb(231, 237, 218)",
        level4: "rgb(229, 236, 216)",
        level5: "rgb(225, 233, 211)",
      },
      surfaceDisabled: "rgba(26, 28, 24, 0.12)",
      onSurfaceDisabled: "rgba(26, 28, 24, 0.38)",
      backdrop: "rgba(45, 50, 40, 0.4)",
      custom0: "rgb(135, 82, 0)",
      onCustom0: "rgb(255, 255, 255)",
      custom0Container: "rgb(255, 221, 186)",
      onCustom0Container: "rgb(43, 23, 0)",
    },
  };
  return (
    <>
      <StatusBar animated={true} networkActivityIndicatorVisible />
      <PaperProvider theme={theme}>
        <Router />
      </PaperProvider>
    </>
  );
}
