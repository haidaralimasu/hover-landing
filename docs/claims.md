# Public claims register + trust/SEO status

Spec: Claude ⇄ Codex converged plan (2026-10-28). Every public claim must have a row.
Fee/partner facts are sourced from backend `config/settings.py` defaults + GitHub `prod`
environment vars (checked 2026-10-28): TRANSFER_FEE_BPS, BRIDGE_DEVELOPER_FEE_BPS and
BRIDGE_OFFRAMP_FEE_BPS are unset in prod, so the defaults 0 / 100 / 50 bps apply;
BRIDGE_BASE_URL=https://api.bridge.xyz; BRIDGE_REGIONS=US,GB,EU,MX; KYC_REQUIRED=false.
Only Bridge is live in prod as a partner (founder, 2026-10-28). Values live in `src/lib/company.ts`.

## Claims register

| Claim (where) | Evidence | Action |
|---|---|---|
| "Fastest way to get paid abroad" (hero H1, metadata, OG) | None | **Cut** → "Get paid from abroad, simply." |
| "Send and receive money instantly" (hero) | Hover→Hover only | **Softened** → "arrive in seconds" between Hover users |
| "Get paid from anywhere in seconds" / "wherever they bank… Hover can get it to you" (coverage) | Not true for bank rails | **Softened** → Hover users worldwide, seconds between users |
| "Across borders in seconds" (features) | Hover→Hover (Solana settlement, relayer pays fee) | **Kept**, body scoped to Hover users |
| "No hidden charges" / "see the fee before you confirm" (features, FAQ) | App shows fee before confirm; fees on /company | **Keep** |
| "cannot be … sent to the wrong place" (security) | Contradicted terms (wrong-recipient losses) | **Cut** → can't be altered or replayed; check the recipient |
| "keeps your money protected, and it does, on every single transfer" (security intro) | Guarantee | **Softened** → every payment needs your approval |
| "Is my money safe? Yes." (FAQ) | Guarantee | **Rewritten**: approval model + not a bank, not FDIC-insured, irreversible |
| "You can send to anyone" (FAQ) | Hover users only | **Rewritten** |
| "Cash-out … coming soon" (FAQ) | Bridge withdraw is live in prod | **Rewritten** |
| Fees 0% / 1% / 0.5% (FAQ, /company) | prod vars (see header) | **Keep**; re-check whenever the BPS vars change |
| Bank in/out for "US bank accounts, more countries rolling out" | US is live; GB/EU/MX are enabled in prod but not announced | **Keep**. Do NOT announce UK/EU until the FCA financial-promotions route and Bridge EU sign-off are done (settings.py:103) |
| Privacy provider list missing Bridge | Bridge is live in prod | **Fixed** (privacy page) |
| "Hover Technologies LLC, Montana, 1001 S Main St Kalispell" | Play Console org verification | **Keep** |
| Store listings, X/Telegram bios, Product Hunt, LinkedIn | Not reviewed in code | **Owner**: see S-11 |

## Status by spec item

| ID | Item | Status |
|---|---|---|
| S-01 | Claims register | Done (this file) |
| S-02 | Copy corrections | Done |
| S-03 | Counsel review of Terms + Privacy; then remove the "general template" footers; counsel-approved licensing statement for /company | **OWNER: blocked on counsel.** Footers deliberately left in place. /company has no licensing statement until counsel writes one |
| S-04 | Privacy ↔ app ↔ store | Bridge added to privacy. **OWNER:** dated Play Console Data Safety check (reportedly "No data collected"; it must declare name, email, phone, photo, financial info, contacts if used, and sharing with Privy/Bridge/Didit/Firebase/Expo/Resend); Apple privacy details for TestFlight/App Store Connect |
| S-05 | FAQ answers in SSR HTML | Done; `node scripts/check-faq-ssr.mjs <url>` verifies |
| S-06 | Measurement | **OWNER:** verify Search Console + Bing Webmaster Tools (DNS TXT on hover.money), submit `/sitemap.xml`, turn on Bing IndexNow. GA4 Enhanced Measurement "outbound clicks" covers store-badge clicks; mark it as a key event. Baseline: ask ChatGPT / Perplexity / Google AI Mode / Copilot these 10 questions and record the answer + cited URL: what is hover.money · is hover.money legit · is Hover safe · who owns Hover · Hover fees · how does Hover work · Hover app review · Hover vs Wise · how to get paid from abroad with Hover · is Hover a bank |
| S-07 | /company page | Done (minus the counsel licensing statement, S-03) |
| S-08 | Operational disclosure (countries, eligibility, funding, withdrawals, current fees) | Done on /company + FAQ. Eligibility is deferred to the Terms until counsel updates them |
| S-09 | Homepage "What is Hover?" | Done |
| S-10 | Organization JSON-LD (legalName, address, email, sameAs) | Done. Founder omitted: owner decides whether to publish a name |
| S-11 | Entity consistency off-site | **OWNER:** use this one-liner everywhere: "Hover is a payments app for sending and receiving money across borders, operated by Hover Technologies LLC." Apply to Play, TestFlight/App Store, X, Telegram, LinkedIn, Product Hunt, Crunchbase, founder LinkedIn |
| S-12 | /pricing | N/A: fees fit on /company; split out when there are more than three fees or per-country pricing |
| S-13 | Help articles from real tickets | N/A until there are ticket volumes; /help stays a contact form |
| S-14 | US→India corridor page | N/A: India payout is not live |
| S-15 | Earned third-party coverage | **OWNER:** ongoing; no fake reviews or undisclosed posts |
