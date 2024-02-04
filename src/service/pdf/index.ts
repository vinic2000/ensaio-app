import { pdf } from "@react-pdf/renderer";
import { ensaioProps } from "../database";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import moment from "moment";

class Pdf {
  constructor(private ensaio: ensaioProps) {}

  total = () => {
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

  totalOrganista = () => {
    const organista = this.ensaio.musicos?.find(
      (m) => m.instrumento === "Orgão"
    );

    if (!organista) {
      return 0;
    }
    return organista.quantidade;
  };

  async gearPdf() {
    const html = `
    <!doctype html>
    <html lang="pt-br">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap demo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
      </head>
      <body>
        <div class="container">

          <div class="row">
              <div class="col-12">
                  <table class="table table-bordered">
                      <tr>
                          <td colspan="2" class="text-center table-active">ENSAIO REGIONAL</td>
                      </tr>
                      <tr>
                          <td rowspan="2" class="align-middle text-center">Localidade: ${this.ensaio.comum_congregacao.toUpperCase()}</td>
                          <td>DATA: ${moment(this.ensaio.data).format(
                            "DD/MM/YYYY"
                          )}</td>
                      </tr>
                      <tr>
                          <td>Horário: 09h</td>
                      </tr>
                  </table>
              </div>
          </div>

            <div class="row">
            <div class="col-6">
                <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td colspan="2" class="table-active text-center">MÚSICOS</td>
                            </tr>
                            ${this.ensaio.musicos?.map((m) => {
                              return `
                              <tr>
                                  <td>${m.quantidade}</td>
                                  <td>${m.instrumento}</td>
                              </tr>
                              `;
                            })}
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
                        <td>${
                          (this.total().totalMusicosEOrganistas as number) -
                          this.totalOrganista()
                        }</td>
                        <td>Músico</td>
                    </tr>

                </table>
            </div> 


            <div class="col-6">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td class="table-active text-center" colspan="2">MINISTÉRIO</td>
                        </tr>

                        ${this.ensaio.ministerio.map((mini) => {
                          return `
                          <tr>
                              <td>${mini.quantidade}</td>
                              <td>${mini.Cargo}</td>
                          </tr>

                          `;
                        })}

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
                    </tbody>
                    </tbody>

                </table>

            </div>

            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
      </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri);
  }
}

export default Pdf;
