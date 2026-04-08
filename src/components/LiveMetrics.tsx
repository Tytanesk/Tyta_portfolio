import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, Zap } from 'lucide-react'

function useCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return value
}

export default function LiveMetrics() {
  const [trades, setTrades] = useState(125)
  const tps = useCounter(3800)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrades(t => t + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Live Metrics */}
        <div className="card-dark rounded-2xl p-6"
          style={{ boxShadow: '0 0 30px rgba(139,92,246,0.25), 0 0 60px rgba(139,92,246,0.1)' }}>
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <Zap size={18} className="text-orange-400" />
            Live Metrics Dashboard
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* TPS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900/60 rounded-xl p-4 border border-violet-500/20"
            >
              <p className="text-slate-400 text-xs mb-1">Current Solana TPS:</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">{tps.toLocaleString()}</span>
                <BarChart2 size={20} className="text-violet-400 mb-1" />
              </div>
            </motion.div>

            {/* Trades */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/60 rounded-xl p-4 border border-orange-500/20"
            >
              <p className="text-slate-400 text-xs mb-1 flex items-center gap-1">
                Recent Trades Executed
                <span className="text-orange-400">⚡</span>
              </p>
              <div className="flex items-end gap-2">
                <motion.span
                  key={trades}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-orange-400"
                >
                  {trades}
                </motion.span>
                <span className="text-slate-400 text-sm mb-1">Today</span>
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1 mt-2 h-6">
                {[4, 7, 5, 9, 6, 8, 10].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-orange-500 rounded-sm opacity-70"
                    style={{ height: `${h * 10}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Approach */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card-dark rounded-2xl p-6 flex flex-col justify-center"
          style={{ boxShadow: '0 0 30px rgba(251,146,60,0.2), 0 0 60px rgba(251,146,60,0.08)' }}
        >
          <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            My Approach to Engineering
            <span className="text-orange-400">—</span>
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            I build systems like solving a complex puzzle, balancing speed, scalability, and precision
            to craft resilient blockchain solutions. Every line of code is a deliberate decision
            toward a system that scales.
          </p>
          <div className="mt-4 w-full h-px bg-gradient-to-r from-violet-500 to-orange-400 opacity-40" />
        </motion.div>
      </div>
    </section>
  )
}
