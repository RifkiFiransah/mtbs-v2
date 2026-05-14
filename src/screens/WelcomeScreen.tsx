import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { CustomButton } from "../components/CustomButton";

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const styles = StyleSheet.create({
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
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "space-between",
      zIndex: 1,
    },
    topWave: {
      width: "100%",
      height: 150,
      backgroundColor: "#2B9FFF",
      borderBottomLeftRadius: 80,
      borderBottomRightRadius: 80,
      justifyContent: "center",
      alignItems: "center",
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
    content: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    headerSection: {
      alignItems: "center",
      marginTop: 20,
    },
    titleLogo: {
      color: "#D7DF21",
      fontSize: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#1E3A8A",
      marginBottom: 4,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1F2937",
      textAlign: "center",
      marginBottom: 2,
    },
    tagline: {
      fontSize: 14,
      color: "#374151",
      textAlign: "center",
      fontStyle: "italic",
      marginTop: 8,
      lineHeight: 20,
    },
    illustrationContainer: {
      alignItems: "center",
      marginVertical: 24,
      justifyContent: "center",
    },
    illustration: {
      width: 250,
      height: 250,
      resizeMode: "contain",
    },
    footer: {
      paddingHorizontal: 20,
      paddingBottom: 80,
      gap: 12,
      backgroundColor: "#FFFFFF",
    },
    secondaryButton: {
      backgroundColor: "#FFFFFF",
      paddingVertical: 16,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#1E40AF",
    },
    secondaryButtonText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1E40AF",
    },
  });

  const handleGetStarted = () => {
    navigation.replace("MainTabs");
  };

  const handleAbout = () => {
    // Navigasi ke halaman tentang MTBS
    navigation.navigate("AboutMTBS");
  };

  return (
    <BackgroundWrapper>
      {/* <SafeAreaView style={styles.container}> */}
      <Image
        source={require("../../assets/images/bg/bg-1.png")}
        style={styles.backgroundImage}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Top Wave Section */}
        <View style={styles.topWave}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logos/ubhi.png")}
              style={styles.logo}
            />
            <Text style={[styles.title, styles.titleLogo]}>UBHI</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>MTBS-Pintar</Text>
            <Text style={styles.subtitle}>Manajemen Terpadu</Text>
            <Text style={styles.subtitle}>Balita Sakit</Text>
            <Text style={styles.tagline}>
              Kenali cepat, tangani tepat,{"\n"}untuk balita sehat
            </Text>
          </View>

          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../assets/images/logos/utama.png")}
              style={styles.illustration}
            />
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <CustomButton
            title="Mulai"
            onPress={handleGetStarted}
            variant="primary"
            size="large"
          />

          <Pressable style={styles.secondaryButton} onPress={handleAbout}>
            <Text style={styles.secondaryButtonText}>Tentang MTBS-Pintar</Text>
          </Pressable>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </BackgroundWrapper>
  );
};
