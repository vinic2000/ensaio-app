import { Avatar, Card, IconButton, Text } from "react-native-paper";
import { ministerioProps, musicoProps } from "../../service/database";
import { useState } from "react";

type props = {
  maisUm: Function;
  menosUm: Function;
  item: musicoProps | ministerioProps;
  tipo: "instrumentos" | "ministerio";
};

export default function CardClique({ maisUm, menosUm, item, tipo }: props) {
  const [ativo, setAtivo] = useState(false);

  const verificarTipo = () => {
    if (tipo === "instrumentos") {
      const dados = item as musicoProps;
      return (
        <Card.Title
          title={dados.instrumento}
          subtitle={`Quantidade: ${dados.quantidade}`}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
      );
    }

    if (tipo === "ministerio") {
      const dados = item as ministerioProps;
      return (
        <Card.Title
          title={dados.Cargo}
          subtitle={`Quantidade: ${dados.quantidade}`}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
      );
    }
  };

  return (
    <>
      <Card onPress={() => setAtivo(!ativo)}>
        {verificarTipo()}
        {!ativo || (
          <Card.Actions>
            <IconButton
              icon={"plus"}
              onPress={async () => {
                item.quantidade = item.quantidade + 1;
                await maisUm();
              }}
            />
            <IconButton
              icon={"minus"}
              onPress={async () => {
                if (item.quantidade > 0) {
                  item.quantidade = item.quantidade - 1;
                  await menosUm();
                }
              }}
            />
          </Card.Actions>
        )}
      </Card>
    </>
  );
}
