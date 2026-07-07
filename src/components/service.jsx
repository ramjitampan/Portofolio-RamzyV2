import { motion } from "framer-motion";
import { Code2, Film, Image as ImageIcon, LayoutTemplate, Github, Linkedin, Mail, Instagram } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Web Development",
    tags: ["React", "Laravel", "Full Stack"],
    desc: "Membangun website modern, dashboard interaktif, serta sistem informasi yang berfokus pada performa dan pengalaman pengguna.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Motion Design",
    tags: ["After Effects", "Motion Graphics", "Animation"],
    desc: "Menciptakan animasi, motion graphic, intro, dan transisi visual yang memberikan pengalaman digital lebih hidup.",
    icon: Film,
  },
  {
    number: "03",
    title: "Digital Imaging",
    tags: ["Photoshop", "Compositing", "Manipulation", "Retouch"],
    desc: "Menghasilkan karya visual melalui manipulasi foto, compositing, hingga artwork dengan pendekatan sinematik.",
    icon: ImageIcon,
  },
  {
    number: "04",
    title: "UI / UX Design",
    tags: ["Figma", "Wireframe", "Prototype", "Responsive"],
    desc: "Merancang antarmuka yang sederhana, modern, dan mudah digunakan dengan memperhatikan pengalaman pengguna.",
    icon: LayoutTemplate,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Diskusi",
    desc: "Ngobrolin kebutuhan, target, dan batasan project bareng kamu dulu.",
  },
  {
    number: "02",
    title: "Konsep",
    desc: "Susun moodboard, wireframe, dan arah desain sampai sesuai visi kamu.",
  },
  {
    number: "03",
    title: "Eksekusi",
    desc: "Proses desain & development jalan, update progress secara berkala.",
  },
  {
    number: "04",
    title: "Rilis",
    desc: "Deploy, handover, dan iterasi lanjut berdasarkan feedback nyata.",
  },
];

// GANTI href sesuai akun kamu sendiri
const SOCIALS = [
  { label: "GitHub", icon: Github, href: "https://github.com/" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/" },
  { label: "Email", icon: Mail, href: "mailto:you@email.com" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/" },
];

function SectionEyebrow({ children }) {
  return <p className="font-body text-xs tracking-[0.2em] uppercase text-gold-400/70 mb-3">— {children}</p>;
}

function ServiceRow({ service, index }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1.3fr] gap-4 md:gap-8 items-start py-8 border-b border-white/10 transition-colors duration-300 hover:border-gold-400/40"
    >
      <span className="font-display text-sm text-white/30 group-hover:text-gold-400 transition-colors duration-300">{service.number}</span>

      <div className="flex items-start gap-3">
        <Icon className="mt-1 text-gold-400/70 group-hover:text-gold-400 transition-colors duration-300" size={22} strokeWidth={1.6} />
        <div>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">{service.title}</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {service.tags.map((tag) => (
              <span key={tag} className="text-xs font-body px-3 py-1 rounded-full border border-gold-400/25 text-gold-400/80">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="font-body text-sm md:text-base text-white/55 leading-relaxed">{service.desc}</p>
    </motion.div>
  );
}

function HowItWorks() {
  return (
    <div className="relative pl-14 md:pl-20">
      {/* garis vertikal yang "tumbuh" saat discroll */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="timeline-line absolute left-5 md:left-7 top-2 bottom-2 w-[2px]"
      />

      <div className="flex flex-col gap-12">
        {STEPS.map((step, i) => (
          <motion.div key={step.number} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }} className="relative">
            <span className="absolute -left-14 md:-left-20 top-0 w-10 h-10 rounded-full glass-gold flex items-center justify-center font-display text-sm text-gold-400">{step.number}</span>
            <h4 className="font-display text-lg md:text-xl font-semibold text-white">{step.title}</h4>
            <p className="font-body text-sm md:text-base text-white/55 mt-1 max-w-md">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FindMeOnline() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {SOCIALS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="glass flex flex-col items-center gap-3 py-6 rounded-2xl transition-all duration-300 hover:glow-gold hover:border-gold-400/30"
          >
            <Icon className="text-white/70 transition-colors duration-300 group-hover:text-gold-400" size={22} />
            <span className="font-body text-xs text-white/60">{s.label}</span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default function Layanan() {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mesh-bg min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <SectionEyebrow>Layanan</SectionEyebrow>
          <h1 className="section-title text-gradient-gold">Apa yang aku kerjakan.</h1>
          <p className="font-body text-white/55 max-w-xl">Beberapa hal yang bisa aku bantu, dari pengembangan web sampai eksplorasi visual.</p>
        </div>

        <div className="mb-24">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.number} service={s} index={i} />
          ))}
        </div>

        <div className="mb-24">
          <SectionEyebrow>Cara kerja</SectionEyebrow>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-10">Prosesnya kayak gini.</h2>
          <HowItWorks />
        </div>

        <div>
          <SectionEyebrow>Temukan aku di sini</SectionEyebrow>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-10">Yuk terhubung.</h2>
          <FindMeOnline />
        </div>
      </div>
    </motion.section>
  );
}
