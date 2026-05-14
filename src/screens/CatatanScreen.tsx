import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { CustomHeader } from "../components/CustomHeader";
import { CatatanRow, getCatatan } from "../database/db";

interface CatatanScreenProps {
  navigation: any;
}

export const CatatanScreen = ({ navigation }: CatatanScreenProps) => {
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState("Riwayat Cek");

  // State untuk data catatan
  const [catatanList, setCatatanList] = useState<CatatanRow[]>([]);

  // State untuk filter kalender
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isFocused) {
      fetchCatatan();
    }
  }, [isFocused]);

  const fetchCatatan = async () => {
    try {
      const data = await getCatatan();
      setCatatanList(data);
    } catch (error) {
      console.error("Error fetching catatan:", error);
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };

  const clearFilter = () => {
    setSelectedDate(null);
  };

  const tabs = ["Riwayat Cek", "Keluhan", "Pemeriksaan"];

  const getFilteredData = () => {
    let filtered = catatanList;
    if (selectedDate) {
      const formattedFilterDate = selectedDate.toISOString().split("T")[0];
      filtered = filtered.filter(
        (item) => item.tanggal_pemeriksaan === formattedFilterDate,
      );
    }
    return filtered;
  };

  const dataToDisplay = getFilteredData();

  const getStatusColor = (status: string | undefined) => {
    if (status === "Normal") return "#E8F5E9";
    if (status === "Perlu Perhatian") return "#FFF3E0";
    if (status === "Bahaya") return "#FFEBEE";
    return "#E8F5E9"; // default
  };

  const getStatusTextColor = (status: string | undefined) => {
    if (status === "Normal") return "#4CAF50";
    if (status === "Perlu Perhatian") return "#FF9800";
    if (status === "Bahaya") return "#F44336";
    return "#4CAF50"; // default
  };

  return (
    <BackgroundWrapper>
      {/* <SafeAreaView style={styles.container}> */}
      <CustomHeader
        title="Catatan"
        rightAction={{
          icon: "event-note",
          onPress: () => setShowDatePicker(true),
        }}
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {selectedDate && (
        <View style={styles.filterBanner}>
          <Text style={styles.filterText}>
            Filter Tanggal: {selectedDate.toLocaleDateString("id-ID")}
          </Text>
          <TouchableOpacity onPress={clearFilter}>
            <Ionicons name="close-circle" size={20} color="#1E88E5" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabTextContainer,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {dataToDisplay.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ color: "#666" }}>
              Tidak ada catatan pada tanggal ini.
            </Text>
          </View>
        ) : (
          dataToDisplay.map((item, index) => {
            const dateObj = new Date(item.tanggal_pemeriksaan);
            const dateFormatted = dateObj.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            // Build details
            const details = [];
            if (item.suhu_tubuh) {
              details.push({
                label: "Suhu tubuh",
                value: `${item.suhu_tubuh} °C`,
                icon: "thermometer-outline",
              });
            }
            if (item.nafsu_makan) {
              details.push({
                label: "Nafsu makan",
                value: item.nafsu_makan,
                icon: "restaurant-outline",
              });
            }

            let keluhan: any = {};
            try {
              if (item.keluhan_utama) keluhan = JSON.parse(item.keluhan_utama);
            } catch (e) {
              console.log(e);
            }

            if (keluhan["Muntah"]) {
              details.push({
                label: "Muntah",
                value: "Ada",
                icon: "warning-outline",
              });
            }
            if (keluhan["Rewel"]) {
              details.push({
                label: "Rewel",
                value: "Ada",
                icon: "water-outline",
              });
            }
            if (keluhan["Batuk"]) {
              details.push({
                label: "Batuk",
                value: "Ada",
                icon: "medkit-outline",
              });
            }
            if (item.kondisi_anak === "Lemas" || keluhan["Lemes"]) {
              details.push({
                label: "Lemes",
                value: "Ada",
                icon: "water-outline",
              });
            }

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.recordCard}
                onPress={() =>
                  navigation.navigate("FormCatatan", {
                    isDetail: true,
                    catatanData: item,
                  })
                }
              >
                <View style={styles.recordHeader}>
                  <Text style={styles.recordDateTime}>
                    <Text style={{ fontWeight: "700", color: "#1E3A8A" }}>
                      {dateFormatted}
                    </Text>{" "}
                    • {item.jam_pemeriksaan}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(item.status_kondisi) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusTextColor(item.status_kondisi) },
                      ]}
                    >
                      {item.status_kondisi || "Normal"}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailsContainer}>
                  {details.map((detail, idx) => (
                    <View key={idx} style={styles.detailRow}>
                      <View style={styles.detailLabelContainer}>
                        <Ionicons
                          name={detail.icon as any}
                          size={14}
                          color="#999"
                          style={styles.detailIcon}
                        />
                        <Text style={styles.detailLabel}>{detail.label}</Text>
                      </View>
                      <View style={styles.detailValueContainer}>
                        <Text style={styles.detailValue}>{detail.value}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("FormCatatan")}
      >
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
      {/* </SafeAreaView> */}
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  tabTextContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#E3F2FD",
  },
  tabText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  filterBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterText: {
    color: "#1E88E5",
    fontWeight: "600",
    fontSize: 13,
  },
  activeTabText: {
    color: "#1E88E5",
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  recordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordDateTime: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: "#666",
  },
  detailValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 24,
    bottom: 24,
    backgroundColor: "#1E88E5",
    borderRadius: 28,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
