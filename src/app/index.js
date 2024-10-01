import { StatusBar } from 'expo-status-bar';
import { Alert, BackHandler, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function App() {

  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456!");
  const [passwordVisibility, setpasswordVisibility] = useState(false);

  const tooglePasswordVisibility = () => {
    setpasswordVisibility(!passwordVisibility);
  }

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  }



  return (
    <View style={styles.container}>

      <Image />

      <Text style={styles.title}>Entrar</Text>

        <View style={styles.inputemail}>
          <Ionicons name="person" size={20} color='#b4c5d8' />
          <TextInput placeholder='E-mail' value={email} onChangeText={setEmail} style={styles.emailInput} />
        </View>
        <View style={styles.inputsenha}>
          <Ionicons name="lock-closed-outline" size={20} color='black' />
          <TextInput placeholder='Senha' value={password} onChangeText={setPassword} secureTextEntry={passwordVisibility} style={styles.emailInput} />
          <Ionicons name={passwordVisibility ? "eye-off-outline" : "eye-outline"} size={20} color='black' onPress={tooglePasswordVisibility} />
        </View>


      <View style={styles.botoes}>

        <TouchableOpacity style={{ height: 50, width: 300, backgroundColor: '#8da59f', justifyContent: 'center', textAlign: 'center', alignItems: 'center', borderRadius: 25 }} onPress={handleEntrarSuper}><Text style={{ color: '#fff', fontFamily: 'regular', fontSize: 28 }}>ENTRAR</Text></TouchableOpacity>

        <StatusBar style="auto" />

        <TouchableOpacity style={{ height: 42, width: 150, backgroundColor: '#d1e8d6', justifyContent: 'center', textAlign: 'center', alignItems: 'center', borderRadius: 25 }} onPress={() => router.push("/about")}><Text style={{ color: '#7777', fontFamily: 'regular', fontSize: 20 }}>Sobre</Text></TouchableOpacity>

      </View>

      <TouchableOpacity style={{ height: 42, width: 150, backgroundColor: '#143630', justifyContent: 'center', textAlign: 'center', alignItems: 'center', borderRadius: 25,}} onPress={() => BackHandler.exitApp()}><Text style={{ color: '#fff', fontFamily: 'regular', fontSize: 20 }}>Sair</Text></TouchableOpacity>




    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    flex: 1,
    backgroundColor: '#e8ede7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  inputemail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    margin: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  inputsenha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    margin: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  emailInput: {
    flex: 1,
    fontFamily: 'medium',
    fontSize: 20,
  },
  button: {
    flex: 1,
  },
  title: {
    fontSize: 50,
    marginBottom: 100,
    fontFamily: 'light',
    color: '#86af95'
  },
  botoes: {
    gap: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
});
