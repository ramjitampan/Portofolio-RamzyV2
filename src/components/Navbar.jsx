import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Beranda", href: "#hero", type: "anchor" },
  { label: "Sertifikat", href: "/sertifikat", type: "route" },
  { label: "Layanan", href: "/service", type: "route" },
  { label: "FAQ", href: "/faq", type: "route" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (l, className, onClick) => {
    if (l.type === "route") {
      return (
        <Link to={l.href} className={className} onClick={onClick}>
          {l.label}
        </Link>
      );
    }

    // link anchor: kalau lagi di home, pakai <a> biasa (scroll langsung)
    // kalau lagi di halaman lain, pakai Link ke "/#section" (balik ke home dulu)
    if (isHome) {
      return (
        <a href={l.href} className={className} onClick={onClick}>
          {l.label}
        </a>
      );
    }
    return (
      <Link to={`/${l.href}`} className={className} onClick={onClick}>
        {l.label}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5 bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-950 font-display font-bold text-sm transition-all duration-300 group-hover:scale-110"
              style={{ background: "linear-gradient(135deg, #f4c542, #e8b820)" }}
            >
              R
            </div>
            <span className="font-display font-semibold text-white/80 text-sm tracking-wide hidden sm:block">
              Ramzy<span className="text-gold-400">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.label}>{renderLink(l, "font-body text-sm text-white/60 hover:text-gold-400 transition-colors duration-200 tracking-wide")}</li>
            ))}
          </ul>

          {/* CTA */}
          <Link to="/yuki" className="hidden md:block btn-primary text-xs">
            Tanya Yuki
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white/70 hover:text-gold-400 transition-colors" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass mt-2 mx-4 rounded-2xl p-6">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.label}>{renderLink(l, "block font-body text-white/70 hover:text-gold-400 transition-colors", () => setOpen(false))}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.nav>
      {openChat && <AIChat onClose={() => setOpenChat(false)} />}
    </>
  );
}
