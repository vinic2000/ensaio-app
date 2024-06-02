import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import { database, ensaioProps } from "../../service/database";
import Pdf from "../../service/pdf";
import { View } from "react-native";
import CardIrmandade from "../../components/cardIrmandade";
import { totalGeral } from "../../service/totais";
import { StyleSheet } from "react-native";
import Router from "../../router/router";
export default function GerenciarEnsaio() {
  const route = useRoute();

  const navigation = useNavigation();

  const focused = useIsFocused();

  const { id } = route.params as { id: string };

  const [ensaio, setEnsaio] = useState<ensaioProps>();
  const [textoVista, setTextoVisita] = useState<string>();

  const executar = async () => {
    const data = await database.buscarEnsaio(id);
    setEnsaio(data);
    setTextoVisita(data.visita);
  };

  useEffect(() => {
    executar();
  }, [focused]);

  const contarMusicos = (): number => {
    if (!ensaio?.musicos) {
      return 0;
    }

    const totalMusicos = ensaio.musicos.reduce(
      (total, musico) => (total += musico.quantidade),
      0
    );
    return totalMusicos;
  };

  const contarMinisterio = (): number => {
    if (!ensaio?.ministerio) {
      return 0;
    }

    const totalMinisterio = ensaio.ministerio.reduce(
      (total, m) => (total += m.quantidade),
      0
    );
    return totalMinisterio;
  };

  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get("window").height * 0.95,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("GerenciarMusicos", { id: ensaio?.id })
        }
      >
        <Card.Title
          title="Musicos"
          subtitle={`Total: ${contarMusicos()}`}
          left={(props) => (
            <Avatar.Icon {...props} icon="musical-notes-sharp" />
          )}
          right={(props) => <IconButton {...props} icon="eye" />}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("GerenciarMinisterio", { id: ensaio.id })
        }
      >
        <Card>
          <Card.Title
            title="Ministerio"
            subtitle={`Total: ${contarMinisterio()}`}
            left={(props) => <Avatar.Icon {...props} icon="people" />}
            right={(props) => <IconButton {...props} icon="eye" />}
          />
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("GerenciarEncarregado", { id: ensaio?.id })
        }
      >
        <Card>
          <Card.Title
            title="Encarregado"
            subtitle={`Total: ${ensaio?.encarregados.length || 0}`}
            left={(props) => <Avatar.Icon {...props} icon="musical-note" />}
            right={(props) => <IconButton {...props} icon="eye" />}
          />
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("GerenciarVisita", {
            id: id,
          })
        }
      >
        <Card>
          <Card.Title
            title="Visitas"
            // subtitle={`Total: ${ensaio?.encarregados.length}`}
            left={(props) => <Avatar.Icon {...props} icon="people-sharp" />}
            right={(props) => <IconButton {...props} icon="eye" />}
          />
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Hinos", { id: id })}
      >
        <Card>
          <Card.Title
            title="Hinos"
            subtitle={`Total: ${ensaio?.hinos.length || 0}`}
            // subtitle={`Total: ${ensaio?.encarregados.length}`}
            left={(props) => (
              <Avatar.Icon {...props} icon="musical-note-sharp" />
            )}
            right={(props) => <IconButton {...props} icon="eye" />}
          />
        </Card>
      </TouchableOpacity>

      <CardIrmandade
        id={id}
        ensaio={ensaio as ensaioProps}
        retorno={(data: ensaioProps) => setEnsaio(data)}
      />

      <Card>
        <Card.Title
          title={`Total geral: ${ensaio ? totalGeral(ensaio) : 0}`}
          left={(props) => <Avatar.Icon {...props} icon="people-sharp" />}
        />
      </Card>

      <Button
        style={style.buttonAlterar}
        onPress={() => navigation.navigate("EditarEnsaio", { id: ensaio.id })}
        icon={"create-outline"}
      >
        Alterar
      </Button>

      <Button
        style={style.buttonGerar}
        // onPress={() => navigation.navigate("Pdf", { ensaio: ensaio })}
        onPress={async () => {
          const pdf = new Pdf(ensaio as ensaioProps);
          pdf.gearPdf();
        }}
        mode="contained"
        icon={"add-circle"}
      >
        Gerar PDF
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  buttonGerar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 4,
    borderRadius: 0,
    height: 50,
  },

  buttonAlterar: {
    position: "absolute",
    bottom: 55,
    width: "100%",
    padding: 4,
    borderRadius: 0,
  },
});
