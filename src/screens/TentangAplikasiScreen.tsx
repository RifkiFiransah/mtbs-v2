import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { HeaderSafeArea } from "../components/HeaderSafeArea";

interface TentangAplikasiScreenProps {
  navigation: any;
}

export const TentangAplikasiScreen = ({
  navigation,
}: TentangAplikasiScreenProps) => {
  return (
    <BackgroundWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderSafeArea
          title="Tentang Aplikasi"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>MTBS Pintar</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>
              Aplikasi MTBS Pintar adalah sebuah inovasi yang dirancang untuk
              membantu para orang tua dan tenaga kesehatan dalam menerapkan
              Manajemen Terpadu Balita Sakit (MTBS). Aplikasi ini memberikan
              panduan interaktif dan informasi penting mengenai penanganan dan
              perawatan balita saat sakit.
            </Text>
            <Text style={styles.description}>
              Dengan MTBS Pintar, diharapkan penangan medis pada balita sakit
              dapat dilakukan lebih cepat dan tepat sasaran.
            </Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>Tentang Aplikasi</Text>
            <Text style={styles.description}>
              Aplikasi ini dikembangkan oleh Devi Amalia Darojatun (CKR0220092)
              Universitas Bakti Husada Indonesia.
            </Text>
            <View style={styles.profileCard}>
              <Text style={styles.profileTitle}>Profil Pemilik</Text>
              <View style={styles.profileDivider} />
              <Text style={styles.profileName}>Devi Amalia Darojatun</Text>
              {/* <Text style={styles.profileId}>(CKR0220092)</Text> */}

              {/* <Text style={[styles.profileTitle, { marginTop: 16 }]}>
                Dosen Pembimbing
              </Text> */}
              {/* <View style={styles.profileDivider} /> */}
              <Text style={[styles.profileName, { marginBottom: 4 }]}>
                Nanang Saprudin
              </Text>
              <Text style={styles.profileName}>Neneng Aria Nengsih</Text>
              <Text style={styles.profileUniv}>
                Universitas Bakti Husada Indonesia
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 8,
  },
  profileDivider: {
    width: 40,
    height: 3,
    backgroundColor: "#3B82F6",
    borderRadius: 2,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 2,
  },
  profileId: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
  },
  profileUniv: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
});
