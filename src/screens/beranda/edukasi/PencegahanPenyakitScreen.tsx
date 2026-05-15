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

const PREVENTION_TIPS = [
  {
    icon: "vaccines",
    title: "Vaksinasi Lengkap",
    desc: "Pastikan anak mendapat vaksinasi sesuai jadwal lengkap yang direkomendasikan oleh pemerintah.",
    tips: [
      "Vaksinasi dasar di usia 0-1 tahun",
      "Vaksinasi lanjutan di usia 1-2 tahun",
      "Vaksinasi ulang saat usia sekolah",
    ],
  },
  {
    icon: "hand-sanitizer",
    title: "Hygiene dan Sanitasi",
    desc: "Menjaga kebersihan pribadi dan lingkungan adalah kunci pencegahan penyakit.",
    tips: [
      "Cuci tangan dengan sabun sebelum makan dan setelah BAB",
      "Jaga kebersihan mainan dan peralatan anak",
      "Gunakan air bersih untuk minum dan memasak",
    ],
  },
  {
    icon: "restaurant",
    title: "Nutrisi Seimbang",
    desc: "Berikan makanan bergizi untuk meningkatkan daya tahan tubuh anak.",
    tips: [
      "Berikan ASI eksklusif hingga 6 bulan",
      "Makanan MPASI bergizi setelah 6 bulan",
      "Konsumsi makanan dari 4 sehat 5 sempurna",
    ],
  },
  {
    icon: "bedtime",
    title: "Istirahat Cukup",
    desc: "Tidur yang cukup sangat penting untuk pertumbuhan dan daya tahan tubuh anak.",
    tips: [
      "Bayi: 16-17 jam tidur per hari",
      "Balita 1-3 tahun: 12-14 jam tidur per hari",
      "Buat rutinitas tidur yang teratur",
    ],
  },
  {
    icon: "sports-volleyball",
    title: "Aktivitas Fisik",
    desc: "Bermain dan bergerak aktif membantu memperkuat otot dan daya tahan tubuh.",
    tips: [
      "Ajak anak bermain di luar rumah",
      "Bermain sambil belajar",
      "Hindari terlalu lama di depan layar",
    ],
  },
  {
    icon: "health-and-safety",
    title: "Lingkungan Sehat",
    desc: "Ciptakan lingkungan yang bersih dan sehat di rumah dan sekolah.",
    tips: [
      "Ventilasi rumah yang baik",
      "Hindari asap rokok",
      "Jaga kebersihan area bermain anak",
    ],
  },
];

export const PencegahanPenyakitScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pencegahan Penyakit</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>10. PENCEGAHAN PENYAKIT</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>
            Langkah Pencegahan Penyakit Pada Anak
          </Text>
          <Text style={styles.description}>
            Berikut adalah langkah-langkah yang dapat dilakukan untuk mencegah
            penyakit pada anak.
          </Text>

          {PREVENTION_TIPS.map((tip, index) => (
            <View key={index} style={styles.preventionCard}>
              <View style={styles.preventionHeader}>
                <View style={styles.preventionIcon}>
                  <MaterialIcons
                    name={tip.icon as any}
                    size={28}
                    color="#10B981"
                  />
                </View>
                <Text style={styles.preventionTitle}>{tip.title}</Text>
              </View>

              <Text style={styles.preventionDesc}>{tip.desc}</Text>

              <View style={styles.tipsList}>
                <Text style={styles.tipsListTitle}>Tips:</Text>
                {tip.tips.map((t, idx) => (
                  <View key={idx} style={styles.tipsItem}>
                    <Text style={styles.tipsItemBullet}>•</Text>
                    <Text style={styles.tipsItemText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.summaryBox}>
            <MaterialIcons name="check-circle" size={28} color="#10B981" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.summaryTitle}>
                Pencegahan Lebih Baik dari Pengobatan
              </Text>
              <Text style={styles.summaryDesc}>
                Dengan menerapkan langkah-langkah pencegahan di atas secara
                konsisten, Anda dapat menjaga kesehatan anak dengan optimal.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PencegahanPenyakitScreen;

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
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 16,
  },
  preventionCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  preventionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  preventionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  preventionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10B981",
    flex: 1,
  },
  preventionDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
    lineHeight: 18,
  },
  tipsList: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    padding: 12,
  },
  tipsListTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0047AB",
    marginBottom: 8,
  },
  tipsItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  tipsItemBullet: {
    fontSize: 12,
    color: "#0047AB",
    marginRight: 8,
    fontWeight: "bold",
  },
  tipsItemText: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
  },
  summaryBox: {
    backgroundColor: "#D1FAE5",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10B981",
  },
  summaryDesc: {
    fontSize: 12,
    color: "#059669",
    marginTop: 4,
  },
});
