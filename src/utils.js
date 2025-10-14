export function cleanText(text) {
  return text
    ? text
        .replace(/\s+/g, " ")
        .replace(/\u00a0/g, " ")
        .trim()
    : "-";
}
