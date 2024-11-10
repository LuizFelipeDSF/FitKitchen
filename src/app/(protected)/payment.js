import { router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Button, StyleSheet, Text, TextInput, View } from "react-native"

export default function Payment() {

  const [valor, setValor] = useState("0,00");
  const [sugestoes, setSugestoes] = useState([
    {
      "id": 1,
      "nome": "Fanechka Dudmarsh"
    }, {
      "id": 2,
      "nome": "Titos Sandbatch"
    }, {
      "id": 3,
      "nome": "Baryram Churchyard"
    }, {
      "id": 4,
      "nome": "Lowell Wiggins"
    }, {
      "id": 5,
      "nome": "Juan Elderkin"
    }, {
      "id": 6,
      "nome": "Seka McCathie"
    }, {
      "id": 7,
      "nome": "Abagail Heatly"
    }, {
      "id": 8,
      "nome": "Terrie Fer"
    }, {
      "id": 9,
      "nome": "Pascale Earl"
    }, {
      "id": 10,
      "nome": "Jerrie Mathieu"
    }, {
      "id": 11,
      "nome": "Dannel Adamczewski"
    }, {
      "id": 12,
      "nome": "Emmery Bussons"
    }, {
      "id": 13,
      "nome": "Tomasina Delagnes"
    }, {
      "id": 14,
      "nome": "Isabelita Brunotti"
    }, {
      "id": 15,
      "nome": "Janette Petrecz"
    }, {
      "id": 16,
      "nome": "Melli Huetson"
    }, {
      "id": 17,
      "nome": "Blaine Goodluck"
    }, {
      "id": 18,
      "nome": "Austin Daft"
    }, {
      "id": 19,
      "nome": "Ax Kezor"
    }, {
      "id": 20,
      "nome": "Mildrid Chesterton"
    }, {
      "id": 21,
      "nome": "Barthel Braime"
    }, {
      "id": 22,
      "nome": "Reggie Pottiphar"
    }, {
      "id": 23,
      "nome": "Conney Huggard"
    }, {
      "id": 24,
      "nome": "Baxy Girton"
    }, {
      "id": 25,
      "nome": "Dillon Perico"
    }, {
      "id": 26,
      "nome": "Tomasina Rampage"
    }, {
      "id": 27,
      "nome": "Ag Hourston"
    }, {
      "id": 28,
      "nome": "Chloe Peacher"
    }, {
      "id": 29,
      "nome": "Thacher Vayro"
    }, {
      "id": 30,
      "nome": "Rita Heaps"
    }, {
      "id": 31,
      "nome": "Beverlee Sykes"
    }, {
      "id": 32,
      "nome": "Lianna Aldridge"
    }, {
      "id": 33,
      "nome": "Granville Baglan"
    }, {
      "id": 34,
      "nome": "Merry Dutnall"
    }, {
      "id": 35,
      "nome": "Gibby Spafford"
    }
  ]);
  const [id, setId] = useState(1);
  const [data, setData] = useState(new Date());
  const [viewCalendar, setViewCalendar] = useState(false);
  const [observacao, setObsetvacao] = useState("");
  const handleCalendar = (event, selectedDate) => {
    setViewCalendar(false);
    setData(selectedDate); 
  }

  return (
    <View style={styles.content}>
      <Text style={{fontSize: 30, paddingBottom: 5}}>Inserir Pagamentos</Text>
      <View style={styles.inputView}>
        <Ionicons name="wallet-sharp" size={40} color={'#202020'} />
        <TextInput placeholder="Valor" keyboardType="decimal-pad" style={styles.inputValor} value={valor} onChange={setValor} />
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
        <Button title="Salvar" />
        <Button title="Continuar" />
        <Button title="Cancelar" onPress={() => router.back()} />
      </View>
    </View>
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
  inputObservacao:{
    fontFamily:"regular",
    fontSize: 16,
    flex: 1,
  },
})