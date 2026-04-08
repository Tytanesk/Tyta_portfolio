import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-4"
      style={{
        background: 'rgba(5, 8, 30, 0.55)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56,189,248,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex items-center gap-1">
        {links.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
          >
            {({ isActive }) => (
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative px-5 py-2 text-sm font-semibold tracking-wide rounded-lg transition-all duration-200 cursor-pointer select-none"
                style={{
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  background: isActive ? 'rgba(56,189,248,0.1)' : 'transparent',
                  textShadow: isActive ? '0 0 12px rgba(56,189,248,0.7)' : 'none',
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }}
                  />
                )}
              </motion.span>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}
