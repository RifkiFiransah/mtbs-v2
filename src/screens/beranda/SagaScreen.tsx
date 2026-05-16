import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResultCard } from "../../components/ResultCard";
import { ScreenHeader } from "../../components/ScreenHeader";
import { TindakanItem } from "../../components/TindakanItem";
import { addSagaRecord } from "../../database/db";

// const { width } = Dimensions.get("window");

// Kategori soal SAGA
const PENAMPILAN_QUESTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const USAHA_NAPAS_QUESTIONS = [9, 10, 11, 12, 13];
const SIRKULASI_QUESTIONS = [14, 15, 16, 17, 18];

// Fungsi untuk menghitung klasifikasi berdasarkan jawaban
const calculateClassification = (answers: Record<number, boolean>) => {
  // Hitung jawaban "YA" di setiap kategori
  const penampilanYa = PENAMPILAN_QUESTIONS.some((q) => answers[q] === true);
  const usahaNapasYa = USAHA_NAPAS_QUESTIONS.some((q) => answers[q] === true);
  const sirkulasiYa = SIRKULASI_QUESTIONS.some((q) => answers[q] === true);

  // Jika tidak ada jawaban "YA" = STABIL
  if (!penampilanYa && !usahaNapasYa && !sirkulasiYa) {
    return "STABIL";
  }

  // Jika ada jawaban "YA" di semua 3 kategori = GAGAL JANTUNG PARU (Critical)
  if (penampilanYa && usahaNapasYa && sirkulasiYa) {
    return "GAGAL_JANTUNG_PARU";
  }

  // Jika ada jawaban "YA" tapi tidak di semua kategori = PENYAKIT SANGAT BERAT
  return "PENYAKIT_SANGAT_BERAT";
};

// Fungsi helper untuk mendapatkan status berdasarkan klasifikasi
const getStatusFromClassification = (
  classification: string,
): "Normal" | "Perlu Perhatian" | "Kritis" => {
  switch (classification) {
    case "STABIL":
      return "Normal";
    case "PENYAKIT_SANGAT_BERAT":
      return "Perlu Perhatian";
    case "GAGAL_JANTUNG_PARU":
      return "Kritis";
    default:
      return "Normal";
  }
};

