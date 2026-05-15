import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScreenHeader } from "../../components/ScreenHeader";
import { getSagaRecords, SagaRecord } from "../../database/db";

// Data perkembangan default (Growth tracking data)
const DEFAULT_GROWTH_DATA = {
  labels: ["0", "6", "12", "18", "24", "30", "36"],
  datasets: [
    {
      data: [3.5, 7.0, 9.5, 11.0, 13.0, 14.5, 16.0],
      label: "Berat (kg)",
      color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`, // Blue
      strokeWidth: 2,
    },
    {
      data: [50, 65, 75, 82, 88, 93, 98],
      label: "Tinggi (cm)",
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, // Green
      strokeWidth: 2,
    },
  ],
};

// Fungsi untuk membuat growth data dari SAGA records
const createGrowthDataFromRecords = (records: SagaRecord[]) => {
  if (records.length === 0) {
    return DEFAULT_GROWTH_DATA;
  }

  // Extract berat dan tinggi dari records, sorted by tanggal_pemeriksaan
  const sortedRecords = [...records].sort(
    (a, b) =>
      new Date(b.tanggal_pemeriksaan).getTime() -
      new Date(a.tanggal_pemeriksaan).getTime(),
  );

  const labels = sortedRecords.map((record) => {
    const date = new Date(record.tanggal_pemeriksaan);
    return date.getDate().toString();
  });

  const beratData = sortedRecords
    .map((record) => record.berat_badan || 0)
    .reverse();
  const tinggiData = sortedRecords
    .map((record) => record.tinggi_badan || 0)
    .reverse();

  return {
    labels: labels.reverse(),
    datasets: [
      {
        data: beratData,
        label: "Berat (kg)",
        color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: tinggiData,
        label: "Tinggi (cm)",
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
};

// Fungsi untuk mengkonversi status dari database ke warna
const getStatusColor = (classification: string): string => {
  switch (classification) {
    case "STABIL":
      return "#10B981"; // Green
    case "PENYAKIT_SANGAT_BERAT":
      return "#DC2626"; // Red
    case "GAGAL_JANTUNG_PARU":
      return "#DC2626"; // Red (Critical)
    default:
      return "#6B7280"; // Gray
  }
};

// Fungsi untuk mengkonversi status dari database ke format tampilan
const getStatusDisplay = (classification: string): string => {
  switch (classification) {
    case "STABIL":
      return "Stabil";
    case "PENYAKIT_SANGAT_BERAT":
      return "Penyakit Sangat Berat";
    case "GAGAL_JANTUNG_PARU":
      return "Gagal Jantung Paru";
    default:
      return "Tidak Diketahui";
  }
};

export const RiwayatPemeriksaanScreen = ({ navigation }: any) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sagaRecords, setSagaRecords] = useState<SagaRecord[]>([]);
  const [growthData, setGrowthData] = useState(DEFAULT_GROWTH_DATA);
  const [stats, setStats] = useState({
    total: 0,
    penyakitBerat: 0,
    stabil: 0,
  });

  // Function to load records from database
  const loadRecords = useCallback(async () => {
    try {
      const records = await getSagaRecords();
      setSagaRecords(records);

      // Calculate statistics
      const total = records.length;
      const penyakitBerat = records.filter(
        (r) =>
          r.classification === "PENYAKIT_SANGAT_BERAT" ||
          r.classification === "GAGAL_JANTUNG_PARU",
      ).length;
      const stabil = records.filter(
        (r) => r.classification === "STABIL",
      ).length;

      setStats({
        total,
        penyakitBerat,
        stabil,
      });

      // Update growth chart data
      setGrowthData(createGrowthDataFromRecords(records));
    } catch (error) {
      console.error("Error loading SAGA records:", error);
    }
  }, []);

  // Load SAGA records from database on mount
  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  // Refresh data setiap kali screen difokus (misal: setelah menambah pemeriksaan baru)
  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [loadRecords]),
  );

  const renderRiwayatItem = ({ item }: { item: SagaRecord }) => (
    <TouchableOpacity
      style={styles.riwayatCard}
      onPress={() => setSelectedItem(item.id.toString())}
    >
      <View style={styles.riwayatHeader}>
        <View>
          <Text style={styles.riwayatDate}>{item.tanggal_pemeriksaan}</Text>
          <Text style={styles.riwayatTime}>{item.jam_pemeriksaan}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(item.classification || "") + "20",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.classification || "") },
            ]}
          >
            {getStatusDisplay(item.classification || "")}
          </Text>
        </View>
      </View>

      <View style={styles.riwayatContent}>
        <View style={styles.childInfo}>
          <MaterialIcons name="child-care" size={24} color="#6B7280" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.childName}>{item.nama_anak}</Text>
            <Text style={styles.childAge}>{item.umur}</Text>
          </View>
        </View>
      </View>

      {selectedItem === item.id.toString() && (
        <View style={styles.expandedContent}>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Lihat Detail</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#0047AB" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Riwayat Pemeriksaan"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Pemeriksaan</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#DC2626" }]}>
              {stats.penyakitBerat}
            </Text>
            <Text style={styles.statLabel}>Penyakit Berat</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#10B981" }]}>
              {stats.stabil}
            </Text>
            <Text style={styles.statLabel}>Stabil</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Grafik Perkembangan</Text>
          <View style={styles.chartWrapper}>
            <LineChart
              data={growthData}
              width={Dimensions.get("window").width - 48}
              height={280}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#fff",
                },
                propsForBackgroundLines: {
                  strokeDasharray: "5,5",
                  stroke: "rgba(229, 231, 235, 0.5)",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                paddingRight: 0,
              }}
            />
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#1E88E5" }]}
              />
              <Text style={styles.legendText}>Berat (kg)</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#10B981" }]}
              />
              <Text style={styles.legendText}>Tinggi (cm)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Riwayat Pemeriksaan</Text>

        {sagaRecords.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="description" size={48} color="#D1D5DB" />
            <Text style={styles.emptyStateText}>Belum ada pemeriksaan</Text>
            <Text style={styles.emptyStateSubtext}>
              Mulai dengan membuat pemeriksaan baru
            </Text>
          </View>
        ) : (
          <FlatList
            data={sagaRecords}
            renderItem={renderRiwayatItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Saga")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Pemeriksaan Baru</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RiwayatPemeriksaanScreen;

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0047AB",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  chartWrapper: {
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 12,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  riwayatCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  riwayatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  riwayatDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  riwayatTime: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  riwayatContent: {
    marginBottom: 12,
  },
  childInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  childName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  childAge: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  expandedContent: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  detailButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0047AB",
    marginRight: 6,
  },
  addButton: {
    backgroundColor: "#0047AB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
});
