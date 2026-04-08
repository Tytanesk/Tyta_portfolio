import { motion } from 'framer-motion'

const POSTS = [
  {
    tag: 'AI / ML', tagColor: '#a78bfa',
    title: 'Building Production-Ready LLM Pipelines',
    excerpt: 'How I architected a scalable LLM inference pipeline handling 78K+ daily requests with 99.9% uptime using FastAPI, Redis, and AWS SageMaker.',
    achievement: 'Top Rated', achievementColor: '#fbbf24', cups: 5,
  },
  {
    tag: 'Backend', tagColor: '#38bdf8',
    title: 'Microservices vs Monolith: Lessons from Real Projects',
    excerpt: 'After building both at ARHS Group and Accenture, here\'s what I learned about when to split services and when to keep things simple.',
    achievement: 'Most Read', achievementColor: '#34d399', cups: 4,
  },
  {
    tag: 'Cloud', tagColor: '#fb923c',
    title: 'Kubernetes in Production: What Nobody Tells You',
    excerpt: 'Real-world lessons from deploying containerized ML workloads on K8s — resource limits, autoscaling, and the debugging sessions that taught me the most.',
    achievement: 'Staff Pick', achievementColor: '#f472b6', cups: 4,
  },
  {
    tag: 'AI / ML', tagColor: '#a78bfa',
    title: 'Fine-Tuning BERT for Domain-Specific NLP',
    excerpt: 'A practical walkthrough of fine-tuning BERT on customer data at Accenture — dataset prep, training tricks, and getting to 94.2% accuracy.',
    achievement: 'Featured', achievementColor: '#fbbf24', cups: 5,
  },
  {
    tag: 'Frontend', tagColor: '#34d399',
    title: 'React Performance Patterns I Use Every Day',
    excerpt: 'From memo and useMemo to virtualization and code splitting — the patterns that actually moved the needle on real production apps.',
    achievement: 'Trending', achievementColor: '#fb923c', cups: 3,
  },
  {
    tag: 'System Design', tagColor: '#fb923c',
    title: 'Designing a Real-Time Data Pipeline with Kafka',
    excerpt: 'How I built a streaming pipeline processing 1M+ events/month — architecture decisions, consumer groups, and handling backpressure.',
    achievement: "Editor's Choice", achievementColor: '#38bdf8', cups: 5,
  },
  {
    tag: 'Backend', tagColor: '#38bdf8',
    title: 'FastAPI vs Django: Which One Should You Choose?',
    excerpt: 'A deep comparison based on real projects — performance benchmarks, developer experience, and when each framework truly shines.',
    achievement: 'Popular', achievementColor: '#34d399', cups: 3,
  },
  {
    tag: 'Cloud', tagColor: '#fb923c',
    title: 'AWS Cost Optimization: Lessons from $0 to $50K/month',
    excerpt: 'The exact strategies I used to cut cloud costs by 40% while scaling systems at ARHS Group — reserved instances, spot fleets, and right-sizing.',
    achievement: 'Top Rated', achievementColor: '#fbbf24', cups: 4,
  },
  {
    tag: 'AI / ML', tagColor: '#a78bfa',
    title: 'From Jupyter Notebook to Production ML System',
    excerpt: 'The gap between a working notebook and a production ML system is enormous. Here\'s the full journey — packaging, serving, monitoring, and retraining.',
    achievement: 'Must Read', achievementColor: '#f472b6', cups: 5,
  },
]

function TrophyIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: filled ? 1 : 0.25 }}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )
}

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050816' }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img
          src="/blog.png"
          alt="server room"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,8,30,0.55) 0%, rgba(5,8,30,0.75) 60%, #050816 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '-0.01em', marginBottom: 14, textShadow: '0 2px 24px rgba(0,0,0,0.8)' }}>
            My Engineering Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 560, lineHeight: 1.6 }}>
            Insights on building AI systems, scalable backends, and reliable cloud applications.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, transparent, #fb923c)' }} />
            <span style={{ color: 'rgba(251,146,60,0.7)', fontSize: 13, letterSpacing: 3 }}>✦ ✦</span>
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, #fb923c, transparent)' }} />
          </motion.div>
        </div>
      </div>

      {/* ── Posts grid ── */}
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '52px 40px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 28,
        }}>
          {POSTS.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -5, boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${post.tagColor}33` }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                padding: '24px 22px 20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}>

              {/* top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${post.tagColor}88, transparent)`, borderRadius: '18px 18px 0 0' }} />

              {/* tag */}
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: post.tagColor, opacity: 0.85 }}>
                {post.tag}
              </span>

              {/* title */}
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.4, margin: 0 }}>
                {post.title}
              </h2>

              {/* excerpt */}
              <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.85)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                {post.excerpt}
              </p>

              {/* achievement badge — 5 cups */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1,2,3,4,5].map(n => (
                    <TrophyIcon key={n} filled={n <= post.cups} color={post.achievementColor} />
                  ))}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: post.achievementColor, marginLeft: 6, letterSpacing: 0.4 }}>
                  {post.achievement}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(148,163,184,0.5)', fontWeight: 500 }}>
                  Read →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
