import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TindakanItem } from "../../../components/TindakanItem";

interface GagalJantungParuProps {
  onBack: () => void;
}

export const GagalJantungParu = ({ onBack }: GagalJantungParuProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <MaterialIcons name="warning" size={40} color="#fff" />
        <Text style={styles.headerTitle}>GAGAL JANTUNG PARU</Text>
        <Text style={styles.headerSubtitle}>
          Terdapat satu atau lebih gejala/tanda pada setiap komponen penampilan
          dan komponen usaha napas dan sirkulasi
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TINDAKAN SEGERA</Text>
        <TindakanItem
          iconName="medkit-outline"
          text="Lakukan Bantuan Hidup Dasar (BHD)"
        />
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-downward" size={30} color="#DC2626" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kapan dilakukan?</Text>
          <Text style={styles.cardDesc}>
            Segera lakukan bantuan awal jika anak:
          </Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Tidak sadar</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Tidak bernapas</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Napas megap-megap</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>
                Nadi tidak terasa atau sangat lemah
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Langkah Pertolongan Awal</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepItem}>1. Pastikan Keamanan</Text>
            <Text style={styles.stepItem}>2. Minta bantuan segera</Text>
            <Text style={styles.stepItem}>3. Pastikan lingkungan aman</Text>
            <Text style={styles.stepItem}>
              4. Periksa napas dan kesadaran anak
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Buka Jalan Napas</Text>
          </View>
          <View style={styles.stepContent}>
            {/* Using a placeholder view if image is missing, but trying to load the image */}
            <Image
              source={require("../../../../assets/images/klasifikasi/bukanapas.png")}
              style={styles.image}
              resizeMode="contain"
              // defaultSource={null}
            />
            <Text style={styles.stepItem}>
              • Posisikan kepala sedikit menengadah
            </Text>
            <Text style={styles.stepItem}>
              • Pastikan tidak ada sumbatan pada mulut
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Periksa Napas</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.cardDesc}>Perhatikan:</Text>
            <Image
              source={require("../../../../assets/images/klasifikasi/periksanapas.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.stepItem}>• Dada naik turun</Text>
            <Text style={styles.stepItem}>• Ada suara napas atau tidak</Text>
            <Text style={styles.stepItem}>• Napas normal atau megap-megap</Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Berikan Bantuan Napas</Text>
          </View>
          <View style={styles.stepContent}>
            <Image
              source={require("../../../../assets/images/klasifikasi/bantuannapas.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.cardDesc}>Jika anak tidak bernapas:</Text>
            <Text style={styles.stepItem}>
              • Berikan 5 kali bantuan napas perlahan
            </Text>
          </View>
        </View>

        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>5</Text>
            </View>
            <Text style={styles.stepTitle}>Periksa Nadi</Text>
          </View>
          <View style={styles.stepContent}>
            <Image
              source={require("../../../../assets/images/klasifikasi/periksanadi.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.stepItem}>
              • Periksa nadi selama 10 detik lalu jumlahnya dikali 6 dianggap
              nadi dalam 1 menit
            </Text>
            <Text style={styles.stepItemMuted}>
              {" "}
              = Usia &lt; 1 tahun di Brachial (Lengan atas)
            </Text>
            <Text style={styles.stepItemMuted}>
              {" "}
              = Usia &gt; 1 tahun di Carotid (Leher)
            </Text>
            <Text style={styles.stepItem}>
              • Jika nadi kurang dari 60 kali/menit atau tidak terasa → segera
              lakukan pijat jantung
            </Text>
          </View>
        </View>

        <View style={styles.stepContainerHighlight}>
          <Text style={styles.stepTitleHighlight}>
            Pijat Jantung pada Balita
          </Text>
          <View style={styles.stepContent}>
            <Image
              source={require("../../../../assets/images/klasifikasi/pijatbalita.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.cardDescHighlight}>Lakukan:</Text>
            <Text style={styles.stepItemHighlight}>
              • Bayi usia 0 - 12 bulan (1 tahun) menggunakan 2 jari yaitu jari
              telunjuk dan jari tengah
            </Text>
            <Text style={styles.stepItemHighlight}>
              • Anak usia 1-8 tahun menggunakan 1 atau 2 tangan tergantung
              ukuran anak
            </Text>
            <Text style={styles.stepItemHighlight}>• 15 kali pijatan dada</Text>
            <Text style={styles.stepItemHighlight}>
              • Dilanjutkan 2 kali bantuan napas
            </Text>
            <Text style={styles.stepItemHighlight}>
              • Ulangi sampai bantuan datang atau anak membaik
            </Text>
            <Text style={styles.cardDescHighlight}>
              Pijat Jantung Dilakukan:
            </Text>
            <Text style={styles.stepItemHighlight}>
              • 100 KALI DALAM 1 MENIT
            </Text>
            <Text style={styles.stepItemHighlight}>
              • KEDALAMAN SETIAP PIJATAN 4-5 CM
            </Text>
            <Text style={styles.stepItemHighlight}>
              • DADA HARUS NAIK KEMBALI SELESAI SATU PIJATAN{" "}
            </Text>
            <Text style={styles.stepItemHighlight}>
              • TIDAK BOLEH BERHENTI `{`>`}` 10 DETIK
            </Text>
            <Text style={styles.stepItemHighlight}>
              • Ulangi sampai bantuan datang atau anak membaik
            </Text>
            <Text style={styles.stepFooterHighlight}>
              Bantuan Hidup Dasar pada Balita
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.sosButton} onPress={onBack}>
        <Ionicons
          name="call"
          size={24}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.sosButtonText}>RUJUKAN SEGERA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onBack}>
        <Text style={styles.secondaryButtonText}>
          SIMPAN & KEMBALI KE BERANDA
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  headerCard: {
    backgroundColor: "#DC2626",
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#FCA5A5",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 16,
  },
  arrowContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 12,
  },
  bulletList: {
    marginLeft: 8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DC2626",
    marginRight: 10,
  },
  bulletText: {
    fontSize: 14,
    color: "#374151",
  },
  stepContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  stepContent: {
    padding: 16,
  },
  stepItem: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 22,
  },
  stepItemMuted: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    lineHeight: 22,
    fontStyle: "italic",
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
  },
  stepContainerHighlight: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    marginTop: 10,
  },
  stepTitleHighlight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B91C1C",
    padding: 16,
    paddingBottom: 0,
  },
  cardDescHighlight: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#991B1B",
    marginBottom: 12,
  },
  stepItemHighlight: {
    fontSize: 14,
    color: "#7F1D1D",
    marginBottom: 8,
    lineHeight: 22,
  },
  stepFooterHighlight: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DC2626",
    marginTop: 12,
    textAlign: "center",
    fontStyle: "italic",
  },
  sosButton: {
    backgroundColor: "#DC2626",
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sosButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#0047AB",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: "#0047AB",
    fontSize: 16,
    fontWeight: "bold",
  },
});
