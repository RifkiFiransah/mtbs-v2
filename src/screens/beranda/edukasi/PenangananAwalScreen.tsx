import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../../components/ScreenHeader";

export const PenangananAwalScreen = ({ navigation }: any) => {
  const tips = [
    {
      icon: "layers",
      title: "Posisikan Anak Nyaman",
      desc: "Posisikan anak senyaman mungkin dan longarkan pakaian agar anak merasa nyaman dan napas lancar.",
    },
    {
      icon: "local-drink",
      title: "Berikan Cairan",
      desc: "Jika anak bisa minum, berikan cairan sedikit tapi sering. Hindari cairan panas.",
    },
    {
      icon: "thermostat",
      title: "Atur Suhu Tubuh",
      desc: "Gunakan kompres air hangat jika demam tinggi. Ganti pakaian jika basah.",
    },
    {
      icon: "no-meals",
      title: "Jangan Dipaksa Makan",
      desc: "Jangan memaksa anak makan atau minum. Tunggu hingga kondisi membaik.",
    },
    {
      icon: "local-hospital",
      title: "Siap ke Rumah Sakit",
      desc: "Segera bawa ke fasilitas kesehatan bila ada tanda bahaya.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Penanganan Awal di Rumah"
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>
            4. PENANGANAN AWAL DI RUMAH
          </Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>
            Penanganan Pertama Sebelum ke Rumah Sakit
          </Text>
          <Text style={styles.description}>
            Berikut ini adalah langkah-langkah yang dapat Ibu lakukan untuk
            menangani anak sebelum dibawa ke rumah sakit.
          </Text>

          <View style={styles.tipsBox}>
            {tips.map((tip, idx) => (
              <View key={idx} style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <MaterialIcons
                    name={tip.icon as any}
                    size={24}
                    color="#10B981"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDesc}>{tip.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.importantBox}>
            <MaterialIcons name="error-outline" size={24} color="#DC2626" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.importantTitle}>PENTING!</Text>
              <Text style={styles.importantDesc}>
                Jika terdapat tanda-tanda gawat darurat, segera hubungi ambulans
                atau bawa ke rumah sakit terdekat tanpa menunda-nunda.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Hal yang TIDAK Boleh Dilakukan
          </Text>

          <View style={styles.donotList}>
            {[
              "Memberikan obat tanpa resep dokter",
              "Membiarkan anak sendirian",
              "Memberikan makanan berat saat anak masih demam",
              "Panik berlebihan yang menambah kecemasan anak",
              "Menunda untuk ke rumah sakit saat ada tanda bahaya",
            ].map((item, idx) => (
              <View key={idx} style={styles.donotItem}>
                <MaterialIcons name="error-outline" size={20} color="#DC2626" />
                <Text style={styles.donotText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PenangananAwalScreen;

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
  tipsBox: {
    marginTop: 12,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tipIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  tipDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 16,
  },
  importantBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  importantTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7F1D1D",
  },
  importantDesc: {
    fontSize: 12,
    color: "#7F1D1D",
    marginTop: 4,
  },
  donotList: {
    marginTop: 12,
  },
  donotItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FEF3C7",
    padding: 10,
    borderRadius: 8,
  },
  donotText: {
    fontSize: 13,
    color: "#92400E",
    marginLeft: 10,
    flex: 1,
  },
});
