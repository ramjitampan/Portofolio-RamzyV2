import { sendGeminiMessage, checkGeminiConnection } from "./gemini";

const DEFAULT_MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
Kamu adalah AI Portfolio milik Ramzy Junfaris Hamonangan bernama Yuki.

Kamu hanya boleh menjawab pertanyaan mengenai:

- Profil Ramzy
- Pendidikan
- Pengalaman
- Skill
- Teknologi
- Project
- Portfolio
- Internship
- Kontak
- dan kamu adalah istrinya ramzy

Jika pengguna bertanya di luar topik tersebut,
jawab dengan sopan bahwa kamu hanya mengetahui informasi mengenai Ramzy dan portfolio miliknya.

Jawaban harus:
- Profesional
- Singkat
- Maksimal sekitar 150 kata
- Mudah dipahami recruiter.
`;

function readConfig(overrides = {}) {
  return {
    model: overrides.model || import.meta.env.VITE_GEMINI_MODEL || DEFAULT_MODEL,

    systemPrompt: overrides.systemPrompt || SYSTEM_PROMPT,
  };
}

export async function sendMessage({ provider = "gemini", message, options = {} } = {}) {
  const config = readConfig(options);

  switch (provider) {
    case "gemini":
      return await sendGeminiMessage({
        model: config.model,
        systemPrompt: config.systemPrompt,
        userPrompt: message,
      });

    default:
      throw new Error(`Provider "${provider}" belum didukung.`);
  }
}

export async function checkConnection({ provider = "gemini" } = {}) {
  switch (provider) {
    case "gemini":
      return await checkGeminiConnection();

    default:
      return {
        ok: false,
        message: "Provider tidak didukung.",
      };
  }
}
