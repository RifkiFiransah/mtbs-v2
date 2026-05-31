# MTBS Pintar 🩺

Aplikasi **MTBS Pintar** adalah aplikasi mobile berbasis React Native (Expo) yang ditujukan untuk membantu penilaian kondisi anak dan balita melalui pedoman **Manajemen Terpadu Balita Sakit (MTBS)** dan **Penilaian Segitiga SAGA (Pediatric Assessment Triangle)**.

## ✨ Fitur Utama

- **Penilaian Tanda Bahaya**: Deteksi dini kondisi kritis pada anak (Kejang, Muntah, Penurunan Kesadaran, Sesak Nafas, Tidak Bisa Minum).
- **Penilaian SAGA**: Penilaian awal kegawatdaruratan anak menggunakan Segitiga SAGA dengan parameter Penampilan, Usaha Nafas, dan Sirkulasi Kulit.
- **Edukasi Interaktif**: Menyediakan modul edukasi komprehensif terkait Tanda Bahaya Umum, Segitiga SAGA, Penyakit Anak, Penanganan Awal, serta menyediakan kuis dan video edukasi.
- **Riwayat Pemeriksaan**: Penyimpanan histori hasil skrining dan pemeriksaan SAGA menggunakan pencatatan database lokal (SQLite).
- **Bantuan & Profil**: Manajemen data profil, tanya jawab, informasi aplikasi, dan kebijakan privasi.

## 🛠️ Teknologi yang Digunakan

- **Framework**: [React Native](https://reactnative.dev) dengan [Expo](https://expo.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Navigasi**: [React Navigation](https://reactnavigation.org/) (Stack & Bottom Tabs)
- **Styling**: [NativeWind (Tailwind CSS)](https://www.nativewind.dev/)
- **Database**: [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- **Visualisasi**: [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

1. **Install dependensi**

   Pastikan Anda sudah memiliki Node.js terinstal, lalu jalankan:

   ```bash
   npm install
   ```

2. **Jalankan aplikasi di mode pengembangan**

   ```bash
   npm start
   ```

Pada terminal atau command prompt, ikuti opsi yang diberikan Expo:
- Tekan **`a`** untuk membuka di **Android Emulator**
- Tekan **`i`** untuk membuka di **iOS Simulator** (khusus macOS)
- **Perangkat Fisik**: Pindai QR code menggunakan aplikasi kamera (iOS) / aplikasi Expo Go (Android) untuk melihat secara langsung.

## 📦 Membangun Aplikasi (Build)

Proyek ini telah dikonfigurasi menggunakan [EAS (Expo Application Services)](https://expo.dev/eas).
Bila Anda ingin melakukan *build* ke APK, pastikan `eas-cli` sudah terinstal:

```bash
npm install -g eas-cli
```

Lalu jalankan perintah berikut untuk Android:
```bash
eas build --platform android --profile preview
```
