import { motion } from "framer-motion";
import { Lock } from "lucide-react";

// GANTI array ini dengan sertifikat kamu sendiri.
// Taruh gambar di /public/certificates/ lalu isi path-nya di bawah.
// Tambah/kurangi item sesuka kamu, layout grid-nya otomatis menyesuaikan.
const CERTIFICATES = [
  { id: 1, title: "MTCNA Microtic Learning", src: "/Sertifiakt/MICRTIK-1.png" },
  { id: 2, title: "SERTIFIKAT NASTEC 2025 NON,Universitas Syiah Kuala Banda Aceh ", src: "/Sertifiakt/SERTIFIKAT NASTEC 2025 NON USK-4.png" },
];

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden glass-gold card-hover"
    >
      <img
        src={cert.src}
        alt={cert.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.55] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center text-gold-400 opacity-90 transition-opacity duration-500 group-hover:opacity-0">
        <Lock size={28} strokeWidth={1.75} />
      </div>
      <div className="absolute inset-x-0 bottom-0 py-3 px-3 text-center text-sm text-white/90 font-body bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">{cert.title}</div>
    </motion.div>
  );
}

export default function Sertifikat() {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mesh-bg min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h1 className="section-title text-gradient-gold">Sertifikat</h1>
        <p className="font-body text-white/60 text-sm md:text-base">Beberapa sertifikat yang sudah aku kumpulkan sepanjang perjalanan belajar. Arahkan kursor ke salah satu untuk membukanya.</p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6">
        {CERTIFICATES.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
