import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../../components/ScreenHeader";

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

export const TandaBahayaUmumScreen = ({
  navigation,
}: TandaBahayaScreenProps) => {
  const warningSignsData: WarningSignItem[] = [
    {
      id: "tidak-bisa-minum",
      title: "Tidak bisa minum \n atau menyusu",
      description:
        "Anak tidak dapat minum atau menyusu dengan normal atau kesulitan menelan.",
      // image: require("../../assets/images/icons/tidak-bisa-minum.png"),
      image: require("../../../../assets/images/icons/tidak-bisa-minum.png"),
      screen: "TidakBisaMinum",
    },
    {
      id: "muntah",
      title: "Muntah terus - menerus",
      description:
        "Anak muntah berkali-kali dan tidak dapat menahan makanan atau minuman.",
      image: require("../../../../assets/images/icons/muntah.png"),
      screen: "Muntah",
    },
    {
      id: "kejang",
      title: "Kejang",
      description:
        "Anak mengalami kejang atau gerakan tubuh yang tidak terkontrol.",
      image: require("../../../../assets/images/icons/kejang.png"),
      screen: "Kejang",
    },
    {
      id: "penurunan",
      title: "Penampilan Anak Berubah / Penurunan Kesadaran",
      description:
        "Anak terlihat sakit berat, kesadaran menurun, atau tidak responsif.",
      image: require("../../../../assets/images/icons/penurunan.png"),
      screen: "PenurunanKesadaran",
    },
    {
      id: "sesak",
      title: "Sesak nafas atau nafas cepat",
      description:
        "Anak mengalami kesulitan bernapas, napas cepat, atau terengah-engah.",
      image: require("../../../../assets/images/icons/sesak.png"),
      screen: "SesakNafas",
    },
    {
      id: "saga",
      title: "Penilaian SAGA",
      description:
        "Evaluasi komprehensif untuk menentukan kondisi kesehatan anak secara menyeluruh.",
      image: require("../../../../assets/images/icons/saga.png"),
      screen: "PenilaianSAGA",
    },
  ];

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
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Apa itu Tanda Bahaya Umum"
        onBackPress={() => navigation?.goBack()}
      />
      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>
            1. APA ITU TANDA BAHAYA UMUM
          </Text>
        </View>

        <View style={styles.contentBox}>
          <View style={styles.illustrationBox}>
            {/* <MaterialIcons name="person" size={100} color="#1E40AF" /> */}
            <Image
              source={require("../../../../assets/images/logos/Dokter1.png")}
              style={{ width: 130, height: 130 }}
            />
            <Text style={styles.sectionTitle}>
              Pengertian Tanda Bahaya Umum
            </Text>
            <Text style={styles.content}>
              Tanda bahaya umum adalah kondisi pada anak yang dapat berkembang
              menjadi penyakit berat atau gawat darurat jika tidak ditangani
              segera.
            </Text>
          </View>

          {/* <Text style={styles.sectionTitle}>
            Mengapa harus segera ditangani?
          </Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Dapat menyebabkan komplikasi serius
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Kondisi anak bisa memburuk cepat
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Dapat mengancam jiwa</Text>
            </View>
          </View> */}

          {warningSignsData.map((item) => (
            <WarningCard key={item.id} item={item} />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TandaBahayaUmumScreen;

const styles = StyleSheet.create({
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

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  headerBanner: {
    backgroundColor: "#0047AB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerBannerText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
  },
  contentBox: {
    flex: 1,
  },
  illustrationBox: {
    width: "100%",
    // height: 150,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginTop: 12,
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    marginRight: 8,
    color: "#111827",
  },
  bulletText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  warningBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  warningText: {
    fontSize: 13,
    color: "#7F1D1D",
    marginLeft: 12,
    flex: 1,
  },
  dangerList: {
    marginTop: 12,
  },
  dangerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FEF3C7",
    padding: 10,
    borderRadius: 8,
  },
  dangerItemText: {
    fontSize: 13,
    color: "#92400E",
    marginLeft: 10,
    flex: 1,
  },
});
