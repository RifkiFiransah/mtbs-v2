import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { CustomHeader } from "../components/CustomHeader";
import {
  getReminders,
  ReminderRow,
  toggleReminderStatus,
} from "../database/db";
import { cancelReminderNotification } from "../utils/notifications";

interface PengingatScreenProps {
  navigation: any;
}

export const PengingatScreen = ({ navigation }: PengingatScreenProps) => {
  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "Hari Ini"];
  const isFocused = useIsFocused();

  const [reminders, setReminders] = useState<ReminderRow[]>([]);

  const fetchReminders = async () => {
    const data = await getReminders();
    setReminders(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchReminders();
    }
  }, [isFocused]);

  const toggleSwitch = async (
    id: number,
    currentStatus: number,
    notificationId?: string,
  ) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    const success = await toggleReminderStatus(id, newStatus);

    if (success) {
      // Refresh list
      fetchReminders();

      // Jika diubah menjadi non-aktif (selesai), batalkan notifikasinya
      if (newStatus === 1 && notificationId) {
        await cancelReminderNotification(notificationId);
      }
    }
  };

  const getFilteredReminders = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (activeTab === "Hari Ini") {
      return reminders.filter((r) => r.reminder_date === todayStr);
    }
    return reminders; // Aktif uncompleted & completed for "Semua"
  };

  const getIconName = (title: string): keyof typeof Ionicons.glyphMap => {
    if (title.includes("Obat")) return "medkit-outline";
    if (title.includes("Dokter")) return "medical-outline"; // Alternatively stethoscope, but medical is safe
    if (title.includes("Susu")) return "water-outline";
    if (title.includes("Imunisasi")) return "shield-checkmark-outline";
    return "notifications-outline";
  };

  const displayData = getFilteredReminders();

  return (
    <BackgroundWrapper>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.headerRow}>
        <CustomHeader title="Pengingat" />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("FormPengingat")}
        >
          <Ionicons name="add" size={24} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

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
        {displayData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Tidak ada pengingat.</Text>
          </View>
        ) : (
          displayData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.reminderCard,
                item.is_completed === 1 && { opacity: 0.6 },
              ]}
              onPress={() =>
                navigation.navigate("DetailPengingat", { reminder: item })
              }
            >
              <View
                style={[styles.iconContainer, { backgroundColor: "#1E88E520" }]}
              >
                <Ionicons
                  name={getIconName(item.title)}
                  size={24}
                  color={"#1E88E5"}
                />
              </View>
              <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>{item.title}</Text>
                <Text style={styles.reminderDesc}>{item.description}</Text>
                <Text style={styles.reminderTime}>
                  {item.reminder_date} {item.reminder_time}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#E0E0E0", true: "#E3F2FD" }}
                thumbColor={item.is_completed === 0 ? "#1E88E5" : "#F5F5F5"}
                onValueChange={() =>
                  toggleSwitch(item.id, item.is_completed, item.notification_id)
                }
                value={item.is_completed === 0}
              />
            </TouchableOpacity>
          ))
        )}

        <View style={styles.alertCard}>
          <View style={styles.alertIconContainer}>
            <Ionicons name="notifications" size={20} color="#1E88E5" />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Jangan lupa!</Text>
            <Text style={styles.alertDesc}>
              Pastikan pengingat aktif agar tidak terlewat jadwal penting si
              kecil.
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  headerRow: {
    position: "relative",
  },
  addButton: {
    position: "absolute",
    right: 25,
    bottom: 20, // Adjust based on your header
    zIndex: 10,
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
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  activeTab: {
    backgroundColor: "#E3F2FD",
  },
  tabText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#1E88E5",
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 2,
  },
  reminderDesc: {
    fontSize: 13,
    color: "#666",
  },
  reminderTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  alertCard: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  alertIconContainer: {
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E88E5",
    marginBottom: 4,
  },
  alertDesc: {
    fontSize: 13,
    color: "#1E3A8A",
    lineHeight: 18,
  },
});
