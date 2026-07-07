import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { sendMessage, checkConnection } from "../services/aiService";

const QUICK = {
  about: "Ceritakan tentang Ramzy",
  experience: "Pengalaman Magang",
  project: "Project Terbaik",
};

const PARTICLES = [
  { size: 6, duration: 6, color: "#f4c542", delay: 0, reverse: false },
  { size: 5, duration: 8, color: "#14b8a6", delay: 1.2, reverse: true },
  { size: 4, duration: 10, color: "#ffffff", delay: 2.4, reverse: false },
];

function YukiBadge({ size = 140, breathing = true }) {
  const radius = size * 0.42;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* aura blur di belakang */}
      <motion.div
        animate={breathing ? { opacity: [0.35, 0.6, 0.35], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.55), transparent 70%)" }}
      />

      {/* ring gradient berputar */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #f4c542, #14b8a6, #f4c542)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          animation: "spinSlow 7s linear infinite",
        }}
      />

      {/* ring putus-putus, arah berlawanan */}
      <div className="absolute rounded-full border border-dashed border-teal-300/30" style={{ inset: size * 0.09, animation: "spinReverse 11s linear infinite" }} />

      {/* partikel orbit */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            animation: `${p.reverse ? "spinReverse" : "spinSlow"} ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <span
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}`,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translateY(-${radius}px)`,
            }}
          />
        </div>
      ))}

      {/* badge utama */}
      <motion.div
        animate={breathing ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-full flex items-center justify-center font-display font-bold text-navy-950 overflow-hidden"
        style={{
          width: size * 0.62,
          height: size * 0.62,
          background: "linear-gradient(135deg, #f4c542, #e8b820)",
          fontSize: size * 0.24,
        }}
      >
        Y
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
            animation: "sweep 3.2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </div>
  );
}

function Splash() {
  return (
    <motion.div key="yuki-splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="fixed inset-0 z-[999] mesh-bg flex items-center justify-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center gap-4">
        <YukiBadge size={110} />
        <p className="font-body text-sm text-white/50 tracking-wide">Menyiapkan Yuki...</p>
      </motion.div>
    </motion.div>
  );
}

export default function PageYuki({ provider = "gemini" }) {
  const [showSplash, setShowSplash] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState({ ok: null, msg: "Checking..." });
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mounted = true;
    setStatus({ ok: null, msg: "Checking..." });
    (async () => {
      try {
        const res = await checkConnection({ provider });
        if (!mounted) return;
        if (res?.ok) setStatus({ ok: true, msg: "Online" });
        else setStatus({ ok: false, msg: res?.message || "Offline" });
      } catch (e) {
        if (!mounted) return;
        setStatus({ ok: false, msg: e?.message || "Error" });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [provider]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const pushMessage = (role, text) => setMessages((s) => [...s, { role, text }]);

  async function handleSend(prompt) {
    if (!prompt || loading) return;
    pushMessage("user", prompt);
    setInput("");
    setLoading(true);
    try {
      const res = await sendMessage({ provider, message: prompt });
      pushMessage("assistant", res.output || "Tidak ada respon.");
    } catch (err) {
      console.error(err);
      let label = "Unknown error";
      if (err.type === "timeout") label = "Timeout — coba lagi";
      else if (err.type === "network_or_cors") label = "Network/CORS error — periksa koneksi atau API key";
      else if (err.type === "http") {
        if (err.status === 404) label = "Endpoint tidak ditemukan (404)";
        else if (err.status === 401) label = "Unauthorized — cek API key";
        else if (err.status === 400) label = err.body?.error || "Bad request (400)";
        else label = `HTTP ${err.status}`;
      }
      pushMessage("assistant", `Error: ${label}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>{showSplash && <Splash />}</AnimatePresence>

      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mesh-bg min-h-screen pt-32 pb-16 px-6 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col items-center text-center mb-6">
          <YukiBadge size={150} />

          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mt-3">
            Hai, aku <span className="shimmer-text">Yuki</span> ^o^
          </h1>
          <p className="font-body text-sm text-white/55 mt-1">Istri Ramzy yang memberikan info te — tanya apa aja soal profil dan portofolionya.</p>
          <span className="font-body text-xs mt-2 flex items-center gap-1.5 text-white/40">
            <span className={`w-2 h-2 rounded-full ${status.ok === true ? "bg-emerald-400" : status.ok === false ? "bg-red-400" : "bg-white/30"}`} />
            {status.msg}
          </span>
        </div>

        <div className="w-full max-w-2xl glass rounded-3xl p-4 md:p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => handleSend(QUICK.about)} className="text-xs font-body px-3 py-1.5 rounded-full border border-gold-400/25 text-gold-400/80 hover:border-gold-400/50 transition-colors">
              Tentang Saya
            </button>
            <button onClick={() => handleSend(QUICK.project)} className="text-xs font-body px-3 py-1.5 rounded-full border border-gold-400/25 text-gold-400/80 hover:border-gold-400/50 transition-colors">
              Project
            </button>
            <button onClick={() => handleSend(QUICK.experience)} className="text-xs font-body px-3 py-1.5 rounded-full border border-gold-400/25 text-gold-400/80 hover:border-gold-400/50 transition-colors">
              Pengalaman
            </button>
          </div>

          <div ref={listRef} className="flex-1 min-h-[320px] max-h-[420px] overflow-y-auto space-y-3 px-1 mb-4">
            {messages.length === 0 && <div className="text-sm text-white/40 text-center pt-16">Tanya apa saja mengenai profil dan portofolio Ramzy.</div>}
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-gold-400/15 text-white" : "glass-gold text-white/85"}`}>{m.text}</div>
              </motion.div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-flex gap-1.5 glass-gold px-4 py-3 rounded-2xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(input);
              }}
              placeholder="Tanya apa aja ke Yuki..."
              className="flex-1 px-4 py-3 rounded-full bg-transparent border border-white/10 text-sm text-white outline-none focus:border-gold-400/40 transition-colors"
            />
            <button onClick={() => handleSend(input)} disabled={loading} className="p-3 rounded-full btn-primary disabled:opacity-50">
              <Send size={16} />
            </button>
          </div>
        </div>
      </motion.section>
    </>
  );
}
