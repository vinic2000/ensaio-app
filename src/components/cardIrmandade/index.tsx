import { useEffect, useState } from "react";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { database, ensaioProps } from "../../service/database";

type props = {
  id: string;
  ensaio: ensaioProps;
  retorno: Function;
};
export default function CardIrmandade({ ensaio: data, id, retorno }: props) {
  const [ativo, setAtivo] = useState(false);

  const [ensaio, setEnsaio] = useState<ensaioProps>();

  const addMaisUm = async (irma: boolean) => {
    let result: ensaioProps;

    if (irma) {
      result = await database.addMaisUmaIrma(id);
    } else {
      result = await database.addMaisUmIrmao(id);
    }
    retorno(result);
    setEnsaio(result);
  };

  const removerMenosUm = async (irma: boolean) => {
    let result: ensaioProps;

    if (irma) {
      result = await database.removerMenosUmaIrma(id);
    } else {
      result = await database.removerMenosUmIrmao(id);
    }

    retorno(result);
    setEnsaio(result);
  };

  useEffect(() => {
    setEnsaio(data);
  }, [data]);

  return (
    <>
      <Card onPress={() => setAtivo(!ativo)}>
        <Card.Title
          title={"Irmandade"}
          //   subtitle={`Quantidade: ${dados.quantidade}`}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />

        {!ativo || (
          <Card.Actions>
            <Text style={style.text}>
              Irmãos: {ensaio?.irmandade.irmaos || 0}
            </Text>
            <IconButton
              icon={"plus"}
              onPress={async () => await addMaisUm(false)}
            />
            <IconButton
              icon={"minus"}
              onPress={async () => await removerMenosUm(false)}
            />
          </Card.Actions>
        )}

        {!ativo || (
          <Card.Actions>
            <Text style={style.text}>
              Irmãs : {ensaio?.irmandade.irmas || 0}
            </Text>
            <IconButton
              icon={"plus"}
              onPress={async () => await addMaisUm(true)}
            />
            <IconButton
              icon={"minus"}
              onPress={async () => await removerMenosUm(true)}
            />
          </Card.Actions>
        )}
      </Card>
    </>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
