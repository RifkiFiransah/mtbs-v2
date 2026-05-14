import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { CustomHeader } from "../components/CustomHeader";

interface KebijakanPrivasiScreenProps {
  navigation: any;
}

export const KebijakanPrivasiScreen = ({
  navigation,
}: KebijakanPrivasiScreenProps) => {
  return (
    <BackgroundWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader
          title="Kebijakan Privasi"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Kebijakan Privasi MTBS Pintar</Text>
            <Text style={styles.date}>
              Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
            </Text>

            <Text style={styles.heading}>1. Pengumpulan Data</Text>
            <Text style={styles.paragraph}>
              Aplikasi MTBS Pintar menyimpan data profil ibu dan anak yang Anda
              masukkan ke dalam aplikasi. Semua data ini disimpan secara lokal
              di perangkat Anda (menggunakan SQLite) dan tidak dikirim ke server
              eksternal, kecuali jika Anda secara sadar membagikannya.
            </Text>

            <Text style={styles.heading}>2. Penggunaan Informasi</Text>
            <Text style={styles.paragraph}>
              Informasi yang dikumpulkan digunakan semata-mata untuk keperluan
              pelacakan dan pencatatan kondisi balita, pengaturan pengingat
              jadwal, serta menghasilkan laporan riwayat medis sederhana untuk
              membantu Anda.
            </Text>

            <Text style={styles.heading}>3. Akses Kamera dan Galeri</Text>
            <Text style={styles.paragraph}>
              Aplikasi ini memerlukan izin ke kamera atau galeri untuk
              memungkinkan Anda mengatur foto profil pada menu profil dan
              menambahkan foto pada entri catatan.
            </Text>

            <Text style={styles.heading}>4. Keamanan</Text>
            <Text style={styles.paragraph}>
              Kami menghargai privasi Anda dan berkomitmen untuk tidak pernah
              membagikan, menjual, atau menyebarkan data pribadi Anda. Mengingat
              sebagian besar operasi aplikasi bersifat offline, keamanan data
              Anda berada pada lingkup perangkat Anda.
            </Text>

            <Text style={styles.heading}>5. Perubahan Kebijakan Privasi</Text>
            <Text style={styles.paragraph}>
              Kebijakan privasi ini dapat berubah sewaktu-waktu seiring dengan
              pembaruan fitur aplikasi. Kami akan selalu memberikan informasi
              terkait pembaruan yang berhubungan dengan ranah privasi pengguna.
            </Text>
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
    padding: 20,
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
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 16,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 8,
  },
});
