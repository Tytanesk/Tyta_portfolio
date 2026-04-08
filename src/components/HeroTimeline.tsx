import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const milestones = [
  {
    year: '2016',
    title: 'Start Coding',
    detail: 'Began my journey into software engineering, mastering fundamentals of algorithms, data structures, and system design.',
  },
  {
    year: '2019',
    title: 'CS Bachelor',
    detail: 'Completed a Bachelor\'s degree in Computer Science, building a strong foundation in software engineering principles.',
  },
  {
    year: '2021',
    title: 'Data Science',
    detail: 'Dove deep into data science, working with machine learning models, data pipelines, and analytical systems.',
  },
  {
    year: '2024',
    title: 'Full-Stack Dev',
    detail: 'Expanded into full-stack development, delivering end-to-end web applications with modern frameworks and cloud infrastructure.',
  },
  {
    year: '2025',
    title: 'Senior Software Engineer',
    detail: 'Stepped into a senior engineering role, leading architecture decisions and mentoring teams across complex projects.',
  },
  {
    year: '2026',
    title: 'Building the Future',
    detail: 'Pushing boundaries with AI-driven systems, scalable architectures, and next-generation software solutions.',
  },
]

export default function HeroTimeline() {
  const [active, setActive] = useState<number | null>(2)

  return (
    <section className="relative z-10 pt-20 pb-10 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold gradient-text mb-3" style={{filter:'drop-shadow(0 0 18px rgba(167,139,250,0.8))'}}>Welcome to My Journey</h1>
        <p className="text-slate-300 text-lg tracking-widest uppercase" style={{textShadow:'0 0 12px rgba(167,139,250,0.5)'}}>
          Senior Backend Engineer &amp; Blockchain Specialist
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-violet-500 via-orange-400 to-blue-500 z-0" />

        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative z-10 flex flex-col items-center cursor-pointer group"
            style={{ flex: 1 }}
            onClick={() => setActive(active === i ? null : i)}
          >
            {/* Dot */}
            <motion.div
              whileHover={{ scale: 1.3 }}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                active === i
                  ? 'bg-orange-400 border-orange-300 glow-orange'
                  : 'bg-violet-500 border-violet-300 glow-purple'
              }`}
            />
            <span className="mt-2 text-sm font-bold text-violet-300">{m.year}</span>
            <span className="text-xs text-slate-400 text-center mt-1 max-w-[100px]">{m.title}</span>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: active === i ? 180 : 0 }}
              className="mt-1 text-violet-400 opacity-60"
            >
              <ChevronDown size={14} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Expanded detail card */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="mt-8 card-dark rounded-xl p-6 max-w-md glow-purple"
          >
            <h3 className="text-orange-400 font-bold text-lg mb-2">
              {milestones[active].year} — {milestones[active].title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{milestones[active].detail}</p>
            <button className="mt-4 text-xs text-violet-400 border border-violet-500 px-3 py-1 rounded hover:bg-violet-500/20 transition-colors">
              More Details ▾
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
