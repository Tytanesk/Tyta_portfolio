import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import TerminalShell from './TerminalShell'

const C = '#fb923c'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const start = Date.now(), dur = 1400
    const tick = () => { const p = Math.min((Date.now() - start) / dur, 1); setVal(Math.floor(p * target)); if (p < 1) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  }, [target])
  return <>{val.toLocaleString()}{suffix}</>
}

function Bar({ label, pct, color, tooltip }: { label: string; pct: number; color: string; tooltip?: string }) {
  const [hovered, setHovered] = useState(false)
  const filled = Math.round(pct / 5)
  return (
    <div className="mb-2 font-mono text-xs relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex justify-between mb-0.5">
        <span style={{ color: '#aaa' }}>{label}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="flex gap-px cursor-default">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 6, background: i < filled ? color : '#1e1e1e', boxShadow: i < filled ? `0 0 4px ${color}88` : 'none' }} />
        ))}
      </div>
      <AnimatePresence>
        {hovered && tooltip && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            className="absolute left-0 top-full mt-1 z-30 px-3 py-2 text-xs w-64 font-mono"
            style={{ background: '#111', border: `1px solid ${color}44`, color: '#aaa' }}>
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const barData = [80, 105, 122, 138, 144, 150]
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const features = [
  { name: 'Multi-language Support', date: 'Mar 2024', desc: 'Added support for 40+ languages with auto-detection.' },
  { name: 'Voice Recognition', date: 'Jun 2024', desc: 'Integrated real-time speech-to-text for hands-free interaction.' },
  { name: 'Sentiment Analysis', date: 'Aug 2024', desc: 'Live emotion detection to adapt chatbot tone dynamically.' },
  { name: 'In-App Payments', date: 'Oct 2024', desc: 'Seamless payment flows directly within chatbot conversations.' },
  { name: 'Analytics Dashboard', date: 'Dec 2024', desc: 'Real-time metrics and conversation insights for operators.' },
]

interface Props { open: boolean; onClose: () => void }

export default function AIChatbotModal({ open, onClose }: Props) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <TerminalShell open={open} onClose={onClose} title="AI Chatbots" accentColor={C}>
      <div className="mb-4 font-mono text-xs" style={{ color: '#444' }}>
        <span style={{ color: '#4ade80' }}># </span>
        <span style={{ color: '#888' }}>chatbot-platform --metrics --live</span>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'daily_active_users', value: 45000, suffix: '+', color: C },
          { label: 'total_conversations', value: 150000, suffix: '', color: '#fbbf24' },
          { label: 'bots_deployed', value: 320, suffix: '', color: '#38bdf8' },
        ].map(c => (
          <div key={c.label} className="font-mono p-3"
            style={{ background: '#111', border: `1px solid ${c.color}22`, borderLeft: `2px solid ${c.color}` }}>
            <div className="text-[10px] mb-1" style={{ color: '#555' }}>{c.label}</div>
            <div className="text-lg font-bold" style={{ color: c.color }}>
              <Counter target={c.value} suffix={c.suffix} />
            </div>
          </div>
        ))}
      </div>

      {/* Feedback pie + bar chart */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
          <div className="font-mono text-[10px] mb-2" style={{ color: '#555' }}>
            <span style={{ color: '#4ade80' }}># </span>user_feedback
          </div>
          {[{ label: 'positive', pct: 98, color: C }, { label: 'neutral', pct: 1, color: '#38bdf8' }, { label: 'negative', pct: 1, color: '#f43f5e' }].map(d => (
            <div key={d.label} className="flex items-center gap-2 font-mono text-xs mb-1">
              <div style={{ width: `${d.pct}%`, maxWidth: '100%', height: 8, background: d.color, boxShadow: `0 0 4px ${d.color}` }} />
              <span style={{ color: '#666' }}>{d.label} <span style={{ color: d.color }}>{d.pct}%</span></span>
            </div>
          ))}
        </div>
        <div className="p-3" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
          <div className="font-mono text-[10px] mb-2" style={{ color: '#555' }}>
            <span style={{ color: '#4ade80' }}># </span>monthly_conversations_k
          </div>
          <div className="flex items-end gap-1 h-16">
            {barData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(h / 150) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  style={{ width: '100%', background: C, opacity: 0.6 + i * 0.07, boxShadow: `0 0 4px ${C}66` }} />
                <span className="font-mono text-[8px]" style={{ color: '#444' }}>{months[i].slice(0, 1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance bars */}
      <div className="mb-1 font-mono text-[10px]" style={{ color: '#555' }}>
        <span style={{ color: '#4ade80' }}># </span>performance --metrics
      </div>
      <div className="p-3 mb-5" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
        <Bar label="positive_feedback" pct={98} color={C} tooltip="98% of users rated their chatbot experience as positive." />
        <Bar label="feature_completion" pct={95} color="#fbbf24" tooltip="95% of planned Q4 2024 features shipped." />
        <Bar label="deployment_rate" pct={87} color="#38bdf8" tooltip="87% of enterprise clients fully deployed." />
      </div>

      {/* Features */}
      <div className="mb-1 font-mono text-[10px]" style={{ color: '#555' }}>
        <span style={{ color: '#4ade80' }}># </span>git log --features --oneline
      </div>
      <div className="font-mono text-xs">
        {features.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="relative flex items-center gap-3 py-1.5 px-2 cursor-default"
            style={{ borderBottom: '1px solid #111', background: hoveredFeature === i ? '#111' : 'transparent' }}
            onMouseEnter={() => setHoveredFeature(i)} onMouseLeave={() => setHoveredFeature(null)}>
            <span style={{ color: C }}>→</span>
            <span style={{ color: '#888' }}>{f.name}</span>
            <span className="ml-auto" style={{ color: '#444' }}>{f.date}</span>
            <AnimatePresence>
              {hoveredFeature === i && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  className="absolute left-0 top-full z-20 px-3 py-2 text-xs w-72"
                  style={{ background: '#111', border: `1px solid ${C}44`, color: '#aaa' }}>
                  {f.desc}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </TerminalShell>
  )
}
