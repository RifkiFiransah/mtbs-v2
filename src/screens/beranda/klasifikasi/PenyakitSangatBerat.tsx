import { MaterialIcons } from "@expo/vector-icons";
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

interface PenyakitSangatBeratProps {
  onBack: () => void;
}

export const PenyakitSangatBerat = ({ onBack }: PenyakitSangatBeratProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <MaterialIcons name="warning" size={40} color="#fff" />
        <Text style={styles.headerTitle}>PENYAKIT SANGAT BERAT</Text>
        <Text style={styles.headerSubtitle}>
          Terdapat satu atau lebih tanda bahaya atau gejala pada komponen
          penampilan / usaha napas / sirkulasi
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TINDAKAN SEGERA</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="medical-services" size={24} color="#D97706" />
            <Text style={styles.cardTitle}>Jika sedang kejang</Text>
          </View>
          <Text style={styles.cardDesc}>Beri diazepam segera</Text>
          <Image
            source={require("../../../../assets/images/klasifikasi/Diazepam.png")}
            style={styles.image}
            resizeMode="contain"
            // defaultSource={null}
          />
        </View>

        <TindakanItem
          iconName="volume-mute"
          text="Jika ada stridor (suara napas kasar/nngg), pastikan tidak ada sumbatan jalan napas"
        />

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="air" size={24} color="#0284C7" />
            <Text style={styles.cardTitle}>Berikan Oksigen</Text>
          </View>
          <Text style={styles.cardDesc}>
            3-5 L/menit melalui nasal prongs dengan perangkat oksigen standar
            (tabung O2 dan humidifier)
          </Text>
          <Image
            source={require("../../../../assets/images/klasifikasi/Oksigen.png")}
            style={styles.image}
            resizeMode="contain"
            // defaultSource={null}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="bloodtype" size={24} color="#BE123C" />
            <Text style={styles.cardTitle}>Gula Darah</Text>
          </View>
          <Text style={styles.cardDesc}>
            Periksa gula darah, lalu lakukan tatalaksana atau cegah agar tidak
            turun (hipoglikemia)
          </Text>
          <Image
            source={require("../../../../assets/images/klasifikasi/CegahGula.png")}
            style={styles.image}
            resizeMode="contain"
            // defaultSource={null}
          />
        </View>

        <TindakanItem
          iconName="thermometer"
          text="Jaga tubuh anak tetap hangat"
        />

        <View style={styles.alertCard}>
          <MaterialIcons name="local-hospital" size={32} color="#DC2626" />
          <Text style={styles.alertText}>RUJUK SEGERA!</Text>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.sosButton} onPress={onBack}>
        <Ionicons
          name="call"
          size={24}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.sosButtonText}>HUBUNGI IGD / RUJUK SEGERA</Text>
      </TouchableOpacity> */}

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
    backgroundColor: "#F59E0B",
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
    color: "#FEF3C7",
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
    color: "#D97706",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  alertCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FECACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DC2626",
    marginLeft: 12,
  },
  sosButton: {
    backgroundColor: "#D97706",
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
