import { uploadProjectFile } from "@/lib/cloudinary";

export const MEDIA_FOLDER = "peace-itech/media";

/** Uploads a media item's cover image, if one came with the request. */
export function uploadCoverImage(file) {
  return uploadProjectFile(file, { folder: MEDIA_FOLDER, kind: "image" });
}
