import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { database } from "../../service/database";
import { Alert, FlatList, TouchableOpacity } from "react-native";

export default function GerenciarHinos() {
  const router = useRoute();

  const { id } = router.params as { id: string };

  const [hinos, setHinos] = useState<number[]>([]);

  const [textHinos, setTextHinos] = useState<string>("");

  useEffect(() => {
    const executar = async () => {
      const data = await database.buscarEnsaio(id);
      setHinos(data.hinos);
    };

    executar();
  }, []);

  const adicionar = async () => {
    if (/^[0-9]+$/.test(textHinos as string)) {
      const numero = parseInt(textHinos);
      if (numero >= 1 && numero <= 480) {
        if (!hinos.find((h) => h === numero)) {
          setHinos([...hinos, numero]);
          await database.atualizarHinos(id, [...hinos, numero]);
        }
      }
    }
  };

  const remover = async (hino: number) => {
    const novoArray = hinos.filter((h) => h !== hino);
    await database.atualizarHinos(id, novoArray);
    setHinos(novoArray);
  };

  const createTwoButtonAlert = (hino: number) =>
    Alert.alert(
      "Retirar hino da lista",
      "Tem certeza que deseja excluir o hino X",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        { text: "Retirar", onPress: async () => await remover(hino) },
      ]
    );

  return (
    <>
      <TextInput onChangeText={setTextHinos} keyboardType="numeric" />
      <Button
        onPress={async () => {
          await adicionar();
        }}
      >
        Adicionar
      </Button>

      <FlatList
        data={hinos.sort((a, b) => a - b)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onLongPress={async () => createTwoButtonAlert(item)}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "#E5E5E5",
                padding: 10,
                textAlign: "center",
              }}
              key={index}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
