/**
 * Chuẩn hoá nội dung đưa vào Shiki: HTML span.kw/str/... (legacy) → plain text,
 * hoặc slot/Fragment → text thuần.
 */
const MANUAL_SPAN_RE = /class="(?:kw|str|com|fn|num|type|tag)"/;

export function looksLikeManualSyntaxHtml(s: string): boolean {
  return MANUAL_SPAN_RE.test(s);
}

/** Giải entity HTML phổ biến (sau khi bỏ tag). */
export function decodeBasicEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/** Bỏ span manual của report-kit cũ, giữ xuống dòng. */
export function stripManualSyntaxSpans(html: string): string {
  let out = html.replace(/<span[^>]*>/gi, "").replace(/<\/span>/gi, "");
  out = decodeBasicEntities(out);
  return out.replace(/\r\n/g, "\n").trimEnd();
}

/** Bỏ wrapper rỗng từ slot (Fragment / astro). */
export function stripSlotNoise(html: string): string {
  return html
    .replace(/<\/?astro-fragment[^>]*>/gi, "")
    .replace(/<\/?fragment[^>]*>/gi, "")
    .trim();
}

/** Luồng cuối: legacy HTML span → plain; còn lại → trim + strip slot. */
export function toPlainCodeForShiki(raw: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (looksLikeManualSyntaxHtml(trimmed)) {
    return stripManualSyntaxSpans(trimmed);
  }
  return stripSlotNoise(trimmed);
}
