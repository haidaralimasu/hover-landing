/**
 * Cookie/analytics consent, stored client-side.
 *
 * We persist ONLY the user's decision (in localStorage — a strictly-necessary
 * record, not a tracking cookie). Analytics cookies are set *only* after the
 * user grants consent; on "denied" no analytics ever loads and any stray GA
 * cookies are cleared. This is the GDPR/ePrivacy "opt-in before storage" model.
 */
export const CONSENT_KEY = "hover-consent-v1";
export const CONSENT_CHANGE_EVENT = "hover-consent-change";
export const CONSENT_OPEN_EVENT = "hover-consent-open";

export type Consent = "granted" | "denied";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage blocked — still fire the event so the session reflects the choice */
  }
  window.dispatchEvent(
    new CustomEvent<Consent>(CONSENT_CHANGE_EVENT, { detail: value })
  );
}

/** Re-open the consent banner (e.g. from a "Cookie preferences" link). */
export function openConsent(): void {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
