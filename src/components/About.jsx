import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Code2, Layers, Sparkles, Rocket, Zap } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "3+", label: "Tahun Belajar Teknologi", color: "#f4c542", description: "Konsisten mengasah skill" },
  { icon: Code2, value: "10+", label: "Proyek Akademik", color: "#14b8a6", description: "Dari kecil hingga kompleks" },
  { icon: Layers, value: "5+", label: "Bidang yang Dipelajari", color: "#f4c542", description: "Full-stack, game, UI/UX" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Main Content */}
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ background: "#f4c542" }} />
                <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">Tentang Saya</span>
              </div>

              <motion.h2 className="section-title text-white mb-6" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
                Siapa <span className="text-gradient">Ramzy</span>?
              </motion.h2>

              <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
                <div className="glass-card rounded-2xl p-6 mb-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap size={18} className="text-gold-400" />
                    <span className="text-sm font-medium text-white/80">Mahasiswa Informatika Universitas Negeri Padang</span>
                  </div>
                  <p className="text-white/70 leading-relaxed text-base mb-4">
                    Saya merupakan mahasiswa Informatika yang memiliki ketertarikan pada dunia teknologi, desain, dan pengembangan perangkat lunak. Saat ini saya fokus mempelajari <span className="text-gold-400">backend development</span>,{" "}
                    <span className="text-teal-400">web development</span>, React, Node.js, serta pengembangan game menggunakan Godot.
                  </p>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Saya percaya bahwa belajar adalah proses yang tidak pernah berhenti. Dengan semangat yang tinggi, saya terus berusaha mengasah kemampuan teknis maupun kreatif untuk menghadirkan solusi digital yang inovatif dan bermakna.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-white/60 font-mono border border-white/10">#NeverStopLearning</span>
                <span className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-white/60 font-mono border border-white/10">#CodeWithPurpose</span>
                <span className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-white/60 font-mono border border-white/10">#InnovationDriven</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Stats Grid */}
          <div className="space-y-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                whileHover={{ scale: 1.02, x: 8 }}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 border border-white/5 hover:border-white/15"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                  animate={floatAnimation}
                  whileHover={{ scale: 1.1 }}
                >
                  <s.icon size={24} style={{ color: s.color }} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse" style={{ background: s.color }} />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-3xl font-bold" style={{ color: s.color }}>
                      {s.value}
                    </span>
                    <span className="text-white/40 text-xs font-mono">{s.description}</span>
                  </div>
                  <div className="text-white/70 text-sm font-medium mt-1">{s.label}</div>
                </div>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Sparkles size={14} className="text-white/20" />
                </motion.div>
              </motion.div>
            ))}

            {/* Decorative quote */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="mt-6 pt-4 text-center">
              <p className="text-white/30 text-xs font-mono italic tracking-wide">"The beautiful thing about learning is that no one can take it away from you"</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
