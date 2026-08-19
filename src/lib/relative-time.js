const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * A timestamp rendered as "Just now" / "5m ago" / "3h ago" / "2d ago".
 *
 * Formatted at render time rather than stored as a string, so a label written
 * an hour ago doesn't still claim to be "Just now".
 */
export function formatRelativeTime(timestamp, now = Date.now()) {
  if (!timestamp) return "";

  const elapsed = now - timestamp;

  // Clock skew or a future timestamp shouldn't render "-3m ago".
  if (elapsed < MINUTE) return "Just now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)}m ago`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)}h ago`;
  if (elapsed < 7 * DAY) return `${Math.floor(elapsed / DAY)}d ago`;

  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
