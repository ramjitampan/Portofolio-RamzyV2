import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Palette, Globe, Gamepad2, Cpu, Video, Server } from 'lucide-react'

const hobbies = [
  {
    icon: Palette,
    title: 'Desain Grafis',
    desc: 'Menciptakan visual yang estetis dan bermakna menggunakan berbagai tools desain.',
    color: '#f4c542',
    gradient: 'from-yellow-500/10 to-orange-500/5',
  },
  {
    icon: Globe,
    title: 'Pengembangan Website',
    desc: 'Membangun antarmuka web yang responsif, cepat, dan interaktif.',
    color: '#38bdf8',
    gradient: 'from-sky-500/10 to-blue-500/5',
  },
  {
    icon: Gamepad2,
    title: 'Pengembangan Game',
    desc: 'Mengeksplorasi dunia game development dengan berbagai mesin game modern.',
    color: '#a78bfa',
    gradient: 'from-violet-500/10 to-purple-500/5',
  },
  {
    icon: Cpu,
    title: 'Teknologi dan AI',
    desc: 'Mengikuti perkembangan teknologi terkini terutama di bidang kecerdasan buatan.',
    color: '#2dd4bf',
    gradient: 'from-teal-500/10 to-emerald-500/5',
  },
  {
    icon: Video,
    title: 'Editing Video',
    desc: 'Mengolah dan menyunting video untuk berbagai kebutuhan konten digital.',
    color: '#fb7185',
    gradient: 'from-rose-500/10 to-pink-500/5',
  },
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Merancang sistem server, API, dan arsitektur database yang efisien.',
    color: '#4ade80',
    gradient: 'from-green-500/10 to-emerald-500/5',
  },
]

export default function Hobbies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 relative" ref={ref}>
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.2), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: '#14b8a6' }} />
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">Minat & Hobi</span>
            <div className="w-8 h-px" style={{ background: '#14b8a6' }} />
          </div>
          <h2 className="section-title text-white">
            Hobi dan <span className="text-gradient">Ketertarikan</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 card-hover group relative overflow-hidden cursor-default"
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${h.color}12, transparent 70%)` }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${h.color}18`, border: `1px solid ${h.color}25` }}
              >
                <h.icon size={22} style={{ color: h.color }} />
              </div>

              <h3 className="font-body font-semibold text-white mb-2 text-sm">{h.title}</h3>
              <p className="text-white/45 text-xs leading-relaxed">{h.desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, ${h.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
