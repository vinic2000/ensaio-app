import { Text, TextInput, Button } from "react-native-paper";
import Container from "../../components/container";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { StyleSheet } from "react-native";
import { database } from "../../service/database";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import moment from "moment";

export default function EditarEnsaio() {
  const route = useRoute();
  const navigate = useNavigation();

  const schema = z.object({
    encarregado: z.string(),
    congregacao: z.string(),
    horario: z.string(),
  });

  const { id } = route.params as { id: string };

  const formik = useFormik({
    initialValues: {
      congregacao: "",
      encarregado: "",
      horario: "",
      data: "",
    },
    onSubmit: async ({ congregacao, encarregado, horario, data }) => {
      try {
        const dataDividida = data.split("/");

        const dataEnviar = moment()
          .set("date", parseInt(dataDividida[0]))
          .set("month", parseInt(dataDividida[1]) - 1)
          .set("year", parseInt(dataDividida[2]));

        console.log("dataEnviar", dataEnviar);

        await database.atualizarEnsaio(id, {
          comum_congregacao: congregacao,
          encarregado,
          horario,
          data: dataEnviar.toDate(),
        });

        navigate.navigate("GerenciarEnsaio", { id: id });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: toFormikValidationSchema(schema),
  });

  useEffect(() => {
    database
      .buscarEnsaio(id)
      .then((data) => {
        if (data) {
          formik.setFieldValue("encarregado", data.encarregado);
          formik.setFieldValue("congregacao", data.comum_congregacao);
          formik.setFieldValue("horario", data.horario);
          formik.setFieldValue("data", moment(data.data).format("DD/MM/YYYY"));
        }
      })
      .catch();
  }, []);

  return (
    <Container>
      <>
        <Text variant="headlineSmall" style={{ width: "100%" }}>
          Adicionar Ensaio
        </Text>
        <TextInput
          label="Comum congregação"
          style={style.input}
          onChangeText={formik.handleChange("congregacao")}
          onBlur={formik.handleBlur("congregacao")}
          value={formik.values.congregacao}
          error={formik.errors.congregacao ? true : false}
        />
        <Text variant="labelSmall">{formik.errors.congregacao}</Text>

        <TextInput
          label="Nome do encarregado"
          style={style.input}
          onChangeText={formik.handleChange("encarregado")}
          onBlur={formik.handleBlur("encarregado")}
          value={formik.values.encarregado}
          error={formik.errors.encarregado ? true : false}
        />
        <Text variant="labelSmall">{formik.errors.encarregado}</Text>

        <TextInput
          label="Data"
          placeholder="01/01/2024"
          style={style.input}
          onChangeText={formik.handleChange("data")}
          onBlur={formik.handleBlur("data")}
          value={formik.values.data}
          error={formik.errors.data ? true : false}
        />
        <Text variant="labelSmall">{formik.errors.data}</Text>

        <TextInput
          label="Horario"
          placeholder="16:00"
          style={style.input}
          onChangeText={formik.handleChange("horario")}
          onBlur={formik.handleBlur("horario")}
          value={formik.values.horario}
          error={formik.errors.horario ? true : false}
        />
        <Text variant="labelSmall">{formik.errors.horario}</Text>

        <Button
          mode="contained"
          onPress={async () => await formik.handleSubmit()}
          style={style.button}
        >
          Atualizar
        </Button>
      </>
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
    borderRadius: 0,
  },
});
