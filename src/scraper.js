import axios from "axios";
import * as cheerio from "cheerio";
import { cleanText } from "./utils.js";
import { extractProductInfo } from "./agent.js";

const BASE_URL = "https://www.ebay.com/sch/i.html?_from=R40&_nkw=";

/**
 * Scraper eBay tanpa browser (versi final)
 * ✅ Support: query ?keyword=...&details=false&page=...
 * ✅ Tambahan: field "page" di hasil JSON
 */
export async function scrapeEbay(keyword = "nike", options = { includeDetails: true, maxPages: 2 }) {
  const { includeDetails, maxPages } = options;
  const products = [];
  let currentPage = 1;

  while (currentPage <= maxPages) {
    const url = `${BASE_URL}${encodeURIComponent(keyword)}&_sacat=0&rt=nc&_pgn=${currentPage}`;
    console.log(`🔍 Scraping halaman ${currentPage}: ${url}`);

    let html;
    try {
      const { data } = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        },
        timeout: 30000,
      });
      html = data;
    } catch (err) {
      console.warn(`⚠️ Gagal memuat halaman ${currentPage}: ${err.message}`);
      break;
    }

    const $ = cheerio.load(html);
    const cards = $("div.s-item, div.s-card");

    if (cards.length === 0) {
      console.log(`⚠️ Tidak menemukan produk di halaman ${currentPage}. Stop scraping.`);
      break;
    }

    for (const el of cards.toArray()) {
      const card = $(el);

      // 🔹 Nama produk
      const name = card.find("span.su-styled-text.primary.default").first().text().trim() || "-";

      // 🔹 Harga produk
      const price = card.find("div.s-card__attribute-row span.su-styled-text.primary.bold.large-1.s-card__price").first().text().trim() || "-";

      // 🔹 Link produk
      const link = card.find("div.su-media__image a.image-treatment").attr("href") || "-";

      // 🔹 Deskripsi produk (opsional)
      let description = "-";

      if (includeDetails && link !== "-") {
        try {
          const { data: detailHTML } = await axios.get(link, {
            headers: { "User-Agent": "Mozilla/5.0 Chrome/120.0" },
            timeout: 25000,
          });
          const $$ = cheerio.load(detailHTML);

          // Coba cari iframe deskripsi
          const iframeSrc = $$("iframe#desc_ifr").attr("src");
          if (iframeSrc) {
            try {
              const { data: iframeHTML } = await axios.get(iframeSrc, {
                headers: { "User-Agent": "Mozilla/5.0 Chrome/120.0" },
                timeout: 20000,
              });
              const $$$ = cheerio.load(iframeHTML);
              description = cleanText($$$("body").text() || $$$("p").text());
            } catch (err) {
              console.warn(`⚠️ Gagal ambil iframe deskripsi untuk ${name}: ${err.message}`);
            }
          } else {
            const descDiv = $$("div.x-item-description-child");
            if (descDiv.length > 0) {
              description = cleanText(descDiv.text());
            } else {
              const extracted = await extractProductInfo(detailHTML);
              description = extracted.description || "-";
            }
          }
        } catch (err) {
          console.warn(`⚠️ Gagal ambil deskripsi untuk ${name}: ${err.message}`);
        }
      }

      // ✅ Tambahkan informasi halaman
      products.push({ name, price, link, description, page: currentPage });
    }

    console.log(`✅ Halaman ${currentPage} selesai. Total produk sementara: ${products.length}`);

    if (currentPage >= maxPages) {
      console.log(`🛑 Mencapai batas maksimum (${maxPages}). Stop scraping.`);
      break;
    }

    currentPage++;
  }

  return products;
}
