import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { HeaderSafeArea } from "../components/HeaderSafeArea";

interface TanyaJawabScreenProps {
  navigation: any;
}

const FAQ_DATA = [
  {
    question: "🌡️ Anak saya panas, apakah itu demam?",
    answer:
      "Anak dikatakan demam jika suhu tubuh mencapai 38°C atau lebih. Gunakan termometer agar hasil lebih akurat. Demam adalah respon tubuh terhadap infeksi, jadi perlu dipantau kondisinya.",
  },
  {
    question: "🤒 Perlu langsung ke dokter saat anak demam?",
    answer:
      "Tidak selalu. Jika anak masih aktif, mau minum, dan tidak ada tanda bahaya, perawatan di rumah bisa dilakukan. Namun, jika demam tinggi, berlangsung lama, atau disertai gejala lain, sebaiknya diperiksakan.",
  },
  {
    question: "💧 Anak tidak mau minum, apa yang harus saya lakukan?",
    answer:
      "Coba berikan cairan sedikit demi sedikit tetapi sering. Tetap tawarkan ASI atau minuman lain. Jika anak tetap menolak atau tampak lemas, kondisi ini berbahaya dan perlu segera diperiksa.",
  },
  {
    question: "🤮 Anak muntah setelah makan, kapan harus khawatir?",
    answer:
      "Jika muntah hanya sesekali, masih bisa dipantau. Namun jika setiap makan atau minum selalu muntah, atau terjadi berulang, anak berisiko dehidrasi dan perlu penanganan medis.",
  },
  {
    question: "⚡ Apa yang harus dilakukan saat anak kejang?",
    answer:
      "Segera baringkan anak di tempat yang aman dan posisikan miring agar tidak tersedak. Jangan memasukkan benda ke mulut dan jangan menahan gerakan. Setelah kejang berhenti, segera bawa ke fasilitas kesehatan.",
  },
  {
    question: "🌬️ Bagaimana cara mengetahui napas anak bermasalah?",
    answer:
      "Perhatikan apakah napas lebih cepat dari biasanya, tampak berat, atau ada tarikan pada dinding dada. Jika ada tanda tersebut, itu menunjukkan gangguan pernapasan dan perlu segera diperiksa.",
  },
  {
    question: "😴 Anak sulit dibangunkan, apakah itu normal?",
    answer:
      "Jika anak hanya tidur, biasanya masih bisa dibangunkan. Namun jika tidak merespon saat dipanggil atau disentuh, ini merupakan tanda bahaya yang memerlukan penanganan segera.",
  },
  {
    question: "🏠 Kapan anak cukup dirawat di rumah?",
    answer:
      "Anak bisa dirawat di rumah jika kondisinya masih baik, seperti mau minum, tidak lemas, dan tidak ada tanda bahaya. Tetap lakukan pemantauan secara rutin.",
  },
  {
    question: "🚑 Kapan harus segera ke fasilitas kesehatan?",
    answer:
      "Segera bawa anak ke fasilitas kesehatan jika muncul salah satu tanda berikut:\n• Tidak mau minum atau menyusu\n• Muntah terus menerus\n• Kejang\n• Tidak sadar atau sangat lemas\n• Sesak napas",
  },
];

export const TanyaJawabScreen = ({ navigation }: TanyaJawabScreenProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      paddingBottom: 40,
    },
    headerText: {
      fontSize: 16,
      color: "#64748B",
      marginBottom: 20,
      lineHeight: 24,
      textAlign: "center",
    },
    faqCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      marginBottom: 16,
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 4,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "#F1F5F9",
    },
    faqHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#FFFFFF",
    },
    question: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
      color: "#1E293B",
      marginRight: 16,
      lineHeight: 22,
    },
    answerContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 4,
      backgroundColor: "#F8FAFC",
      borderTopWidth: 1,
      borderTopColor: "#F1F5F9",
    },
    answer: {
      fontSize: 14,
      color: "#475569",
      lineHeight: 22,
      marginTop: 8,
    },
  });

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.safeArea}>
        <HeaderSafeArea
          title="Tanya Jawab"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            <Text style={styles.headerText}>
              Temukan jawaban untuk pertanyaan yang sering ditanyakan seputar
              kesehatan anak Anda.
            </Text>

            {FAQ_DATA.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <View key={index} style={styles.faqCard}>
                  <TouchableOpacity
                    style={styles.faqHeader}
                    onPress={() => toggleExpand(index)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.question}>{item.question}</Text>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#64748B"
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.answerContainer}>
                      <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
