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

export const SegitigaSAGAScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Segitiga SAGA</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>2. SEGITIGA SAGA</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>
            Periksa SAGA untuk Deteksi Awal
          </Text>
          <Text style={styles.description}>
            Pemilihan cepat untuk menentukan kondisi gawat darurat pada anak
            dengan sistem SAGA (Penampilan, Usaha Napas, Sirkulasi).
          </Text>

          <View style={styles.sagaTriangleContainer}>
            <View
              style={[
                styles.sagaComponent,
                { backgroundColor: "#DBEAFE", borderColor: "#1E40AF" },
              ]}
            >
              <Text style={styles.sagaIcon}>👶</Text>
              <Text style={styles.sagaTitle}>PENAMPILAN</Text>
              <Text style={styles.sagaDesc}>Bagaimana keadaan umum anak?</Text>
              <View style={styles.sagaDetailBox}>
                <Text style={styles.sagaDetailTitle}>Perhatikan:</Text>
                <Text style={styles.sagaDetailItem}>• Kesadaran anak</Text>
                <Text style={styles.sagaDetailItem}>• Kelincahan gerakan</Text>
                <Text style={styles.sagaDetailItem}>• Kemampuan minum</Text>
              </View>
            </View>

            <View
              style={[
                styles.sagaComponent,
                { backgroundColor: "#FEF3C7", borderColor: "#D97706" },
              ]}
            >
              <Text style={styles.sagaIcon}>💨</Text>
              <Text style={styles.sagaTitle}>USAHA NAPAS</Text>
              <Text style={styles.sagaDesc}>Bagaimana anak bernapas?</Text>
              <View style={styles.sagaDetailBox}>
                <Text style={styles.sagaDetailTitle}>Perhatikan:</Text>
                <Text style={styles.sagaDetailItem}>• Kecepatan napas</Text>
                <Text style={styles.sagaDetailItem}>
                  • Tarikan dinding dada
                </Text>
                <Text style={styles.sagaDetailItem}>• Stridor atau mengi</Text>
              </View>
            </View>

            <View
              style={[
                styles.sagaComponent,
                { backgroundColor: "#D1FAE5", borderColor: "#10B981" },
              ]}
            >
              <Text style={styles.sagaIcon}>❤️</Text>
              <Text style={styles.sagaTitle}>SIRKULASI</Text>
              <Text style={styles.sagaDesc}>Bagaimana sirkulasi darah?</Text>
              <View style={styles.sagaDetailBox}>
                <Text style={styles.sagaDetailTitle}>Perhatikan:</Text>
                <Text style={styles.sagaDetailItem}>• Warna kulit</Text>
                <Text style={styles.sagaDetailItem}>
                  • Hangat dingin ekstremitas
                </Text>
                <Text style={styles.sagaDetailItem}>• Tekanan nadi</Text>
              </View>
            </View>
          </View>

          <View style={styles.sagaInfoBox}>
            <MaterialIcons name="info" size={24} color="#0047AB" />
            <Text style={styles.sagaInfoText}>
              Nilai ketiga komponen untuk menentukan tingkat kegawatan dan
              tindakan yang tepat. Setiap komponen dinilai secara independen.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Cara Menggunakan SAGA</Text>
          <View style={styles.stepContainer}>
            {[
              {
                step: "1",
                title: "Amati Penampilan",
                desc: "Lihat bagaimana keadaan umum anak",
              },
              {
                step: "2",
                title: "Amati Usaha Napas",
                desc: "Perhatikan pola dan kecepatan napas",
              },
              {
                step: "3",
                title: "Amati Sirkulasi",
                desc: "Cek warna kulit dan nadi",
              },
              {
                step: "4",
                title: "Buat Keputusan",
                desc: "Tentukan jenis tindakan yang diperlukan",
              },
            ].map((item, idx) => (
              <View key={idx} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SegitigaSAGAScreen;

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
  sagaTriangleContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    marginBottom: 16,
  },
  sagaComponent: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  sagaIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  sagaTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
  },
  sagaDesc: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  sagaDetailBox: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 8,
    padding: 8,
  },
  sagaDetailTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  sagaDetailItem: {
    fontSize: 9,
    color: "#6B7280",
    marginTop: 2,
  },
  sagaInfoBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  sagaInfoText: {
    fontSize: 13,
    color: "#1E40AF",
    marginLeft: 12,
    flex: 1,
  },
  stepContainer: {
    marginTop: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0047AB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0047AB",
  },
  stepDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
});
