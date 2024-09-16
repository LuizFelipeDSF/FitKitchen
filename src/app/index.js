import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';

export default function App() {

  const { signIn, signOut } = useAuth();

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email: "super@email.com", password: "Super123!" });
      router.replace("/");
    } catch (error) {
      console.log(e);
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


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
