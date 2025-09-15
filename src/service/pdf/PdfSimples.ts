import { Pdf } from "./Pdf";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";

import moment from "moment";

import * as FileSystem from "expo-file-system";
import { Documento } from './Pdf'


class PdfSimples extends Pdf implements Documento{
    async gerarDocumento(): Promise<void> {

        try {
            console.log("Iniciando geração de PDF simples...");

            const html = this.gerarHtml();
            console.log("HTML gerado com sucesso");
            console.log("Plataforma:", Platform.OS);

            if (Platform.OS === 'web') {
                console.log("Plataforma web detectada - usando window.print()");
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    newWindow.document.write(html);
                    newWindow.document.close();
                    newWindow.print();
                    console.log("Impressão iniciada na web");
                } else {
                    throw new Error("Não foi possível abrir nova janela para impressão");
                }
            } else {
                console.log("Plataforma móvel detectada - usando expo-print");
                const { uri } = await Print.printToFileAsync({ html, width: 640 });
                console.log("PDF gerado com sucesso:", uri);

                // Compartilhar diretamente o arquivo gerado
                await shareAsync(uri);
                console.log("Compartilhamento iniciado");
            }
        } catch (error) {
            console.error("Erro na geração do PDF:", error);
            throw error;
        }
    }


    gerarHtml(): string {

        const html = `
            <!doctype html>
            <html lang="pt-br">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Relatório de Ensaio</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12">
                                    <table class="table table-bordered">
                                        <tr>
                                            <td colspan="2" class="text-center table-active">ENSAIO LOCAL</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2" class="align-middle text-center">${this.ensaio.comum_congregacao}</td>
                                            <td>${moment(this.ensaio.data).format("DD-MM-YYYY")}</td>
                                        </tr>
                                        <tr>
                                            <td>${this.ensaio.horario}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td colspan="2" class="table-active text-center">MÚSICOS</td>
                                </tr>
                                ${this.ensaio.musicos?.filter(m => m.quantidade > 0).map((m) => {
                                    return `
                                        <tr>
                                            <td>${m.quantidade}</td>
                                            <td>${m.instrumento}</td>
                                        </tr>
                                    `;
                                })}
                                <tr>
                                    <td colspan="2" class="table-active text-center">${this.total().totalMusicosEOrganistas} INSTRUMENTOS</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-bordered">
                            <tr>
                                <td class="text-center table-active" colspan="2"> ORGANISTAS E MÚSICOS</td>
                            </tr>
                            <tr>
                                <td>${this.totalOrganista()}</td>
                                <td>Organistas</td>
                            </tr>
                            <tr>
                                <td>${this.totalMusicos()}</td>
                                <td>Músico</td>
                            </tr>
                        </table>
                    </div> 
                    <div class="col-12">
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td class="table-active text-center" colspan="2">MINISTÉRIO</td>
                                </tr>

                                ${this.ensaio.ministerio.filter(mini => mini.quantidade > 0).map((mini) => {
                                    return `
                                        <tr>
                                            <td>${mini.quantidade}</td>
                                            <td>${mini.Cargo}</td>
                                        </tr>

                                    `})}

                                <tr>
                                    <td>${this.TotalEncarregado(true)}</td>
                                    <td>Encarregado Regional</td>
                                </tr>

                                <tr>
                                    <td>${this.TotalEncarregado(false)}</td>
                                    <td>Encarregado Local</td>
                                </tr>

                            </tbody>

                        </table>

                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td class="table-active text-center">VISITAS</td>
                                </tr>
                                <tr>
                                    <td>
                                    ${this.ensaio.visita}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td class="text-center table-active" colspan="2">TOTAL</td>
                                </tr>
                                <tr>
                                    <td>Ministério</td>
                                    <td>${this.total().totalMinisterio}</td>
                                </tr>
                                <tr>
                                    <td>Organista e músicos</td>
                                    <td>${this.total().totalMusicosEOrganistas}</td>
                                </tr>
                                <tr>
                                <td>Irmãos e irmãs</td>
                                <td>
                                    ${this.ensaio.irmandade.irmaos + this.ensaio.irmandade.irmas}
                                </td>
                                </tr>
                                <tr>
                                    <td>Total Geral</td>
                                    <td>${this.totalGeral()}</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>

                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
            </body>
            </html>
            `;

        return html
    }

}

export default PdfSimples; 