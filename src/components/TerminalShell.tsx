import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  accentColor: string
  maxWidth?: number
  children: React.ReactNode
}

export default function TerminalShell({ open, onClose, title, accentColor, maxWidth = 672, children }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.82)' }}
          onClick={e => { if (e.target === overlayRef.current) onClose() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="terminal-modal relative w-full flex flex-col"
            style={{
              maxWidth,
              maxHeight: '88vh',
              background: '#0d0d0d',
              border: `1px solid ${accentColor}33`,
              borderRadius: '10px',
              boxShadow: `0 0 0 1px ${accentColor}18, 0 32px 80px rgba(0,0,0,0.9), 0 0 40px ${accentColor}18`,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
              overflow: 'hidden',
            }}
          >
            {/* ── Title bar ── */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: '#161616', borderBottom: `1px solid ${accentColor}22` }}>
              {/* Traffic lights */}
              <button onClick={onClose} className="w-3 h-3 rounded-full transition-opacity hover:opacity-70"
                style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              {/* Title */}
              <div className="flex-1 text-center">
                <span className="text-xs font-medium" style={{ color: '#666' }}>
                  <span style={{ color: accentColor }}>~/portfolio</span>
                  {' — '}
                  <span style={{ color: '#888' }}>{title}</span>
                </span>
              </div>
              {/* Spacer to balance traffic lights */}
              <div className="w-16" />
            </div>

            {/* ── Prompt line ── */}
            <div className="px-4 py-2 flex-shrink-0" style={{ borderBottom: `1px solid #1a1a1a` }}>
              <span style={{ color: '#444', fontSize: 11 }}>
                <span style={{ color: '#4ade80' }}>alejandro</span>
                <span style={{ color: '#666' }}>@</span>
                <span style={{ color: accentColor }}>portfolio</span>
                <span style={{ color: '#666' }}> % </span>
                <span style={{ color: '#e2e8f0' }}>open </span>
                <span style={{ color: accentColor }}>{title.toLowerCase().replace(/ /g, '-')}</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ color: accentColor }}
                >▋</motion.span>
              </span>
            </div>

            {/* ── Scanline overlay ── */}
            <div className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
              }} />

            {/* ── Content ── */}
            <div className="overflow-y-auto flex-1 px-5 py-4 relative z-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: `${accentColor}44 transparent` }}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
