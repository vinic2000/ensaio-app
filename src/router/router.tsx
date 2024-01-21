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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddEnsaio" component={AdicionarEnsaio} />
        <Stack.Screen name="GerenciarEnsaio" component={GerenciarEnsaio} />
        <Stack.Screen name="GerenciarMusicos" component={gerenciarMusicos} />
        <Stack.Screen
          name="GerenciarOrganista"
          component={GerenciarOrganista}
        />
        <Stack.Screen
          name="GerenciarMinisterio"
          component={GerenciarMinisterio}
        />
        <Stack.Screen
          name="GerenciarEncarregado"
          component={GerenciarEncarregado}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
