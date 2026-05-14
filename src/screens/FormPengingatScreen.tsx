import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { HeaderSafeArea } from "../components/HeaderSafeArea";
import { addReminder } from "../database/db";
import { scheduleReminderNotification } from "../utils/notifications";

const TITLE_OPTIONS = [
  "Minum Obat",
  "Kontrol ke Dokter",
  "Minum Susu",
  "Imunisasi",
];

export const FormPengingatScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState(TITLE_OPTIONS[0]);
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) setTime(selectedTime);
  };

  const onSave = async () => {
    if (!title) {
      Alert.alert("Error", "Judul pengingat harus diisi!");
      return;
    }

    try {
      // Buat objek tanggal dan waktu gabungan untuk trigger notifikasi
      const triggerDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
      );

      // Menyimpan tanggal dan jam dalam bentuk string ke database
      const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
      const timeStr = time.toTimeString().substring(0, 5); // HH:MM

      // Schedule notifikasi - bisa return null jika gagal
      const notificationId = await scheduleReminderNotification(
        Date.now(),
        title,
        description || "Saatnya membuka pengingat!",
        triggerDate,
      );

      // Save to Database - always proceed even if notification scheduling fails
      const id = await addReminder(
        title,
        description,
        dateStr,
        timeStr,
        notificationId || undefined,
      );

      if (id) {
        Alert.alert(
          "Sukses",
          notificationId
            ? "Pengingat berhasil disimpan dengan notifikasi."
            : "Pengingat berhasil disimpan. (Notifikasi tidak tersedia di Expo Go SDK 53+, gunakan development build untuk notifikasi penuh.)",
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", "Gagal menyimpan pengingat.");
      }
    } catch (error) {
      console.error("Error saving reminder:", error);
      Alert.alert(
        "Error",
        "Terjadi kesalahan saat menyimpan pengingat: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Tambah Pengingat"
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Judul Pengingat *</Text>
              <View style={styles.optionsContainer}>
                {TITLE_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.optionChip,
                      title === opt && styles.optionChipActive,
                    ]}
                    onPress={() => setTitle(opt)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        title === opt && styles.optionChipTextActive,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Deskripsi (Opsional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Misal: Paracetamol setelah makan"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.row}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}
              >
                <Text style={styles.label}>Tanggal</Text>
                <TouchableOpacity
                  style={styles.pickerBox}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons name="calendar-outline" size={20} color="#1E88E5" />
                  <Text style={styles.pickerText}>
                    {date.toLocaleDateString("id-ID")}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Waktu</Text>
                <TouchableOpacity
                  style={styles.pickerBox}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Ionicons name="time-outline" size={20} color="#1E88E5" />
                  <Text style={styles.pickerText}>
                    {time.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                  />
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveButtonText}>Simpan Pengingat</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  content: { padding: 16 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#1E3A8A", marginBottom: 8 },
  optionsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 8,
  },
  optionChipActive: {
    backgroundColor: "#E3F2FD",
    borderColor: "#1E88E5",
  },
  optionChipText: { color: "#666", fontSize: 13 },
  optionChipTextActive: { color: "#1E88E5", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#F9FAFB",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  pickerBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",
    gap: 8,
  },
  pickerText: { fontSize: 14, color: "#333" },
  saveButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
