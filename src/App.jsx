import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sertifikat from "./components/Sertifikat";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Loader from "./components/Loader";
import Layanan from "./components/service";
import FAQ from "./components/FAQ";
import Yuki from "./components/YukiPage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Loader key="loader" />}</AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/sertifikat" element={<Sertifikat />} />
              <Route path="/service" element={<Layanan />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/Yuki" element={<Yuki />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}
