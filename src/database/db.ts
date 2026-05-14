import * as SQLite from "expo-sqlite";

// Membuka atau membuat database baru
const db = SQLite.openDatabaseSync("mtbspintar.db");

export const initDB = async () => {
  try {
    // Membuat tabel untuk menyimpan pertanyaan MTBS
    await db.withExclusiveTransactionAsync(async (txn) => {
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS questions (
          id INTEGER PRIMARY KEY,
          question_text TEXT NOT NULL,
          category TEXT NOT NULL,
          answer_type TEXT DEFAULT 'yes_no',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Membuat tabel untuk riwayat cek kesehatan
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS check_history (
          id INTEGER PRIMARY KEY,
          date_checked TEXT NOT NULL,
          result_summary TEXT,
          details TEXT,
          status TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Membuat tabel untuk pengingat
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS reminders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          reminder_date TEXT NOT NULL,
          reminder_time TEXT,
          is_completed INTEGER DEFAULT 0,
          notification_id TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Membuat tabel untuk catatan (rekam medis anak)
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS catatan (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          child_id INTEGER,
          tanggal_pemeriksaan TEXT NOT NULL,
          jam_pemeriksaan TEXT NOT NULL,
          suhu_tubuh REAL,
          nafsu_makan TEXT,
          kondisi_anak TEXT,
          napas_anak TEXT,
          keluhan_utama TEXT,
          tanda_bahaya TEXT,
          penanganan TEXT,
          penanganan_lainnya TEXT,
          catatan_tambahan TEXT,
          foto_uri TEXT,
          status_kondisi TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Membuat tabel untuk profil anak
      await txn.execAsync(`
        CREATE TABLE IF NOT EXISTS children (
          id INTEGER PRIMARY KEY,
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
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          age TEXT,
          phone TEXT,
          foto_uri TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Tambahkan kolom foto_uri jika tabel sudah ada dan belum memiliki kolom tersebut (migrasi ringan)
      const childrenInfo = await txn.getAllAsync<{ name: string }>(
        "PRAGMA table_info(children)",
      );
      if (!childrenInfo.some((col) => col.name === "foto_uri")) {
        await txn.execAsync("ALTER TABLE children ADD COLUMN foto_uri TEXT;");
      }

      const mothersInfo = await txn.getAllAsync<{ name: string }>(
        "PRAGMA table_info(mothers)",
      );
      if (!mothersInfo.some((col) => col.name === "foto_uri")) {
        await txn.execAsync("ALTER TABLE mothers ADD COLUMN foto_uri TEXT;");
      }

      // Tambahkan kolom notification_id jika tabel reminders sudah ada dan belum memiliki kolom tersebut (migrasi)
      const remindersInfo = await txn.getAllAsync<{ name: string }>(
        "PRAGMA table_info(reminders)",
      );
      if (!remindersInfo.some((col) => col.name === "notification_id")) {
        await txn.execAsync(
          "ALTER TABLE reminders ADD COLUMN notification_id TEXT;",
        );
      }

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

      // Seeding pertanyaan awal jika belum ada
      const existingCount = await txn.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM questions",
      );

      if (existingCount && existingCount.count === 0) {
        const questions = [
          { category: "Gejala Umum", question: "Apakah balita demam?" },
          {
            category: "Gejala Umum",
            question: "Apakah balita menangis dengan keras dan terus-menerus?",
          },
          {
            category: "Kondisi Umum",
            question: "Apakah balita dapat minum atau menyusu seperti biasa?",
          },
          { category: "Kondisi Umum", question: "Apakah balita muntah?" },
          {
            category: "Pernapasan",
            question: "Apakah balita mengalami kesulitan bernapas?",
          },
          {
            category: "Pernapasan",
            question: "Apakah balita mengi atau berbunyi saat bernapas?",
          },
        ];

        for (const q of questions) {
          await txn.runAsync(
            `INSERT INTO questions (question_text, category, answer_type) VALUES (?, ?, ?)`,
            [q.question, q.category, "yes_no"],
          );
        }
      }

      // Seeding pengingat awal jika belum ada
      const existingReminderCount = await txn.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM reminders",
      );

      if (existingReminderCount && existingReminderCount.count === 0) {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        // Buat dummy untuk besok
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];

        const dummyReminders = [
          {
            title: "Beri Obat Penurun Panas",
            description: "Paracetamol 5ml jika suhu > 38",
            reminder_date: todayStr,
            reminder_time: "08:00",
            is_completed: 0,
          },
          {
            title: "Cek Suhu Tubuh",
            description: "Gunakan termometer di ketiak",
            reminder_date: todayStr,
            reminder_time: "12:00",
            is_completed: 0,
          },
          {
            title: "Berikan ASI/Cairan",
            description: "Pastikan anak tidak dehidrasi",
            reminder_date: todayStr,
            reminder_time: "15:00",
            is_completed: 1,
          },
          {
            title: "Kontrol ke Dokter",
            description: "Cek perkembangannya",
            reminder_date: tomorrowStr,
            reminder_time: "09:00",
            is_completed: 0,
          },
        ];

        for (const r of dummyReminders) {
          await txn.runAsync(
            `INSERT INTO reminders (title, description, reminder_date, reminder_time, is_completed) VALUES (?, ?, ?, ?, ?)`,
            [
              r.title,
              r.description,
              r.reminder_date,
              r.reminder_time,
              r.is_completed,
            ],
          );
        }
      }

      // Seeding catatan awal jika belum ada
      const existingCatatanCount = await txn.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM catatan",
      );

      if (existingCatatanCount && existingCatatanCount.count === 0) {
        const today = new Date();

        const date1 = new Date(today);
        date1.setDate(date1.getDate() - 2);
        const date1Str = date1.toISOString().split("T")[0];

        const date2 = new Date(today);
        date2.setDate(date2.getDate() - 1);
        const date2Str = date2.toISOString().split("T")[0];

        const date3 = new Date(today);
        const date3Str = date3.toISOString().split("T")[0];

        const dummyCatatan = [
          {
            tanggal_pemeriksaan: date1Str,
            jam_pemeriksaan: "08:45",
            suhu_tubuh: 37.8,
            nafsu_makan: "Berkurang",
            kondisi_anak: "Lemas",
            napas_anak: "Normal",
            keluhan_utama: JSON.stringify({
              Batuk: false,
              Pilek: false,
              Demam: true,
              Muntah: false,
              Rewel: false,
              Lemes: true,
              Lainnya: false,
            }),
            tanda_bahaya: JSON.stringify({
              Kejang: false,
              "Tidak sadar": false,
              "Tidak bisa minum": false,
              "Muntah terus": false,
              "Sesak napas": false,
            }),
            penanganan: JSON.stringify({
              "Kompres hangat": true,
              "Diberi obat": false,
              "Diberi ASI / cairan": true,
              "Istirahat yang cukup": true,
              "Dibawa ke puskesmas / dokter": false,
              Lainnya: false,
            }),
            penanganan_lainnya: "",
            catatan_tambahan:
              "Anak terlihat lemas dan kurang nafsu makan. Suhu agak tinggi.",
            status_kondisi: "Perlu Perhatian",
          },
          {
            tanggal_pemeriksaan: date2Str,
            jam_pemeriksaan: "10:15",
            suhu_tubuh: 36.6,
            nafsu_makan: "Baik",
            kondisi_anak: "Aktif",
            napas_anak: "Normal",
            keluhan_utama: JSON.stringify({
              Batuk: false,
              Pilek: false,
              Demam: false,
              Muntah: false,
              Rewel: false,
              Lemes: false,
              Lainnya: false,
            }),
            tanda_bahaya: JSON.stringify({
              Kejang: false,
              "Tidak sadar": false,
              "Tidak bisa minum": false,
              "Muntah terus": false,
              "Sesak napas": false,
            }),
            penanganan: JSON.stringify({
              "Kompres hangat": false,
              "Diberi obat": false,
              "Diberi ASI / cairan": true,
              "Istirahat yang cukup": true,
              "Dibawa ke puskesmas / dokter": false,
              Lainnya: false,
            }),
            penanganan_lainnya: "",
            catatan_tambahan: "Suhu sudah kembali normal.",
            status_kondisi: "Normal",
          },
          {
            tanggal_pemeriksaan: date3Str,
            jam_pemeriksaan: "09:30",
            suhu_tubuh: 36.7,
            nafsu_makan: "Baik",
            kondisi_anak: "Aktif",
            napas_anak: "Normal",
            keluhan_utama: JSON.stringify({
              Batuk: true,
              Pilek: false,
              Demam: false,
              Muntah: false,
              Rewel: false,
              Lemes: false,
              Lainnya: false,
            }),
            tanda_bahaya: JSON.stringify({
              Kejang: false,
              "Tidak sadar": false,
              "Tidak bisa minum": false,
              "Muntah terus": false,
              "Sesak napas": false,
            }),
            penanganan: JSON.stringify({
              "Kompres hangat": false,
              "Diberi obat": false,
              "Diberi ASI / cairan": true,
              "Istirahat yang cukup": true,
              "Dibawa ke puskesmas / dokter": false,
              Lainnya: false,
            }),
            penanganan_lainnya: "",
            catatan_tambahan: "Ada sedikit batuk ringan.",
            status_kondisi: "Normal",
          },
        ];

        for (const c of dummyCatatan) {
          await txn.runAsync(
            `INSERT INTO catatan (
              tanggal_pemeriksaan, jam_pemeriksaan, suhu_tubuh, nafsu_makan, 
              kondisi_anak, napas_anak, keluhan_utama, tanda_bahaya, 
              penanganan, penanganan_lainnya, catatan_tambahan, status_kondisi
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              c.tanggal_pemeriksaan,
              c.jam_pemeriksaan,
              c.suhu_tubuh,
              c.nafsu_makan,
              c.kondisi_anak,
              c.napas_anak,
              c.keluhan_utama,
              c.tanda_bahaya,
              c.penanganan,
              c.penanganan_lainnya,
              c.catatan_tambahan,
              c.status_kondisi,
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

// Query functions
export const getQuestions = async () => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM questions ORDER BY category, id",
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export const getCheckHistory = async () => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM check_history ORDER BY date_checked DESC",
    );
  } catch (error) {
    console.error("Error fetching check history:", error);
    return [];
  }
};

export const addCheckHistory = async (
  date: string,
  result_summary: string,
  details?: string,
) => {
  try {
    return await db.runAsync(
      "INSERT INTO check_history (date_checked, result_summary, details) VALUES (?, ?, ?)",
      [date, result_summary, details || ""],
    );
  } catch (error) {
    console.error("Error adding check history:", error);
    return null;
  }
};

// =======================
// Fungsi CRUD Pengingat
// =======================

export interface ReminderRow {
  id: number;
  title: string;
  description: string;
  reminder_date: string;
  reminder_time: string;
  is_completed: number;
  notification_id?: string;
  created_at?: string;
}

export const getReminders = async (): Promise<ReminderRow[]> => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM reminders ORDER BY reminder_date ASC, reminder_time ASC",
    );
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }
};

export const addReminder = async (
  title: string,
  description: string,
  reminder_date: string,
  reminder_time: string,
  notification_id?: string,
) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO reminders (title, description, reminder_date, reminder_time, is_completed, notification_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        reminder_date,
        reminder_time,
        0,
        notification_id || null,
      ],
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding reminder:", error);
    return null;
  }
};

export const toggleReminderStatus = async (
  id: number,
  is_completed: number,
) => {
  try {
    await db.runAsync("UPDATE reminders SET is_completed = ? WHERE id = ?", [
      is_completed,
      id,
    ]);
    return true;
  } catch (error) {
    console.error("Error updating reminder status:", error);
    return false;
  }
};

export const updateReminder = async (
  id: number,
  title: string,
  description: string,
  reminder_date: string,
  reminder_time: string,
  notification_id?: string,
) => {
  try {
    await db.runAsync(
      "UPDATE reminders SET title = ?, description = ?, reminder_date = ?, reminder_time = ?, notification_id = ? WHERE id = ?",
      [
        title,
        description,
        reminder_date,
        reminder_time,
        notification_id || null,
        id,
      ],
    );
    return true;
  } catch (error) {
    console.error("Error updating reminder:", error);
    return false;
  }
};

export const deleteReminder = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM reminders WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return false;
  }
};

