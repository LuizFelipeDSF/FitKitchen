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
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image />

      <Text style={styles.title}>Login</Text>

      <View style={styles.inserts}>
        <View style={styles.inputemail}>
          <Ionicons name="person" size={25} color='#86af95' />
          <TextInput placeholder='E-mail' value={email} onChangeText={setEmail} style={styles.emailInput} />
        </View>
        <View style={styles.inputsenha}>
          <Ionicons name="lock-closed" size={25} color='#86af95' />
          <TextInput placeholder='Senha' value={password} onChangeText={setPassword} secureTextEntry={passwordVisibility} style={styles.emailInput} />
          <Ionicons name={passwordVisibility ? "eye-off-outline" : "eye-outline"} size={20} color='#86af95' onPress={tooglePasswordVisibility} />
        </View>
      </View>

      <View style={styles.contorno}>
        <View style={styles.botoes}>
          <TouchableOpacity style={{ height: 80, width: 200, justifyContent: 'center', textAlign: 'center', alignItems: 'center', paddingTop: 30 }} onPress={handleEntrarSuper}>
            <Text style={{ color: '#8da59f', fontFamily: 'regular', fontSize: 40 }}>ENTRAR</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />

          <View style={{
            flex: 1, justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', borderTopStartRadius: 500,
            borderTopEndRadius: 500, backgroundColor: '#8eb69b', width: 550, textAlign: 'center', paddingTop: 60
          }}>
            <TouchableOpacity style={{ height: 95, width: 200, justifyContent: 'center', textAlign: 'start', alignItems: 'center', borderRadius: 25, paddingBottom: 50, paddingTop: 0 }} onPress={() => router.push("/about")}>
              <Text style={{ color: '#1638', fontFamily: 'regular', fontSize: 40 }}>Sobre</Text>
            </TouchableOpacity>

            <View style={{
              height: 100, width: 250, flex: 1, justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', borderTopStartRadius: 250,
              borderTopEndRadius: 250, backgroundColor: '#75b088', textAlign: 'center',
            }}>
              <TouchableOpacity style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', paddingBottom: 0 }} onPress={() => BackHandler.exitApp()}>
                <Text style={{ color: '#051f20', fontFamily: 'regular', fontSize: 35 }}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contorno: {
    width: 600,
    borderTopStartRadius: 270,
    borderTopEndRadius: 270,
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#daf1de',
  },
  container: {
    gap: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputemail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#daf1de',
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  inputsenha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: '#daf1de',
    padding: 10,
    borderRadius: 10,
  },
  emailInput: {
    paddingLeft: 10,
    flex: 1,
    fontFamily: 'light',
    fontSize: 20,
  },
  button: {
    flex: 1,
  },
  title: {
    fontSize: 50,
    marginTop: 10,
    marginBottom: 100,
    fontFamily: 'light',
    color: '#86af95',
    paddingTop: 0,
  },
  botoes: {
    gap: 50,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inserts: {
    gap: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
});