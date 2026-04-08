import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Layers, Users, TrendingUp } from 'lucide-react'

const cards = [
  {
    icon: Zap,
    title: 'Latency Slayer',
    stat: '30%',
    sub: 'Faster Transactions',
    color: 'from-violet-500 to-violet-800',
    glowColor: 'rgba(139,92,246,0.8)',
    borderColor: 'rgba(139,92,246,0.6)',
  },
  {
    icon: Layers,
    title: 'Scalability Architect',
    stat: '1M+',
    sub: 'TP+ Platforms',
    color: 'from-orange-500 to-orange-800',
    glowColor: 'rgba(251,146,60,0.8)',
    borderColor: 'rgba(251,146,60,0.6)',
  },
  {
    icon: Users,
    title: 'Mentor & Leader',
    stat: '',
    sub: 'Guided & Grown Dev Teams',
    color: 'from-blue-500 to-blue-800',
    glowColor: 'rgba(59,130,246,0.8)',
    borderColor: 'rgba(59,130,246,0.6)',
  },
  {
    icon: TrendingUp,
    title: 'DeFi Innovator',
    stat: '',
    sub: 'Optimized DEX Strategies',
    color: 'from-pink-500 to-pink-800',
    glowColor: 'rgba(236,72,153,0.8)',
    borderColor: 'rgba(236,72,153,0.6)',
  },
]

const skills = [
  { label: 'Solana Mastery', pct: 90, color: 'from-violet-600 to-violet-300', glow: 'rgba(139,92,246,0.7)' },
  { label: 'Rust Expertise', pct: 85, color: 'from-orange-600 to-orange-300', glow: 'rgba(251,146,60,0.7)' },
  { label: 'System Design', pct: 95, color: 'from-blue-600 to-violet-400', glow: 'rgba(99,102,241,0.7)' },
]

function SkillBar({ label, pct, color, glow }: { label: string; pct: number; color: string; glow: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-slate-200 text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: glow, boxShadow: `0 0 6px ${glow}` }} />
          {label}
        </span>
        <span className="text-white font-bold text-sm" style={{ textShadow: `0 0 8px ${glow}` }}>{pct}%</span>
      </div>
      <div className="h-3 bg-slate-900 rounded-full overflow-hidden" style={{ border: `1px solid ${glow}33` }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ boxShadow: `0 0 12px ${glow}, 0 0 24px ${glow}55` }}
        />
      </div>
    </div>
  )
}

export default function SkillsAchievements() {
  return (
    <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-2xl font-bold text-white mb-10"
        style={{ textShadow: '0 0 20px rgba(167,139,250,0.6)' }}
      >
        — My Skills &amp; Achievements —
      </motion.h2>

      {/* Achievement cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.06, y: -6 }}
            className="rounded-xl p-4 cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(8,12,40,0.88)',
              border: `1px solid ${c.borderColor}`,
              boxShadow: `0 0 16px ${c.glowColor}55, 0 0 40px ${c.glowColor}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}
              style={{ boxShadow: `0 0 12px ${c.glowColor}` }}>
              <c.icon size={16} className="text-white" />
            </div>
            <p className="text-white font-semibold text-sm">{c.title}</p>
            {c.stat && (
              <p className="text-2xl font-bold mt-1 gradient-text">{c.stat}</p>
            )}
            <p className="text-slate-400 text-xs mt-1">{c.sub}</p>
            <div className="mt-3 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent"
              style={{ borderTopColor: c.glowColor }} />
          </motion.div>
        ))}
      </div>

      {/* Skill bars */}
      <div className="rounded-2xl p-6"
        style={{
          background: 'rgba(8,12,40,0.85)',
          border: '1px solid rgba(139,92,246,0.3)',
          boxShadow: '0 0 30px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
        }}>
        {skills.map(s => (
          <SkillBar key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
