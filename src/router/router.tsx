import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/home";
import AdicionarEnsaio from "../pages/adicionarEnsaio";
import GerenciarEnsaio from "../pages/gerenciarEnsaio";
import gerenciarMusicos from "../pages/gerenciarMusicos";
import GerenciarOrganista from "../pages/gerenciarOrganista";
import GerenciarMinisterio from "../pages/gerenciarMinisterio";
import GerenciarEncarregado from "../pages/gerenciarEncarregado";

export default function Router() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="AddEnsaio"
          component={AdicionarEnsaio}
          options={{
            title: "Adicionar ensaio",
          }}
        />
        <Stack.Screen
          name="GerenciarEnsaio"
          component={GerenciarEnsaio}
          options={{
            title: "Gerenciar Ensaio",
          }}
        />
        <Stack.Screen
          name="GerenciarMusicos"
          component={gerenciarMusicos}
          options={{
            title: "Gerenciar musicos",
          }}
        />
        <Stack.Screen
          name="GerenciarOrganista"
          component={GerenciarOrganista}
          options={{
            title: "Gerenciar Organista",
          }}
        />
        <Stack.Screen
          name="GerenciarMinisterio"
          component={GerenciarMinisterio}
          options={{
            title: "Gerenciar Ministerio",
          }}
        />
        <Stack.Screen
          name="GerenciarEncarregado"
          component={GerenciarEncarregado}
          options={{
            title: "Gerenciar encarregado",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
