import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

type ensaioProps = {
  id: string;
  horario: string;
  comum_congregacao: string;
  encarregado: string;
  musicos?: musicoProps[];
  organistas: organistaProps;
  ministerio: ministerioProps[];
  encarregados: encarregadoProps[];
  data: Date;
  visita: string;
  irmandade: {
    irmaos: number;
    irmas: number;
  };
};

type addEnsaioParam = {
  comum_congregacao: string;
  encarregado: string;
  horario: string;
};

type musicoProps = {
  instrumento: string;
  quantidade: number;
};

type organistaProps = {
  organista: {
    quantidade: number;
  };
  examinadora: {
    quantidade: number;
  };
};

type ministerioProps = {
  Cargo: string;
  quantidade: number;
};

type encarregadoProps = {
  id: string;
  nome: string;
  comum_congregacao: string;
  regional: boolean;
};

class Database {
  private async verificarSeBancoFoiCriado(): Promise<boolean> {
    const data = JSON.parse((await AsyncStorage.getItem("database")) as string);
    const ensaios = data as ensaioProps[];

    if (ensaios === null) {
      return false;
    }
    return true;
  }

  async addEnsaio({
    comum_congregacao,
    encarregado,
    horario,
  }: addEnsaioParam): Promise<ensaioProps> {
    const ensaio: ensaioProps = {
      data: new Date(),
      horario: horario,
      comum_congregacao: comum_congregacao,
      encarregado: encarregado,
      id: uuid.v4().toString(),
      encarregados: [
        {
          id: uuid.v4().toString(),
          nome: encarregado,
          comum_congregacao: comum_congregacao,
          regional: false,
        },
      ],
      ministerio: [
        {
          Cargo: "Ancião",
          quantidade: 0,
        },
        {
          Cargo: "Diácono",
          quantidade: 0,
        },
        {
          Cargo: "Cooperador",
          quantidade: 0,
        },
        {
          Cargo: "Cooperador De Jovens",
          quantidade: 0,
        },
        // {
        //   Cargo: "Encarregado Regional",
        //   quantidade: 0,
        // },
        {
          Cargo: "Examinadora",
          quantidade: 0,
        },
        // {
        //   Cargo: "Encarregado Local",
        //   quantidade: 1,
        // },
      ],
      organistas: {
        examinadora: {
          quantidade: 0,
        },
        organista: {
          quantidade: 0,
        },
      },
      musicos: [
        {
          instrumento: "Violino",
          quantidade: 0,
        },
        {
          instrumento: "Viola",
          quantidade: 0,
        },
        {
          instrumento: "Violoncelo",
          quantidade: 0,
        },
        {
          instrumento: "Flauta",
          quantidade: 0,
        },
        {
          instrumento: "Oboé",
          quantidade: 0,
        },
        {
          instrumento: "Oboé D'Amore",
          quantidade: 0,
        },
        {
          instrumento: "Corne Inglês",
          quantidade: 0,
        },
        {
          instrumento: "Fagote",
          quantidade: 0,
        },
        {
          instrumento: "Clarinete",
          quantidade: 0,
        },
        {
          instrumento: "Clarinete Alto",
          quantidade: 0,
        },
        {
          instrumento: "Clarinete Baixo",
          quantidade: 0,
        },
        {
          instrumento: "Saxofone Soprano",
          quantidade: 0,
        },
        {
          instrumento: "Saxofone Alto",
          quantidade: 0,
        },
        {
          instrumento: "Saxofone Tenor",
          quantidade: 0,
        },
        {
          instrumento: "Saxofone Baritono",
          quantidade: 0,
        },
        {
          instrumento: "Saxofone Baixo",
          quantidade: 0,
        },
        {
          instrumento: "Trompete",
          quantidade: 0,
        },
        {
          instrumento: "Cornet",
          quantidade: 0,
        },
        {
          instrumento: "Flugelhorn",
          quantidade: 0,
        },
        {
          instrumento: "Trompa",
          quantidade: 0,
        },
        {
          instrumento: "Trombonito",
          quantidade: 0,
        },
        {
          instrumento: "Trombone",
          quantidade: 0,
        },
        {
          instrumento: "Barítono",
          quantidade: 0,
        },
        {
          instrumento: "Eufônio",
          quantidade: 0,
        },
        {
          instrumento: "Tuba",
          quantidade: 0,
        },
        {
          instrumento: "Organista",
          quantidade: 0,
        },
        {
          instrumento: "Acordeon",
          quantidade: 0,
        },
      ],
      visita: "",
      irmandade: {
        irmaos: 0,
        irmas: 0,
      },
    };

    if (await this.verificarSeBancoFoiCriado()) {
      const data = JSON.parse(
        (await AsyncStorage.getItem("database")) as string
      );

      const ensaios = data as ensaioProps[];
      ensaios.push(ensaio);
      await AsyncStorage.setItem("database", JSON.stringify(ensaios));
    } else {
      const ensaios: ensaioProps[] = [];

      ensaios.push(ensaio);

      await AsyncStorage.setItem("database", JSON.stringify(ensaios));
    }

    return ensaio;
  }

  async deletarEnsaio(id: string): Promise<ensaioProps[]> {
    const ensaios = await this.todosEnsaios();

    let result = ensaios.filter((e) => e.id !== id);

    await AsyncStorage.setItem("database", JSON.stringify(result));

    return result;
  }

  async todosEnsaios(): Promise<ensaioProps[]> {
    const data = JSON.parse((await AsyncStorage.getItem("database")) as string);
    return data as ensaioProps[];
  }

  async buscarEnsaio(id: string): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const ensaio = ensaios.find((ensaio) => ensaio.id === id);

