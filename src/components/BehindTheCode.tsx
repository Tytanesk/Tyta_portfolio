import { motion } from 'framer-motion'
import { Play, ChevronRight } from 'lucide-react'

export default function BehindTheCode() {
  return (
    <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card-dark rounded-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image / video placeholder */}
          <div className="relative md:w-1/2 min-h-[260px] bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-slate-900" />
            {/* Simulated coding scene */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-left font-mono text-xs text-green-400 opacity-60 leading-relaxed px-6">
                <p><span className="text-violet-400">fn</span> execute_trade{'('}</p>
                <p className="pl-4"><span className="text-orange-400">ctx</span>: Context,</p>
                <p className="pl-4"><span className="text-orange-400">amount</span>: u64,</p>
                <p>{')'} -{'>'} Result{'<'}(){'>'} {'{'}</p>
                <p className="pl-4 text-slate-400">// optimize routing</p>
                <p className="pl-4"><span className="text-blue-400">let</span> path = find_best_path(ctx)?;</p>
                <p className="pl-4">execute(path, amount)?;</p>
                <p className="pl-4"><span className="text-violet-400">Ok</span>(())</p>
                <p>{'}'}</p>
              </div>
            </div>
            {/* Play button overlay */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-orange-500/80 flex items-center justify-center glow-orange"
            >
              <Play size={18} className="text-white ml-1" />
            </motion.button>
          </div>

          {/* Text */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Behind the Code
              <ChevronRight size={20} className="text-orange-400" />
              <ChevronRight size={20} className="text-orange-400 -ml-3" />
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Crafting solutions that drive innovation &amp; drive change.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="self-start flex items-center gap-2 border border-white/30 text-white px-5 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Watch My Story
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
