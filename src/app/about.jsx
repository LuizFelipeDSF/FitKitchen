import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>

      <Text style={styles.description}>
        Este aplicativo foi desenvolvido por Luiz Felipe dos Santos Ferreira, para a disciplina de Programação para Dispositivos Móveis.
        O aplicativo é um armazenador de receitas fit, chamado <Text style={styles.bold}>Fit Kitchen</Text>.
      </Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#d1e8d6',
  },
  title: {
    fontSize: 50,
    color: '#245235',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});
