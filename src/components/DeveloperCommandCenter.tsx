import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Gauge,
  Play,
  Radio,
  Rocket,
  Terminal,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

type CommandId = 'skills' | 'deploy' | 'api' | 'websocket' | 'performance' | 'hire'

interface CommandSpec {
  id: CommandId
  command: string
  label: string
  title: string
  subtitle: string
  accent: string
  terminalLines: string[]
}

const commandSpecs: CommandSpec[] = [
  {
    id: 'skills',
    command: 'npm run skills',
    label: 'npm run skills',
    title: 'Skill Unlock Sequence',
    subtitle: 'Terminal logs, progress bar, and skill badges unlock in waves.',
    accent: '#a78bfa',
    terminalLines: [
      'Installing developer modules...',
      'Loading AI & machine learning stack...',
      'Compiling frontend + backend layers...',
      'Provisioning cloud infrastructure...',
      'Build complete ✅',
      'Skills loaded successfully.',
    ],
  },
  {
    id: 'deploy',
    command: 'deploy project',
    label: 'deploy project',
    title: 'Deployment Animation',
    subtitle: 'Code travels from laptop to GitHub to server to live site.',
    accent: '#38bdf8',
    terminalLines: [
      'Preparing build artifacts...',
      'Pushing source to GitHub...',
      'Spinning up server release...',
      'Deployment successful ✅',
    ],
  },
  {
    id: 'api',
    command: 'fetch projects',
    label: 'fetch projects',
    title: 'API Request Flow',
    subtitle: 'Frontend, API, and database light up in sequence.',
    accent: '#f97316',
    terminalLines: [
      'GET /api/projects',
      '200 OK',
      'SELECT * FROM projects',
      'Projects rendered successfully ✅',
    ],
  },
  {
    id: 'websocket',
    command: 'connect websocket',
    label: 'connect websocket',
    title: 'WebSocket Sync',
    subtitle: 'Dots move both ways like a live connection heartbeat.',
    accent: '#60a5fa',
    terminalLines: [
      'Opening socket connection...',
      'Ping -> Pong',
      'Real-time connection active.',
    ],
  },
  {
    id: 'performance',
    command: 'optimize performance',
    label: 'optimize performance',
    title: 'Performance Tuning',
    subtitle: 'Messy metrics sharpen into clean green bars.',
    accent: '#22c55e',
    terminalLines: [
      'Analyzing bundle weight...',
      'LCP 3.8s -> 1.2s',
      'Bundle 740KB -> 280KB',
      'Optimization complete.',
    ],
  },
  {
    id: 'hire',
    command: 'hire developer',
    label: 'hire developer',
    title: 'Candidate Review',
    subtitle: 'Hiring scan, match score, and interview-ready CTA.',
    accent: '#34d399',
    terminalLines: [
      'Checking availability...',
      'Scanning projects...',
      'Reviewing code quality...',
      'Calculating team fit...',
      'Decision: strong candidate 😎',
      'MATCH SCORE: 96% — READY TO INTERVIEW',
    ],
  },
]

const hireScanLogs = [
  'Checking availability...',
  'Scanning projects...',
  'Reviewing code quality...',
  'Calculating team fit...',
  'Decision: strong candidate 😎',
] as const

const hireChecks = [
  { label: 'Availability', status: 'pass' as const },
  { label: 'Frontend skills', status: 'pass' as const },
  { label: 'Problem solving', status: 'pass' as const },
  { label: 'Communication', status: 'pass' as const },
  { label: 'Coffee dependency', status: 'warn' as const, note: 'High' },
]

const skillWaves = [
  {
    category: 'AI & Machine Learning',
    skills: [
      'Data Preprocessing',
      'Deep Learning',
      'LLM',
      'Machine Learning',
      'Model Deployment',
      'Neural Networks',
      'PyTorch',
      'Scikit-learn',
      'TensorFlow',
    ],
  },
  {
    category: 'Backend Development',
    skills: [
      'Authentication & Authorization',
      'Distributed Systems',
      'Django',
      'FastAPI',
      'Microservices',
      'Node.js / Express',
      'React',
      'REST API',
      'System Design',
    ],
  },
  {
    category: 'Frontend Development',
    skills: [
      'API Integration',
      'HTML / CSS',
      'Next.js',
      'React.js',
      'State Management',
      'Tailwind',
      'Vue.js',
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      'AWS',
      'CI/CD',
      'Cloud Deployment',
      'Docker',
      'Infrastructure Automation',
      'Kubernetes',
      'Linux',
    ],
  },
  {
    category: 'Databases',
    skills: ['Database Modeling', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  },
] as const

const skillsBuildLogs = [
  'Installing developer modules...',
  'Loading AI & machine learning stack...',
  'Compiling frontend + backend layers...',
  'Provisioning cloud infrastructure...',
  'Seeding database skillsets...',
] as const

function getCommandSpec(value: string) {
  const normalized = value.trim().toLowerCase()
  return commandSpecs.find(spec => spec.command === normalized || spec.label === normalized) ?? null
}

const commandIcons: Record<CommandId, LucideIcon> = {
  skills: Code2,
  deploy: Rocket,
  api: Database,
  websocket: Radio,
  performance: Gauge,
  hire: UserRound,
}

function CommandShortcutIcon({
  id,
  accent,
  active,
}: {
  id: CommandId
  accent: string
  active: boolean
}) {
  const Icon = commandIcons[id]
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-shadow"
      style={{
        borderColor: active ? `${accent}66` : `${accent}30`,
        background: active ? `${accent}22` : `${accent}10`,
        boxShadow: active ? `0 0 16px ${accent}33` : 'none',
      }}
    >
      <Icon
        className="h-3.5 w-3.5"
        style={{ color: accent }}
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </div>
  )
}

function TerminalLogLine({
  line,
  isLatest,
  accent,
}: {
  line: string
  isLatest: boolean
  accent: string
}) {
  const isCommand = line.startsWith('>')
  const hasCheck = line.includes('✅')
  const textClass = isLatest ? 'text-white' : 'text-slate-300'

  if (hasCheck) {
    const [before, after] = line.split('✅')
    return (
      <div className={`flex items-start gap-2 ${textClass}`}>
        <span className="min-w-0 flex-1 leading-relaxed">{before.trimEnd()}</span>
        <CheckCircle2
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
          strokeWidth={2.25}
          aria-hidden="true"
        />
        {after ? <span className="sr-only">success</span> : null}
      </div>
    )
  }

  if (isCommand) {
    return (
      <div className={`flex items-center gap-2 ${textClass}`}>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} strokeWidth={2.5} />
        <span className="font-medium" style={{ color: accent }}>
          {line.slice(1).trim()}
        </span>
      </div>
    )
  }

  return <div className={`leading-relaxed ${textClass}`}>{line}</div>
}

function PanelPill({
  children,
  accent,
}: {
  children: ReactNode
  accent: string
}) {
  return (
    <div
      className="rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: `${accent}18`,
        border: `1px solid ${accent}40`,
        color: accent,
      }}
    >
      {children}
    </div>
  )
}

function LaptopIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
      <rect x="18" y="18" width="44" height="28" rx="4" stroke={color} strokeWidth="2.5" />
      <path d="M14 50h52c1.7 0 3 1.3 3 3s-1.3 3-3 3H14c-1.7 0-3-1.3-3-3s1.3-3 3-3Z" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2.2" />
      <path d="M24 26h26" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M24 32h18" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <circle cx="54" cy="26" r="2" fill={color} />
    </svg>
  )
}

function GithubIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="24" stroke={color} strokeWidth="2.5" opacity="0.9" />
      <path d="M40 23c-9.4 0-17 7.6-17 17 0 7.5 4.9 13.8 11.6 16.1.8.2 1.1-.3 1.1-.7v-2.6c-4.7 1-5.7-2-5.7-2-.8-2-1.9-2.5-1.9-2.5-1.5-1 .1-1 .1-1 1.7.1 2.6 1.8 2.6 1.8 1.4 2.4 3.8 1.7 4.8 1.3.1-1 .6-1.7 1-2.1-3.8-.4-7.8-1.9-7.8-8.5 0-1.9.7-3.4 1.8-4.6-.2-.4-.8-2.1.2-4.5 0 0 1.5-.5 4.9 1.8 1.4-.4 2.9-.6 4.4-.6s3 .2 4.4.6c3.4-2.3 4.9-1.8 4.9-1.8 1 2.4.4 4.1.2 4.5 1.1 1.2 1.8 2.7 1.8 4.6 0 6.6-4 8.1-7.8 8.5.6.5 1.1 1.5 1.1 3v4.4c0 .4.3.9 1.1.7C52.1 53.8 57 47.5 57 40c0-9.4-7.6-17-17-17Z" fill={color} fillOpacity="0.18" />
    </svg>
  )
}

function ServerIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
      <rect x="20" y="18" width="40" height="14" rx="4" stroke={color} strokeWidth="2.5" />
      <rect x="20" y="36" width="40" height="14" rx="4" stroke={color} strokeWidth="2.5" />
      <rect x="20" y="54" width="40" height="14" rx="4" stroke={color} strokeWidth="2.5" />
      <circle cx="53" cy="25" r="1.8" fill={color} />
      <circle cx="53" cy="43" r="1.8" fill={color} />
      <circle cx="53" cy="61" r="1.8" fill={color} />
      <path d="M28 25h18M28 43h12M28 61h16" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="23" stroke={color} strokeWidth="2.5" />
      <path d="M17 40h46M40 17c7 7 11 15.4 11 23s-4 16-11 23c-7-7-11-15.4-11-23s4-16 11-23Z" stroke={color} strokeWidth="2.2" opacity="0.9" />
      <path d="M24 29c5.2 2.8 10.8 4.2 16 4.2S50.8 31.8 56 29M24 51c5.2-2.8 10.8-4.2 16-4.2S50.8 48.2 56 51" stroke={color} strokeWidth="2.1" opacity="0.65" />
      <circle cx="40" cy="40" r="3" fill={color} />
    </svg>
  )
}

function DeployVisual({ accent }: { accent: string }) {
  const files = ['app.tsx', 'api.ts', 'styles.css']
  const deployShadow = `0 0 30px ${accent}14`
  const stages = [
    { title: 'Laptop', badge: 'Local', accent: '#a855f7', icon: <LaptopIcon color="#c084fc" />, x: '8%', w: '18%' },
    { title: 'GitHub', badge: 'Repo', accent: '#22d3ee', icon: <GithubIcon color="#67e8f9" />, x: '29%', w: '17%' },
    { title: 'Server', badge: 'Build', accent: '#34d399', icon: <ServerIcon color="#6ee7b7" />, x: '50%', w: '18%' },
    { title: 'Live Site', badge: 'Live', accent: '#fbbf24', icon: <GlobeIcon color="#fcd34d" />, x: '72%', w: '20%' },
  ]
  const paths = ['M180 122 C260 122, 284 122, 356 122', 'M378 122 C470 122, 508 122, 584 122', 'M608 122 C688 122, 718 122, 812 122']

  return (
    <div
      className="relative h-[360px] overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.08),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.95),rgba(3,7,18,0.98))]"
      style={{ boxShadow: deployShadow }}
    >
      <div className="absolute inset-0 opacity-80">
        <svg className="h-full w-full" viewBox="0 0 980 360" preserveAspectRatio="none">
          <defs>
            <linearGradient id="deployLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="34%" stopColor="#22d3ee" />
              <stop offset="68%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="liveFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.06" />
            </linearGradient>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d={paths[0]} stroke="rgba(168,85,247,0.18)" strokeWidth="2" strokeDasharray="4 8" fill="none" />
          <path d={paths[1]} stroke="rgba(34,211,238,0.18)" strokeWidth="2" strokeDasharray="4 8" fill="none" />
          <path d={paths[2]} stroke="rgba(52,211,153,0.18)" strokeWidth="2" strokeDasharray="4 8" fill="none" />

          <motion.path d={paths[0]} stroke="url(#deployLine)" strokeWidth="3" strokeLinecap="round" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} filter="url(#softGlow)" />
          <motion.path d={paths[1]} stroke="url(#deployLine)" strokeWidth="3" strokeLinecap="round" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.1, delay: 0.3, ease: 'easeInOut' }} filter="url(#softGlow)" />
          <motion.path d={paths[2]} stroke="url(#deployLine)" strokeWidth="3" strokeLinecap="round" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.1, delay: 0.6, ease: 'easeInOut' }} filter="url(#softGlow)" />

          {[0, 1, 2, 3].map(index => (
            <motion.circle
              key={index}
              r="4.5"
              fill={index === 3 ? '#fbbf24' : '#fff'}
              filter="url(#softGlow)"
              animate={{ cx: [164, 356, 572, 804], cy: [122, 122, 122, 122], opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.8] }}
              transition={{ duration: 2.4, delay: index * 0.22, repeat: Infinity, repeatDelay: 0.25, ease: 'easeInOut' }}
            />
          ))}

          <motion.circle cx="356" cy="122" r="36" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.18" animate={{ scale: [0.95, 1.18, 0.95], opacity: [0.16, 0.38, 0.16] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.circle cx="804" cy="122" r="40" fill="url(#liveFill)" opacity="0.65" animate={{ scale: [0.96, 1.06, 0.96], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }} />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(168,85,247,0.12),transparent_20%),radial-gradient(circle_at_62%_20%,rgba(34,211,238,0.1),transparent_18%),radial-gradient(circle_at_84%_18%,rgba(34,197,94,0.12),transparent_18%)]" />

      <div className="absolute left-[2%] top-[6%] right-[2%] grid grid-cols-4 gap-4 px-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-300/70">
        {stages.map(stage => (
          <div key={stage.title} className="text-center">{stage.title}</div>
        ))}
      </div>

      {stages.map((stage, index) => (
        <motion.div
          key={stage.title}
          className="absolute"
          style={{ left: stage.x, top: '22%', width: stage.w }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
        >
          <div
            className="rounded-[1.6rem] border bg-slate-950/80 p-4 text-white shadow-[0_0_32px_rgba(255,255,255,0.06)]"
            style={{ borderColor: `${stage.accent}40`, boxShadow: `0 0 32px ${stage.accent}16` }}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: `${stage.accent}cc` }}>
                {stage.badge}
              </p>
              <span className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{index + 1}</span>
            </div>
            <div className="mt-3 flex items-center justify-center rounded-[1.4rem] border py-5" style={{ borderColor: `${stage.accent}22`, background: `${stage.accent}10` }}>
              {stage.icon}
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-300/75">
              <span>{stage.title}</span>
              {index === 3 ? <span className="rounded-full border border-amber-300/30 px-2 py-0.5 text-amber-200">ready</span> : <span>sync</span>}
            </div>
          </div>
        </motion.div>
      ))}

      {/* <motion.div
        className="absolute left-[48%] top-[24%] w-[16%] rounded-2xl border border-emerald-400/25 bg-slate-950/80 p-4 text-white shadow-[0_0_32px_rgba(52,211,153,0.16)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.24 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">Build Server</p>
          <span className="text-[10px] text-emerald-200">logs</span>
        </div>
        <div className="mt-3 flex items-center justify-center rounded-[1.4rem] border border-emerald-400/20 bg-emerald-500/10 py-5">
          {stages[2].icon}
        </div>
        <div className="mt-3 space-y-0.5 rounded-xl border border-emerald-400/15 bg-black/20 p-2 font-mono text-[9px] leading-none text-emerald-100/90">
          <motion.div animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 0.7, repeat: Infinity }}>Installing...</motion.div>
          <motion.div className="mt-1" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.12 }}>Testing...</motion.div>
          <motion.div className="mt-1" animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.24 }}>Build successful ✓</motion.div>
        </div>
      </motion.div> */}

      <motion.div
        className="absolute left-[72%] top-[22%] w-[20%] rounded-[1.6rem] border border-amber-300/30 bg-slate-950/82 p-4 text-white shadow-[0_0_34px_rgba(251,191,36,0.18)]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.36 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Live Site</p>
          <motion.span
            className="text-[10px] text-amber-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            live
          </motion.span>
        </div>
        <div className="mt-3 overflow-hidden rounded-[1.4rem] border border-amber-300/15 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-3">
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {stages[3].icon}
          </motion.div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="h-5 rounded-md bg-sky-400/35" />
            <div className="h-5 rounded-md bg-emerald-400/35" />
            <div className="h-5 rounded-md bg-violet-400/35" />
            <div className="h-5 rounded-md bg-orange-400/35" />
          </div>
        </div>
      </motion.div>

      <div className="absolute right-6 top-[42px] rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.35em] text-slate-200/80">
        Commit pushed ✓
      </div>

      <motion.div
        className="absolute left-1/2 top-[86%] -translate-x-1/2 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-100 shadow-[0_0_26px_rgba(34,197,94,0.16)]"
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.45 }}
      >
        Deployment successful ✅
      </motion.div>

      {files.map((file, index) => (
        <motion.div
          key={file}
          className="absolute rounded-full border border-white/10 bg-slate-950/85 px-3 py-1 text-[11px] font-mono text-slate-100 shadow-[0_0_16px_rgba(255,255,255,0.06)]"
          style={{ left: '11%', top: `${16 + index * 5}%` }}
          initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: [0, 72, 236, 490], y: [0, -20, -8, 0], rotate: [0, 2, -3, 0] }}
          transition={{ duration: 2.8, delay: 0.15 + index * 0.18, repeat: Infinity, repeatDelay: 0.7, ease: 'easeInOut' }}
        >
          {file}
        </motion.div>
      ))}

      <motion.div
        className="absolute left-[28%] top-[16%] h-28 w-[14%] rounded-full border border-cyan-300/15"
        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function FrontendLifecycleIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 72 72" className="h-12 w-12" fill="none" aria-hidden="true">
      <rect x="14" y="16" width="44" height="28" rx="5" stroke={color} strokeWidth="2.4" />
      <path d="M12 48h48c1.7 0 3 1.3 3 3s-1.3 3-3 3H12c-1.7 0-3-1.3-3-3s1.3-3 3-3Z" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2.1" />
      <path d="M23 24h15M23 30h23M23 36h10" stroke={color} strokeWidth="2.1" strokeLinecap="round" opacity="0.7" />
      <circle cx="51" cy="24" r="2" fill={color} />
    </svg>
  )
}

function ApiLifecycleIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 72 72" className="h-12 w-12" fill="none" aria-hidden="true">
      <path d="M17 23h38M17 36h38M17 49h38" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
      <path d="M22 18l-6 6 6 6" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <path d="M50 18l6 6-6 6" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx="36" cy="36" r="11" stroke={color} strokeWidth="2.2" opacity="0.9" />
      <path d="M31 36h10" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

function DatabaseLifecycleIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 72 72" className="h-12 w-12" fill="none" aria-hidden="true">
      <ellipse cx="36" cy="18" rx="18" ry="7" stroke={color} strokeWidth="2.3" />
      <path d="M18 18v26c0 3.9 8.1 7 18 7s18-3.1 18-7V18" stroke={color} strokeWidth="2.3" strokeLinejoin="round" />
      <path d="M18 31c0 3.9 8.1 7 18 7s18-3.1 18-7" stroke={color} strokeWidth="2.3" opacity="0.8" />
      <path d="M18 44c0 3.9 8.1 7 18 7s18-3.1 18-7" stroke={color} strokeWidth="2.3" opacity="0.6" />
      <circle cx="50" cy="21" r="2" fill={color} />
    </svg>
  )
}

function ApiVisual({ accent }: { accent: string }) {
  const [phase, setPhase] = useState(0)
  const [runId, setRunId] = useState(0)
  const apiShadow = `0 0 30px ${accent}14`

  useEffect(() => {
    setPhase(0)
    const timers = [
      window.setTimeout(() => setPhase(1), 140),
      window.setTimeout(() => setPhase(2), 700),
      window.setTimeout(() => setPhase(3), 1150),
      window.setTimeout(() => setPhase(4), 1700),
      window.setTimeout(() => setPhase(5), 2350),
      window.setTimeout(() => setPhase(6), 2900),
    ]

    return () => timers.forEach(clearTimeout)
  }, [runId])

  const rerun = () => setRunId(n => n + 1)

  const frontendGlow = phase >= 1
  const apiGlow = phase >= 1 && phase <= 4
  const dbGlow = phase >= 3 && phase <= 4
  const projectsVisible = phase >= 5

  return (
    <div
      className="relative h-[390px] overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.06),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.94),rgba(3,7,18,0.98))] pb-10"
      style={{ boxShadow: apiShadow }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(251,146,60,0.06),transparent_24%)]" />

      <div className="absolute left-5 top-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-400">
        Request Lifecycle
      </div>

      <div
        className="absolute right-5 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
        style={{ borderColor: `${accent}55`, background: `${accent}12`, color: accent }}
      >
        {phase < 5 ? 'Active' : 'Complete'}
      </div>

      <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 980 360" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="apiReq" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="apiRes" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="apiGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1="250" y1="145" x2="490" y2="145" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 10" />
        <line x1="490" y1="145" x2="730" y2="145" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 10" />

        <motion.line
          x1="250"
          y1="145"
          x2="490"
          y2="145"
          stroke="url(#apiReq)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#apiGlow)"
          animate={{ opacity: phase >= 1 && phase <= 3 ? 1 : 0.18 }}
          transition={{ duration: 0.2 }}
        />
        <motion.line
          x1="490"
          y1="145"
          x2="730"
          y2="145"
          stroke="url(#apiReq)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#apiGlow)"
          animate={{ opacity: phase >= 2 && phase <= 3 ? 1 : 0.18 }}
          transition={{ duration: 0.2 }}
        />
        <motion.line
          x1="730"
          y1="145"
          x2="490"
          y2="145"
          stroke="url(#apiRes)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#apiGlow)"
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.line
          x1="490"
          y1="145"
          x2="250"
          y2="145"
          stroke="url(#apiRes)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#apiGlow)"
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <motion.circle
          r="6"
          fill="#38bdf8"
          filter="url(#apiGlow)"
          animate={{
            cx: phase <= 1 ? 250 : phase === 2 ? 380 : phase === 3 ? 490 : 490,
            opacity: phase >= 1 && phase <= 3 ? 1 : 0,
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        />

        <motion.circle
          r="6"
          fill="#60a5fa"
          filter="url(#apiGlow)"
          animate={{
            cx: phase < 4 ? 730 : phase === 4 ? 610 : phase === 5 ? 420 : 250,
            opacity: phase >= 4 ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </svg>

      <div className="absolute left-[5%] top-[22%] w-[24%]">
        <motion.div
          className="rounded-[1.5rem] border border-sky-400/25 bg-slate-950/80 p-4 text-white"
          animate={{ scale: frontendGlow ? 1.03 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/70">Frontend</p>
            <span className="text-[10px] text-sky-200/70">UI</span>
          </div>
          <div className="mt-4 rounded-xl border border-sky-400/20 bg-sky-500/10 p-4 overflow-hidden">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-2xl border border-sky-300/25 bg-sky-400/10 p-2">
                <FrontendLifecycleIcon color="#7dd3fc" />
              </div>
              <div className="min-w-0 max-w-full">
                <div className="truncate text-sm font-semibold text-white">Frontend</div>
                <div className="truncate text-[10px] text-sky-100/70">Fetch Projects</div>
              </div>
            </div>
            <button
              type="button"
              onClick={rerun}
              className="mt-3 w-full rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-2 text-[10px] font-semibold text-sky-100"
            >
              Fetch Projects
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-[38%] top-[22%] w-[24%]">
        <motion.div
          className="rounded-[1.5rem] border border-violet-400/25 bg-slate-950/80 p-4 text-white"
          animate={{ scale: apiGlow ? 1.03 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-violet-300/70">API</p>
            <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-2 py-1 text-[10px] text-violet-200">
              200 OK
            </span>
          </div>
          <div className="mt-4 rounded-xl border border-violet-400/20 bg-violet-500/10 p-4 overflow-hidden">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-2xl border border-violet-300/25 bg-violet-400/10 p-2">
                <ApiLifecycleIcon color="#c4b5fd" />
              </div>
              <div className="min-w-0 max-w-full">
                <div className="truncate text-sm font-semibold text-white">API Server</div>
                <div className="truncate text-[10px] text-violet-100/70">
                  {phase < 2 ? 'Validating request...' : 'Processing request...'}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-violet-200/70">
              <span className="truncate">200 OK</span>
              <motion.span
                className="h-2.5 w-2.5 rounded-full border border-violet-300/40 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                style={{ opacity: phase >= 1 && phase <= 3 ? 1 : 0.35 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-[71%] top-[22%] w-[24%]">
        <motion.div
          className="rounded-[1.5rem] border border-cyan-400/25 bg-slate-950/80 p-4 text-white"
          animate={{ scale: dbGlow ? 1.03 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Database</p>
            <span className="text-[10px] text-cyan-200/70">SQL</span>
          </div>
          <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 overflow-hidden">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-2xl border border-cyan-300/25 bg-cyan-400/10 p-2">
                <DatabaseLifecycleIcon color="#67e8f9" />
              </div>
              <div className="min-w-0 max-w-full">
                <div className="truncate text-sm font-semibold text-white">Database</div>
                <div className="truncate text-[10px] text-cyan-100/70">SELECT * FROM projects</div>
              </div>
            </div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[12, 18, 10, 16].map((h, index) => (
                <motion.div
                  key={index}
                  className="flex-1 rounded-t-md bg-cyan-400/35"
                  initial={{ height: 0 }}
                  animate={{ height: dbGlow ? `${h}px` : 0, opacity: dbGlow ? 1 : 0.3 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            key="response"
            className="absolute left-[43%] top-[70%] rounded-2xl border border-cyan-400/25 bg-slate-950/90 px-3 py-2 text-[10px] font-mono text-cyan-100 shadow-[0_0_22px_rgba(96,165,250,0.14)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            <span className="inline-flex items-center gap-2">
              <ResponseLifecycleIcon color="#67e8f9" />
              <span>[{ '{' } title: "Portfolio" { '}' }, { '{' } title: "Dashboard" { '}' }]</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence> */}

      <AnimatePresence>
        {projectsVisible && (
          <motion.div
            key="projects"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-100"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            Projects rendered successfully ✅
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function WebSocketVisual({ accent }: { accent: string }) {
  const [phase, setPhase] = useState(0)
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    setPhase(0)
    const timers = [
      window.setTimeout(() => setPhase(1), 150),
      window.setTimeout(() => setPhase(2), 700),
      window.setTimeout(() => setPhase(3), 1250),
      window.setTimeout(() => setPhase(4), 1800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [runId])

  const rerun = () => setRunId(n => n + 1)
  const connected = phase >= 2

  return (
    <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.94),rgba(3,7,18,0.98))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.05),transparent_34%)]" />

      <div className="absolute left-5 top-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-400">
        WebSocket
      </div>
      <div
        className="absolute right-5 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
        style={{ borderColor: `${accent}55`, background: `${accent}12`, color: accent }}
      >
        {phase < 2 ? 'Disconnected' : 'Connected'}
      </div>

      <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 980 360" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="wsLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="wsGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1="260" y1="178" x2="720" y2="178" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="8 10" />
        <motion.line
          x1="260"
          y1="178"
          x2="720"
          y2="178"
          stroke="url(#wsLine)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#wsGlow)"
          animate={{ opacity: phase >= 1 ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
        />

        {[0, 1].map((i) => (
          <motion.circle
            key={i}
            r="4.5"
            fill={i === 0 ? '#38bdf8' : '#7dd3fc'}
            filter="url(#wsGlow)"
            animate={{
              cx: i === 0 ? [260, 380, 500, 620, 720] : [720, 620, 500, 380, 260],
              opacity: connected ? [0, 1, 1, 1, 0] : 0,
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          />
        ))}
      </svg>

      <div className="absolute left-[5%] top-[26%] w-[28%]">
        <motion.div className="rounded-[1.5rem] border border-sky-400/25 bg-slate-950/80 p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/70">Client / Browser</p>
            <span className="text-[10px] text-sky-200/70">UI</span>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-sky-400/20 bg-sky-500/10 p-4">
            <div className="rounded-2xl border border-sky-300/25 bg-sky-400/10 p-2">
              <FrontendLifecycleIcon color="#7dd3fc" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">Web client</div>
              <div className="truncate text-[10px] text-sky-100/70">
                {phase < 1 ? 'Disconnected' : 'Connecting...'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={rerun}
            className="mt-3 w-full rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-2 text-[10px] font-semibold text-sky-100"
          >
            Connect WebSocket
          </button>
        </motion.div>
      </div>

      <div className="absolute right-[5%] top-[26%] w-[28%]">
        <motion.div className="rounded-[1.5rem] border border-cyan-400/25 bg-slate-950/80 p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Server</p>
            <span className="text-[10px] text-cyan-200/70">Socket</span>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
            <div className="rounded-2xl border border-cyan-300/25 bg-cyan-400/10 p-2">
              <DatabaseLifecycleIcon color="#67e8f9" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">Persistent server</div>
              <div className="truncate text-[10px] text-cyan-100/70">
                {phase < 2 ? 'Waiting for client' : 'Real-time connection active ✅'}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-cyan-100/75">
            <span>Protocol: WebSocket</span>
            <span>Latency: 42ms</span>
          </div>
          <div className="mt-2 text-[10px] text-cyan-100/75">Connection: persistent</div>
        </motion.div>
      </div>

      <motion.div
        className="absolute left-1/2 top-[12%] -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-200/80"
        animate={{ opacity: phase >= 2 ? [0.65, 1, 0.65] : 0.35 }}
        transition={{ duration: 1, repeat: phase >= 2 ? Infinity : 0 }}
      >
        {phase < 2 ? 'Connecting...' : 'Real-time connection active ✅'}
      </motion.div>

      {/* <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-sky-400/25 bg-sky-500/10 px-4 py-3 text-xs font-semibold text-sky-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            Real-time connection active ✅
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  )
}

const perfMetrics = [
  { key: 'lcp', label: 'LCP', before: '3.8s', after: '1.2s', beforePct: 92, afterPct: 28 },
  { key: 'bundle', label: 'Bundle', before: '740KB', after: '280KB', beforePct: 88, afterPct: 32 },
  { key: 'cls', label: 'CLS', before: '0.18', after: '0.04', beforePct: 78, afterPct: 22 },
  { key: 'tbt', label: 'TBT', before: '420ms', after: '120ms', beforePct: 85, afterPct: 30 },
] as const

const perfBadges = [
  { before: 'Poor', after: 'Fast', bad: true },
  { before: 'Heavy', after: 'Lean', bad: true },
  { before: 'Slow', after: 'Cached', bad: true },
  { before: 'Bloated', after: 'Split', bad: true },
] as const

function PerformanceVisual({ accent }: { accent: string }) {
  const [phase, setPhase] = useState(0)
  const [runId, setRunId] = useState(0)
  const [score, setScore] = useState(48)

  useEffect(() => {
    const kickoff = window.setTimeout(() => setRunId(1), 420)
    return () => clearTimeout(kickoff)
  }, [])

  useEffect(() => {
    if (runId === 0) return
    setPhase(0)
    setScore(48)
    const timers = [
      window.setTimeout(() => setPhase(1), 150),
      window.setTimeout(() => setPhase(2), 750),
      window.setTimeout(() => setPhase(3), 1500),
      window.setTimeout(() => setPhase(4), 2300),
      window.setTimeout(() => setPhase(5), 3100),
      window.setTimeout(() => setPhase(6), 3900),
    ]
    return () => timers.forEach(clearTimeout)
  }, [runId])

  useEffect(() => {
    if (phase < 6) return
    const start = 48
    const end = 96
    const duration = 1200
    const startTime = performance.now()
    const tick = () => {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setScore(Math.round(start + (end - start) * progress))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [phase])

  const optimizing = phase >= 1
  const barsDone = phase >= 3
  const splitDone = phase >= 4
  const netDone = phase >= 5
  const done = phase >= 6

  const scoreCirc = 2 * Math.PI * 42
  const scoreOffset = scoreCirc - (score / 100) * scoreCirc

  return (
    <div
      className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.94),rgba(3,7,18,0.98))] pb-4"
      style={{ boxShadow: `0 0 24px ${accent}12` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent_40%)]" />

      <div className="absolute left-5 top-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-400">
        Performance cleanup
      </div>
      <div
        className="absolute right-5 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
        style={{
          borderColor: done ? `${accent}55` : optimizing ? 'rgba(251,146,60,0.4)' : 'rgba(248,113,113,0.25)',
          background: done ? `${accent}12` : optimizing ? 'rgba(251,146,60,0.12)' : 'rgba(15,23,42,0.6)',
          color: done ? accent : optimizing ? '#fb923c' : '#94a3b8',
        }}
      >
        {done ? 'Optimized' : optimizing ? 'Optimizing...' : 'Needs cleanup'}
      </div>

      <div className="relative z-10 flex flex-col gap-4 p-4 pt-12 lg:flex-row">
        {/* Score + metrics */}
        <div className="flex flex-col items-center gap-4 lg:w-[38%]">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" className="rotate-[-90deg]">
              <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <motion.circle
                cx="60"
                cy="60"
                r="42"
                fill="none"
                stroke={done ? '#22c55e' : '#fb923c'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={scoreCirc}
                animate={{ strokeDashoffset: scoreOffset }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                style={{ filter: `drop-shadow(0 0 8px ${done ? accent : '#fb923c'}66)` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-3xl font-extrabold text-white"
                key={score}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              >
                {score}
              </motion.span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Performance</span>
            </div>
          </div>

          <div className="w-full space-y-2.5">
            {perfMetrics.map((m, i) => (
              <motion.div
                key={m.key}
                className="rounded-xl border border-white/8 bg-black/25 px-3 py-2"
                animate={
                  !optimizing
                    ? { x: [0, -2, 2, -1, 1, 0], borderColor: 'rgba(248,113,113,0.35)' }
                    : { x: 0, borderColor: barsDone ? 'rgba(34,197,94,0.35)' : 'rgba(251,146,60,0.25)' }
                }
                transition={!optimizing ? { duration: 0.45, repeat: Infinity, repeatDelay: 0.6 } : { duration: 0.35 }}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-slate-300">{m.label}</span>
                  <motion.span
                    className="font-mono font-semibold"
                    animate={{ color: barsDone ? '#86efac' : '#fb923c' }}
                  >
                    {!barsDone ? m.before : m.after}
                  </motion.span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: `${m.beforePct}%` }}
                    animate={{
                      width: barsDone ? `${m.afterPct}%` : `${m.beforePct}%`,
                      background: barsDone
                        ? 'linear-gradient(90deg,#22c55e,#4ade80)'
                        : 'linear-gradient(90deg,#ef4444,#fb923c)',
                    }}
                    transition={{ type: 'spring', stiffness: 90, damping: 18, delay: i * 0.08 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {perfBadges.map((b, i) => (
              <motion.span
                key={b.before}
                className="rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                animate={{
                  scale: !optimizing ? [1, 1.04, 1] : done ? 1 : 1,
                  borderColor: done ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.45)',
                  background: done ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                  color: done ? '#86efac' : '#fca5a5',
                }}
                transition={
                  !optimizing
                    ? { duration: 0.35, repeat: Infinity, repeatDelay: 0.4, delay: i * 0.08 }
                    : { delay: i * 0.05 }
                }
              >
                {done ? b.after : b.before}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bundle split + network */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="rounded-xl border border-white/8 bg-slate-950/60 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Core vitals
            </p>
            <div className="flex h-24 items-end gap-1.5">
              {[92, 88, 78, 85, 96, 90].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md"
                  animate={{
                    height: barsDone ? `${[28, 32, 22, 30, 26, 24][i]}%` : `${h}%`,
                    background: barsDone
                      ? 'linear-gradient(180deg,#22c55e,#4ade80)'
                      : 'linear-gradient(180deg,#ef4444,#fb923c)',
                  }}
                  transition={{ type: 'spring', stiffness: 85, damping: 16, delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/8 bg-slate-950/60 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Bundle split
            </p>
            <div className="relative flex h-16 items-center justify-center gap-2">
              <AnimatePresence mode="wait">
                {!splitDone ? (
                  <motion.div
                    key="mono"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex h-12 w-28 items-center justify-center rounded-lg border border-orange-500/40 bg-orange-500/20 text-[9px] font-bold text-orange-200"
                    animate={optimizing ? { x: [0, 1, -1, 1, -1, 0], rotate: [0, -1, 1, -1, 0] } : {}}
                    transition={{ duration: 0.4, repeat: optimizing ? Infinity : 0 }}
                  >
                    app.js
                  </motion.div>
                ) : (
                  <>
                    {['main.js', 'vendor.js', 'lazy-route.js'].map((name, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -8, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 200, damping: 16 }}
                        className="flex h-10 flex-1 items-center justify-center rounded-md border border-emerald-500/35 bg-emerald-500/15 text-[8px] font-semibold text-emerald-200"
                      >
                        {name}
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-xl border border-white/8 bg-slate-950/60 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Network
            </p>
            <svg viewBox="0 0 280 56" className="h-14 w-full" aria-hidden="true">
              {!netDone ? (
                <>
                  {[20, 55, 90, 125, 160, 195, 230].map((x, i) => (
                    <motion.line
                      key={`messy-${i}`}
                      x1={x}
                      y1={8 + (i % 4) * 12}
                      x2={x + 30 + (i % 3) * 8}
                      y2={20 + (i % 5) * 8}
                      stroke="rgba(248,113,113,0.35)"
                      strokeWidth="1"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </>
              ) : (
                <>
                  <line x1="40" y1="28" x2="240" y2="28" stroke="rgba(34,197,94,0.5)" strokeWidth="2" />
                  {[
                    { x1: 50, x2: 120, label: 'cached' },
                    { x1: 120, x2: 190, label: 'compressed' },
                    { x1: 190, x2: 240, label: 'lazy-loaded' },
                  ].map((line, i) => (
                    <g key={line.label}>
                      <motion.line
                        x1={line.x1}
                        y1="28"
                        x2={line.x2}
                        y2="28"
                        stroke="#4ade80"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.2 + i * 0.2, duration: 0.4 }}
                      />
                      <text x={(line.x1 + line.x2) / 2} y="52" textAnchor="middle" fill="#86efac" fontSize="8">
                        {line.label}
                      </text>
                    </g>
                  ))}
                </>
              )}
            </svg>
          </div>
        </div>
      </div>

      {done && (
        <motion.button
          type="button"
          onClick={() => setRunId(n => n + 1)}
          className="absolute right-5 bottom-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold text-slate-300 hover:bg-white/10"
        >
          Replay
        </motion.button>
      )}

      {optimizing && phase < 6 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <motion.div
            className="h-8 w-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      <AnimatePresence>
        {done && (
          <motion.div
            className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-emerald-400/30 bg-emerald-500/12 px-4 py-2 text-xs font-semibold text-emerald-100"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Score 48 → 96 · LCP 3.8s → 1.2s · Bundle 740KB → 280KB · Requests 42 → 18
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SkillBadge({
  name,
  accent,
  delay,
  visible,
}: {
  name: string
  accent: string
  delay: number
  visible: boolean
}) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={name}
          className="relative"
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18, delay }}
        >
          <motion.span
            className="pointer-events-none absolute -inset-1 rounded-full"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.75, 0], scale: [0.6, 1.35, 1.6] }}
            transition={{ delay: delay + 0.15, duration: 0.55, ease: 'easeOut' }}
            style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }}
          />
          <span
            className="relative block rounded-full border px-3 py-1.5 text-[11px] font-semibold text-white"
            style={{
              background: `${accent}20`,
              borderColor: `${accent}70`,
              boxShadow: `0 0 14px ${accent}44, inset 0 0 12px ${accent}12`,
            }}
          >
            {name}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function SkillsVisual({ accent }: { accent: string }) {
  const [runId, setRunId] = useState(0)
  const [progress, setProgress] = useState(0)
  const [visibleLogs, setVisibleLogs] = useState(0)
  const [unlockedWaves, setUnlockedWaves] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const kickoff = window.setTimeout(() => setRunId(1), 300)
    return () => clearTimeout(kickoff)
  }, [])

  useEffect(() => {
    if (runId === 0) return

    setProgress(0)
    setVisibleLogs(0)
    setUnlockedWaves(0)
    setDone(false)

    const timers = [
      window.setTimeout(() => setVisibleLogs(1), 200),
      window.setTimeout(() => setProgress(12), 350),
      window.setTimeout(() => setVisibleLogs(2), 550),
      window.setTimeout(() => {
        setUnlockedWaves(1)
        setProgress(24)
      }, 800),
      window.setTimeout(() => setVisibleLogs(3), 1000),
      window.setTimeout(() => {
        setUnlockedWaves(2)
        setProgress(38)
      }, 1250),
      window.setTimeout(() => setVisibleLogs(4), 1450),
      window.setTimeout(() => {
        setUnlockedWaves(3)
        setProgress(54)
      }, 1700),
      window.setTimeout(() => setVisibleLogs(5), 1900),
      window.setTimeout(() => {
        setUnlockedWaves(4)
        setProgress(72)
      }, 2150),
      window.setTimeout(() => {
        setUnlockedWaves(5)
        setProgress(100)
      }, 2600),
      window.setTimeout(() => setDone(true), 3200),
    ]

    return () => timers.forEach(clearTimeout)
  }, [runId])

  const scrollToProjects = () => {
    document.querySelector('.projects-dash')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const MotionLink = motion(Link)

  return (
    <div
      className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.12),transparent_40%),linear-gradient(180deg,rgba(2,6,23,0.95),rgba(15,23,42,0.98))] p-4"
      style={{ boxShadow: `0 0 28px ${accent}14` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.08),transparent_45%)]" />

      <div className="relative z-10 space-y-3">
        <div className="rounded-xl border border-white/10 bg-black/35 p-3 font-mono text-[11px]">
          <p className="text-violet-300/80">&gt; npm run skills</p>
          <div className="mt-2 space-y-1">
            {skillsBuildLogs.map((line, i) => (
              <motion.p
                key={line}
                className="text-slate-300"
                initial={{ opacity: 0, x: -6 }}
                animate={i < visibleLogs ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
            <span>Build progress</span>
            <motion.span style={{ color: accent }}>{progress}%</motion.span>
          </div>
          <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-black/40">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 70, damping: 18 }}
              style={{
                background: `linear-gradient(90deg, ${accent}, #c4b5fd)`,
                boxShadow: `0 0 12px ${accent}66`,
              }}
            />
          </div>
        </div>

        <div className="max-h-[220px] space-y-2.5 overflow-y-auto pr-1">
          {skillWaves.map((wave, waveIndex) => {
            const waveVisible = waveIndex < unlockedWaves
            return (
              <div
                key={wave.category}
                className="rounded-xl border border-white/8 bg-slate-950/50 px-3 py-2.5"
                style={{
                  borderColor: waveVisible ? `${accent}35` : 'rgba(255,255,255,0.08)',
                  opacity: waveVisible ? 1 : 0.45,
                }}
              >
                <p
                  className="mb-2 text-[10px] font-bold uppercase leading-tight tracking-wide"
                  style={{ color: waveVisible ? accent : '#64748b' }}
                >
                  {wave.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {wave.skills.map((skill, skillIndex) => (
                    <SkillBadge
                      key={skill}
                      name={skill}
                      accent={accent}
                      delay={skillIndex * 0.08}
                      visible={waveVisible}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-violet-100">Build complete ✅</p>
                {/* <p className="mt-0.5 text-xs text-violet-200/80">Skills loaded successfully.</p> */}
              </div>
              <div className="flex items-center justify-between gap-2">
                <MotionLink
                  to="/"
                  onClick={e => {
                    e.preventDefault()
                    scrollToProjects()
                  }}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-950"
                  style={{
                    background: accent,
                    boxShadow: `0 0 20px ${accent}55`,
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Projects
                </MotionLink>
                <button
                  type="button"
                  onClick={() => setRunId(n => n + 1)}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold text-slate-300 hover:bg-white/10"
                >
                  Replay build
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {progress > 0 && progress < 100 && (
        <motion.div
          className="absolute right-4 top-4 h-2 w-2 rounded-full"
          style={{ background: accent }}
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      )}
    </div>
  )
}

function HireTypewriterLine({
  text,
  active,
  completed,
  highlight,
}: {
  text: string
  active: boolean
  completed: boolean
  highlight?: boolean
}) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (completed) {
      setDisplayed(text)
      return
    }
    if (!active) {
      setDisplayed('')
      return
    }
    let index = 0
    setDisplayed('')
    const tick = window.setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) clearInterval(tick)
    }, 26)
    return () => clearInterval(tick)
  }, [active, completed, text])

  if (!active && !completed && !displayed) return null

  return (
    <p className={highlight ? 'text-emerald-300' : 'text-slate-300'}>
      {displayed}
      {active && displayed.length < text.length ? (
        <motion.span
          className="ml-0.5 inline-block text-cyan-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.55, repeat: Infinity }}
        >
          ▋
        </motion.span>
      ) : null}
    </p>
  )
}

function HireConfetti({ show }: { show: boolean }) {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: (i % 6) * 18 - 45,
    y: -20 - (i % 4) * 12,
    color: i % 2 === 0 ? '#34d399' : '#38bdf8',
    rotate: (i * 37) % 360,
  }))

  if (!show) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map(p => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/3 h-2 w-2 rounded-sm"
          style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x * 2.2,
            y: p.y * 2.8 + 80,
            rotate: p.rotate,
            scale: [1, 1.2, 0.6],
          }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: p.id * 0.03 }}
        />
      ))}
    </div>
  )
}

function HireVisual({ accent }: { accent: string }) {
  const neonGreen = accent
  const neonBlue = '#38bdf8'
  const [runId, setRunId] = useState(0)
  const [visibleLogs, setVisibleLogs] = useState(0)
  const [activeLog, setActiveLog] = useState(-1)
  const [visibleChecks, setVisibleChecks] = useState(0)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const MotionLink = motion(Link)

  useEffect(() => {
    const kickoff = window.setTimeout(() => setRunId(1), 280)
    return () => clearTimeout(kickoff)
  }, [])

  useEffect(() => {
    if (runId === 0) return

    setVisibleLogs(0)
    setActiveLog(-1)
    setVisibleChecks(0)
    setProgress(0)
    setComplete(false)
    setShowConfetti(false)

    const timers = [
      window.setTimeout(() => {
        setVisibleLogs(1)
        setActiveLog(0)
        setProgress(12)
      }, 200),
      window.setTimeout(() => {
        setVisibleChecks(1)
        setProgress(24)
      }, 700),
      window.setTimeout(() => {
        setVisibleLogs(2)
        setActiveLog(1)
        setProgress(38)
      }, 1100),
      window.setTimeout(() => {
        setVisibleChecks(2)
        setProgress(50)
      }, 1500),
      window.setTimeout(() => {
        setVisibleLogs(3)
        setActiveLog(2)
        setProgress(62)
      }, 1900),
      window.setTimeout(() => {
        setVisibleChecks(3)
        setProgress(72)
      }, 2300),
      window.setTimeout(() => {
        setVisibleLogs(4)
        setActiveLog(3)
        setProgress(82)
      }, 2700),
      window.setTimeout(() => {
        setVisibleChecks(4)
        setProgress(90)
      }, 3100),
      window.setTimeout(() => {
        setVisibleLogs(5)
        setActiveLog(4)
        setVisibleChecks(5)
        setProgress(100)
      }, 3500),
      window.setTimeout(() => {
        setActiveLog(-1)
        setComplete(true)
        setShowConfetti(true)
      }, 4000),
      window.setTimeout(() => setShowConfetti(false), 5200),
    ]

    return () => timers.forEach(clearTimeout)
  }, [runId])

  return (
    <div
      className="relative min-h-[360px] overflow-hidden rounded-2xl border border-emerald-500/20 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.12),transparent_38%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(3,7,18,0.99))] p-4"
      style={{ boxShadow: `0 0 32px ${neonGreen}18, 0 0 48px ${neonBlue}10` }}
    >
      <HireConfetti show={showConfetti} />

      <div className="relative z-10 grid gap-3 lg:grid-cols-[1fr_1.05fr]">
        <div className="rounded-xl border border-cyan-500/20 bg-black/50 p-3 font-mono text-[11px] shadow-[0_0_24px_rgba(56,189,248,0.12)]">
          <p className="text-emerald-400">&gt; hire developer</p>
          <div className="mt-2 min-h-[88px] space-y-1">
            {hireScanLogs.map((line, i) =>
              i < visibleLogs ? (
                <HireTypewriterLine
                  key={line}
                  text={line}
                  active={activeLog === i}
                  completed={activeLog > i || (activeLog === -1 && i < visibleLogs)}
                  highlight={i === hireScanLogs.length - 1}
                />
              ) : null,
            )}
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/25 bg-slate-950/70 p-3 shadow-[0_0_20px_rgba(52,211,153,0.1)]">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-300/80">Candidate card</p>
            <span
              className="rounded-full border px-2 py-0.5 text-[9px] font-semibold"
              style={{
                borderColor: complete ? `${neonGreen}55` : `${neonBlue}44`,
                background: complete ? `${neonGreen}18` : `${neonBlue}12`,
                color: complete ? neonGreen : neonBlue,
              }}
            >
              {complete ? 'VERIFIED' : 'SCANNING'}
            </span>
          </div>

          <div className="space-y-1.5">
            {hireChecks.map((check, i) => (
              <motion.div
                key={check.label}
                className="flex items-center justify-between rounded-lg border border-white/6 bg-black/30 px-2.5 py-1.5 text-[11px]"
                initial={{ opacity: 0, x: -8 }}
                animate={
                  i < visibleChecks
                    ? { opacity: 1, x: 0, borderColor: 'rgba(52,211,153,0.25)' }
                    : { opacity: 0.35, x: 0 }
                }
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <span className="text-slate-300">{check.label}</span>
                {i < visibleChecks ? (
                  <motion.span
                    initial={{ scale: 0.5, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                    className={
                      check.status === 'warn'
                        ? 'font-semibold text-amber-300'
                        : 'font-semibold text-emerald-400'
                    }
                  >
                    {check.status === 'warn' ? `⚠️ ${check.note}` : '✅'}
                  </motion.span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              <span>Hiring scan</span>
              <span style={{ color: neonGreen }}>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-black/50">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 65, damping: 16 }}
                style={{
                  background: `linear-gradient(90deg, ${neonGreen}, ${neonBlue})`,
                  boxShadow: `0 0 14px ${neonGreen}88`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div
            className="relative z-10 mt-3 space-y-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 px-3 py-2.5 text-center shadow-[0_0_24px_rgba(52,211,153,0.15)]">
              <p className="text-sm font-extrabold tracking-wide text-emerald-200">
                MATCH SCORE: <span className="text-white">96%</span>
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
                Status: Ready to interview
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <MotionLink
                to="/contact"
                className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-950"
                style={{
                  background: `linear-gradient(135deg, ${neonGreen}, ${neonBlue})`,
                  boxShadow: `0 0 22px ${neonGreen}66`,
                }}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.1 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Let&apos;s Talk
              </MotionLink>
              <MotionLink
                to="/experience"
                className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-100"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.2 }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Download CV
              </MotionLink>
              <button
                type="button"
                onClick={() => setRunId(n => n + 1)}
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold text-slate-300 hover:bg-white/10"
              >
                Replay scan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CommandSystemPanel({
  activeCommand,
  runSignal,
}: {
  activeCommand: CommandId
  runSignal: number
}) {
  const spec = commandSpecs.find(item => item.id === activeCommand) ?? commandSpecs[0]

  return (
    <div
      className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 md:p-5 shadow-[0_0_35px_rgba(0,0,0,0.35)]"
      style={{
        boxShadow: `0 0 30px ${spec.accent}14, 0 0 70px rgba(0,0,0,0.35)`,
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">System View</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{spec.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{spec.subtitle}</p>
        </div>
        <PanelPill accent={spec.accent}>ACTIVE</PanelPill>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${spec.id}-${runSignal}`}
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.985 }}
          transition={{ duration: 0.35 }}
        >
          {spec.id === 'skills' ? <SkillsVisual accent={spec.accent} /> : null}
          {spec.id === 'deploy' ? <DeployVisual accent={spec.accent} /> : null}
          {spec.id === 'api' ? <ApiVisual accent={spec.accent} /> : null}
          {spec.id === 'websocket' ? <WebSocketVisual accent={spec.accent} /> : null}
          {spec.id === 'performance' ? <PerformanceVisual accent={spec.accent} /> : null}
          {spec.id === 'hire' ? <HireVisual accent={spec.accent} /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function DeveloperCommandCenter() {
  const [activeCommand, setActiveCommand] = useState<CommandId>('skills')
  const [runSignal, setRunSignal] = useState(1)
  const [terminalInput, setTerminalInput] = useState('npm run skills')
  const [terminalLog, setTerminalLog] = useState<string[]>([
    'portfolio@run-stack:~$ ready',
    'Type a command or click a shortcut below.',
    'Skill unlock sequence loaded.',
  ])
  const logRef = useRef<HTMLDivElement>(null)

  const currentSpec = commandSpecs.find(spec => spec.id === activeCommand) ?? commandSpecs[0]

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [terminalLog])

  const runCommand = (value: string) => {
    const selected = getCommandSpec(value)

    if (!selected) {
      setTerminalLog(prev => [...prev, `> ${value}`, 'Command not found. Try one of the shortcuts below.'].slice(-10))
      return
    }

    setActiveCommand(selected.id)
    setTerminalInput(selected.command)
    setTerminalLog(prev => [...prev, `> ${selected.command}`, ...selected.terminalLines].slice(-10))
    setRunSignal(n => n + 1)
  }

  const onSubmit = () => {
    runCommand(terminalInput)
  }

  return (
    <section className="relative z-10 mx-auto mt-20 max-w-6xl px-6 pb-2">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-8"
      >
        <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-white">
          <span
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, #fb923c)' }}
          />
          Run My Stack
          <span
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, #fb923c, #38bdf8, transparent)' }}
          />
        </h2>
        {/* <p className="mx-auto max-w-2xl text-center text-sm text-slate-400 md:text-base">
          A mini developer command center where terminal commands wake up architecture, performance,
          realtime, and delivery visuals on the right.
        </p> */}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-sky-500/15 bg-slate-950/80 p-4 shadow-[0_0_35px_rgba(56,189,248,0.08)]"
        >
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <PanelPill accent={currentSpec.accent}>
              <span className="inline-flex items-center gap-1.5">
                <Terminal className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                TERMINAL
              </span>
            </PanelPill>
          </div>

          <div className="mt-4 rounded-2xl border border-sky-400/10 bg-black/40 p-4 font-mono text-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <Terminal className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={2.25} aria-hidden="true" />
              <span className="text-emerald-300">alejandro@portfolio</span>
              <span className="text-slate-500">%</span>
              <span className="text-white">run</span>
              <span style={{ color: currentSpec.accent }}>{currentSpec.command}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ color: currentSpec.accent }}
              >
                ▋
              </motion.span>
            </div>

            <div ref={logRef} className="mt-4 max-h-56 space-y-2 overflow-y-auto pr-1 text-slate-100">
              {terminalLog.map((line, index) => (
                <TerminalLogLine
                  key={`${line}-${index}`}
                  line={line}
                  isLatest={index === terminalLog.length - 1}
                  accent={currentSpec.accent}
                />
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <div className="relative min-w-0 flex-1">
                <ChevronRight
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400/60"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <input
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') onSubmit()
                  }}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-2 pl-9 pr-3 text-sm text-white outline-none transition focus:border-sky-400/50"
                  spellCheck={false}
                />
              </div>
              <motion.button
                type="button"
                onClick={onSubmit}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-slate-950"
                style={{ background: currentSpec.accent, boxShadow: `0 0 20px ${currentSpec.accent}40` }}
              >
                <Play className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} aria-hidden="true" />
                Run
              </motion.button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {commandSpecs.map(spec => {
              const active = spec.id === activeCommand
              return (
                <motion.button
                  key={spec.id}
                  type="button"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => runCommand(spec.command)}
                  className="w-full rounded-2xl border px-3 py-2.5 text-left transition-colors"
                  style={{
                    background: active ? `${spec.accent}1c` : 'rgba(15, 23, 42, 0.72)',
                    borderColor: active ? `${spec.accent}66` : 'rgba(255,255,255,0.08)',
                    color: active ? '#ffffff' : '#cbd5e1',
                    boxShadow: active ? `0 0 18px ${spec.accent}1f` : 'none',
                  }}
                >
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CommandShortcutIcon id={spec.id} accent={spec.accent} active={active} />
                      <span
                        className="min-w-0 text-[10px] font-bold uppercase leading-tight tracking-wide break-words"
                        style={{ color: spec.accent }}
                      >
                        {spec.id}
                      </span>
                    </div>
                    <span className="block text-[10px] font-medium leading-snug break-words text-slate-300">
                      {spec.label}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CommandSystemPanel activeCommand={activeCommand} runSignal={runSignal} />
        </motion.div>
      </div>
    </section>
  )
}
