# 🛒 eBay AI Scraper

A simple **Node.js + Express + Cheerio web scraper** that extracts product information from [eBay](https://www.ebay.com) search results.  
This scraper runs **without a browser** (no Puppeteer/Playwright), making it lightweight, fast, and easy to deploy.

---

## 🚀 Features

- 🔎 Scrape products directly from eBay search results.
- 📄 Supports multiple pages (`?page=3`).
- 🧠 Extracts:
  - Product name
  - Price
  - Product link
  - Product description (from product detail page)
  - Page number (source page of product)
- ⚙️ Configurable via URL parameters:
  - `keyword` — search keyword (default: `nike`)
  - `details` — whether to include product descriptions (`true`/`false`, default: `true`)
  - `page` — number of pages to scrape (default: `2`)

---

## 🧰 Tech Stack

| Tool        | Description                     |
| ----------- | ------------------------------- |
| **Node.js** | JavaScript runtime              |
| **Express** | Web server for API endpoint     |
| **Axios**   | HTTP client for fetching pages  |
| **Cheerio** | Fast HTML parser (jQuery-like)  |
| **dotenv**  | Environment variable management |

---

## 📂 Project Structure

```
ebay-ai-scraper/
│
├── server.js              # Express server (API endpoint)
├── scraper.js             # Main scraper logic (Axios + Cheerio)
├── agent.js               # Optional AI parser fallback
├── utils.js               # Helper functions (e.g. cleanText)
├── package.json
├── .env                   # (optional) environment config
└── README.md              # Project documentation
```

---

## ⚙️ Installation & Running

### 1️⃣ Clone the project

```bash
git clone https://github.com/<your-username>/ebay-ai-scraper.git
cd ebay-ai-scraper
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the server

```bash
npm start
```

Server will start on:

```
http://localhost:3000
```

---

## 🔍 API Usage

### Endpoint

```
GET /api/scrape
```

### Query Parameters

| Parameter | Type    | Default  | Description                            |
| --------- | ------- | -------- | -------------------------------------- |
| `keyword` | string  | `"nike"` | Search keyword                         |
| `details` | boolean | `true`   | Whether to scrape product descriptions |
| `page`    | integer | `2`      | Number of pages to scrape              |

---

### Example Requests

#### ✅ Basic usage

```
http://localhost:3000/api/scrape?keyword=nike
```

#### ⚡ Fast mode (without product descriptions)

```
http://localhost:3000/api/scrape?keyword=nike&details=false
```

#### 📄 Scrape 3 pages

```
http://localhost:3000/api/scrape?keyword=nike&page=3
```

---

### Example JSON Response

```json
{
  "status": "success",
  "keyword": "nike",
  "total": 25,
  "data": [
    {
      "name": "Nike Air Max 2017 Triple Black Mens Sneakers Size US 7-15 Casual Shoes New✅",
      "price": "IDR1,835,002.75",
      "link": "https://www.ebay.com/itm/224957225546?...",
      "description": "TRIPLE BLACK COLOURWAY - PERFECT CASUAL SNEAKERS",
      "page": 1
    },
    {
      "name": "Nike Air Zoom Pegasus 39 White Blue",
      "price": "IDR1,620,000",
      "link": "https://www.ebay.com/itm/226076312231?...",
      "description": "Brand new in box. Fast shipping.",
      "page": 2
    }
  ]
}
```

---

## 🧠 Notes & Limitations

- eBay dynamically loads many products using JavaScript; since this scraper uses static HTML (`axios` + `cheerio`), it may capture **only a subset of the products** per page.
- The scraper prioritizes **lightweight, fast requests** over complete data coverage.
- You can adjust the `maxPages` value to scrape more pages for testing.
- Use the `details=false` flag for faster scraping (it skips visiting each product page).

---

## ⚡ Optimization Tips

| Option                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `details=false`                  | Skip scraping product details (10x faster)              |
| Increase `maxPages`              | To fetch more listings                                  |
| Add delay between pages          | Helps avoid temporary rate-limiting                     |
| Use `.com.au` or `.co.uk` domain | Sometimes returns more complete static HTML than `.com` |

---

## 🧾 Example Output (Terminal Log)

```
📥 Request masuk: keyword="nike", details=true, pages=3
🔍 Scraping halaman 1: https://www.ebay.com/sch/i.html?_from=R40&_nkw=nike&_sacat=0&rt=nc&_pgn=1
✅ Halaman 1 selesai. Total produk sementara: 11
🔍 Scraping halaman 2: https://www.ebay.com/sch/i.html?_from=R40&_nkw=nike&_sacat=0&rt=nc&_pgn=2
⚠️ Tidak menemukan produk di halaman 2. Stop scraping.
```

---

## 👨‍💻 Author

**eBay AI Scraper Challenge**  
Built by Emir Othman — Technical Interview Assignment  
Email: emirothman22@gmail.com

---

## 🏁 License

This project is for **educational and interview demonstration purposes only.**  
It is not affiliated with or endorsed by eBay Inc.
