import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useEffect, useState } from "react";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { usePickImage } from "../../utils/pickImage";
import { useConfig } from "../../hooks/Config";

export default function Details() {
    const { id } = useLocalSearchParams();
    const { getPayment, setImagePayment, removeImagePayment } = usePaymentsDatabase();
    const [payment, setPayment] = useState({});
    const { pickImage } = usePickImage();
    const { directory } = useConfig();

    const fetchData = async () => {
        try {
            const data = await getPayment(id);
            setPayment(data);
        } catch (error) {
            Alert.alert("Erro ao buscar pagamento");
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handlePickImage = async () => {
        try {
            const image = await pickImage();
            if (!image) return;
    
            await setImagePayment(id, image.uri);
            await fetchData();
            console.log("Imagem salva com sucesso: ", image.uri);
        } catch (error) {
            console.error("Erro ao selecionar ou salvar imagem: ", error);
            Alert.alert("Erro ao selecionar ou salvar imagem");
        }
    };

    const handleRemoveImage = async () => {
        try {
            await removeImagePayment(id); // Remover a imagem do pagamento
            await fetchData(); // Atualiza os dados na tela
            console.log("Imagem removida com sucesso");
        } catch (error) {
            console.error("Erro ao remover a imagem", error);
            Alert.alert("Erro ao remover a imagem");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Pagamento</Text>
            <View style={styles.detailsSection}>
                <Text style={styles.text}>Nome: <Text style={styles.bold}>{payment?.nome}</Text></Text>
                <Text style={styles.text}>Data do Pagamento: {formatDateToBrazilian(payment?.data_pagamento)}</Text>
                <Text style={styles.text}>Num Recibo: {payment?.numero_recibo}</Text>
                <Text style={styles.text}>Valor Pago: {formatCurrencyBRL(Number(payment?.valor_pago) || 0)}</Text>
                <Text style={styles.text}>Observação: {payment?.observacao}</Text>
            </View>
            <View style={styles.imageSection}>
                {
                    payment?.imagem ?
                        <Image source={{ uri: `${directory}/${payment?.imagem}` }} style={styles.image} />
                        : <Text style={styles.noImageText}>Não há imagem cadastrada</Text>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Selecionar Imagem" onPress={handlePickImage} color="#4CAF50" />
                <Button title="Remover Imagem" onPress={handleRemoveImage} color="#f44336" />
                <Button title="Voltar" onPress={() => router.push("list")} color="#2196F3" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    detailsSection: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    imageSection: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    noImageText: {
        fontSize: 16,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});
