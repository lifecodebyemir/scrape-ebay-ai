// Fungsi bantu untuk membersihkan teks dari HTML
export function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}
