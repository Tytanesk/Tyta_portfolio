import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Responsive helpers ────────────────────────────────────────────────────────
const responsiveStyles = `
  .contact-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px; width: 100%; }
  .contact-form-2col  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
  .assessment-grid    { display: grid; grid-template-columns: 1fr 260px; gap: 16px; }
  .criteria-grid      { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .form-shell-pad     { padding: 32px 36px; }
  .contact-title      { font-size: 52px; }
  .contact-card-inner { padding: 36px 26px; gap: 14px; }
  .contact-card-icon  { width: 70px; height: 70px; border-radius: 20px; }
  @media (max-width: 768px) {
    .contact-cards-grid { grid-template-columns: 1fr; gap: 16px; }
    .contact-form-2col  { grid-template-columns: 1fr; }
    .assessment-grid    { grid-template-columns: 1fr; }
    .criteria-grid      { grid-template-columns: 1fr; }
    .form-shell-pad     { padding: 20px 18px; }
    .contact-title      { font-size: 32px; }
    .contact-card-inner { padding: 18px 20px; gap: 8px; }
    .contact-card-icon  { width: 44px; height: 44px; border-radius: 12px; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .contact-cards-grid { grid-template-columns: repeat(2, 1fr); }
    .assessment-grid    { grid-template-columns: 1fr; }
    .contact-title      { font-size: 40px; }
  }
`

type Mode = 'hire' | 'collaborate' | 'hi' | null

const GLASS   = 'rgba(255,255,255,0.10)'
const GLASS_H = 'rgba(255,255,255,0.18)'
const BORDER  = '1px solid rgba(255,255,255,0.22)'
const ACCENT  = 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)'
const LABEL   = 'rgba(255,255,255,0.9)'
const TEXT    = 'rgba(255,255,255,0.72)'
const lbl: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: LABEL, marginBottom: 6, display: 'block', letterSpacing: 0.5, textTransform: 'uppercase' }

