import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, Heart } from "lucide-react";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/ramjitampan",
    color: "#f4c542",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ramzy-junfaris-hamonangan-942aa6334/",
    color: "#38bdf8",
  },
  {
    icon: Mail,
    label: "Email",
    // mailto: bikin browser buka aplikasi/klien email default (Gmail, Outlook, dll)
    // dengan alamat kamu udah keisi otomatis di kolom "To".
    // subject & body opsional — bisa dihapus kalau gak mau ada teks default.
    href: "mailto:ramjijunfaris28@gmail.com?subject=Halo%20Ramzy&body=Halo%20Ramzy%2C%20saya%20menemukan%20portofolio%20kamu%20dan%20ingin%20berdiskusi%20mengenai...",
    color: "#4ade80",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/ramzy.junfaris",
    color: "#fb7185",
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative pt-20 pb-8">
      {/* Top gradient border */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(244,197,66,0.3), rgba(20,184,166,0.3), transparent)" }} />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-3xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #f4c542, transparent)" }} />

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mb-6">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, rgba(244,197,66,0.15), rgba(20,184,166,0.15))", border: "1px solid rgba(244,197,66,0.2)" }}>
            <span className="font-display text-2xl font-bold text-gradient-gold">R</span>
          </div>
        </motion.div>

        {/* Thank you */}
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">
          Terima kasih telah mengunjungi <span className="text-gradient">portofolio saya.</span>
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/50 text-sm max-w-md mx-auto mb-10 leading-relaxed">
          Saya selalu terbuka untuk diskusi, kolaborasi, atau sekadar berbincang tentang teknologi dan desain. Jangan ragu untuk menghubungi saya!
        </motion.p>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-4 mb-12">
          {socials.map((s) => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2" whileHover={{ y: -4 }}>
              <div
                className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}50`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${s.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <s.icon size={18} style={{ color: "rgba(255,255,255,0.6)" }} onMouseEnter={(e) => (e.currentTarget.style.color = s.color)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")} />
              </div>
              <span className="text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors">{s.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-24 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

        {/* Copyright */}
        <p className="text-white/25 text-xs font-mono flex items-center justify-center gap-1.5">© 2026 Ramzy Junfaris Hamonangan. All Rights Reserved.</p>
      </div>
      {/* AIChat is controlled from Navbar */}
    </footer>
  );
}
