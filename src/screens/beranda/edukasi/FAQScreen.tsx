import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FAQS = [
  {
    id: "1",
    question: "Kapan harus membawa anak ke rumah sakit?",
    answer:
      "Segera bawa anak ke rumah sakit jika ada tanda bahaya seperti kesadaran berkurang, kesulitan bernapas, atau kejang.",
  },
  {
    id: "2",
    question: "Bagaimana cara mengatasi demam tinggi?",
    answer:
      "Berikan kompres air hangat, berikan minum yang cukup, dan gunakan obat penurun panas sesuai dosisnya setelah berkonsultasi dengan dokter.",
  },
  {
    id: "3",
    question: "Apakah normal jika anak tidak mau makan?",
    answer:
      "Tidak mau makan saat sakit adalah hal yang wajar, namun pastikan anak tetap terhidrasi dengan baik.",
  },
  {
    id: "4",
    question: "Berapa lama biasanya anak sakit?",
    answer:
      "Durasi sakit tergantung jenis penyakitnya. Rata-rata 3-7 hari. Jika lebih lama, segera periksakan ke dokter.",
  },
  {
    id: "5",
    question: "Kapan anak boleh kembali bermain setelah sakit?",
    answer:
      "Tunggu hingga anak benar-benar pulih dan tidak ada demam selama 24 jam tanpa obat penurun panas.",
  },
  {
    id: "6",
    question: "Apakah perlu vaksin setelah anak sakit?",
    answer:
      "Biasanya perlu menunggu 2-4 minggu setelah sakit berat sebelum pemberian vaksin. Konsultasikan dengan dokter.",
  },
];

export const FAQScreen = ({ navigation }: any) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ (Tanya Jawab)</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>7. FAQ (TANYA JAWAB)</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.description}>
            Pertanyaan yang sering diajukan orang tua tentang kesehatan anak dan
            penanganan darurat.
          </Text>

          {FAQS.map((faq) => (
            <View key={faq.id} style={styles.faqContainer}>
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleExpand(faq.id)}
              >
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <MaterialIcons
                  name={expanded === faq.id ? "expand-less" : "expand-more"}
                  size={24}
                  color="#0047AB"
                />
              </TouchableOpacity>

              {expanded === faq.id && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;

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
  faqContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F3F4F6",
  },
  faqQuestionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0047AB",
    flex: 1,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  faqAnswerText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
});
