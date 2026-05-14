import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../../components/BackgroundWrapper";
import { HeaderSafeArea } from "../../components/HeaderSafeArea";

interface PenilaianSAGAScreenProps {
  navigation: any;
}

interface SAGACard {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
  lightColor: string;
  items: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { width } = Dimensions.get("window");

export const PenilaianSAGAScreen = ({
  navigation,
}: PenilaianSAGAScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const sagaCards: SAGACard[] = [
    {
      id: "penampilan",
      title: "PENAMPILAN",
      subtitle: "Tanda yang Dilihat",
      icon: "activity",
      // sesuaikan warna lightColor dengan warna utama untuk kesan yang lebih harmonis
      // warna biru untuk penampilan, hijau untuk usaha napas, merah muda untuk sirkulasi
      color: "#2B9FFF",
      lightColor: "#E8F4F8",
      items: [
        "Lihat postur dan gerakan anak",
        "Periksa kesadaran dan responsif",
        "Amati tanda-tanda distres",
        "Ukur tanda vital dasar",
      ],
    },
    {
      id: "usaha-napas",
      title: "USAHA NAPAS",
      subtitle: "Tanda yang Dilihat",
      icon: "wind",
      color: "#28A745",
      lightColor: "#E8F8E8",
      items: [
        "Hitung frekuensi napas per menit",
        "Periksa penggunaan otot bantu napas",
        "Dengarkan suara napas abnormal",
        "Amati adanya retraksi dada",
      ],
    },
    {
      id: "sirkulasi",
      title: "SIRKULASI",
      subtitle: "Tanda yang Dilihat",
      icon: "heart",
      color: "#FF9FF3",
      lightColor: "#FFE5F7",
      items: [
        "Periksa frekuensi nadi anak",
        "Nilai kualitas dan kekuatan nadi",
        "Observasi warna kulit dan capillary refill",
        "Identifikasi tanda shock jika ada",
      ],
    },
  ];

  const handleNext = () => {
    if (currentIndex < sagaCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
  };

  const currentCard = sagaCards[currentIndex];

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Penilaian SAGA"
          showBack
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Card Container */}
          <View style={styles.cardContainer}>
            <View
              style={[
                styles.mainCard,
                { backgroundColor: currentCard.lightColor },
              ]}
            >
              {/* Header Section */}
              <View style={styles.headerSection}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: currentCard.color },
                  ]}
                >
                  <Feather name={currentCard.icon} size={48} color="white" />
                </View>
              </View>

              {/* Title Section */}
              <View style={styles.titleSection}>
                <Text style={[styles.title, { color: currentCard.color }]}>
                  {currentCard.title}
                </Text>
                <Text style={styles.subtitle}>{currentCard.subtitle}</Text>
              </View>

              {/* Content Section */}
              <View style={styles.contentSection}>
                <View style={styles.itemsContainer}>
                  {currentCard.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                      <Feather
                        name="check-circle"
                        size={18}
                        color={currentCard.color}
                      />
                      <Text
                        style={[styles.itemText, { color: currentCard.color }]}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Footer Section */}
              <View style={styles.footerSection}>
                <Text style={styles.progressText}>
                  {currentIndex + 1} / {sagaCards.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Dot Indicators */}
          <View style={styles.dotsContainer}>
            {sagaCards.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot,
                  {
                    backgroundColor:
                      index === currentIndex ? currentCard.color : "#D0D0D0",
                  },
                ]}
                onPress={() => handleDotPress(index)}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentIndex === 0 && styles.disabledButton,
              ]}
              onPress={handlePrev}
              disabled={currentIndex === 0}
            >
              <Feather
                name="chevron-left"
                size={24}
                color={currentIndex === 0 ? "#CCC" : "#333"}
              />
              <Text
                style={[
                  styles.navButtonText,
                  currentIndex === 0 && styles.disabledButtonText,
                ]}
              >
                Sebelumnya
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                currentIndex === sagaCards.length - 1 && styles.disabledButton,
              ]}
              onPress={handleNext}
              disabled={currentIndex === sagaCards.length - 1}
            >
              <Text
                style={[
                  styles.navButtonText,
                  currentIndex === sagaCards.length - 1 &&
                    styles.disabledButtonText,
                ]}
              >
                Berikutnya
              </Text>
              <Feather
                name="chevron-right"
                size={24}
                color={currentIndex === sagaCards.length - 1 ? "#CCC" : "#333"}
              />
            </TouchableOpacity>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Feather name="info" size={20} color="#FF6B6B" />
            <Text style={styles.infoText}>
              Lakukan penilaian SAGA secara sistematis dan cepat untuk
              penanganan awal yang tepat.
            </Text>
          </View>

          {/* Quick Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("CekKondisi")}
          >
            <Feather name="arrow-right" size={20} color="white" />
            <Text style={styles.actionButtonText}>Mulai Penilaian</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    paddingBottom: 40,
    marginTop: 20,
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  mainCard: {
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  contentSection: {
    marginBottom: 24,
  },
  itemsContainer: {
    gap: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
  },
  footerSection: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  progressText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    gap: 8,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: "#CCC",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D0D0D0",
  },
  activeDot: {
    width: 28,
    borderRadius: 5,
    backgroundColor: "#FF6B6B",
  },
  infoBox: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 28,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
    // borderLeftWidth: 4,
    // borderLeftColor: "#FF6B6B",
    gap: 12,
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 35,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});
