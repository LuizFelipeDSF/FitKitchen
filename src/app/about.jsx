import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useData } from "../hooks/Data";

export default function About() {
    const { data } = useData();
    return (
        <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center", height: 100, width: 410, backgroundColor: '#143630' }}>
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 10, color: '#fff' }}>Sobre</Text>

                <View>
                    <Text style={{ fontSize: 30, color: '#fff', marginBottom: 10, }}>Aplicativo</Text>

                    <Text style={{ fontSize: 15, textAlign: 'justify', }}>
                        Este aplicativo foi desenvolvido por mim, Luiz Felipe dos Santos Ferreira, para a disciplina de Programação para Dispositivos Móveis,
                        como uma forma de mostrar os conteúdos adquiridos as aulas; tal aplicativo foi desenvolvido com o auxílio de vídeo aulas gravadas
                        pelo professor Graziane Vasconcelos Zanfolin, até o momento o progresso está na aula 10. Meu aplicativo se trata de um armazenador e
                        visualizador de receitas fit, recebendo o nome de <Text style={{ fontFamily: 'bold' }}>Fit Kitchen</Text>.
                    </Text>
                </View>

                <View>
                    <Text style={{ fontSize: 30, color: '#fff', marginTop: 20, }}>Aluno</Text>
                    <Text style={{ fontSize: 15, textAlign: 'justify', }}>
                        Eu sou um aluno do segundo informática, que está descrevendo o processo de seu desenvolvimento
                        em sala de aula.
                    </Text>
                </View>

            </View>
            <Button title="Voltar" onPress={() => (router.replace("/"))} />
        </View>
    );
}
const styles = StyleSheet.create({
    bold: {
        fontSize: 20,
        color: '#245235',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});