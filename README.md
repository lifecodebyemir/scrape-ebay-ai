# 🛒 eBay Product Scraper API (AI + Cheerio + Gemini)

API sederhana untuk melakukan **scraping produk dari eBay** dengan kombinasi:

- **Axios + Cheerio** untuk parsing HTML
- **Gemini API (Google AI)** untuk mengekstrak informasi produk seperti _nama, harga, dan deskripsi_

API ini mengembalikan hasil dalam format JSON dan bisa digunakan untuk integrasi data atau riset AI extraction.

---

## 🚀 Fitur Utama

✅ Scrape produk eBay berdasarkan kata kunci (keyword)  
✅ Dukungan multi halaman (pagination)  
✅ Mendukung pengambilan deskripsi dari halaman produk  
✅ Menggunakan AI (Gemini) untuk mengekstrak nama, harga, dan deskripsi dari HTML  
✅ Output JSON yang rapi dan mudah diproses

---

## 🧰 Teknologi yang Digunakan

| Library                 | Fungsi                                                |
| ----------------------- | ----------------------------------------------------- |
| **Express.js**          | Web server REST API                                   |
| **Axios**               | Fetch HTML dan API Gemini                             |
| **Cheerio**             | Parser HTML lightweight                               |
| **Dotenv**              | Konfigurasi environment (.env)                        |
| **Gemini API (Google)** | AI extractor (membaca HTML dan mengubahnya jadi JSON) |

---

## ⚙️ Instalasi

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/scrape-ebay-ai.git
cd scrape-ebay-ai
```

### 2️⃣ Instal Dependencies

```bash
npm install
```

### 3️⃣ Buat File `.env`

Buat file `.env` berdasarkan contoh `.env.example`:

```bash
cp .env.example .env
```

Isi dengan konfigurasi berikut:

```env
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

> 💡 Kamu bisa dapatkan API Key Gemini di [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---

## ▶️ Menjalankan Server

Jalankan perintah berikut untuk memulai API:

```bash
npm start
```

### Hasil di terminal:

```bash
🚀 Server berjalan di http://localhost:3000
📥 Request masuk: keyword="nike", details=true, pages=1
```

---

## 🔍 Cara Menggunakan API

### Endpoint

```
GET /api/scrape
```

### Query Parameters

| Parameter | Default | Deskripsi                                             |
| --------- | ------- | ----------------------------------------------------- |
| `keyword` | `nike`  | Kata kunci produk yang ingin di-scrape                |
| `page`    | `1`     | Jumlah halaman hasil pencarian                        |
| `details` | `true`  | Jika `true`, ambil juga deskripsi dari halaman produk |

---

### Contoh Request

```
http://localhost:3000/api/scrape?keyword=nike&details=false&page=1
```

### Contoh Response

```json
{
  "status": "success",
  "keyword": "nike",
  "total": 3,
  "data": [
    {
      "name": "Nike Air Max 270 Men's Shoes",
      "price": "$129.99",
      "description": "Brand new Nike Air Max 270 with Air cushioning system",
      "link": "https://www.ebay.com/itm/123456789",
      "page": 1
    },
    {
      "name": "Nike Dunk Low Retro",
      "price": "$99.99",
      "description": "-",
      "link": "https://www.ebay.com/itm/987654321",
      "page": 1
    }
  ]
}
```

---

## ⚠️ Catatan Penting

1. **Rate Limit Gemini API** — jika muncul error `429`, tambahkan jeda (delay) antar permintaan.
2. **Struktur HTML eBay dapat berubah** — jika hasil kosong, periksa kembali selector di `scraper.js`.
3. **Jangan commit file `.env`** — karena berisi API key sensitif.

---

## 📁 Struktur Folder

```
📦 ebay-ai-scraper
├── agent.js        # Integrasi dan ekstraksi data dari Gemini API
├── scraper.js      # Proses scraping eBay menggunakan Axios + Cheerio
├── server.js       # Express server dan route API
├── utils.js        # Helper untuk clean text, dll
├── .env.example    # Contoh konfigurasi environment
├── .gitignore      # File yang diabaikan oleh Git
└── README.md       # Dokumentasi proyek
```

---

## 🧠 Pengembang

Dibuat oleh **Emir Othman Jordan Bandu**  
Lisensi: **MIT © 2025**

---
