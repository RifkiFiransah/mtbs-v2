import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
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
  getChildren,
  getMothers,
  updateChild,
  updateMother,
} from "../database/db";

interface ProfilScreenProps {
  navigation: any;
}

export const ProfilScreen = ({ navigation }: ProfilScreenProps) => {
  const isFocused = useIsFocused();
  const [motherData, setMotherData] = useState<any>(null);
  const [childData, setChildData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form states
  const [motherName, setMotherName] = useState("");
  const [motherAge, setMotherAge] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [motherFotoUri, setMotherFotoUri] = useState<string | null>(null);

  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [childGender, setChildGender] = useState("");
  const [childFotoUri, setChildFotoUri] = useState<string | null>(null);

  const loadData = async () => {
    const mothers = await getMothers();
    const children = await getChildren();

    if (mothers.length > 0) {
      const mother = mothers[0] as any;
      setMotherData(mother);
      setMotherName(mother.name);
      setMotherAge(mother.age);
      setMotherPhone(mother.phone);
      setMotherFotoUri(mother.foto_uri || null);
    }

    if (children.length > 0) {
      const child = children[0] as any;
      setChildData(child);
      setChildName(child.name);
      setChildAge(child.date_of_birth);
      setChildGender(child.gender);
      setChildFotoUri(child.foto_uri || null);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const handleSave = async () => {
    try {
      if (motherData) {
        await updateMother(
          motherData.id,
          motherName,
          motherAge,
          motherPhone,
          motherFotoUri || undefined,
        );
      }
      if (childData) {
        await updateChild(
          childData.id,
          childName,
          childAge,
          childGender,
          childData.blood_type,
          childFotoUri || undefined,
        );
      }
      setModalVisible(false);
      loadData();
      Alert.alert("Sukses", "Data profil berhasil diperbarui.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal memperbarui data profil.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  const pickMotherImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setMotherFotoUri(result.assets[0].uri);
    }
  };

  const pickChildImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setChildFotoUri(result.assets[0].uri);
    }
  };

  return (
    <BackgroundWrapper>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={styles.headerRow}>
        <CustomHeader title="Profil" />
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="settings-outline" size={24} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Data Ibu</Text>
        <View style={[styles.card, styles.profileCard]}>
          <View style={styles.avatarContainer}>
            {motherData?.foto_uri ? (
              <Image
                source={{ uri: motherData.foto_uri }}
                style={styles.avatarImage}
              />
            ) : (
              <Ionicons name="person" size={40} color="#8C9EFF" />
            )}
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nama</Text>
              <Text style={styles.infoValue}>: {motherData?.name || "-"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Umur</Text>
              <Text style={styles.infoValue}>: {motherData?.age || "-"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>No. HP</Text>
              <Text style={styles.infoValue}>: {motherData?.phone || "-"}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Data Anak</Text>
        <View style={[styles.card, styles.profileCard]}>
          <View
            style={[styles.avatarContainer, { backgroundColor: "#B3E5FC" }]}
          >
            {childData?.foto_uri ? (
              <Image
                source={{ uri: childData.foto_uri }}
                style={styles.avatarImage}
              />
            ) : (
              <Ionicons name="happy" size={40} color="#4FC3F7" />
            )}
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nama</Text>
              <Text style={styles.infoValue}>: {childData?.name || "-"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Usia</Text>
              <Text style={styles.infoValue}>
                : {childData?.date_of_birth || "-"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Jenis Kelamin</Text>
              <Text style={styles.infoValue}>: {childData?.gender || "-"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("TentangAplikasi")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#1E3A8A"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Tentang Aplikasi</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Bantuan")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="help-circle-outline"
                size={20}
                color="#1E3A8A"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Bantuan</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("KebijakanPrivasi")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#1E3A8A"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Kebijakan Privasi</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="log-out-outline"
                size={20}
                color="#1E3A8A"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Keluar</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Pengaturan Profil */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pengaturan Profil</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Text style={styles.formSectionTitle}>Data Ibu</Text>
              <View style={styles.imagePickerContainer}>
                <TouchableOpacity
                  onPress={pickMotherImage}
                  style={styles.imagePickerAvatar}
                >
                  {motherFotoUri ? (
                    <Image
                      source={{ uri: motherFotoUri }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <Ionicons name="person" size={40} color="#8C9EFF" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={pickMotherImage}>
                  <Text style={styles.changePhotoText}>
                    Ubah Foto Ibu (Opsional)
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama Ibu</Text>
                <TextInput
                  style={styles.input}
                  value={motherName}
                  onChangeText={setMotherName}
                  placeholder="Masukkan nama ibu"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Umur</Text>
                <TextInput
                  style={styles.input}
                  value={motherAge}
                  onChangeText={setMotherAge}
                  placeholder="Contoh: 28 Tahun"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>No. HP</Text>
                <TextInput
                  style={styles.input}
                  value={motherPhone}
                  onChangeText={setMotherPhone}
                  placeholder="Contoh: 0812-3456-7890"
                  keyboardType="phone-pad"
                />
              </View>

              <Text style={styles.formSectionTitle}>Data Anak</Text>
              <View style={styles.imagePickerContainer}>
                <TouchableOpacity
                  onPress={pickChildImage}
                  style={[
                    styles.imagePickerAvatar,
                    { backgroundColor: "#B3E5FC" },
                  ]}
                >
                  {childFotoUri ? (
                    <Image
                      source={{ uri: childFotoUri }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <Ionicons name="happy" size={40} color="#4FC3F7" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={pickChildImage}>
                  <Text style={styles.changePhotoText}>
                    Ubah Foto Anak (Opsional)
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama Anak</Text>
                <TextInput
                  style={styles.input}
                  value={childName}
                  onChangeText={setChildName}
                  placeholder="Masukkan nama anak"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Usia</Text>
                <TextInput
                  style={styles.input}
                  value={childAge}
                  onChangeText={setChildAge}
                  placeholder="Contoh: 1 Tahun 8 Bulan"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Jenis Kelamin</Text>
                <TextInput
                  style={styles.input}
                  value={childGender}
                  onChangeText={setChildGender}
                  placeholder="Laki-laki / Perempuan"
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  settingsButton: {
    position: "absolute",
    right: 30,
    bottom: 20,
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
    marginTop: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E8EAF6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  infoLabel: {
    width: 90,
    fontSize: 12,
    color: "#666",
  },
  infoValue: {
    flex: 1,
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  modalScroll: {
    marginBottom: 20,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#FAFAFA",
  },
  saveButton: {
    backgroundColor: "#1E88E5",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  imagePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8EAF6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  changePhotoText: {
    color: "#1E88E5",
    fontSize: 14,
    fontWeight: "500",
  },
});
