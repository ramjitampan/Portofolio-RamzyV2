import { PROFILE_CONTEXT } from "../config/profileContext";

const DEFAULT_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

export async function checkGeminiConnection() {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Hello" }),
    });

    if (res.ok) return { ok: true, message: "AI Online" };
    return { ok: false, message: "AI Offline" };
  } catch {
    return { ok: false, message: "Gagal terhubung." };
  }
}

export async function sendGeminiMessage({ systemPrompt = "", userPrompt = "", model = DEFAULT_MODEL }) {
  const prompt = `
${PROFILE_CONTEXT}

==================================================
ATURAN TAMBAHAN
${systemPrompt}

==================================================
PERTANYAAN USER
${userPrompt}

==================================================
Jawablah hanya berdasarkan PROFILE_CONTEXT.
Jika informasi tidak tersedia, jawab:
"Maaf, informasi tersebut belum tersedia pada portfolio Ramzy."
Jangan pernah mengarang.
`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw Object.assign(new Error(err?.error || "HTTP Error"), { type: "http", status: res.status });
  }

  const data = await res.json();
  return { output: data.output, raw: data };
}
