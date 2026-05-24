import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/alejandro-a-0654ab3b1' },
  { icon: Twitter, label: 'Twitter', href: 'https://github.com/tytanesk' },
  { icon: Mail, label: 'Get in Touch', href: '/contact' },
]

export default function FooterSocials() {
  return (
    <footer className="relative z-10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        {links.map((l, i) => {
          const Icon = l.icon
          const isInternal = l.href.startsWith('/')
          const common = {
            key: l.label,
            initial: { opacity: 0, y: 10 } as any,
            whileInView: { opacity: 1, y: 0 } as any,
            viewport: { once: true } as any,
            transition: { delay: i * 0.1 } as any,
            whileHover: { scale: 1.1, y: -2 } as any,
            className: 'flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors text-sm',
          }

          if (isInternal) {
            const MotionLink = motion(Link)
            return (
              <MotionLink to={l.href} {...common}>
                <Icon size={18} />
                {l.label === 'Get in Touch' && <span>{l.label}</span>}
              </MotionLink>
            )
          }

          return (
            <motion.a href={l.href} target="_blank" rel="noopener noreferrer" {...common}>
              <Icon size={18} />
              {l.label === 'Get in Touch' && <span>{l.label}</span>}
            </motion.a>
          )
        })}
      </div>
    </footer>
  )
}
