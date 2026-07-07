import { GoogleGenAI } from "@google/genai";
import { PROFILE_CONTEXT } from "../config/profileContext";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const DEFAULT_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

if (!API_KEY) {
  console.warn("[Gemini] VITE_GEMINI_API_KEY belum ditemukan pada file .env");
}

const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

/**
 * Mengecek koneksi Gemini
 */
export async function checkGeminiConnection() {
  try {
    if (!API_KEY) {
      return {
        ok: false,
        message: "API Key belum dikonfigurasi.",
      };
    }

    await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: "Hello",
    });

    return {
      ok: true,
      message: "AI Online",
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: classifyError(error),
    };
  }
}

/**
 * Mengirim pesan ke Gemini
 */
export async function sendGeminiMessage({ systemPrompt = "", userPrompt = "", model = DEFAULT_MODEL }) {
  if (!API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY belum ditemukan pada file .env");
  }

  try {
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

Jika informasi tidak tersedia,
jawab:

"Maaf, informasi tersebut belum tersedia pada portfolio Ramzy."

Jangan pernah mengarang.
`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return {
      output: response.text,
      raw: response,
    };
  } catch (error) {
    console.error(error);

    const err = new Error(classifyError(error));
    err.original = error;

    throw err;
  }
}

/**
 * Mengubah error menjadi pesan yang mudah dipahami
 */
function classifyError(error) {
  const message = String(error?.message || "").toLowerCase();

  if (message.includes("api key")) {
    return "API Key Gemini tidak valid.";
  }

  if (message.includes("quota")) {
    return "Yuki capek nih istirahat dulu yah, Tunggu Yuki 3 Jam lagi.";
  }

  if (message.includes("429")) {
    return "banyak amat permintaan. tunggu Yuki cape, coba lagi deh.";
  }

  if (message.includes("403")) {
    return "Akses ke Yuki ditolak.";
  }

  if (message.includes("404")) {
    return "Model Yuki tidak ditemukan.";
  }

  if (message.includes("network")) {
    return "Yuki lagi keluar.";
  }

  if (message.includes("fetch")) {
    return "Gagal terhubung ke layanan Yuki.";
  }

  return error?.message || "Terjadi kesalahan pada AI.";
}
