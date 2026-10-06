/** Cloudinary delivery origin. All site images should already be absolute Cloudinary URLs. */
export const IMAGE_ORIGIN = "https://res.cloudinary.com/bgjkk0du";
export const CLOUDINARY_CLOUD_NAME = "bgjkk0du";

export function absImg(src: string): string {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  if (src.startsWith("//")) return `https:${src}`;
  return src;
}

/** Pass-through: images are rewritten to absolute Cloudinary URLs at build/source level. */
export function absolutizeImageUrls(html: string): string {
  return html;
}
