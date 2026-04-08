import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TerminalShell from './TerminalShell'

const C = '#38bdf8'

const nodes = [
  { id: 'center', label: 'AI Engineer', x: 50, y: 50, r: 22, color: C, main: true },
  { id: 'llm',  label: 'LLMs',        x: 20, y: 20, r: 14, color: '#818cf8' },
  { id: 'nlp',  label: 'NLP',         x: 78, y: 18, r: 14, color: '#34d399' },
  { id: 'ml',   label: 'ML Models',   x: 82, y: 72, r: 14, color: '#fb923c' },
  { id: 'cv',   label: 'CV',          x: 18, y: 75, r: 14, color: '#f472b6' },
  { id: 'rl',   label: 'RL',          x: 50, y: 88, r: 11, color: '#facc15' },
]
const edges = [['center','llm'],['center','nlp'],['center','ml'],['center','cv'],['center','rl']]
const tools: Record<string, { name: string; pct: number; color: string }[]> = {
  llm:  [{ name: 'Hugging Face', pct: 92, color: '#818cf8' }, { name: 'LangChain', pct: 85, color: '#818cf8' }, { name: 'OpenAI API', pct: 95, color: '#818cf8' }],
  nlp:  [{ name: 'spaCy', pct: 88, color: '#34d399' }, { name: 'NLTK', pct: 80, color: '#34d399' }, { name: 'Transformers', pct: 90, color: '#34d399' }],
  ml:   [{ name: 'PyTorch', pct: 90, color: '#fb923c' }, { name: 'TensorFlow', pct: 85, color: '#fb923c' }, { name: 'Scikit-learn', pct: 93, color: '#fb923c' }],
  cv:   [{ name: 'OpenCV', pct: 82, color: '#f472b6' }, { name: 'YOLO', pct: 78, color: '#f472b6' }, { name: 'Stable Diffusion', pct: 75, color: '#f472b6' }],
  rl:   [{ name: 'Gym / Gymnasium', pct: 72, color: '#facc15' }, { name: 'Stable Baselines', pct: 68, color: '#facc15' }],
}

interface Props { open: boolean; onClose: () => void }

export default function AIEngineerModal({ open, onClose }: Props) {
  const [active, setActive] = useState<string | null>(null)
  const activeNode = nodes.find(n => n.id === active)

  return (
    <TerminalShell open={open} onClose={onClose} title="AI Engineer" accentColor={C}>
      <div className="mb-4 font-mono text-xs" style={{ color: '#444' }}>
        <span style={{ color: '#4ade80' }}># </span>
        <span style={{ color: '#888' }}>ai-engineer --map --interactive</span>
      </div>

      <div className="flex gap-5 items-start">
        {/* Network graph */}
        <div className="flex-shrink-0" style={{ width: 260, height: 260, background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
          <svg width="260" height="260" viewBox="0 0 100 100">
            {edges.map(([a, b], i) => {
              const na = nodes.find(n => n.id === a)!
              const nb = nodes.find(n => n.id === b)!
              return (
                <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={active === nb.id ? nb.color : '#222'}
                  strokeWidth={active === nb.id ? 1 : 0.5}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  style={{ filter: active === nb.id ? `drop-shadow(0 0 2px ${nb.color})` : 'none' }} />
              )
            })}
            {nodes.map((node, i) => (
              <g key={node.id} style={{ cursor: node.main ? 'default' : 'pointer' }}
                onClick={() => !node.main && setActive(active === node.id ? null : node.id)}>
                <motion.circle cx={node.x} cy={node.y} r={node.r + 4} fill="none"
                  stroke={node.color} strokeWidth="0.3"
                  animate={{ r: [node.r + 3, node.r + 6, node.r + 3], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                <motion.circle cx={node.x} cy={node.y} r={node.r}
                  fill={active === node.id ? `${node.color}22` : '#0d0d0d'}
                  stroke={node.color} strokeWidth={active === node.id ? 1.5 : 0.6}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: i * 0.08, type: 'spring' }}
                  style={{ filter: active === node.id ? `drop-shadow(0 0 6px ${node.color})` : 'none' }} />
                <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize={node.main ? 4 : 3.5} fontWeight="bold"
                  fill={active === node.id ? '#fff' : node.color}
                  style={{ pointerEvents: 'none', fontFamily: 'monospace' }}>
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Tools panel */}
        <div className="flex-1 font-mono text-xs">
          <AnimatePresence mode="wait">
            {active && activeNode ? (
              <motion.div key={active} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                <div className="mb-3" style={{ color: '#555' }}>
                  <span style={{ color: '#4ade80' }}># </span>
                  <span style={{ color: activeNode.color }}>{activeNode.label.toLowerCase()}</span>
                  <span style={{ color: '#555' }}> --tools</span>
                </div>
                {tools[active]?.map((t, i) => (
                  <div key={t.name} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span style={{ color: '#aaa' }}>{t.name}</span>
                      <span style={{ color: t.color }}>{t.pct}%</span>
                    </div>
                    <div className="flex gap-px">
                      {Array.from({ length: 20 }).map((_, j) => (
                        <motion.div key={j} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 + j * 0.02 }}
                          style={{ flex: 1, height: 5, background: j < Math.round(t.pct / 5) ? t.color : '#1a1a1a' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-3" style={{ color: '#555' }}>
                  <span style={{ color: '#4ade80' }}># </span>select a node to inspect
                </div>
                <div className="flex flex-col gap-1.5">
                  {nodes.filter(n => !n.main).map(n => (
                    <motion.button key={n.id} whileHover={{ x: 4 }}
                      onClick={() => setActive(n.id)}
                      className="text-left px-2 py-1 text-xs font-mono"
                      style={{ background: '#111', border: `1px solid ${n.color}22`, borderLeft: `2px solid ${n.color}`, color: n.color }}>
                      → {n.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TerminalShell>
  )
}
