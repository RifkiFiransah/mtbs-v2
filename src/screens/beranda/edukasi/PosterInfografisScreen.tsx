import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const POSTERS = [
  {
    id: "1",
    title: "Poster Tanda Bahaya Umum",
    description: "Visualisasi 9 tanda bahaya yang perlu diketahui orang tua",
    category: "Tanda Bahaya",
  },
  {
    id: "2",
    title: "Infografis SAGA",
    description: "Penjelasan visual tentang sistem pemeriksaan SAGA",
    category: "Pemeriksaan",
  },
  {
    id: "3",
    title: "Poster Pertolongan Pertama",
    description: "Langkah-langkah pertolongan pertama sebelum ke rumah sakit",
    category: "Penanganan",
  },
  {
    id: "4",
    title: "Infografis Gizi Seimbang",
    description: "Kebutuhan nutrisi untuk pertumbuhan optimal anak",
    category: "Nutrisi",
  },
  {
    id: "5",
    title: "Poster Vaksinasi Anak",
    description: "Jadwal vaksinasi lengkap untuk anak Indonesia",
    category: "Pencegahan",
  },
  {
    id: "6",
    title: "Infografis Hygiene Anak",
    description: "Cara menjaga kebersihan dan kesehatan anak",
    category: "Pencegahan",
  },
];

export const PosterInfografisScreen = ({ navigation }: any) => {
  const renderPosterItem = ({ item }: any) => (
    <TouchableOpacity style={styles.posterCard}>
      <View style={styles.posterThumbnail}>
        <MaterialIcons name="image" size={60} color="#0047AB" />
      </View>
      <View style={styles.posterInfo}>
        <Text style={styles.posterTitle}>{item.title}</Text>
        <Text style={styles.posterDesc}>{item.description}</Text>
        <View style={styles.posterMeta}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <MaterialIcons name="download" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Poster & Infografis</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>9. POSTER & INFOGRAFIS</Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.description}>
            Unduh poster dan infografis untuk dibagikan kepada keluarga, teman,
            dan masyarakat.
          </Text>

          <FlatList
            data={POSTERS}
            renderItem={renderPosterItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PosterInfografisScreen;

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
  description: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 16,
  },
  posterCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  posterThumbnail: {
    width: "100%",
    height: 160,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  posterInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  posterTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
  },
  posterDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  posterMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  categoryTag: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryTagText: {
    fontSize: 11,
    color: "#0047AB",
    fontWeight: "600",
  },
  downloadBtn: {
    backgroundColor: "#0047AB",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
