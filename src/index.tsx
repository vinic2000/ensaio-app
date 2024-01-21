import { PaperProvider } from "react-native-paper";
import Router from "./router/router";

export default function Index() {
  return (
    <>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </>
  );
}
