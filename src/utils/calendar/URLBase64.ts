//Base64+URL Encoding
export function base64UrlEncode(str: string): string {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

//Base64+URL Decoding
export function base64UrlDecodeToString(token: string): string {
  let t = token.includes("%") ? decodeURIComponent(token) : token;
  let b64 = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s+/g, "");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  return Buffer.from(b64, "base64").toString("utf8");
}

/** 디코딩 문자열에서 첫 '{' ~ 마지막 '}'만 잘라 JSON.parse */
export function jsonFromBase64Url<T>(token: string): T {
  const s = base64UrlDecodeToString(token);
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start < 0 || end < 0 || end < start) throw new Error("Invalid JSON payload");
  return JSON.parse(s.slice(start, end + 1)) as T;
}