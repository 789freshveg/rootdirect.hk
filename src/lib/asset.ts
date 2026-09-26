/** Public asset path helper. Data URLs and absolute URLs pass through. */
export function asset(src: string): string {
  if (!src) return "";
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  return "/" + src.replace(/^\/+/, "");
}
