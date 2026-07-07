import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-950"
      style={{ background: '#020817' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Logo */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(244,197,66,0.15), rgba(20,184,166,0.15))',
            border: '1px solid rgba(244,197,66,0.3)'
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        >
          <span className="font-display text-3xl font-bold text-gradient">R</span>
        </motion.div>

        {/* Name */}
        <motion.p
          className="font-display text-xl text-white/60 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Memuat Portofolio...
        </motion.p>

        {/* Loading bar */}
        <div className="w-48 mx-auto h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #f4c542, #14b8a6)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
