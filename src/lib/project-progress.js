// Progress is derived from the project status rather than typed in, so the two
// can never contradict each other. Kept free of server-only imports so both
// the API routes and the dashboard can use it.

// The stages offered in the UI, from untouched to delivered.
export const PROJECT_STATUSES = [
  "Not Started",
  "Started",
  "Halfway",
  "75% Done",
  "Completed",
];

// "In Progress" is no longer offered but still accepted, so projects saved
// before the finer stages existed stay valid and keep their 50%.
export const LEGACY_STATUSES = ["In Progress"];

export const ALL_STATUSES = [...PROJECT_STATUSES, ...LEGACY_STATUSES];

export const PROGRESS_BY_STATUS = {
  "Not Started": "0",
  Started: "25",
  Halfway: "50",
  "75% Done": "75",
  Completed: "100",
  "In Progress": "50",
};

export function progressForStatus(status) {
  return PROGRESS_BY_STATUS[status] ?? "0";
}

// Currencies offered for the agreed price.
export const CURRENCIES = ["$", "CAD", "Birr"];
export const DEFAULT_CURRENCY = "$";

/** Splits a stored price like "CAD 8,200" into its currency and amount. */
export function parseMoney(value) {
  if (!value) return { currency: DEFAULT_CURRENCY, amount: "" };

  const text = String(value).trim();
  const currency = CURRENCIES.find(
    (c) => text.startsWith(`${c} `) || text.startsWith(c),
  );

  if (!currency) return { currency: DEFAULT_CURRENCY, amount: text };
  return { currency, amount: text.slice(currency.length).trim() };
}

export function formatMoney(currency, amount) {
  const trimmed = String(amount ?? "").trim();
  if (!trimmed) return "";
  return `${currency || DEFAULT_CURRENCY} ${trimmed}`;
}
