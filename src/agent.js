import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_BASE = process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

/**
 * Fungsi AI ekstraksi data produk menggunakan Gemini API
 */
export async function extractProductInfo(htmlSnippet) {
  console.log("🤖 [AI/Gemini] Mulai ekstraksi dengan model:", GEMINI_MODEL);

  try {
    const body = {
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Ekstrak nama produk, harga, dan deskripsi dari HTML berikut dalam format JSON:
{
  "name": "...",
  "price": "...",
  "description": "..."
}
Jika salah satu field tidak ditemukan, gunakan "-".
HTML:
${htmlSnippet.slice(0, 4000)}`,
            },
          ],
        },
      ],
    };

    const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const candidate = response.data?.candidates?.[0];
    const text = candidate?.content?.parts?.map((p) => p.text).join("") || "{}";

    const match = text.match(/\{[\s\S]*\}/);
    const jsonText = match ? match[0] : "{}";
    const parsed = JSON.parse(jsonText);

    console.log("✅ [AI/Gemini] Ekstraksi berhasil:");

    return {
      name: parsed.name || "-",
      price: parsed.price || "-",
      description: parsed.description || "-",
    };
  } catch (err) {
    console.warn("⚠️ [AI/Gemini] Gagal ekstraksi:", err.message);
    return { name: "-", price: "-", description: "-" };
  }
}
