import { motion } from "framer-motion";
import ScrollToHash from "./ScrollToHash";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Learning from "./Learning";
import Hobbies from "./Hobbies";
import Inspirasi from "./Inspirasi";
import Partnership from "./Partnership";
import DesignResults from "./DesignResults";
import Projects from "./Projects";
import Timeline from "./Timeline";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5, ease: "easeOut" }}>
      <ScrollToHash />
      <main className="mesh-bg">
        <Hero />
        <About />
        <Skills />
        <Learning />
        <Hobbies />
        <Projects />
        <DesignResults />
        <Inspirasi />
        <Partnership />
        <Timeline />
      </main>
    </motion.div>
  );
}
