import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LLMProjectModal from '../components/LLMProjectModal'
import AIChatbotModal from '../components/AIChatbotModal'
import AIEngineerModal from '../components/AIEngineerModal'
import FullStackModal from '../components/FullStackModal'
import SystemArchitectModal from '../components/SystemArchitectModal'
import TeamLeaderModal from '../components/TeamLeaderModal'

const milestones: { year: string; label: string; title: string; detail: string }[] = [
  {
    year: '2016',
    label: 'Start Coding',
    title: 'Started Coding',
    detail: 'Began my journey into software engineering at the University of Málaga, mastering fundamentals of algorithms, data structures, and system design. This laid the foundation for my work in backend development and cloud solutions.'
  },
  {
    year: '2019',
    label: 'CS Bachelor',
    title: 'Bachelor in Computer Science',
    detail: 'Graduated from the University of Málaga. During my studies, I architected a decentralized exchange handling 10k+ daily transactions with sub-second finality on-chain, deepening my expertise in distributed systems.'
  },
  {
    year: '2021',
    label: 'Data Science',
    title: 'Data Scientist at Accenture',
    detail: 'Developed and deployed 12+ machine learning models, including NLP and deep learning, improving prediction accuracy by 25%. I integrated AI models into production, supporting systems used by 50k+ users.'
  },
  {
    year: '2024',
    label: 'Full-Stack Dev',
    title: 'Full-Stack AI Developer at ARHS Group',
    detail: 'Designed and deployed 8+ AI-driven features and full-stack web applications, improving workflow efficiency by 30%. My work in cloud technologies, including AWS and Kubernetes, scaled systems to handle 78K+ daily requests.'
  },
  {
    year: '2025',
    label: 'Senior Software Engineer',
    title: 'Senior Software Developer (Self-employed)',
    detail: 'I began working as a Senior Software Developer, delivering scalable full-stack and AI-driven solutions for international clients using Python, JavaScript, React, Node.js, AWS, Docker, and Kubernetes.'
  },
  {
    year: '2026',
    label: 'Building the Future',
    title: 'Building the Future',
    detail: 'Architecting next-generation trading world, Be focus on Development of Prediction Market Trading terminal'
  }
]

