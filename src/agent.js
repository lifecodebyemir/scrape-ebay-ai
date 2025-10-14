import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const agent = axios.create({
  baseURL: process.env.AGENT_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.AGENT_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function extractProductInfo(htmlSnippet) {
  try {
    const response = await agent.post("/chat", {
      model: process.env.AGENT_MODEL,
      messages: [
        { role: "system", content: "You are an AI that extracts structured product information from HTML snippets." },
        {
          role: "user",
          content: `Ekstrak nama produk, harga, dan deskripsi dari HTML berikut dalam format JSON:
${htmlSnippet}`,
        },
      ],
    });

    const text = response.data?.choices?.[0]?.message?.content || "{}";
    return JSON.parse(text);
  } catch {
    return { name: "-", price: "-", description: "-" };
  }
}
