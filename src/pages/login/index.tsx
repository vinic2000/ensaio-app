import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  //Configurando autenticação usando a digital

  const navigate = useNavigation();

  async function VerificarPermissaoParaAutenticacao() {
    const compatibilidade = await LocalAuthentication.hasHardwareAsync();

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
  }

  async function autenticar() {
    const isbiometria = await LocalAuthentication.isEnrolledAsync();

    if (!isbiometria) {
      return Alert.alert("Não existe uma biometria configurada no sistema");
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
    VerificarPermissaoParaAutenticacao();
    autenticar();
  });

  return <View />;
}
