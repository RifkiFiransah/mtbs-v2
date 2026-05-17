import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BackgroundWrapper } from "../components/BackgroundWrapper";

interface AboutMTBSScreenProps {
  navigation: any;
}

export const AboutMTBSScreen = ({ navigation }: AboutMTBSScreenProps) => {
  const styles = StyleSheet.create({
    subtitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 8,
      marginTop: 8,
    },
    description: {
      fontSize: 14,
      color: "#444",
      lineHeight: 22,
      marginBottom: 12,
    },

    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "space-between",
      paddingBottom: 20,
    },
    topWave: {
      width: "100%",
      height: 150,
      backgroundColor: "#2B9FFF",
      borderBottomLeftRadius: 80,
      borderBottomRightRadius: 80,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
    },
    logoContainer: {
      alignItems: "center",
      paddingTop: 40,
    },
    logo: {
      width: 60,
      height: 60,
      resizeMode: "contain",
    },
    ubhiText: {
      fontSize: 24,
      fontWeight: "700",
      color: "#D7DF21",
    },
    contentWrapper: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 45,
      paddingBottom: 40,
      justifyContent: "center",
      zIndex: 1,
      marginBottom: 30,
    },
    noteCard: {
      // backgroundColor: "#FFFFFF",
      // borderRadius: 24,
      // borderWidth: 3,
      // borderColor: "#6B4423",
      // padding: 24,
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 4,
      // },
      // shadowOpacity: 0.1,
      // shadowRadius: 8,
      // elevation: 5,
      // overflow: "hidden",
    },
    noteCardBackground: {
      position: "absolute",
      left: -10,
      right: -10,
      top: -40,
      bottom: -20,
      width: "110%",
      height: "115%",
      resizeMode: "stretch",
    },
    noteCardContent: {
      zIndex: 1,
      width: "100%",
      paddingLeft: 55,
      paddingRight: 40,
      paddingTop: 20,
      paddingBottom: 30,
    },
    spiralHole: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#9B7760",
      position: "absolute",
      left: -15,
    },
    spiralHolesLeft: {
      position: "absolute",
      left: -15,
      top: 20,
      height: "100%",
      justifyContent: "space-around",
      paddingVertical: 40,
    },
    // ribbon: {
    //   position: "absolute",
    //   width: 30,
    //   height: 40,
    //   backgroundColor: "#9DB4D4",
    //   top: -20,
    //   right: 30,
    //   borderRadius: 4,
    //   borderBottomLeftRadius: 0,
    //   borderBottomRightRadius: 0,
    // },
    contentTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#1E3A8A",
      marginBottom: 10,
      textAlign: "center",
    },
    contentText: {
      fontSize: 14,
      lineHeight: 22,
      color: "#1F2937",
      marginBottom: 10,
      textAlign: "justify",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1E3A8A",
      marginBottom: 0,
      marginTop: 0,
    },
    bulletPoint: {
      fontSize: 14,
      lineHeight: 22,
      color: "#1F2937",
      marginBottom: 10,
      marginLeft: 10,
    },
    bulletDot: {
      fontSize: 14,
      fontWeight: "700",
      color: "#1E3A8A",
      marginRight: 8,
    },
    footer: {
      paddingHorizontal: 20,
      marginBottom: 70,
      gap: 12,
      justifyContent: "center",
    },
    profileCard: {
      backgroundColor: "#EFF6FF",
      borderRadius: 16,
      padding: 16,
      marginTop: 20,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#BFDBFE",
    },
    profileTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1E3A8A",
      marginBottom: 8,
    },
    profileDivider: {
      width: 40,
      height: 3,
      backgroundColor: "#3B82F6",
      borderRadius: 2,
      marginBottom: 12,
    },
    profileName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#1E40AF",
      marginBottom: 2,
    },
    profileId: {
      fontSize: 14,
      color: "#475569",
      marginBottom: 6,
    },
    profileUniv: {
      fontSize: 14,
      fontWeight: "600",
      color: "#0F172A",
      textAlign: "center",
    },
    backButton: {
      backgroundColor: "#FFFFFF",
      paddingVertical: 12,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#1E40AF",
    },
    backButtonText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1E40AF",
    },
  });

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      {/* <SafeAreaView style={styles.container}> */}
      <Image
        source={require("../../assets/images/bg/bg-1.png")}
        style={styles.backgroundImage}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        style={{ flex: 1 }}
      >
        {/* Top Wave Section */}
        <View style={styles.topWave}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logos/ubhi.png")}
              style={styles.logo}
            />
            <Text style={styles.ubhiText}>UBHI</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentWrapper}>
          <View style={styles.noteCard}>
            {/* Background Image */}
            <Image
              source={require("../../assets/images/bg/bg-detail-text.png")}
              style={styles.noteCardBackground}
            />

            {/* Ribbon */}
            {/* <View style={styles.ribbon} /> */}

            {/* Spiral Holes Left */}
            {/* <View style={styles.spiralHolesLeft}>
              {[...Array(12)].map((_, i) => (
                <View key={i} style={styles.spiralHole} />
              ))}
            </View> */}

            {/* Spiral Holes Right */}
            {/* <View
              style={[
                styles.spiralHolesLeft,
                { left: "auto", right: -15, alignItems: "center" },
              ]}
            >
              {[...Array(12)].map((_, i) => (
                <View key={i} style={styles.spiralHole} />
              ))}
            </View> */}

            {/* Content */}
            <View style={styles.noteCardContent}>
              <Text style={styles.contentTitle}>Tentang MTBS-Pintar</Text>

              <Text style={styles.contentText}>
                MTBS-Pintar adalah aplikasi edukasi kesehatan untuk membantu ibu
                mengenali tanda bahaya pada balita sejak dini. Aplikasi ini
                menggunakan pendekatan Manajemen Terpadu Balita Sakit (MTBS).
              </Text>

              <Text style={styles.contentText}>
                Dengan MTBS-Pintar, ibu dapat belajar cara mendeteksi kondisi
                berbahaya dan mengetahui langkah penanganan awal secara cepat
                dan tepat.
              </Text>

              <Text style={styles.sectionTitle}>Tujuan</Text>

              <Text style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                Membantu deteksi dini tanda bahaya balita
              </Text>

              <Text style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                Meningkatkan kepercayaan diri ibu
              </Text>

              <Text style={styles.bulletPoint}>
                <Text style={styles.bulletDot}>•</Text>
                Mendukung penanganan yang cepat dan tepat
              </Text>

              <View style={styles.profileCard}>
                <Text style={styles.profileTitle}>Profil Pemilik</Text>
                <View style={styles.profileDivider} />
                <Text style={styles.profileName}>Devi Amalia Darojatun</Text>
                <Text style={styles.profileId}>(CKR0220092)</Text>
                <Text style={styles.profileUniv}>
                  Universitas Bakti Husada Indonesia
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Kembali</Text>
          </Pressable>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </BackgroundWrapper>
  );
};
