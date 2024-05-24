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
import Login from "../pages/login";
import GerenciarVisita from "../pages/gerencarVisita";
import EditarEnsaio from "../pages/editarEnsaio";
import GerenciarHinos from "../pages/gerenciarHinos";
import Config from "../pages/config";

export default function Router() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "",
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Lista de Ensaio",
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="AddEnsaio"
          component={AdicionarEnsaio}
          options={{
            title: "Novo Ensaio",
          }}
        />
        <Stack.Screen
          name="GerenciarEnsaio"
          component={GerenciarEnsaio}
          options={{
            title: "Ensaio",
          }}
        />
        <Stack.Screen
          name="GerenciarMusicos"
          component={gerenciarMusicos}
          options={{
            title: "Músico",
          }}
        />
        <Stack.Screen
          name="GerenciarOrganista"
          component={GerenciarOrganista}
          options={{
            title: "Organista",
          }}
        />
        <Stack.Screen
          name="GerenciarMinisterio"
          component={GerenciarMinisterio}
          options={{
            title: "Ministério",
          }}
        />
        <Stack.Screen
          name="GerenciarEncarregado"
          component={GerenciarEncarregado}
          options={{
            title: "Encarregado",
          }}
        />
        <Stack.Screen
          name="GerenciarVisita"
          component={GerenciarVisita}
          options={{
            title: "Visita",
          }}
        />

        <Stack.Screen
          name="Hinos"
          component={GerenciarHinos}
          options={{
            title: "Hinos Ensaiados",
          }}
        />

        <Stack.Screen
          name="EditarEnsaio"
          component={EditarEnsaio}
          options={{
            title: "Editar Ensaio",
          }}
        />

        <Stack.Screen
          name="Config"
          component={Config}
          options={{
            title: "Configurações",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
