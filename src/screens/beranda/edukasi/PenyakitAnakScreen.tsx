import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DISEASES = [
  {
    id: "1",
    name: "Infeksi Saluran Pernapasan Akut (ISPA)",
    symptoms: ["Batuk", "Pilek", "Demam", "Sesak napas"],
    treatment: "Istirahat, minum banyak, obat penurun demam sesuai dosis",
  },
  {
    id: "2",
    name: "Diare",
    symptoms: ["Buang air besar cair", "Frekuensi tinggi", "Kehilangan cairan"],
    treatment: "Rehidrasi dengan oralit, makanan bergizi, konsultasi dokter",
  },
  {
    id: "3",
    name: "Demam",
    symptoms: ["Suhu tubuh tinggi", "Menggigil", "Lemas"],
    treatment: "Kompres air hangat, obat penurun demam, banyak minum",
  },
  {
    id: "4",
    name: "Malaria",
    symptoms: ["Demam intermiten", "Menggigil", "Berkeringat"],
    treatment: "Diagnosis darah, obat antimalarial sesuai resep dokter",
  },
  {
    id: "5",
    name: "Campak",
    symptoms: ["Demam tinggi", "Ruam merah", "Batuk", "Pilek"],
    treatment: "Perawatan suportif, vaksin jika belum pernah, istirahat",
  },
];

export const PenyakitAnakScreen = ({ navigation }: any) => {
  const renderDiseaseItem = ({ item }: any) => (
    <View style={styles.diseaseCard}>
      <View style={styles.diseaseHeader}>
        <MaterialIcons name="illness" size={24} color="#0047AB" />
        <Text style={styles.diseaseName}>{item.name}</Text>
      </View>

      <View style={styles.diseaseContent}>
        <Text style={styles.symptomTitle}>Gejala:</Text>
        {item.symptoms.map((symptom: string, idx: number) => (
          <Text key={idx} style={styles.symptomItem}>
            • {symptom}
          </Text>
        ))}

        <Text style={[styles.symptomTitle, { marginTop: 12 }]}>
          Penanganan:
        </Text>
        <Text style={styles.treatmentText}>{item.treatment}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Penyakit Anak Sering Terjadi</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>
            5. PENYAKIT ANAK YANG SERING TERJADI
          </Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.description}>
            Berikut adalah beberapa penyakit yang sering terjadi pada anak
            beserta gejala dan penanganannya.
          </Text>

          <FlatList
            data={DISEASES}
            renderItem={renderDiseaseItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PenyakitAnakScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  headerBanner: {
    backgroundColor: "#0047AB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerBannerText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  contentBox: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 16,
  },
  diseaseCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  diseaseHeader: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  diseaseName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0047AB",
    marginLeft: 12,
    flex: 1,
  },
  diseaseContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  symptomTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F2937",
  },
  symptomItem: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  treatmentText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 16,
  },
});