export const getChildren = async () => {
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

export const getMothers = async () => {
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
// Fungsi CRUD Catatan
// =======================

export interface CatatanRow {
  id: number;
  child_id?: number;
  tanggal_pemeriksaan: string;
  jam_pemeriksaan: string;
  suhu_tubuh?: number;
  nafsu_makan?: string;
  kondisi_anak?: string;
  napas_anak?: string;
  keluhan_utama?: string; // JSON string
  tanda_bahaya?: string; // JSON string
  penanganan?: string; // JSON string
  penanganan_lainnya?: string;
  catatan_tambahan?: string;
  foto_uri?: string;
  status_kondisi?: string;
  created_at?: string;
}

export const getCatatan = async (): Promise<CatatanRow[]> => {
  try {
    return await db.getAllAsync(
      "SELECT * FROM catatan ORDER BY tanggal_pemeriksaan DESC, jam_pemeriksaan DESC",
    );
  } catch (error) {
    console.error("Error fetching catatan:", error);
    return [];
  }
};

export const getCatatanById = async (
  id: number,
): Promise<CatatanRow | null> => {
  try {
    return await db.getFirstAsync("SELECT * FROM catatan WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error fetching catatan by id:", error);
    return null;
  }
};

export const addCatatan = async (
  tanggal_pemeriksaan: string,
  jam_pemeriksaan: string,
  suhu_tubuh?: number,
  nafsu_makan?: string,
  kondisi_anak?: string,
  napas_anak?: string,
  keluhan_utama?: string,
  tanda_bahaya?: string,
  penanganan?: string,
  penanganan_lainnya?: string,
  catatan_tambahan?: string,
  foto_uri?: string,
  status_kondisi?: string,
) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO catatan (
        tanggal_pemeriksaan, jam_pemeriksaan, suhu_tubuh, nafsu_makan, 
        kondisi_anak, napas_anak, keluhan_utama, tanda_bahaya, 
        penanganan, penanganan_lainnya, catatan_tambahan, foto_uri, status_kondisi
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tanggal_pemeriksaan,
        jam_pemeriksaan,
        suhu_tubuh ?? null,
        nafsu_makan || null,
        kondisi_anak || null,
        napas_anak || null,
        keluhan_utama || null,
        tanda_bahaya || null,
        penanganan || null,
        penanganan_lainnya || null,
        catatan_tambahan || null,
        foto_uri || null,
        status_kondisi || null,
      ],
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding catatan:", error);
    return null;
  }
};

