import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "AwanCoffe E-Commerce App",
    desc: "Aplikasi bernama awancoffee ini adalah sebuah platform e-commerce yang memungkinkan pengguna untuk menjelajahi, memilih, dan membeli berbagai produk kopi. Aplikasi ini dibangun menggunakan fluter sederhana dimana ini tugas kuliah semester 5 saya dalam mobile programing, untuk beckendnya menggunakan firebase dan untuk database menggunakan firestore. Aplikasi ini memiliki fitur autentikasi pengguna, keranjang belanja, dan iventaris produk yang diambil dari database Firestore. Aplikasi ini juga memiliki desain antarmuka yang responsif dan interaktif, memberikan pengalaman belanja yang menyenangkan bagi pengguna.",
    tags: ["React", "Vite", "Laravel", "MySQL", "Tailwind CSS"],
    github: "https://github.com/ramjitampan/AwanCoffe",
    demo: null,
    color: "#f4c542",
  },
  {
    title: "Backend REST API Service colab bersama teman bernama Afif Irham Nobel",
    desc: "REST API service menggunakan Laravel untuk menejemen Sistem Informasi Fasilitas Kampus, dimana API ini menyediakan endpoint untuk CRUD data fasilitas dan bangunan dan kategori masalah , autentikasi pengguna, dan integrasi dengan database MySQL.",
    tags: ["Laravel", "REST API", "MySQL"],
    github: "https://github.com/ramjitampan/SIFKA",
    demo: null,
    color: "#4ade80",
  },
  {
    title: "Sistem Informasi Fasilitas Kampus colab bersama teman bernama Afif Irham Nobel",
    desc: "Nah disini frontendnya menggunakan React Vite dan Tailwind CSS, dimana aplikasi ini menampilkan data fasilitas dan bangunan kampus, serta kategori masalah yang diambil dari REST API service yang telah dibuat sebelumnya. Aplikasi ini juga memiliki fitur autentikasi pengguna dan integrasi dengan Google Maps API untuk menampilkan lokasi fasilitas.",
    tags: ["Vite", "animasi js", "Tailwind css", "Map Api"],
    github: "https://github.com/ramjitampan/SIFKA---Sistem-Informasi-Fasilitas-Kampus",
    demo: null,
    color: "#38bdf8",
  },
  {
    title: "UI/UX Design System",
    desc: "Kumpulan komponen desain yang konsisten dan siap pakai, dirancang menggunakan Figma dengan prinsip atomic design untuk mempercepat proses development.",
    tags: ["Figma", "UI/UX", "Design System", "Prototyping"],
    github: "https://github.com/ramzy-junfaris/project-4",
    demo: null,
    color: "#f24e1e",
  },
  {
    title: "Mobile App Android",
    desc: "Aplikasi Android sederhana untuk manajemen tugas harian berbasis Java dengan fitur notifikasi, kategorisasi, dan penyimpanan data lokal menggunakan SQLite.",
    tags: ["Android Studio", "Java", "SQLite", "Mobile Dev"],
    github: "https://github.com/ramzy-junfaris/project-5",
    demo: null,
    color: "#a78bfa",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-28 relative" ref={ref}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(244,197,66,0.2), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#f4c542" }} />
            <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">Proyek</span>
            <div className="w-8 h-px" style={{ background: "#f4c542" }} />
          </div>
          <h2 className="section-title text-white">
            Hasil <span className="text-gradient">Karya</span> Saya
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">Kumpulan proyek yang telah saya kerjakan selama proses belajar dan pengembangan diri.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6 card-hover group relative overflow-hidden flex flex-col"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              whileHover={{ borderColor: `${project.color}30` }}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: project.color, transform: "translate(50%, -50%)" }} />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${project.color}18`, border: `1px solid ${project.color}30` }}>
                  <Code2 size={18} style={{ color: project.color }} />
                </div>
                <div className="flex items-center gap-2">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass hover:bg-white/10 transition-colors">
                    <Github size={15} className="text-white/60 hover:text-white" />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass hover:bg-white/10 transition-colors">
                      <ExternalLink size={15} className="text-white/60 hover:text-white" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-body font-semibold text-white mb-2 text-sm leading-snug">{project.title}</h3>
              <p className="text-white/45 text-xs leading-relaxed mb-4 flex-1">{project.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
