import express from "express";
import dotenv from "dotenv";
import { scrapeEbay } from "./scraper.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword || "nike";
  const includeDetails = req.query.details !== "false"; // default true
  const maxPages = parseInt(req.query.page || "2", 10);

  console.log(`📥 Request masuk: keyword="${keyword}", details=${includeDetails}, pages=${maxPages}`);

  try {
    const data = await scrapeEbay(keyword, { includeDetails, maxPages });
    res.json({
      status: "success",
      keyword,
      total: data.length,
      data,
    });
  } catch (err) {
    console.error("❌ Terjadi error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
