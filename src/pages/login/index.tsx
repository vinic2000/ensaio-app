import { useEffect } from "react";
import { Alert } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  //Configurando autenticação usando a digital

  const navigate = useNavigation();

  async function autenticar() {
    const compatibilidade = await LocalAuthentication.hasHardwareAsync();
    console.log("compatibilidade", compatibilidade);

    if (!compatibilidade) {
      console.log(
        "Sistema não possui compatibilidade para usar biometria como autenticação"
      );
      navigate.navigate("Home");
    }

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (!types.length) {
      console.log(
        "Sistema não possui compatibilidade para usar biometria como autenticação"
      );
      navigate.navigate("Home");
    }

    const isbiometria = await LocalAuthentication.isEnrolledAsync();

    if (!isbiometria) {
      Alert.alert("Necessário cadastrar biometria");
      navigate.navigate("Home");
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login",
      fallbackLabel: "Biometria não reconhecida",
    });

    if (auth) {
      navigate.navigate("Home");
    }
  }

  useEffect(() => {
    autenticar();
  });

  return <></>;
}
