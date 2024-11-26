import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { useEffect, useState } from "react";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";

export default function Details() {
    const { id } = useLocalSearchParams();
    const { getPayment } = usePaymentsDatabase();
    const [payment, setPayment] = useState({});

    const fetchData = async () => {
        try {
            const data = await getPayment(id)
            setPayment(data)
        } catch (error) {
            Alert.alert("Erro ao buscar pagamento")
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style = {styles.text}>Nome: {payment?.nome}</Text>
                <Text style = {styles.text}>Data do Pagamento: {formatDateToBrazilian(payment?.data_pagamento)}</Text>
                <Text style = {styles.text}>Num Recibo: {payment?.numero_recibo}</Text>
                <Text style = {styles.text}>Valor Pago: {formatCurrencyBRL(Number(payment?.valor_pago) || 0)}</Text>
                <Text style = {styles.text}>Observação: {payment?.observacao}</Text>
            </View>
            <View style={styles.contentImage}>
                {
                    !!payment?.imagem ?
                    <Image source={{url: payment?.imagem}} style={{width: 200, height: 200}} />
                    :  <Text>Não há imagem cadastradas</Text>
                }
            </View>
            <View style={styles.containerButtons}>
                <Button title="Editar" disabled />
                <Button title="DEFINIR IMAGEM" />
                <Button title="IMAGEM" />
                <Button title="VOLTAR" onPress={() => router.push("list")} />
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    containerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontFamily: "bold"
    },
});