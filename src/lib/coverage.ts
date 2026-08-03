/**
 * Country/currency coverage, mirrored from the app's single source of truth
 * (`app/src/utils/currency.ts` COUNTRY_TO_CURRENCY) — kept as a plain count
 * + currency list here since the website only needs headline numbers and
 * flag art, not the full lookup table.
 */
export const SUPPORTED_COUNTRIES_COUNT = 100;
export const SUPPORTED_CURRENCIES_COUNT = 74;

/** Names for the flag set in `flags.ts` FLAG_XMLS, same order. */
export const FLAG_NAMES: string[] = [
  "United States",
  "United Kingdom",
  "European Union",
  "India",
  "UAE",
  "Japan",
  "Singapore",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "China",
  "South Korea",
  "Nigeria",
  "South Africa",
  "Philippines",
  "Indonesia",
];

export const coverageStats: { value: number; suffix?: string; label: string }[] = [
  { value: SUPPORTED_COUNTRIES_COUNT, suffix: "+", label: "Countries reached" },
  { value: SUPPORTED_CURRENCIES_COUNT, suffix: "+", label: "Local currencies" },
  { value: 24, suffix: "/7", label: "Always on, no bank hours" },
];
