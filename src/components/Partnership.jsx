import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Users } from "lucide-react";

const partners = [
  {
    name: "Agil Mardian Hawari",
    role: "Data Science & Analytics",
    initial: "AH",
    color: "#f4c542",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFXifr1h_WWdw/profile-displayphoto-scale_400_400/B56ZxatrhWIAAg-/0/1771048452387?e=1784764800&v=beta&t=GafFXvkXyI4qthrayXLJ5kaBBjrlodoztCQ_spRcdng",
    linkedin: "https://www.linkedin.com/in/agil-mardian-hawari/",
  },
  {
    name: "Fatahul Fahmi",
    role: "Fullstack Developer",
    initial: "FF",
    color: "#38bdf8",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGodSxOYAwj9g/profile-displayphoto-shrink_400_400/B56ZxWmc8aJAAg-/0/1770979447039?e=1784764800&v=beta&t=q3HFxZkojwyeph90TGebHupwwRr03hbTtlIubxyKuZs",
    linkedin: "https://www.linkedin.com/in/fatahul-fahmi-b725052aa/",
  },
  {
    name: "Brian Makmur",
    role: "AI & Machine Learning",
    initial: "BR",
    color: "#4ade80",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEklXkPRY3BgQ/profile-displayphoto-scale_400_400/B56Z3zRwCrIYAg-/0/1777903010786?e=1784764800&v=beta&t=29dxrfaDQYLU6a6MDKSbCOVGb-yAjZvUrkkalzjFj4k",
    linkedin: "https://www.linkedin.com/in/brian-makmur-2167633aa/",
  },
  {
    name: "Kelvin Arianda",
    role: "Data Analyst",
    initial: "KA",
    color: "#a78bfa",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGIQbJ8RKk_FQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1688363342931?e=1784764800&v=beta&t=zjITzAWqG6izWvx0463mby4Et8aDfLz_sWnYYuftN2I",
    linkedin: "https://www.linkedin.com/in/kelvin-arianda-1581b6282/",
  },
  {
    name: "Restu Anugrah Prasutio",
    role: "Fullstack Developer",
    initial: "RAP",
    color: "#f97316",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGqda7XM5X2ig/profile-displayphoto-scale_400_400/B56Z6Le6XiHUAk-/0/1780456598186?e=1784764800&v=beta&t=x8SDQiFFZQ3a6NpvJbO0yJk9QB5CmwKro1LMqhBUC-Y",
    linkedin: "https://www.linkedin.com/in/restu-anugrah-prasetyo-7072473a6/",
  },
  {
    name: "Florensius Panca Gati",
    role: "Backend & AI Enthusiast",
    initial: "FG",
    color: "#f50505",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGgQ1PVuJbCzg/profile-displayphoto-scale_400_400/B56ZjwvGhrHkAk-/0/1756385536800?e=1784764800&v=beta&t=L_0iq_F_Uw7ofImLxE8Duk_sD2LNVUcJZfNVz8NYAB4",
    linkedin: "https://www.linkedin.com/in/fpgati/",
  },
];

function Avatar({ p, size = 88 }) {
  const [failed, setFailed] = useState(false);
  const showImage = p.image && !failed;

  return (
    <motion.div
      className="rounded-full flex items-center justify-center glass transition-all duration-300 overflow-hidden"
      style={{ width: size, height: size, border: `1px solid ${p.color}30` }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 20px ${p.color}40`,
        borderColor: `${p.color}60`,
      }}
    >
      {showImage ? (
        <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-full" onError={() => setFailed(true)} />
      ) : (
        <span className="font-display text-base font-bold" style={{ color: p.color }}>
          {p.initial}
        </span>
      )}
    </motion.div>
  );
}

function PartnerCard({ p }) {
  const hasLink = Boolean(p.linkedin);

  return (
    <a
      href={hasLink ? p.linkedin : undefined}
      target={hasLink ? "_blank" : undefined}
      rel={hasLink ? "noreferrer" : undefined}
      className={`flex-shrink-0 w-28 md:w-32 flex flex-col items-center gap-2 group ${hasLink ? "cursor-pointer" : "cursor-default"}`}
      onClick={(e) => {
        if (!hasLink) e.preventDefault();
      }}
    >
      <Avatar p={p} />
      <p className="text-white/60 text-xs font-medium text-center leading-tight group-hover:text-white transition-colors duration-300">{p.name}</p>
      <p className="text-white/30 text-[11px] font-mono text-center">{p.role}</p>
    </a>
  );
}

export default function Partnership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const looped = useMemo(() => [...partners, ...partners], []);

  // dikontrol lewat state, bukan class CSS -- supaya nggak kalah
  // spesifisitas sama inline style animation-nya
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-16 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Users size={14} className="text-white/30" />
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Teman teman Kuliah</span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-white/70">
            People Behind <span className="text-gradient">My Journey</span>
          </h3>
        </motion.div>

        <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] overflow-hidden py-6 -my-6">
          <div
            className="flex gap-8 w-max"
            style={{
              animation: "certScrollLeft 32s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {looped.map((p, i) => (
              <PartnerCard key={`${p.name}-${i}`} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
