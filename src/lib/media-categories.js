import { IoNewspaperOutline } from "react-icons/io5";
import { SlEvent } from "react-icons/sl";
import { MdOutlineInsights } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

// Single source of truth for the media hub: drives the sidebar links,
// the admin filter pills, and the category select in the item form.
export const MEDIA_CATEGORIES = [
  { name: "News", icon: IoNewspaperOutline },
  { name: "Events", icon: SlEvent },
  { name: "Insights", icon: MdOutlineInsights },
  { name: "Company Updates", icon: RxUpdate },
];

export const MEDIA_CATEGORY_NAMES = MEDIA_CATEGORIES.map((c) => c.name);

export function mediaCategoryIcon(name) {
  return MEDIA_CATEGORIES.find((c) => c.name === name)?.icon;
}
