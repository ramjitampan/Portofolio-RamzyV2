import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { ImageIcon, X, Wrench } from "lucide-react";

const categories = ["Semua", "Manipulasi Foto", "Poster Desain", "UI Desain", "Foto grafis"];
const designs = [
  {
    id: 1,
    title: "Dashboard QuickFix 2026",
    category: "UI Desain",
    color: "#f4c542",
    image: "/designs/DASBORD.webp",
    description:
      "Desain dashboard Sederhana Matakuliah UI/UX Dimana hasil dari user experience membantu user mengembangkan mimpinya https://www.figma.com/design/jKzPqkgg6fY7TtRO0LyRqq/TugasUI-UX---QuickFix?node-id=0-1&t=1NgU42WPlLZE5nVV-1.",
    tools: ["Figma"],
  },
  {
    id: 2,
    title: "Manipulasi Foto Minecraft 2025",
    category: "Manipulasi Foto",
    color: "#4ade80",
    image: "https://i.pinimg.com/736x/26/58/75/265875c70f4994fbb229f4c8edb07c15.jpg",
    description: "Eksperimen manipulasi foto bertema Minecraft, menggabungkan elemen game ke dalam foto asli dengan pencahayaan yang disesuaikan.",
    tools: ["Photoshop"],
  },
  {
    id: 3,
    title: "Referensi Poster 2025",
    category: "Poster Desain",
    color: "#fb7185",
    image: "https://i.pinimg.com/736x/24/0c/11/240c11301095c88a1f3eb6ccb0ffb27f.jpg",
    description: "Poster dengan komposisi tipografi Warna Ungu tentang PHP.",
    tools: ["Photoshop"],
  },
  {
    id: 4,
    title: "GOAT Manipulasi Foto  2025",
    category: "Manipulasi Foto",
    color: "#fb7185",
    image: "https://i.pinimg.com/736x/61/9d/9c/619d9ccfcc78bef1d8b9fb910c534dfb.jpg",
    description: "Manipulasi foto dengan bersama Pemain bola terkenal (lionel messi, Erling Haaland, Ronaldinho).",
    tools: ["Photoshop"],
  },
  {
    id: 5,
    title: "Foto Grafis UNP 2024",
    category: "Foto grafis",
    color: "#60a5fa",
    image: "https://github.com/ramjitampan/Portofolio/blob/main/public/SUNSET_UNP.png?raw=true",
    description: "foto grafis yang menciptakan efek visual yang menarik Jaman UNP sebelum dibangun Gedung baru.",
    tools: ["Photoshop"],
  },
  {
    id: 6,
    title: "Skill Isu 2024",
    category: "Poster Desain",
    color: "#60a5fa",
    image: "https://github.com/ramjitampan/Portofolio/blob/main/public/SKILL%20ISU.png?raw=true",
    description: 'Desain grafis tema badut dan meme "nah i win" dengan sedikit bumbu meme dengan mengganti nahh skill isue.',
    tools: ["Photoshop"],
  },
  {
    id: 7,
    title: "Potret Restu 2024",
    category: "Foto grafis",
    color: "#1d750a",
    image: "https://github.com/ramjitampan/Portofolio/blob/main/public/RESTU2.png?raw=true",
    description: "Foto grafis Restu, dengan efek visual hijau seperti Nuanasa horor.",
    tools: ["Photoshop"],
  },
  {
    id: 8,
    title: "Champions PESS(2025) 2025",
    category: "Manipulasi Foto",
    color: "#0066ff",
    image: "https://i.pinimg.com/736x/cd/3a/2d/cd3a2d28e1f45b490516615732851e10.jpg",
    description: "Manipulasi foto dengan tema piala champions PESS 2025, saat bermain ps3 di rental ps.",
    tools: ["Photoshop"],
  },
];

