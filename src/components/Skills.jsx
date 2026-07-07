import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Smartphone, Figma, Palette, Film } from "lucide-react";

const skills = [
  {
    name: "Visual Studio Code",
    icon: Code2,
    level: 90,
    color: "#2d9cdb",
    desc: "Editor utama untuk semua proyek pengembangan web dan backend.",
  },
  {
    name: "Android Studio dan Flutter",
    icon: Smartphone,
    level: 75,
    color: "#3ddc84",
    desc: "Pengembangan aplikasi mobile berbasis Android.",
  },
  {
    name: "Figma",
    icon: Figma,
    level: 85,
    color: "#f24e1e",
    desc: "Desain UI/UX, wireframing, dan prototyping antarmuka.",
  },
  {
    name: "Adobe Illustrator",
    icon: Palette,
    level: 33,
    color: "#ff9a00",
    desc: "Desain grafis vektor, dan aset visual Dalam tahap Pembelajaran.",
  },
  {
    name: "Adobe Premiere Pro",
    icon: Film,
    level: 70,
    color: "#9999ff",
    desc: "Editing video profesional untuk berbagai keperluan konten.",
  },
];

function ProgressBar({ level, color, animate }) {
  return (
    <div className="relative h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
        initial={{ width: 0 }}
        animate={animate ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      {/* decorative */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(244,197,66,0.2), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#f4c542" }} />
            <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">Keahlian</span>
            <div className="w-8 h-px" style={{ background: "#f4c542" }} />
          </div>
          <h2 className="section-title text-white">
            Software yang Saya <span className="text-gradient">Gunakan</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">Berbagai tools dan software yang saya kuasai dalam proses pengembangan dan desain.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6 card-hover group"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              whileHover={{ borderColor: `${skill.color}40` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}>
                <skill.icon size={22} style={{ color: skill.color }} />
              </div>

              {/* Info */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-body font-semibold text-white text-sm">{skill.name}</h3>
                <span className="font-mono text-xs font-medium" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
              </div>

              <p className="text-white/40 text-xs mb-4 leading-relaxed">{skill.desc}</p>

              <ProgressBar level={skill.level} color={skill.color} animate={inView} />
            </motion.div>
          ))}

          {/* Tech Stack Cards */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.6 }} className="glass rounded-2xl p-6 md:col-span-2 lg:col-span-2">
            <h3 className="font-body font-semibold text-white/80 text-sm mb-4">Stack Teknologi</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "React / Vite", color: "#61dafb" },
                { name: "Node.js", color: "#68a063" },
                { name: "Laravel", color: "#ff2d20" },
                { name: "MySQL", color: "#00758f" },
                { name: "MongoDB", color: "#47a248" },
                { name: "JavaScript", color: "#f4c542" },
                { name: "PHP", color: "#787cb5" },
                { name: "HTML / CSS", color: "#e34c26" },
                { name: "Tailwind CSS", color: "#38bdf8" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: `${tech.color}15`,
                    border: `1px solid ${tech.color}30`,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Database proficiency */}
            <div className="mt-5 space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-white/50 font-mono">MySQL</span>
                  <span className="text-xs font-mono" style={{ color: "#00758f" }}>
                    15%
                  </span>
                </div>
                <ProgressBar level={15} color="#00758f" animate={inView} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-white/50 font-mono">MongoDB</span>
                  <span className="text-xs font-mono" style={{ color: "#47a248" }}>
                    30%
                  </span>
                </div>
                <ProgressBar level={30} color="#47a248" animate={inView} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
