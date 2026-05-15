import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const TandaBahayaBalitaScreen = ({ navigation }: any) => {
  const dangerSigns = [
    "Tidak bisa minum/menyusu",
    "Muntah semua yang diminum",
    "Kejang",
    "Anak sangat lemas (tidak aktif)",
    "Sesak napas / napas cepat",
    "Bibir kebiruan",
    "Demam tinggi (≥39°C)",
    "Diare berat (gair terus menerus)",
    "Penurunan kesadaran",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tanda Bahaya Balita</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>3. TANDA BAHAYA BALITA</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Tanda Bahaya Umum Pada Balita</Text>
          <Text style={styles.description}>
            Jika ada salah satu tanda di bawah, segera bawa anak ke fasilitas
            kesehatan!
          </Text>

          <View style={styles.warningBanner}>
            <MaterialIcons name="warning" size={28} color="#DC2626" />
            <Text style={styles.warningBannerText}>TANDA GAWAT DARURAT</Text>
          </View>

          <View style={styles.warningList}>
            {dangerSigns.map((item, index) => (
              <View key={index} style={styles.warningListItem}>
                <MaterialIcons name="warning" size={20} color="#DC2626" />
                <Text style={styles.warningListText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.cautionBox}>
            <MaterialIcons name="warning" size={24} color="#D97706" />
            <Text style={styles.cautionText}>
              Jika ada salah satu tanda di atas, segera bawa anak ke fasilitas
              kesehatan!
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Penjelasan Detail</Text>

          {[
            {
              title: "Tidak Bisa Minum atau Muntah Semua",
              desc: "Anak tidak mampu menelan atau selalu muntah ketika minum/makan, risiko dehidrasi tinggi.",
            },
            {
              title: "Kejang",
              desc: "Gerakan tubuh yang tidak terkontrol, sering terjadi saat demam tinggi atau komplikasi lain.",
            },
            {
              title: "Anak Sangat Lemas",
              desc: "Anak tidak aktif, sulit dibangunkan, respons minimal terhadap lingkungan.",
            },
            {
              title: "Sesak Napas",
              desc: "Pernapasan cepat/berat, tarikan dinding dada, atau stridor (bunyi napas abnormal).",
            },
            {
              title: "Tanda Sirkulasi Buruk",
              desc: "Bibir/kulit kebiruan, denyut nadi lemah atau tidak teraba, tangan/kaki dingin.",
            },
          ].map((item, idx) => (
            <View key={idx} style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <MaterialIcons name="info" size={20} color="#0047AB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>{item.title}</Text>
                <Text style={styles.detailDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TandaBahayaBalitaScreen;

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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  warningBanner: {
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  warningBannerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
    marginLeft: 12,
  },
  warningList: {
    marginBottom: 16,
  },
  warningListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
  },
  warningListText: {
    fontSize: 13,
    color: "#7F1D1D",
    marginLeft: 12,
    flex: 1,
    fontWeight: "500",
  },
  cautionBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cautionText: {
    fontSize: 13,
    color: "#92400E",
    marginLeft: 12,
    flex: 1,
  },
  detailCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailIcon: {
    marginRight: 12,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0047AB",
  },
  detailDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});
