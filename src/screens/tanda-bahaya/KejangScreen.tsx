import { Feather } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../../components/BackgroundWrapper";
import { HeaderSafeArea } from "../../components/HeaderSafeArea";

interface KejangScreenProps {
  navigation: any;
}

interface KejangSign {
  id: string;
  title: string;
  image: any; // Ganti dengan tipe yang sesuai jika menggunakan TypeScript
}

export const KejangScreen = ({ navigation }: KejangScreenProps) => {
  const kejangSigns: KejangSign[] = [
    {
      id: "tangan-dan-kaki-bergerak-tidak-terkendali",
      title: "Tangan dan kaki bergerak tidak terkendali",
      image: require("../../../assets/images/illustrations/tidak-terkendali.png"),
    },
    {
      id: "tubuh-kaku-atau-kejut-kejut",
      title: "Tubuh kaku atau kejut-kejut",
      image: require("../../../assets/images/illustrations/kejut.png"),
    },
    {
      id: "mata-melotot-atau-mendelik",
      title: "Mata melotot atau mendelik",
      image: require("../../../assets/images/illustrations/melotot.png"),
    },
    {
      id: "tidak-sadar-tidak-respon-saat-kejang",
      title: "Tidak sadar / tidak respon saat kejang",
      image: require("../../../assets/images/illustrations/pingsan.png"),
    },
    {
      id: "disertai-demam",
      title: "Disertai demam",
      image: require("../../../assets/images/illustrations/demam.png"),
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
      paddingHorizontal: 12,
      paddingVertical: 16,
      paddingBottom: 30,
    },
    mainCard: {
      backgroundColor: "#E8F4F8",
      borderRadius: 16,
      marginHorizontal: 8,
      marginBottom: 20,
      marginTop: 20,
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
    section: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
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

    // New styles for kejang section
    kejangHeader: {
      marginBottom: 16,
    },
    kejangTitle: {
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
  });

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Kejang"
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
                  Kejang adalah kondisi saat tubuh anak bergerak tiba-tiba tak
                  terkendali (kaki atau kejut-kejut), bisa disertai mata melolot
                  atau tidak sadar.
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
                    Kejang bisa menjadi tanda penyakit serius seperti infeksi
                    berat atau gangguan pada otak.
                  </Text>
                </View>
              </View>

              {/* Tanda yang Perlu Diperhatikan */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Tanda yang Perlu Diperhatikan
                </Text>
                <View style={styles.cautionBox}>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Tangan dan kaki bergerak kejut-kejut tanpa kendali
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Tubuh kaku atau kejut-kejut hebat
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Mata Melotot atau Mendelik
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>Bisa disertai demam</Text>
                  </View>
                </View>
              </View>

              {/* Tanda yang Perlu Diperhatikan */}
              <View style={styles.section}>
                <View style={styles.kejangHeader}>
                  <Text style={styles.kejangTitle}>
                    TANDA ANAK MULAI Kejang
                  </Text>
                  <View style={styles.contohIlustrasiBadge}>
                    <View style={styles.redDot} />
                    <Text style={styles.contohText}>Contoh Ilustrasi.</Text>
                  </View>
                </View>

                {kejangSigns.map((sign) => (
                  <View key={sign.id} style={styles.signCard}>
                    <Image source={sign.image} style={styles.signImage} />
                    <View style={styles.signContent}>
                      <Text style={styles.signTitle}>{sign.title}</Text>
                    </View>
                  </View>
                ))}
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
                  <Feather name="check-circle" size={18} color="#1E3A8A" />
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
                    Penanganan
                  </Text>
                </View>
                <View style={styles.actionBox}>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Kejang biasanya berlangsung beberapa detik-menit
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Anak bisa tampak lemas atau mengantuk setelah kejang
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.cardBottomLine} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
