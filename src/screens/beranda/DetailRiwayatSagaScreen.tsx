import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../components/ScreenHeader";
import {
  deleteSagaRecord,
  getSagaRecordById,
  SagaRecord,
} from "../../database/db";

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

// Data for SAGA Questions
const SAGA_QUESTIONS = [
  { id: 1, category: "TANYAKAN", text: "Apakah anak bisa minum atau menyusu?" },
  {
    id: 2,
    category: "TANYAKAN",
    text: "Apakah anak memuntahkan semua makanan dan minuman?",
  },
  {
    id: 3,
    category: "TANYAKAN",
    text: "Apakah anak pernah kejang selama sakit ini?",
  },
  {
    id: 4,
    category: "TENTUKAN PENAMPILAN",
    text: "Apakah anak kejang?",
  },
  {
    id: 5,
    category: "TENTUKAN PENAMPILAN",
    text: "Apakah anak tidak dapat berinteraksi dengan lingkungan atau tidak sadar",
  },
  {
    id: 6,
    category: "TENTUKAN PENAMPILAN",
    text: "Apakah anak gelisah, rewel, dan tidak dapat ditenangkan?",
  },
  {
    id: 7,
    category: "TENTUKAN PENAMPILAN",
    text: "Apakah anak mempunyai pandangan kosong atau mata tidak membuka?",
  },
  {
    id: 8,
    category: "TENTUKAN PENAMPILAN",
    text: "Apakah anak tidak bersuara atau justru menangis melengking?",
  },
  {
    id: 9,
    category: "TENTUKAN USAHA NAPAS",
    text: "Apakah terdapat tarikan dinding dada ke dalam?",
  },
  {
    id: 10,
    category: "TENTUKAN USAHA NAPAS",
    text: "Apakah terdengar stridor (suara ngorok)?",
  },
  {
    id: 11,
    category: "TENTUKAN USAHA NAPAS",
    text: "Apakah terdapat napas cuping hidung?",
  },
  {
    id: 12,
    category: "TENTUKAN USAHA NAPAS",
    text: "Apakah anak mencari posisi paling nyaman dan menolak berbaring?",
  },
  {
    id: 13,
    category: "TENTUKAN SIRKULASI",
    text: "Apakah anak tampak pucat?",
  },
  {
    id: 14,
    category: "TENTUKAN SIRKULASI",
    text: "Apakah tampak warna biru pada kulit, bibir, kuku, dan membran mukosa (sianosis)?",
  },
  {
    id: 15,
    category: "TENTUKAN SIRKULASI",
    text: "Apakah tampak gambaran kutis marmorata atau kulit seperti marmer?",
  },
];

export const DetailRiwayatSagaScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [record, setRecord] = useState<SagaRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadRecord = async () => {
    try {
      setLoading(true);
      const data = await getSagaRecordById(id);
      setRecord(data as SagaRecord);
    } catch (error) {
      console.error("Error loading saga record detail:", error);
      Alert.alert("Error", "Gagal memuat detail pemeriksaan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Hapus Riwayat",
      "Apakah Anda yakin ingin menghapus riwayat pemeriksaan ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              const success = await deleteSagaRecord(id);
              if (success) {
                Alert.alert("Sukses", "Riwayat berhasil dihapus", [
                  { text: "OK", onPress: () => navigation.goBack() },
                ]);
              } else {
                Alert.alert("Error", "Gagal menghapus riwayat.");
              }
            } catch (error) {
              console.error("Error deleting saga record:", error);
              Alert.alert("Error", "Telah terjadi kesalahan sistem.");
            }
          },
        },
      ],
    );
  };

  const renderGejala = (recordItem: SagaRecord) => {
    try {
      if (!recordItem.answers) {
        return <Text style={styles.tindakanText}>Tidak ada data jawaban.</Text>;
      }

      const parsedAnswers = JSON.parse(recordItem.answers as string);
      const positiveQuestions = SAGA_QUESTIONS.filter(
        (q) => parsedAnswers[q.id] === true,
      );

      if (positiveQuestions.length === 0) {
        return (
          <Text style={styles.tindakanText}>
            Tidak ada tanda bahaya yang ditemukan (Semua jawaban TIDAK).
          </Text>
        );
      }

      return positiveQuestions.map((q) => (
        <View key={q.id} style={{ marginBottom: 4 }}>
          <Text style={styles.tindakanText}>• {q.text}</Text>
        </View>
      ));
    } catch (e) {
      console.log(e);
      return (
        <Text style={styles.tindakanText}>Gagal memuat data jawaban.</Text>
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Detail Pemeriksaan"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0047AB" />
        </View>
      </SafeAreaView>
    );
  }

  if (!record) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Detail Pemeriksaan"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Data tidak ditemukan</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Detail Pemeriksaan"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.dateText}>{record.tanggal_pemeriksaan}</Text>
              <Text style={styles.timeText}>{record.jam_pemeriksaan}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    getStatusColor(record.classification as string) + "20",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(record.classification as string) },
                ]}
              >
                {getStatusDisplay(record.classification as string)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Data Anak</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nama</Text>
            <Text style={styles.detailValue}>{record.nama_anak || "-"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>NIK</Text>
            <Text style={styles.detailValue}>{record.nik || "-"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Jenis Kelamin</Text>
            <Text style={styles.detailValue}>{record.gender || "-"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Umur</Text>
            <Text style={styles.detailValue}>
              {record.umur_tahun || 0} tahun {record.umur_bulan || 0} bulan
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Berat Badan</Text>
            <Text style={styles.detailValue}>
              {record.berat_badan ? `${record.berat_badan} kg` : "-"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tinggi/Panjang Badan</Text>
            <Text style={styles.detailValue}>
              {record.pb_tb ? `${record.pb_tb} cm` : "-"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>LILA</Text>
            <Text style={styles.detailValue}>
              {record.lila ? `${record.lila} cm` : "-"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Lingkar Kepala</Text>
            <Text style={styles.detailValue}>
              {record.lingkar_kepala ? `${record.lingkar_kepala} cm` : "-"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Suhu</Text>
            <Text style={styles.detailValue}>
              {record.suhu ? `${record.suhu} °C` : "-"}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Data Tambahan</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Alamat</Text>
            <Text style={styles.detailValue}>{record.alamat || "-"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Daerah Endemis Malaria</Text>
            <Text style={styles.detailValue}>
              {record.daerah_endemis_malaria || "-"}
            </Text>
          </View>
          {record.daerah_endemis_malaria === "YA" && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>RDT Malaria</Text>
              <Text style={styles.detailValue}>
                {record.rdt_malaria_result || "-"}
              </Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Keluhan Utama</Text>
            <Text style={styles.detailValue}>
              {record.keluhan_utama || "-"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kunjungan Pertama</Text>
            <Text style={styles.detailValue}>
              {record.kunjungan_pertama || "-"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kunjungan Ulang</Text>
            <Text style={styles.detailValue}>
              {record.kunjungan_ulang || "-"}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Gejala / Tanda Bahaya</Text>
          {renderGejala(record)}
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name="delete" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Hapus Riwayat</Text>
        </TouchableOpacity>

        {/* Tambahan spacing di bawah */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailRiwayatSagaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  timeText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    flex: 2,
    textAlign: "right",
  },
  tindakanText: {
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 20,
  },
  deleteButton: {
    backgroundColor: "#DC2626",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