function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale3d(1.04,1.04,1.04)`
    el.style.boxShadow = `${-x * 24}px ${y * 24}px 60px rgba(99,102,241,0.35), 0 0 40px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.25)`
  }, [])
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'
  }, [])
  return { ref, onMove, onLeave }
}

function fs(focused: boolean): React.CSSProperties {
  return {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    background: focused ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
    border: focused ? '1.5px solid rgba(139,92,246,0.85)' : '1.5px solid rgba(255,255,255,0.18)',
    color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit',
    boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.25), 0 0 20px rgba(139,92,246,0.18)' : 'none',
    transition: 'all 0.2s',
  }
}

function GlowInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [f, setF] = useState(false)
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={fs(f)} onFocus={() => setF(true)} onBlur={() => setF(false)} />
}

function GlowArea({ value, onChange, placeholder, rows }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  const [f, setF] = useState(false)
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows ?? 4} style={{ ...fs(f), resize: 'vertical' }} onFocus={() => setF(true)} onBlur={() => setF(false)} />
}

function GlowSelect({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const options = React.Children.toArray(children).map(child => {
    const c = child as React.ReactElement<{ value?: string; children?: React.ReactNode }>
    const val = c.props.value !== undefined ? String(c.props.value) : String(c.props.children ?? '')
    return { val, label: String(c.props.children ?? val) }
  })
  const selected = options.find(o => o.val === value)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      <div onClick={() => setOpen(o => !o)} style={{ ...fs(open), cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: selected?.val === '' ? 'rgba(255,255,255,0.35)' : '#fff' }}>{selected?.label || '* Select *'}</span>
        <span style={{ color: 'rgba(167,139,250,0.9)', fontSize: 11, display: 'inline-block', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>🔻</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -6, scaleY: 0.95 }} transition={{ duration: 0.15 }}
            style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 9999, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(139,92,246,0.45)', boxShadow: '0 12px 40px rgba(0,0,0,0.85)', background: 'rgba(12,7,32,0.98)', backdropFilter: 'blur(24px)', transformOrigin: 'top' }}>
            {options.map(opt => (
              <div key={opt.val} onClick={() => { onChange(opt.val); setOpen(false) }}
                style={{ padding: '10px 14px', fontSize: 14, cursor: 'pointer', color: opt.val === value ? '#c4b5fd' : 'rgba(255,255,255,0.82)', background: opt.val === value ? 'rgba(139,92,246,0.22)' : 'transparent', transition: 'background 0.12s, color 0.12s', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.18)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = opt.val === value ? 'rgba(139,92,246,0.22)' : 'transparent'; e.currentTarget.style.color = opt.val === value ? '#c4b5fd' : 'rgba(255,255,255,0.82)' }}>
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SendBtn({ label, sending, onClick }: { label: string; sending: boolean; onClick: () => void }) {
  return (
    <motion.button type="button" onClick={onClick} disabled={sending}
      whileHover={{ scale: 1.03, boxShadow: '0 0 36px rgba(139,92,246,0.75), 0 0 70px rgba(99,102,241,0.4)' }}
      whileTap={{ scale: 0.94, boxShadow: '0 0 12px rgba(139,92,246,0.4)' }}
      style={{ width: '100%', padding: '14px', borderRadius: 12, background: ACCENT, color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.6 : 1, letterSpacing: 0.4, boxShadow: '0 4px 24px rgba(99,102,241,0.5)', transition: 'opacity 0.2s' }}>
      {sending ? 'Sending...' : label}
    </motion.button>
  )
}

function FormShell({ title, children }: { title: string; children: React.ReactNode }) {
  const { ref, onMove, onLeave } = useTilt()
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} style={{ marginTop: 28 }}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ background: 'rgba(15,10,40,0.55)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', borderRadius: 24, border: '1px solid rgba(139,92,246,0.3)', boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)', transition: 'transform 0.12s ease, box-shadow 0.12s ease', position: 'relative', overflow: 'visible' }}
        className="form-shell-pad">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, borderRadius: '24px 24px 0 0', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(99,102,241,0.6), transparent)' }} />
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 24, textAlign: 'center', letterSpacing: -0.3, textShadow: '0 0 20px rgba(139,92,246,0.5)' }}>{title}</h3>
        {children}
      </div>
    </motion.div>
  )
}

async function sendToTelegram(text: string) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
  if (!token || !chatId) { console.warn('Telegram env vars missing'); return }
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  })
}

function HireMeForm({ onSent }: { onSent: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [budget, setBudget] = useState('Any time')
  const [timeline, setTimeline] = useState('Any time')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const submit = async () => {
    if (!message.trim()) return
    setSending(true)
    await sendToTelegram(
      `🟢 *Hire Me Request*\n\n` +
      `1️⃣ *Name:* ${name}\n` +
      `2️⃣ *Email / Contact:* ${email}\n\n` +
      `3️⃣ *Project Type:* ${projectType}\n` +
      `4️⃣ *Budget:* ${budget}\n` +
      `5️⃣ *Timeline:* ${timeline}\n\n` +
      `6️⃣ *Message:* ${message}`
    )
    setSending(false); onSent()
  }
  return (
    <FormShell title="Hire Me">
      <div className="contact-form-2col">
        <div><label style={lbl}>Your Name</label><GlowInput value={name} onChange={setName} placeholder="Alex" /></div>
        <div><label style={lbl}>Email / Contact</label><GlowInput value={email} onChange={setEmail} placeholder="alex@email.com" /></div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={lbl}>Project Type</label>
        <GlowSelect value={projectType} onChange={setProjectType}>
          <option value="">* Select *</option>
          <option>Full-Stack Web App</option>
          <option>AI / ML Solution</option>
          <option>Backend API</option>
          <option>Blockchain / Web3</option>
          <option>Consulting</option>
          <option>Other</option>
        </GlowSelect>
      </div>
      <div className="contact-form-2col">
        <div>
          <label style={lbl}>Budget Range</label>
          <GlowSelect value={budget} onChange={setBudget}>
            <option>Any time</option>
            <option>&lt; $1k</option>
            <option>$1k ~ $5k</option>
            <option>$5k ~ $20k</option>
            <option>$20k+</option>
          </GlowSelect>
        </div>
        <div>
          <label style={lbl}>Timeline</label>
          <GlowSelect value={timeline} onChange={setTimeline}>
            <option>Any time</option>
            <option>ASAP</option>
            <option>1 ~ 4 weeks</option>
            <option>1 ~ 3 months</option>
            <option>3+ months</option>
          </GlowSelect>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={lbl}>Your Message</label>
        <GlowArea value={message} onChange={setMessage} rows={3} placeholder="Describe your project..." />
      </div>
      <SendBtn label="Send Request" sending={sending} onClick={submit} />
    </FormShell>
  )
}

function CollaborateForm({ onSent }: { onSent: () => void }) {
  const [idea, setIdea] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const submit = async () => {
    if (!idea.trim()) return
    setSending(true)
    await sendToTelegram(`❤ *Collaboration Request*\n\n *Name:* ${name}\n\n *Email:* ${email}\n\n *Idea:* ${idea}`)
    setSending(false); onSent()
  }
  return (
    <FormShell title="Collaborate">
      <div className="contact-form-2col">
        <div><label style={lbl}>Your Name</label><GlowInput value={name} onChange={setName} placeholder="Alex" /></div>
        <div><label style={lbl}>Email</label><GlowInput value={email} onChange={setEmail} placeholder="alex@email.com" /></div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={lbl}>Your Idea</label>
        <GlowArea value={idea} onChange={setIdea} rows={4} placeholder="Tell me about your idea..." />
      </div>
      <SendBtn label="Send Proposal" sending={sending} onClick={submit} />
    </FormShell>
  )
}

function HiForm({ onSent }: { onSent: () => void }) {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const submit = async () => {
    if (!message.trim()) return
    setSending(true)
    await sendToTelegram(`👋 *Just Saying Hi*\n\n${message}`)
    setSending(false); onSent()
  }
  return (
    <FormShell title="Just Say Hi">
      <div style={{ marginBottom: 20 }}>
        <label style={lbl}>Your Message</label>
        <GlowArea value={message} onChange={setMessage} rows={5} placeholder="Hey Alejandro! ..." />
      </div>
      <SendBtn label="Send Message" sending={sending} onClick={submit} />
    </FormShell>
  )
}

function StarRating({ value, hovered, onHover, onSelect, submitted }: {
  value: number; hovered: number
  onHover: (v: number) => void; onSelect: (v: number) => void; submitted: boolean
}) {
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']
  const colors = ['', '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e']
  const active = hovered || value
  if (submitted) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      style={{ padding: '14px', borderRadius: 14, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', textAlign: 'center', marginBottom: 12 }}>
      <div style={{ fontSize: 24, marginBottom: 4 }}>🎉</div>
      <p style={{ color: '#4ade80', fontWeight: 700, fontSize: 13 }}>Thanks for your {value}-star rating!</p>
    </motion.div>
  )
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 12 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>Rate This Portfolio</p>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {[1,2,3,4,5].map(s => (
          <motion.span key={s} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}
            onMouseEnter={() => onHover(s)} onMouseLeave={() => onHover(0)} onClick={() => onSelect(s)}
            style={{ fontSize: 26, cursor: 'pointer', color: s <= active ? colors[active] : 'rgba(255,255,255,0.15)', transition: 'color 0.15s', filter: s <= active ? `drop-shadow(0 0 5px ${colors[active]})` : 'none' }}>★</motion.span>
        ))}
        {active > 0 && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: 12, fontWeight: 700, color: colors[active], marginLeft: 6 }}>{labels[active]}</motion.span>}
      </div>
    </motion.div>
  )
}

function PortfolioAssessment() {
  const [recommendation, setRecommendation] = useState<'recommend' | 'not' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [starValue, setStarValue] = useState(0)
  const [starHovered, setStarHovered] = useState(0)
  const [starName, setStarName] = useState('')
  const [starSubmitted, setStarSubmitted] = useState(false)
  const [checked, setChecked] = useState<number[]>([])

  const toggleCard = (i: number) => {
    setChecked(prev => {
      const next = prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
      const starMap = [0, 2, 3, 4, 5]
      setStarValue(starMap[Math.min(next.length, 4)])
      return next
    })
  }

  const handleStarSubmit = async () => {
    if (!starValue) return
    const labels = ['','Poor','Fair','Good','Great','Excellent']
    const checkedTitles = checked.map(i => criteria[i].title).join(', ')
    await sendToTelegram(`⭐ *Star Rating*\n\n*Rating:* ${starValue}/5 — ${labels[starValue]}\n*Checked:* ${checkedTitles || '—'}\n*From:* ${starName || 'Anonymous'}`)
    setStarSubmitted(true)
  }

  const handleSubmit = async () => {
    if (!recommendation) return
    await sendToTelegram(`📊 *Portfolio Assessment*\n\n*Recommendation:* ${recommendation === 'recommend' ? '✅ Recommend' : '❌ Not Recommended'}${feedback ? `\n*Feedback:* ${feedback}` : ''}`)
    setSubmitted(true)
  }

  const STATS = { rating: 4.9, reviews: 128, recommendPct: 94 }
  const AVATARS = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/67.jpg',
    'https://randomuser.me/api/portraits/women/17.jpg',
    'https://randomuser.me/api/portraits/men/91.jpg',
  ]
  const criteria = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
      title: 'Technical Quality', pct: 97, desc: 'Clean architecture, scalable\nmaintainable code',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>,
      title: 'Communication', pct: 90, desc: 'Clear updates, fast response,\nstrong collaboration',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
      title: 'Delivery Reliability', pct: 93, desc: 'On-time execution with\nbusiness-focused solutions',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
      title: 'Overall Impression', pct: 93, desc: 'Professional, senior-level,\nand production-ready', highlight: true,
    },
  ]

  const statsBar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '12px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: '#fbbf24', fontSize: 16 }}>★</span><span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>{STATS.rating}</span><span style={{ color: TEXT, fontSize: 13 }}> / 5</span></div>
      <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 14 }}>👥</span><span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{STATS.reviews} Reviews</span></div>
      <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 14 }}>👍</span><span style={{ color: '#4ade80', fontWeight: 700, fontSize: 14 }}>{STATS.recommendPct}% Recommended</span></div>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      style={{ maxWidth: 900, width: '100%', marginTop: 52 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 4, textShadow: '0 0 20px rgba(139,92,246,0.4)' }}>Portfolio Assessment</h2>
        <p style={{ fontSize: 14, color: TEXT }}>{STATS.reviews} developers & clients reviewed this portfolio</p>
      </div>
      <div style={{ marginBottom: 16 }}>{statsBar}</div>
      <div className="assessment-grid">
        {/* Left */}
        <div style={{ background: 'rgba(10,6,30,0.7)', backdropFilter: 'blur(24px)', borderRadius: 20, padding: '20px', border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
          <div className="criteria-grid">
            {criteria.map((c, i) => {
              const isChecked = checked.includes(i)
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => toggleCard(i)} whileHover={{ y: -3 }}
                  style={{ background: isChecked ? (c.highlight ? 'rgba(251,191,36,0.12)' : 'rgba(99,102,241,0.15)') : (c.highlight ? 'rgba(251,191,36,0.06)' : 'rgba(255,255,255,0.04)'), borderRadius: 14, padding: '14px', border: `1.5px solid ${isChecked ? (c.highlight ? 'rgba(251,191,36,0.6)' : 'rgba(99,102,241,0.7)') : (c.highlight ? 'rgba(251,191,36,0.25)' : 'rgba(99,102,241,0.25)')}`, position: 'relative', cursor: 'pointer', transition: 'all 0.2s', boxShadow: isChecked ? `0 0 16px ${c.highlight ? 'rgba(251,191,36,0.2)' : 'rgba(99,102,241,0.25)'}` : 'none' }}>
                  <motion.div animate={{ scale: isChecked ? 1 : 0.8, background: isChecked ? '#6366f1' : 'rgba(99,102,241,0.35)' }}
                    style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}>✓</motion.div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: isChecked ? (c.highlight ? 'rgba(251,191,36,0.2)' : 'rgba(99,102,241,0.25)') : 'rgba(255,255,255,0.07)', color: isChecked ? (c.highlight ? '#fbbf24' : '#818cf8') : 'rgba(255,255,255,0.5)', transition: 'all 0.2s' }}>{c.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{c.title}</span>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: c.highlight ? '#fbbf24' : '#a78bfa', marginBottom: 4 }}>{c.pct}% <span style={{ fontSize: 11, fontWeight: 500, color: TEXT }}>positive feedback</span></div>
                  <p style={{ fontSize: 11, color: TEXT, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{c.desc}</p>
                  <div style={{ marginTop: 8, fontSize: 11, color: isChecked ? '#818cf8' : '#6366f1', fontWeight: 600 }}>{isChecked ? '✓ Selected' : 'Click to select'} · {c.pct}% agree</div>
                </motion.div>
              )
            })}
          </div>
          <StarRating value={starValue} hovered={starHovered} onHover={setStarHovered} onSelect={setStarValue} submitted={starSubmitted} />
          {starValue > 0 && !starSubmitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input value={starName} onChange={e => setStarName(e.target.value)} placeholder="Your name (optional)"
                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, outline: 'none', fontFamily: 'inherit' }} />
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 16px rgba(139,92,246,0.6)' }} whileTap={{ scale: 0.95 }} onClick={handleStarSubmit}
                style={{ padding: '8px 16px', borderRadius: 8, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 12, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Submit ★</motion.button>
            </motion.div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 99, border: '1px solid rgba(251,191,36,0.5)', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontSize: 14, fontWeight: 700, boxShadow: '0 0 16px rgba(251,191,36,0.15)', cursor: 'default' }}>✦ Excellent ›</motion.div>
          </div>
        </div>
        {/* Right */}
        <div style={{ background: 'rgba(10,6,30,0.7)', backdropFilter: 'blur(24px)', borderRadius: 20, padding: '20px', border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Community Evaluation</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#fbbf24' }}>★</span><span style={{ color: '#fff', fontWeight: 800 }}>{STATS.rating}</span>
            <span style={{ color: TEXT, fontSize: 12 }}>/ 5</span><span style={{ color: TEXT, fontSize: 12, marginLeft: 4 }}>👍 {STATS.reviews} reviews</span>
          </div>
          <div style={{ fontSize: 13, color: '#4ade80', fontWeight: 600 }}>👍 {STATS.recommendPct}% recommend</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {AVATARS.map((src, i) => (<img key={i} src={src} alt="reviewer" style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(10,6,30,0.8)', marginLeft: i > 0 ? -8 : 0, objectFit: 'cover' }} />))}
          </div>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🙏</div>
              <p style={{ color: '#c4b5fd', fontWeight: 600, fontSize: 13 }}>Thanks for your feedback!</p>
            </div>
          ) : (
            <>
              <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(56,189,248,0.35)' }} whileTap={{ scale: 0.97 }} onClick={() => setRecommendation('recommend')}
                style={{ padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: recommendation === 'recommend' ? 'linear-gradient(135deg,#1e3a6e,#2d5299)' : 'rgba(30,58,110,0.7)', color: '#fff', transition: 'all 0.2s' }}>✓ Recommend ({STATS.recommendPct}%)</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setRecommendation('not')}
                style={{ padding: '11px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: recommendation === 'not' ? 'rgba(255,255,255,0.08)' : 'transparent', color: TEXT, transition: 'all 0.2s' }}>✗ Not Recommended ({100 - STATS.recommendPct}%)</motion.button>
              <input value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="What could be improved?"
                style={{ padding: '9px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 12, outline: 'none', fontFamily: 'inherit' }} />
              <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(139,92,246,0.65)' }} whileTap={{ scale: 0.96 }} onClick={handleSubmit}
                style={{ padding: '12px', borderRadius: 10, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.45)', opacity: recommendation ? 1 : 0.5 }}>Submit</motion.button>
            </>
          )}
        </div>
      </div>
      <div style={{ marginTop: 16 }}>{statsBar}</div>
    </motion.div>
  )
}



const CARDS = [
  {
    id: 'hire' as Mode, glow: 'rgba(139,92,246,0.5)', title: 'Hire Me',
    desc: "I'm ready to tackle your next big project and bring innovative solutions to life.",
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="12"/><path d="M12 12h.01"/>
        <path d="M2 12h4m12 0h4"/>
      </svg>
    ),
  },
  {
    id: 'collaborate' as Mode, glow: 'rgba(99,102,241,0.5)', title: 'Collaborate',
    desc: "Let's join forces and create something amazing together.",
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'hi' as Mode, glow: 'rgba(167,139,250,0.5)', title: 'Just Say Hi',
    desc: 'Reach out with a casual message, question, or simply to say hello.',
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="9" y1="10" x2="15" y2="10"/>
        <line x1="9" y1="14" x2="12" y2="14"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  const [selected, setSelected] = useState<Mode>(null)
  const [sent, setSent] = useState(false)
  const toggle = (id: Mode) => { setSelected(prev => prev === id ? null : id); setSent(false) }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', backgroundImage: 'url(/contact.png)', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <style>{responsiveStyles}</style>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,4,20,0.52)' }} />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 52 }}>
          <h1 className="contact-title" style={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 2px 24px rgba(0,0,0,0.7)', fontFamily: 'Inter, sans-serif', margin: 0, marginBottom: 8 }}>Let's Work Together</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 4 }}>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, transparent, #38bdf8)' }} />
            <p className="text-sm tracking-widest uppercase" style={{ color: '#94a3b8', letterSpacing: '0.25em', fontWeight: 600 }}>Not just contact — choose how you want to connect.</p>
            <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, #fb923c, transparent)' }} />
          </div>
        </motion.div>

        <div className="contact-cards-grid">
          {CARDS.map((card, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { ref, onMove, onLeave } = useTilt()
            const isSelected = selected === card.id
            return (
              <motion.div key={card.id as string} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={() => toggle(card.id)}
                  className="contact-card-inner"
                  style={{ background: isSelected ? 'rgba(139,92,246,0.18)' : GLASS, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 24, border: isSelected ? '1.5px solid rgba(139,92,246,0.6)' : BORDER, boxShadow: isSelected ? `0 0 0 1px rgba(139,92,246,0.3), 0 16px 60px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.2)` : '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.12s ease, box-shadow 0.12s ease, background 0.2s, border 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${card.glow}, transparent)` }} />
                  <div className="contact-card-icon" style={{ background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.12), rgba(139,92,246,0.08))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 20px ${card.glow}`, flexShrink: 0 }}>{card.icon}</div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.3, textShadow: `0 0 20px ${card.glow}` }}>{card.title}</h2>
                  <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.65 }}>{card.desc}</p>
                  <motion.button whileHover={{ scale: 1.06, boxShadow: `0 0 28px ${card.glow}, 0 0 56px rgba(99,102,241,0.3)` }} whileTap={{ scale: 0.93 }}
                    onClick={e => { e.stopPropagation(); toggle(card.id) }}
                    style={{ marginTop: 6, padding: '11px 40px', borderRadius: 12, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: `0 4px 20px ${card.glow}`, letterSpacing: 0.3 }}>
                    Select
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div style={{ maxWidth: 900, width: '100%', padding: '0 0' }}>
          <AnimatePresence mode="wait">
            {!sent && selected === 'hire'        && <HireMeForm     key="hire"   onSent={() => setSent(true)} />}
            {!sent && selected === 'collaborate' && <CollaborateForm key="collab" onSent={() => setSent(true)} />}
            {!sent && selected === 'hi'          && <HiForm          key="hi"     onSent={() => setSent(true)} />}
            {sent && (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                style={{ marginTop: 28, textAlign: 'center', padding: '40px', background: 'rgba(15,10,40,0.6)', backdropFilter: 'blur(28px)', borderRadius: 24, border: '1px solid rgba(139,92,246,0.35)', boxShadow: '0 0 60px rgba(99,102,241,0.2)' }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8, textShadow: '0 0 20px rgba(139,92,246,0.5)' }}>Message Sent!</h3>
                <p style={{ color: TEXT, fontSize: 15 }}>Thanks for reaching out. I'll get back to you soon.</p>
                <motion.button whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(139,92,246,0.7)' }} whileTap={{ scale: 0.95 }}
                  onClick={() => { setSent(false); setSelected(null) }}
                  style={{ marginTop: 22, padding: '12px 34px', borderRadius: 12, background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>
                  Send Another
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <PortfolioAssessment />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: 14, marginTop: 52 }}>
          {[
            { href: 'https://linkedin.com/in/alejandro-a-0654ab3b1', label: 'LinkedIn', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
            { href: 'https://github.com/tytanesk', label: 'GitHub', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
            { href: 'mailto:freeburner80@gmail.com', label: 'Email', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
          ].map((s, i) => (
            <motion.a key={i} href={s.href} target={s.href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer"
              whileHover={{ scale: 1.18, y: -4, boxShadow: '0 0 24px rgba(139,92,246,0.5)' }} title={s.label}
              style={{ width: 46, height: 46, borderRadius: 13, background: GLASS_H, backdropFilter: 'blur(16px)', border: BORDER, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
