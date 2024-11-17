import { z } from 'zod';
import { createPayment, usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useRef, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../hooks/Auth/index";
import { useUsersDatabase } from "../../database/useUsersDatabase"; 

const paymentSchema = z.object({
  valor_pago: z.number().gt(0),
  user_cadastro: z.number().int().positive(),
  data_pagamento: z.date(),
  observacao: z.string(),
})

export default function Payment() {

  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObsetvacao] = useState("");
  const { user } = useAuth();
  const { createPayment } = usePaymentsDatabase();
  const { getAllUsers } = useUsersDatabase();

  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate);
  };

  const valueRef = useRef();

  useEffect(() => {
    (async () => {
      valueRef.current?.focus();
      try {
        const users = await getAllUsers();
        setSugestoes(users);
        setId(users[0].id);
      } catch (error) {
        console.error(error);
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
      let valorPtBR = Intl.NumberFormat("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      }).format(valorConvertido);
      setValor(valorPtBR);
    } catch (error) {
      setValor("0,00")
    }
  };

  const convertValue = (value) => {
    try {
      let valorLimpo = value.replace(",", "").replace(".", "");
      let valorConvertido = Number(valorLimpo) / 100;
      if (valorConvertido === 0 || isNaN(valorConvertido)) {
        return 0
      }
      return valorConvertido
    } catch (error) {
      return valorConvertido
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called"); // Log inicial
    const payment = {
      user_id: id,
      user_cadastro: Number(user.user.id),
      valor_pago: convertValue(valor) > 0 ? convertValue(valor) : 0.01,
      data_pagamento: data,
      observacao,
    };
    console.log("Payment object:", payment); // Log do objeto antes da validação

    try {
      const result = await paymentSchema.parseAsync(payment);
      const { insertedID } = await createPayment(payment);
      console.log(insertedID);
      setValor("0,00");
      setId(sugestoes[0].id);
      setData(new Date());
      setObsetvacao("");
      valueRef?.current?.focus();

    } catch (error) {
      console.error(error);
    }
  };




  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={{ fontSize: 30, paddingBottom: 5 }}>Inserir Pagamentos</Text>
        <View style={styles.inputView}>
          <Ionicons name="wallet-sharp" size={40} color={'#202020'} />
          <TextInput placeholder="Valor" keyboardType="decimal-pad" style={styles.inputValor} value={valor} onChangeText={(newValue) => handleChangeValor(newValue)} ref={valueRef} />
        </View>
        <View style={styles.inputView}>
          <Picker selectedValue={id} onValueChange={(itemValue, index) => { setId(itemValue) }} style={{ width: "100%" }}>
            {sugestoes?.map((item) => {
              return <Picker.Item key={item.id} label={item.nome} value={item.id} />
            })}
          </Picker>
        </View>
        <View style={styles.inputView}>
          <Text onPress={() => setViewCalendar(true)} style={styles.inputData}>
            {data.toLocaleDateString("pt-BR")}
          </Text>
          {viewCalendar && (
            <DateTimePicker
              value={data}
              onChange={handleCalendar}
              mode="date"
              testID="dateTimePicker"
            />
          )}
        </View>
        <View style={styles.inputView}>
          <TextInput placeholder="Observações" style={styles.inputObservacao} value={observacao} onChangeText={setObsetvacao} multiline={true} />
        </View>
        <View style={styles.contentButtons}>
          <Button title="Salvar" onPress={handleSubmit} />
          <Button title="Continuar" />
          <Button title="Cancelar" onPress={() => router.back()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  contentButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
  },
  inputValor: {
    flex: 1,
    textAlign: "right",
    padding: 10,
  },
  inputData: {
    width: "100%",
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 24,
    padding: 10,
  },
  inputObservacao: {
    fontFamily: "regular",
    fontSize: 16,
    flex: 1,
  },
})