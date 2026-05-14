import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { HeaderSafeArea } from "../components/HeaderSafeArea";

interface BantuanScreenProps {
  navigation: any;
}

export const BantuanScreen = ({ navigation }: BantuanScreenProps) => {
  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.safeArea}>
        <HeaderSafeArea
          title="Bantuan"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>
              Pertanyaan yang Sering Diajukan (FAQ)
            </Text>

            <View style={styles.faqItem}>
              <Text style={styles.question}>
                1. Bagaimana cara menggunakan aplikasi ini?
              </Text>
              <Text style={styles.answer}>
                Aplikasi ini dapat digunakan dengan menavigasi menu yang
                tersedia di beranda. Anda bisa memanfaatkan fitur Cek Kondisi
                untuk mendapatkan panduan cepat terkait kondisi balita Anda.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>
                2. Apakah data anak saya aman?
              </Text>
              <Text style={styles.answer}>
                Ya, semua data terkait pengguna dan anak akan disimpan secara
                lokal di perangkat Anda.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>
                3. Apa yang harus saya lakukan saat darurat?
              </Text>
              <Text style={styles.answer}>
                Jika anak mengalami tanda bahaya umum seperti yang tertera di
                menu Cek Kondisi, segera bawa ke fasilitas kesehatan atau rumah
                sakit terdekat.
              </Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.title}>Kontak Dukungan</Text>
            <Text style={styles.answer}>
              Jika Anda memiliki kendala teknis dalam menggunakan aplikasi ini,
              Anda dapat menghubungi tim dukungan kami melalui email di
              bantuan@mtbspintar.com atau mengirim pesan via WhatsApp ke +62
              812-3456-7890.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerRow: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
  },
  question: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  answer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 16,
  },
});
