import { useRoute } from "@react-navigation/native";
import { database, ensaioProps, musicoProps } from "../../service/database";
import { Searchbar } from "react-native-paper";
import { FlatList, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";

import CardClique from "../../components/cardsClique";

export default function GerenciarMusicos() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [ensaio, setEnsaio] = useState<ensaioProps>();
  const [searchQuery, setSearchQuery] = useState("");
  const [queryMusicos, setQueryMusicos] = useState<musicoProps[]>();

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

  const addMaisUm = async (instrumento: string) => {
    const data = await database.addMiasUm(instrumento, id);
    setEnsaio(data);
  };

  const MenosUm = async (instrumento: string) => {
    const data = await database.addMenosUm(instrumento, id);
    setEnsaio(data);
  };

  return (
    <>
      <Searchbar
        placeholder="Pesquisar Instrumento"
        onChangeText={(value) => {
          setSearchQuery(value);
          buscarInstrumento(value);
        }}
        value={searchQuery}
      />
      <FlatList
        data={searchQuery.length ? queryMusicos : ensaio?.musicos}
        renderItem={({ item }) => (
          <>
            <CardClique
              tipo="instrumentos"
              item={item}
              maisUm={async () => await addMaisUm(item.instrumento)}
              menosUm={async () => await MenosUm(item.instrumento)}
            />
          </>
        )}
      />
    </>
  );
}
