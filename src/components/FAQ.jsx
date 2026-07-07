import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    q: "Apakah Ramzy menerima proyek freelance?",
    a: "Saat ini saya terbuka untuk peluang freelance, kolaborasi, maupun kesempatan magang dan pekerjaan penuh waktu sesuai dengan bidang yang saya tekuni.",
  },
  {
    q: "Teknologi apa yang paling sering digunakan?",
    a: "Saya sering menggunakan React, Laravel, Tailwind CSS, JavaScript, PHP, MySQL, serta terus mempelajari integrasi Artificial Intelligence dan pengembangan aplikasi modern.",
  },
  {
    q: "Mengapa tertarik pada pengembangan perangkat lunak?",
    a: "Saya menikmati proses mengubah ide menjadi solusi digital yang nyata. Selain itu saya juga memiliki ketertarikan pada desain visual, motion graphics, dan pengalaman pengguna sehingga setiap proyek tidak hanya berfungsi dengan baik tetapi juga nyaman digunakan.",
  },
  {
    q: "Apakah seluruh project di portfolio ini adalah project nyata?",
    a: "Sebagian merupakan project akademik, project pribadi, dan project selama pengalaman magang yang telah disesuaikan agar tetap menjaga kerahasiaan data perusahaan.",
  },
];

function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }} className="border-b border-white/10">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-6 text-left group">
        <span className="font-display text-base md:text-lg font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className={`flex-shrink-0 ${isOpen ? "text-gold-400" : "text-white/40"}`}>
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="overflow-hidden">
            <p className="font-body text-sm md:text-base text-white/55 leading-relaxed pb-6 pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mesh-bg min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold-400/70 mb-3">— FAQ</p>
          <h1 className="section-title text-gradient-gold">Pertanyaan yang sering diajukan.</h1>
          <p className="font-body text-white/55 max-w-xl">Beberapa hal yang sering ditanyakan soal aku dan project-project di portofolio ini.</p>
        </div>

        <div className="mb-14">
          {FAQS.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="glass-gold rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="text-gold-400 mt-1" size={22} />
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Masih penasaran?</h3>
              <p className="font-body text-sm text-white/55 mt-1">Tanya aja langsung ke asisten pribadiku\\, Yuki.</p>
            </div>
          </div>
          <Link to="/yuki" className="btn-primary text-xs whitespace-nowrap">
            Tanya Yuki
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