// Fungsi helper untuk menyimpan hasil SAGA ke database
const saveSagaRecord = async (
  nik: string,
  alamat: string,
  endemisYa: boolean,
  rdtMalaria: string,
  nama: string,
  gender: string,
  umurTahun: string,
  umurBulan: string,
  berat: string,
  pbTb: string,
  lila: string,
  lingkarKepala: string,
  suhu: string,
  keluhan: string,
  kunjunganPertama: string,
  kunjunganUlang: string,
  answers: Record<number, boolean>,
) => {
  try {
    const today = new Date();
    const tanggalStr = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const jamStr = today.toTimeString().slice(0, 5); // Format: HH:MM

    const classification = calculateClassification(answers);
    const status = getStatusFromClassification(classification);

    await addSagaRecord(
      undefined, // child_id (opsional)
      tanggalStr,
      jamStr,
      nik,
      alamat,
      endemisYa ? "YA" : "TIDAK",
      rdtMalaria,
      nama,
      gender,
      umurTahun ? parseInt(umurTahun) : undefined,
      umurBulan ? parseInt(umurBulan) : undefined,
      berat ? parseFloat(berat) : undefined,
      pbTb ? parseFloat(pbTb) : undefined,
      lila ? parseFloat(lila) : undefined,
      lingkarKepala ? parseFloat(lingkarKepala) : undefined,
      suhu ? parseFloat(suhu) : undefined,
      keluhan,
      kunjunganPertama,
      kunjunganUlang,
      JSON.stringify(answers),
      classification,
      status,
    );

    console.log("✅ SAGA Record saved successfully");
    return true;
  } catch (error) {
    console.error("❌ Error saving SAGA record:", error);
    return false;
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

export const SagaScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0); // 0 = Data Anak, 1-18 = Questions, 19 = Hasil, 20 = Tindakan

  // Form State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [nik, setNik] = useState("");
  const [alamat, setAlamat] = useState("");
  const [endemisYa, setEndemisYa] = useState(false);
  const [rdtMalaria, setRdtMalaria] = useState("");
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [umurTahun, setUmurTahun] = useState("");
  const [umurBulan, setUmurBulan] = useState("");
  const [berat, setBerat] = useState("");
  const [pbTb, setPbTb] = useState("");
  const [lila, setLila] = useState("");
  const [lingkarKepala, setLingkarKepala] = useState("");
  const [suhu, setSuhu] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [kunjunganPertama, setKunjunganPertama] = useState("");
  const [kunjunganUlang, setKunjunganUlang] = useState("");

  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const handleAnswer = (val: boolean) => {
    setAnswers((prev) => ({ ...prev, [step]: val }));
  };

  const handleNext = () => {
    if (step < 20) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      if (navigation?.goBack) {
        navigation.goBack();
      }
    }
  };

  const renderDataAnak = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.label}>Tanggal Kunjungan</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={tanggal}
        editable={false}
      />

      <Text style={styles.label}>NIK</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan NIK"
        keyboardType="numeric"
        value={nik}
        onChangeText={setNik}
      />

      <Text style={styles.label}>Alamat</Text>
      <TextInput
        style={[styles.input, { minHeight: 80 }]}
        placeholder="Masukkan alamat lengkap"
        value={alamat}
        onChangeText={setAlamat}
        multiline
      />

      <Text style={styles.label}>Daerah Endemis Malaria</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setEndemisYa(true)}
        >
          <MaterialIcons
            name={endemisYa ? "radio-button-checked" : "radio-button-unchecked"}
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>YA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setEndemisYa(false)}
        >
          <MaterialIcons
            name={
              !endemisYa ? "radio-button-checked" : "radio-button-unchecked"
            }
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>TIDAK</Text>
        </TouchableOpacity>
      </View>

      {endemisYa && (
        <>
          <Text style={styles.label}>Jika YA, RDT Malaria</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioBtn}
              onPress={() => setRdtMalaria("(+)")}
            >
              <MaterialIcons
                name={
                  rdtMalaria === "(+)"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#1E3A8A"
              />
              <Text style={styles.radioText}>(+)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioBtn}
              onPress={() => setRdtMalaria("(-)")}
            >
              <MaterialIcons
                name={
                  rdtMalaria === "(-)"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#1E3A8A"
              />
              <Text style={styles.radioText}>(-)</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={styles.label}>Nama Anak</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama anak"
        value={nama}
        onChangeText={setNama}
      />

      <Text style={styles.label}>Jenis Kelamin</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setGender("Laki-laki")}
        >
          <MaterialIcons
            name={
              gender === "Laki-laki"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>Laki-laki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setGender("Perempuan")}
        >
          <MaterialIcons
            name={
              gender === "Perempuan"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>Perempuan</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Umur</Text>
      <View style={styles.rowInput}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 12, marginBottom: 10 }]}
          placeholder="0"
          keyboardType="numeric"
          value={umurTahun}
          onChangeText={setUmurTahun}
        />
        <Text style={styles.unitText}>Tahun</Text>
      </View>
      <View style={styles.rowInput}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 12 }]}
          placeholder="0"
          keyboardType="numeric"
          value={umurBulan}
          onChangeText={setUmurBulan}
        />
        <Text style={styles.unitText}>Bulan</Text>
      </View>

      <Text style={styles.label}>Berat Badan</Text>
      <View style={styles.rowInput}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="0"
          keyboardType="decimal-pad"
          value={berat}
          onChangeText={setBerat}
        />
        <Text style={styles.unitText}>Kg</Text>
      </View>

      <Text style={styles.label}>PB/TB</Text>
      <View style={styles.rowInput}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="0"
          keyboardType="decimal-pad"
          value={pbTb}
          onChangeText={setPbTb}
        />
        <Text style={styles.unitText}>Cm</Text>
      </View>

      {parseInt(umurBulan || "0") >= 6 || parseInt(umurTahun || "0") >= 1 ? (
        <>
          <Text style={styles.label}>LILA</Text>
          <View style={styles.rowInput}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="0"
              keyboardType="decimal-pad"
              value={lila}
              onChangeText={setLila}
            />
            <Text style={styles.unitText}>Cm</Text>
          </View>
        </>
      ) : null}

      <Text style={styles.label}>Lingkar Kepala</Text>
      <View style={styles.rowInput}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="0"
          keyboardType="decimal-pad"
          value={lingkarKepala}
          onChangeText={setLingkarKepala}
        />
        <Text style={styles.unitText}>Cm</Text>
      </View>

      <Text style={styles.label}>Suhu</Text>
      <View style={styles.rowInput}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="0"
          keyboardType="decimal-pad"
          value={suhu}
          onChangeText={setSuhu}
        />
        <Text style={styles.unitText}>°C</Text>
      </View>

      <Text style={styles.label}>Keluhan Utama</Text>
      <TextInput
        style={[styles.input, { minHeight: 80 }]}
        placeholder="Masukkan keluhan utama"
        value={keluhan}
        onChangeText={setKeluhan}
        multiline
      />

      <Text style={styles.label}>Kunjungan Pertama</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setKunjunganPertama("YA")}
        >
          <MaterialIcons
            name={
              kunjunganPertama === "YA"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>YA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setKunjunganPertama("TIDAK")}
        >
          <MaterialIcons
            name={
              kunjunganPertama === "TIDAK"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>TIDAK</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Kunjungan Ulang</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setKunjunganUlang("YA")}
        >
          <MaterialIcons
            name={
              kunjunganUlang === "YA"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>YA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => setKunjunganUlang("TIDAK")}
        >
          <MaterialIcons
            name={
              kunjunganUlang === "TIDAK"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={24}
            color="#1E3A8A"
          />
          <Text style={styles.radioText}>TIDAK</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
        <Text style={styles.primaryButtonText}>LANJUT PEMERIKSAAN</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderQuestion = () => {
    const qIndex = step - 1;
    const question = SAGA_QUESTIONS[qIndex];
    const isAnswered = answers[step] !== undefined;
    const totalQuestions = 15; // Total dari TANYAKAN(3) + PENAMPILAN (5) + USAHA NAPAS (4) + SIRKULASI (3)

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.progressText}>
          {step}/{totalQuestions}
        </Text>
        <Text style={styles.categoryText}>{question.category}</Text>

        <View style={styles.iconPlaceholder}>
          <MaterialIcons
            name={
              question.category === "PENAMPILAN"
                ? "face"
                : question.category === "USAHA NAPAS"
                  ? "masks"
                  : "favorite"
            }
            size={80}
            color="#1E3A8A"
          />
        </View>

        <Text style={styles.questionText}>{question.text}</Text>

        <View style={styles.answerButtons}>
          <TouchableOpacity
            style={[
              styles.answerBtn,
              answers[step] === true && styles.answerBtnActiveYes,
            ]}
            onPress={() => handleAnswer(true)}
          >
            <Text
              style={[
                styles.answerBtnText,
                answers[step] === true && { color: "white" },
              ]}
            >
              YA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.answerBtn,
              answers[step] === false && styles.answerBtnActiveNo,
            ]}
            onPress={() => handleAnswer(false)}
          >
            <Text
              style={[
                styles.answerBtnText,
                answers[step] === false && { color: "white" },
              ]}
            >
              TIDAK
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dotsContainer}>
          {SAGA_QUESTIONS.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                step - 1 === idx
                  ? styles.dotActive
                  : answers[idx + 1] !== undefined
                    ? styles.dotFilled
                    : null,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { width: "100%" },
            !isAnswered && { backgroundColor: "#ccc" },
          ]}
          onPress={handleNext}
          disabled={!isAnswered}
        >
          <Text style={styles.primaryButtonText}>LANJUT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHasil = () => {
    const classification = calculateClassification(answers);

    const getClassificationData = () => {
      switch (classification) {
        case "STABIL":
          return {
            title: "STABIL",
            description:
              "Tidak terdapat salah satu gejala/tanda di atas.\n\nTidak perlu tindakan khusus. Lanjutkan perawatan sesuai keluhan.",
            isDanger: false,
            iconName: "check-circle" as const,
            buttonText: "SELESAI",
            showTindakan: false,
          };
        case "PENYAKIT_SANGAT_BERAT":
          return {
            title: "PENYAKIT SANGAT BERAT",
            description:
              "Terdapat satu atau lebih tanda berikut:\n• Tidak bisa minum/menyusu\n• Memuntahkan semua makanan/minuman\n• Pernapasan kejang selama sakit ini\n• Diembalkan satu/lebih gejala pada penampilan ATAU usaha napas ATAU sirkulasi",
            isDanger: true,
            iconName: "warning" as const,
            buttonText: "LIHAT DETAIL",
            showTindakan: true,
          };
        case "GAGAL_JANTUNG_PARU":
          return {
            title: "GAGAL JANTUNG PARU",
            description:
              "Terdapat satu atau lebih gejala/tanda pada setiap komponen penampilan serta setiap komponen sirkulasi.",
            isDanger: true,
            iconName: "warning" as const,
            buttonText: "SOS DARURAT",
            showTindakan: true,
          };
        default:
          return {
            title: "STABIL",
            description: "",
            isDanger: false,
            iconName: "check-circle" as const,
            buttonText: "SELESAI",
            showTindakan: false,
          };
      }
    };

    const classificationData = getClassificationData();

    const handleFinishOrContinue = async () => {
      if (classificationData.showTindakan) {
        // Jika ada tindakan, lanjut ke step 20 (Tindakan)
        setStep(20);
      } else {
        // Jika STABIL, simpan record dan kembali
        await saveSagaRecord(
          nik,
          alamat,
          endemisYa,
          rdtMalaria,
          nama,
          gender,
          umurTahun,
          umurBulan,
          berat,
          pbTb,
          lila,
          lingkarKepala,
          suhu,
          keluhan,
          kunjunganPertama,
          kunjunganUlang,
          answers,
        );
        // eslint-disable-next-line no-unused-expressions
        navigation?.navigate ? navigation.navigate("MainTabs") : null;
      }
    };

    return (
      <ScrollView style={styles.content}>
        <ResultCard
          title={classificationData.title}
          description={classificationData.description}
          isDanger={classificationData.isDanger}
          iconName={classificationData.iconName}
        />

        <TouchableOpacity
          style={[
            styles.primaryButton,
            classification === "GAGAL_JANTUNG_PARU" && styles.sosButton,
          ]}
          onPress={handleFinishOrContinue}
        >
          <Text
            style={[
              styles.primaryButtonText,
              classification === "GAGAL_JANTUNG_PARU" && { color: "#fff" },
            ]}
          >
            {classificationData.buttonText}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderTindakan = () => {
    const classification = calculateClassification(answers);
    const isCritical = classification === "GAGAL_JANTUNG_PARU";

    return (
      <ScrollView style={styles.content}>
        <Text style={styles.tindakanRedTitle}>TINDAKAN SEGERA</Text>

        {isCritical ? (
          // Tindakan untuk GAGAL JANTUNG PARU (Critical)
          <>
            <TindakanItem
              iconName="medkit-outline"
              text="Lakukan Bantuan Hidup Dasar (BHD)"
            />
            <TindakanItem iconName="medical" text="Rujuk segera" />
            <TindakanItem
              iconName="git-network-outline"
              text="Berikan oksigen"
            />
            <TindakanItem iconName="call" text="Hubungi ambulans" />

            <TouchableOpacity style={styles.sosButton}>
              <Ionicons
                name="call"
                size={24}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.sosButtonText}>SOS DARURAT</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Tindakan untuk PENYAKIT SANGAT BERAT
          <>
            <TindakanItem iconName="medical" text="Rujuk segera" />
            <TindakanItem
              iconName="git-network-outline"
              text="Berikan oksigen bila tersedia"
            />
            <TindakanItem iconName="medkit-outline" text="Cegah hipoglikemia" />
            <TindakanItem
              iconName="thermometer-outline"
              text="Jaga kehangatan tubuh"
            />

            <TouchableOpacity style={styles.sosButton}>
              <Ionicons
                name="call"
                size={24}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.sosButtonText}>HUBUNGI IGD</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            await saveSagaRecord(
              nik,
              alamat,
              endemisYa,
              rdtMalaria,
              nama,
              gender,
              umurTahun,
              umurBulan,
              berat,
              pbTb,
              lila,
              lingkarKepala,
              suhu,
              keluhan,
              kunjunganPertama,
              kunjunganUlang,
              answers,
            );
            // eslint-disable-next-line no-unused-expressions
            navigation?.navigate ? navigation.navigate("MainTabs") : null;
          }}
        >
          <Text style={styles.secondaryButtonText}>KEMBALI KE BERANDA</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={
          step === 0
            ? "Data Anak"
            : step <= 18
              ? "Pemeriksaan SAGA"
              : step === 19
                ? "Hasil Klasifikasi"
                : "Tindakan & Rujukan"
        }
        onBackPress={handleBack}
      />

      {step === 0 && renderDataAnak()}
      {step >= 1 && step <= 15 && renderQuestion()}
      {step === 19 && renderHasil()}
      {step === 20 && renderTindakan()}
    </SafeAreaView>
  );
};

export default SagaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  rowInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#374151",
    width: 40,
    fontWeight: "600",
  },
  radioGroup: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#111827",
  },
  primaryButton: {
    backgroundColor: "#0047AB",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 65,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  questionContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#6B7280",
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0047AB",
    marginTop: 10,
  },
  iconPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  questionText: {
    fontSize: 20,
    textAlign: "center",
    color: "#111827",
    fontWeight: "600",
    marginBottom: 40,
  },
  answerButtons: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
    marginBottom: 40,
  },
  answerBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  answerBtnActiveYes: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },
  answerBtnActiveNo: {
    // hijau untuk "TIDAK" karena tidak ada tanda bahaya, agar lebih intuitif
    backgroundColor: "#10B981", // Or white with grey border as selected "TIDAK"
    borderColor: "#10B981",
  },
  answerBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  dotActive: {
    backgroundColor: "#0047AB",
  },
  dotFilled: {
    backgroundColor: "#93C5FD",
  },

  tindakanRedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 24,
    marginTop: 10,
  },

  sosButton: {
    backgroundColor: "#DC2626",
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 16,
  },
  sosButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#0047AB",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: "#0047AB",
    fontSize: 16,
    fontWeight: "bold",
  },
});
