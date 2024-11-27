import React from "react";
import { View, Text, StyleSheet, ScrollView, Divider } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Bem-vindo ao Fit Kitchen! 🌟</Text>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Por que escolher uma alimentação fit?</Text>
          <Text style={styles.text}>
            Uma alimentação fit é baseada no equilíbrio e na escolha de alimentos naturais, ricos em nutrientes e com baixo teor de gorduras saturadas e açúcares refinados. Ela proporciona:
          </Text>
          <Text style={styles.listItem}>✅ Mais energia para o dia a dia.</Text>
          <Text style={styles.listItem}>✅ Melhoria na qualidade do sono.</Text>
          <Text style={styles.listItem}>✅ Controle do peso corporal.</Text>
          <Text style={styles.listItem}>✅ Prevenção de doenças crônicas.</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.subtitle}>Dicas para uma alimentação saudável:</Text>
          <Text style={styles.tip}>🍎 Inclua mais frutas, verduras e legumes em suas refeições diárias.</Text>
          <Text style={styles.tip}>🥖 Prefira alimentos integrais, como arroz integral, aveia e pães integrais.</Text>
          <Text style={styles.tip}>❌ Evite alimentos ultraprocessados e opte por preparações caseiras.</Text>
          <Text style={styles.tip}>💧 Beba bastante água ao longo do dia para manter seu corpo hidratado.</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.subtitle}>Nosso objetivo:</Text>
          <Text style={styles.text}>
            O Fit Kitchen foi criado para ajudar você a organizar suas receitas saudáveis e tornar sua jornada fitness ainda mais prática e prazerosa!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ede7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#143630",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#8eb69b",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#143630",
    lineHeight: 24,
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    color: "#143630",
    marginBottom: 8,
    lineHeight: 22,
    paddingLeft: 15,
  },
  tip: {
    fontSize: 16,
    color: "#245235",
    backgroundColor: "#d1e8d6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    lineHeight: 22,
  },
  divider: {
    height: 2,
    backgroundColor: "#8da59f",
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
});
