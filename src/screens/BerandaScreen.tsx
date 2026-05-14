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
      width: 56,
      height: 56,
      borderRadius: 28, // Membuat ikon bulat
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
      id: "warning",
      title: "Tanda Bahaya\nUmum",
      icon: "warning",
      iconColor: "#EF4444", // Merah solid
      bgColor: "#FEE2E2", // Merah pastel
      onPress: () => navigation.navigate("TandaBahaya"),
    },
    {
      id: "checkmark",
      title: "Cek Kondisi\nBalita",
      icon: "check-circle",
      iconColor: "#3B82F6", // Biru solid
      bgColor: "#DBEAFE", // Biru pastel
      onPress: () => navigation.navigate("CekKondisi"),
    },
    {
      id: "medical",
      title: "Apa yang harus\nDilakukan",
      icon: "medical-services",
      iconColor: "#10B981", // Hijau solid
      bgColor: "#D1FAE5", // Hijau pastel
      onPress: () => navigation.navigate("Tindakan"),
    },
    {
      id: "hospital",
      title: "Perawatan\nDi Rumah",
      icon: "local-hospital",
      iconColor: "#8B5CF6", // Ungu solid
      bgColor: "#EDE9FE", // Ungu pastel
      onPress: () => navigation.navigate("PerawatanDiRumah"),
    },
    {
      id: "question",
      title: "Tanya Jawab",
      icon: "help-center",
      iconColor: "#F59E0B", // Oranye solid
      bgColor: "#FEF3C7", // Oranye pastel
      onPress: () => navigation.navigate("TanyaJawab"),
    },
    {
      id: "welcome",
      title: "Kembali ke\nWelcome",
      icon: "exit-to-app",
      iconColor: "#6B7280", // Abu-abu solid
      bgColor: "#F3F4F6", // Abu-abu pastel
      onPress: () => navigation.navigate("Welcome"),
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
                    size={28}
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
