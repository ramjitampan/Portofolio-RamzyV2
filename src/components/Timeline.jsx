import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Rocket, Code2, Server, Briefcase } from "lucide-react";

const events = [
  {
    year: "2023",
    icon: Rocket,
    title: "Awal Perjalanan",
    desc: "Mulai fokus mempelajari pemrograman secara serius — berkenalan dengan dasar-dasar logika komputasi, algoritma, dan cara berpikir seorang developer.",
    color: "#f4c542",
    side: "left",
  },
  {
    year: "2024",
    icon: Code2,
    title: "Kegiatan Belajar & Proyek Web",
    desc: "Mempelajari React, Node.js, dan UI/UX design. Mulai membangun proyek web pertama dan memahami alur pengembangan modern dari nol sampai deploy.",
    color: "#14b8a6",
    side: "right",
  },
  {
    year: "2025",
    icon: Server,
    title: "Backend & Database Development",
    desc: "Mendalami backend dengan Laravel dan Node.js, mengeksplorasi MongoDB dan MySQL, serta memahami arsitektur sistem yang lebih terstruktur.",
    color: "#a78bfa",
    side: "left",
  },
  {
    year: "2026",
    icon: Briefcase,
    title: "Proyek Nyata & Persiapan Industri",
    desc: "Mengerjakan proyek nyata, memperdalam UI/UX dan desain grafis, sambil mulai menjajaki dunia 3D dan pengembangan game untuk bekal masuk industri.",
    color: "#fb7185",
    side: "right",
    current: true,
  },
];

function TimelineNode({ event, index, total, scrollYProgress, inView }) {
  const Icon = event.icon;
  const target = total > 1 ? index / (total - 1) : 0;
  const start = Math.max(target - 0.12, 0);

  // motion values ini update lewat requestAnimationFrame, bukan re-render React,
  // jadi aman dipakai buat efek yang nempel ke posisi scroll tanpa bikin lag
  const glowOpacity = useTransform(scrollYProgress, [start, target], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [start, target], [0.6, 1.2]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className={`relative flex gap-5 md:gap-8 items-start ${event.side === "right" ? "md:flex-row-reverse" : ""}`}
    >
      {/* dot + icon */}
      <div className="relative flex-shrink-0 z-10">
        <motion.div className="absolute inset-0 rounded-full blur-md" style={{ background: event.color, opacity: glowOpacity, scale: glowScale }} />
        <div className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${event.current ? "ring-pulse" : ""}`} style={{ background: `${event.color}20`, border: `2px solid ${event.color}` }}>
          <Icon size={17} style={{ color: event.color }} />
        </div>
      </div>

      {/* card */}
      <div className="flex-1 md:max-w-[calc(50%-40px)] pb-2">
        <div className={`relative glass rounded-2xl p-5 md:p-6 card-hover overflow-hidden ${event.side === "right" ? "md:text-right" : ""}`} style={{ border: `1px solid ${event.color}25` }}>
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: event.color }} />

          <div className={`flex items-center gap-2 ${event.side === "right" ? "md:justify-end" : ""}`}>
            <span className="font-mono text-lg font-bold" style={{ color: event.color }}>
              {event.year}
            </span>
            {event.current && (
              <span className="text-[10px] font-body uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: `${event.color}20`, color: event.color }}>
                Sekarang
              </span>
            )}
          </div>

          <h3 className="font-body font-semibold text-white text-sm md:text-base mt-2 mb-2">{event.title}</h3>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed">{event.desc}</p>
        </div>
      </div>

      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });

  // scaleY (transform) jauh lebih ringan daripada animasi height,
  // karena transform tidak memicu reflow/layout ulang tiap frame
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="py-24 md:py-28 relative" ref={sectionRef}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)" }} />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#a78bfa" }} />
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Perjalanan</span>
            <div className="w-8 h-px" style={{ background: "#a78bfa" }} />
          </div>
          <h2 className="section-title text-white">
            Perjalanan <span className="text-gradient">Saya</span>
          </h2>
        </motion.div>

        <div className="relative" ref={trackRef}>
          {/* rel dasar (redup, statis) */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          {/* garis yang "mengisi" ngikutin posisi scroll kamu */}
          <motion.div
            style={{
              scaleY: lineScale,
              transformOrigin: "top",
              background: "linear-gradient(to bottom, #f4c542, #14b8a6, #a78bfa, #fb7185)",
            }}
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-12">
            {events.map((event, i) => (
              <TimelineNode key={event.year} event={event} index={i} total={events.length} scrollYProgress={scrollYProgress} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
