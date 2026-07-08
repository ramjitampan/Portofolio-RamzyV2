export async function checkGeminiConnection() {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt: "Hello" }),
    });

    if (res.ok) return { ok: true, message: "AI Online" };
    return { ok: false, message: "AI Offline" };
  } catch {
    return { ok: false, message: "Gagal terhubung." };
  }
}

export async function sendGeminiMessage({ userPrompt = "" }) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userPrompt }), // hanya kirim pertanyaan user, sisanya di server
  });

  if (!res.ok) {
    const err = await res.json();
    throw Object.assign(new Error(err?.error || "HTTP Error"), { type: "http", status: res.status });
  }

  const data = await res.json();
  return { output: data.output, raw: data };
}
