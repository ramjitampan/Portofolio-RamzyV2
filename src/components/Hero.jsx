import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Sparkles, MapPin, GraduationCap } from "lucide-react";

const roles = ["Backend Developer", "UI/UX Enthusiast", "Future Game Developer", "Mahasiswa Informatika"];

export default function Hero() {
  const sectionRef = useRef(null);
  // margin negatif dikit biar animasi berhenti pas beneran keluar viewport,
  // bukan pas baru nyentuh tepi
  const isInView = useInView(sectionRef, { amount: 0.15 });

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Orbs — turunkan blur, statis (gak animasi jadi cost cuma 1x paint) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-2xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #f4c542, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-2xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #14b8a6, transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Professional Portrait */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              {/* Corner accent lines — sekali jalan aja, gak perlu isInView */}
              <motion.div
                className="absolute -top-3 -left-3 w-10 h-10 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                  borderTop: "2px solid #f4c542",
                  borderLeft: "2px solid #f4c542",
                  borderRadius: "2px 0 0 0",
                }}
              />
              <motion.div
                className="absolute -bottom-3 -right-3 w-10 h-10 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{
                  borderBottom: "2px solid #14b8a6",
                  borderRight: "2px solid #14b8a6",
                  borderRadius: "0 0 2px 0",
                }}
              />

              {/* Portrait frame — float cuma jalan kalau in view */}
              <motion.div
                className="relative overflow-hidden"
                style={{
                  width: "280px",
                  height: "360px",
                  borderRadius: "12px",
                  border: "1px solid rgba(244,197,66,0.25)",
                  background: "linear-gradient(160deg, rgba(244,197,66,0.06) 0%, rgba(20,184,166,0.06) 100%)",
                }}
                animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{ duration: 6, repeat: isInView ? Infinity : 0, ease: "easeInOut" }}
              >
                {/* Inner gradient overlay for depth */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: "linear-gradient(to bottom, transparent 60%, rgba(2,8,23,0.5) 100%)",
                    borderRadius: "12px",
                  }}
                />

                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img src="/Ramzy.webp" alt="Ramzy Junfaris Hamonangan" className="w-full h-full object-cover object-top absolute inset-0" loading="eager" />
                </div>

                {/* Bottom name strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-8"
                  style={{
                    background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 100%)",
                  }}
                >
                  <p className="font-mono text-xs text-gold-400 tracking-widest mb-0.5">PORTOFOLIO 2026</p>
                  <p className="text-white font-semibold text-sm leading-tight">Ramzy Junfaris H.</p>
                </div>
              </motion.div>

              {/* Floating badge — Open to Work */}
              <motion.div
                className="absolute -bottom-4 -left-4 glass-gold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                animate={isInView ? { y: [0, -6, 0] } : { y: 0 }}
                transition={{ duration: 4, repeat: isInView ? Infinity : 0, ease: "easeInOut", delay: 1 }}
              >
                <Sparkles size={12} className="text-gold-400" />
                <span className="text-xs font-mono text-gold-400">Open to Work</span>
              </motion.div>

              {/* Floating badge — Location */}
              <motion.div
                className="absolute -top-4 -right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5"
                animate={isInView ? { y: [0, -6, 0] } : { y: 0 }}
                transition={{ duration: 5, repeat: isInView ? Infinity : 0, ease: "easeInOut", delay: 0.5 }}
              >
                <MapPin size={12} className="text-teal-400" />
                <span className="text-xs font-mono text-teal-400">Indonesia</span>
              </motion.div>

              {/* Floating badge — Education */}
              <motion.div
                className="absolute top-1/2 -right-5 -translate-y-1/2 glass px-3 py-1.5 rounded-full flex items-center gap-1.5"
                animate={isInView ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ duration: 5, repeat: isInView ? Infinity : 0, ease: "easeInOut", delay: 2 }}
              >
                <GraduationCap size={12} className="text-teal-400" />
                <span className="text-xs font-mono text-teal-400">Informatika</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Info (tidak berubah) */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">Portofolio 2026</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Ramzy <span className="text-gradient-gold">Junfaris</span>
              <br />
              <span className="text-white/90">Hamonangan</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-2 mb-6">
              {roles.map((role, i) => (
                <span
                  key={role}
                  className="text-xs font-mono px-3 py-1 rounded-full glass border"
                  style={{
                    borderColor: i % 2 === 0 ? "rgba(244,197,66,0.3)" : "rgba(20,184,166,0.3)",
                    color: i % 2 === 0 ? "#f4c542" : "#2dd4bf",
                  }}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-white/60 leading-relaxed mb-8 text-base max-w-lg">
              Halo, saya Ramzy. Mahasiswa Informatika yang memiliki minat dalam pengembangan perangkat lunak, backend development, desain antarmuka, serta pengembangan game. Saya senang mempelajari teknologi baru dan terus mengembangkan
              kemampuan untuk menciptakan solusi digital yang bermanfaat.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4">
              <a href="#footer" className="btn-primary">
                Hubungi Saya
              </a>
              <a href="#projects" className="btn-outline">
                Lihat Portofolio
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator — cuma perlu keliatan pas awal, hentikan kalau udah discroll */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" animate={isInView ? { y: [0, 8, 0] } : { y: 0 }} transition={{ duration: 2, repeat: isInView ? Infinity : 0 }}>
          <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="text-gold-400" />
        </motion.div>
      </div>
    </section>
  );
}
