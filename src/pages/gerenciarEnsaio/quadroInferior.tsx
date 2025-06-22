import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ensaioProps } from "../../service/database";
import PdfSimples from "../../service/pdf/PdfSimples";
import PdfCompleto from "../../service/pdf/PdfCompleto";
import { useNavigation } from "@react-navigation/native";

type props = {
    ensaio: ensaioProps
}

export function QuadroInferior({ ensaio }: props) {

    const navigation = useNavigation();
  
    return (
        <View >
            <Button
                style={style.buttonAlterar}
                onPress={() => navigation.navigate("EditarEnsaio", { id: ensaio.id })}
            >
                Alterar
            </Button>
            <View style={style.quadro}>
                <Button
                    style={style.button}
                    onPress={async () => {
                        const pdf = new PdfSimples(ensaio)
                        await pdf.gerarDocumento();
                    }}
                    mode="contained"
                >
                    Gerar PDF simples
                </Button>

                <Button
                    style={style.button}
                    onPress={async () => {
                        const pdf = new PdfCompleto(ensaio)
                        await pdf.gerarDocumento();
                    }}
                    mode="contained"
                >
                    Gerar PDF completo
                </Button>

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    quadro: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5

    },

    buttonAlterar:{
        borderRadius: 'none'
    },

    button: {
        width: '49%',
        borderRadius: 'none'

    },
});