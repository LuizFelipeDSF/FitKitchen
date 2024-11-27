import { z } from "zod";
import { createPayment, usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../hooks/Auth/index";
import { useUsersDatabase } from "../../database/useUsersDatabase";
import { router } from "expo-router";

const paymentSchema = z.object({
  valor_pago: z.number().gt(0),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.string().datetime(),
  numero_recibo: z.string(),
  observacao: z.string(),
});

export default function Payment() {
  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [numeroRecibo, setNumeroRecibo] = useState("");
  const valueRef = useRef();
  const { user } = useAuth();
  const { createPayment } = usePaymentsDatabase();
  const { getAllUsers } = useUsersDatabase();

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  useEffect(() => {
    (async () => {
      try {
        const users = await getAllUsers();
        if (users.length === 0) {
          throw new Error("Nenhum usuário encontrado.");
        }
        setSugestoes(users);
        setId(users[0].id);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
      }
    })();
  }, []);

  const handleChangeValor = (value) => {
    try {
      const valorLimpo = value.replace(",", "").replace(".", "");
      const valorConvertido = Number(valorLimpo) / 100;

      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        setValor("0,00");
        return;
      }
      const valorPtBR = Intl.NumberFormat("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      }).format(valorConvertido);
      setValor(valorPtBR);
    } catch (error) {
      setValor("0,00");
    }
  };

  const handleSubmit = async () => {
    if (!id) {
      Alert.alert("Erro", "Selecione um usuário válido.");
      return;
    }

    const payment = {
      user_id: id,
      user_cadastro: Number(user.user.id),
      valor_pago: Number(valor.replace(",", "").replace(".", "")) / 100 || 0.01,
      data_pagamento: data.toISOString(),
      numero_recibo: numeroRecibo,
      observacao,
    };

    try {
      await paymentSchema.parseAsync(payment);
      await createPayment(payment);
      Alert.alert("Sucesso", "Pagamento registrado com sucesso!");
      setValor("0,00");
      setId(sugestoes[0].id);
      setData(new Date());
      setObservacao("");
      setNumeroRecibo("");
      valueRef?.current?.focus();
    } catch (error) {
      Alert.alert("Erro", `Erro ao inserir pagamento: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <Text style={styles.title}>🥗 Registrar De Receitas</Text>

        <View style={styles.inputGroup}>
          <Ionicons name="wallet-sharp" size={24} color="#143630" />
          <TextInput
            style={styles.input}
            placeholder="Valor (R$)"
            keyboardType="decimal-pad"
            value={valor}
            onChangeText={handleChangeValor}
            ref={valueRef}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="document-text-outline" size={24} color="#143630" />
          <TextInput
            style={styles.input}
            placeholder="Nome da receita"
            keyboardType="default"
            value={numeroRecibo}
            onChangeText={setNumeroRecibo}
          />
        </View>

        <View style={styles.picker}>
          <Picker
            selectedValue={id}
            onValueChange={(itemValue) => setId(itemValue)}
            style={{ color: "#143630" }}
          >
            {sugestoes.map((user) => (
              <Picker.Item key={user.id} label={user.nome} value={user.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="calendar-outline" size={24} color="#143630" />
          <Text style={styles.datePicker} onPress={() => setViewCalendar(true)}>
            {data.toLocaleDateString("pt-BR")}
          </Text>
          {viewCalendar && (
            <DateTimePicker value={data} mode="date" onChange={handleCalendar} />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="basket-outline" size={24} color="#143630" />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Lista de ingredientes"
            multiline
            value={observacao}
            onChangeText={setObservacao}
          />
        </View>

        <View style={styles.buttonGroup}>
          <Button title="Salvar" color="#8eb69b" onPress={handleSubmit} />
          <Button title="Cancelar" color="#d1e8d6" onPress={() => router.back()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ede7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#143630",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8da59f",
    marginBottom: 15,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: "#143630",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#8da59f",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  datePicker: {
    flex: 1,
    fontSize: 16,
    color: "#143630",
    textAlign: "right",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
