import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { usePaymentsDatabase } from "../../database/usePaymentsDatabase";
import { FlashList } from "@shopify/flash-list";
import { formatDateToBrazilian } from "../../utils/formatData";
import { formatCurrencyBRL } from "../../utils/formatCurrent";
import { router } from "expo-router";

export default function List() {
  const [data, setData] = useState([]);
  const { getPayments } = usePaymentsDatabase();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  async function fetchData() {
    if (!hasMore || loading) return;

    setLoading(true);
    const payments = await getPayments(page);

    if (payments.length < 5) setHasMore(false);

    setData((prev) => [...prev, ...payments]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }

  useEffect(() => {
    setData([]); // Reset data when component mounts
    setPage(0);
    setHasMore(true);
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "details", params: { id: item.id } })}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardDate}>
              {formatDateToBrazilian(item.data_pagamento || new Date())}
            </Text>
            <Text style={styles.cardReceipt}>{item.numero_recibo}</Text>
          </View>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardValue}>{formatCurrencyBRL(item.valor_pago || 0)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={80}
        onEndReached={fetchData}
        onEndReachedThreshold={0.8}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#143630" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ede7",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  cardLeft: {
    flex: 2,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#143630",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  cardInfo: {
    flexDirection: "row",
    gap: 10,
  },
  cardDate: {
    fontSize: 14,
    color: "#8da59f",
  },
  cardReceipt: {
    fontSize: 14,
    color: "#143630",
  },
  cardRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8eb69b",
  },
});
