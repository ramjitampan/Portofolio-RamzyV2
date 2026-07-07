import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Taruh komponen ini di dalam Home.jsx (paling atas, sebelum section lain).
// Fungsinya: kalau URL punya hash (misal "/#skills") setelah pindah halaman,
// dia scroll ke section itu dengan animasi smooth, sedikit delay supaya
// transisi framer-motion selesai dulu.
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);

    return () => clearTimeout(timeout);
  }, [location]);

  return null;
}
