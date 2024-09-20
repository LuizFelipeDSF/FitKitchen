import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/Auth/index';


function CustomDrawerContent(props) {

  const {user, signOut} = useAuth();

  return (
    <View style={{ flex: 1,}}>
      <View style={{marginTop: 20, justifyContent: 'center', alignItems:'center', backgroundColor:'#f0f0f0'}}>
        <Image source={require('../../assets/LuizF.jpg')} style={{width: 120, height: 120, borderRadius: 100, margin: 40, }}  />
      </View>
      
      <View>
        <Text style={{textAlign:'center', fontSize:14}}>{user.user.nome}</Text> 
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={()=>signOut()} style={styles.desligar}><Text style={{ fontSize: 20, fontFamily: 'bold', color: '#ffff' }}>Sair</Text></TouchableOpacity>


    </View >
  );
}


const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#143630' }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="index" options={{ drawerLabel: "Principal", headerTitle: "Principal", drawerIcon: () => <Ionicons name="home" size={20} color="#8da59f" /> }} />
        <Drawer.Screen name="list" options={{ drawerLabel: "Listagem", headerTitle: "Listagem", drawerIcon: () => <Ionicons name="list" size={20} color="#d1e8d6" /> }} />
        <Drawer.Screen name="payment" options={{ drawerLabel: "Pagamentos", headerTitle: "Pagamentos", drawerIcon: () => <Ionicons name="diamond-outline" size={20} color="#436850" /> }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}


export default function Layout() {
  return DrawerLayout();
}


const styles = StyleSheet.create({
  desligar: {
    height: 50,
    backgroundColor: '#8da59f',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    margin: 10,
  },
});