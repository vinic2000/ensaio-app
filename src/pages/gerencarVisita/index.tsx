import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

import { database } from "../../service/database";

export default function GerenciarVisita() {
  const route = useRoute();

  const { id } = route.params as {
    id: string;
  };

  const [texto, setTexto] = useState<string>();

  useEffect(() => {
    const executar = async () => {
      const data = await database.buscarEnsaio(id);
      setTexto(data.visita);
    };

    executar();
  }, []);

  const alterarTexto = async (texto: string) => {
    setTexto(texto);
    await database.salvarTexto(id, texto);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textareaContainer}>
        <TextInput
          style={styles.textarea}
          onChangeText={alterarTexto}
          defaultValue={texto || ''}
          multiline={true}
          numberOfLines={10}
          placeholder="Digite as informações das visitas..."
          placeholderTextColor={"#c7c7c7"}
          underlineColorAndroid={"transparent"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  textareaContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textarea: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333",
    fontFamily: "System",
  },
});
