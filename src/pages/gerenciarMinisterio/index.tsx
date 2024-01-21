import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  TextInput,
  Text,
} from "react-native-paper";
import { database, ensaioProps } from "../../service/database";
import { FlatList, View } from "react-native";
import { Formik } from "formik";

import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function GerenciarMinisterio() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

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

  const schema = z.object({
    nome: z.string(),
    comum_congregacao: z.string(),
  });

  const adicionarMinisterio = async (
    nome: string,
    comum_congregacao: string
  ) => {
    const ensaio = await database.adicionarMinisterio(
      id,
      nome,
      comum_congregacao
    );

    setEnsaio(ensaio);
    hideModal();
  };

  const removerMinisterio = async (idEnsaio: string, idMinisterio: string) => {
    const ensaio = await database.removerMinisterio(idEnsaio, idMinisterio);
    setEnsaio(ensaio);
  };

  return (
    <>
      <FlatList
        data={ensaio?.ministerio}
        renderItem={({ item }) => (
          <Card key={item.id}>
            <Card.Title
              title={`Congregação: ${item.comum_congregacao}`}
              subtitle={`Nome: ${item.nome}`}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={async () => await removerMinisterio(id, item.id)}
                />
              )}
            />
          </Card>
        )}
      />

      <Button icon={"plus"} onPress={showModal}>
        Adicionar
      </Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Formik
            initialValues={{ nome: "", comum_congregacao: "" }}
            onSubmit={async (values) =>
              await adicionarMinisterio(values.nome, values.comum_congregacao)
            }
            validationSchema={toFormikValidationSchema(schema)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={{ gap: 10 }}>
                <TextInput
                  placeholder="Nome"
                  onChangeText={handleChange("nome")}
                  onBlur={handleBlur("nome")}
                  value={values.nome}
                  error={errors.nome?.length ? true : false}
                />
                <TextInput
                  placeholder="Comum congregação"
                  onChangeText={handleChange("comum_congregacao")}
                  onBlur={handleBlur("comum_congregacao")}
                  value={values.comum_congregacao}
                  error={errors.comum_congregacao?.length ? true : false}
                />
                <Button
                  icon={"plus"}
                  onPress={async () => await handleSubmit()}
                >
                  Adicionar
                </Button>
              </View>
            )}
          </Formik>
        </Modal>
      </Portal>
    </>
  );
}
