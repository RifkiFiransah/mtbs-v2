import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { CustomHeader } from "../components/CustomHeader";
import {
  addCatatan,
  CatatanRow,
  deleteCatatan,
  getCatatanById,
  updateCatatan,
} from "../database/db";

export const FormCatatanScreen = ({ route, navigation }: any) => {
  const isDetail = route.params?.isDetail || false;
  const catatanId = route.params?.catatanData?.id || route.params?.id || null;
  const initialCatatanData = route.params?.catatanData || null;

  // Tanggal dan Waktu Pemeriksaan
  const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [jamPemeriksaan, setJamPemeriksaan] = useState(
    new Date().toTimeString().substring(0, 5),
  );

  const [suhuTubuh, setSuhuTubuh] = useState("36,7");
  const [nafsuMakan, setNafsuMakan] = useState("Baik");
  const [kondisiAnak, setKondisiAnak] = useState("Aktif");
  const [napasAnak, setNapasAnak] = useState("Normal");
  const [penangananLainnya, setPenangananLainnya] = useState("");
  const [catatanTambahan, setCatatanTambahan] = useState("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusKondisi, setStatusKondisi] = useState("Normal");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const [keluhanUtama, setKeluhanUtama] = useState({
    Batuk: false,
    Pilek: false,
    Demam: false,
    Muntah: false,
    Rewel: false,
    Lemes: false,
    Lainnya: false,
  });

  const [tandaBahaya, setTandaBahaya] = useState({
    Kejang: false,
    "Tidak sadar": false,
    "Tidak bisa minum": false,
    "Muntah terus": false,
    "Sesak napas": false,
  });

  const [penanganan, setPenanganan] = useState({
    "Kompres hangat": false,
    "Diberi obat": false,
    "Diberi ASI / cairan": false,
    "Istirahat yang cukup": false,
    "Dibawa ke puskesmas / dokter": false,
    Lainnya: false,
  });

  // Load data jika detail
  React.useEffect(() => {
    if (isDetail && catatanId) {
      // Gunakan data dari route params jika tersedia untuk menghindari query ulang
      if (initialCatatanData) {
        populateCatatanData(initialCatatanData);
      } else {
        loadCatatanData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetail, catatanId]);

  const populateCatatanData = (data: CatatanRow) => {
    setTanggalPemeriksaan(data.tanggal_pemeriksaan);
    setJamPemeriksaan(data.jam_pemeriksaan || "");
    // Convert suhu_tubuh from database format (36.7) to input format (36,7)
    const suhuStr = data.suhu_tubuh?.toString() || "36.7";
    setSuhuTubuh(suhuStr.replace(".", ","));
    setNafsuMakan(data.nafsu_makan || "Baik");
    setKondisiAnak(data.kondisi_anak || "Aktif");
    setNapasAnak(data.napas_anak || "Normal");
    setPenangananLainnya(data.penanganan_lainnya || "");
    setCatatanTambahan(data.catatan_tambahan || "");
    setFotoUri(data.foto_uri || null);
    setStatusKondisi(data.status_kondisi || "Normal");

    if (data.keluhan_utama) {
      try {
        setKeluhanUtama(JSON.parse(data.keluhan_utama));
      } catch (e) {
        console.log("Error parsing keluhan_utama", e);
      }
    }
    if (data.tanda_bahaya) {
      try {
        setTandaBahaya(JSON.parse(data.tanda_bahaya));
      } catch (e) {
        console.log("Error parsing tanda_bahaya", e);
      }
    }
    if (data.penanganan) {
      try {
        setPenanganan(JSON.parse(data.penanganan));
      } catch (e) {
        console.log("Error parsing penanganan", e);
      }
    }
  };

  const loadCatatanData = async () => {
    if (!catatanId) return;
    try {
      const data = await getCatatanById(catatanId);
      if (data) {
        populateCatatanData(data);
      }
    } catch (error) {
      console.error("Error loading catatan:", error);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setTempDate(selectedDate);
      const dateStr = selectedDate.toISOString().split("T")[0];
      setTanggalPemeriksaan(dateStr);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      setTempDate(selectedTime);
      const timeStr = selectedTime.toTimeString().substring(0, 5);
      setJamPemeriksaan(timeStr);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const determineStatus = () => {
    const hasDangerSign = Object.values(tandaBahaya).some((v) => v === true);
    if (hasDangerSign) return "Bahaya";

    const needsAttention =
      Object.values(keluhanUtama).some((v) => v === true) ||
      nafsuMakan === "Berkurang" ||
      napasAnak !== "Normal";
    if (needsAttention) return "Perlu Perhatian";

    return "Normal";
  };

  const onSave = async () => {
    // Validate required fields
    if (!tanggalPemeriksaan || !jamPemeriksaan) {
      Alert.alert("Error", "Tanggal dan waktu pemeriksaan harus diisi!");
      return;
    }

    try {
      const status = determineStatus();
      const keluhanStr = JSON.stringify(keluhanUtama);
      const bahayaStr = JSON.stringify(tandaBahaya);
      let penangananStr = JSON.stringify(penanganan);

      // Convert suhu from string "36,7" to number
      const suhuNum = parseFloat(suhuTubuh.replace(",", "."));

      if (isDetail && catatanId) {
        // Update
        const success = await updateCatatan(
          catatanId,
          tanggalPemeriksaan,
          jamPemeriksaan,
          suhuNum || undefined,
          nafsuMakan,
          kondisiAnak,
          napasAnak,
          keluhanStr,
          bahayaStr,
          penangananStr,
          penangananLainnya,
          catatanTambahan,
          fotoUri || undefined,
          status,
        );

        if (success) {
          Alert.alert("Sukses", "Catatan berhasil diperbarui.");
          navigation.goBack();
        } else {
          Alert.alert("Error", "Gagal memperbarui catatan.");
        }
      } else {
        // Add new
        const id = await addCatatan(
          tanggalPemeriksaan,
          jamPemeriksaan,
          suhuNum || undefined,
          nafsuMakan,
          kondisiAnak,
          napasAnak,
          keluhanStr,
          bahayaStr,
          penangananStr,
          penangananLainnya,
          catatanTambahan,
          fotoUri || undefined,
          status,
        );

        if (id) {
          Alert.alert("Sukses", "Catatan berhasil disimpan.");
          navigation.goBack();
        } else {
          Alert.alert("Error", "Gagal menyimpan catatan.");
        }
      }
    } catch (error) {
      console.error("Error saving catatan:", error);
      Alert.alert("Error", "Terjadi kesalahan saat menyimpan catatan.");
    }
  };

  const onDelete = () => {
    if (!catatanId) return;

    Alert.alert(
      "Hapus Catatan",
      "Apakah Anda yakin ingin menghapus catatan ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            const success = await deleteCatatan(catatanId);
            if (success) {
              Alert.alert("Sukses", "Catatan berhasil dihapus.");
              navigation.goBack();
            } else {
              Alert.alert("Error", "Gagal menghapus catatan.");
            }
          },
        },
      ],
    );
  };

  const RadioButton = ({
    selected,
    onPress,
    label,
  }: {
    selected: boolean;
    onPress: () => void;
    label: string;
  }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const Checkbox = ({
    selected,
    onPress,
    label,
    iconInfo,
  }: {
    selected: boolean;
    onPress: () => void;
    label: string;
    iconInfo?: boolean;
  }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View
        style={[
          styles.checkboxBox,
          selected ? styles.checkboxSelected : styles.checkboxUnselected,
        ]}
      >
        {selected && <Ionicons name="checkmark" size={16} color="#FFF" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
      {iconInfo && (
        <Ionicons
          name="information-circle-outline"
          size={20}
          color="#1E88E5"
          style={{ marginLeft: "auto" }}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <BackgroundWrapper>
      {/* <SafeAreaView style={styles.container}> */}
      <CustomHeader
        title="Catatan"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
        >
          {!isDetail && (
            <View style={styles.banner}>
              <View style={styles.bannerIconBox}>
                <Ionicons name="clipboard-outline" size={32} color="#1E88E5" />
              </View>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>
                  Catat kondisi anak setiap hari
                </Text>
                <Text style={styles.bannerDesc}>
                  Catatan ini akan membantu memantau perkembangan kesehatan
                  anak.
                </Text>
              </View>
            </View>
          )}

          {/* Informasi Pemeriksaan */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#1E88E5"
              />
              <Text style={styles.sectionTitle}>Informasi Pemeriksaan</Text>
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="calendar-outline" size={18} color="#666" />
                  <Text style={styles.inputLabel}>Tanggal Pemeriksaan</Text>
                </View>
                <TouchableOpacity
                  style={styles.pickerBox}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.pickerText}>
                    {new Date(tanggalPemeriksaan).toLocaleDateString("id-ID")}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
              <View style={styles.inputRow}>
                <View style={styles.inputLabelRow}>
                  <Ionicons name="time-outline" size={18} color="#666" />
                  <Text style={styles.inputLabel}>Jam Pemeriksaan</Text>
                </View>
                <TouchableOpacity
                  style={styles.pickerBox}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.pickerText}>{jamPemeriksaan}</Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={tempDate}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                  />
                )}
              </View>
            </View>
          </View>

          {/* Kondisi Anak */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={20} color="#1E88E5" />
              <Text style={styles.sectionTitle}>Kondisi Anak</Text>
            </View>

            {/* Suhu Tubuh */}
            <View style={styles.formGroup}>
              <View style={styles.formGroupHeader}>
                <Ionicons
                  name="thermometer-outline"
                  size={18}
                  color="#E53935"
                />
                <Text style={styles.formGroupTitle}>Suhu Tubuh</Text>
              </View>
              <View style={styles.textInputBoxWithSuffix}>
                <TextInput
                  style={styles.textInputMain}
                  value={suhuTubuh}
                  onChangeText={setSuhuTubuh}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
                <View style={styles.inputSuffix}>
                  <Text style={styles.suffixText}>°C</Text>
                </View>
              </View>
              <Text style={styles.formGroupHelper}>
                Rentang normal: 36,0 - 37,5 °C
              </Text>
            </View>

            {/* Nafsu Makan */}
            <View style={styles.formGroup}>
              <View style={styles.formGroupHeader}>
                <Ionicons name="restaurant-outline" size={18} color="#4CAF50" />
                <Text style={styles.formGroupTitle}>Nafsu Makan & Minum</Text>
              </View>
              <View style={styles.radioGroupRow}>
                {["Baik", "Berkurang", "Tidak mau"].map((item) => (
                  <RadioButton
                    key={item}
                    label={item}
                    selected={nafsuMakan === item}
                    onPress={() => setNafsuMakan(item)}
                  />
                ))}
              </View>
            </View>

            {/* Kondisi Anak */}
            <View style={styles.formGroup}>
              <View style={styles.formGroupHeader}>
                <Ionicons name="happy-outline" size={18} color="#9C27B0" />
                <Text style={styles.formGroupTitle}>Kondisi Anak</Text>
              </View>
              <View style={styles.radioGroupGrid}>
                {["Aktif", "Rewel", "Lemas", "Mengantuk terus"].map((item) => (
                  <View key={item} style={{ width: "33%", marginBottom: 12 }}>
                    <RadioButton
                      label={item}
                      selected={kondisiAnak === item}
                      onPress={() => setKondisiAnak(item)}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Napas Anak */}
            <View style={styles.formGroup}>
              <View style={styles.formGroupHeader}>
                <Ionicons name="pulse-outline" size={18} color="#2196F3" />
                <Text style={styles.formGroupTitle}>Napas Anak</Text>
              </View>
              <View style={styles.radioGroupGrid}>
                {["Normal", "Cepat", "Sesak", "Ada tarikan dada"].map(
                  (item) => (
                    <View key={item} style={{ width: "33%", marginBottom: 12 }}>
                      <RadioButton
                        label={item}
                        selected={napasAnak === item}
                        onPress={() => setNapasAnak(item)}
                      />
                    </View>
                  ),
                )}
              </View>
            </View>

            {/* Keluhan Utama */}
            <View style={styles.formGroup}>
              <View style={styles.formGroupHeader}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color="#FF6D00"
                />
                <Text style={styles.formGroupTitle}>Keluhan Utama</Text>
              </View>
              <View style={styles.keluhanGrid}>
                {Object.keys(keluhanUtama).map((key) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.keluhanChip,
                      keluhanUtama[key as keyof typeof keluhanUtama] &&
                        styles.keluhanChipSelected,
                    ]}
                    onPress={() =>
                      setKeluhanUtama({
                        ...keluhanUtama,
                        [key]: !keluhanUtama[key as keyof typeof keluhanUtama],
                      })
                    }
                  >
                    {keluhanUtama[key as keyof typeof keluhanUtama] && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color="green"
                        style={{ marginRight: 4 }}
                      />
                    )}
                    <Text
                      style={[
                        styles.keluhanChipText,
                        keluhanUtama[key as keyof typeof keluhanUtama] &&
                          styles.keluhanChipTextSelected,
                      ]}
                    >
                      {key}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.infoRowText}>
                <Ionicons
                  name="information-circle-outline"
                  size={14}
                  color="#666"
                />
                <Text style={styles.helperText}>
                  Pilih lebih dari satu keluhan jika ada.
                </Text>
              </View>
            </View>
          </View>

          {/* Tanda Bahaya */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="warning" size={20} color="#FF5252" />
              <View>
                <Text style={[styles.sectionTitle, { color: "#FF5252" }]}>
                  Tanda Bahaya
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Pilih jika anak mengalami tanda berikut
                </Text>
              </View>
            </View>
            <View style={styles.checkboxList}>
              {Object.keys(tandaBahaya).map((key, index) => (
                <View key={key}>
                  <Checkbox
                    label={key}
                    selected={tandaBahaya[key as keyof typeof tandaBahaya]}
                    onPress={() =>
                      setTandaBahaya({
                        ...tandaBahaya,
                        [key]: !tandaBahaya[key as keyof typeof tandaBahaya],
                      })
                    }
                    iconInfo={true}
                  />
                  {index < Object.keys(tandaBahaya).length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Penanganan yang Dilakukan */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="medkit-outline" size={20} color="#1E88E5" />
              <Text style={styles.sectionTitle}>Penanganan yang Dilakukan</Text>
            </View>
            <View style={styles.checkboxList}>
              {Object.keys(penanganan).map((key, index) => (
                <View key={key}>
                  <Checkbox
                    label={key}
                    selected={penanganan[key as keyof typeof penanganan]}
                    onPress={() =>
                      setPenanganan({
                        ...penanganan,
                        [key]: !penanganan[key as keyof typeof penanganan],
                      })
                    }
                  />
                  {key === "Lainnya" && penanganan["Lainnya"] && (
                    <TextInput
                      style={styles.lainnyaInput}
                      placeholder="Tulis penanganan lainnya..."
                      value={penangananLainnya}
                      onChangeText={setPenangananLainnya}
                    />
                  )}
                  {index < Object.keys(penanganan).length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Catatan Tambahan */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#FBC02D"
              />
              <View>
                <Text style={[styles.sectionTitle, { color: "#1E3A8A" }]}>
                  Catatan Tambahan
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Tuliskan hal lain yang perlu diperhatikan
                </Text>
              </View>
            </View>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                placeholder="Ketik catatan..."
                value={catatanTambahan}
                onChangeText={setCatatanTambahan}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{catatanTambahan.length}/200</Text>
            </View>
          </View>

          {/* Foto (Opsional) */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="camera-outline" size={20} color="#9C27B0" />
              <View>
                <Text style={[styles.sectionTitle, { color: "#1E3A8A" }]}>
                  Foto (Opsional)
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Tambahkan foto kondisi anak
                </Text>
              </View>
            </View>
            {fotoUri ? (
              <View style={styles.photoPreviewContainer}>
                <Image source={{ uri: fotoUri }} style={styles.photoPreview} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => setFotoUri(null)}
                >
                  <Ionicons name="close-circle" size={32} color="#FF5252" />
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
              <Ionicons name="camera-outline" size={20} color="#1E88E5" />
              <Text style={styles.addPhotoText}>
                {fotoUri ? "Ubah Foto" : "Tambah Foto"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          {isDetail && catatanId ? (
            <View style={styles.buttonActionRow}>
              <TouchableOpacity style={styles.btnHapus} onPress={onDelete}>
                <Ionicons name="trash-outline" size={18} color="#FF5252" />
                <Text style={styles.btnHapusText}>Hapus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnSimpan, { flex: 1 }]}
                onPress={onSave}
              >
                <Ionicons name="save-outline" size={18} color="#FFF" />
                <Text style={styles.btnSimpanText}>Update Catatan</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonActionRow}>
              <TouchableOpacity
                style={[styles.btnSimpan, { flex: 1 }]}
                onPress={onSave}
              >
                <Ionicons name="save-outline" size={18} color="#FFF" />
                <Text style={styles.btnSimpanText}>Simpan Catatan</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {/* </SafeAreaView> */}
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FE",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  banner: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  bannerIconBox: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    marginRight: 16,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  bannerDesc: {
    fontSize: 12,
    color: "#424242",
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  inputGroup: {
    gap: 12,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 12,
  },
  inputLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    color: "#333",
  },
  pickerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  pickerText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  formGroup: {
    marginBottom: 20,
  },
  formGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  formGroupTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E3A8A",
  },
  textInputBoxWithSuffix: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
  },
  textInputMain: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  inputSuffix: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#E0E0E0",
  },
  suffixText: {
    color: "#666",
    fontSize: 14,
  },
  formGroupHelper: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },
  radioGroupRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  radioGroupGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#CCC",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#1E88E5",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1E88E5",
  },
  radioLabel: {
    fontSize: 13,
    color: "#333",
  },
  keluhanGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  keluhanChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  keluhanChipSelected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#1E88E5",
  },
  keluhanChipText: {
    fontSize: 13,
    color: "#666",
  },
  keluhanChipTextSelected: {
    color: "#1E88E5",
    fontWeight: "600",
  },
  infoRowText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  helperText: {
    fontSize: 12,
    color: "#666",
  },
  checkboxList: {
    gap: 0,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  checkboxUnselected: {
    borderColor: "#CCC",
    backgroundColor: "#FFF",
  },
  checkboxSelected: {
    borderColor: "#1E88E5",
    backgroundColor: "#1E88E5",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  lainnyaInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
    marginLeft: 32,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
  },
  textArea: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  addPhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderStyle: "dashed",
    borderRadius: 8,
    backgroundColor: "#F5FAFF",
    gap: 8,
  },
  addPhotoText: {
    color: "#1E88E5",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  btnHapus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF5252",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFEBEE",
    flex: 1,
    gap: 6,
  },
  btnHapusText: {
    color: "#FF5252",
    fontSize: 14,
    fontWeight: "600",
  },
  btnEdit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF9800",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFF3E0",
    flex: 1,
    gap: 6,
  },
  btnEditText: {
    color: "#FF9800",
    fontSize: 14,
    fontWeight: "600",
  },
  btnSimpan: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E88E5",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    gap: 6,
  },
  btnSimpanText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  photoPreviewContainer: {
    position: "relative",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  // btnHapus: {
  //   paddingVertical: 12,
  //   flex: 1,
  //   gap: 6,
  //   backgroundColor: "#FFF",
  // },
  // btnHapusText: {
  //   fontSize: 14,
  //   fontWeight: "600",
  //   color: "#333",
  // },
  // btnEdit: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderWidth: 1,
  //   borderColor: "#E0E0E0",
  //   borderRadius: 8,
  //   paddingVertical: 12,
  //   flex: 1,
  //   gap: 6,
  //   backgroundColor: "#FFF",
  // },
  // btnEditText: {
  //   fontSize: 14,
  //   fontWeight: "600",
  //   color: "#333",
  // },
  // btnSimpan: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 8,
  //   paddingVertical: 12,
  //   flex: 2,
  //   gap: 6,
  //   backgroundColor: "#1E88E5",
  // },
  // btnSimpanText: {
  //   fontSize: 14,
  //   fontWeight: "600",
  //   color: "#FFF",
  // },
});
