import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
import { database, ensaioProps } from "../../service/database";

export default function GerenciarEnsaio() {
  const route = useRoute();

  const navigation = useNavigation();

  const focused = useIsFocused();

  const { id } = route.params as { id: string };

  const [ensaio, setEnsaio] = useState<ensaioProps>();

  const executar = async () => {
    const data = await database.buscarEnsaio(id);
    setEnsaio(data);

    console.log("enssio", data);
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

  const contarOrganistas = (): number => {
    const totalOrganistas = ensaio?.organistas.organista.quantidade as number;

    const totaExaminadoras = ensaio?.organistas.examinadora
      .quantidade as number;

    return totalOrganistas + totaExaminadoras;
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
    </>
  );
}
