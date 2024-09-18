import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { useData } from "../hooks/Data";

export default function About() {
    const { data } = useData();
    return (
        <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
            <Text>Sobre</Text>
            <Button title="Voltar" onPress={() => (router.replace("/"))} />
        </View>
    );
}