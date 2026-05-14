import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../components/BackgroundWrapper";
import { HeaderSafeArea } from "../components/HeaderSafeArea";

interface CekKondisiScreenProps {
  navigation: any;
}

const QUESTIONS = [
  "Apakah anak tampak lemas, tidak sadar, atau tidak merespon saat dipanggil?",
  "Apakah anak memiliki tatapan kosong atau interaksi yang tidak normal?",
  "Apakah napas anak terdengar tidak normal (seperti mengi atau ngorok)?",
  "Apakah terlihat tarikan dinding dada ke dalam saat anak bernapas?",
  "Apakah warna kulit anak tampak pucat, kebiruan, atau tidak seperti biasanya?",
  "Apakah anak tidak bisa minum atau menyusu sama sekali?",
  "Apakah anak muntah setiap makan atau minum?",
  "Apakah anak mengalami kejang?",
  "Apakah anak tampak sesak napas atau napasnya sangat cepat?",
  "Apakah anak tampak sangat lemas atau sulit dibangunkan?",
];

export const CekKondisiScreen = ({ navigation }: CekKondisiScreenProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = answeredCount / QUESTIONS.length;
  const hasDangerSign = Object.values(answers).some((ans) => ans === true);

  const handleFinish = () => {
    setShowModal(true);
  };

  const handleActionTindakan = () => {
    setShowModal(false);
    // Mengarahkan ke halaman tindakan/perawatan. Sesuaikan nama screen-nya jika berbeda.
    navigation.navigate("Tindakan");
  };

  const handleActionPerawatan = () => {
    setShowModal(false);
    // Mengarahkan ke halaman tindakan/perawatan. Sesuaikan nama screen-nya jika berbeda.
    navigation.navigate("PerawatanDiRumah");
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <HeaderSafeArea
          title="Cek Kondisi Balita"
          showBack
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={styles.content}
        >
          {/* Progress Section */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {answeredCount}/{QUESTIONS.length}
            </Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>
          </View>

          <Text style={styles.instructions}>
            Jawab pertanyaan berikut sesuai{"\n"}dengan kondisi balita.
          </Text>

          {QUESTIONS.map((question, index) => {
            const isExpanded = expandedIndex === index;
            const currentAnswer = answers[index];
            const hasAnswered = currentAnswer !== undefined;

            return (
              <View key={index} style={styles.accordionContainer}>
                <TouchableOpacity
                  style={[
                    styles.accordionHeader,
                    isExpanded && styles.accordionHeaderExpanded,
                  ]}
                  onPress={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <View
                    style={[
                      styles.numberCircle,
                      hasAnswered && styles.numberCircleAnswered,
                    ]}
                  >
                    {hasAnswered ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : (
                      <Text style={styles.numberText}>{index + 1}</Text>
                    )}
                  </View>
                  <Text style={styles.accordionTitle}>{question}</Text>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.accordionContent}>
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        currentAnswer === true && styles.optionSelectedYa,
                      ]}
                      onPress={() => {
                        setAnswers((prev) => ({ ...prev, [index]: true }));
                      }}
                    >
                      <Ionicons
                        name={
                          currentAnswer === true ? "happy" : "happy-outline"
                        }
                        size={24}
                        color={currentAnswer === true ? "#2E7D32" : "#666"}
                        style={styles.optionIcon}
                      />
                      <Text
                        style={[
                          styles.optionText,
                          currentAnswer === true && styles.optionTextSelectedYa,
                        ]}
                      >
                        Ya
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        currentAnswer === false && styles.optionSelectedTidak,
                      ]}
                      onPress={() => {
                        setAnswers((prev) => ({ ...prev, [index]: false }));
                      }}
                    >
                      <Ionicons
                        name={currentAnswer === false ? "sad" : "sad-outline"}
                        size={24}
                        color={currentAnswer === false ? "#C62828" : "#666"}
                        style={styles.optionIcon}
                      />
                      <Text
                        style={[
                          styles.optionText,
                          currentAnswer === false &&
                            styles.optionTextSelectedTidak,
                        ]}
                      >
                        Tidak
                      </Text>
                    </TouchableOpacity>

                    {currentAnswer === undefined && (
                      <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>Penting:</Text>
                        <Text style={styles.infoText}>
                          • Jawaban harus sesuai kondisi anak saat ini
                        </Text>
                        <Text style={styles.infoText}>
                          • Tidak perlu menebak, cukup berdasarkan yang terlihat
                        </Text>
                        <Text style={styles.infoText}>
                          • Jika ragu, pilih jawaban yang mendekati
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.btnNext,
              answeredCount < QUESTIONS.length && styles.btnNextDisabled,
            ]}
            onPress={handleFinish}
            disabled={answeredCount < QUESTIONS.length}
          >
            <Text style={styles.btnNextText}>Selesai</Text>
          </TouchableOpacity>
        </View>

        {/* Result Modal */}
        <Modal visible={showModal} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {hasDangerSign ? (
                <>
                  <View style={styles.modalIconContainerDanger}>
                    <Ionicons name="warning" size={48} color="#DC2626" />
                  </View>
                  <Text style={styles.modalTitleDanger}>
                    Tanda Bahaya Terdeteksi
                  </Text>
                  <Text style={styles.modalText}>
                    Segera ke fasilitas kesehatan terdekat untuk mendapatkan
                    penanganan medis.
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButtonDanger}
                    onPress={handleActionTindakan}
                  >
                    <Text style={styles.modalButtonText}>
                      Lihat Apa yang Harus Dilakukan
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={styles.modalIconContainerSafe}>
                    <Ionicons
                      name="checkmark-circle"
                      size={48}
                      color="#16A34A"
                    />
                  </View>
                  <Text style={styles.modalTitleSafe}>Kondisi Aman</Text>
                  <Text style={styles.modalText}>
                    Pantau kondisi anak dan lanjutkan perawatan di rumah.
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButtonSafe}
                    onPress={handleActionPerawatan}
                  >
                    <Text style={styles.modalButtonText}>
                      Lihat Panduan Perawatan
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => {
                  setShowModal(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.modalCloseText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3A8A",
    marginRight: 10,
    width: 45,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 4,
  },
  instructions: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 24,
    lineHeight: 22,
  },
  accordionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  accordionHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#F8FAFC",
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  numberCircleAnswered: {
    backgroundColor: "#2563EB",
  },
  numberText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 14,
  },
  accordionTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginRight: 12,
    lineHeight: 22,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    marginBottom: 12,
  },
  optionSelectedYa: {
    backgroundColor: "#E8F5E9",
    borderColor: "#81C784",
  },
  optionSelectedTidak: {
    backgroundColor: "#FFEBEE",
    borderColor: "#E57373",
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
  },
  optionTextSelectedYa: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  optionTextSelectedTidak: {
    color: "#C62828",
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#1E3A8A",
    marginBottom: 4,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingBottom: 60,
  },
  btnNext: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  btnNextDisabled: {
    backgroundColor: "#94A3B8",
  },
  btnNextText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainerDanger: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalIconContainerSafe: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitleDanger: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 12,
  },
  modalTitleSafe: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16A34A",
    textAlign: "center",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  modalButtonDanger: {
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  modalButtonSafe: {
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalCloseButton: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  modalCloseText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});
