import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  Switch,
  Text,
  TextInput,
  Tooltip,
} from "react-native-paper";
import { database, ensaioProps } from "../../service/database";
import { FlatList, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function GerenciarEncarregado() {
  const route = useRoute();

  const { id } = route.params as { id: string };

  const [ensaio, setEnsaio] = useState<ensaioProps>();

  const [visible, setVisible] = useState(false);

  const [regional, setRegional] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const schema = z.object({
    nome: z.string(),
    comum_congregacao: z.string(),
  });

  useEffect(() => {
    const executar = async () => {
      const data = await database.buscarEnsaio(id);
      setEnsaio(data);
    };

    executar();
  }, []);

  const adicionarEncarregado = async (
    nome: string,
    comum_congregacao: string,
    regional: boolean
  ) => {
    const data = await database.adicionarEncarregado(
      id,
      nome,
      comum_congregacao,
      regional
    );

    setEnsaio(data);
    hideModal();
  };

  const removerEncarregado = async (idEncarregado: string) => {
    const data = await database.removerEncarregado(id, idEncarregado);
    setEnsaio(data);
  };

  return (
    <>
      <FlatList
        data={ensaio?.encarregados}
        renderItem={({ item, index }) => (
          <>
            <Card>
              <Card.Title
                title={`Encarregado ${item.regional ? "Regional" : "Local"} : ${
                  item.nome
                }`}
                subtitle={`Congregação: ${item.comum_congregacao} `}
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => {
                  if (index !== 0) {
                    return (
                      <IconButton
                        {...props}
                        icon="delete"
                        onPress={async () => await removerEncarregado(item.id)}
                      />
                    );
                  }
                }}
              />
            </Card>
          </>
        )}
      />

      <Button
        icon={"plus"}
        onPress={showModal}
        mode="contained-tonal"
        style={{
          borderRadius: 0,
        }}
      >
        Cadastrar
      </Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Formik
            initialValues={{
              nome: "",
              comum_congregacao: "",
            }}
            onSubmit={async (values) =>
              await adicionarEncarregado(
                values.nome,
                values.comum_congregacao,
                regional
              )
            }
            validationSchema={toFormikValidationSchema(schema)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={style.container}>
                <TextInput
                  onChangeText={handleChange("nome")}
                  onBlur={handleBlur("nome")}
                  value={values.nome}
                  placeholder="Nome"
                  error={errors.nome ? true : false}
                />

                <TextInput
                  onChangeText={handleChange("comum_congregacao")}
                  onBlur={handleBlur("comum_congregacao")}
                  value={values.comum_congregacao}
                  placeholder="Comum congregação"
                  error={errors.comum_congregacao ? true : false}
                />

                <Text>Regional</Text>
                <Switch
                  onValueChange={() => setRegional(!regional)}
                  value={regional}
                />

                <Button
                  icon={"plus"}
                  onPress={async () => await handleSubmit()}
                  mode="contained"
                  style={{
                    borderRadius: 0,
                  }}
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

const style = StyleSheet.create({
  container: {
    gap: 10,
  },
});
