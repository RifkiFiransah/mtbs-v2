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
  { id: 7, title: "FAQ (Tanya Jawab)", icon: "help-center", screen: "FAQ" },
  { id: 8, title: "Kuis Edukasi", icon: "quiz", screen: "KuisEdukasi" },
  {
    id: 9,
    title: "Poster & Infografis",
    icon: "image",
    screen: "PosterInfografis",
  },
  {
    id: 10,
    title: "Pencegahan Penyakit",
    icon: "verified",
    screen: "PencegahanPenyakit",
  },
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
  const renderMenuCard = ({ item, index }: any) => (
    <TouchableOpacity
      style={[
        styles.menuCard,
        { backgroundColor: COLORS[index % COLORS.length] },
      ]}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: ICON_COLORS[index % ICON_COLORS.length] + "20" },
        ]}
      >
        <MaterialIcons
          name={item.icon as any}
          size={32}
          color={ICON_COLORS[index % ICON_COLORS.length]}
        />
      </View>
      <Text style={styles.menuCardTitle}>{item.id}.</Text>
      <Text style={styles.menuCardSubtitle}>{item.title}</Text>
      <Ionicons
        name="arrow-forward"
        size={20}
        color={ICON_COLORS[index % ICON_COLORS.length]}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

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
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  menuCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  menuCardTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1E3A8A",
  },
  menuCardSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 16,
  },
  arrowIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
