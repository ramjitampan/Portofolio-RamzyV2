import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Gamepad2, Box, Clapperboard, Image, Sparkles } from 'lucide-react'

const learning = [
  {
    icon: Gamepad2,
    name: 'Godot Engine',
    desc: 'Pengembangan game 2D/3D berbasis open source.',
    color: '#478cbf',
    progress: 20,
  },
  {
    icon: Box,
    name: 'Blender',
    desc: 'Pemodelan 3D, animasi, dan rendering.',
    color: '#e87d0d',
    progress: 15,
  },
  {
    icon: Clapperboard,
    name: 'Adobe After Effects',
    desc: 'Motion graphics dan visual effects profesional.',
    color: '#9999ff',
    progress: 25,
  },
  {
    icon: Image,
    name: 'Adobe Photoshop',
    desc: 'Manipulasi foto dan desain grafis raster.',
    color: '#31a8ff',
    progress: 35,
  },
]

export default function Learning() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 glass-gold px-4 py-2 rounded-full mb-5">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-xs font-mono text-gold-400">Sedang Dipelajari</span>
          </div>
          <h2 className="section-title text-white">
            InsyaAllah <span className="text-gradient">Bakat</span> Menyusul
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed mt-3">
            Masih dalam tahap belajar dan eksplorasi. Saya percaya bahwa kemampuan dapat
            berkembang melalui latihan yang konsisten dan kemauan untuk terus belajar.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {learning.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="glass rounded-2xl p-6 card-hover text-center group relative overflow-hidden"
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}15, transparent 70%)` }}
              />

              {/* Learning badge */}
              <div
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono mb-4"
                style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.color }} />
                Dipelajari
              </div>

              <div
                className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>

              <h3 className="font-body font-semibold text-white text-sm mb-2">{item.name}</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4">{item.desc}</p>

              {/* Mini progress */}
              <div className="h-1 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: item.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.progress}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.12 + 0.5 }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs font-mono" style={{ color: item.color }}>Pemula</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
