import { ensaioProps } from "../database";

const total = (ensaio: ensaioProps) => {
  let totalMusicosEOrganistas = 0;

  if (ensaio.musicos) {
    totalMusicosEOrganistas = ensaio.musicos?.reduce((total, musicos) => {
      return (total += musicos.quantidade);
    }, 0);
  }

  const totalMinisterio = ensaio.ministerio.reduce((total, mi) => {
    return (total += mi.quantidade);
  }, 0);

  return { totalMusicosEOrganistas, totalMinisterio };
};

const totalOrganista = (ensaio: ensaioProps) => {
  const organista = ensaio.musicos?.find((m) => m.instrumento === "Orgão");

  if (!organista) {
    return 0;
  }
  return organista.quantidade;
};

const totalGeral = (ensaio: ensaioProps) => {
  return (
    (total(ensaio).totalMusicosEOrganistas as number) +
    total(ensaio).totalMinisterio +
    ensaio.irmandade.irmaos +
    ensaio.irmandade.irmas
  );
};

export { total, totalOrganista, totalGeral };
