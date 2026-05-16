import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ResultCardProps {
  title: string;
  description: string;
  iconName: "check-circle" | "warning" | "error" | "dangerous";
  backgroundColor: string; // Sudah benar menerima string warna dari luar
  borderColor: string; // Sudah benar menerima string warna dari luar
}

export const ResultCard = ({
  title,
  description,
  iconName,
  backgroundColor, // Ambil props warna dari SagaScreen
  borderColor, // Ambil props warna dari SagaScreen
}: ResultCardProps) => {
  // Catatan: Logika isDanger lama dihapus dari sini agar warna kartu
  // bisa mengikuti warna dinamis (Hijau/Orange/Merah) yang dikirim dari SagaScreen

  return (
    <View style={[styles.resultCard, { borderColor }]}>
      <View style={[styles.resultHeader, { backgroundColor }]}>
        <Text style={styles.resultTitle}>{title}</Text>
        <MaterialIcons
          name={iconName}
          size={60}
          color="#fff"
          style={{ marginTop: 10 }}
        />
      </View>
      <View style={styles.resultBody}>
        <Text style={styles.resultDesc}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    borderWidth: 2,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
  },
  resultHeader: {
    padding: 30,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
  resultBody: {
    padding: 24,
    backgroundColor: "#fff",
  },
  resultDesc: {
    fontSize: 16,
    textAlign: "center",
    color: "#111827",
    lineHeight: 24,
  },
});
