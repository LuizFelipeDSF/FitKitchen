import { router } from "expo-router";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useMaintenanceDatabase } from "../database/useMaintenanceDatabase";

export default function Maintenance() {
    const { resetDatabase } = useMaintenanceDatabase();

    const handleReset = async () => {
        try {
            await resetDatabase();
            Alert.alert("Payments", "Banco de dados resetado com sucesso!",);
        } catch (error) {
            Alert.alert("Payments", "Erro ao resetar o banco de dados: " + error.message,);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.windowTitle}>Manutenção de Banco</Text>
            <View style={styles.contentButtons}>
                <Button title="zerar" onPress={handleReset} />
                <Button title="importar usuários" />
                <Button title="importar pagamentos" />
                <Button title="voltar" onPress={() => router.back} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    windowTitle: {
        fontSize: 20,
        fontFamily: 'bold',
    },
    contentButtons: {
        gap: 10,

    }
});
