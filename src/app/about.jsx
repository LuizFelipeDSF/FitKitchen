import { router } from 'expo-router';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Chef_icon.png')} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>Sobre</Text>
        <Text style={styles.description}>
          Este aplicativo foi desenvolvido por Luiz Felipe dos Santos Ferreira, para a disciplina de Programação para Dispositivos Móveis. 
          O aplicativo é um armazenador de receitas saudáveis, chamado <Text style={styles.bold}>Fit Kitchen</Text>.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#e8ede7', // Fundo principal mais claro
  },
  logo: {
    width: 150, // Largura da imagem
    height: 150, // Altura da imagem
    resizeMode: 'contain', // Ajuste para não distorcer
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff', // Fundo do card
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
    width: '90%',
  },
  title: {
    fontSize: 36,
    color: '#143630', // Cor do título
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8da59f', // Cor do texto da descrição
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#8eb69b', // Cor do texto em destaque
  },
  button: {
    backgroundColor: '#143630', // Fundo do botão
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // Texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});
