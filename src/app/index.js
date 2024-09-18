import { StatusBar } from 'expo-status-bar';
import { Alert, BackHandler, Button, StyleSheet, Text, TextInput, View } from 'react-native';
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
      await signIn({ email, password});
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'regular' }}>Decima primeiria tentativa</Text>

      <View style={styles.inputbox}>
         <Ionicons name="person" size={20} color='#b4c5d8' />

         <TextInput placeholder='E-mail' value={email} onChangeText={setEmail} style={styles.emailInput} />
      </View>

      <View style={styles.inputbox}>
         <Ionicons name="lock-closed-outline" size={20} color='black' />

         <TextInput placeholder='Senha' value={password} onChangeText={setPassword} secureTextEntry={passwordVisibility} style={styles.emailInput}  />

         <Ionicons name={passwordVisibility ?  "eye-off-outline" : "eye-outline" } size={20} color='black' onPress={tooglePasswordVisibility} />
         
      </View>


      <Button title="Entrar" onPress={handleEntrarSuper} style={styles.button} />
      <StatusBar style="auto" />

      <Button title="Sobre" onPress={() => router.push("/about")} />

      <Button title="Sair do Aplicativo" onPress={() => BackHandler.exitApp()} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    margin: 20,
  },
  emailInput: {
    flex: 1,
    fontFamily:'bold',
    fontSize: 20 ,
  },
  button: {
    flex: 1,
  }
});
