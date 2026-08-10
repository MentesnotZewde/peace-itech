export const COUNTRY_CODES = [
  { iso: "ET", name: "Ethiopia", flag: "🇪🇹", dial: "+251" },
  { iso: "US", name: "United States", flag: "🇺🇸", dial: "+1" },
  { iso: "GB", name: "United Kingdom", flag: "🇬🇧", dial: "+44" },
  { iso: "CA", name: "Canada", flag: "🇨🇦", dial: "+1" },
  { iso: "AU", name: "Australia", flag: "🇦🇺", dial: "+61" },
  { iso: "DE", name: "Germany", flag: "🇩🇪", dial: "+49" },
  { iso: "FR", name: "France", flag: "🇫🇷", dial: "+33" },
  { iso: "IT", name: "Italy", flag: "🇮🇹", dial: "+39" },
  { iso: "ES", name: "Spain", flag: "🇪🇸", dial: "+34" },
  { iso: "NL", name: "Netherlands", flag: "🇳🇱", dial: "+31" },
  { iso: "SE", name: "Sweden", flag: "🇸🇪", dial: "+46" },
  { iso: "CH", name: "Switzerland", flag: "🇨🇭", dial: "+41" },
  { iso: "IE", name: "Ireland", flag: "🇮🇪", dial: "+353" },
  { iso: "AE", name: "United Arab Emirates", flag: "🇦🇪", dial: "+971" },
  { iso: "SA", name: "Saudi Arabia", flag: "🇸🇦", dial: "+966" },
  { iso: "QA", name: "Qatar", flag: "🇶🇦", dial: "+974" },
  { iso: "EG", name: "Egypt", flag: "🇪🇬", dial: "+20" },
  { iso: "KE", name: "Kenya", flag: "🇰🇪", dial: "+254" },
  { iso: "NG", name: "Nigeria", flag: "🇳🇬", dial: "+234" },
  { iso: "GH", name: "Ghana", flag: "🇬🇭", dial: "+233" },
  { iso: "ZA", name: "South Africa", flag: "🇿🇦", dial: "+27" },
  { iso: "TZ", name: "Tanzania", flag: "🇹🇿", dial: "+255" },
  { iso: "UG", name: "Uganda", flag: "🇺🇬", dial: "+256" },
  { iso: "RW", name: "Rwanda", flag: "🇷🇼", dial: "+250" },
  { iso: "SD", name: "Sudan", flag: "🇸🇩", dial: "+249" },
  { iso: "DJ", name: "Djibouti", flag: "🇩🇯", dial: "+253" },
  { iso: "SO", name: "Somalia", flag: "🇸🇴", dial: "+252" },
  { iso: "IN", name: "India", flag: "🇮🇳", dial: "+91" },
  { iso: "PK", name: "Pakistan", flag: "🇵🇰", dial: "+92" },
  { iso: "BD", name: "Bangladesh", flag: "🇧🇩", dial: "+880" },
  { iso: "CN", name: "China", flag: "🇨🇳", dial: "+86" },
  { iso: "JP", name: "Japan", flag: "🇯🇵", dial: "+81" },
  { iso: "KR", name: "South Korea", flag: "🇰🇷", dial: "+82" },
  { iso: "SG", name: "Singapore", flag: "🇸🇬", dial: "+65" },
  { iso: "MY", name: "Malaysia", flag: "🇲🇾", dial: "+60" },
  { iso: "ID", name: "Indonesia", flag: "🇮🇩", dial: "+62" },
  { iso: "PH", name: "Philippines", flag: "🇵🇭", dial: "+63" },
  { iso: "TR", name: "Turkey", flag: "🇹🇷", dial: "+90" },
  { iso: "BR", name: "Brazil", flag: "🇧🇷", dial: "+55" },
  { iso: "MX", name: "Mexico", flag: "🇲🇽", dial: "+52" },
  { iso: "AR", name: "Argentina", flag: "🇦🇷", dial: "+54" },
];

export function parsePhone(value, countries = COUNTRY_CODES) {
  const fallback = countries[0].dial;

  if (!value) {
    return { code: fallback, number: "" };
  }

  const trimmed = String(value).trim();
  const match = [...countries]
    .sort((a, b) => b.dial.length - a.dial.length)
    .find((c) => trimmed.startsWith(c.dial));

  if (match) {
    return { code: match.dial, number: trimmed.slice(match.dial.length).trim() };
  }

  return { code: fallback, number: trimmed };
}
