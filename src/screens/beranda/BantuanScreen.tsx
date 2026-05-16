import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../components/ScreenHeader";

const EMERGENCY_CONTACTS = [
  {
    id: "1",
    name: "Ambulans Darurat",
    number: "119",
    description: "Layanan ambulans dan gawat darurat",
    icon: "local-shipping",
  },
  {
    id: "2",
    name: "Rumah Sakit Terdekat",
    number: "(021) 1234-5678",
    description: "RSUD Pusat Kesehatan Kota",
    icon: "local-hospital",
  },
  {
    id: "3",
    name: "Hotline Kesehatan",
    number: "1500567",
    description: "Hotline Kementerian Kesehatan",
    icon: "phone",
  },
];

export const BantuanScreen = ({ navigation }: any) => {
  const [showChart, setShowChart] = useState(false);

  const handleCall = (number: string) => {
    Alert.alert("Hubungi", `Panggil ${number}?`, [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hubungi",
        onPress: () => Linking.openURL(`tel:${number}`),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Bantuan Darurat"
        onBackPress={() => navigation?.goBack()}
      ></ScreenHeader>

      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bantuan Darurat</Text>
        <View style={{ width: 28 }} />
      </View> */}

      <ScrollView style={styles.content}>
        {/* Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <MaterialIcons name="error" size={40} color="#fff" />
          <Text style={styles.bannerTitle}>BANTUAN DARURAT</Text>
          <Text style={styles.bannerDesc}>
            Jika anak Anda mengalami gejala berbahaya, segera hubungi layanan
            darurat atau bawa ke rumah sakit terdekat.
          </Text>
        </View>

        {/* Danger Signs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tanda-Tanda Gawat Darurat</Text>
          <View style={styles.dangerBox}>
            {[
              "Tidak sadar atau responsif berkurang",
              "Sesak napas atau kesulitan bernapas",
              "Kejang atau gerakan tidak terkontrol",
              "Demam sangat tinggi (≥40°C) disertai penurunan kesadaran",
              "Perdarahan atau cedera berat",
              "Keracunan atau menelan benda berbahaya",
            ].map((item, index) => (
              <View key={index} style={styles.dangerItem}>
                <MaterialIcons name="warning" size={20} color="#DC2626" />
                <Text style={styles.dangerText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hubungi Layanan Darurat</Text>
          {EMERGENCY_CONTACTS.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => handleCall(contact.number)}
            >
              <View
                style={[
                  styles.contactIconBox,
                  {
                    backgroundColor:
                      contact.id === "1"
                        ? "#FEE2E2"
                        : contact.id === "2"
                          ? "#DBEAFE"
                          : "#FEF3C7",
                  },
                ]}
              >
                <MaterialIcons
                  name={contact.icon as any}
                  size={28}
                  color={
                    contact.id === "1"
                      ? "#DC2626"
                      : contact.id === "2"
                        ? "#0047AB"
                        : "#D97706"
                  }
                />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactDesc}>{contact.description}</Text>
              </View>
              <View style={styles.contactNumber}>
                <Text style={styles.contactNumberText}>{contact.number}</Text>
                <MaterialIcons name="call" size={20} color="#0047AB" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* First Aid Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pertolongan Pertama</Text>

          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>1</Text>
              </View>
              <View>
                <Text style={styles.tipTitle}>Tetap Tenang</Text>
                <Text style={styles.tipDesc}>
                  Jangan panik agar Anda dapat memberikan tindakan yang tepat.
                </Text>
              </View>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>2</Text>
              </View>
              <View>
                <Text style={styles.tipTitle}>Hubungi Ambulans</Text>
                <Text style={styles.tipDesc}>
                  Segera hubungi layanan ambulans atau bawa ke rumah sakit.
                </Text>
              </View>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>3</Text>
              </View>
              <View>
                <Text style={styles.tipTitle}>Posisikan Aman</Text>
                <Text style={styles.tipDesc}>
                  Posisikan anak di tempat yang aman dan nyaman.
                </Text>
              </View>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>4</Text>
              </View>
              <View>
                <Text style={styles.tipTitle}>Pantau Kondisi</Text>
                <Text style={styles.tipDesc}>
                  Pantau kesadaran, napas, dan denyut nadi hingga bantuan tiba.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grafik Perkembangan Kesehatan</Text>
          <TouchableOpacity
            style={styles.chartPlaceholder}
            onPress={() => setShowChart(!showChart)}
          >
            <MaterialIcons name="show-chart" size={60} color="#0047AB" />
            <Text style={styles.chartText}>
              {showChart ? "Sembunyikan" : "Lihat"} Grafik Perkembangan
            </Text>
          </TouchableOpacity>

          {showChart && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>
                Tren Kesehatan 30 Hari Terakhir
              </Text>
              <View style={styles.chart}>
                {/* Simple bar chart visualization */}
                {[65, 75, 70, 85, 80, 90, 85].map((value, idx) => (
                  <View key={idx} style={styles.chartBar}>
                    <View
                      style={[
                        styles.bar,
                        { height: `${value}%`, backgroundColor: "#0047AB" },
                      ]}
                    />
                    <Text style={styles.chartLabel}>{value}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.chartDesc}>
                Grafik menunjukkan tren kondisi kesehatan anak berdasarkan hasil
                pemeriksaan.
              </Text>
            </View>
          )}
        </View>

        {/* SOS Button */}
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => {
            Alert.alert(
              "SOS",
              "Aktifkan mode darurat dan hubungi kontak darurat?",
              [
                { text: "Batal", style: "cancel" },
                {
                  text: "Ya, Aktifkan",
                  onPress: () =>
                    Alert.alert(
                      "Mode Darurat Aktif",
                      "Kontak darurat telah dihubungi.",
                    ),
                },
              ],
            );
          }}
        >
          <Ionicons name="call" size={28} color="#fff" />
          <Text style={styles.sosButtonText}>SOS - DARURAT</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BantuanScreen;

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
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emergencyBanner: {
    backgroundColor: "#DC2626",
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginTop: 12,
  },
  bannerDesc: {
    fontSize: 13,
    color: "#fff",
    marginTop: 8,
    paddingHorizontal: 16,
    textAlign: "center",
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  dangerBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  dangerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dangerText: {
    fontSize: 13,
    color: "#7F1D1D",
    marginLeft: 12,
    flex: 1,
  },
  contactCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  contactIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
  },
  contactDesc: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  contactNumber: {
    alignItems: "flex-end",
  },
  contactNumberText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0047AB",
    marginBottom: 4,
  },
  tipsContainer: {
    gap: 12,
  },
  tipCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    // borderLeftWidth: 4,
    // borderLeftColor: "#0047AB",
  },
  tipNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0047AB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tipNumberText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0047AB",
  },
  tipDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    width: 300,
  },
  chartPlaceholder: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  chartText: {
    fontSize: 14,
    color: "#0047AB",
    marginTop: 12,
    fontWeight: "600",
  },
  chartContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 150,
    marginBottom: 12,
  },
  chartBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: "70%",
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },
  chartDesc: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  sosButton: {
    backgroundColor: "#DC2626",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  sosButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    marginLeft: 12,
    letterSpacing: 1,
  },
});
