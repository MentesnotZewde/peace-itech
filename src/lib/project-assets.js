import { uploadProjectFile } from "@/lib/cloudinary";

export const PROJECT_FOLDER = "peace-itech/projects";

/**
 * Uploads whichever project attachments came with a request — the portfolio
 * preview image and/or the requirements PDF.
 */
export async function uploadAttachments(files) {
  const assets = {};

  if (files.image) {
    assets.image = await uploadProjectFile(files.image, {
      folder: `${PROJECT_FOLDER}/previews`,
      kind: "image",
    });
  }
  if (files.projectRequirements) {
    assets.projectRequirements = await uploadProjectFile(
      files.projectRequirements,
      { folder: `${PROJECT_FOLDER}/requirements`, kind: "document" },
    );
  }

  return assets;
}