export default function AboutPage() {
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [active, setActive] = useState<number | null>(2)
  const [llmOpen, setLlmOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [approachIndex, setApproachIndex] = useState(0)
  const [aiEngineerOpen, setAiEngineerOpen] = useState(false)
  const [fullStackOpen, setFullStackOpen] = useState(false)
  const [sysArchOpen, setSysArchOpen] = useState(false)
  const [teamLeaderOpen, setTeamLeaderOpen] = useState(false)

  const approaches = [
    'I design and build systems from front-end to back-end, utilizing AI to solve complex problems, automate tasks, and create intelligent applications.',
    'I architect scalable blockchain infrastructure with a focus on performance, security, and decentralization "” writing every line with purpose.',
    'I believe great engineering is invisible. The best systems are the ones users never have to think about "” they just work, fast and reliably.',
    'I approach every problem like a puzzle: break it down, find the optimal path, then build it so clean that the next engineer smiles reading it.',
    'I merge deep backend expertise with AI-driven thinking "” turning raw data and complex logic into products that genuinely move the needle.',
  ]

  useEffect(() => {}, []) // scroll handler removed "” using CSS background-size cover instead

  return (
    <>
    <div
      className="about-bg about-page relative"
      style={{
        backgroundImage: 'url(/about.png)',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundAttachment: 'scroll',
        minHeight: '100%',
        // paddingBottom: '1rem',
      }}
    >
      {/* Ambient glow overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '10%',
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 236, 220, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Hero title */}
      <div className="relative z-10 pt-30 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="font-extrabold mb-4"
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textShadow: '0 2px 24px rgba(0,0,0,0.7)',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
            }}
          >
            Welcome to My Journey
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 4 }}>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, transparent, #38bdf8)' }} />
            <p
              className="hero-sub text-sm tracking-widest uppercase"
              style={{ color: '#94a3b8', letterSpacing: '0.25em', fontWeight: 600 }}
            >
              Senior Software Developer
            </p>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, #fb923c, transparent)' }} />
          </div>
        </motion.div>
      </div>

      {/* Main content: timeline + photo */}
      <div className="main-layout relative z-10 mt-16" style={{ paddingLeft: '5%', paddingRight: '2%' }}>
        <div className="flex items-start">

          {/* Career line "” SVG growth chart */}
          <div className="career-line flex flex-col" style={{ width: '70vw' }}>
          <div className="career-chart-wrap relative" style={{ height: '520px', overflow: 'visible' }}>
            <svg width="100%" height="100%" viewBox="0 0 1400 440" preserveAspectRatio="xMinYMid meet" style={{ overflow: 'visible' }}>
              {[80, 160, 240, 320].map(y => (
                <line key={y} x1="0" y1={y} x2="1400" y2={y} stroke="rgba(56,189,248,0.06)" strokeWidth="1" />
              ))}
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
                <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb923c" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path d="M116,380 L350,256 L466,200 L700,184 L1050,70 L1320,16 L1400,10 L1400,420 L116,420 Z"
                fill="url(#fillGrad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} />
              <motion.path d="M116,380 L350,256 L466,200 L700,184 L1050,70 L1320,16"
                fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(251,146,60,0.6))' }}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
              {[
                { x: 116,  y: 380, i: 0 },
                { x: 350,  y: 256, i: 1 },
                { x: 466,  y: 200, i: 2 },
                { x: 700,  y: 184, i: 3 },
                { x: 1050, y: 70,  i: 4 },
                { x: 1320, y: 16,  i: 5 },
              ].map(({ x, y, i }) => (
                <g key={i} style={{ cursor: 'pointer' }} onClick={() => setActive(active === i ? null : i)}>
                  {active !== i && i < milestones.length - 1 && (
                    <motion.circle cx={x} cy={y} r={20} fill="none"
                      stroke='#38bdf8' strokeWidth="1"
                      animate={{ r: [16, 32, 16], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                  )}
                  <motion.circle cx={x} cy={y} r={active === i ? 16 : 12}
                    fill={active === i ? '#fb923c' : '#38bdf8'}
                    stroke={active === i ? '#fdba74' : '#7dd3fc'}
                    strokeWidth="2"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
                    style={{ filter: active === i ? 'drop-shadow(0 0 8px #fb923c)' : 'drop-shadow(0 0 6px #38bdf8)' }}
                    whileHover={{ scale: 1.5 } as never} />
                  <motion.text x={x} y={y + 40} textAnchor="middle" fontSize="20"
                    fontWeight="bold" fill={active === i ? '#fb923c' : '#2fbdffff'}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    {milestones[i].year}
                  </motion.text>
                  <motion.text x={x} y={y + 64} textAnchor="middle" fontSize="20"
                    fill="#ffffffff"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    {milestones[i].label.length > 14 ? milestones[i].label.slice(0, 10) + '…' : milestones[i].label}
                  </motion.text>
                </g>
              ))}
            </svg>

            {/* Detail card "” positioned near clicked dot */}
            {(() => {
              const dots = [
                { x: 116,  y: 380 },
                { x: 350,  y: 256 },
                { x: 466,  y: 200 },
                { x: 700,  y: 184 },
                { x: 1050, y: 70  },
                { x: 1320, y: 16  },
              ]
              if (active === null) return null
              const dot = dots[active]
              // Convert SVG coords (viewBox 1400x440) to % of container
              const leftPct = (dot.x / 1400) * 100
              const topPct  = (dot.y / 440) * 100
              // Place above dot if enough room, else below
              const placeBelow = dot.y < 150
              return (
                <AnimatePresence>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'absolute',
                      left: `clamp(0px, calc(${leftPct}% - 140px), calc(100% - 280px))`,
                      top: placeBelow
                        ? `calc(${topPct}% + 100px)`
                        : `calc(${topPct}% - 180px)`,
                      width: 'min(280px, 85vw)',
                      background: 'rgba(5,8,30,0.6)',
                      border: '1px solid rgba(56,189,248,0.35)',
                      borderRadius: 12,
                      overflow: 'visible',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 -2px 12px rgba(56,189,248,0.15)',
                      backdropFilter: 'blur(10px)',
                      zIndex: 15,
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ height: 2, background: 'linear-gradient(90deg,#38bdf8,#fb923c)', borderRadius: '12px 12px 0 0' }} />
                    <div style={{ padding: '10px 14px 28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, padding: '1px 8px', borderRadius: 20, background: 'rgba(56,189,248,0.15)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)', whiteSpace: 'nowrap' }}>
                          {milestones[active].year}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{milestones[active].title}</span>
                      </div>
                      <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(56,189,248,0.25),transparent)', marginBottom: 7 }} />
                      <p style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{milestones[active].detail}</p>
                    </div>

                    {/* Speech bubble — sits above card, tail points toward mascot */}
                    {(() => {
                      const quips: { icon: React.ReactNode; text: string }[] = [
                        {
                          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>,
                          text: 'Hello World!',
                        },
                        {
                          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
                          text: 'Degree unlocked!',
                        },
                        {
                          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
                          text: 'Data never lies.',
                        },
                        {
                          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                          text: 'Full-stack mode.',
                        },
                        {
                          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                          text: 'Senior level.',
                        },
                        {
                          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L8.5 8.5 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21 17 14.14l5-4.87-6.5-.77z"/><circle cx="12" cy="12" r="3" fill="#38bdf8" fillOpacity="0.3"/></svg>,
                          text: 'Building the future.',
                        },
                      ]
                      return (
                        <motion.div
                          key={`bubble-${active}`}
                          initial={{ opacity: 0, scale: 0.6, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
                          style={{
                            position: 'absolute',
                            top: -52,
                            right: 10,
                            zIndex: 16,
                            pointerEvents: 'none',
                          }}
                        >
                          {/* bubble body */}
                          <div style={{
                            background: 'rgba(5,8,30,0.92)',
                            border: '1px solid rgba(56,189,248,0.5)',
                            borderRadius: 10,
                            padding: '5px 10px',
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#e2e8f0',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 12px rgba(56,189,248,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}>
                            {quips[active ?? 0].icon}
                            {quips[active ?? 0].text}
                          </div>
                          {/* tail pointing down-right toward mascot mouth */}
                          <svg width="20" height="12" viewBox="0 0 20 12" style={{ position: 'absolute', bottom: -11, right: 18 }}>
                            <path d="M0 0 L20 0 L14 12 Z" fill="rgba(5,8,30,0.92)"/>
                            <path d="M0 0 L14 12" stroke="rgba(56,189,248,0.5)" strokeWidth="1" fill="none"/>
                            <path d="M20 0 L14 12" stroke="rgba(56,189,248,0.5)" strokeWidth="1" fill="none"/>
                          </svg>
                        </motion.div>
                      )
                    })()}

                    {/* Mascot "” peeking over top-right corner of card, evolves per milestone */}
                    <motion.div
                      key={`mascot-${active}`}
                      initial={{ y: 40, opacity: 0, scale: 0.7, rotate: -15 }}
                      animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 16 }}
                      style={{
                        position: 'absolute',
                        top: -80,
                        right: -70,
                        width: 130,
                        height: 140,
                        zIndex: 8,
                        pointerEvents: 'none',
                      }}
                    >
                      {/* â”€â”€ 2016: Curious Kid "” messy hair, toy laptop, wide eyes â”€â”€ */}
                      {active === 0 && <svg viewBox="0 0 130 140" width="130" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="65" cy="136" rx="24" ry="5" fill="rgba(0,0,0,0.2)"/>
                        {/* body - red tee */}
                        <path d="M42 110 Q42 92 65 92 Q88 92 88 110 L88 140 L42 140 Z" fill="#ef4444"/>
                        <path d="M55 92 Q65 99 75 92" stroke="#b91c1c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        {/* neck */}
                        <rect x="57" y="83" width="16" height="12" rx="5" fill="#fcd34d"/>
                        {/* head - rounder/younger */}
                        <ellipse cx="65" cy="62" rx="28" ry="30" fill="#fcd34d"/>
                        {/* ears */}
                        <ellipse cx="37" cy="64" rx="5" ry="7" fill="#fcd34d"/><ellipse cx="37" cy="64" rx="3" ry="4.5" fill="#fbbf24"/>
                        <ellipse cx="93" cy="64" rx="5" ry="7" fill="#fcd34d"/><ellipse cx="93" cy="64" rx="3" ry="4.5" fill="#fbbf24"/>
                        {/* messy hair */}
                        <ellipse cx="65" cy="34" rx="27" ry="16" fill="#92400e"/>
                        <path d="M38 42 Q34 28 42 22 Q50 16 58 24" fill="#92400e"/>
                        <path d="M92 42 Q96 28 88 22 Q80 16 72 24" fill="#92400e"/>
                        <path d="M55 20 Q60 12 68 18 Q72 10 78 16" stroke="#92400e" strokeWidth="5" fill="none" strokeLinecap="round"/>
                        <path d="M45 26 Q42 18 50 16" stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round"/>
                        {/* big curious eyes */}
                        <ellipse cx="54" cy="60" rx="9" ry="10" fill="white"/>
                        <ellipse cx="76" cy="60" rx="9" ry="10" fill="white"/>
                        <circle cx="55" cy="61" r="6" fill="#1d4ed8"/>
                        <circle cx="77" cy="61" r="6" fill="#1d4ed8"/>
                        <circle cx="56" cy="62" r="3" fill="#0f172a"/>
                        <circle cx="78" cy="62" r="3" fill="#0f172a"/>
                        <circle cx="57.5" cy="59.5" r="1.5" fill="white"/>
                        <circle cx="79.5" cy="59.5" r="1.5" fill="white"/>
                        {/* eyebrows raised - curious */}
                        <path d="M46 48 Q54 43 62 48" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                        <path d="M68 48 Q76 43 84 48" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                        {/* nose */}
                        <ellipse cx="65" cy="70" rx="3.5" ry="2.5" fill="#f59e0b" opacity="0.6"/>
                        {/* open excited mouth */}
                        <path d="M54 78 Q65 88 76 78" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <ellipse cx="65" cy="81" rx="7" ry="4" fill="white" opacity="0.8"/>
                        {/* cheeks */}
                        <ellipse cx="46" cy="72" rx="7" ry="5" fill="#fca5a5" opacity="0.5"/>
                        <ellipse cx="84" cy="72" rx="7" ry="5" fill="#fca5a5" opacity="0.5"/>
                        {/* right arm holding toy laptop */}
                        <path d="M86 106 Q102 100 106 88" stroke="#fcd34d" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        {/* toy laptop */}
                        <rect x="100" y="72" width="24" height="16" rx="3" fill="#3b82f6"/>
                        <rect x="102" y="74" width="20" height="11" rx="1" fill="#93c5fd"/>
                        <rect x="97" y="88" width="30" height="4" rx="2" fill="#2563eb"/>
                        {/* screen glow */}
                        <rect x="104" y="76" width="6" height="4" rx="1" fill="#fbbf24" opacity="0.8"/>
                        <rect x="112" y="76" width="8" height="2" rx="1" fill="white" opacity="0.5"/>
                        <rect x="112" y="80" width="6" height="2" rx="1" fill="white" opacity="0.3"/>
                        {/* left arm waving */}
                        <g style={{transformOrigin:'44px 100px', animation:'mascotWave 0.9s ease-in-out infinite alternate'}}>
                          <path d="M44 106 Q28 96 22 80" stroke="#fcd34d" strokeWidth="9" strokeLinecap="round" fill="none"/>
                          <circle cx="20" cy="76" r="8" fill="#fcd34d"/>
                          <circle cx="12" cy="70" r="4.5" fill="#fcd34d"/>
                          <circle cx="14" cy="63" r="4" fill="#fcd34d"/>
                          <circle cx="21" cy="61" r="4" fill="#fcd34d"/>
                          <circle cx="28" cy="64" r="4" fill="#fcd34d"/>
                        </g>
                      </svg>}
                      {/* â”€â”€ 2019: CS Student "” graduation cap, backpack, books â”€â”€ */}
                      {active === 1 && <svg viewBox="0 0 130 140" width="130" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="65" cy="136" rx="24" ry="5" fill="rgba(0,0,0,0.2)"/>
                        {/* body - university hoodie */}
                        <path d="M42 110 Q42 92 65 92 Q88 92 88 110 L88 140 L42 140 Z" fill="#4f46e5"/>
                        <path d="M55 92 Q65 99 75 92" stroke="#3730a3" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        {/* hoodie pocket */}
                        <rect x="52" y="108" width="26" height="14" rx="4" fill="#3730a3" opacity="0.6"/>
                        {/* neck */}
                        <rect x="57" y="83" width="16" height="12" rx="5" fill="#fb923c"/>
                        {/* head */}
                        <ellipse cx="65" cy="62" rx="27" ry="28" fill="#fb923c"/>
                        {/* ears */}
                        <ellipse cx="38" cy="64" rx="5" ry="7" fill="#fb923c"/><ellipse cx="38" cy="64" rx="3" ry="4.5" fill="#f97316"/>
                        <ellipse cx="92" cy="64" rx="5" ry="7" fill="#fb923c"/><ellipse cx="92" cy="64" rx="3" ry="4.5" fill="#f97316"/>
                        {/* graduation cap */}
                        <ellipse cx="65" cy="36" rx="28" ry="8" fill="#1e1b4b"/>
                        <rect x="37" y="28" width="56" height="8" rx="2" fill="#1e1b4b"/>
                        {/* cap top board */}
                        <rect x="42" y="20" width="46" height="10" rx="2" fill="#312e81"/>
                        {/* tassel */}
                        <line x1="88" y1="24" x2="96" y2="38" stroke="#fbbf24" strokeWidth="2"/>
                        <circle cx="96" cy="40" r="3" fill="#fbbf24"/>
                        <line x1="96" y1="43" x2="93" y2="52" stroke="#fbbf24" strokeWidth="1.5"/>
                        <line x1="96" y1="43" x2="96" y2="53" stroke="#fbbf24" strokeWidth="1.5"/>
                        <line x1="96" y1="43" x2="99" y2="52" stroke="#fbbf24" strokeWidth="1.5"/>
                        {/* hair under cap */}
                        <ellipse cx="65" cy="38" rx="24" ry="6" fill="#fbbf24"/>
                        {/* eyes - focused/determined */}
                        <ellipse cx="54" cy="60" rx="8" ry="8" fill="white"/>
                        <ellipse cx="76" cy="60" rx="8" ry="8" fill="white"/>
                        <circle cx="55" cy="61" r="5" fill="#7c3f00"/>
                        <circle cx="77" cy="61" r="5" fill="#7c3f00"/>
                        <circle cx="56" cy="62" r="2.5" fill="#0f172a"/>
                        <circle cx="78" cy="62" r="2.5" fill="#0f172a"/>
                        <circle cx="57" cy="59.5" r="1.2" fill="white"/>
                        <circle cx="79" cy="59.5" r="1.2" fill="white"/>
                        {/* eyebrows - determined */}
                        <path d="M47 50 Q54 46 61 50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M69 50 Q76 46 83 50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <ellipse cx="65" cy="70" rx="3" ry="2" fill="#f97316" opacity="0.6"/>
                        {/* proud smile */}
                        <path d="M54 77 Q65 86 76 77" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M57 78 Q65 84 73 78" fill="white" opacity="0.8"/>
                        <ellipse cx="46" cy="72" rx="6" ry="4" fill="#fca5a5" opacity="0.4"/>
                        <ellipse cx="84" cy="72" rx="6" ry="4" fill="#fca5a5" opacity="0.4"/>
                        {/* right arm holding stack of books */}
                        <path d="M86 106 Q100 98 102 86" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        <rect x="96" y="68" width="28" height="8" rx="2" fill="#ef4444"/>
                        <rect x="96" y="76" width="28" height="8" rx="2" fill="#3b82f6"/>
                        <rect x="96" y="84" width="28" height="8" rx="2" fill="#22c55e"/>
                        <line x1="100" y1="68" x2="100" y2="92" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
                        {/* left arm waving */}
                        <g style={{transformOrigin:'44px 100px', animation:'mascotWave 1.1s ease-in-out infinite alternate'}}>
                          <path d="M44 106 Q28 96 22 80" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                          <circle cx="20" cy="76" r="8" fill="#fb923c"/>
                          <circle cx="12" cy="70" r="4.5" fill="#fb923c"/>
                          <circle cx="14" cy="63" r="4" fill="#fb923c"/>
                          <circle cx="21" cy="61" r="4" fill="#fb923c"/>
                          <circle cx="28" cy="64" r="4" fill="#fb923c"/>
                        </g>
                      </svg>}
                      {/* â”€â”€ 2021: Data Scientist "” glasses, lab coat, chart â”€â”€ */}
                      {active === 2 && <svg viewBox="0 0 130 140" width="130" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="65" cy="136" rx="24" ry="5" fill="rgba(0,0,0,0.2)"/>
                        {/* lab coat */}
                        <path d="M40 110 Q40 90 65 90 Q90 90 90 110 L90 140 L40 140 Z" fill="#f1f5f9"/>
                        <path d="M65 90 L58 110 L65 108 L72 110 Z" fill="#e2e8f0"/>
                        <path d="M55 90 Q65 97 75 90" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        {/* coat lapels */}
                        <path d="M65 90 L52 106" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M65 90 L78 106" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"/>
                        {/* pocket with pen */}
                        <rect x="72" y="100" width="12" height="14" rx="2" fill="#e2e8f0"/>
                        <rect x="75" y="96" width="3" height="10" rx="1" fill="#3b82f6"/>
                        <rect x="79" y="96" width="3" height="10" rx="1" fill="#ef4444"/>
                        {/* neck */}
                        <rect x="57" y="81" width="16" height="12" rx="5" fill="#fb923c"/>
                        {/* head */}
                        <ellipse cx="65" cy="60" rx="27" ry="28" fill="#fb923c"/>
                        {/* ears */}
                        <ellipse cx="38" cy="62" rx="5" ry="7" fill="#fb923c"/><ellipse cx="38" cy="62" rx="3" ry="4.5" fill="#f97316"/>
                        <ellipse cx="92" cy="62" rx="5" ry="7" fill="#fb923c"/><ellipse cx="92" cy="62" rx="3" ry="4.5" fill="#f97316"/>
                        {/* hair - neat, short */}
                        <ellipse cx="65" cy="34" rx="26" ry="12" fill="#fbbf24"/>
                        <ellipse cx="40" cy="44" rx="7" ry="10" fill="#fbbf24"/>
                        <ellipse cx="90" cy="44" rx="7" ry="10" fill="#fbbf24"/>
                        {/* glasses frames */}
                        <rect x="43" y="54" width="20" height="14" rx="5" stroke="#1e293b" strokeWidth="2.5" fill="rgba(147,197,253,0.2)"/>
                        <rect x="67" y="54" width="20" height="14" rx="5" stroke="#1e293b" strokeWidth="2.5" fill="rgba(147,197,253,0.2)"/>
                        <line x1="63" y1="61" x2="67" y2="61" stroke="#1e293b" strokeWidth="2"/>
                        <line x1="43" y1="61" x2="38" y2="59" stroke="#1e293b" strokeWidth="2"/>
                        <line x1="87" y1="61" x2="92" y2="59" stroke="#1e293b" strokeWidth="2"/>
                        {/* eyes behind glasses */}
                        <circle cx="53" cy="61" r="4" fill="#7c3f00"/>
                        <circle cx="77" cy="61" r="4" fill="#7c3f00"/>
                        <circle cx="54" cy="62" r="2" fill="#0f172a"/>
                        <circle cx="78" cy="62" r="2" fill="#0f172a"/>
                        <circle cx="54.8" cy="60" r="1" fill="white"/>
                        <circle cx="78.8" cy="60" r="1" fill="white"/>
                        {/* eyebrows */}
                        <path d="M46 51 Q53 47 60 51" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M70 51 Q77 47 84 51" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <ellipse cx="65" cy="70" rx="3" ry="2" fill="#f97316" opacity="0.6"/>
                        {/* analytical slight smile */}
                        <path d="M56 77 Q65 83 74 77" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <ellipse cx="46" cy="72" rx="5" ry="3.5" fill="#fca5a5" opacity="0.35"/>
                        <ellipse cx="84" cy="72" rx="5" ry="3.5" fill="#fca5a5" opacity="0.35"/>
                        {/* right arm holding chart/clipboard */}
                        <path d="M88 104 Q104 96 106 82" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        {/* clipboard */}
                        <rect x="100" y="62" width="26" height="30" rx="3" fill="#fef3c7"/>
                        <rect x="108" y="58" width="10" height="8" rx="2" fill="#d97706"/>
                        {/* bar chart on clipboard */}
                        <rect x="104" y="80" width="4" height="8" rx="1" fill="#3b82f6"/>
                        <rect x="110" y="74" width="4" height="14" rx="1" fill="#22c55e"/>
                        <rect x="116" y="70" width="4" height="18" rx="1" fill="#f59e0b"/>
                        <line x1="102" y1="88" x2="122" y2="88" stroke="#94a3b8" strokeWidth="1"/>
                        {/* left arm waving */}
                        <g style={{transformOrigin:'42px 100px', animation:'mascotWave 1.3s ease-in-out infinite alternate'}}>
                          <path d="M42 106 Q26 96 20 80" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                          <circle cx="18" cy="76" r="8" fill="#fb923c"/>
                          <circle cx="10" cy="70" r="4.5" fill="#fb923c"/>
                          <circle cx="12" cy="63" r="4" fill="#fb923c"/>
                          <circle cx="19" cy="61" r="4" fill="#fb923c"/>
                          <circle cx="26" cy="64" r="4" fill="#fb923c"/>
                        </g>
                      </svg>}
                      {/* â”€â”€ 2024: Full-Stack Dev "” hoodie, headphones, coffee â”€â”€ */}
                      {active === 3 && <svg viewBox="0 0 130 140" width="130" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="65" cy="136" rx="24" ry="5" fill="rgba(0,0,0,0.2)"/>
                        {/* dark hoodie */}
                        <path d="M40 110 Q40 90 65 90 Q90 90 90 110 L90 140 L40 140 Z" fill="#1e293b"/>
                        <path d="M55 90 Q65 100 75 90 L72 110 L65 108 L58 110 Z" fill="#0f172a"/>
                        {/* hoodie strings */}
                        <line x1="62" y1="100" x2="60" y2="116" stroke="#475569" strokeWidth="1.5"/>
                        <line x1="68" y1="100" x2="70" y2="116" stroke="#475569" strokeWidth="1.5"/>
                        <circle cx="60" cy="117" r="2" fill="#64748b"/>
                        <circle cx="70" cy="117" r="2" fill="#64748b"/>
                        {/* neck */}
                        <rect x="57" y="81" width="16" height="12" rx="5" fill="#fb923c"/>
                        {/* head */}
                        <ellipse cx="65" cy="60" rx="27" ry="28" fill="#fb923c"/>
                        {/* ears */}
                        <ellipse cx="38" cy="62" rx="5" ry="7" fill="#fb923c"/><ellipse cx="38" cy="62" rx="3" ry="4.5" fill="#f97316"/>
                        <ellipse cx="92" cy="62" rx="5" ry="7" fill="#fb923c"/><ellipse cx="92" cy="62" rx="3" ry="4.5" fill="#f97316"/>
                        {/* headphones over-ear */}
                        <path d="M38 55 Q38 28 65 28 Q92 28 92 55" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round"/>
                        <rect x="32" y="52" width="12" height="18" rx="6" fill="#1e293b"/>
                        <rect x="86" y="52" width="12" height="18" rx="6" fill="#1e293b"/>
                        <rect x="34" y="54" width="8" height="14" rx="4" fill="#38bdf8"/>
                        <rect x="88" y="54" width="8" height="14" rx="4" fill="#38bdf8"/>
                        {/* hair */}
                        <ellipse cx="65" cy="36" rx="24" ry="10" fill="#fbbf24"/>
                        {/* eyes - focused/cool */}
                        <ellipse cx="54" cy="60" rx="8" ry="7.5" fill="white"/>
                        <ellipse cx="76" cy="60" rx="8" ry="7.5" fill="white"/>
                        <circle cx="55" cy="61" r="5" fill="#1e40af"/>
                        <circle cx="77" cy="61" r="5" fill="#1e40af"/>
                        <circle cx="56" cy="62" r="2.5" fill="#0f172a"/>
                        <circle cx="78" cy="62" r="2.5" fill="#0f172a"/>
                        <circle cx="57" cy="59.5" r="1.2" fill="white"/>
                        <circle cx="79" cy="59.5" r="1.2" fill="white"/>
                        {/* eyebrows - cool/relaxed */}
                        <path d="M47 50 Q54 47 61 50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M69 50 Q76 47 83 50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <ellipse cx="65" cy="70" rx="3" ry="2" fill="#f97316" opacity="0.6"/>
                        {/* confident smirk */}
                        <path d="M56 77 Q65 84 74 77" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M59 78 Q65 83 71 78" fill="white" opacity="0.8"/>
                        <ellipse cx="46" cy="72" rx="5" ry="3.5" fill="#fca5a5" opacity="0.35"/>
                        <ellipse cx="84" cy="72" rx="5" ry="3.5" fill="#fca5a5" opacity="0.35"/>
                        {/* right arm holding coffee cup */}
                        <path d="M88 104 Q104 96 106 84" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        {/* coffee cup */}
                        <path d="M100 68 L104 92 L120 92 L124 68 Z" fill="#f97316"/>
                        <rect x="100" y="66" width="24" height="6" rx="2" fill="#ea580c"/>
                        {/* cup sleeve */}
                        <rect x="101" y="74" width="22" height="10" rx="1" fill="#7c2d12"/>
                        {/* steam */}
                        <path d="M108 62 Q106 56 108 50" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M112 60 Q114 54 112 48" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M116 62 Q114 56 116 50" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        {/* left arm waving */}
                        <g style={{transformOrigin:'42px 100px', animation:'mascotWave 0.8s ease-in-out infinite alternate'}}>
                          <path d="M42 106 Q26 96 20 80" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                          <circle cx="18" cy="76" r="8" fill="#fb923c"/>
                          <circle cx="10" cy="70" r="4.5" fill="#fb923c"/>
                          <circle cx="12" cy="63" r="4" fill="#fb923c"/>
                          <circle cx="19" cy="61" r="4" fill="#fb923c"/>
                          <circle cx="26" cy="64" r="4" fill="#fb923c"/>
                        </g>
                      </svg>}
                      {/* â”€â”€ 2025: Senior Engineer "” sharp suit jacket, confident â”€â”€ */}
                      {active === 4 && <svg viewBox="0 0 130 140" width="130" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="65" cy="136" rx="24" ry="5" fill="rgba(0,0,0,0.2)"/>
                        {/* suit jacket */}
                        <path d="M38 110 Q38 88 65 88 Q92 88 92 110 L92 140 L38 140 Z" fill="#1e3a5f"/>
                        {/* shirt underneath */}
                        <path d="M58 88 L65 96 L72 88 L72 140 L58 140 Z" fill="#f8fafc"/>
                        {/* tie */}
                        <path d="M65 92 L62 104 L65 108 L68 104 Z" fill="#dc2626"/>
                        <path d="M63 90 L65 94 L67 90 Z" fill="#b91c1c"/>
                        {/* lapels */}
                        <path d="M58 88 L44 106" stroke="#1e3a5f" strokeWidth="1" fill="#2d5a8e"/>
                        <path d="M72 88 L86 106" stroke="#1e3a5f" strokeWidth="1" fill="#2d5a8e"/>
                        <path d="M44 88 L58 88 L52 106 Z" fill="#2d5a8e"/>
                        <path d="M86 88 L72 88 L78 106 Z" fill="#2d5a8e"/>
                        {/* pocket square */}
                        <path d="M78 96 L84 96 L82 102 L76 102 Z" fill="#f8fafc" opacity="0.9"/>
                        {/* neck */}
                        <rect x="57" y="79" width="16" height="12" rx="5" fill="#fb923c"/>
                        {/* head - slightly more mature */}
                        <ellipse cx="65" cy="58" rx="27" ry="27" fill="#fb923c"/>
                        {/* ears */}
                        <ellipse cx="38" cy="60" rx="5" ry="7" fill="#fb923c"/><ellipse cx="38" cy="60" rx="3" ry="4.5" fill="#f97316"/>
                        <ellipse cx="92" cy="60" rx="5" ry="7" fill="#fb923c"/><ellipse cx="92" cy="60" rx="3" ry="4.5" fill="#f97316"/>
                        {/* neat styled hair */}
                        <ellipse cx="65" cy="33" rx="26" ry="11" fill="#fbbf24"/>
                        <ellipse cx="40" cy="42" rx="7" ry="9" fill="#fbbf24"/>
                        <ellipse cx="90" cy="42" rx="7" ry="9" fill="#fbbf24"/>
                        {/* side part */}
                        <path d="M50 28 Q55 24 65 26" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                        {/* eyes - sharp/confident */}
                        <ellipse cx="54" cy="58" rx="8" ry="7.5" fill="white"/>
                        <ellipse cx="76" cy="58" rx="8" ry="7.5" fill="white"/>
                        <circle cx="55" cy="59" r="5" fill="#7c3f00"/>
                        <circle cx="77" cy="59" r="5" fill="#7c3f00"/>
                        <circle cx="56" cy="60" r="2.5" fill="#0f172a"/>
                        <circle cx="78" cy="60" r="2.5" fill="#0f172a"/>
                        <circle cx="57" cy="57.5" r="1.2" fill="white"/>
                        <circle cx="79" cy="57.5" r="1.2" fill="white"/>
                        {/* eyebrows - sharp/confident */}
                        <path d="M47 48 Q54 44 61 48" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                        <path d="M69 48 Q76 44 83 48" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                        <ellipse cx="65" cy="68" rx="3" ry="2" fill="#f97316" opacity="0.6"/>
                        {/* confident smile */}
                        <path d="M55 75 Q65 83 75 75" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M58 76 Q65 82 72 76" fill="white" opacity="0.85"/>
                        <ellipse cx="46" cy="70" rx="5" ry="3.5" fill="#fca5a5" opacity="0.3"/>
                        <ellipse cx="84" cy="70" rx="5" ry="3.5" fill="#fca5a5" opacity="0.3"/>
                        {/* right arm - hand resting on card edge */}
                        <path d="M90 102 Q108 96 112 84" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        <circle cx="113" cy="81" r="8" fill="#fb923c"/>
                        <circle cx="121" cy="76" r="4.5" fill="#fb923c"/>
                        <circle cx="120" cy="69" r="4" fill="#fb923c"/>
                        <circle cx="114" cy="67" r="4" fill="#fb923c"/>
                        <circle cx="108" cy="70" r="4" fill="#fb923c"/>
                        {/* left arm waving */}
                        <g style={{transformOrigin:'40px 98px', animation:'mascotWave 1.0s ease-in-out infinite alternate'}}>
                          <path d="M40 104 Q24 94 18 78" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                          <circle cx="16" cy="74" r="8" fill="#fb923c"/>
                          <circle cx="8" cy="68" r="4.5" fill="#fb923c"/>
                          <circle cx="10" cy="61" r="4" fill="#fb923c"/>
                          <circle cx="17" cy="59" r="4" fill="#fb923c"/>
                          <circle cx="24" cy="62" r="4" fill="#fb923c"/>
                        </g>
                      </svg>}
                      {/* â”€â”€ 2026: Visionary "” glowing aura, futuristic, rocket â”€â”€ */}
                      {active === 5 && <svg viewBox="0 0 130 140" width="130" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="65" cy="136" rx="24" ry="5" fill="rgba(0,0,0,0.2)"/>
                        {/* aura glow rings */}
                        <circle cx="65" cy="65" r="58" stroke="rgba(56,189,248,0.12)" strokeWidth="3"/>
                        <circle cx="65" cy="65" r="50" stroke="rgba(56,189,248,0.18)" strokeWidth="2"/>
                        <circle cx="65" cy="65" r="42" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5"/>
                        {/* futuristic suit */}
                        <path d="M38 110 Q38 88 65 88 Q92 88 92 110 L92 140 L38 140 Z" fill="#0f172a"/>
                        {/* suit tech lines */}
                        <path d="M55 90 Q65 100 75 90 L72 110 L65 108 L58 110 Z" fill="#1e293b"/>
                        <line x1="65" y1="100" x2="65" y2="130" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5"/>
                        <line x1="50" y1="108" x2="80" y2="108" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
                        <line x1="46" y1="118" x2="84" y2="118" stroke="rgba(56,189,248,0.2)" strokeWidth="1"/>
                        {/* glowing chest arc reactor */}
                        <circle cx="65" cy="104" r="6" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="1.5"/>
                        <circle cx="65" cy="104" r="3" fill="#38bdf8"/>
                        {/* neck */}
                        <rect x="57" y="79" width="16" height="12" rx="5" fill="#fb923c"/>
                        {/* head */}
                        <ellipse cx="65" cy="58" rx="27" ry="27" fill="#fb923c"/>
                        {/* ears */}
                        <ellipse cx="38" cy="60" rx="5" ry="7" fill="#fb923c"/><ellipse cx="38" cy="60" rx="3" ry="4.5" fill="#f97316"/>
                        <ellipse cx="92" cy="60" rx="5" ry="7" fill="#fb923c"/><ellipse cx="92" cy="60" rx="3" ry="4.5" fill="#f97316"/>
                        {/* hair - sleek */}
                        <ellipse cx="65" cy="33" rx="26" ry="11" fill="#fbbf24"/>
                        <ellipse cx="40" cy="42" rx="7" ry="9" fill="#fbbf24"/>
                        <ellipse cx="90" cy="42" rx="7" ry="9" fill="#fbbf24"/>
                        <ellipse cx="58" cy="28" rx="10" ry="4" fill="#fde68a" opacity="0.5"/>
                        {/* glowing eyes */}
                        <ellipse cx="54" cy="58" rx="8" ry="7.5" fill="white"/>
                        <ellipse cx="76" cy="58" rx="8" ry="7.5" fill="white"/>
                        <circle cx="55" cy="59" r="5.5" fill="#0ea5e9"/>
                        <circle cx="77" cy="59" r="5.5" fill="#0ea5e9"/>
                        <circle cx="56" cy="60" r="2.8" fill="#0f172a"/>
                        <circle cx="78" cy="60" r="2.8" fill="#0f172a"/>
                        <circle cx="57.2" cy="57.5" r="1.5" fill="white"/>
                        <circle cx="79.2" cy="57.5" r="1.5" fill="white"/>
                        {/* eye glow */}
                        <ellipse cx="55" cy="59" rx="6" ry="5.5" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1"/>
                        <ellipse cx="77" cy="59" rx="6" ry="5.5" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1"/>
                        {/* eyebrows - visionary/raised */}
                        <path d="M46 46 Q54 41 62 46" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                        <path d="M68 46 Q76 41 84 46" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                        <ellipse cx="65" cy="68" rx="3" ry="2" fill="#f97316" opacity="0.6"/>
                        {/* visionary smile */}
                        <path d="M54 75 Q65 84 76 75" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <path d="M57 76 Q65 83 73 76" fill="white" opacity="0.9"/>
                        <ellipse cx="46" cy="70" rx="5" ry="3.5" fill="#7dd3fc" opacity="0.4"/>
                        <ellipse cx="84" cy="70" rx="5" ry="3.5" fill="#7dd3fc" opacity="0.4"/>
                        {/* right arm holding rocket */}
                        <path d="M90 102 Q106 94 108 80" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        {/* rocket */}
                        <path d="M112 42 Q118 36 124 42 L122 70 L114 70 Z" fill="#e2e8f0"/>
                        <ellipse cx="118" cy="42" rx="6" ry="8" fill="#94a3b8"/>
                        <path d="M114 68 L110 76 L114 74 Z" fill="#ef4444"/>
                        <path d="M122 68 L126 76 L122 74 Z" fill="#ef4444"/>
                        <circle cx="118" cy="56" rx="4" ry="4" fill="#38bdf8" stroke="#0ea5e9" strokeWidth="1"/>
                        {/* rocket flame */}
                        <path d="M114 74 Q118 84 122 74" fill="#fb923c" opacity="0.9"/>
                        <path d="M115 76 Q118 88 121 76" fill="#fbbf24" opacity="0.7"/>
                        {/* stars around */}
                        <circle cx="20" cy="30" r="1.5" fill="#fbbf24" opacity="0.8"/>
                        <circle cx="110" cy="20" r="2" fill="#38bdf8" opacity="0.8"/>
                        <circle cx="15" cy="80" r="1.5" fill="#a78bfa" opacity="0.7"/>
                        <circle cx="118" cy="110" r="1.5" fill="#fbbf24" opacity="0.6"/>
                        {/* left arm waving with energy */}
                        <g style={{transformOrigin:'40px 98px', animation:'mascotWave 0.7s ease-in-out infinite alternate'}}>
                          <path d="M40 104 Q22 92 16 74" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none"/>
                          <circle cx="14" cy="70" r="8" fill="#fb923c"/>
                          <circle cx="6" cy="64" r="4.5" fill="#fb923c"/>
                          <circle cx="8" cy="57" r="4" fill="#fb923c"/>
                          <circle cx="15" cy="55" r="4" fill="#fb923c"/>
                          <circle cx="22" cy="58" r="4" fill="#fb923c"/>
                          {/* energy sparks */}
                          <circle cx="4" cy="58" r="2" fill="#38bdf8" opacity="0.8"/>
                          <circle cx="8" cy="50" r="1.5" fill="#fbbf24" opacity="0.8"/>
                          <circle cx="2" cy="66" r="1.5" fill="#a78bfa" opacity="0.8"/>
                        </g>
                      </svg>}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              )
            })()}
          </div>
          </div>{/* end career line */}

          {/* Profile photo "” right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center items-start"
            style={{ marginTop: '-120px' }}
          >
            <div className="relative photo-border-glow">
              {/* glow behind photo */}
              <div style={{
                position: 'absolute', inset: -16, borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(56,189,248,0.25) 0%, rgba(251,146,60,0.15) 50%, transparent 75%)',
                filter: 'blur(20px)',
                zIndex: 0,
              }} />
              {/* <img
                src="/selfie/Alejandro1.png"
                alt="Alejandro"
                style={{ width: '420px', objectFit: 'cover' }}
              /> */}
            </div>
          </motion.div>

        </div>{/* end flex items-start */}

        {/* Projects Dashboard + Approach row */}
        <div className="projects-row mt-24 flex items-start gap-10">

        {/* Projects Dashboard */}
        <div className="projects-dash" style={{ width: '40vw' }}>
          <h2 className="text-white font-bold text-3xl mb-20 flex items-center gap-3">
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, #fb923c)' }} />
            Projects Dashboard
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #fb923c, #38bdf8, transparent)' }} />
          </h2>
          <div className="grid grid-cols-2 gap-7">

            {/* Card 1 "” LLM System */}
            <motion.div
              onClick={() => setLlmOpen(true)}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer relative overflow-hidden"
              style={{
                background: 'rgba(56,189,248,0.04)',
                border: '1px solid rgba(56,189,248,0.85)',
                borderRadius: '1rem',
                backdropFilter: 'blur(4px)',
                animation: 'card-pulse-blue 2.5s ease-in-out infinite',
                padding: '1.5rem',
              }}
            >
              {/* shimmer sweep */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.12), transparent)',
                animation: 'shimmer 2.8s linear infinite',
                pointerEvents: 'none',
              }} />
              {/* click hint */}
              <div className="click-hint absolute top-3 right-3 text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(56,189,248,0.7)' }}>
                Click to explore ›
              </div>
              <p className="text-white font-extrabold text-xl mb-1" style={{ textShadow: '0 0 12px rgba(56,189,248,0.6)' }}>
                ML & AI Systems
              </p>
              <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(90deg, #38bdf8, transparent)' }} />
              <p className="text-white text-2xl font-extrabold" style={{ textShadow: '0 0 8px rgba(56,189,248,0.5)' }}>
                12+ <span className="text-slate-400 text-sm font-normal">ML Models Deployed</span>
              </p>
              <p className="text-white text-2xl font-extrabold mt-2" style={{ textShadow: '0 0 8px rgba(56,189,248,0.5)' }}>
                50K+ <span className="text-slate-400 text-sm font-normal">Users Supported</span>
              </p>
              {/* bottom glow bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }} />
            </motion.div>

            {/* Card 2 "” AI Chatbots */}
            <motion.div
              onClick={() => setChatbotOpen(true)}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer relative overflow-hidden"
              style={{
                background: 'rgba(251,146,60,0.04)',
                border: '1px solid rgba(251,146,60,0.85)',
                borderRadius: '1rem',
                backdropFilter: 'blur(4px)',
                animation: 'card-pulse-orange 2.5s ease-in-out infinite',
                padding: '1.5rem',
              }}
            >
              {/* shimmer sweep */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.12), transparent)',
                animation: 'shimmer 2.8s linear infinite',
                animationDelay: '1.4s',
                pointerEvents: 'none',
              }} />
              {/* click hint */}
              <div className="click-hint absolute top-3 right-3 text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(251,146,60,0.7)' }}>
                Click to explore ›
              </div>
              <p className="text-white font-extrabold text-xl mb-1" style={{ textShadow: '0 0 12px rgba(251,146,60,0.6)' }}>
                Full-Stack & Cloud
              </p>
              <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(90deg, #fb923c, transparent)' }} />
              <p className="text-orange-400 text-2xl font-extrabold" style={{ textShadow: '0 0 8px rgba(251,146,60,0.5)' }}>
                78K+ <span className="text-slate-400 text-sm font-normal">Daily Requests Handled</span>
              </p>
              <p className="text-orange-400 text-2xl font-extrabold mt-2" style={{ textShadow: '0 0 8px rgba(251,146,60,0.5)' }}>
                30% <span className="text-slate-400 text-sm font-normal">Workflow Efficiency Gain</span>
              </p>
              {/* bottom glow bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #fb923c, transparent)' }} />
            </motion.div>

          </div>
        </div>{/* end Projects Dashboard */}

        {/* My Approach to Development */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="approach-section flex-1 relative"
          style={{ marginTop: '0', paddingLeft: '50px', background: 'transparent' }}
        >
          <h2 className="text-white font-bold text-3xl mb-4 flex items-center gap-3">
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, #fb923c)' }} />
            My Approach to Development
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #fb923c, #38bdf8, transparent)' }} />
          </h2>

          {/* Carousel */}
          <div className="carousel-wrap relative flex items-center" style={{ marginTop: '82px', minHeight: '160px' }}>
            {/* Prev arrow */}
            <motion.button
              whileHover={{ scale: 1.2, x: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setApproachIndex(i => (i - 1 + approaches.length) % approaches.length)}
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 44, height: 44,
                background: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.5)',
                boxShadow: '0 0 12px rgba(56,189,248,0.4)',
                color: '#38bdf8',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ‹
            </motion.button>
            <div className="flex-1 px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={approachIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="approach-text leading-relaxed text-3xl"
                  style={{
                    fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 500,
                    paddingLeft: '30px',
                    textAlign: 'center',
                    color: '#f1f5f9',
                    textShadow: '0 0 20px rgba(56,189,248,0.4), 0 2px 4px rgba(0,0,0,0.8)',
                    letterSpacing: '0.02em',
                    lineHeight: '1.6',
                    fontSize: 'clamp(1rem, 2.5vw, 1.875rem)',
                  }}
                >
                  {approaches[approachIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Next arrow */}
            <motion.button
              whileHover={{ scale: 1.2, x: 3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setApproachIndex(i => (i + 1) % approaches.length)}
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 44, height: 44,
                background: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.5)',
                boxShadow: '0 0 12px rgba(56,189,248,0.4)',
                color: '#38bdf8',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ›
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {approaches.map((_, i) => (
              <button
                key={i}
                onClick={() => setApproachIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: approachIndex === i ? 20 : 8,
                  height: 8,
                  background: approachIndex === i ? '#38bdf8' : 'rgba(56,189,248,0.3)',
                  boxShadow: approachIndex === i ? '0 0 8px rgba(56,189,248,0.8)' : 'none',
                }}
              />
            ))}
          </div>
        </motion.div>

        </div>{/* end Projects Dashboard + Approach row */}

        {/* My Skills & Tools */}
        <div className="skills-section mt-20" style={{ width: '90vw', marginTop: '220px'}}>
          <h2 className="text-white font-bold text-3xl mb-8 flex items-center gap-3">
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, #fb923c)' }} />
            My Skills &amp; Tools
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #fb923c, #38bdf8, transparent)' }} />
          </h2>

          <div className="skills-grid grid grid-cols-4 gap-5" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              {
                title: 'AI Engineer',
                sub: 'LLMs, NLP, ML Models',
                color: '#38bdf8',
                icon: (
                  <svg viewBox="0 0 80 80" width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* 4 arms */}
                    <line x1="40" y1="40" x2="40" y2="10" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    <line x1="40" y1="40" x2="40" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    <line x1="40" y1="40" x2="10" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    <line x1="40" y1="40" x2="70" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    {/* End dots */}
                    <circle cx="40" cy="10" r="3" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }}/>
                    <circle cx="40" cy="70" r="3" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }}/>
                    <circle cx="10" cy="40" r="3" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }}/>
                    <circle cx="70" cy="40" r="3" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }}/>
                    {/* Outer ring */}
                    <circle cx="40" cy="40" r="14" stroke="#38bdf8" strokeWidth="1.2" opacity="0.4"/>
                    {/* Inner ring */}
                    <circle cx="40" cy="40" r="8" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7"/>
                    {/* Center core */}
                    <circle cx="40" cy="40" r="4" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }}/>
                    {/* Struggling flow dots "” top arm */}
                    <circle r="2.5" fill="#7dd3fc" opacity="0.9" style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }}>
                      <animateMotion dur="1.6s" repeatCount="indefinite" path="M40,10 L40,26"/>
                    </circle>
                    {/* Struggling flow dots "” bottom arm */}
                    <circle r="2.5" fill="#7dd3fc" opacity="0.9" style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }}>
                      <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.4s" path="M40,70 L40,54"/>
                    </circle>
                    {/* Struggling flow dots "” left arm */}
                    <circle r="2.5" fill="#7dd3fc" opacity="0.9" style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }}>
                      <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.8s" path="M10,40 L26,40"/>
                    </circle>
                    {/* Struggling flow dots "” right arm */}
                    <circle r="2.5" fill="#7dd3fc" opacity="0.9" style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }}>
                      <animateMotion dur="1.6s" repeatCount="indefinite" begin="1.2s" path="M70,40 L54,40"/>
                    </circle>
                  </svg>
                ),
              },
              {
                title: 'Full Stack Developer',
                sub: 'React, Next.js, Node.js',
                color: '#818cf8',
                icon: (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {/* Browser mockup */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <svg viewBox="0 0 80 52" width="80" height="52" fill="none">
                        <rect x="1" y="1" width="78" height="50" rx="5" stroke="#818cf8" strokeWidth="1.2" opacity="0.6"/>
                        <line x1="1" y1="12" x2="79" y2="12" stroke="#818cf8" strokeWidth="1" opacity="0.4"/>
                        <circle cx="8" cy="6.5" r="2" fill="#f43f5e" opacity="0.8"/>
                        <circle cx="15" cy="6.5" r="2" fill="#fb923c" opacity="0.8"/>
                        <circle cx="22" cy="6.5" r="2" fill="#4ade80" opacity="0.8"/>
                        <rect x="10" y="18" width="35" height="3" rx="1.5" fill="#818cf8" opacity="0.5"/>
                        <rect x="10" y="25" width="50" height="3" rx="1.5" fill="#818cf8" opacity="0.35"/>
                        <rect x="10" y="32" width="28" height="3" rx="1.5" fill="#818cf8" opacity="0.25"/>
                        <rect x="10" y="39" width="42" height="3" rx="1.5" fill="#818cf8" opacity="0.2"/>
                      </svg>
                    </div>
                    {/* Divider */}
                    <div style={{ height: 1, background: 'rgba(129,140,248,0.3)', margin: '0 4px' }} />
                    {/* Tech logos row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '2px 4px' }}>
                      {/* React */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#38bdf8" strokeWidth="1.2"/>
                          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#38bdf8" strokeWidth="1.2" transform="rotate(60 12 12)"/>
                          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#38bdf8" strokeWidth="1.2" transform="rotate(120 12 12)"/>
                          <circle cx="12" cy="12" r="2" fill="#38bdf8"/>
                        </svg>
                        <span style={{ fontSize: 9, color: '#38bdf8', fontWeight: 600 }}>React</span>
                      </div>
                      <div style={{ width: 1, height: 28, background: 'rgba(129,140,248,0.3)' }} />
                      {/* Next.js */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                          <rect x="2" y="2" width="20" height="20" rx="4" stroke="#e2e8f0" strokeWidth="1.2"/>
                          <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e2e8f0" fontFamily="monospace">N</text>
                        </svg>
                        <span style={{ fontSize: 9, color: '#e2e8f0', fontWeight: 600 }}>Next.js</span>
                      </div>
                      <div style={{ width: 1, height: 28, background: 'rgba(129,140,248,0.3)' }} />
                      {/* Node.js */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                          <path d="M12 2L3 7v10l9 5 9-5V7z" stroke="#4ade80" strokeWidth="1.2"/>
                          <text x="12" y="15" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#4ade80" fontFamily="monospace">node</text>
                        </svg>
                        <span style={{ fontSize: 9, color: '#4ade80', fontWeight: 600 }}>Node.js</span>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: 'System Architect',
                sub: 'Scalable Back End Solutions',
                color: '#fb923c',
                icon: (
                  <svg viewBox="0 0 64 48" width="64" height="48" fill="none">
                    <circle cx="32" cy="8" r="5" stroke="#fb923c" strokeWidth="1.5" opacity="0.8"/>
                    <circle cx="10" cy="38" r="5" stroke="#fb923c" strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="32" cy="38" r="5" stroke="#fb923c" strokeWidth="1.5" opacity="0.6"/>
                    <circle cx="54" cy="38" r="5" stroke="#fb923c" strokeWidth="1.5" opacity="0.6"/>
                    <line x1="32" y1="13" x2="10" y2="33" stroke="#fb923c" strokeWidth="1.2" opacity="0.4"/>
                    <line x1="32" y1="13" x2="32" y2="33" stroke="#fb923c" strokeWidth="1.2" opacity="0.4"/>
                    <line x1="32" y1="13" x2="54" y2="33" stroke="#fb923c" strokeWidth="1.2" opacity="0.4"/>
                  </svg>
                ),
              },
              {
                title: 'Team Leader',
                sub: 'Guide & Grow Dev Teams',
                titleSuffix: '& Mentor',
                color: '#a78bfa',
                icon: (
                  <svg viewBox="0 0 64 48" width="64" height="48" fill="none">
                    <circle cx="20" cy="16" r="8" stroke="#a78bfa" strokeWidth="1.5" opacity="0.7"/>
                    <path d="M4 44c0-8.837 7.163-16 16-16" stroke="#a78bfa" strokeWidth="1.5" opacity="0.5"/>
                    <rect x="38" y="20" width="22" height="16" rx="3" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6"/>
                    <line x1="43" y1="27" x2="55" y2="27" stroke="#a78bfa" strokeWidth="1.2" opacity="0.5"/>
                    <line x1="43" y1="31" x2="51" y2="31" stroke="#a78bfa" strokeWidth="1.2" opacity="0.4"/>
                    <text x="44" y="14" fontSize="9" fill="#a78bfa" opacity="0.8" fontFamily="monospace">{'</>'}</text>
                  </svg>
                ),
              },
            ].map((card, i) => (
              i === 0 ? (
              /* AI Engineer "” custom card matching Full Stack style */
              <motion.div
                key="AI Engineer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -6 }}
                onClick={() => setAiEngineerOpen(true)}
                className="relative overflow-hidden cursor-pointer flex flex-col"
                style={{
                  borderRadius: '16px',
                  background: 'transparent',
                  border: '1px solid rgba(56,189,248,0.8)',
                  boxShadow: '0 0 8px #38bdf8, 0 0 20px #38bdf8bb, 0 0 50px #38bdf855',
                  transition: 'box-shadow 0.3s',
                  height: '220px',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px #38bdf8, 0 0 35px #38bdf8dd, 0 0 70px #38bdf877')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 8px #38bdf8, 0 0 20px #38bdf8bb, 0 0 50px #38bdf855')}
              >
                {/* Title */}
                <div className="text-center pt-2 pb-2 px-2">
                  <p className="font-extrabold text-white leading-tight" style={{ fontSize: '26px', padding: '3px 3px 7px 3px'}}>AI Engineer</p>
                  {/* <p style={{ fontSize: '10px', color: '#38bdf8', marginTop: 2 }}>LLMs, NLP, ML Models</p> */}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(56,189,248,0.7)', margin: '5px 16px' }} />

                {/* Neural network icon */}
                <div className="flex justify-center py-1">
                  <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
                    <line x1="40" y1="40" x2="40" y2="10" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    <line x1="40" y1="40" x2="40" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    <line x1="40" y1="40" x2="10" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    <line x1="40" y1="40" x2="70" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                    <line x1="40" y1="40" x2="18" y2="18" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                    <line x1="40" y1="40" x2="62" y2="18" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                    <line x1="40" y1="40" x2="18" y2="62" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                    <line x1="40" y1="40" x2="62" y2="62" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                    <circle cx="40" cy="10" r="3" fill="#38bdf8"/>
                    <circle cx="40" cy="70" r="3" fill="#38bdf8"/>
                    <circle cx="10" cy="40" r="3" fill="#38bdf8"/>
                    <circle cx="70" cy="40" r="3" fill="#38bdf8"/>
                    <circle cx="18" cy="18" r="2.5" fill="#7dd3fc"/>
                    <circle cx="62" cy="18" r="2.5" fill="#7dd3fc"/>
                    <circle cx="18" cy="62" r="2.5" fill="#7dd3fc"/>
                    <circle cx="62" cy="62" r="2.5" fill="#7dd3fc"/>
                    <circle cx="40" cy="40" r="8" stroke="#38bdf8" strokeWidth="1.2" opacity="0.5"/>
                    <circle cx="40" cy="40" r="4" fill="#38bdf8"/>
                    <circle r="2" fill="#7dd3fc" opacity="0.9">
                      <animateMotion dur="1.6s" repeatCount="indefinite" path="M40,10 L40,32"/>
                    </circle>
                    <circle r="2" fill="#7dd3fc" opacity="0.9">
                      <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.4s" path="M70,40 L48,40"/>
                    </circle>
                    <circle r="2" fill="#7dd3fc" opacity="0.9">
                      <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.8s" path="M40,70 L40,48"/>
                    </circle>
                    <circle r="2" fill="#7dd3fc" opacity="0.9">
                      <animateMotion dur="1.6s" repeatCount="indefinite" begin="1.2s" path="M10,40 L32,40"/>
                    </circle>
                  </svg>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(56,189,248,0.7)', margin: '5px 8px' }} />

                {/* Tech labels */}
                <div className="mt-auto flex items-center justify-around px-2 py-2">
                  {/* LLMs */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#38bdf8" strokeWidth="1.2"/>
                      <circle cx="7" cy="10" r="2" fill="#38bdf8" opacity="0.7"/>
                      <line x1="11" y1="8" x2="19" y2="8" stroke="#38bdf8" strokeWidth="1" opacity="0.6"/>
                      <line x1="11" y1="11" x2="17" y2="11" stroke="#38bdf8" strokeWidth="1" opacity="0.4"/>
                      <path d="M8 17v4M16 17v4" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#38bdf8', fontWeight: 600 }}>LLMs</span> */}
                  </div>
                  <div style={{ width: 2, height: 28, background: 'rgba(216, 243, 255, 0.4)' }} />
                  {/* NLP */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <path d="M4 6h16M4 10h10M4 14h12M4 18h8" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#fb923c', fontWeight: 600 }}>NLP</span> */}
                  </div>
                  <div style={{ width: 2, height: 28, background: 'rgba(222, 245, 255, 0.4)' }} />
                  {/* ML Models */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <circle cx="12" cy="12" r="3" fill="#fb923c" opacity="0.8"/>
                      <circle cx="4" cy="6" r="2" stroke="#fb923c" strokeWidth="1.2"/>
                      <circle cx="20" cy="6" r="2" stroke="#fb923c" strokeWidth="1.2"/>
                      <circle cx="4" cy="18" r="2" stroke="#fb923c" strokeWidth="1.2"/>
                      <circle cx="20" cy="18" r="2" stroke="#fb923c" strokeWidth="1.2"/>
                      <line x1="6" y1="7" x2="10" y2="11" stroke="#fb923c" strokeWidth="1" opacity="0.6"/>
                      <line x1="18" y1="7" x2="14" y2="11" stroke="#fb923c" strokeWidth="1" opacity="0.6"/>
                      <line x1="6" y1="17" x2="10" y2="13" stroke="#fb923c" strokeWidth="1" opacity="0.6"/>
                      <line x1="18" y1="17" x2="14" y2="13" stroke="#fb923c" strokeWidth="1" opacity="0.6"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#fb923c', fontWeight: 600 }}>ML Models</span> */}
                  </div>
                </div>

                {/* chevron */}
                <div className="flex justify-center pb-2">
                  <motion.svg width="24" height="14" viewBox="0 0 32 20"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }}>
                    <polyline points="2,2 16,16 30,2" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
              </motion.div>
              ) : i === 1 ? (
              /* Full Stack Developer "” custom card same size as others */
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -6 }}
                onClick={() => setFullStackOpen(true)}
                className="relative overflow-hidden cursor-pointer flex flex-col"
                style={{
                  borderRadius: '16px',
                  background: 'transparent',
                  border: '1px solid rgba(129,140,248,0.8)',
                  boxShadow: '0 0 8px #818cf8, 0 0 20px #818cf8bb, 0 0 50px #818cf855',
                  transition: 'box-shadow 0.3s',
                  height: '220px',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px #818cf8, 0 0 35px #818cf8dd, 0 0 70px #818cf877')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 8px #818cf8, 0 0 20px #818cf8bb, 0 0 50px #818cf855')}
              >
                {/* Title */}
                <div className="text-center pt-2 pb-2 px-2">
                  <p className="font-extrabold text-white leading-tight" style={{ fontSize: '26px', padding: '3px 3px 7px 3px'}}>Full Stack Developer</p>
                  {/* <p style={{ fontSize: '10px', color: '#818cf8', marginTop: 2 }}>React, Next.js, Node.js</p> */}
                </div>

                {/* Divider "” between text and icon */}
                <div style={{ height: 1, background: 'rgba(202, 207, 255, 0.7)', margin: '3px 16px' }} />

                {/* Browser mockup */}
                <div className="flex justify-center py-2">
                  <svg viewBox="0 0 72 46" width="72" height="46" fill="none">
                    <rect x="1" y="1" width="70" height="44" rx="4" fill="rgba(10,10,40,0.6)" stroke="#818cf8" strokeWidth="1.8"/>
                    <line x1="1" y1="11" x2="71" y2="11" stroke="#818cf8" strokeWidth="0.8" opacity="0.4"/>
                    <circle cx="6" cy="6" r="2" fill="#f43f5e" opacity="0.8"/>
                    <circle cx="12" cy="6" r="2" fill="#fb923c" opacity="0.8"/>
                    <circle cx="18" cy="6" r="2" fill="#4ade80" opacity="0.8"/>
                    <rect x="8" y="16" width="28" height="3" rx="1.5" fill="#818cf8" opacity="0.5"/>
                    <rect x="8" y="22" width="46" height="3" rx="1.5" fill="#818cf8" opacity="0.35"/>
                    <rect x="8" y="28" width="34" height="3" rx="1.5" fill="#818cf8" opacity="0.25"/>
                    <rect x="8" y="34" width="40" height="3" rx="1.5" fill="#818cf8" opacity="0.2"/>
                  </svg>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(202, 207, 255, 0.7)', margin: '2px 16px' }} />

                {/* Tech logos */}
                <div className="mt-auto flex items-center justify-around px-2 py-2">
                  {/* React */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#a6e4ffff" strokeWidth="1.2"/>
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#a6e4ffff" strokeWidth="1.2" transform="rotate(60 12 12)"/>
                      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#a6e4ffff" strokeWidth="1.2" transform="rotate(120 12 12)"/>
                      <circle cx="12" cy="12" r="2" fill="#e8f8ffff"/>
                    </svg>
                    <span style={{ fontSize: 8, color: '#38bdf8', fontWeight: 600 }}></span>
                  </div>
                  <div style={{ width: 2, height: 28, background: 'rgba(253, 253, 255, 0.3)' }} />
                  {/* Next.js */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#e2e8f0" strokeWidth="1.2"/>
                      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e2e8f0" fontFamily="sans-serif">N</text>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#fefeffff', fontWeight: 600 }}>Next.js</span> */}
                  </div>
                  <div style={{ width: 2, height: 28, background: 'rgba(255, 255, 255, 0.3)' }} />
                  {/* Node.js */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 256 289" width="45" height="45" fill="none">
                      <path d="M128 0L0 72v144l128 72 128-72V72L128 0z" fill="#539E43"/>
                      <path d="M128 0L0 72v144l128 72V0z" fill="#6CC24A"/>
                      <path d="M128 52l-76 44v88l76 44 76-44V96L128 52z" fill="#fff" opacity="0.1"/>
                      <text x="128" y="165" textAnchor="middle" fontSize="80" fontWeight="bold" fill="white" fontFamily="sans-serif">js</text>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#4ade80', fontWeight: 600 }}>Node.js</span> */}
                  </div>
                </div>

                {/* chevron */}
                <div className="flex justify-center pb-2">
                  <motion.svg width="24" height="14" viewBox="0 0 32 20"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ filter: 'drop-shadow(0 0 5px #818cf8)' }}>
                    <polyline points="2,2 16,16 30,2" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
              </motion.div>
              ) : i === 2 ? (
              /* System Architect "” custom card */
              <motion.div
                key="System Architect"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -6 }}
                onClick={() => setSysArchOpen(true)}
                className="relative overflow-hidden cursor-pointer flex flex-col"
                style={{
                  borderRadius: '16px',
                  background: 'transparent',
                  border: '1px solid rgba(251,146,60,0.8)',
                  boxShadow: '0 0 8px #fb923c, 0 0 20px #fb923cbb, 0 0 50px #fb923c55',
                  transition: 'box-shadow 0.3s',
                  height: '220px',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px #fb923c, 0 0 35px #fb923cdd, 0 0 70px #fb923c77')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 8px #fb923c, 0 0 20px #fb923cbb, 0 0 50px #fb923c55')}
              >
                {/* Title */}
                <div className="text-center pt-2 pb-2 px-2">
                  <p className="font-extrabold text-white leading-tight" style={{ fontSize: '26px', padding: '3px 3px 7px 3px'

                  }}>System Architect</p>
                  {/* <p style={{ fontSize: '10px', color: '#fb923c', marginTop: 2 }}>Scalable Back End Solutions</p> */}
                </div>

                {/* Divider */}
                {/* <div style={{ height: 1, background: 'rgba(251,146,60,0.7)', margin: '2px 16px' }} /> */}
                {/* Server hierarchy diagram */}
                <div className="flex justify-center py-1">
                  <svg viewBox="0 0 72 52" width="72" height="52" fill="none">
                    {/* Top server */}
                    <rect x="24" y="2" width="24" height="14" rx="2" stroke="#fb923c" strokeWidth="1.2"/>
                    <line x1="28" y1="7" x2="44" y2="7" stroke="#fb923c" strokeWidth="1" opacity="0.6"/>
                    <line x1="28" y1="11" x2="40" y2="11" stroke="#fb923c" strokeWidth="1" opacity="0.4"/>
                    <circle cx="27" cy="9" r="1.5" fill="#fb923c" opacity="0.7"/>
                    {/* Connecting lines */}
                    <line x1="36" y1="16" x2="12" y2="36" stroke="#fb923c" strokeWidth="1" opacity="0.5"/>
                    <line x1="36" y1="16" x2="36" y2="36" stroke="#fb923c" strokeWidth="1" opacity="0.5"/>
                    <line x1="36" y1="16" x2="60" y2="36" stroke="#fb923c" strokeWidth="1" opacity="0.5"/>
                    {/* Left server */}
                    <rect x="2" y="36" width="20" height="14" rx="2" stroke="#fb923c" strokeWidth="1.2" opacity="0.8"/>
                    <line x1="6" y1="41" x2="18" y2="41" stroke="#fb923c" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="6" y1="44" x2="15" y2="44" stroke="#fb923c" strokeWidth="0.8" opacity="0.4"/>
                    <circle cx="5" cy="42" r="1" fill="#fb923c" opacity="0.6"/>
                    {/* Center server */}
                    <rect x="26" y="36" width="20" height="14" rx="2" stroke="#fb923c" strokeWidth="1.2" opacity="0.8"/>
                    <line x1="30" y1="41" x2="42" y2="41" stroke="#fb923c" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="30" y1="44" x2="39" y2="44" stroke="#fb923c" strokeWidth="0.8" opacity="0.4"/>
                    <circle cx="29" cy="42" r="1" fill="#fb923c" opacity="0.6"/>
                    {/* Right server */}
                    <rect x="50" y="36" width="20" height="14" rx="2" stroke="#fb923c" strokeWidth="1.2" opacity="0.8"/>
                    <line x1="54" y1="41" x2="66" y2="41" stroke="#fb923c" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="54" y1="44" x2="63" y2="44" stroke="#fb923c" strokeWidth="0.8" opacity="0.4"/>
                    <circle cx="53" cy="42" r="1" fill="#fb923c" opacity="0.6"/>
                  </svg>
                </div>

                {/* Divider */}
                {/* <div style={{ height: 1, background: 'rgba(251,146,60,0.7)', margin: '5px 16px' }} /> */}

                {/* Tech labels */}
                <div className="mt-auto flex items-center justify-around px-2 py-2">
                  {/* Server */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <rect x="2" y="3" width="20" height="6" rx="1.5" stroke="#fb923c" strokeWidth="1.2"/>
                      <rect x="2" y="11" width="20" height="6" rx="1.5" stroke="#fb923c" strokeWidth="1.2"/>
                      <circle cx="19" cy="6" r="1" fill="#fb923c"/>
                      <circle cx="19" cy="14" r="1" fill="#fb923c"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#fb923c', fontWeight: 600 }}>Server</span> */}
                  </div>
                  <div style={{ width: 1, height: 28, background: 'rgba(251,146,60,0.4)' }} />
                  {/* Microservices */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" stroke="#fb923c" strokeWidth="1.2"/>
                      <circle cx="12" cy="12" r="3" fill="#fb923c" opacity="0.7"/>
                      <line x1="12" y1="9" x2="12" y2="2" stroke="#fb923c" strokeWidth="0.8" opacity="0.5"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#fb923c', fontWeight: 600 }}>Microservices</span> */}
                  </div>
                  <div style={{ width: 1, height: 28, background: 'rgba(251,146,60,0.4)' }} />
                  {/* Cloud */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <path d="M6 19a4 4 0 01-.5-7.9A5 5 0 0117 13h1a3 3 0 010 6H6z" stroke="#fb923c" strokeWidth="1.2"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#fb923c', fontWeight: 600 }}>Cloud</span> */}
                  </div>
                </div>

                {/* chevron */}
                <div className="flex justify-center pb-2">
                  <motion.svg width="24" height="14" viewBox="0 0 32 20"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ filter: 'drop-shadow(0 0 5px #fb923c)' }}>
                    <polyline points="2,2 16,16 30,2" fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
              </motion.div>
              ) : i === 3 ? (
              /* Team Leader "” custom card */
              <motion.div
                key="Team Leader"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -6 }}
                onClick={() => setTeamLeaderOpen(true)}
                className="relative overflow-hidden cursor-pointer flex flex-col"
                style={{
                  borderRadius: '16px',
                  background: 'transparent',
                  border: '1px solid rgba(167,139,250,0.8)',
                  boxShadow: '0 0 8px #a78bfa, 0 0 20px #a78bfabb, 0 0 50px #a78bfa55',
                  transition: 'box-shadow 0.3s',
                  height: '220px',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 12px #a78bfa, 0 0 35px #a78bfadd, 0 0 70px #a78bfa77')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 8px #a78bfa, 0 0 20px #a78bfabb, 0 0 50px #a78bfa55')}
              >
                {/* Title */}
                <div className="text-center pt-2 pb-2 px-2">
                  <p className="font-extrabold text-white leading-tight" style={{ fontSize: '26px', padding: '3px 3px 7px 3px' }}>
                    Team Leader
                  </p>
                  {/* <p style={{ fontSize: '10px', color: '#a78bfa', marginTop: 2 }}>Guide & Grow Dev Teams</p> */}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(167,139,250,0.7)', margin: '5px 16px' }} />

                {/* Person + code icon */}
                <div className="flex justify-center py-1">
                  <svg viewBox="0 0 72 52" width="72" height="52" fill="none">
                    {/* Person */}
                    <circle cx="28" cy="14" r="8" stroke="#a78bfa" strokeWidth="1.5"/>
                    <path d="M12 44c0-8.837 7.163-14 16-14s16 5.163 16 14" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
                    {/* Code/task board */}
                    <rect x="44" y="18" width="22" height="18" rx="3" stroke="#a78bfa" strokeWidth="1.2"/>
                    {/* wifi-like signal above board */}
                    <path d="M51 15 Q55 11 59 15" stroke="#a78bfa" strokeWidth="1" fill="none" opacity="0.6"/>
                    <path d="M53 13 Q55 10 57 13" stroke="#a78bfa" strokeWidth="1" fill="none" opacity="0.4"/>
                    {/* lines inside board */}
                    <line x1="48" y1="24" x2="62" y2="24" stroke="#a78bfa" strokeWidth="1" opacity="0.6"/>
                    <line x1="48" y1="28" x2="58" y2="28" stroke="#a78bfa" strokeWidth="1" opacity="0.4"/>
                    <line x1="48" y1="32" x2="60" y2="32" stroke="#a78bfa" strokeWidth="1" opacity="0.3"/>
                  </svg>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(167,139,250,0.7)', margin: '5px 16px' }} />

                {/* Tech labels */}
                <div className="mt-auto flex items-center justify-around px-2 py-2">
                  {/* Team */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <circle cx="9" cy="7" r="3" stroke="#a78bfa" strokeWidth="1.2"/>
                      <circle cx="15" cy="7" r="3" stroke="#a78bfa" strokeWidth="1.2"/>
                      <path d="M3 20c0-4 2.686-6 6-6" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M21 20c0-4-2.686-6-6-6" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M9 14c0 0 1.5-1 3-1s3 1 3 1" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#a78bfa', fontWeight: 600 }}>Team</span> */}
                  </div>
                  <div style={{ width: 1, height: 28, background: 'rgba(167,139,250,0.4)' }} />
                  {/* Leadership */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="4" y1="22" x2="4" y2="15" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#fb923c', fontWeight: 600 }}>Leadership</span> */}
                  </div>
                  <div style={{ width: 1, height: 28, background: 'rgba(167,139,250,0.4)' }} />
                  {/* Mentor */}
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#a78bfa" strokeWidth="1.2"/>
                      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M16 3l2 2-2 2" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                    </svg>
                    {/* <span style={{ fontSize: 8, color: '#a78bfa', fontWeight: 600 }}>Mentor</span> */}
                  </div>
                </div>

                {/* chevron */}
                <div className="flex justify-center pb-2">
                  <motion.svg width="24" height="14" viewBox="0 0 32 20"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ filter: 'drop-shadow(0 0 5px #a78bfa)' }}>
                    <polyline points="2,2 16,16 30,2" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
              </motion.div>
              ) : (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -6 }}
                onClick={() => { if (i === 0) setAiEngineerOpen(true); if (i === 1) setFullStackOpen(true); if (i === 2) setSysArchOpen(true); if (i === 3) setTeamLeaderOpen(true) }}
                className="relative overflow-hidden flex flex-col cursor-pointer"
                style={{
                  borderRadius: '16px',
                  background: 'transparent',
                  border: `1px solid ${card.color}99`,
                  boxShadow: `0 0 8px ${card.color}, 0 0 20px ${card.color}bb, 0 0 50px ${card.color}55`,
                  padding: '1.4rem 1.2rem 1rem',
                  transition: 'box-shadow 0.3s',
                  height: '220px',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 12px ${card.color}, 0 0 35px ${card.color}dd, 0 0 70px ${card.color}77`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 8px ${card.color}, 0 0 20px ${card.color}bb, 0 0 50px ${card.color}55`)}
              >
                {/* top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${card.color}, transparent)` }} />

                <p className="font-extrabold text-lg text-white leading-tight mb-0.5">
                  {card.title}
                  {card.titleSuffix && <span className="text-sm font-normal text-slate-400 ml-1">{card.titleSuffix}</span>}
                </p>
                <p className="text-xs mb-4" style={{ color: card.color, opacity: 0.85 }}>{card.sub}</p>

                {/* icon area */}
                <div className="mt-auto flex items-center justify-center rounded-xl py-3"
                  style={{ background: `${card.color}0d`, border: `1px solid ${card.color}22` }}>
                  {card.icon}
                </div>

                {/* animated glow chevron */}
                <div className="flex justify-center mt-3">
                  <motion.svg
                    width="32" height="20" viewBox="0 0 32 20"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ filter: `drop-shadow(0 0 6px ${card.color}) drop-shadow(0 0 14px ${card.color})` }}
                  >
                    <polyline
                      points="2,2 16,16 30,2"
                      fill="none"
                      stroke={card.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>
              </motion.div>
            )
            ))}
          </div>
        </div>

        {/* Watch My Story + Skill Bars */}
        <div className="story-row flex items-center gap-10 mt-70" style={{ width: '90vw' }}>
          {/* Left: video panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="story-video flex-shrink-0 flex flex-col"
            style={{ width: '42%' }}
          >
            <div className="relative overflow-hidden"
              style={{
                border: '1px solid rgba(56,189,248,0.3)',
                boxShadow: '0 0 24px rgba(56,189,248,0.15)',
                background: '#050816',
                aspectRatio: '16/9',
              }}
            >
              <video
                ref={videoRef}
                src="/story.mp4"
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onError={e => { (e.currentTarget as HTMLVideoElement).style.display = 'none' }}
              />
              {/* fallback placeholder shown when no video */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ background: 'rgba(5,8,30,0.7)' }}>
                <div className="text-center font-mono">
                  <div className="text-4xl mb-2" style={{ color: 'rgba(56,189,248,0.3)' }}>▶</div>
                  <p className="text-xs" style={{ color: 'rgba(56,189,248,0.4)' }}>
                    Add story.mp4 to /public
                  </p>
                </div>
              </div>
              {/* Play/Pause overlay button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (!videoRef.current) return
                  if (videoPlaying) { videoRef.current.pause(); setVideoPlaying(false) }
                  else { videoRef.current.play(); setVideoPlaying(true) }
                }}
                className="absolute bottom-3 right-3 flex items-center justify-center rounded-full"
                style={{
                  width: 40, height: 40,
                  background: 'rgba(56,189,248,0.2)',
                  border: '1px solid rgba(56,189,248,0.6)',
                  boxShadow: '0 0 12px rgba(56,189,248,0.4)',
                  color: '#38bdf8',
                  fontSize: '1rem',
                }}
              >
                {videoPlaying ? '⏸' : '▶'}
              </motion.button>
            </div>
            {/* Watch My Story label */}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 mt-3 cursor-pointer"
              style={{ borderTop: '1px dashed rgba(56,189,248,0.2)', paddingTop: 12 }}
            >
              <span className="text-white font-bold text-lg">Watch</span>
              <span className="text-white text-lg">My Story</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-lg font-bold"
                style={{ color: '#38bdf8' }}
              >›</motion.span>
            </motion.div>
          </motion.div>

          {/* Right: title + skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1"
            style={{ marginLeft: '90px', marginBottom: '70px' }}
          >
            <h2 className="text-white font-extrabold text-3xl mb-1 flex items-center gap-2">
              Building Innovative Solutions
              <span style={{ color: '#38bdf8' }}>»</span>
            </h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Full-stack, AI/ML & cloud expertise — built across 3 companies, 2 continents.
            </p>
            {[
              { label: 'Python',              pct: 95, color: '#38bdf8' },
              { label: 'React / Next.js',     pct: 90, color: '#38bdf8' },
              { label: 'Node.js / FastAPI',   pct: 88, color: '#38bdf8' },
              { label: 'Machine Learning',    pct: 92, color: '#fb923c' },
              { label: 'LLM & Deep Learning', pct: 88, color: '#fb923c' },
              { label: 'AWS / Docker / K8s',  pct: 87, color: '#fb923c' },
         
            ].map((s, i) => (
              <motion.div key={s.label} className="mb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                  <span className="text-slate-300 text-sm flex-1">{s.label}</span>
                  <span className="text-white font-bold text-sm">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${s.color}66, ${s.color})`,
                      boxShadow: `0 0 8px ${s.color}88`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Footer socials */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="footer-socials relative z-10 flex items-center justify-center gap-6 py-1"
          style={{ borderTop: '1px solid rgba(56,189,248,0.12)', marginTop: '70px'}}
        >
          <span style={{ color: 'rgba(56,189,248,0.3)', letterSpacing: 6, fontSize: 12 }}>• •</span>

          {/* LinkedIn */}
          <motion.a href="https://linkedin.com/in/alejandro-a-0654ab3b1" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center"
            style={{
              width: 64, height: 64,
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.7)',
              borderRadius: 8,
              color: '#38bdf8',
              boxShadow: '0 0 12px rgba(56,189,248,0.8), 0 0 30px rgba(56,189,248,0.4), inset 0 0 12px rgba(56,189,248,0.08)',
            }}
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </motion.a>

          {/* GitHub */}
          <motion.a href="https://github.com/tytanesk" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center"
            style={{
              width: 64, height: 64,
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.7)',
              borderRadius: 8,
              color: '#38bdf8',
              boxShadow: '0 0 12px rgba(56,189,248,0.8), 0 0 30px rgba(56,189,248,0.4), inset 0 0 12px rgba(56,189,248,0.08)',
            }}
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </motion.a>

          {/* Get in Touch */}
          <motion.a href="freeburner80@gmail.com"
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="footer-touch flex items-center gap-3 px-7 py-4"
            style={{
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.7)',
              borderRadius: 8,
              color: '#38bdf8',
              fontSize: 18,
              fontWeight: 600,
              boxShadow: '0 0 12px rgba(56,189,248,0.8), 0 0 30px rgba(56,189,248,0.4), inset 0 0 12px rgba(56,189,248,0.08)',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            <svg className="mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
            <span className="footer-touch-text">Get in Touch</span>
          </motion.a>

          <span style={{ color: 'rgba(56,189,248,0.3)', letterSpacing: 6, fontSize: 12 }}>• •</span>
        </motion.footer>

      </div>
    </div>

    <LLMProjectModal open={llmOpen} onClose={() => setLlmOpen(false)} />
    <AIChatbotModal open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    <AIEngineerModal open={aiEngineerOpen} onClose={() => setAiEngineerOpen(false)} />
    <FullStackModal open={fullStackOpen} onClose={() => setFullStackOpen(false)} />
    <SystemArchitectModal open={sysArchOpen} onClose={() => setSysArchOpen(false)} />
    <TeamLeaderModal open={teamLeaderOpen} onClose={() => setTeamLeaderOpen(false)} />
    </>
  )
}
