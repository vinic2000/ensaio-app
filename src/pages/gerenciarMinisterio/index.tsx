import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { database, ensaioProps } from "../../service/database";
import { FlatList } from "react-native";

import CardClique from "../../components/cardsClique";

export default function GerenciarMinisterio() {
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

  const mais = async (index: number) => {
    const result = await database.addMiasUmMinisterio(id, index);
    setEnsaio(result);
  };

  const menos = async (index: number) => {
    const result = await database.removerMenosUmMinisterio(id, index);
    setEnsaio(result);
  };

  return (
    <>
      <FlatList
        data={ensaio?.ministerio}
        renderItem={({ item, index }) => (
          <CardClique
            key={index}
            tipo="ministerio"
            item={item}
            maisUm={async () => await mais(index)}
            menosUm={async () => await menos(index)}
          />
        )}
      />
    </>
  );
}
