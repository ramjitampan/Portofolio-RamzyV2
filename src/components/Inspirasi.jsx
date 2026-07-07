import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star } from "lucide-react";

// Tambahin `image` di tiap orang kalau fotonya udah ada.
// Bisa path lokal ("/inspirasi/ghazian.jpg") atau URL langsung.
// Kalau `image` kosong atau gagal dimuat, otomatis fallback ke lingkaran inisial.
const inspirations = [
  {
    name: "Ghazian",
    role: "Senior Designer & Fullstack Engineer",
    desc: "Mentor dan inspirasi dalam dunia desain sekaligus pengembangan fullstack. Kemampuannya yang luas di dua bidang menjadi motivasi besar.",
    initial: "GH",
    color: "#f4c542",
    glow: "rgba(244,197,66,0.3)",
    image: "https://media.licdn.com/dms/image/v2/D5603AQF7KfGWn4Es2A/profile-displayphoto-scale_400_400/B56Z8ShbaEGQAk-/0/1782722182359?e=1784764800&v=beta&t=Jx3YD2ByG-eI8S0FQQ5Z5i81fFPIszDWLt3oqpp5fyY",
  },
  {
    name: "Ilham",
    role: "Systems Programming & AI Engineering",
    desc: "Sosok yang menginspirasi dengan kemampuan problem solving dan dedikasi tinggi dalam rekayasa perangkat lunak serta Developer of Aiko Compiler & Nebula Assistant.",
    initial: "IL",
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.3)",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFbXgAvjSNiwA/profile-displayphoto-scale_400_400/B56Zx44rrDKsAg-/0/1771554670528?e=1784764800&v=beta&t=29jSH_MqP0kanyHS11ihosKcwfGEr5ACj75ykX1gsl4",
  },
  {
    name: "Afif Irham Nobel",
    role: "Network Engineer",
    desc: "Pakar di bidang jaringan komputer yang membuktikan bahwa spesialisasi mendalam adalah kunci keunggulan profesional.",
    initial: "AN",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.3)",
    image: "/inspirasi/afif-irham-nobel.jpg",
  },
];

function Avatar({ person }) {
  const [failed, setFailed] = useState(false);
  const showImage = person.image && !failed;

  return (
    <motion.div
      className="w-20 h-20 rounded-full mx-auto flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${person.color}30, ${person.color}10)`,
        border: `2px solid ${person.color}40`,
      }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${person.glow}` }}
    >
      {showImage ? (
        <img src={person.image} alt={person.name} className="w-full h-full object-cover rounded-full" onError={() => setFailed(true)} />
      ) : (
        <span className="font-display text-2xl font-bold" style={{ color: person.color }}>
          {person.initial}
        </span>
      )}
    </motion.div>
  );
}

export default function Inspirasi() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(244,197,66,0.2), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#f4c542" }} />
            <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">Inspirasi</span>
            <div className="w-8 h-px" style={{ background: "#f4c542" }} />
          </div>
          <h2 className="section-title text-white">
            Orang-orang yang <span className="text-gradient">Menginspirasi</span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">Mereka yang perjalanannya memberikan semangat dan arah dalam proses belajar saya.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {inspirations.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass rounded-3xl p-8 text-center group card-hover relative overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              whileHover={{ boxShadow: `0 20px 60px ${person.glow}` }}
            >
              {/* Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={{ background: `radial-gradient(ellipse at 50% 0%, ${person.color}10, transparent 70%)` }} />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={10} fill={person.color} style={{ color: person.color }} />
                ))}
              </div>

              {/* Avatar */}
              <div className="relative mb-5 inline-block">
                <Avatar person={person} />

                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-pulse" style={{ border: `1px solid ${person.color}50`, transform: "scale(1.15)" }} />
              </div>

              <h3 className="font-display text-lg font-semibold text-white mb-1">{person.name}</h3>
              <p className="text-xs font-mono mb-3" style={{ color: person.color }}>
                {person.role}
              </p>
              <p className="text-white/45 text-xs leading-relaxed">{person.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
