import * as SQLite from "expo-sqlite";

// Membuka atau membuat database baru
const db = SQLite.openDatabaseSync("mtbspintar.db");

export const initDB = async () => {
  try {
    await db.withExclusiveTransactionAsync(async (txn) => {
      // Membuat tabel untuk profil anak
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS children (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          date_of_birth TEXT NOT NULL,
          gender TEXT,
          blood_type TEXT,
          foto_uri TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Membuat tabel untuk profil ibu
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS mothers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age TEXT,
          phone TEXT,
          foto_uri TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Membuat tabel untuk hasil pemeriksaan SAGA
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS saga_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          child_id INTEGER,
          tanggal_pemeriksaan TEXT NOT NULL,
          jam_pemeriksaan TEXT NOT NULL,
          nik TEXT,
          alamat TEXT,
          daerah_endemis_malaria TEXT,
          rdt_malaria_result TEXT,
          nama_anak TEXT NOT NULL,
          gender TEXT,
          umur_tahun INTEGER,
          umur_bulan INTEGER,
          berat_badan REAL,
          pb_tb REAL,
          lila REAL,
          lingkar_kepala REAL,
          suhu REAL,
          keluhan_utama TEXT,
          kunjungan_pertama TEXT,
          kunjungan_ulang TEXT,
          answers TEXT NOT NULL,
          classification TEXT,
          status TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (child_id) REFERENCES children(id)
        );
      `);

      // Seeding profil ibu jika belum ada
      const existingMotherCount = await txn.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM mothers",
      );

      if (existingMotherCount && existingMotherCount.count === 0) {
        await txn.runAsync(
          `INSERT INTO mothers (name, age, phone) VALUES (?, ?, ?)`,
          ["Siti Aisyah", "28 Tahun", "0812-3456-7890"],
        );
      }

      // Seeding profil anak jika belum ada
      const existingChildCount = await txn.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM children",
      );

      if (existingChildCount && existingChildCount.count === 0) {
        await txn.runAsync(
          `INSERT INTO children (name, date_of_birth, gender, blood_type) VALUES (?, ?, ?, ?)`,
          ["Muhammad Zaki", "1 Tahun 8 Bulan", "Laki-laki", "O"],
        );
      }

      // Seeding data SAGA awal jika belum ada
      const existingSagaCount = await txn.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM saga_records",
      );

      if (existingSagaCount && existingSagaCount.count === 0) {
        const today = new Date();

        // Data pemeriksaan 1 (2 hari lalu) - PENYAKIT SANGAT BERAT
        const date1 = new Date(today);
        date1.setDate(date1.getDate() - 2);
        const date1Str = date1.toISOString().split("T")[0];

        // Data pemeriksaan 2 (1 hari lalu) - STABIL
        const date2 = new Date(today);
        date2.setDate(date2.getDate() - 1);
        const date2Str = date2.toISOString().split("T")[0];

        // Data pemeriksaan 3 (hari ini) - GAGAL JANTUNG PARU
        const date3Str = today.toISOString().split("T")[0];

        // Answers untuk PENYAKIT SANGAT BERAT (tanda di penampilan dan usaha napas)
        const answers1 = JSON.stringify({
          1: true,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: true,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
        });

        // Answers untuk STABIL (semua tidak ada tanda bahaya)
        const answers2 = JSON.stringify({
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
          12: false,
          13: false,
          14: false,
          15: false,
          16: false,
          17: false,
          18: false,
        });

        // Answers untuk GAGAL JANTUNG PARU (tanda di semua 3 kategori)
        const answers3 = JSON.stringify({
          1: true,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: true,
          10: false,
          11: false,
          12: false,
          13: false,
          14: true,
          15: false,
          16: false,
          17: false,
          18: false,
        });

        const dummySagaRecords = [
          {
            child_id: 1,
            tanggal_pemeriksaan: date1Str,
            jam_pemeriksaan: "08:45",
            nama_anak: "Muhammad Zaki",
            umur: "1 tahun 8 bulan",
            berat_badan: 13.5,
            tinggi_badan: 88.0,
            gender: "Laki-laki",
            keluhan_utama: "Kejang dan kesulitan bernapas",
            answers: answers1,
            classification: "PENYAKIT_SANGAT_BERAT",
            status: "Perlu Perhatian",
          },
          {
            child_id: 1,
            tanggal_pemeriksaan: date2Str,
            jam_pemeriksaan: "10:15",
            nama_anak: "Muhammad Zaki",
            umur: "1 tahun 8 bulan",
            berat_badan: 13.6,
            tinggi_badan: 88.5,
            gender: "Laki-laki",
            keluhan_utama: "Demam ringan",
            answers: answers2,
            classification: "STABIL",
            status: "Normal",
          },
          {
            child_id: 1,
            tanggal_pemeriksaan: date3Str,
            jam_pemeriksaan: "09:30",
            nama_anak: "Muhammad Zaki",
            umur: "1 tahun 8 bulan",
            berat_badan: 13.7,
            tinggi_badan: 89.0,
            gender: "Laki-laki",
            keluhan_utama: "Kejang, sesak napas, dan pucat",
            answers: answers3,
            classification: "GAGAL_JANTUNG_PARU",
            status: "Kritis",
          },
        ];

        for (const record of dummySagaRecords) {
          await txn.runAsync(
            `INSERT INTO saga_records (
              child_id, tanggal_pemeriksaan, jam_pemeriksaan, nama_anak, 
              umur, berat_badan, tinggi_badan, gender, keluhan_utama, 
              answers, classification, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              record.child_id,
              record.tanggal_pemeriksaan,
              record.jam_pemeriksaan,
              record.nama_anak,
              record.umur,
              record.berat_badan,
              record.tinggi_badan,
              record.gender,
              record.keluhan_utama,
              record.answers,
              record.classification,
              record.status,
            ],
          );
        }
      }
    });

    console.log("✅ Database berhasil diinisialisasi");
  } catch (error) {
    console.error("❌ Gagal menginisialisasi database:", error);
  }
};

