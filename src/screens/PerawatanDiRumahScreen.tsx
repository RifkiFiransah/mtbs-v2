import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";

import { HeaderSafeArea } from "../components/HeaderSafeArea";

interface PerawatanDiRumahScreenProps {
  navigation: any;
}

export const PerawatanDiRumahScreen = ({
  navigation,
}: PerawatanDiRumahScreenProps) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: "transparent",
      marginBottom: 20,
    },
    notebookContainer: {
      margin: 16,
      borderWidth: 6,
      borderColor: "#66BCD8",
      backgroundColor: "#FFFFFF",
      flex: 1,
      padding: 16,
      paddingVertical: 30, // space for rings
      marginTop: 30,
    },
    ringsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      top: -18,
      left: 15,
      right: 15,
      zIndex: 10,
    },
    ring: {
      alignItems: "center",
      width: 20,
    },
    ringTop: {
      width: 14,
      height: 28,
      borderRadius: 7,
      borderWidth: 3,
      borderColor: "#FF8CB3",
      backgroundColor: "transparent",
      marginBottom: -8,
      zIndex: 2,
    },
    ringHole: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#187BA0",
      zIndex: 1,
    },
    introText: {
      fontSize: 14,
      color: "#000",
      lineHeight: 22,
      marginBottom: 16,
      fontWeight: "bold",
      textAlign: "justify",
    },
    sectionTitleDo: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#0056b3",
      marginBottom: 12,
    },
    sectionTitleDont: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#C62828",
      marginBottom: 12,
      marginTop: 20,
    },
    bulletItem: {
      flexDirection: "row",
      marginBottom: 10,
      alignItems: "flex-start",
    },
    bulletItemDont: {
      flexDirection: "row",
      marginBottom: 10,
      alignItems: "flex-start",
      width: "70%",
    },
    iconContainerDo: {
      width: 20,
      alignItems: "center",
      marginRight: 8,
      marginTop: 2,
    },
    iconContainerDont: {
      width: 20,
      alignItems: "center",
      marginRight: 8,
      marginTop: 2,
    },
    bulletText: {
      flex: 1,
      fontSize: 13,
      color: "#000",
      lineHeight: 18,
      fontWeight: "bold",
    },
    nurseImage: {
      width: 160,
      height: 290,
      position: "absolute",
      bottom: -10,
      right: 0,
      resizeMode: "contain",
      zIndex: 10,
    },
    spacer: {
      height: 0, // To allow scrolling past the nurse illustration if overlapping text
    },
  });

  const renderRings = () => {
    return (
      <View style={styles.ringsContainer}>
        {[...Array(10)].map((_, i) => (
          <View key={i} style={styles.ring}>
            <View style={styles.ringTop} />
            <View style={styles.ringHole} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Perawatan di Rumah"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.notebookContainer}>
            {renderRings()}

            <Text style={styles.introText}>
              Perawatan di rumah adalah tindakan yang dapat dilakukan ibu untuk
              membantu anak tetap nyaman, mencegah kondisi memburuk, dan
              mempercepat pemulihan.
            </Text>

            <Text style={styles.sectionTitleDo}>Yang Harus Dilakukan</Text>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5
                  name="hand-holding-water"
                  size={14}
                  color="#0056b3"
                />
              </View>
              <Text style={styles.bulletText}>
                Berikan minum/ASI cukup (sedikit tapi sering)
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5 name="tint-slash" size={14} color="#0056b3" />
              </View>
              <Text style={styles.bulletText}>
                Cegah Dehidrasi, Perhatikan tanda dehidrasi (mulut kering,
                jarang BAK)
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5 name="apple-alt" size={14} color="#0056b3" />
              </View>
              <Text style={styles.bulletText}>
                Berikan makanan bergizi sesuai kemampuan anak
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5 name="bread-slice" size={14} color="#0056b3" />
              </View>
              <Text style={styles.bulletText}>
                Berikan makanan lunak dan mudah dicerna, Porsi kecil tapi sering
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5 name="bed" size={14} color="#0056b3" />
              </View>
              <Text style={styles.bulletText}>
                Istirahatkan anak dengan cukup
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5 name="stethoscope" size={14} color="#0056b3" />
              </View>
              <Text style={styles.bulletText}>
                Pantau kondisi anak setiap hari (napas, suhu, aktivitas)
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5 name="hands-wash" size={14} color="#0056b3" />
              </View>
              <Text style={styles.bulletText}>
                Jaga kebersihan tangan dan lingkungan
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.iconContainerDo}>
                <FontAwesome5
                  name="temperature-low"
                  size={14}
                  color="#0056b3"
                />
              </View>
              <Text style={styles.bulletText}>
                Jika anak demam kompres dengan air hangat, memakai baju yang
                tipis
              </Text>
            </View>

            <Text style={styles.sectionTitleDont}>
              Yang Tidak Boleh Dilakukan
            </Text>
            <View style={styles.bulletItemDont}>
              <View style={styles.iconContainerDont}>
                <FontAwesome5 name="pills" size={14} color="#C62828" />
              </View>
              <Text style={styles.bulletText}>
                Jangan memberi obat tanpa anjuran tenaga kesehatan
              </Text>
            </View>
            <View style={styles.bulletItemDont}>
              <View style={styles.iconContainerDont}>
                <FontAwesome5 name="utensils" size={14} color="#C62828" />
              </View>
              <Text style={styles.bulletText}>
                Jangan memaksa anak makan/minum
              </Text>
            </View>
            <View style={styles.bulletItemDont}>
              <View style={styles.iconContainerDont}>
                <FontAwesome5 name="hospital-alt" size={14} color="#C62828" />
              </View>
              <Text style={styles.bulletText}>
                Jangan menunda ke fasilitas kesehatan jika kondisi memburuk
              </Text>
            </View>

            <View style={styles.spacer} />
          </View>

          <Image
            source={require("../../assets/images/icons/ilustration-1.png")}
            style={styles.nurseImage}
          />
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
