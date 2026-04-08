import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TerminalShell from './TerminalShell'

// ── Tab types ──────────────────────────────────────────────
type Tab = 'timeline' | 'team' | 'feedback' | 'skills'

// ── Timeline data ──────────────────────────────────────────
const milestones = [
  { team: 3, year: 'Q1 2022', title: 'Team Formed',          desc: 'Assembled a 3-member squad: Frontend Dev, Backend Dev, QA Engineer.', color: '#a78bfa' },
  { team: 3, year: 'Q2 2022', title: 'First Major Release',  desc: 'Shipped v1.0 of the DeFi dashboard — on time, zero critical bugs.', color: '#a78bfa' },
  { team: 3, year: 'Q3 2022', title: 'Mentorship Program',   desc: 'Introduced weekly 1-on-1s and code review culture across the team.', color: '#a78bfa' },
  { team: 5, year: 'Q1 2023', title: 'Team Expanded to 5',   desc: 'Added Senior Backend Dev and DevOps Engineer to scale infrastructure.', color: '#38bdf8' },
  { team: 5, year: 'Q2 2023', title: 'Performance +40%',     desc: 'Refactored CI/CD pipeline — deployment time cut from 45 min to 8 min.', color: '#38bdf8' },
  { team: 5, year: 'Q4 2023', title: 'Enterprise Delivery',  desc: 'Delivered enterprise-grade DeFi infrastructure serving 500K+ users.', color: '#38bdf8' },
]

// ── Team composition ───────────────────────────────────────
const team3 = [
  { role: 'Frontend Dev',  color: '#38bdf8', tip: 'Mentored on React performance patterns and component architecture.' },
  { role: 'Backend Dev',   color: '#a78bfa', tip: 'Guided through Node.js microservices and API design best practices.' },
  { role: 'QA Engineer',   color: '#4ade80', tip: 'Introduced automated testing culture — coverage grew from 20% to 85%.' },
]
const team5 = [
  { role: 'Frontend Dev',    color: '#38bdf8', tip: 'Mentored on React performance patterns and component architecture.' },
  { role: 'Backend Dev',     color: '#a78bfa', tip: 'Guided through Node.js microservices and API design best practices.' },
  { role: 'QA Engineer',     color: '#4ade80', tip: 'Introduced automated testing culture — coverage grew from 20% to 85%.' },
  { role: 'Sr. Backend Dev', color: '#fb923c', tip: 'Onboarded to lead Rust/Solana optimizations — reduced latency by 30%.' },
  { role: 'DevOps Engineer', color: '#f472b6', tip: 'Coached on Kubernetes, CI/CD pipelines and infrastructure-as-code.' },
]

// ── Feedback data ──────────────────────────────────────────
const satisfaction = [
  { label: 'Team Satisfaction',   pct: 94, color: '#a78bfa' },
  { label: 'Communication',       pct: 91, color: '#38bdf8' },
  { label: 'Technical Growth',    pct: 88, color: '#4ade80' },
  { label: 'Delivery Confidence', pct: 96, color: '#fb923c' },
]
const quotes = [
  '"Best engineering lead I\'ve worked with — always available and never condescending."',
  '"Transformed our code review culture. PRs went from feared to celebrated."',
  '"Helped me grow from junior to mid-level in under 6 months."',
]

// ── Skills data ────────────────────────────────────────────
const techSkills = [
  { name: 'React / Next.js', color: '#38bdf8', desc: 'Pair-programmed advanced patterns: memoization, suspense, server components.' },
  { name: 'Node.js / APIs',  color: '#4ade80', desc: 'Guided REST & GraphQL API design, auth flows, and error handling strategies.' },
  { name: 'Rust / Solana',   color: '#fb923c', desc: 'Mentored low-level Rust optimizations for on-chain program performance.' },
  { name: 'DevOps / CI-CD',  color: '#f472b6', desc: 'Taught Docker, GitHub Actions, and zero-downtime deployment strategies.' },
  { name: 'System Design',   color: '#a78bfa', desc: 'Weekly architecture reviews — scalability, trade-offs, and documentation.' },
]
const softSkills = [
  { name: 'Communication',      color: '#38bdf8' },
  { name: 'Time Management',    color: '#4ade80' },
  { name: 'Conflict Resolution',color: '#fb923c' },
  { name: 'Code Review Culture',color: '#a78bfa' },
  { name: 'Agile / Scrum',      color: '#f472b6' },
]

