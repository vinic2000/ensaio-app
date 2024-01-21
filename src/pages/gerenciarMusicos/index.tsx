import { useRoute } from "@react-navigation/native";
import { Button, Text, Modal, Portal, TextInput } from "react-native-paper";
import { database, ensaioProps } from "../../service/database";
import { Avatar, Card, IconButton } from "react-native-paper";
import { FlatList, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Formik } from "formik";

import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function GerenciarMusicos() {
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

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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

  const addMenosUm = async (instrumento: string) => {
    const data = await database.addMenosUm(instrumento, id);
    setEnsaio(data);
  };

  const schema = z.object({
    instrumento: z.string(),
  });

  return (
    <>
      <FlatList
        data={!ensaio?.musicos ? [] : ensaio.musicos}
        renderItem={({ item }) => (
          <>
            <Card>
              <Card.Title
                title={item.instrumento}
                subtitle={`Quantidade: ${item.quantidade}`}
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => (
                  <>
                    <IconButton
                      {...props}
                      icon="delete"
                      onPress={async () =>
                        await removerMusico(item.instrumento)
                      }
                    />
                  </>
                )}
              />
              <Card.Actions>
                <IconButton
                  icon={"plus"}
                  onPress={async () => await addMaisUm(item.instrumento)}
                />
                <IconButton
                  icon={"minus"}
                  onPress={async () => await addMenosUm(item.instrumento)}
                />
              </Card.Actions>
            </Card>
          </>
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
