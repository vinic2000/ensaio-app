import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Alert, FlatList, StyleSheet } from "react-native";

import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { database, ensaioProps } from "../../service/database";
import moment from "moment";

export default function Home() {
  const [ensaios, setEnsaios] = useState<ensaioProps[]>();

  const navigation = useNavigation();

  const focus = useIsFocused();

  useEffect(() => {
    const executar = async () => {
      const data = await database.todosEnsaios();
      console.log("Ensaio", data);
      setEnsaios(data);
    };

    executar();
  }, [focus]);

  const deletarEnsaio = async (id: string) => {
    Alert.alert("Excluir ensaio", "Tem certeza que seja excluir o ensaio", [
      { text: "Cancelar", style: "cancel", onPress: () => {} },
      {
        text: "Excluir",
        style: "default",
        onPress: async () => {
          const data = await database.deletarEnsaio(id);
          setEnsaios(data);
        },
      },
    ]);
  };

  return (
    <>
      <FlatList
        data={ensaios}
        renderItem={({ item }) => (
          <>
            <Card>
              <Card.Title
                title={`Congregação ${item.comum_congregacao}`}
                subtitle={`Encarregado ${item.encarregado}`}
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => (
                  <>
                    <IconButton
                      {...props}
                      icon="eye"
                      onPress={() =>
                        navigation.navigate("GerenciarEnsaio", { id: item.id })
                      }
                    />
                    <IconButton
                      {...props}
                      icon="delete"
                      onPress={async () => await deletarEnsaio(item.id)}
                    />
                  </>
                )}
              />
              <Card.Content>
                <Text
                  variant="bodyMedium"
                  style={{
                    textAlign: "right",
                  }}
                >
                  Data: {moment(item.data).format("DD-MM-YYYY")}
                </Text>
              </Card.Content>
            </Card>
          </>
        )}
      />
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("AddEnsaio")}
        style={{
          borderRadius: 0,
        }}
      >
        Novo ensaio
      </Button>
    </>
  );
}
