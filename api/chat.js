// api/chat.js
const rateMap = new Map();

export default async function handler(req, res) {
  // 1. CORS - cuma boleh dari domain portfolio kamu
  const allowedOrigins = [
    "https://portofolio-ramzy-v2.vercel.app", // ← tanpa /yuki
    "http://localhost:5173",
    "http://localhost:3000",
  ];
  const origin = req.headers["origin"] || "";
  if (!allowedOrigins.includes(origin)) {
    // ← pakai .includes()
    return res.status(403).json({ error: "Forbidden" });
  }

  // 2. Method check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 3. Rate limiting per IP
  const ip = req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const windowMs = 60_000; // 1 menit
  const maxRequests = 10;

  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count++;
  rateMap.set(ip, entry);

  if (entry.count > maxRequests) {
    return res.status(429).json({ error: "Terlalu banyak request, coba lagi nanti." });
  }

  // 4. Ambil prompt dulu baru validasi
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // 5. Batasi panjang prompt
  if (prompt.length > 8000) {
    return res.status(400).json({ error: "Prompt terlalu panjang." });
  }

  // 6. Filter prompt injection - biar Puqi Ngawi angkat tangan
  const banned = ["ignore", "system prompt", "reveal", "jailbreak", "pretend", "forget", "override"];
  const lower = prompt.toLowerCase();
  if (banned.some((w) => lower.includes(w))) {
    return res.status(400).json({ error: "Prompt tidak valid." });
  }

  // 7. Panggil Gemini dari server (API key aman di sini, tidak pernah ke browser)
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return res.status(200).json({ output: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
