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

export const TandaBahayaUmumScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apa itu Tanda Bahaya Umum</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>
            1. APA ITU TANDA BAHAYA UMUM
          </Text>
        </View>

        <View style={styles.contentBox}>
          <View style={styles.illustrationBox}>
            <MaterialIcons name="person" size={100} color="#1E40AF" />
          </View>

          <Text style={styles.sectionTitle}>Pengertian Tanda Bahaya Umum</Text>
          <Text style={styles.content}>
            Tanda bahaya umum adalah kondisi pada anak yang dapat berkembang
            menjadi penyakit berat atau gawat darurat jika tidak ditangani
            segera.
          </Text>

          <Text style={styles.sectionTitle}>
            Mengapa harus segera ditangani?
          </Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Dapat menyebabkan komplikasi serius
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Kondisi anak bisa memburuk cepat
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Dapat mengancam jiwa</Text>
            </View>
          </View>

          <View style={styles.warningBox}>
            <MaterialIcons name="info" size={24} color="#DC2626" />
            <Text style={styles.warningText}>
              Segera bawa anak kefasilitas kesehatan terdekat jika ditemukan
              tanda bahaya.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Jenis-Jenis Tanda Bahaya Umum</Text>
          <View style={styles.dangerList}>
            {[
              "Tidak sadar atau penurunan kesadaran",
              "Kesulitan bernapas atau napas cepat",
              "Kejang-kejangan",
              "Demam sangat tinggi",
              "Tidak mau minum atau muntah semua yang diminum",
              "Anak tampak sangat lemah atau lemas",
            ].map((item, idx) => (
              <View key={idx} style={styles.dangerItem}>
                <MaterialIcons name="warning-amber" size={20} color="#D97706" />
                <Text style={styles.dangerItemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TandaBahayaUmumScreen;

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
  illustrationBox: {
    width: "100%",
    height: 150,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginTop: 12,
    marginBottom: 8,
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    marginRight: 8,
    color: "#111827",
  },
  bulletText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  warningBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  warningText: {
    fontSize: 13,
    color: "#7F1D1D",
    marginLeft: 12,
    flex: 1,
  },
  dangerList: {
    marginTop: 12,
  },
  dangerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FEF3C7",
    padding: 10,
    borderRadius: 8,
  },
  dangerItemText: {
    fontSize: 13,
    color: "#92400E",
    marginLeft: 10,
    flex: 1,
  },
});
