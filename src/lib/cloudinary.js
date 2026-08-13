import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Uploads a File from a multipart form to Cloudinary and returns the bits we
// persist on the user document.
export async function uploadProfilePicture(file, folder = "peace-itech/users") {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Profile picture must be a JPEG, PNG, WEBP, or GIF image");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Profile picture must be 5MB or smaller");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [
            { width: 512, height: 512, crop: "fill", gravity: "face" },
            { quality: "auto", fetch_format: "auto" },
          ],
        },
        (error, uploaded) => (error ? reject(error) : resolve(uploaded)),
      )
      .end(buffer);
  });

  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteProfilePicture(publicId) {
  return deleteAsset(publicId);
}

const MAX_DOCUMENT_BYTES = 15 * 1024 * 1024;

/**
 * Uploads any project attachment — a preview image or a requirements PDF.
 * PDFs go up as `raw` so Cloudinary serves them back untouched.
 */
export async function uploadProjectFile(file, { folder, kind = "image" }) {
  const isImage = kind === "image";

  if (isImage && !ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Preview image must be a JPEG, PNG, WEBP, or GIF image");
  }
  if (!isImage && file.type !== "application/pdf") {
    throw new Error("Project requirements must be a PDF");
  }
  if (file.size > (isImage ? MAX_IMAGE_BYTES : MAX_DOCUMENT_BYTES)) {
    throw new Error(
      isImage
        ? "Preview image must be 5MB or smaller"
        : "Project requirements must be 15MB or smaller",
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // The browser-supplied MIME type is just a claim, so check the bytes. Images
  // are re-encoded by Cloudinary, but raw files are stored exactly as sent.
  if (!isImage && buffer.subarray(0, 5).toString("latin1") !== "%PDF-") {
    throw new Error("That file is not a valid PDF");
  }

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: isImage ? "image" : "raw",
          ...(isImage
            ? { transformation: [{ quality: "auto", fetch_format: "auto" }] }
            : {}),
        },
        (error, uploaded) => (error ? reject(error) : resolve(uploaded)),
      )
      .end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    name: file.name,
    resourceType: result.resource_type,
  };
}

export async function deleteAsset(publicId, resourceType = "image") {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch {
    // A stale Cloudinary asset should never fail the user-facing request.
  }
}

export default cloudinary;
