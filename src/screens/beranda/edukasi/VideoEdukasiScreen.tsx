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

const VIDEOS = [
  {
    id: "1",
    title: "Cara Mengenali Tanda Bahaya Pada Bayi",
    duration: "5:20",
    category: "Tanda Bahaya",
  },
  {
    id: "2",
    title: "Pertolongan Pertama Saat Anak Demam Tinggi",
    duration: "6:15",
    category: "Penanganan Darurat",
  },
  {
    id: "3",
    title: "Pencegahan Diare pada Anak",
    duration: "4:30",
    category: "Pencegahan",
  },
  {
    id: "4",
    title: "Teknik Bernapas Bagi Anak Sesak Napas",
    duration: "3:45",
    category: "Teknik Bantuan",
  },
  {
    id: "5",
    title: "Gizi Seimbang Untuk Pertumbuhan Optimal",
    duration: "7:10",
    category: "Nutrisi",
  },
];

export const VideoEdukasiScreen = ({ navigation }: any) => {
  const renderVideoItem = ({ item }: any) => (
    <TouchableOpacity style={styles.videoCard}>
      <View style={styles.videoThumbnail}>
        <MaterialIcons name="play-circle-outline" size={60} color="#0047AB" />
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <View style={styles.videoMeta}>
          <Text style={styles.videoDuration}>
            <MaterialIcons name="schedule" size={12} color="#6B7280" />{" "}
            {item.duration}
          </Text>
          <Text style={styles.videoCategory}>{item.category}</Text>
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
        <Text style={styles.headerTitle}>Video Edukasi</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>6. VIDEO EDUKASI</Text>
        </View>

        <View style={styles.contentBox}>
          <View style={styles.videoBanner}>
            <MaterialIcons name="videocam" size={80} color="#1E40AF" />
            <Text style={styles.bannerTitle}>Video Pembelajaran</Text>
            <Text style={styles.bannerDesc}>Tanda Bahaya Pada Anak</Text>
          </View>

          <Text style={styles.sectionTitle}>Daftar Video Edukasi</Text>

          <FlatList
            data={VIDEOS}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoEdukasiScreen;

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
  videoBanner: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginTop: 12,
  },
  bannerDesc: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 12,
  },
  videoCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  videoThumbnail: {
    width: 100,
    height: 100,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  videoInfo: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
  },
  videoMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  videoDuration: {
    fontSize: 11,
    color: "#6B7280",
    marginRight: 12,
  },
  videoCategory: {
    fontSize: 11,
    backgroundColor: "#DBEAFE",
    color: "#0047AB",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: "600",
  },
});
