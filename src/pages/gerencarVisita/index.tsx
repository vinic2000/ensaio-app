import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Textarea from "react-native-textarea";

import { database } from "../../service/database";
import { StyleSheet } from "react-native";

export default function GerenciarVisita() {
  const route = useRoute();

  const { id } = route.params as {
    id: number;
  };

  const [texto, setTexto] = useState<string>();

  useEffect(() => {
    const executar = async () => {
      const data = await database.buscarEnsaio(id.toString());
      setTexto(data.visita);
    };

    executar();
  }, []);

  const alterarTexto = async (texto: string) => {
    setTexto(texto);
    await database.salvarTexto(id.toString(), texto);
  };

  return (
    <>
      <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.textarea}
        onChangeText={alterarTexto}
        defaultValue={texto}
        // maxLength={120}
        // placeholder={""}
        placeholderTextColor={"#c7c7c7"}
        underlineColorAndroid={"transparent"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textareaContainer: {
    height: 350,
    padding: 10,
    backgroundColor: "#F5FCFF",
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 300,
    fontSize: 14,
    color: "#333",
  },
});
