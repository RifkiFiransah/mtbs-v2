import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";

import { HeaderSafeArea } from "../components/HeaderSafeArea";

interface TindakanScreenProps {
  navigation: any;
}

export const TindakanScreen = ({ navigation }: TindakanScreenProps) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      // backgroundColor: "transparent",
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    section: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 4,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#333333",
      marginLeft: 10,
      flex: 1,
    },
    bulletPoint: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
      backgroundColor: "#FAFAFA",
      padding: 12,
      borderRadius: 8,
    },
    iconContainer: {
      width: 24,
      alignItems: "center",
      marginRight: 10,
      marginTop: 2,
    },
    bulletText: {
      flex: 1,
      fontSize: 14,
      color: "#444444",
      lineHeight: 22,
    },
    hospitalSection: {
      marginTop: 8,
      marginBottom: 24,
    },
    hospitalHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    hospitalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#D32F2F",
      marginLeft: 10,
    },
    actionCard: {
      backgroundColor: "#FFEBEE",
      borderRadius: 16,
      padding: 20,
      borderLeftWidth: 6,
      borderLeftColor: "#D32F2F",
    },
    actionItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    actionText: {
      fontSize: 14,
      color: "#B71C1C",
      lineHeight: 22,
      fontWeight: "500",
      marginLeft: 8,
      flex: 1,
    },
  });

  const DoIcon = () => (
    <View style={styles.iconContainer}>
      <Feather name="check-circle" size={18} color="#4CAF50" />
    </View>
  );

  const DontIcon = () => (
    <View style={styles.iconContainer}>
      <Feather name="x-circle" size={18} color="#F44336" />
    </View>
  );

  const ActionIcon = () => (
    <View style={styles.iconContainer}>
      <Feather name="arrow-right-circle" size={18} color="#2196F3" />
    </View>
  );

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Apa Yang Harus Dilakukan"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            {/* Section 1 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="droplet" size={22} color="#db719b" />
                <Text style={styles.sectionTitle}>
                  Tidak Bisa Minum atau Menyusu
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>
                  Berikan minum sedikit demi sedikit
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>
                  Tetap tawarkan ASI sesering mungkin
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Pantau tanda dehidrasi</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DontIcon />
                <Text style={styles.bulletText}>Jangan memaksa anak minum</Text>
              </View>
              <View style={styles.bulletPoint}>
                <ActionIcon />
                <Text style={styles.bulletText}>
                  Segera ke fasilitas kesehatan jika anak tetap tidak mau minum
                </Text>
              </View>
            </View>

            {/* Section 2 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="rotate-ccw" size={22} color="#db719b" />
                <Text style={styles.sectionTitle}>Muntah Terus Menerus</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>
                  Berikan cairan sedikit demi sedikit
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>
                  Tunggu beberapa saat setelah muntah
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Tetap berikan ASI</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DontIcon />
                <Text style={styles.bulletText}>
                  Jangan memberi makan/minum banyak sekaligus
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <ActionIcon />
                <Text style={styles.bulletText}>
                  Segera ke fasilitas kesehatan jika muntah terus menerus
                </Text>
              </View>
            </View>

            {/* Section 3 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="activity" size={22} color="#db719b" />
                <Text style={styles.sectionTitle}>Kejang</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>
                  Baringkan anak di tempat aman
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Miringkan kepala/tubuh</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Longgarkan pakaian</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Catat lama kejang</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DontIcon />
                <Text style={styles.bulletText}>
                  Jangan memasukkan benda ke mulut
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DontIcon />
                <Text style={styles.bulletText}>
                  Jangan menahan gerakan kejang
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <ActionIcon />
                <Text style={styles.bulletText}>
                  Segera ke fasilitas kesehatan
                </Text>
              </View>
            </View>

            {/* Section 4 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="moon" size={22} color="#db719b" />
                <Text style={styles.sectionTitle}>
                  Tidak Sadar / Sangat Lemas
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Coba bangunkan perlahan</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Periksa napas anak</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>
                  Miringkan tubuh jika tidak sadar
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DontIcon />
                <Text style={styles.bulletText}>Jangan beri makan/minum</Text>
              </View>
              <View style={styles.bulletPoint}>
                <ActionIcon />
                <Text style={styles.bulletText}>
                  Segera ke fasilitas kesehatan
                </Text>
              </View>
            </View>

            {/* Section 5 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="wind" size={22} color="#db719b" />
                <Text style={styles.sectionTitle}>
                  Sesak Napas / Napas Cepat
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>
                  Posisikan anak nyaman (setengah duduk)
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Longgarkan pakaian</Text>
              </View>
              <View style={styles.bulletPoint}>
                <DoIcon />
                <Text style={styles.bulletText}>Pantau napas anak</Text>
              </View>
              <View style={styles.bulletPoint}>
                <ActionIcon />
                <Text style={styles.bulletText}>
                  Jangan menunda mencari bantuan
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <ActionIcon />
                <Text style={styles.bulletText}>
                  Segera ke fasilitas kesehatan jika sesak atau tarikan dada
                </Text>
              </View>
            </View>

            {/* Hospital Action Card */}
            <View style={styles.hospitalSection}>
              <View style={styles.hospitalHeader}>
                <Feather name="alert-circle" size={24} color="#D32F2F" />
                <Text style={styles.hospitalTitle}>Kapan Harus ke RS?</Text>
              </View>
              <View style={styles.actionCard}>
                <View style={styles.actionItem}>
                  <Feather
                    name="plus-circle"
                    size={16}
                    color="#D32F2F"
                    style={{ marginTop: 2 }}
                  />
                  <Text style={styles.actionText}>
                    Jika muncul tanda bahaya serius
                  </Text>
                </View>
                <View style={styles.actionItem}>
                  <Feather
                    name="plus-circle"
                    size={16}
                    color="#D32F2F"
                    style={{ marginTop: 2 }}
                  />
                  <Text style={styles.actionText}>
                    Kondisi tidak membaik setelah 3 hari perawatan di rumah
                  </Text>
                </View>
                <View style={styles.actionItem}>
                  <Feather
                    name="plus-circle"
                    size={16}
                    color="#D32F2F"
                    style={{ marginTop: 2 }}
                  />
                  <Text style={styles.actionText}>
                    Balita menjadi semakin lemah atau tidak responsif
                  </Text>
                </View>
                <View style={styles.actionItem}>
                  <Feather
                    name="plus-circle"
                    size={16}
                    color="#D32F2F"
                    style={{ marginTop: 2 }}
                  />
                  <Text style={styles.actionText}>
                    Muncul gejala baru yang mengkhawatirkan
                  </Text>
                </View>
                <View style={styles.actionItem}>
                  <Feather
                    name="plus-circle"
                    size={16}
                    color="#D32F2F"
                    style={{ marginTop: 2 }}
                  />
                  <Text style={styles.actionText}>
                    Persisten muntah-muntah sehingga tidak bisa makan/minum
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
