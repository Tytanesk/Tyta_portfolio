import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TerminalShell from './TerminalShell'

const C = '#4ade80'

const terminalLines = [
  { text: '$ node server.js', color: C, delay: 0 },
  { text: '> Server running on :3001', color: '#666', delay: 0.6 },
  { text: '> POST /api/comments', color: '#38bdf8', delay: 1.4 },
  { text: '> Body: { text: "..." }', color: '#666', delay: 1.9 },
  { text: '> Saved to DB ✓', color: C, delay: 2.5 },
  { text: '> 201 Created', color: C, delay: 3.0 },
]

const proficiency = [
  { name: 'React', pct: 95, color: '#38bdf8' },
  { name: 'Next.js', pct: 90, color: '#e2e8f0' },
  { name: 'Node.js', pct: 92, color: C },
  { name: 'TypeScript', pct: 88, color: '#818cf8' },
  { name: 'PostgreSQL', pct: 85, color: '#fb923c' },
]

interface Props { open: boolean; onClose: () => void }

export default function FullStackModal({ open, onClose }: Props) {
  const [comments, setComments] = useState<string[]>(['Awesome work!'])
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [termVisible, setTermVisible] = useState(0)
  const [synced, setSynced] = useState(false)

  const handleSubmit = () => {
    if (!input.trim() || submitting) return
    setSubmitting(true); setTermVisible(0); setSynced(false)
    terminalLines.forEach((_, i) => setTimeout(() => setTermVisible(i + 1), terminalLines[i].delay * 1000 + 200))
    setTimeout(() => { setComments(c => [...c, input.trim()]); setInput(''); setSubmitting(false); setSynced(true); setTimeout(() => setSynced(false), 2000) }, 3400)
  }

  return (
    <TerminalShell open={open} onClose={onClose} title="Full Stack Developer" accentColor={C}>
      <div className="mb-4 font-mono text-xs" style={{ color: '#444' }}>
        <span style={{ color: '#4ade80' }}># </span>
        <span style={{ color: '#888' }}>fullstack --demo --live-simulation</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Frontend */}
        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
          <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: '1px solid #1a1a1a' }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
            </div>
            <span className="font-mono text-[10px]" style={{ color: '#555' }}>App.tsx</span>
            <span className="ml-auto font-mono text-[9px] px-1.5 py-0.5" style={{ background: '#38bdf822', color: '#38bdf8', border: '1px solid #38bdf822' }}>⚛ live</span>
          </div>
          <div className="p-3">
            <div className="font-mono text-[10px] mb-2" style={{ color: '#555' }}>{'// comments feed'}</div>
            <div className="flex flex-col gap-1 mb-3 max-h-24 overflow-y-auto">
              <AnimatePresence>
                {comments.map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    className="font-mono text-xs px-2 py-1"
                    style={{ background: '#111', borderLeft: '2px solid #38bdf8', color: '#aaa' }}>
                    💬 {c}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="type comment..."
                  className="w-full font-mono text-xs px-2 py-1.5 outline-none"
                  style={{
                    background: '#0d0d0d',
                    border: `1px solid ${input ? '#38bdf8' : '#38bdf855'}`,
                    color: '#e2e8f0',
                    boxShadow: input ? '0 0 10px rgba(56,189,248,0.4)' : '0 0 6px rgba(56,189,248,0.2)',
                    animation: !input ? 'card-pulse-blue 2s ease-in-out infinite' : 'none',
                    transition: 'border 0.2s, box-shadow 0.2s',
                  }} />
                {!input && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs pointer-events-none"
                    style={{ color: '#38bdf8' }}>
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>▋</motion.span>
                  </span>
                )}
              </div>
              <button onClick={handleSubmit} disabled={submitting}
                className="font-mono text-xs px-3 py-1"
                style={{ background: submitting ? '#111' : '#38bdf811', color: '#38bdf8', border: '1px solid #38bdf833', cursor: submitting ? 'wait' : 'pointer' }}>
                {submitting ? '...' : 'POST'}
              </button>
            </div>
          </div>
        </div>

        {/* Backend terminal */}
        <div style={{ background: '#050505', border: '1px solid #1a1a1a' }}>
          <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: '1px solid #1a1a1a' }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
            </div>
            <span className="font-mono text-[10px]" style={{ color: '#555' }}>server.js</span>
            <span className="ml-auto font-mono text-[9px] px-1.5 py-0.5" style={{ background: `${C}22`, color: C, border: `1px solid ${C}22` }}>⬡ node</span>
          </div>
          <div className="p-3 font-mono text-xs min-h-[120px]">
            {terminalLines.slice(0, termVisible).map((line, i) => (
              <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: line.color, marginBottom: 2 }}>
                {line.text}
              </motion.p>
            ))}
            {termVisible === 0 && <p style={{ color: '#333' }}>{'// waiting for request...'}</p>}
            {submitting && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: C }}>▋</motion.span>}
          </div>
        </div>
      </div>

      {/* Data flow */}
      <div className="flex items-center gap-3 mb-4 font-mono text-[10px]" style={{ color: '#444' }}>
        <span style={{ color: '#38bdf8' }}>React</span>
        <div className="flex-1 h-px relative overflow-hidden" style={{ background: '#1a1a1a' }}>
          {submitting && (
            <motion.div initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-y-0 w-12" style={{ background: `linear-gradient(90deg, transparent, #38bdf8, transparent)` }} />
          )}
          {synced && <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5 }}
            className="absolute inset-0" style={{ background: `linear-gradient(90deg, #38bdf8, ${C})` }} />}
        </div>
        <span style={{ color: C }}>Node.js</span>
      </div>

      {/* Proficiency */}
      <div className="mb-1 font-mono text-[10px]" style={{ color: '#555' }}>
        <span style={{ color: '#4ade80' }}># </span>tech --proficiency
      </div>
      <div className="p-3" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
        {proficiency.map((p, i) => (
          <div key={p.name} className="mb-2 font-mono text-xs">
            <div className="flex justify-between mb-0.5">
              <span style={{ color: '#aaa' }}>{p.name}</span>
              <span style={{ color: p.color }}>{p.pct}%</span>
            </div>
            <div className="flex gap-px">
              {Array.from({ length: 20 }).map((_, j) => (
                <motion.div key={j} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 + j * 0.02 }}
                  style={{ flex: 1, height: 5, background: j < Math.round(p.pct / 5) ? p.color : '#1a1a1a' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </TerminalShell>
  )
}
