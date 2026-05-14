import { Feather } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../../components/BackgroundWrapper";
import { HeaderSafeArea } from "../../components/HeaderSafeArea";

interface PenurunanKesadaranScreenProps {
  navigation: any;
}

interface KesadaranSign {
  id: string;
  title: string;
  image: any;
}

export const PenurunanKesadaranScreen = ({
  navigation,
}: PenurunanKesadaranScreenProps) => {
  const kesadaranSigns: KesadaranSign[] = [
    {
      id: "1",
      title:
        "- Tidak sadar atau sulit dibangukan \n -Tidak merespon saat dipanggil",
      image: require("../../../assets/images/illustrations/tidak-sadar.png"),
    },
    {
      id: "2",
      title: "- Tatapan kosong \n - Sangat lemas atau tidak bergerak",
      image: require("../../../assets/images/illustrations/tatapan.png"),
    },
    {
      id: "3",
      title: "Rewel terus menerus atau sangat diam",
      image: require("../../../assets/images/illustrations/rewel.png"),
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
      marginTop: 5,
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
    secondaryBox: {
      backgroundColor: "#FF6B35",
      // borderLeftWidth: 4,
      // borderLeftColor: "#4CAF50",
      borderRadius: 8,
      padding: 12,
      marginTop: 12,
    },
    secondaryTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 4,
    },
    secondaryText: {
      fontSize: 12,
      color: "#FFFFFF",
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
  });

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Penampilan Anak Berubah / Penurunan Kesadaran"
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
                  Anak tampak tidak seperti biasanya, sulit dibangunkan, tidak
                  merespon, atau sangat lemas.
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
                    Bisa menjadi tanda kondisi gawat seperti infeksi berat atau
                    gangguan pada otak.
                  </Text>
                </View>
              </View>

              {/* Tanda yang Perlu Diperhatikan */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  <Feather
                    name="search"
                    size={18}
                    style={{ marginRight: 20 }}
                  />
                  Tanda yang Perlu Diperhatikan
                </Text>
                <View style={styles.cautionBox}>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Tidak sadar atau sulit dibangungkan
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Tidak merespon saat dipanggil
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>Tatapan kosong</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Sangat lemas atau tidak bergerak
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Rewel terus atau justru sangat diam
                    </Text>
                  </View>
                </View>
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
                    Tanda yang harus diwaspadai
                  </Text>
                </View>
                <View style={styles.actionBox}>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Anak sangat sulit dibangunkan
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      harus digoyang keras baru bangun
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Setelah bangun langsung lemas lagi
                    </Text>
                  </View>
                </View>
              </View>

              {/* Menilai */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Cara Menilai Tidak Sadar
                </Text>
                <Text style={styles.descriptionText}>
                  Anak dianggap tidak sadar / penurunan kesadaran jika:
                </Text>

                <View style={styles.warningBox}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Text style={[{ marginBottom: 0, marginLeft: 0 }]}>
                      Saat dicoba dibangunkan:
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>Tidak Membuka Mata</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>Tidak Bergerak</Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Tidak Merespon Suara atau Sentuhan
                    </Text>
                  </View>
                </View>

                <View style={styles.cautionBox}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={[
                        styles.cautionTitle,
                        { marginBottom: 0, marginLeft: 0 },
                      ]}
                    >
                      Walaupun hanya beberapa detik saja tidak merespon, itu
                      sudah tanda bahaya
                    </Text>
                  </View>
                </View>

                <View style={styles.actionBox}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Text style={[{ marginBottom: 0, marginLeft: 0 }]}>
                      Beda dengan kondisi normal (tidur biasa) Masih normal
                      jika:
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Anak tidur tapi bisa dibangunkan
                    </Text>
                  </View>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      Saat dipanggil atau disentuh → langsung merespon
                    </Text>
                  </View>
                </View>
              </View>

              {/* Tanda yang Perlu Diperhatikan */}
              <View style={styles.section}>
                <View style={styles.dehidrasiHeader}>
                  <Text style={styles.dehidrasiTitle}>
                    Tanda anak mulai penampilan berubah /penurunan kesadaran
                  </Text>
                  <View style={styles.contohIlustrasiBadge}>
                    <View style={styles.redDot} />
                    <Text style={styles.contohText}>Contoh Ilustrasi.</Text>
                  </View>
                </View>

                {kesadaranSigns.map((sign) => (
                  <View key={sign.id} style={styles.signCard}>
                    <Image source={sign.image} style={styles.signImage} />
                    <View style={styles.signContent}>
                      <Text style={styles.signTitle}>{sign.title}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.cardBottomLine} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
