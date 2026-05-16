import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TindakanItem } from "../../../components/TindakanItem";

interface StabilProps {
  onBack: () => void;
}

export const Stabil = ({ onBack }: StabilProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <MaterialIcons name="check-circle" size={48} color="#fff" />
        <Text style={styles.headerTitle}>STABIL</Text>
        <Text style={styles.headerSubtitle}>
          Tidak terdapat satupun tanda bahaya atau kriteria penyakit berat pada
          anak
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TINDAKAN</Text>

        <View style={styles.infoCard}>
          <MaterialIcons name="info-outline" size={24} color="#059669" />
          <Text style={styles.infoText}>
            Tidak perlu tindakan khusus/darurat
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lanjutkan Perawatan Umum:</Text>

          <TindakanItem
            iconName="medical"
            text="Lanjutkan perawatan sesuai keluhan saat ini (demam, batuk, dll)"
            iconColor="#059669"
          />
          <TindakanItem
            iconName="heart"
            text="Menjaga kondisi anak tetap stabil"
            iconColor="#059669"
          />
          <TindakanItem
            iconName="nutrition"
            text="Mencegah dehidrasi dengan minum yang cukup & malnutrisi dengan asupan bergizi"
            iconColor="#059669"
          />
          <TindakanItem
            iconName="people"
            text="Edukasi kembali tanda bahaya (segera kembali jika memburuk)"
            iconColor="#059669"
          />
          <TindakanItem
            iconName="today"
            text="Lakukan pemantauan secara berkala"
            iconColor="#059669"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
        <Text style={styles.primaryButtonText}>
          SIMPAN & KEMBALI KE BERANDA
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  headerCard: {
    backgroundColor: "#10B981", // Emerald 500
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#D1FAE5",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#059669",
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: "#D1FAE5",
    borderColor: "#34D399",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#065F46",
    marginLeft: 12,
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#0047AB",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
