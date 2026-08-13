/**
 * Reads a request body as JSON or multipart/form-data.
 * Returns { data, files } where `files` holds every uploaded File, keyed by
 * its form field name, so routes can validate the plain fields separately.
 */
export async function parseFormBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    try {
      return { data: await request.json(), files: {} };
    } catch {
      return { data: {}, files: {} };
    }
  }

  const form = await request.formData();
  const data = {};
  const files = {};

  for (const [key, value] of form.entries()) {
    if (typeof value !== "string") {
      if (value.size > 0) files[key] = value;
      continue;
    }
    // Skip blanks so an untouched form field reads as "not provided".
    if (value.trim() === "") continue;
    data[key] = value;
  }

  return { data, files };
}
