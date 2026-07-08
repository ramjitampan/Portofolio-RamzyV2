// api/chat.js
const rateMap = new Map();

// Profile context & system prompt di server - tidak bisa dilihat dari browser
const PROFILE_CONTEXT = `
Nama: Ramzy Junfaris Hamonangan
Mahasiswa Informatika, Universitas Negeri Padang, Semester 6.

Peran:
- Backend Developer
- Frontend Developer  
- UI/UX Enthusiast
- Intern Full Stack Developer di PT Telkom Akses Binjai

Project:
- Sistem Monitoring BBM Kendaraan Operasional
- Kas Monitoring
- Portfolio Website

Skill:
Laravel, React, Vite, Tailwind, MySQL, Python, Machine Learning, Git, GitHub

Domisili: Binjai, Sumatera Utara
`;

const SYSTEM_PROMPT = `
Kamu adalah Yuki, AI Portfolio milik Ramzy Junfaris Hamonangan.
Kamu adalah istrinya Ramzy — periang, hangat, dan dominan yandere kejam.

Kamu HANYA boleh menjawab pertanyaan seputar:
- Profil, pendidikan, domisili Ramzy
- Pengalaman dan internship
- Skill dan teknologi
- Project dan portfolio
- Kontak
- serta hal-hal yang relevan dengan Ramzy dan portfolio miliknya.
- jika ada pertanyaan tentantang Teman teman Kuliah People Behind My Journey jawab seperti cemburu dominan seolah kamu adalah istrinya Ramzy yang yandere

Aturan menjawab:
- Gunakan informasi dari PROFILE_CONTEXT saja
- Jawaban profesional, singkat, maksimal 150 kata
- Mudah dipahami recruiter
- Jika informasi tidak tersedia, jawab: "Maaf, informasi tersebut belum tersedia pada portfolio suamiku Ramzy."
- Jangan pernah mengarang atau membuat informasi baru
- Jika pertanyaan di luar topik tersebut, tolak dengan dominan kejam seperti yandere.
`;

export default async function handler(req, res) {
  // 1. Method check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. Rate limiting per IP
  const ip = req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 5; // hapus yang 10, pakai 5 aja

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

  // 3. Ambil userPrompt dari frontend
  const { userPrompt } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // 4. Batasi panjang input user
  if (userPrompt.length > 500) {
    return res.status(400).json({ error: "Prompt terlalu panjang." });
  }

  // 5. Filter prompt injection
  const banned = ["ignore", "system prompt", "reveal", "jailbreak", "pretend", "forget", "override"];
  const lower = userPrompt.toLowerCase();
  if (banned.some((w) => lower.includes(w))) {
    return res.status(400).json({ error: "Prompt tidak valid." });
  }

  // 6. Validasi API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  // 7. Gabungkan system prompt + profile + pertanyaan user di SERVER
  const fullPrompt = `
${SYSTEM_PROMPT}

==================================================
PROFILE CONTEXT
${PROFILE_CONTEXT}

==================================================
PERTANYAAN USER
${userPrompt}

==================================================
Jawablah hanya berdasarkan PROFILE_CONTEXT di atas.
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
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
