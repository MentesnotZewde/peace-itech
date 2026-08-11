import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Saves a stored document once, under its original filename.
 *
 * Cloudinary serves these with `Content-Disposition: attachment`, so opening
 * the URL is itself a download — doing that *and* clicking a link saved the
 * file twice. It also allows cross-origin reads, so fetching the bytes lets us
 * name the file properly (`download` is ignored on cross-origin links, which
 * is why saved files had no .pdf extension).
 */
export async function downloadDocument(doc) {
  if (!doc?.url) return;

  const filename = doc.name || "document.pdf";
  let objectUrl;

  try {
    const response = await fetch(doc.url);
    if (!response.ok) throw new Error(`Download failed (${response.status})`);
    objectUrl = URL.createObjectURL(await response.blob());
  } catch {
    // No CORS or offline: fall back to a single navigation, which still
    // downloads — just under Cloudinary's own filename.
    window.open(doc.url, "_blank", "noopener,noreferrer");
    return;
  }

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}


