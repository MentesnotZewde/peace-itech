import { SERVICE_CATEGORIES } from "@/lib/service-categories";

export const PROJECT_FIELDS = [
  {
    key: "category",
    label: "Service Category",
    type: "select",
    options: SERVICE_CATEGORIES,
    required: true,
  },
  { key: "title", label: "Project Title", required: true },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  {
    key: "image",
    label: "Preview Image",
    type: "file",
    accept: "image/*",
  },
  { key: "liveUrl", label: "Live Site URL", type: "url" },
];
