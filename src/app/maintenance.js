import { router } from "expo-router";
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useMaintenanceDatabase } from "../database/useMaintenanceDatabase";
import { Ionicons } from '@expo/vector-icons';

export default function Maintenance() {
    const { resetDatabase } = useMaintenanceDatabase();


    const handleReset = async () => {
        try {
            await resetDatabase();
            Alert.alert("Payments", "Banco de dados resetado com sucesso!");
        } catch (error) {
            Alert.alert("Payments", "Erro ao resetar o banco de dados: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Ionicons name='build-sharp' size={80} color={"#143630"} onPress={() => router.push("/maintenance")} />
            <Text style={styles.windowTitle}>Manutenção de Banco</Text>
            <View style={styles.contentButtons}>
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>Zerar Banco</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8ede7', // Fundo mais claro
        padding: 20,
    },
    windowTitle: {
        fontSize: 30,
        color: '#143630', // Cor do título
        fontWeight: 'bold',
        marginBottom: 30,
    },
    contentButtons: {
        gap: 15,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#143630', // Cor do botão
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // Cor do texto do botão
        fontSize: 16,
        fontWeight: 'bold',
    },
});
