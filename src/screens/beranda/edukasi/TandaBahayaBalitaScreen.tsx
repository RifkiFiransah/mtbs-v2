import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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

export const TandaBahayaBalitaScreen = ({
  navigation,
}: TandaBahayaScreenProps) => {
  // const dangerSigns = [
  //   "Tidak bisa minum/menyusu",
  //   "Muntah semua yang diminum",
  //   "Kejang",
  //   "Anak sangat lemas (tidak aktif)",
  //   "Sesak napas / napas cepat",
  //   "Bibir kebiruan",
  //   "Demam tinggi (≥39°C)",
  //   "Diare berat (gair terus menerus)",
  //   "Penurunan kesadaran",
  // ];

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
      image: require("../../../../assets/images/icons/saga.jpg"),
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
          <Text style={[styles.detailText, { color: "#1E40AF" }]}>
            Detail{" "}
            <Ionicons
              name="chevron-forward" // Gunakan chevron agar lebih modern
              size={14}
              color="1E40AF"
              style={{ marginLeft: 2 }}
            />
          </Text>
        </View>
        {/* <View style={styles.cardFooter}> */}
        {/* Angka ID (Kini lebih halus, tidak lagi bold 800) */}
        {/* <Text style={styles.menuCardTitle}>{item.id}.</Text> */}

        {/* Aksi Detail (Tombol visual yang lebih baik) */}
        {/* <View style={styles.detailButton}>
          </View> */}
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Tanda Bahaya Balita"
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>3. TANDA BAHAYA BALITA</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Tanda Bahaya Umum Pada Balita</Text>
          <Text style={styles.description}>
            Jika ada salah satu tanda di bawah, segera bawa anak ke fasilitas
            kesehatan!
          </Text>

          {/* <View style={styles.warningBanner}>
            <MaterialIcons name="warning" size={28} color="#DC2626" />
            <Text style={styles.warningBannerText}>TANDA GAWAT DARURAT</Text>
          </View>

          <View style={styles.warningList}>
            {dangerSigns.map((item, index) => (
              <View key={index} style={styles.warningListItem}>
                <MaterialIcons name="warning" size={20} color="#DC2626" />
                <Text style={styles.warningListText}>{item}</Text>
              </View>
            ))}
          </View> */}

          <View style={styles.cautionBox}>
            <MaterialIcons name="warning" size={24} color="#D97706" />
            <Text style={styles.cautionText}>
              Jika ada salah satu tanda di atas, segera bawa anak ke fasilitas
              kesehatan!
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Penjelasan Detail</Text>

          {/* {[
            {
              title: "Tidak Bisa Minum atau Muntah Semua",
              desc: "Anak tidak mampu menelan atau selalu muntah ketika minum/makan, risiko dehidrasi tinggi.",
            },
            {
              title: "Kejang",
              desc: "Gerakan tubuh yang tidak terkontrol, sering terjadi saat demam tinggi atau komplikasi lain.",
            },
            {
              title: "Anak Sangat Lemas",
              desc: "Anak tidak aktif, sulit dibangunkan, respons minimal terhadap lingkungan.",
            },
            {
              title: "Sesak Napas",
              desc: "Pernapasan cepat/berat, tarikan dinding dada, atau stridor (bunyi napas abnormal).",
            },
            {
              title: "Tanda Sirkulasi Buruk",
              desc: "Bibir/kulit kebiruan, denyut nadi lemah atau tidak teraba, tangan/kaki dingin.",
            },
          ].map((item, idx) => (
            <View key={idx} style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <MaterialIcons name="info" size={20} color="#0047AB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>{item.title}</Text>
                <Text style={styles.detailDesc}>{item.desc}</Text>
              </View>
            </View>
          ))} */}
        </View>

        <View style={{ height: 20 }} />

        {warningSignsData.map((item) => (
          <WarningCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TandaBahayaBalitaScreen;

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

  // Container Footer (ID & Detail)
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // ID di kiri, Detail di kanan
    width: "100%",
    marginTop: 10,
  },
  // ID (Kini lebih halus di pojok)
  menuCardTitle: {
    fontSize: 12,
    fontWeight: "600", // Tidak bold 800 lagi, gunakan Semi-bold
    color: "#1E3A8A",
    opacity: 0.5, // Dibuat sedikit transparan agar tidak mengganggu judul
  },
  // Tombol Detail Terpadu
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "800", // PENEGASAN pada aksi
  },
  arrowIcon: {
    position: "absolute",
    top: 12,
    right: 12,
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
    paddingVertical: 16,
  },
  contentBox: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginTop: 0,
    marginBottom: 0,
  },
  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  warningBanner: {
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  warningBannerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
    marginLeft: 12,
  },
  warningList: {
    marginBottom: 16,
  },
  warningListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
  },
  warningListText: {
    fontSize: 13,
    color: "#7F1D1D",
    marginLeft: 12,
    flex: 1,
    fontWeight: "500",
  },
  cautionBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cautionText: {
    fontSize: 13,
    color: "#92400E",
    marginLeft: 12,
    flex: 1,
  },
  detailCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailIcon: {
    marginRight: 12,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0047AB",
  },
  detailDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});