export const updateCatatan = async (
  id: number,
  tanggal_pemeriksaan: string,
  jam_pemeriksaan: string,
  suhu_tubuh?: number,
  nafsu_makan?: string,
  kondisi_anak?: string,
  napas_anak?: string,
  keluhan_utama?: string,
  tanda_bahaya?: string,
  penanganan?: string,
  penanganan_lainnya?: string,
  catatan_tambahan?: string,
  foto_uri?: string,
  status_kondisi?: string,
) => {
  try {
    await db.runAsync(
      `UPDATE catatan SET 
        tanggal_pemeriksaan = ?, jam_pemeriksaan = ?, suhu_tubuh = ?, nafsu_makan = ?, 
        kondisi_anak = ?, napas_anak = ?, keluhan_utama = ?, tanda_bahaya = ?, 
        penanganan = ?, penanganan_lainnya = ?, catatan_tambahan = ?, foto_uri = ?, status_kondisi = ?
       WHERE id = ?`,
      [
        tanggal_pemeriksaan,
        jam_pemeriksaan,
        suhu_tubuh ?? null,
        nafsu_makan || null,
        kondisi_anak || null,
        napas_anak || null,
        keluhan_utama || null,
        tanda_bahaya || null,
        penanganan || null,
        penanganan_lainnya || null,
        catatan_tambahan || null,
        foto_uri || null,
        status_kondisi || null,
        id,
      ],
    );
    return true;
  } catch (error) {
    console.error("Error updating catatan:", error);
    return false;
  }
};

export const deleteCatatan = async (id: number) => {
  try {
    await db.runAsync("DELETE FROM catatan WHERE id = ?", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting catatan:", error);
    return false;
  }
};

export default db;