// =======================
// Fungsi CRUD Children
// =======================

export interface ChildRow {
  id: number;
  name: string;
  date_of_birth: string;
  gender?: string;
  blood_type?: string;
  foto_uri?: string;
  created_at?: string;
}

export const getChildren = async (): Promise<ChildRow[]> => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM children ORDER BY created_at DESC",
    );
  } catch (error) {
    console.error("Error fetching children:", error);
    return [];
  }
};

export const addChild = async (
  name: string,
  date_of_birth: string,
  gender?: string,
  blood_type?: string,
) => {
  try {
    return await db.runAsync(
      `INSERT INTO children (name, date_of_birth, gender, blood_type) VALUES (?, ?, ?, ?)`,
      [name, date_of_birth, gender || "", blood_type || ""],
    );
  } catch (error) {
    console.error("Error adding child:", error);
  }
};

export const updateChild = async (
  id: number,
  name: string,
  date_of_birth: string,
  gender?: string,
  blood_type?: string,
  foto_uri?: string,
) => {
  try {
    await db.runAsync(
      `UPDATE children SET name = ?, date_of_birth = ?, gender = ?, blood_type = ?, foto_uri = ? WHERE id = ?`,
      [
        name,
        date_of_birth,
        gender || "",
        blood_type || "",
        foto_uri || null,
        id,
      ],
    );
    return true;
  } catch (error) {
    console.error("Error updating child:", error);
    return false;
  }
};

// =======================
// Fungsi CRUD Mothers
// =======================

export interface MotherRow {
  id: number;
  name: string;
  age?: string;
  phone?: string;
  foto_uri?: string;
  created_at?: string;
}

export const getMothers = async (): Promise<MotherRow[]> => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM mothers ORDER BY created_at DESC",
    );
  } catch (error) {
    console.error("Error fetching mothers:", error);
    return [];
  }
};

export const updateMother = async (
  id: number,
  name: string,
  age: string,
  phone: string,
  foto_uri?: string,
) => {
  try {
    await db.runAsync(
      `UPDATE mothers SET name = ?, age = ?, phone = ?, foto_uri = ? WHERE id = ?`,
      [name, age, phone, foto_uri || null, id],
    );
    return true;
  } catch (error) {
    console.error("Error updating mother:", error);
    return false;
  }
};

// =======================
// Fungsi CRUD SAGA Records
// =======================

export interface SagaRecord {
  id: number;
  child_id?: number;
  tanggal_pemeriksaan: string;
  jam_pemeriksaan: string;
  nik?: string;
  alamat?: string;
  daerah_endemis_malaria?: string;
  rdt_malaria_result?: string;
  nama_anak: string;
  gender?: string;
  umur_tahun?: number;
  umur_bulan?: number;
  berat_badan?: number;
  pb_tb?: number;
  lila?: number;
  lingkar_kepala?: number;
  suhu?: number;
  keluhan_utama?: string;
  kunjungan_pertama?: string;
  kunjungan_ulang?: string;
  answers: string; // JSON string
  classification: string;
  status?: string;
  created_at?: string;
}

