// Fails unless every FAQPage JSON-LD Q&A is rendered, in order, as a native
// <details name="faq"> panel (summary = question, body = answer) in the
// server HTML. Usage: node scripts/check-faq-ssr.mjs [url]
const url = process.argv[2] ?? "http://localhost:3000/";
const html = await (await fetch(url)).text();
const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  .map((m) => JSON.parse(m[1]))
  .find((d) => d["@type"] === "FAQPage");
if (!ld) throw new Error("no FAQPage JSON-LD");
const text = (s) =>
  s.replace(/<[^>]+>/g, " ").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&").replace(/&rsquo;/g, "’").replace(/\s+/g, " ").trim();
const panels = [...html.matchAll(/<details\b[^>]*name="faq"[^>]*>(.*?)<\/details>/gs)].map((m) => {
  const [, summary, body] = m[1].match(/<summary\b[^>]*>(.*?)<\/summary>(.*)/s) ?? [];
  return { q: text(summary ?? ""), a: text(body ?? "") };
});
const errors = [];
if (panels.length !== ld.mainEntity.length) errors.push(`${panels.length} panels vs ${ld.mainEntity.length} JSON-LD items`);
ld.mainEntity.forEach((item, i) => {
  if (panels[i]?.q !== item.name) errors.push(`#${i} question mismatch: ${panels[i]?.q}`);
  if (panels[i]?.a !== item.acceptedAnswer.text) errors.push(`#${i} answer mismatch: ${item.name}`);
});
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${panels.length} <details> FAQ panels match FAQPage JSON-LD`);
