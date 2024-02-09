import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import { database, ensaioProps } from "../../service/database";
import Pdf from "../../service/pdf";
import { TextInput } from "react-native";

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

  const salvartexto = async (texto: string) => {
    setTextoVisita(texto);
    const ensaio = await database.salvarTexto(id, texto);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("GerenciarMusicos", { id: ensaio?.id })
        }
      >
        <Card.Title
          title="Musicos"
          subtitle={`Total: ${contarMusicos()}`}
          left={(props) => <Avatar.Icon {...props} icon="violin" />}
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
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
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
            title="Encarreagados"
            subtitle={`Total: ${ensaio?.encarregados.length}`}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="eye" />}
          />
        </Card>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8}>
        <Card>
          <Card.Title
            title="Visitas"
            // subtitle={`Total: ${ensaio?.encarregados.length}`}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="eye" />}
          />

          <TextInput
            multiline={true}
            numberOfLines={4}
            style={{
              height: 150,
              justifyContent: "flex-start",
            }}
            value={textoVista}
            onChangeText={async (value) => await salvartexto(value)}
          />
        </Card>
      </TouchableOpacity>

      <Button
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 4,
          borderRadius: 0,
        }}
        // onPress={() => navigation.navigate("Pdf", { ensaio: ensaio })}
        onPress={async () => {
          const pdf = new Pdf(ensaio as ensaioProps);
          pdf.gearPdf();
        }}
        mode="contained"
      >
        Gerar PDF
      </Button>
    </>
  );
}