export const getSagaRecords = async (): Promise<SagaRecord[]> => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM saga_records ORDER BY tanggal_pemeriksaan DESC, jam_pemeriksaan DESC",
    );
  } catch (error) {
    console.error("Error fetching saga records:", error);
    return [];
  }
};

export const getSagaRecordById = async (
  id: number,
): Promise<SagaRecord | null> => {
  try {
    return await db.getFirstAsync("SELECT * FROM saga_records WHERE id = ?", [
      id,
    ]);
  } catch (error) {
    console.error("Error fetching saga record by id:", error);
    return null;
  }
};

export const addSagaRecord = async (
  child_id: number | undefined,
  tanggal_pemeriksaan: string,
  jam_pemeriksaan: string,
  nik?: string,
  alamat?: string,
  daerah_endemis_malaria?: string,
  rdt_malaria_result?: string,
  nama_anak?: string,
  gender?: string,
  umur_tahun?: number,
  umur_bulan?: number,
  berat_badan?: number,
  pb_tb?: number,
  lila?: number,
  lingkar_kepala?: number,
  suhu?: number,
  keluhan_utama?: string,
  kunjungan_pertama?: string,
  kunjungan_ulang?: string,
  answers?: string,
  classification?: string,
  status?: string,
) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO saga_records (
        child_id, tanggal_pemeriksaan, jam_pemeriksaan, nik, alamat, 
        daerah_endemis_malaria, rdt_malaria_result, nama_anak, gender,
        umur_tahun, umur_bulan, berat_badan, pb_tb, lila, lingkar_kepala,
        suhu, keluhan_utama, kunjungan_pertama, kunjungan_ulang, 
        answers, classification, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        child_id ?? null,
        tanggal_pemeriksaan,
        jam_pemeriksaan,
        nik || null,
        alamat || null,
        daerah_endemis_malaria || null,
        rdt_malaria_result || null,
        nama_anak || null,
        gender || null,
        umur_tahun ?? null,
        umur_bulan ?? null,
        berat_badan ?? null,
        pb_tb ?? null,
        lila ?? null,
        lingkar_kepala ?? null,
        suhu ?? null,
        keluhan_utama || null,
        kunjungan_pertama || null,
        kunjungan_ulang || null,
        answers || "{}",
        classification || null,
        status || null,
      ],
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding saga record:", error);
    return null;
  }
};

export const updateSagaRecord = async (
  id: number,
  tanggal_pemeriksaan: string,
  jam_pemeriksaan: string,
  nik?: string,
  alamat?: string,
  daerah_endemis_malaria?: string,
  rdt_malaria_result?: string,
  nama_anak?: string,
  gender?: string,
  umur_tahun?: number,
  umur_bulan?: number,
  berat_badan?: number,
  pb_tb?: number,
  lila?: number,
  lingkar_kepala?: number,
  suhu?: number,
  keluhan_utama?: string,
  kunjungan_pertama?: string,
  kunjungan_ulang?: string,
  answers?: string,
  classification?: string,
  status?: string,
) => {
  try {
    await db.runAsync(
      `UPDATE saga_records SET 
        tanggal_pemeriksaan = ?, jam_pemeriksaan = ?, nik = ?, alamat = ?,
        daerah_endemis_malaria = ?, rdt_malaria_result = ?, nama_anak = ?,
        gender = ?, umur_tahun = ?, umur_bulan = ?, berat_badan = ?, pb_tb = ?,
        lila = ?, lingkar_kepala = ?, suhu = ?, keluhan_utama = ?,
        kunjungan_pertama = ?, kunjungan_ulang = ?, answers = ?, 
        classification = ?, status = ?
       WHERE id = ?`,
      [
        tanggal_pemeriksaan,
        jam_pemeriksaan,
        nik || null,
        alamat || null,
        daerah_endemis_malaria || null,
        rdt_malaria_result || null,
        nama_anak || null,
        gender || null,
        umur_tahun ?? null,
        umur_bulan ?? null,
        berat_badan ?? null,
        pb_tb ?? null,
        lila ?? null,
        lingkar_kepala ?? null,
        suhu ?? null,
        keluhan_utama || null,
        kunjungan_pertama || null,
        kunjungan_ulang || null,
        answers || "{}",
        classification || null,
        status || null,
        id,
      ],
    );
    return true;
  } catch (error) {
    console.error("Error updating saga record:", error);
    return false;
  }
};

export const deleteSagaRecord = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM saga_records WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting saga record:", error);
    return false;
  }
};

export default db;