    return ensaio as ensaioProps;
  }

  async addMusico(instrumento: string, id: string): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    if (!ensaio.musicos) {
      ensaio.musicos = [
        {
          instrumento: instrumento,
          quantidade: 0,
        },
      ];
    } else {
      ensaio.musicos.push({
        instrumento: instrumento,
        quantidade: 0,
      });
    }

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async removerMusico(instrumento: string, id: string): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    const musicoIndex = ensaio.musicos?.findIndex(
      (m) => m.instrumento === instrumento
    );

    ensaio.musicos?.splice(musicoIndex as number, 1);

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async addMiasUm(instrumento: string, id: string): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    const musicoIndex = ensaio.musicos?.findIndex(
      (m) => m.instrumento === instrumento
    );

    const musicos = ensaio?.musicos as musicoProps[];

    const musico = musicos[musicoIndex as number];

    let quantidade = musico.quantidade + 1;

    musico.quantidade = quantidade;

    musicos[musicoIndex as number] = musico;
    ensaio.musicos = musicos;
    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async addMenosUm(instrumento: string, id: string): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    const musicoIndex = ensaio.musicos?.findIndex(
      (m) => m.instrumento === instrumento
    );

    const musicos = ensaio?.musicos as musicoProps[];

    const musico = musicos[musicoIndex as number];

    if (musico.quantidade <= 0) {
      return ensaio;
    }

    let quantidade = musico.quantidade - 1;

    musico.quantidade = quantidade;
    musicos[musicoIndex as number] = musico;
    ensaio.musicos = musicos;
    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio as ensaioProps;
  }

  async adicionarOrganista(
    id: string,
    examinadora: boolean
  ): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    if (examinadora) {
      ensaio.organistas.examinadora.quantidade += 1;
    } else {
      ensaio.organistas.organista.quantidade += 1;
    }
    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async RemoverOrganista(
    id: string,
    examinadora: boolean
  ): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    if (examinadora) {
      if (ensaio.organistas.examinadora.quantidade <= 0) {
        return ensaio;
      }
      ensaio.organistas.examinadora.quantidade -= 1;
    } else {
      if (ensaio.organistas.organista.quantidade <= 0) {
        return ensaio;
      }
      ensaio.organistas.organista.quantidade -= 1;
    }
    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  // async adicionarMinisterio(
  //   id: string,
  //   nome: string,
  //   comum_congregacao: string
  // ): Promise<ensaioProps> {
  //   const ensaios = await this.todosEnsaios();

  //   const index = ensaios.findIndex((e) => e.id === id);

  //   const ensaio = ensaios[index];

  //   ensaio.ministerio.push({
  //     id: uuid.v4().toString(),
  //     nome: nome,
  //     comum_congregacao: comum_congregacao,
  //   });

  //   ensaios[index] = ensaio;

  //   await AsyncStorage.setItem("database", JSON.stringify(ensaios));

  //   return ensaio;
  // }

  // async removerMinisterio(
  //   idEnsaio: string,
  //   idMinisterio: string
  // ): Promise<ensaioProps> {
  //   const ensaios = await this.todosEnsaios();

  //   const index = ensaios.findIndex((e) => e.id === idEnsaio);

  //   const ensaio = ensaios[index];

  //   const ministerio = ensaio.ministerio.filter((m) => m.id !== idMinisterio);

  //   ensaio.ministerio = ministerio;

  //   await AsyncStorage.setItem("database", JSON.stringify(ensaios));

  //   return ensaio;
  // }

  async adicionarEncarregado(
    id: string,
    nome: string,
    comum_congregacao: string,
    regional: boolean
  ): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    ensaio.encarregados.push({
      nome,
      comum_congregacao,
      id: uuid.v4().toString(),
      regional,
    });

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async removerEncarregado(
    idEnsaio: string,
    idEncarregado: string
  ): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === idEnsaio);

    const ensaio = ensaios[index];

    ensaio.encarregados = ensaio.encarregados.filter(
      (e) => e.id !== idEncarregado
    );

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async addMiasUmMinisterio(id: string, posicao: number): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    const ministerio = ensaio.ministerio[posicao];

    let quantidade = ministerio.quantidade + 1;

    ministerio.quantidade = quantidade;

    ensaio.ministerio[posicao] = ministerio;

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async removerMenosUmMinisterio(
    id: string,
    posicao: number
  ): Promise<ensaioProps> {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    const ministerio = ensaio.ministerio[posicao];

    let quantidade = ministerio.quantidade - 1;

    ministerio.quantidade = quantidade;

    ensaio.ministerio[posicao] = ministerio;

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async salvarTexto(id: string, texto: string) {
    const ensaios = await this.todosEnsaios();
    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];
    ensaio.visita = texto;

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async addMaisUmIrmao(id: string) {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    ensaio.irmandade.irmaos += 1;

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async removerMenosUmIrmao(id: string) {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    ensaio.irmandade.irmaos -= 1;

    if (ensaio.irmandade.irmaos < 0) {
      ensaio.irmandade.irmaos = 0;
    }

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async addMaisUmaIrma(id: string) {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    ensaio.irmandade.irmas += 1;

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }

  async removerMenosUmaIrma(id: string) {
    const ensaios = await this.todosEnsaios();

    const index = ensaios.findIndex((e) => e.id === id);

    const ensaio = ensaios[index];

    ensaio.irmandade.irmas -= 1;

    if (ensaio.irmandade.irmas < 0) {
      ensaio.irmandade.irmas = 0;
    }

    ensaios[index] = ensaio;

    await AsyncStorage.setItem("database", JSON.stringify(ensaios));

    return ensaio;
  }
}

export const database = new Database();

export { ensaioProps, musicoProps, ministerioProps };
