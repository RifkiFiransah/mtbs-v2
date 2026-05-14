#!/bin/bash

# Ambil waktu sekarang dalam format: "Senin 2025-05-13 14:30:00"
datetime=$(date +"%A %Y-%m-%d %H:%M:%S")

# Add dan commit
git add .
git commit -m "Commit otomatis pada $datetime"

# Push ke origin rifki
git push origin rifki

# Pindah ke main dan merge
git checkout main
git pull origin main
git merge rifki
git push origin main

# Balik lagi ke rifki dan update dari main
git checkout rifki
git pull origin main

echo "✅ Commit dan merge selesai! [$datetime]"
