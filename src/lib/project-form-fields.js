import { PROJECT_STATUSES } from "@/lib/project-progress";
import { SERVICE_CATEGORIES } from "@/lib/service-categories";

// Marking a project Completed publishes it to the portfolio, so its
// presentation details are asked for at that point — and required then.
export const publishedToPortfolio = (form) => form.projectstatus === "Completed";

// The delivery record: what a project is created with.
export const baseFields = [
  { key: "name", label: "Contact Name", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "company", label: "Company", required: true },
  { key: "contact", label: "Contact Number", type: "phone", required: true },
  {
    key: "category",
    label: "Service Category",
    type: "select",
    options: SERVICE_CATEGORIES,
    required: true,
  },
  {
    key: "projectRequirements",
    label: "Project Requirements",
    type: "file",
    accept: "application/pdf",
  },
  {
    // Progress is derived from this, so there's no separate progress input.
    key: "projectstatus",
    label: "Project Status",
    type: "select",
    options: PROJECT_STATUSES,
  },
  { key: "agreedprice", label: "Agreed Price", type: "money" },
  { key: "deliverydate", label: "Expected Delivery Date", type: "date" },
];

// Shown only while editing, and only once the status is set to Completed —
// the portfolio page has no add form of its own, so this is where a delivered
// project gets its public details.
export const portfolioFields = [
  {
    key: "title",
    label: "Project Title",
    showWhen: publishedToPortfolio,
    requiredWhen: publishedToPortfolio,
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    showWhen: publishedToPortfolio,
    requiredWhen: publishedToPortfolio,
  },
  {
    key: "liveUrl",
    label: "Project Link",
    type: "url",
    placeholder: "https://example.com",
    showWhen: publishedToPortfolio,
  },
  {
    key: "image",
    label: "Preview Image",
    type: "file",
    accept: "image/*",
    showWhen: publishedToPortfolio,
  },
];

export function fieldsFor(editing) {
  return editing ? [...baseFields, ...portfolioFields] : baseFields;
}

