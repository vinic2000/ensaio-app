import { useRoute } from "@react-navigation/native";
import { Button, Text, Modal, Portal, TextInput } from "react-native-paper";
import { database, ensaioProps, musicoProps } from "../../service/database";
import { Avatar, Card, IconButton, Searchbar } from "react-native-paper";
import { FlatList, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Formik } from "formik";

import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import CardClique from "../../components/cardsClique";

export default function GerenciarMusicos() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [ensaio, setEnsaio] = useState<ensaioProps>();
  const [searchQuery, setSearchQuery] = useState("");
  const [queryMusicos, setQueryMusicos] = useState<musicoProps[]>();

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    const executar = async () => {
      const data = await database.buscarEnsaio(id);
      setEnsaio(data);
    };

    executar();
  }, []);

  const buscarInstrumento = (instrumento: string) => {
    const result = ensaio?.musicos?.filter((m) => {
      const result = m.instrumento
        .toUpperCase()
        .indexOf(instrumento.toUpperCase());

      if (result !== -1) {
        return true;
      } else {
        return false;
      }
    });

    setQueryMusicos(result);
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };

  const addMusico = async (instrumento: string) => {
    const data = await database.addMusico(instrumento, ensaio?.id as string);
    setEnsaio(data);
    hideModal();
  };

  const removerMusico = async (instrumento: string) => {
    Alert.alert(
      "Remover instrumento",
      "Tem certeza que seja remover o músico",
      [
        {
          text: "cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async () => {
            const data = await database.removerMusico(
              instrumento,
              ensaio?.id as string
            );
            setEnsaio(data);
            hideModal();
          },
        },
      ]
    );
  };

  const addMaisUm = async (instrumento: string) => {
    const data = await database.addMiasUm(instrumento, id);
    setEnsaio(data);
  };

  const MenosUm = async (instrumento: string) => {
    const data = await database.addMenosUm(instrumento, id);
    setEnsaio(data as ensaioProps);
  };

  const schema = z.object({
    instrumento: z.string(),
  });

  return (
    <>
      <Searchbar
        placeholder="Pesquisar Instrumento"
        onChangeText={(value) => {
          setSearchQuery(value);
          buscarInstrumento(value);
          console.log("Executando apenas uma vez");
        }}
        value={searchQuery}
      />
      <FlatList
        data={searchQuery.length ? queryMusicos : ensaio?.musicos}
        renderItem={({ item }) => (
          <CardClique
            item={item}
            maisUm={async () => await addMaisUm(item.instrumento)}
            menosUm={async () => await MenosUm(item.instrumento)}
          />
        )}
      />

      <Button onPress={showModal}>Adicionar Instrumento</Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Formik
            initialValues={{
              instrumento: "",
            }}
            onSubmit={async (values) => await addMusico(values.instrumento)}
            validationSchema={toFormikValidationSchema(schema)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <Text variant="labelLarge">
                  Adicionando um novo instrumento
                </Text>
                <TextInput
                  placeholder="Novo instrumento"
                  style={style.input}
                  onChangeText={handleChange("instrumento")}
                  onBlur={handleBlur("instrumento")}
                  value={values.instrumento}
                />
                <Text>{errors.instrumento}</Text>
                <Button
                  icon="plus"
                  mode="contained"
                  style={style.button}
                  onPress={async () => await handleSubmit()}
                >
                  Adicionar
                </Button>
              </>
            )}
          </Formik>
        </Modal>
      </Portal>
    </>
  );
}

const style = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  input: {
    marginTop: 10,
  },
});