// Deteksi lebar layar buat nentuin jumlah kolom masonry.
// Debounced ringan, cuma update state pas breakpoint beneran berubah (bukan tiap pixel resize).
function useColumnCount() {
  const [cols, setCols] = useState(() => (typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 2));

  useEffect(() => {
    function handleResize() {
      const next = window.innerWidth >= 768 ? 3 : 2;
      setCols((prev) => (prev === next ? prev : next));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return cols;
}

function DesignCard({ item, onClick }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className="group relative block w-full rounded-2xl overflow-hidden glass card-hover cursor-pointer text-left"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-auto block"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "flex";
          }}
        />
      ) : null}

      {/* Fallback — muncul kalau image kosong / gagal dimuat */}
      <div className="w-full aspect-video flex-col items-center justify-center" style={{ display: item.image ? "none" : "flex", background: `linear-gradient(135deg, ${item.color}12, rgba(2,8,23,0.9))` }}>
        <ImageIcon size={28} style={{ color: item.color, opacity: 0.5 }} />
        <p className="text-white/30 text-xs font-mono mt-2">Tambah Foto</p>
      </div>

      {/* Overlay saat hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-4"
        style={{ background: `linear-gradient(to top, ${item.color}35, rgba(2,8,23,0.2) 55%, transparent)` }}
      >
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full mb-1.5" style={{ background: `${item.color}25`, color: item.color, border: `1px solid ${item.color}40` }}>
          {item.category}
        </span>
        <h4 className="font-body font-semibold text-white text-sm text-center mb-1">{item.title}</h4>
        <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase">Lihat Detail →</span>
      </div>
    </motion.button>
  );
}

export default function DesignResults() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selected, setSelected] = useState(null);
  const columnCount = useColumnCount();

  const filteredDesigns = activeCategory === "Semua" ? designs : designs.filter((item) => item.category === activeCategory);

  // Distribusi round-robin: foto ke-0 -> kolom 0, foto ke-1 -> kolom 1, dst.
  // Ini jaga urutan baca tetap natural (kiri ke kanan) dan gak ada tabrakan
  // tinggi antar kolom seperti yang terjadi di CSS `columns`.
  const columns = useMemo(() => {
    const result = Array.from({ length: columnCount }, () => []);
    filteredDesigns.forEach((item, i) => {
      result[i % columnCount].push(item);
    });
    return result;
  }, [filteredDesigns, columnCount]);

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#a78bfa" }} />
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Galeri Desain</span>
            <div className="w-8 h-px" style={{ background: "#a78bfa" }} />
          </div>
          <h2 className="section-title text-white">
            Hasil <span className="text-gradient">Desain</span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">Kumpulan karya desain grafis dan UI/UX yang telah saya buat. Klik untuk lihat detail.</p>
        </motion.div>

        {/* Filter kategori */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs font-mono px-4 py-2 rounded-full border transition-all duration-300"
              style={
                activeCategory === cat
                  ? { background: "linear-gradient(135deg, #f4c542, #e8b820)", color: "#020817", borderColor: "transparent" }
                  : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.08)" }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry manual — tiap kolom adalah flex-col terpisah, jadi susunan stabil & rapi */}
        {filteredDesigns.length > 0 ? (
          <div className="flex gap-4 items-start">
            {columns.map((col, ci) => (
              <div key={ci} className="flex-1 flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {col.map((item) => (
                    <DesignCard key={item.id} item={item} onClick={() => setSelected(item)} />
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/30 text-sm font-mono mt-10">Belum ada karya di kategori ini.</p>
        )}

        <p className="text-center text-white/30 text-xs font-mono mt-8">foto foto tersebut berada di Pinterest dan Github ini sebagai presentasi.galeri saya</p>
      </div>

      {/* Modal detail project */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: "rgba(2,8,23,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl glass"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(2,8,23,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X size={16} className="text-white/80" />
              </button>

              {selected.image && <img src={selected.image} alt={selected.title} className="w-full h-auto max-h-[45vh] object-cover" />}

              <div className="p-6">
                <span className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-3" style={{ background: `${selected.color}20`, color: selected.color, border: `1px solid ${selected.color}35` }}>
                  {selected.category}
                </span>

                <h3 className="font-display text-2xl font-bold text-white mb-3">{selected.title}</h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6">{selected.description}</p>

                {selected.tools?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Wrench size={14} className="text-white/40" />
                      <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Tools digunakan</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.tools.map((tool) => (
                        <span key={tool} className="text-xs font-mono px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
