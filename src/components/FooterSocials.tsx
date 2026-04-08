import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const links = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Mail, label: 'Get in Touch', href: '#' },
]

export default function FooterSocials() {
  return (
    <footer className="relative z-10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        {links.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1, y: -2 }}
            className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors text-sm"
          >
            <l.icon size={18} />
            {l.label === 'Get in Touch' && <span>{l.label}</span>}
          </motion.a>
        ))}
      </div>
    </footer>
  )
}
