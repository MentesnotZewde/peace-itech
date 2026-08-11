import { services } from "@/lib/services";

// Single source of truth: keeps project categories in sync with the
// service titles actually shown on the public site.
export const SERVICE_CATEGORIES = services.map((s) => s.title);
