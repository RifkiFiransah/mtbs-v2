import { Feather } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../../components/BackgroundWrapper";
import { HeaderSafeArea } from "../../components/HeaderSafeArea";

interface TidakBisaMinumScreenProps {
  navigation: any;
}

interface DehidrasiSign {
  id: string;
  title: string;
  image: any;
}

export const TidakBisaMinumScreen = ({
  navigation,
}: TidakBisaMinumScreenProps) => {
  const dehidrasiSigns: DehidrasiSign[] = [
    {
      id: "bibir-kering",
      title: "Bibir dan mulut kering",
      image: require("../../../assets/images/illustrations/bibi-kering.png"),
    },
    {
      id: "bak",
      title: "Jarang buang air kecil / BAK",
      image: require("../../../assets/images/illustrations/nahan-buang.png"),
    },
    {
      id: "mata-cekung",
      title: "Mata cekung",
      image: require("../../../assets/images/illustrations/mata-cekung.png"),
    },
    {
      id: "anak-lemas",
      title: "Anak tampak sangat lemas",
      image: require("../../../assets/images/illustrations/anak-lemas.png"),
    },
  ];

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      paddingBottom: 30,
    },
    section: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1E3A8A",
      marginBottom: 12,
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: "#2B9FFF",
    },
    descriptionText: {
      fontSize: 13,
      color: "#333333",
      lineHeight: 20,
      marginBottom: 8,
    },
    bulletPoint: {
      flexDirection: "row",
      marginBottom: 8,
    },
    bullet: {
      width: 20,
      fontSize: 13,
      fontWeight: "600",
      color: "#2B9FFF",
      marginRight: 8,
    },
    bulletText: {
      flex: 1,
      fontSize: 13,
      color: "#333333",
      lineHeight: 20,
    },
    warningBox: {
      backgroundColor: "#E3F2FD",
      // borderLeftWidth: 4,
      // borderLeftColor: "#FF6B35",
      borderRadius: 8,
      padding: 12,
      marginTop: 12,
    },
    warningTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: "#FF6B35",
      marginBottom: 4,
    },
    warningText: {
      fontSize: 12,
      color: "#333333",
      lineHeight: 18,
    },
    cautionBox: {
      backgroundColor: "#FFF3E0",
      // borderLeftWidth: 4,
      // borderLeftColor: "#FF9800",
      borderRadius: 8,
      padding: 12,
      marginTop: 12,
    },
    cautionTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: "#FF9800",
      marginBottom: 4,
    },
    cautionText: {
      fontSize: 12,
      color: "#333333",
      lineHeight: 18,
    },
    actionBox: {
      backgroundColor: "#E8F5E9",
      // borderLeftWidth: 4,
      // borderLeftColor: "#4CAF50",
      borderRadius: 8,
      padding: 12,
      marginTop: 12,
    },
    actionTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: "#4CAF50",
      marginBottom: 4,
    },
    actionText: {
      fontSize: 12,
      color: "#333333",
      lineHeight: 18,
    },
    // New styles for dehidrasi section
    dehidrasiHeader: {
      marginBottom: 16,
    },
    dehidrasiTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: "#1E3A8A",
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    contohIlustrasiBadge: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    redDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "#E53935",
      marginRight: 8,
    },
    contohText: {
      fontSize: 13,
      color: "#333333",
      fontWeight: "600",
    },
    signCard: {
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
      alignItems: "center",
    },
    signImage: {
      width: 120,
      height: 90,
      borderRadius: 5,
      marginRight: 12,
      resizeMode: "cover",
      backgroundColor: "#F0F9FF",
    },
    signContent: {
      flex: 1,
      justifyContent: "center",
    },
    signTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: "#1E3A8A",
      lineHeight: 18,
    },
    mainCard: {
      backgroundColor: "#E8F4F8",
      borderRadius: 16,
      marginHorizontal: 8,
      marginTop: 20,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: "#4A3728",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    cardTopLine: {
      height: 4,
      backgroundColor: "#2B9FFF",
      width: "100%",
    },
    cardContent: {
      padding: 20,
    },
    cardBottomLine: {
      height: 4,
      backgroundColor: "#2B9FFF",
      width: "100%",
    },
  });

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Tidak bisa minum atau menyusu"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainCard}>
            <View style={styles.cardTopLine} />
            <View style={styles.cardContent}>
              {/* Definisi */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Definisi</Text>
                <Text style={styles.descriptionText}>
                  Balita tidak mau minum, menyusu, atau sangat sulit diberi
                  cairan meskipun sudah dicoba.
                </Text>
                <View style={styles.warningBox}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Feather name="alert-triangle" size={14} color="#FF6B35" />
                    <Text
                      style={[
                        styles.warningTitle,
                        { marginBottom: 0, marginLeft: 6 },
                      ]}
                    >
                      Apa Berbahaya?
                    </Text>
                  </View>
                  <Text style={styles.warningText}>
                    Kondisi ini dapat menyebabkan dehidrasi dan menandakan anak
                    sedang sakit serius.
                  </Text>
                </View>
              </View>

              {/* Tanda yang Perlu Diperhatikan */}
              <View style={styles.section}>
                <View style={styles.dehidrasiHeader}>
                  <Text style={styles.dehidrasiTitle}>
                    TANDA ANAK MULAI DEHIDRASI
                  </Text>
                  <View style={styles.contohIlustrasiBadge}>
                    <View style={styles.redDot} />
                    <Text style={styles.contohText}>Contoh Ilustrasi.</Text>
                  </View>
                </View>

                {dehidrasiSigns.map((sign) => (
                  <View key={sign.id} style={styles.signCard}>
                    <Image source={sign.image} style={styles.signImage} />
                    <View style={styles.signContent}>
                      <Text style={styles.signTitle}>{sign.title}</Text>
                    </View>
                  </View>
                ))}

                {/* <View style={styles.cautionBox}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Feather name="search" size={14} color="#FF9800" />
                  <Text
                    style={[
                      styles.cautionTitle,
                      { marginBottom: 0, marginLeft: 6 },
                    ]}
                  >
                    Tanda Anak Mulai Dehidrasi Lanjutan
                  </Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Bibir dan mulut kering</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Jarang buang air kecil</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Mata cekung</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Anak tampak sangat lemas
                  </Text>
                </View>
              </View> */}
              </View>

              {/* Perhatian */}
              <View style={styles.section}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                    paddingBottom: 8,
                    borderBottomWidth: 2,
                    borderBottomColor: "#2B9FFF",
                  }}
                >
                  <Feather name="alert-triangle" size={18} color="#1E3A8A" />
                  <Text
                    style={[
                      styles.sectionTitle,
                      {
                        marginBottom: 0,
                        paddingBottom: 0,
                        borderBottomWidth: 0,
                        marginLeft: 8,
                      },
                    ]}
                  >
                    Tanda yang perlu diperhatikan
                  </Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Melolok minum atau ASI</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Minum sangat sedikit</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Mulut kering</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Anak tampak lemas atau mengantuk terus
                  </Text>
                </View>

                {/* <View style={styles.actionBox}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Feather name="check-circle" size={14} color="#4CAF50" />
                  <Text
                    style={[
                      styles.actionTitle,
                      { marginBottom: 0, marginLeft: 6 },
                    ]}
                  >
                    Tindakan
                  </Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Cobalah memberikan cairan dengan sendok/cangkir kecil
                  </Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Jika terus menolak, segera bawa ke fasilitas kesehatan
                  </Text>
                </View>
              </View> */}
              </View>
            </View>
            <View style={styles.cardBottomLine} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