// ── Sub-components ─────────────────────────────────────────
function Bar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300">{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg,${color}55,${color})`, boxShadow: `0 0 8px ${color}` }} />
      </div>
    </div>
  )
}

function MemberNode({ role, color, tip, index }: { role: string; color: string; tip: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.12, type: 'spring' }}
      className="relative flex flex-col items-center gap-1 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ background: `${color}18`, border: `2px solid ${color}`, boxShadow: `0 0 12px ${color}66`, color }}>
        {role.split(' ').map(w => w[0]).join('')}
      </div>
      <span className="text-[10px] text-slate-400 text-center leading-tight max-w-[60px]">{role}</span>
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            className="absolute bottom-full mb-2 z-20 rounded-lg px-3 py-2 text-xs text-slate-200 w-52"
            style={{ background: 'rgba(5,8,30,0.96)', border: `1px solid ${color}44`, backdropFilter: 'blur(12px)', left: '50%', transform: 'translateX(-50%)' }}>
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main modal ─────────────────────────────────────────────
interface Props { open: boolean; onClose: () => void }

export default function TeamLeaderModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('timeline')
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
  const [quoteIdx, setQuoteIdx] = useState(0)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'team',     label: 'Team Growth' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'skills',   label: 'Skills Mentored' },
  ]

  return (
    <TerminalShell open={open} onClose={onClose} title="Team Leader" accentColor="#a78bfa">
      <div className="mb-4 font-mono text-xs" style={{ color: '#444' }}>
        <span style={{ color: '#4ade80' }}># </span>
        <span style={{ color: '#888' }}>team-leader --interactive --3-to-5</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-px mb-5 font-mono text-xs" style={{ borderBottom: '1px solid #1a1a1a' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-4 py-2 transition-all duration-200"
            style={{
              background: tab === t.id ? '#111' : 'transparent',
              color: tab === t.id ? '#a78bfa' : '#444',
              borderBottom: tab === t.id ? '2px solid #a78bfa' : '2px solid transparent',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

                {/* ── TIMELINE ── */}
                {tab === 'timeline' && (
                  <motion.div key="timeline" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="mb-2 font-mono text-[10px]" style={{ color: '#555' }}>
                      <span style={{ color: '#4ade80' }}># </span>git log --team-journey
                    </div>
                    <div className="relative pl-6 font-mono text-xs">
                      <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg,#a78bfa,#38bdf8)' }} />
                      {/* vertical line */}
                      {/* <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg,#a78bfa,#38bdf8)' }} /> */}
                      {milestones.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }} className="relative mb-4 last:mb-0">
                          <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full border-2"
                            style={{ background: m.color, borderColor: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="px-1.5 py-0.5 text-[10px]"
                              style={{ background: `${m.color}18`, color: m.color, border: `1px solid ${m.color}33` }}>
                              {m.year}
                            </span>
                            <span className="px-1.5 py-0.5 text-[10px]"
                              style={{ background: m.team === 3 ? 'rgba(167,139,250,0.1)' : 'rgba(56,189,248,0.1)', color: m.team === 3 ? '#a78bfa' : '#38bdf8', border: `1px solid ${m.team === 3 ? '#a78bfa' : '#38bdf8'}33` }}>
                              {m.team}-member
                            </span>
                          </div>
                          <p style={{ color: '#e2e8f0' }}>{m.title}</p>
                          <p className="text-[11px] mt-0.5" style={{ color: '#555' }}>{m.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── TEAM GROWTH ── */}
                {tab === 'team' && (
                  <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="mb-3 font-mono text-[10px]" style={{ color: '#555' }}>
                      <span style={{ color: '#4ade80' }}># </span>team --composition --hover-for-details
                    </div>
                    <div className="mb-6">
                      <p className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }}>Phase 1</span>
                        3-Member Team
                      </p>
                      <div className="flex gap-6 justify-center">
                        {team3.map((m, i) => <MemberNode key={m.role} {...m} index={i} />)}
                      </div>
                    </div>
                    {/* arrow */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,transparent,#a78bfa,#38bdf8,transparent)' }} />
                      <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-xs font-bold" style={{ color: '#38bdf8' }}>
                        Team Expanded ↓
                      </motion.span>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,transparent,#38bdf8,#a78bfa,transparent)' }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)' }}>Phase 2</span>
                        5-Member Team
                      </p>
                      <div className="flex gap-4 justify-center flex-wrap">
                        {team5.map((m, i) => <MemberNode key={m.role} {...m} index={i} />)}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── FEEDBACK ── */}
                {tab === 'feedback' && (
                  <motion.div key="feedback" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="mb-3 font-mono text-[10px]" style={{ color: '#555' }}>
                      <span style={{ color: '#4ade80' }}># </span>team --satisfaction --scores
                    </div>
                    {satisfaction.map((s, i) => <Bar key={s.label} {...s} delay={i * 0.1} />)}
                    <div className="mt-5 rounded-xl p-4" style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)' }}>
                      <p className="text-slate-400 text-xs mb-3">Team Feedback</p>
                      <AnimatePresence mode="wait">
                        <motion.p key={quoteIdx}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="text-slate-200 text-sm italic leading-relaxed">
                          {quotes[quoteIdx]}
                        </motion.p>
                      </AnimatePresence>
                      <div className="flex gap-2 mt-3">
                        {quotes.map((_, i) => (
                          <button key={i} onClick={() => setQuoteIdx(i)}
                            className="rounded-full transition-all duration-300"
                            style={{ width: quoteIdx === i ? 20 : 8, height: 8, background: quoteIdx === i ? '#a78bfa' : 'rgba(167,139,250,0.3)', boxShadow: quoteIdx === i ? '0 0 8px #a78bfa' : 'none' }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── SKILLS ── */}
                {tab === 'skills' && (
                  <motion.div key="skills" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="mb-3 font-mono text-[10px]" style={{ color: '#555' }}>
                      <span style={{ color: '#4ade80' }}># </span>skills --mentored --tech
                    </div>
                    <div className="flex flex-col gap-2 mb-5">
                      {techSkills.map((s, i) => (
                        <motion.div key={s.name}
                          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          onClick={() => setActiveSkill(activeSkill === i ? null : i)}
                          className="rounded-lg px-3 py-2 cursor-pointer transition-all duration-200"
                          style={{ background: activeSkill === i ? `${s.color}12` : 'rgba(255,255,255,0.03)', border: `1px solid ${activeSkill === i ? s.color + '55' : 'rgba(255,255,255,0.06)'}` }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                            <span className="text-sm font-semibold" style={{ color: activeSkill === i ? s.color : '#e2e8f0' }}>{s.name}</span>
                            <span className="ml-auto text-slate-500 text-xs">{activeSkill === i ? '▲' : '▼'}</span>
                          </div>
                          <AnimatePresence>
                            {activeSkill === i && (
                              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                className="text-xs text-slate-400 mt-1.5 leading-relaxed overflow-hidden">
                                {s.desc}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mb-3 mt-4 font-mono text-[10px]" style={{ color: '#555' }}>
                      <span style={{ color: '#4ade80' }}># </span>skills --soft
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((s, i) => (
                        <motion.span key={s.name}
                          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08, type: 'spring' }}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{ background: `${s.color}12`, border: `1px solid ${s.color}44`, color: s.color, boxShadow: `0 0 8px ${s.color}22` }}>
                          {s.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
    </TerminalShell>
  )
}
