import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import TerminalShell from './TerminalShell'

const NODES = [
  { id: 'client',    label: 'Client',         sub: 'React / Next.js',    x: 50,  y: 8,   color: '#38bdf8',
    svgIcon: <><rect x="-7" y="-6" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="-4" y1="4" x2="4" y2="4" stroke="currentColor" strokeWidth="1.2"/><line x1="0" y1="4" x2="0" y2="6" stroke="currentColor" strokeWidth="1.2"/></> },
  { id: 'gateway',   label: 'API Gateway',    sub: 'Rate limit / Auth',  x: 50,  y: 24,  color: '#818cf8',
    svgIcon: <><circle cx="0" cy="0" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="-9" y1="0" x2="-6" y2="0" stroke="currentColor" strokeWidth="1.2"/><line x1="6" y1="0" x2="9" y2="0" stroke="currentColor" strokeWidth="1.2"/><line x1="-3" y1="-5" x2="3" y2="5" stroke="currentColor" strokeWidth="1" opacity="0.6"/><line x1="3" y1="-5" x2="-3" y2="5" stroke="currentColor" strokeWidth="1" opacity="0.6"/></> },
  { id: 'auth',      label: 'Auth Service',   sub: 'JWT / OAuth2',       x: 18,  y: 40,  color: '#f472b6',
    svgIcon: <><rect x="-5" y="-1" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M-3-1v-3a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="0" cy="3.5" r="1.2" fill="currentColor"/></> },
  { id: 'user',      label: 'User Service',   sub: 'CRUD / Profile',     x: 38,  y: 40,  color: '#38bdf8',
    svgIcon: <><circle cx="0" cy="-3" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M-6 7c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.2" fill="none"/></> },
  { id: 'order',     label: 'Order Service',  sub: 'Business Logic',     x: 62,  y: 40,  color: '#fb923c',
    svgIcon: <><rect x="-6" y="-7" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="-3" y1="-2" x2="3" y2="-2" stroke="currentColor" strokeWidth="1"/><line x1="-3" y1="1" x2="3" y2="1" stroke="currentColor" strokeWidth="1"/><line x1="-3" y1="4" x2="1" y2="4" stroke="currentColor" strokeWidth="1"/></> },
  { id: 'notify',    label: 'Notify Service', sub: 'Email / Push',       x: 82,  y: 40,  color: '#facc15',
    svgIcon: <><path d="M0-7c-4 0-6 2.5-6 5.5V2l-2 2h16l-2-2V-1.5C6-4.5 4-7 0-7z" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="-1.5" y1="4" x2="1.5" y2="4" stroke="currentColor" strokeWidth="1.2"/><line x1="0" y1="4" x2="0" y2="6.5" stroke="currentColor" strokeWidth="1.2"/></> },
  { id: 'queue',     label: 'Message Queue',  sub: 'RabbitMQ / Kafka',   x: 50,  y: 57,  color: '#4ade80',
    svgIcon: <><ellipse cx="0" cy="-4" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="-6" y1="-4" x2="-6" y2="4" stroke="currentColor" strokeWidth="1.2"/><line x1="6" y1="-4" x2="6" y2="4" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="0" cy="4" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.2" fill="none"/></> },
  { id: 'db_user',   label: 'User DB',        sub: 'PostgreSQL',         x: 22,  y: 73,  color: '#38bdf8',
    svgIcon: <><ellipse cx="0" cy="-4" rx="6" ry="2" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="-6" y1="-4" x2="-6" y2="4" stroke="currentColor" strokeWidth="1.2"/><line x1="6" y1="-4" x2="6" y2="4" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="0" cy="4" rx="6" ry="2" stroke="currentColor" strokeWidth="1.2" fill="none"/><ellipse cx="0" cy="0" rx="6" ry="2" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5"/></> },
  { id: 'db_order',  label: 'Order DB',       sub: 'MongoDB',            x: 50,  y: 73,  color: '#fb923c',
    svgIcon: <><ellipse cx="0" cy="-4" rx="6" ry="2" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="-6" y1="-4" x2="-6" y2="4" stroke="currentColor" strokeWidth="1.2"/><line x1="6" y1="-4" x2="6" y2="4" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="0" cy="4" rx="6" ry="2" stroke="currentColor" strokeWidth="1.2" fill="none"/><ellipse cx="0" cy="0" rx="6" ry="2" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5"/></> },
  { id: 'cache',     label: 'Cache',          sub: 'Redis',              x: 78,  y: 73,  color: '#f472b6',
    svgIcon: <><polygon points="0,-7 6,3 -6,3" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="0" y1="3" x2="0" y2="7" stroke="currentColor" strokeWidth="1.2"/><line x1="-3" y1="7" x2="3" y2="7" stroke="currentColor" strokeWidth="1.2"/></> },
  { id: 'cloud',     label: 'Cloud',          sub: 'AWS / GCP',          x: 50,  y: 90,  color: '#818cf8',
    svgIcon: <><path d="M-7 2a4 4 0 014-4 4 4 0 017.5-1A3.5 3.5 0 017 4.5H-4A3 3 0 01-7 2z" stroke="currentColor" strokeWidth="1.2" fill="none"/></> },
]

const EDGES: [string, string, string?][] = [
  ['client',  'gateway',  '#38bdf8'],
  ['gateway', 'auth',     '#f472b6'],
  ['gateway', 'user',     '#38bdf8'],
  ['gateway', 'order',    '#fb923c'],
  ['gateway', 'notify',   '#facc15'],
  ['order',   'queue',    '#4ade80'],
  ['notify',  'queue',    '#4ade80'],
  ['user',    'db_user',  '#38bdf8'],
  ['order',   'db_order', '#fb923c'],
  ['order',   'cache',    '#f472b6'],
  ['db_user', 'cloud',    '#818cf8'],
  ['db_order','cloud',    '#818cf8'],
  ['cache',   'cloud',    '#818cf8'],
]

const DETAILS: Record<string, { title: string; points: string[] }> = {
  client:   { title: 'Client Layer', points: ['React SPA with SSR via Next.js', 'Code splitting & lazy loading', 'WebSocket for real-time updates'] },
  gateway:  { title: 'API Gateway', points: ['Single entry point for all services', 'JWT validation & rate limiting', 'Load balancing across instances'] },
  auth:     { title: 'Auth Service', points: ['OAuth2 + JWT token issuance', 'Refresh token rotation', 'Role-based access control (RBAC)'] },
  user:     { title: 'User Service', points: ['User profile CRUD operations', 'Event-driven updates via queue', 'Horizontal scaling ready'] },
  order:    { title: 'Order Service', points: ['Core business logic layer', 'Saga pattern for distributed txns', 'Publishes events to message queue'] },
  notify:   { title: 'Notification Service', points: ['Consumes queue events async', 'Email, push & SMS delivery', 'Retry logic with dead-letter queue'] },
  queue:    { title: 'Message Queue', points: ['Decouples services for resilience', 'Kafka for high-throughput streams', 'RabbitMQ for task queues'] },
  db_user:  { title: 'User Database', points: ['PostgreSQL — relational data', 'Read replicas for scale', 'Automated backups & failover'] },
  db_order: { title: 'Order Database', points: ['MongoDB — flexible schema', 'Sharding for horizontal scale', 'Indexed for sub-10ms queries'] },
  cache:    { title: 'Redis Cache', points: ['Sub-millisecond response times', 'Session storage & rate limiting', 'Pub/Sub for real-time features'] },
  cloud:    { title: 'Cloud Infrastructure', points: ['AWS ECS / GCP Cloud Run', 'Auto-scaling container groups', 'Multi-region deployment'] },
}

const W = 600, H = 420

function toXY(pct: { x: number; y: number }) {
  return { x: (pct.x / 100) * W, y: (pct.y / 100) * H }
}

interface Props { open: boolean; onClose: () => void }

export default function SystemArchitectModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string | null>(null)
  const [animated, setAnimated] = useState(false)

  if (open && !animated) setAnimated(true)
  if (!open && animated) setAnimated(false)

  const detail = active ? DETAILS[active] : null
  const activeNode = active ? NODES.find(n => n.id === active) : null

  return (
    <TerminalShell open={open} onClose={onClose} title="System Architect" accentColor="#fb923c" maxWidth={960}>
      <div className="mb-4 font-mono text-xs" style={{ color: '#444' }}>
        <span style={{ color: '#4ade80' }}># </span>
        <span style={{ color: '#888' }}>arch --diagram --interactive</span>
      </div>

      <div className="flex gap-5 items-start">
        {/* SVG diagram */}
        <div className="flex-shrink-0" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
            {EDGES.map(([a, b, col], i) => {
              const na = toXY(NODES.find(n => n.id === a)!)
              const nb = toXY(NODES.find(n => n.id === b)!)
              const isActive = active === a || active === b
              return (
                <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={isActive ? (col ?? '#fb923c') : '#1e1e1e'}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  strokeDasharray={isActive ? '0' : '4 4'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: animated ? 1 : 0, opacity: animated ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  style={{ filter: isActive ? `drop-shadow(0 0 3px ${col})` : 'none', transition: 'stroke 0.3s' }} />
              )
            })}
            {active && EDGES.filter(([a, b]) => a === active || b === active).map(([a, b, col], i) => {
              const na = toXY(NODES.find(n => n.id === a)!)
              const nb = toXY(NODES.find(n => n.id === b)!)
              return (
                <motion.circle key={`flow-${i}`} r={3} fill={col ?? '#fb923c'}
                  style={{ filter: `drop-shadow(0 0 4px ${col})` }}
                  animate={{ offsetDistance: ['0%', '100%'] } as never}>
                  <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${na.x},${na.y} L${nb.x},${nb.y}`} />
                </motion.circle>
              )
            })}
            {NODES.map((node, i) => {
              const { x, y } = toXY(node)
              const isActive = active === node.id
              return (
                <g key={node.id} style={{ cursor: 'pointer' }} onClick={() => setActive(active === node.id ? null : node.id)}>
                  <motion.circle cx={x} cy={y} r={22} fill="none" stroke={node.color} strokeWidth="0.3"
                    animate={{ r: [20, 26, 20], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }} />
                  <motion.circle cx={x} cy={y} r={18}
                    fill={isActive ? `${node.color}22` : '#0d0d0d'}
                    stroke={node.color} strokeWidth={isActive ? 2 : 0.8}
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.07, type: 'spring' }}
                    style={{ filter: isActive ? `drop-shadow(0 0 8px ${node.color})` : 'none', transition: 'filter 0.3s' }} />
                  <g transform={`translate(${x},${y - 3})`} color={isActive ? '#fff' : node.color} style={{ pointerEvents: 'none' }}>
                    {node.svgIcon}
                  </g>
                  <text x={x} y={y + 8} textAnchor="middle" dominantBaseline="middle"
                    fontSize={5} fontWeight="bold" fill={isActive ? '#fff' : node.color}
                    style={{ pointerEvents: 'none', userSelect: 'none', fontFamily: 'monospace' }}>
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-[180px] font-mono text-xs">
          <AnimatePresence mode="wait">
            {detail && activeNode ? (
              <motion.div key={active} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                <div className="mb-3" style={{ color: '#555' }}>
                  <span style={{ color: '#4ade80' }}># </span>
                  <span style={{ color: activeNode.color }}>{activeNode.label.toLowerCase()}</span>
                  <span style={{ color: '#555' }}> --info</span>
                </div>
                <div className="mb-2" style={{ color: '#666' }}>{activeNode.sub}</div>
                <div style={{ height: 1, background: `linear-gradient(90deg, ${activeNode.color}44, transparent)`, marginBottom: 10 }} />
                {detail.points.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2 mb-2" style={{ color: '#888' }}>
                    <span style={{ color: activeNode.color }}>→</span> {p}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-3" style={{ color: '#555' }}>
                  <span style={{ color: '#4ade80' }}># </span>select a node
                </div>
                <div className="flex flex-col gap-1.5">
                  {NODES.map(n => (
                    <motion.button key={n.id} whileHover={{ x: 4 }}
                      onClick={() => setActive(n.id)}
                      className="text-left px-2 py-1"
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
