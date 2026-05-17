import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../components/ScreenHeader";

const MENU_ITEMS = [
  {
    id: 1,
    title: "Apa itu Tanda Bahaya Umum",
    icon: "warning",
    screen: "TandaBahayaUmum",
  },
  {
    id: 2,
    title: "Segitiga SAGA",
    icon: "auto-stories",
    screen: "SegitigaSAGA",
  },
  {
    id: 3,
    title: "Tanda Bahaya Balita",
    icon: "health-and-safety",
    screen: "TandaBahayaBalita",
  },
  {
    id: 4,
    title: "Penanganan Awal di Rumah",
    icon: "home",
    screen: "PenangananAwal",
  },
  // { id: 7, title: "FAQ (Tanya Jawab)", icon: "help-center", screen: "FAQ" },
  // { id: 8, title: "Kuis Edukasi", icon: "quiz", screen: "KuisEdukasi" },
  // {
  //   id: 9,
  //   title: "Poster & Infografis",
  //   icon: "image",
  //   screen: "PosterInfografis",
  // },
  // {
  //   id: 10,
  //   title: "Pencegahan Penyakit",
  //   icon: "verified",
  //   screen: "PencegahanPenyakit",
  // },
];

const COLORS = [
  "#DBEAFE",
  "#D1FAE5",
  "#FEF3C7",
  "#FEE2E2",
  "#EDE9FE",
  "#DBEAFE",
  "#D1FAE5",
  "#FEF3C7",
  "#FEE2E2",
  "#EDE9FE",
];
const ICON_COLORS = [
  "#1E40AF",
  "#10B981",
  "#D97706",
  "#DC2626",
  "#7C3AED",
  "#1E40AF",
  "#10B981",
  "#D97706",
  "#DC2626",
  "#7C3AED",
];

export const EdukasiScreen = ({ navigation }: any) => {
  const renderMenuCard = ({ item, index }: any) => {
    // Kita gunakan data yang sama, hanya layouting yang diubah total
    const cardBgColor = COLORS[index % COLORS.length];
    const accentColor = ICON_COLORS[index % ICON_COLORS.length];

    return (
      <TouchableOpacity
        style={[styles.menuCard, { backgroundColor: cardBgColor }]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate(item.screen)}
      >
        {/* 1. Ikon Container (Paling menonjol di atas) */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: accentColor + "15" },
          ]}
        >
          <MaterialIcons
            name={item.icon as any}
            size={40} // Ikon diperbesar agar jelas
            color={accentColor}
          />
        </View>

        {/* 2. Judul Utama (Hierarki visual tertinggi) */}
        <Text style={styles.menuCardSubtitle} numberOfLines={2}>
          {item.title}
        </Text>

        {/* 3. Container Bawah (ID & Detail menyatu) */}
        <View style={styles.cardFooter}>
          {/* Angka ID (Kini lebih halus, tidak lagi bold 800) */}
          {/* <Text style={styles.menuCardTitle}>{item.id}.</Text> */}

          {/* Aksi Detail (Tombol visual yang lebih baik) */}
          <View style={styles.detailButton}>
            <Text style={[styles.detailText, { color: accentColor }]}>
              Detail
            </Text>
            <Ionicons
              name="chevron-forward" // Gunakan chevron agar lebih modern
              size={14}
              color={accentColor}
              style={{ marginLeft: 2 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Edukasi"
        onBackPress={() => navigation?.goBack()}
      ></ScreenHeader>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="school" size={60} color="#0047AB" />
          </View>
          <Text style={styles.headerText}>Menu Edukasi MTBS Pintar (SAGA)</Text>
          <Text style={styles.headerSubtext}>
            Materi edukasi untuk orang tua dan tenaga kesehatan
          </Text>
        </View>

        <View style={styles.gridContainer}>
          <FlatList
            data={MENU_ITEMS}
            renderItem={renderMenuCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            scrollEnabled={false}
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EdukasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerArea: {
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
  },
  headerSection: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerIcon: {
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0047AB",
    textAlign: "center",
  },
  headerSubtext: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  gridContainer: {
    paddingHorizontal: 16, // Padding diperbesar agar layout bernapas
    paddingVertical: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16, // Jarak vertikal diperlebar
  },
  menuCard: {
    width: "48%",
    aspectRatio: 0.9, // Kartu sedikit lebih tinggi dan seragam
    borderRadius: 24, // Sudut jauh lebih membulat (lebih bersahabat)
    padding: 20, // Padding internal diperbesar
    alignItems: "center",
    justifyContent: "space-between", // Sebar elemen ke atas, tengah, bawah

    // Shadow & Elevation yang jauh lebih halus
    elevation: 4,
    shadowColor: "#1E3A8A", // Shadow sedikit kebiruan agar keren
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06, // Sangat pudar agar tidak terlihat kotor
    shadowRadius: 16,

    // Border tipis transparan (opsional, tapi keren)
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  iconContainer: {
    width: 72, // Ikon container diperbesar
    height: 72,
    borderRadius: 36, // Lingkaran sempurna
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  // Judul Utama (Kini besar dan jelas)
  menuCardSubtitle: {
    fontSize: 16, // Ukuran teks diperbesar
    fontWeight: "900", // Paling tebal untuk hierarki utama
    color: "#1E3A8A",
    textAlign: "center",
    marginTop: 0,
    lineHeight: 20, // Spasi baris lega
    flex: 1, // Judul mengambil ruang tengah
  },
  // Container Footer (ID & Detail)
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // ID di kiri, Detail di kanan
    width: "100%",
    marginTop: 10,
  },
  // ID (Kini lebih halus di pojok)
  menuCardTitle: {
    fontSize: 12,
    fontWeight: "600", // Tidak bold 800 lagi, gunakan Semi-bold
    color: "#1E3A8A",
    opacity: 0.5, // Dibuat sedikit transparan agar tidak mengganggu judul
  },
  // Tombol Detail Terpadu
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    fontWeight: "800", // PENEGASAN pada aksi
  },
  arrowIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
