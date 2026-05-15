import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const QUIZ_QUESTIONS = [
  {
    id: "1",
    question: "Apa yang dimaksud dengan tanda bahaya umum pada anak?",
    options: [
      "Kondisi ringan yang tidak perlu penanganan",
      "Kondisi yang dapat berkembang menjadi penyakit berat jika tidak ditangani",
      "Hanya demam biasa",
    ],
    correct: 1,
  },
  {
    id: "2",
    question: "Berapa suhu tubuh anak yang dianggap demam tinggi?",
    options: ["≥37°C", "≥38°C", "≥39°C"],
    correct: 2,
  },
  {
    id: "3",
    question: "Apa itu SAGA dalam pemeriksaan anak?",
    options: [
      "Penyakit yang berbahaya",
      "Pemeriksaan meliputi Penampilan, Usaha Napas, Sirkulasi",
      "Obat penurun demam",
    ],
    correct: 1,
  },
];

export const KuisEdukasiScreen = ({ navigation }: any) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    if (index === QUIZ_QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kuis Edukasi</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>8. KUIS EDUKASI</Text>
        </View>

        <View style={styles.contentBox}>
          {showScore ? (
            <View style={styles.resultContainer}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreNumber}>{score}</Text>
                <Text style={styles.scoreTotal}>
                  dari {QUIZ_QUESTIONS.length}
                </Text>
              </View>

              <Text style={styles.resultTitle}>
                {score === QUIZ_QUESTIONS.length
                  ? "Sempurna! 🎉"
                  : score >= QUIZ_QUESTIONS.length * 0.7
                    ? "Bagus! 👏"
                    : "Pelajari lebih lanjut 📚"}
              </Text>

              <Text style={styles.resultDesc}>
                Anda menjawab {score} dari {QUIZ_QUESTIONS.length} pertanyaan
                dengan benar.
              </Text>

              <TouchableOpacity
                style={styles.restartButton}
                onPress={handleRestart}
              >
                <MaterialIcons name="refresh" size={20} color="#fff" />
                <Text style={styles.restartButtonText}>Ulang Kuis</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation?.goBack()}
              >
                <Text style={styles.closeButtonText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.quizContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.questionNumber}>
                Pertanyaan {currentQuestion + 1} dari {QUIZ_QUESTIONS.length}
              </Text>

              <Text style={styles.question}>
                {QUIZ_QUESTIONS[currentQuestion].question}
              </Text>

              <View style={styles.optionsContainer}>
                {QUIZ_QUESTIONS[currentQuestion].options.map(
                  (option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.option,
                        selectedAnswer === index && styles.optionSelected,
                      ]}
                      onPress={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <View
                        style={[
                          styles.optionCircle,
                          selectedAnswer === index &&
                            styles.optionCircleSelected,
                        ]}
                      >
                        {selectedAnswer === index && (
                          <Text style={styles.optionCircleText}>
                            {index === QUIZ_QUESTIONS[currentQuestion].correct
                              ? "✓"
                              : "✗"}
                          </Text>
                        )}
                      </View>
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.nextButton,
                  selectedAnswer === null && { opacity: 0.5 },
                ]}
                onPress={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestion === QUIZ_QUESTIONS.length - 1
                    ? "Selesai"
                    : "Lanjut"}
                </Text>
                <MaterialIcons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default KuisEdukasiScreen;

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
  quizContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0047AB",
  },
  questionNumber: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  optionSelected: {
    borderColor: "#0047AB",
    backgroundColor: "#EFF6FF",
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optionCircleSelected: {
    borderColor: "#0047AB",
    backgroundColor: "#0047AB",
  },
  optionCircleText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  nextButton: {
    backgroundColor: "#0047AB",
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  resultContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#EFF6FF",
    borderWidth: 4,
    borderColor: "#0047AB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: "#0047AB",
  },
  scoreTotal: {
    fontSize: 14,
    color: "#6B7280",
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 28,
    textAlign: "center",
  },
  restartButton: {
    backgroundColor: "#0047AB",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  closeButton: {
    borderWidth: 2,
    borderColor: "#0047AB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  closeButtonText: {
    color: "#0047AB",
    fontSize: 16,
    fontWeight: "bold",
  },
});
