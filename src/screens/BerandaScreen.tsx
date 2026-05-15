import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundWrapper } from "../components/BackgroundWrapper";

interface BerandaScreenProps {
  navigation: any;
}

export const BerandaScreen = ({ navigation }: BerandaScreenProps) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "transparent",
      // paddingBottom: 40,
    },
    headerSection: {
      backgroundColor: "#2B9FFF",
      paddingBottom: 15,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      overflow: "hidden",
      position: "relative",
    },
    logoContainer: {
      alignItems: "center",
      paddingTop: 45,
    },
    logo: {
      width: 90,
      height: 90,
      resizeMode: "contain",
    },
    headerContent: {
      paddingHorizontal: 20,
      paddingVertical: 3,
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: {
      alignItems: "center",
    },
    greeting: {
      fontSize: 20,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 8,
    },
    subtext: {
      fontSize: 14,
      color: "#FFFFFF",
      fontWeight: "600",
      lineHeight: 18,
      textAlign: "center",
    },
    illustration: {
      display: "none",
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      zIndex: 999,
      // paddingBottom: 30,
    },
    menuGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "100%",
      zIndex: 999,
      gap: 12,
    },
    menuCardLarge: {
      width: "45%",
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 4,
      minHeight: 140,
      borderWidth: 1,
      borderColor: "#F3F4F6",
      zIndex: 999,
    },
    iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 100, // Membuat ikon bulat
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    menuTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: "#1E3A8A",
      textAlign: "center",
      lineHeight: 20,
    },
  });

  const menuItems = [
    {
      id: "saga",
      title: "Pemeriksaan\nSAGA",
      icon: "monitor-heart",
      iconColor: "#1E40AF", // Biru gelap
      bgColor: "#DBEAFE", // Biru pastel
      onPress: () => navigation.navigate("Saga"),
    },
    {
      id: "edukasi",
      title: "Edukasi",
      icon: "menu-book",
      iconColor: "#059669", // Hijau gelap
      bgColor: "#D1FAE5", // Hijau pastel
      onPress: () => navigation.navigate("Edukasi"),
    },
    {
      id: "riwayat",
      title: "Riwayat\nPemeriksaan",
      icon: "assignment",
      iconColor: "#D97706", // Oranye gelap
      bgColor: "#FEF3C7", // Oranye pastel
      onPress: () => navigation.navigate("RiwayatPemeriksaan"),
    },
    {
      id: "sos",
      title: "Bantuan\nDarurat",
      icon: "sos",
      iconColor: "#DC2626", // Merah gelap
      bgColor: "#FEE2E2", // Merah pastel
      onPress: () => navigation.navigate("Bantuan"),
    },
  ];

  return (
    <BackgroundWrapper>
      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logos/utama.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>👋 Halo, Ibu</Text>
              <Text style={styles.subtext}>
                Ayo belajar bersama tentang kesehatan balita
              </Text>
              <Text style={[styles.subtext, { marginTop: 12 }]}>
                Kenali Tanda Bahaya Sejak Dini!!
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.scrollContent}>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuCardLarge}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.bgColor },
                  ]}
                >
                  <MaterialIcons
                    name={item.icon as any}
                    size={60}
                    color={item.iconColor}
                  />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </BackgroundWrapper>
  );
};
