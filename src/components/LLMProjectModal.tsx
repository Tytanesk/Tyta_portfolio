import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TerminalShell from './TerminalShell'

const C = '#38bdf8'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const start = Date.now(), dur = 1400
    const tick = () => { const p = Math.min((Date.now() - start) / dur, 1); setVal(Math.floor(p * target)); if (p < 1) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  }, [target])
  return <>{val.toLocaleString()}{suffix}</>
}

function Bar({ label, pct, color }: { label: string; pct: number; color: string }) {
  const filled = Math.round(pct / 5)
  return (
    <div className="mb-2 font-mono text-xs">
      <div className="flex justify-between mb-0.5" style={{ color: '#666' }}>
        <span style={{ color: '#aaa' }}>{label}</span>
        <span style={{ color: color }}>{pct}%</span>
      </div>
      <div className="flex gap-px">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            style={{ flex: 1, height: 6, background: i < filled ? color : '#1e1e1e', boxShadow: i < filled ? `0 0 4px ${color}88` : 'none' }} />
        ))}
      </div>
    </div>
  )
}

const barData = [1.1, 1.4, 1.7, 2.0, 2.4, 2.8]
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const features = ['Context-aware multi-turn conversations', 'Fine-tuned domain-specific models', 'Real-time streaming inference', 'Multi-language support (40+ languages)', 'Enterprise API with 99.9% uptime SLA']

interface Props { open: boolean; onClose: () => void }

export default function LLMProjectModal({ open, onClose }: Props) {
  return (
    <TerminalShell open={open} onClose={onClose} title="LLM System" accentColor={C}>
      {/* Section header */}
      <div className="mb-4 font-mono text-xs" style={{ color: '#444' }}>
        <span style={{ color: '#4ade80' }}># </span>
        <span style={{ color: '#888' }}>llm-system --metrics --live</span>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'tokens_processed', value: 2000000000, suffix: '+', color: C },
          { label: 'monthly_users', value: 3200000, suffix: '', color: '#7dd3fc' },
          { label: 'active_today', value: 45000, suffix: '', color: '#fb923c' },
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

      {/* Bar chart */}
      <div className="mb-1 font-mono text-[10px]" style={{ color: '#555' }}>
        <span style={{ color: '#4ade80' }}># </span>token_growth_billions --last 6m
      </div>
      <div className="flex items-end gap-1 h-20 mb-5 p-3" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
        {barData.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <motion.div initial={{ height: 0 }} animate={{ height: `${(h / 2.8) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
              style={{ width: '100%', background: C, opacity: 0.7 + i * 0.05, boxShadow: `0 0 6px ${C}66` }} />
            <span className="font-mono text-[9px]" style={{ color: '#444' }}>{months[i]}</span>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="mb-1 font-mono text-[10px]" style={{ color: '#555' }}>
        <span style={{ color: '#4ade80' }}># </span>performance --metrics
      </div>
      <div className="p-3 mb-5" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
        <Bar label="user_satisfaction" pct={97} color={C} />
        <Bar label="daily_engagement" pct={88} color="#7dd3fc" />
        <Bar label="uptime_sla" pct={99} color="#fb923c" />
      </div>

      {/* Features */}
      <div className="mb-1 font-mono text-[10px]" style={{ color: '#555' }}>
        <span style={{ color: '#4ade80' }}># </span>ls features/
      </div>
      <div className="font-mono text-xs" style={{ color: '#888' }}>
        {features.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex items-center gap-2 py-1" style={{ borderBottom: '1px solid #111' }}>
            <span style={{ color: C }}>→</span> {f}
          </motion.div>
        ))}
      </div>
    </TerminalShell>
  )
}
