export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true; // 복사 성공
  } catch {
    // 폴백 (일부 브라우저/환경)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}
