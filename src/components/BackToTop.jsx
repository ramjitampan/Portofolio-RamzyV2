import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center glass-gold transition-all duration-300 hover:scale-110"
          style={{ boxShadow: '0 0 20px rgba(244,197,66,0.3)' }}
        >
          <ArrowUp size={18} className="text-gold-400" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
