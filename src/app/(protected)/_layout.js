import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/Auth/index';

function CustomDrawerContent(props) {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1, }}>
      <View style={{ marginTop: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8da59f' }}>
        <Image source={require('../../assets/LuizF.jpg')} style={{ width: 120, height: 120, borderRadius: 100, margin: 40 }} />
      </View>

      <View>
        {/* Verifica se user e user.nome estão definidos */}
        {user?.user?.nome ? (
          <Text style={{ textAlign: 'center', fontSize: 35, fontFamily: 'regular', color: '#8da59f', paddingTop: 30 }}>{user.user.nome}</Text>
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'regular', color: '#8da59f', paddingTop: 30 }}>Usuário não identificado</Text>
        )}
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity onPress={async () => {
        try {
          await signOut();
        } catch (error) {
          console.error('Erro ao sair', error);
        }
      }} style={styles.desligar}>
        <Text style={{ fontSize: 20, fontFamily: 'bold', color: '#fff' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const DrawerLayout = () => (
  <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#143630' }}>
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="index" options={{ drawerLabel: "Início", headerTitle: "Início", drawerIcon: () => <Ionicons name="home" size={30} color="#8da59f" /> }} />
      <Drawer.Screen name="list" options={{ drawerLabel: "Receitas", headerTitle: "Receitas", drawerIcon: () => <Ionicons name="nutrition" size={30} color="#d1e8d6" /> }} />
      <Drawer.Screen name="payment" options={{ drawerLabel: "Pagamentos", headerTitle: "Pagamentos", drawerIcon: () => <Ionicons name="cash-outline" size={30} color="#436850" /> }} />
    </Drawer>
  </GestureHandlerRootView>
);

export default DrawerLayout;

const styles = StyleSheet.create({
  desligar: {
    height: 50,
    backgroundColor: '#8da59f',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
