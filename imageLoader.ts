/**
 * Custom Next.js image loader that returns the image URL as-is.
 * This makes the browser load images directly from the origin (e.g. Arvan S3)
 * instead of via /_next/image, avoiding 504 timeouts when the Next.js server
 * cannot reach the storage origin in time.
 */
export default function passthroughImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return src;
}
