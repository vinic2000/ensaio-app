import { Text, TextInput, Button } from "react-native-paper";
import Container from "../../components/container";
import { Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { StyleSheet } from "react-native";
import { database } from "../../service/database";

import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AdicionarEnsaio() {
  const navigation = useNavigation();

  const schema = z.object({
    encarregado: z.string(),
    congregacao: z.string(),
  });

  return (
    <Container>
      <Formik
        initialValues={{ encarregado: "", congregacao: "" }}
        onSubmit={async (values) => {
          try {
            const novoEnsaio = await database.addEnsaio({
              comum_congregacao: values.congregacao,
              encarregado: values.encarregado,
            });

            navigation.navigate("GerenciarEnsaio", { id: novoEnsaio.id });
          } catch (err) {
            ToastAndroid.showWithGravity(
              "Erro ao criar um novo ensaio",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            console.log(err);
          }
        }}
        validationSchema={toFormikValidationSchema(schema)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text variant="headlineSmall" style={{ width: "100%" }}>
              Adicionar Ensaio
            </Text>
            <TextInput
              label="Comum congregação"
              style={style.input}
              onChangeText={handleChange("congregacao")}
              onBlur={handleBlur("congregacao")}
              value={values.congregacao}
              error={errors.congregacao ? true : false}
            />
            <Text variant="labelSmall">{errors.congregacao}</Text>

            <TextInput
              label="Nome do encarregado"
              style={style.input}
              onChangeText={handleChange("encarregado")}
              onBlur={handleBlur("encarregado")}
              value={values.encarregado}
              error={errors.encarregado ? true : false}
            />
            <Text variant="labelSmall">{errors.congregacao}</Text>

            <Button
              icon="plus"
              mode="contained"
              onPress={async () => await handleSubmit()}
              style={style.button}
            >
              Novo ensaio
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
}

const style = StyleSheet.create({
  input: {
    width: "100%",
    marginTop: 20,
  },

  button: {
    width: "100%",
    marginTop: 20,
  },
});
