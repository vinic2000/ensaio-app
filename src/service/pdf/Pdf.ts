import { ensaioProps } from "../database";

export interface Documento {
    gerarDocumento():Promise<void> 
    gerarHtml(): string
}

export class Pdf{

    constructor(protected readonly ensaio: ensaioProps){}

    protected total = () => {
        const totalMusicosEOrganistas = this.ensaio.musicos?.reduce(
            (total, musicos) => {
                return (total += musicos.quantidade);
            },
            0
        );

        const totalMinisterio = this.ensaio.ministerio.reduce((total, mi) => {
            return (total += mi.quantidade);
        }, 0);

        return { totalMusicosEOrganistas, totalMinisterio };
    };

    protected totalOrganista = () => {
        const organista = this.ensaio.musicos?.find(
            (m) => m.instrumento === "Organista"
        );

        if (!organista) {
            return 0;
        }

        return organista.quantidade;
    };

    protected totalMusicos = () => {
        const musicos = this.ensaio.musicos?.filter(
            (m) => m.instrumento! !== "Organista"
        );

        let soma = 0;
        musicos?.forEach((m) => {
            soma += m.quantidade;
        });

        return soma;
    };

    protected totalGeral = () => {
        return (
            (this.total().totalMusicosEOrganistas as number) +
            this.total().totalMinisterio +
            this.ensaio.irmandade.irmaos +
            this.ensaio.irmandade.irmas
        );
    };

    protected TotalEncarregado = (regional: boolean) => {
        const total: number = this.ensaio.encarregados.filter(
            (encarregado) => encarregado.regional === regional
        ).length;

        return total;
    };

}