import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { HeaderSafeArea } from "../components/HeaderSafeArea";

interface TandaBahayaScreenProps {
  navigation: any;
}

interface WarningSignItem {
  id: string;
  title: string;
  description: string;
  image: any;
  screen: string;
}

export const TandaBahayaScreen = ({ navigation }: TandaBahayaScreenProps) => {
  const warningSignsData: WarningSignItem[] = [
    {
      id: "tidak-bisa-minum",
      title: "Tidak bisa minum \n atau menyusu",
      description:
        "Anak tidak dapat minum atau menyusu dengan normal atau kesulitan menelan.",
      image: require("../../assets/images/icons/tidak-bisa-minum.png"),
      screen: "TidakBisaMinum",
    },
    {
      id: "muntah",
      title: "Muntah terus - menerus",
      description:
        "Anak muntah berkali-kali dan tidak dapat menahan makanan atau minuman.",
      image: require("../../assets/images/icons/muntah.png"),
      screen: "Muntah",
    },
    {
      id: "kejang",
      title: "Kejang",
      description:
        "Anak mengalami kejang atau gerakan tubuh yang tidak terkontrol.",
      image: require("../../assets/images/icons/kejang.png"),
      screen: "Kejang",
    },
    {
      id: "penurunan",
      title: "Penampilan Anak Berubah / Penurunan Kesadaran",
      description:
        "Anak terlihat sakit berat, kesadaran menurun, atau tidak responsif.",
      image: require("../../assets/images/icons/penurunan.png"),
      screen: "PenurunanKesadaran",
    },
    {
      id: "sesak",
      title: "Sesak nafas atau nafas cepat",
      description:
        "Anak mengalami kesulitan bernapas, napas cepat, atau terengah-engah.",
      image: require("../../assets/images/icons/sesak.png"),
      screen: "SesakNafas",
    },
    {
      id: "saga",
      title: "Penilaian SAGA",
      description:
        "Evaluasi komprehensif untuk menentukan kondisi kesehatan anak secara menyeluruh.",
      image: require("../../assets/images/icons/saga.jpg"),
      screen: "PenilaianSAGA",
    },
  ];

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "transparent",
      marginBottom: 16,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    headerBanner: {
      backgroundColor: "#2B9FFF",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    headerText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#FFFFFF",
      lineHeight: 20,
    },
    warningCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 0,
      marginBottom: 12,
      overflow: "hidden",
      flexDirection: "row",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      minHeight: 100,
    },
    cardImageContainer: {
      width: 110,
      backgroundColor: "#F0F9FF",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
    },
    cardImage: {
      width: 90,
      height: 90,
      resizeMode: "contain",
    },
    cardContent: {
      flex: 1,
      justifyContent: "center",
      paddingRight: 14,
      paddingVertical: 12,
      paddingLeft: 12,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: "#1E3A8A",
      marginBottom: 4,
      lineHeight: 18,
    },
    cardDescription: {
      fontSize: 12,
      color: "#666666",
      lineHeight: 16,
    },
  });

  const WarningCard = ({ item }: { item: WarningSignItem }) => {
    const handlePress = () => {
      navigation.navigate(item.screen);
    };

    return (
      <TouchableOpacity
        style={styles.warningCard}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.cardImageContainer}>
          <Image source={item.image} style={styles.cardImage} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.safeArea}>
        <HeaderSafeArea
          title="Tanda Bahaya Umum"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            <View style={styles.headerBanner}>
              <Text style={styles.headerText}>
                Segera bawa balita kefasilitasi kesehatan terdekat jika
                mengalami salah satu tanda bahaya berikut:
              </Text>
            </View>

            {warningSignsData.map((item) => (
              <WarningCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
