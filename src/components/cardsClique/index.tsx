import { Avatar, Card, IconButton, Text } from "react-native-paper";
import { musicoProps } from "../../service/database";
import { useState } from "react";

type props = {
  maisUm: Function;
  menosUm: Function;
  item: musicoProps;
};

export default function CardClique({ maisUm, menosUm, item }: props) {
  const [ativo, setAtivo] = useState(false);

  return (
    <>
      <Card onPress={() => setAtivo(!ativo)}>
        <Card.Title
          title={item.instrumento}
          subtitle={`Quantidade: ${item.quantidade}`}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />

        {!ativo || (
          <Card.Actions>
            <IconButton icon={"plus"} onPress={async () => await maisUm()} />
            <IconButton icon={"minus"} onPress={async () => await menosUm()} />
          </Card.Actions>
        )}
      </Card>
    </>
  );
}
