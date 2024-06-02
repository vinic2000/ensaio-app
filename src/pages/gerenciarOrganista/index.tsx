import { View, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { database, ensaioProps } from "../../service/database";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function GerenciarOrganista() {
  const route = useRoute();

  const { id } = route.params as { id: string };

  const [ensaio, setEnsaio] = useState<ensaioProps>();

  useEffect(() => {
    const executar = async () => {
      const data = await database.buscarEnsaio(id);
      setEnsaio(data);
    };

    executar();
  }, []);

  const add = async (examinadora: boolean) => {
    const data = await database.adicionarOrganista(id, examinadora);
    setEnsaio(data);
  };

  const remover = async (examinadora: boolean) => {
    const data = await database.RemoverOrganista(id, examinadora);
    setEnsaio(data);
  };

  return (
    <View style={style.container}>
      <Card>
        <Card.Title
          title="Organista"
          subtitle={`Quantidade: ${ensaio?.organistas.organista.quantidade}`}
        />
        <Card.Actions>
          <IconButton
            icon={"caret-down-outline"}
            onPress={async () => await remover(false)}
          />
          <IconButton
            icon={"caret-up-outline"}
            onPress={async () => await add(false)}
          />
        </Card.Actions>
      </Card>

      <Card>
        <Card.Title
          title="Organista examinadoras"
          subtitle={`Quantidade: ${ensaio?.organistas.examinadora.quantidade}`}
        />
        <Card.Actions>
          <IconButton icon={"minus"} onPress={async () => remover(true)} />
          <IconButton
            icon={"caret-up-outline"}
            onPress={async () => add(true)}
          />
        </Card.Actions>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    gap: 2,
  },
});
