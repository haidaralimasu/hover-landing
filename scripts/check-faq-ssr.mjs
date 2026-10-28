// Fails if any FAQ answer is missing from the visible server HTML or differs
// from the FAQPage JSON-LD. Usage: node scripts/check-faq-ssr.mjs [url]
const url = process.argv[2] ?? "http://localhost:3000/";
const html = await (await fetch(url)).text();
const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  .map((m) => JSON.parse(m[1]))
  .find((d) => d["@type"] === "FAQPage");
if (!ld) throw new Error("no FAQPage JSON-LD");
const unescape = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
// Visible text = HTML minus every <script> (JSON-LD + RSC payload).
const visible = unescape(html.replace(/<script\b[^>]*>.*?<\/script>/gs, "").replace(/<[^>]+>/g, " "))
  .replace(/\s+/g, " ");
const missing = ld.mainEntity.filter((q) => !visible.includes(q.acceptedAnswer.text));
if (missing.length) {
  console.error("Missing from visible HTML:", missing.map((q) => q.name));
  process.exit(1);
}
console.log(`OK: all ${ld.mainEntity.length} FAQ answers in visible HTML and match JSON-LD`);
