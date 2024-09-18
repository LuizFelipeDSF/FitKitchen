import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';

export default function App() {

  const { signIn, signOut } = useAuth();

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email: "super@email.com", password: "A123456!" });
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'regular' }}>Decima primeiria tentativa</Text>
      <Button
        title="Sign Super"
        onPress = { handleEntrarSuper } />

      <Button
        title="Sign Adm"
        onPress={() => signIn({ email: "adm@email.com", password: "Adm123!" })} />


      <Button
        title="Sign User"
        onPress={() => signIn({ email: "user@email.com", password: "User123!" })} />

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
});
