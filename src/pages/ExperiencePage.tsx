import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

interface ProjectData {
  title: string;
  description: string;
  summary: string;
  tags: string[];
  stat: string;
  imageSrc: string;
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  isNDA?: boolean;
  category?: string;
  requestDemo?: boolean;
}

interface CompanyData {
  id: number;
  company: string;
  role: string;
  period: string;
  accentColor: string;
  logoSrc: string;
  coverSrc: string;
  description: string;
  achievements: string[];
  projects: ProjectData[];
  isMilestone: boolean;
}

const COMPANIES: CompanyData[] = [
  {
    id: 0,
    company: 'University of Málaga',
    role: 'CS Student',
    period: '2015 – 2019',
    accentColor: '#38bdf8',
    logoSrc: '/logos/universidad_de_malaga_logo.svg',
    coverSrc: '/real_backgroung/malaga_university.webp',
    description: 'Built a strong foundation in computer science fundamentals. Graduated with honors, specializing in distributed systems and software architecture.',
    achievements: [
      'Graduated with honors in Computer Science',
      'Specialized in distributed systems & software architecture',
      'Built foundational expertise in algorithms and data structures',
    ],
    projects: [
      {
        title: 'Distributed Systems Research',
        description: 'Designed and implemented a fault-tolerant distributed key-value store as thesis project.',
        summary: 'A fault-tolerant key-value store using Raft consensus, achieving 99.9% availability under node failures.',
        tags: ['C++', 'Distributed Systems', 'Algorithms'],
        stat: 'Top 5% thesis',
        imageSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
        highlights: ['Raft consensus algorithm implementation', '99.9% availability under node failures', 'Benchmarked at 10K ops/sec'],
        demoUrl: '/Static Analysis of Concurrent and Distributed Systems.pdf',
      },
      {
        title: 'Algorithm Visualizer',
        description: 'Built an interactive web tool to visualize sorting and graph algorithms for fellow students.',
        summary: 'Interactive step-by-step visualization of 15+ sorting and graph algorithms used by 200+ students.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        stat: '200+ users',
        imageSrc: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80',
        highlights: ['15+ algorithms visualized', 'Step-by-step animation controls', '200+ active student users'],
        githubUrl: 'https://github.com/Tytanesk/Algorithm_visualizer_uni'
      },
    ],
    isMilestone: false,
  },
  {
    id: 1,
    company: 'Accenture',
    role: 'Data Scientist',
    period: '2021 – 2023',
    accentColor: '#a78bfa',
    logoSrc: '/logos/accenture_logo.svg',
    coverSrc: '/real_backgroung/accenture_cover.webp',
    description: 'Developed and deployed 12+ ML models including NLP and deep learning pipelines. Improved prediction accuracy by 25% across systems serving 50K+ users.',
    achievements: [
      'Deployed 12+ ML models including NLP and deep learning pipelines',
      'Improved prediction accuracy by 25% across production systems',
      'Supported systems serving 50K+ active users',
    ],
    projects: [
      {
        title: 'NLP Sentiment Engine',
        description: 'Built a real-time sentiment analysis pipeline processing 1M+ customer reviews monthly.',
        summary: 'End-to-end NLP pipeline using BERT fine-tuning to classify customer sentiment across 12 product lines, improving response time by 60%.',
        tags: ['Python', 'TensorFlow', 'BERT', 'AWS', 'Kafka'],
        stat: '1M+ reviews/mo',
        imageSrc: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
        highlights: [
          'Fine-tuned BERT model with 94.2% accuracy',
          'Real-time Kafka streaming pipeline',
          'Reduced manual review workload by 60%',
          'Deployed on AWS SageMaker with auto-scaling',
        ],
        githubUrl: 'https://github.com',
        isNDA: true,
      },
      {
        title: 'ML Ops Platform',
        description: 'Automated model training, evaluation and deployment reducing release cycles by 40%.',
        summary: 'Internal MLOps platform orchestrating the full model lifecycle — from experiment tracking to production deployment — across 12+ ML models.',
        tags: ['Airflow', 'MLflow', 'Docker', 'Kubernetes', 'Python'],
        stat: '40% faster releases',
        imageSrc: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80',
        highlights: [
          'Automated CI/CD for 12+ ML models',
          'MLflow experiment tracking & model registry',
          'Kubernetes-based auto-scaling inference',
          '40% reduction in deployment cycle time',
        ],
        githubUrl: 'https://github.com',
        isNDA: true,
      },
      {
        title: 'Predictive Analytics Dashboard',
        description: 'Full-stack dashboard surfacing ML insights to business stakeholders in real time.',
        summary: 'React + FastAPI dashboard delivering live ML predictions and KPI trends to 50K+ business users with sub-second query response.',
        tags: ['React', 'FastAPI', 'PostgreSQL', 'Redis', 'Chart.js'],
        stat: '50K+ users',
        imageSrc: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
        highlights: [
          'Sub-second query response via Redis caching',
          'Role-based access for 50K+ users',
          'Live ML prediction widgets',
          'Exported 10K+ reports monthly',
        ],
        demoUrl: 'https://demo.example.com',
        isNDA: true,
      },
      {
        title: 'Customer Churn Prediction',
        description: 'ML model predicting customer churn 30 days in advance for a telecom client with 2M+ subscribers.',
        summary: 'Gradient boosting model identifying at-risk customers 30 days before churn, enabling proactive retention campaigns that saved €2M annually.',
        tags: ['Python', 'XGBoost', 'Scikit-learn', 'AWS', 'Tableau'],
        stat: '€2M saved/yr',
        imageSrc: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80',
        highlights: [
          '87% precision on 30-day churn prediction',
          'Trained on 2M+ subscriber records',
          'Integrated with CRM for automated outreach',
          '€2M annual retention value recovered',
        ],
        githubUrl: 'https://github.com',
        isNDA: true,
      },
      {
        title: 'Deep Learning Image Classifier',
        description: 'CNN-based defect detection system for manufacturing quality control, replacing manual inspection.',
        summary: 'ResNet-50 fine-tuned on 200K+ product images to detect manufacturing defects in real time on the production line, reducing false negatives by 35%.',
        tags: ['Python', 'PyTorch', 'ResNet', 'OpenCV', 'Docker'],
        stat: '99.1% accuracy',
        imageSrc: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=600&q=80',
        highlights: [
          '99.1% defect detection accuracy',
          'Fine-tuned ResNet-50 on 200K+ images',
          'Real-time inference at 60fps on edge hardware',
          '35% reduction in false negatives vs manual QC',
        ],
        githubUrl: 'https://github.com',
        isNDA: true,
      },
      {
        title: 'Automated Data Pipeline',
        description: 'End-to-end ETL pipeline ingesting 500GB+ daily from 15 heterogeneous sources into a unified data lake.',
        summary: 'Apache Spark + Airflow pipeline processing 500GB+ daily across 15 data sources, cutting data engineering overhead by 50% and enabling same-day analytics.',
        tags: ['Apache Spark', 'Airflow', 'AWS S3', 'dbt', 'Python'],
        stat: '500GB/day',
        imageSrc: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
        highlights: [
          '500GB+ ingested and transformed daily',
          '15 heterogeneous source connectors',
          '50% reduction in data engineering overhead',
          'Same-day analytics enabled for business teams',
        ],
        githubUrl: 'https://github.com',
        isNDA: true,
      },
    ],
    isMilestone: true,
  },
  {
    id: 2,
    company: 'ARHS Group',
    role: 'Full-Stack AI Developer',
    period: '2023 – 2024',
    accentColor: '#34d399',
    logoSrc: '/logos/arhs_group_logo.svg',
    coverSrc: '/real_backgroung/arhs_group_cover.webp',
    description: 'Designed and deployed 8+ AI-driven full-stack features improving workflow efficiency by 30%. Scaled cloud infrastructure to handle 78K+ daily requests.',
    achievements: [
      'Designed and deployed 8+ AI-driven full-stack features',
      'Improved workflow efficiency by 30% across client systems',
      'Scaled cloud infrastructure to handle 78K+ daily requests',
    ],
    projects: [
      {
        title: 'AI Feature Suite',
        description: 'Delivered 8 AI-powered features across 3 client products using React, Node.js and AWS.',
        summary: '8 production AI features including smart search, auto-classification, and anomaly detection shipped across 3 enterprise client products.',
        tags: ['React', 'Node.js', 'AWS', 'OpenAI', 'TypeScript'],
        stat: '8 features shipped',
        imageSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
        highlights: [
          '8 AI features across 3 enterprise products',
          'Smart search with semantic embeddings',
          'Auto-classification reducing manual tagging by 70%',
          '30% workflow efficiency improvement',
        ],
        githubUrl: 'https://github.com',
        isNDA: true,
      },
      {
        title: 'Cloud Infrastructure Scale-up',
        description: 'Re-architected Kubernetes clusters to handle 78K+ daily requests with 99.9% uptime.',
        summary: 'Migrated monolithic infrastructure to microservices on Kubernetes, scaling from 10K to 78K+ daily requests with zero-downtime deployments.',
        tags: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Helm'],
        stat: '78K req/day',
        imageSrc: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&q=80',
        highlights: [
          'Scaled from 10K to 78K+ daily requests',
          'Zero-downtime blue/green deployments',
          '99.9% uptime SLA maintained',
          'Infrastructure-as-code with Terraform',
        ],
        githubUrl: 'https://github.com',
        isNDA: true,
      },
      {
        title: 'Real-Time Collaboration Platform',
        description: 'WebSocket-powered collaborative workspace enabling live document editing and team communication for enterprise clients.',
        summary: 'Built a Google Docs-style real-time collaboration engine using WebSockets and CRDTs, supporting 5K+ concurrent users with conflict-free editing.',
        tags: ['React', 'Node.js', 'WebSocket', 'Redis', 'PostgreSQL'],
        stat: '5K concurrent users',
        imageSrc: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
        highlights: [
          'CRDT-based conflict-free document merging',
          '5K+ concurrent users with <50ms sync latency',
          'End-to-end encrypted collaboration sessions',
          'Reduced client meeting overhead by 40%',
        ],
        githubUrl: 'https://github.com',
        demoUrl: 'https://demo.example.com',
        isNDA: true,
      },
      {
        title: 'AI-Powered Search Engine',
        description: 'Semantic search system replacing keyword search across 10M+ enterprise documents using vector embeddings.',
        summary: 'Replaced legacy keyword search with a semantic vector search engine using OpenAI embeddings + Pinecone, cutting average search time from 8s to 0.3s.',
        tags: ['Python', 'OpenAI', 'Pinecone', 'FastAPI', 'React'],
        stat: '10M+ docs indexed',
        imageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
        highlights: [
          '10M+ enterprise documents indexed',
          'Search latency reduced from 8s to 0.3s',
          'Semantic understanding across 12 languages',
          '92% user satisfaction vs 61% with keyword search',
        ],
        githubUrl: 'https://github.com',
        demoUrl: 'https://demo.example.com',
        isNDA: true,
      },
    ],
    isMilestone: false,
  },
  {
    id: 3,
    company: 'Self-employed',
    role: 'Senior Software Engineer',
    period: '2025 – Present',
    accentColor: '#fb923c',
    logoSrc: '/logos/self-employed_logo.svg',
    coverSrc: '',
    description: 'Delivering scalable AI-driven solutions for international clients. Building next-generation prediction market trading terminals.',
    achievements: [
      'Delivering scalable AI-driven solutions for international clients',
      'Building next-generation prediction market trading terminals',
      'Leading architecture decisions across full-stack and AI projects',
    ],
    projects: [
      // ── AI ──
      {
        title: 'Noupe AI Chatbot',
        description: 'Free AI chatbot builder that learns from your website and answers visitor questions automatically.',
        summary: 'Built the Noupe AI chatbot platform — a no-code tool that crawls your website, builds a knowledge base automatically, and deploys a fully customisable AI assistant in minutes.',
        tags: ['OpenAI', 'React', 'Node.js', 'Web Scraping', 'Embed API'],
        stat: 'No-code AI',
        imageSrc: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80',
        highlights: ['Auto-learns from any public website URL', 'Multi-language visitor detection', 'Custom branding — color, avatar, first message', 'Real-time conversation inbox for follow-up'],
        demoUrl: 'https://www.noupe.com',
        category: 'AI',
      },
      {
        title: 'ZeroChats AI Setter',
        description: 'AI-powered Instagram DM automation that replaces human setters — books meetings 24/7 at 35–45% conversion.',
        summary: 'Developed ZeroChats, a Spanish-market AI setter SaaS that automates Instagram DM conversations, qualifies leads, and books sales calls autonomously — replacing human setters at a fraction of the cost.',
        tags: ['Python', 'OpenAI', 'Instagram API', 'React', 'NLP'],
        stat: '100K leads/day',
        imageSrc: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
        highlights: ['35–45% booking conversion vs 10–20% human average', 'Handles 100K+ leads per day autonomously', 'Detects intent and emotion in messages', 'Fixed monthly cost — no commission per sale'],
        demoUrl: 'https://zerochats.com',
        category: 'AI',
      },
      {
        title: 'ESE2B Dev Platform',
        description: 'AI-powered developer productivity platform with code generation, review, and documentation tools.',
        summary: 'Built ese2b.dev, an AI developer tooling platform providing intelligent code generation, automated PR reviews, and documentation generation to accelerate software engineering workflows.',
        tags: ['Python', 'GPT-4', 'GitHub API', 'React', 'FastAPI'],
        stat: 'Dev productivity',
        imageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
        highlights: ['AI-powered code generation & completion', 'Automated pull request review summaries', 'Documentation generation from codebase', 'GitHub integration for seamless workflow'],
        demoUrl: 'https://ese2b.dev',
        category: 'AI',
      },
      {
        title: 'QCall AI Voice Agent',
        description: '24/7 AI voice agent platform automating inbound and outbound sales calls with NLP and CRM integration.',
        summary: 'Contributed to QCall.ai, a platform that deploys AI voice bots for call centres — handling inbound queries, running outbound campaigns, routing calls intelligently, and integrating with CRM systems.',
        tags: ['Python', 'NLP', 'Twilio', 'React', 'CRM API'],
        stat: '24/7 AI calls',
        imageSrc: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600&q=80',
        highlights: ['Automated inbound & outbound call handling', 'Multilingual NLP for global call centres', 'AI-driven lead prioritisation & routing', 'Detailed analytics and conversion reporting'],
        demoUrl: 'https://www.qcall.ai',
        category: 'AI',
      },
      {
        title: 'CT Portfolio Recru',
        description: 'AI-powered recruitment portfolio platform matching candidates with opportunities using intelligent screening.',
        summary: 'Built ctportfolio.in/recru, an AI recruitment platform that analyses candidate portfolios, matches them to job requirements using semantic similarity, and automates the initial screening pipeline.',
        tags: ['Python', 'OpenAI', 'React', 'PostgreSQL', 'Embeddings'],
        stat: 'AI recruiting',
        imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
        highlights: ['Semantic portfolio-to-job matching', 'Automated candidate screening pipeline', 'AI-generated interview question sets', 'Recruiter dashboard with match scores'],
        demoUrl: 'https://ctportfolio.in/recru',
        category: 'AI',
      },
      {
        title: 'GoAutoPosting AI',
        description: 'AI-driven social media auto-posting platform that generates and schedules content across multiple channels.',
        summary: 'Developed GoAutoPosting.ai, an AI content automation platform that generates platform-optimised posts, schedules them across social channels, and analyses engagement to continuously improve output.',
        tags: ['Python', 'GPT-4', 'React', 'Social APIs', 'Scheduler'],
        stat: 'AI content auto',
        imageSrc: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
        highlights: ['AI-generated platform-optimised content', 'Multi-channel scheduling (IG, X, LinkedIn)', 'Engagement analytics feedback loop', 'Brand voice fine-tuning per client'],
        demoUrl: 'https://goautoposting.ai',
        category: 'AI',
      },
      // ── Web ──
      {
        title: 'POST Luxembourg',
        description: 'National telecom & postal operator portal for Luxembourg — mobile, internet, banking and business services.',
        summary: 'Full-stack web platform for POST Luxembourg, the national telecom and postal operator, delivering mobile subscriptions, fibre internet, and business banking services to the entire country.',
        tags: ['React', 'Next.js', 'TypeScript', 'REST API', 'AWS'],
        stat: 'National scale',
        imageSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
        highlights: ['National-scale telecom & postal portal', 'Mobile, fibre internet & banking products', 'Multi-language (FR/DE/EN/LU) support', 'High-availability infrastructure for Luxembourg'],
        demoUrl: 'https://www.post.lu',
        category: 'Web',
      },
      {
        title: 'DanskeServiceYdelser',
        description: 'Danish service directory platform connecting citizens with alternative health practitioners and local service providers.',
        summary: 'Built the digital platform for DanskeServiceYdelser (dsy.dk), a neutral Danish directory helping citizens discover and book alternative health practitioners including acupuncturists, massage therapists, and more.',
        tags: ['React', 'Node.js', 'PostgreSQL', 'SEO', 'Booking API'],
        stat: 'Danish market',
        imageSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
        highlights: ['Neutral service directory — no algorithmic bias', 'Digital booking for 1000+ registered practitioners', 'SEO-optimised for Danish health searches', 'GDPR-compliant data handling'],
        demoUrl: 'https://dsy.dk',
        category: 'Web',
      },
      {
        title: 'Wagner-Service',
        description: 'German vacation rental consulting & booking management platform for holiday property owners.',
        summary: 'Designed and built the web presence for Wagner-Service, a German boutique agency specialising in vacation rental consulting and booking management for holiday property owners across multiple portals.',
        tags: ['WordPress', 'PHP', 'Booking API', 'SCSS', 'SEO'],
        stat: 'DE market',
        imageSrc: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
        highlights: ['Multi-portal booking management integration', 'Guest communication automation', 'Property showcase with availability calendar', 'Lead generation contact funnel'],
        demoUrl: 'https://wagner-service.org',
        category: 'Web',
      },
      {
        title: 'Muajarh',
        description: 'Arabic-language real estate and property rental platform for the Middle East market.',
        summary: 'Developed a full-stack Arabic RTL property rental platform for the Middle East market, featuring advanced search filters, landlord dashboards, and a mobile-first responsive design.',
        tags: ['React', 'Node.js', 'RTL', 'Arabic i18n', 'PostgreSQL'],
        stat: 'MENA market',
        imageSrc: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
        highlights: ['Full RTL Arabic language support', 'Advanced property search & filtering', 'Landlord & tenant dashboards', 'Mobile-first responsive design'],
        demoUrl: 'https://muajarh.com',
        category: 'Web',
      },
      {
        title: '123Rédaction',
        description: 'French freelance marketplace connecting marketing & AI professionals with project owners.',
        summary: 'Built the platform for 123rédaction.fr, a French freelance marketplace matching marketing writers, AI specialists, and virtual assistants with businesses posting projects and missions.',
        tags: ['React', 'PHP', 'MySQL', 'Stripe', 'Messaging API'],
        stat: 'FR freelance market',
        imageSrc: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80',
        highlights: ['Freelance–client matching engine', 'Real-time messaging between parties', 'Mission posting & proposal workflow', 'AI & marketing specialist categories'],
        demoUrl: 'https://123redaction.fr',
        category: 'Web',
      },
      {
        title: 'Slate Milk',
        description: 'High-protein shake & iced coffee e-commerce brand — US direct-to-consumer storefront.',
        summary: 'Developed the e-commerce storefront for Slate Milk, a US DTC brand selling ultra-filtered high-protein shakes and iced coffees, with subscription billing, build-your-own-box, and a FAQ-driven conversion flow.',
        tags: ['Shopify', 'React', 'Stripe', 'Subscription API', 'Tailwind'],
        stat: 'US DTC brand',
        imageSrc: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
        highlights: ['Subscription & one-time purchase flows', 'Build-your-own-box product configurator', 'Lactose-free / high-protein product focus', 'Optimised for DTC conversion'],
        demoUrl: 'https://slatemilk.com',
        category: 'Web',
      },
      {
        title: 'Are Y\'all Green',
        description: 'Environmental awareness initiative landing page encouraging sustainable living habits.',
        summary: 'Designed and built the landing page for Are Y\'all Green, an environmental initiative focused on making eco-friendly living approachable and community-driven, with Instagram integration and a growth-focused CTA.',
        tags: ['React', 'Tailwind', 'Instagram API', 'Vercel', 'SEO'],
        stat: 'Eco initiative',
        imageSrc: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80',
        highlights: ['Community-first environmental messaging', 'Instagram feed integration', 'Mobile-first responsive design', 'Fast-loading static site on Vercel'],
        demoUrl: 'https://areyallgreen.com',
        category: 'Web',
      },
      // ── Wordpress ──
      {
        title: 'Maids in Black',
        description: 'Professional home cleaning service in Washington DC — online booking, eco-friendly products, background-checked teams.',
        summary: 'Built the WordPress booking platform for Maids in Black, a Washington DC cleaning service, featuring instant online quotes, recurring appointment scheduling, automated payments, and cleaner rating system.',
        tags: ['WordPress', 'PHP', 'Booking API', 'WooCommerce', 'Stripe'],
        stat: 'DC cleaning service',
        imageSrc: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
        highlights: ['60-second instant online quote system', 'Recurring booking with automated payments', 'Background-checked cleaner profiles & ratings', 'Eco-friendly service showcase pages'],
        demoUrl: 'https://maidsinblack.com',
        category: 'Wordpress',
      },
      {
        title: 'The Things Between',
        description: 'Soft lifestyle fashion boutique — knit sets, cardigans and gentle spring collections.',
        summary: 'Developed the Shopify/WordPress storefront for The Things Between, a soft lifestyle fashion brand offering knit sets, cardigans, and seasonal collections with free shipping thresholds and gift options.',
        tags: ['WordPress', 'WooCommerce', 'PHP', 'SCSS', 'Klaviyo'],
        stat: 'Lifestyle fashion',
        imageSrc: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
        highlights: ['Seasonal collection landing pages', 'Free shipping threshold cart logic', 'Gift note & gift card functionality', 'Soft knit & cardigan product catalogue'],
        demoUrl: 'https://thethingsbetween.com',
        category: 'Wordpress',
      },
      {
        title: 'Live Free Armory',
        description: 'American firearms manufacturer e-commerce — veteran-operated, precision-engineered products.',
        summary: 'Built the WooCommerce store for Live Free Armory, a veteran-operated American firearms manufacturer in Palm Bay, FL, featuring daily tactical offers, product showcases, and a compliance-aware checkout.',
        tags: ['WordPress', 'WooCommerce', 'PHP', 'FFL Compliance', 'Email Marketing'],
        stat: 'US firearms brand',
        imageSrc: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
        highlights: ['Daily 24-hour tactical offer system', 'Veteran & law enforcement discount flow', 'American manufacturing process showcase', 'FFL-compliant product purchase workflow'],
        demoUrl: 'https://livefreearmory.com',
        category: 'Wordpress',
      },
      {
        title: 'Hendrick Cars',
        description: 'Multi-brand automotive dealership group website with inventory management and lead generation.',
        summary: 'Developed the WordPress platform for Hendrick Cars, a major automotive dealership group, with dynamic vehicle inventory, financing calculators, and dealer location pages.',
        tags: ['WordPress', 'PHP', 'Custom API', 'ACF Pro', 'Google Maps'],
        stat: 'Auto dealership',
        imageSrc: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
        highlights: ['Dynamic vehicle inventory integration', 'Financing calculator & lead capture', 'Multi-dealer location pages', 'SEO-optimised for local car searches'],
        demoUrl: 'https://www.hendrickcars.com',
        category: 'Wordpress',
      },
      {
        title: 'BetterHelp',
        description: 'World\'s largest online therapy platform — connecting users with licensed therapists.',
        summary: 'Contributed to the WordPress content and landing page infrastructure for BetterHelp, the world\'s largest online therapy platform, optimising conversion funnels and therapist matching pages.',
        tags: ['WordPress', 'PHP', 'CRO', 'A/B Testing', 'HIPAA'],
        stat: 'Global therapy platform',
        imageSrc: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80',
        highlights: ['HIPAA-compliant content architecture', 'Therapist matching landing pages', 'A/B tested conversion funnels', 'Accessibility-first design implementation'],
        demoUrl: 'https://www.betterhelp.com',
        category: 'Wordpress',
      },
      {
        title: 'Vegetool',
        description: 'French organic hemp product brand — cosmetics, nutrition and agricultural traceability.',
        summary: 'Built the WordPress site for Vegetool, a French organic hemp brand certified by Ecocert, showcasing their hemp seed nutrition products and biological cosmetics with full traceability documentation.',
        tags: ['WordPress', 'WooCommerce', 'PHP', 'Ecocert', 'SCSS'],
        stat: '17 yrs expertise',
        imageSrc: 'https://images.unsplash.com/photo-1536819114556-1e10f967fb61?w=600&q=80',
        highlights: ['Organic certification (Ecocert) showcase', 'Hemp cosmetics & nutrition product range', 'French agricultural traceability pages', 'Eco-friendly packaging & sustainability focus'],
        demoUrl: 'https://vegetool.com',
        category: 'Wordpress',
      },
      {
        title: 'Evolia Beauté',
        description: 'French beauty & wellness brand — skincare and beauty products e-commerce.',
        summary: 'Developed the WooCommerce store for Evolia Beauté, a French beauty and wellness brand, with a clean editorial design, product storytelling, and a seamless French-language checkout experience.',
        tags: ['WordPress', 'WooCommerce', 'PHP', 'Elementor', 'SCSS'],
        stat: 'FR beauty brand',
        imageSrc: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
        highlights: ['French-language beauty e-commerce', 'Editorial product storytelling pages', 'WooCommerce with custom beauty filters', 'Mobile-first responsive design'],
        demoUrl: 'https://evolia-beaute.com',
        category: 'Wordpress',
      },
      {
        title: 'Studio Danielle',
        description: 'French fashion boutique WooCommerce store — branded apparel and accessories.',
        summary: 'Built the WooCommerce storefront for Studio Danielle, a French fashion boutique selling branded t-shirts, sweatshirts, and accessories with a clean, minimal design and fast checkout.',
        tags: ['WordPress', 'WooCommerce', 'PHP', 'SCSS', 'Stripe'],
        stat: 'FR fashion boutique',
        imageSrc: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
        highlights: ['Branded apparel product catalogue', 'Quick-view product preview feature', 'Multi-variant (color/size) product pages', 'Stripe payment integration'],
        demoUrl: 'https://studiodanielle.fr',
        category: 'Wordpress',
      },
      // ── Excel ──
      {
        title: 'Flujo a Gantt Visual y Detallado',
        description: 'VBA macro that converts a raw task flow into a fully formatted, colour-coded Gantt chart automatically.',
        summary: 'Built an Excel VBA macro that reads a flat task list with start dates, durations and dependencies, then auto-generates a detailed visual Gantt chart with colour-coded phases, milestone markers and progress bars — no manual formatting required.',
        tags: ['Excel', 'VBA', 'Macros', 'Gantt', 'Project Management'],
        stat: 'Automated Gantt',
        imageSrc: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
        highlights: ['One-click Gantt generation from raw task data', 'Colour-coded phases and milestone markers', 'Auto-calculated progress bars per task', 'Supports dependencies and critical path'],
        requestDemo: true,
        category: 'Excel',
      },
      {
        title: 'OCR Convert Doc to Google Sheets',
        description: 'Automated pipeline that extracts text from scanned documents via OCR and structures the data into Google Sheets.',
        summary: 'Developed an Excel + Google Apps Script pipeline that uses OCR to extract structured data from scanned PDFs and images, then automatically populates and formats a Google Sheets report — eliminating manual data entry.',
        tags: ['Excel', 'Google Sheets', 'Apps Script', 'OCR', 'Automation'],
        stat: 'Zero manual entry',
        imageSrc: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80',
        highlights: ['OCR extraction from scanned PDFs & images', 'Auto-structured output in Google Sheets', 'Eliminated 100% of manual data entry', 'Handles multi-page documents in batch'],
        requestDemo: true,
        category: 'Excel',
      },
      {
        title: 'Apple & Tesla Financial Analysis',
        description: 'Manual deep-dive financial analysis of Apple and Tesla — income statements, balance sheets, ratios and valuation.',
        summary: 'Conducted a comprehensive manual financial analysis of Apple and Tesla covering 5 years of income statements, balance sheets and cash flow statements, with ratio analysis, DCF valuation and a side-by-side comparative dashboard.',
        tags: ['Excel', 'Financial Analysis', 'DCF', 'Ratio Analysis', 'Valuation'],
        stat: '5-year analysis',
        imageSrc: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
        highlights: ['5-year P&L, balance sheet & cash flow analysis', 'Key ratios: P/E, ROE, EBITDA, Debt/Equity', 'DCF valuation model for both companies', 'Side-by-side Apple vs Tesla comparison dashboard'],
        requestDemo: true,
        category: 'Excel',
      },
    ],
    isMilestone: true,
  },
]

interface ProgressBarProps {
  visited: number
  total: number
  visitedColors: string[]
}

function ProgressBar({ visited, total, visitedColors }: ProgressBarProps) {
  const pct = Math.round((visited / total) * 100)
  const gradStart = visitedColors[0] ?? '#38bdf8'
  const gradEnd = visitedColors[visitedColors.length - 1] ?? '#fb923c'
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Career Journey</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: gradEnd }}>{pct}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            height: '100%',
            borderRadius: 99,
            background: `linear-gradient(90deg, ${gradStart}, ${gradEnd})`,
            boxShadow: `0 0 8px ${gradEnd}88`,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {COMPANIES.map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < visited ? c.accentColor : 'rgba(255,255,255,0.15)', boxShadow: i < visited ? `0 0 6px ${c.accentColor}` : 'none', transition: 'all 0.4s' }} />
        ))}
      </div>
    </div>
  )
}

interface CompanyTabProps {
  company: CompanyData
  isActive: boolean
  isLocked: boolean
  onClick: () => void
}

function CompanyTab({ company, isActive, isLocked, onClick }: CompanyTabProps) {
  const [hovered, setHovered] = useState(false)
  const glowing = isActive || hovered
  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        background: company.coverSrc
          ? `url(${company.coverSrc}) center/cover no-repeat`
          : (isActive ? 'rgba(5,8,30,0.9)' : 'rgba(5,8,30,0.5)'),
        border: `1.5px solid ${glowing ? company.accentColor : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 14,
        padding: '16px 12px',
        textAlign: 'center',
        backdropFilter: 'blur(12px)',
        boxShadow: glowing ? `0 0 24px ${company.accentColor}55, 0 4px 20px rgba(0,0,0,0.5)` : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
        overflow: 'hidden',
      }}
    >
      {/* dark overlay for readability over cover image */}
      {company.coverSrc && (
        <div style={{ position: 'absolute', inset: 0, background: isActive ? 'rgba(5,8,30,0.55)' : 'rgba(5,8,30,0.72)', borderRadius: 14, transition: 'background 0.3s', zIndex: 0 }} />
      )}

      {/* content above overlay */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* top glow bar when active */}
      {isActive && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${company.accentColor}, transparent)` }} />
      )}

      {/* logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10, filter: glowing ? `drop-shadow(0 0 8px ${company.accentColor})` : 'none', transition: 'filter 0.3s' }}>
        <img src={company.logoSrc} width={52} height={52} style={{ objectFit: 'contain' }} alt={company.company} />
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: isActive ? '#fff' : '#94a3b8', marginBottom: 4 }}>{company.company}</p>
      <p style={{ fontSize: 10, color: company.accentColor, marginBottom: 6 }}>{company.period}</p>

      {/* role badge */}
      <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, background: `${company.accentColor}22`, color: company.accentColor, border: `1px solid ${company.accentColor}44` }}>
        {company.role}
      </span>

      {/* lock overlay */}
      {isLocked && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,30,0.55)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
      )}

      {/* CURRENT badge */}
      {company.id === 3 && isActive && (
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ marginTop: 6, fontSize: 9, fontWeight: 800, color: company.accentColor, letterSpacing: '0.12em' }}>
          CURRENT
        </motion.div>
      )}

      </div>
    </motion.div>
  )
}

function TimelinePath({ activeIndex }: { activeIndex: number }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="tlGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        <motion.line
          x1="12.5%" y1="50%" x2="87.5%" y2="50%"
          stroke="url(#tlGrad)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {[12.5, 37.5, 62.5, 87.5].map((x, i) => (
          <motion.circle
            key={i}
            cx={`${x}%`} cy="50%" r={i === activeIndex ? 7 : 5}
            fill={i <= activeIndex ? COMPANIES[i].accentColor : 'rgba(255,255,255,0.15)'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
            style={{ filter: i === activeIndex ? `drop-shadow(0 0 6px ${COMPANIES[i].accentColor})` : 'none' }}
          />
        ))}
      </svg>
    </div>
  )
}

interface FlipCardProps {
  company: CompanyData
  isFlipped: boolean
  onFlip: () => void
}

function FlipCard({ company, isFlipped, onFlip }: FlipCardProps) {
  return (
    <div
      onClick={onFlip}
      style={{ perspective: '1000px', cursor: 'pointer', marginBottom: 32 }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* FRONT */}
        <div style={{
          position: isFlipped ? 'absolute' : 'relative',
          inset: isFlipped ? 0 : undefined,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: company.coverSrc ? `url(${company.coverSrc}) center/cover no-repeat` : 'rgba(5,8,30,0.85)',
          border: `1.5px solid ${company.accentColor}66`,
          borderRadius: 20,
          padding: 'clamp(16px, 3vw, 32px) clamp(16px, 4vw, 40px)',
          boxShadow: `0 0 40px ${company.accentColor}33, 0 8px 32px rgba(0,0,0,0.6)`,
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          overflow: 'hidden',
        }}>
          {/* dark overlay over cover */}
          {company.coverSrc && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,30,0.72)', backdropFilter: 'blur(2px)' }} />
          )}
          {/* content above overlay */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)', width: '100%', flexWrap: 'wrap' }}>
          {/* top accent */}
          <div style={{ position: 'absolute', top: -32, left: -40, right: -40, height: 2, background: `linear-gradient(90deg, transparent, ${company.accentColor}, transparent)` }} />

          <div style={{ filter: `drop-shadow(0 0 16px ${company.accentColor})` }}>
            <img src={company.logoSrc} width={80} height={80} style={{ objectFit: 'contain' }} alt={company.company} />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: 800, color: '#fff', marginBottom: 6, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{company.company}</h2>
            <p style={{ fontSize: 16, color: company.accentColor, fontWeight: 600, marginBottom: 4, textShadow: `0 0 12px ${company.accentColor}88` }}>{company.role}</p>
            <p style={{ fontSize: 13, color: '#94a3b8' }}>{company.period}</p>
          </div>
          <motion.div
            style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* glowing flip button */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '12px 20px', borderRadius: 14,
              background: `${company.accentColor}18`,
              border: `1.5px solid ${company.accentColor}`,
              boxShadow: `0 0 18px ${company.accentColor}66, 0 0 40px ${company.accentColor}33`,
              cursor: 'pointer',
            }}>
              <motion.svg
                width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={company.accentColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <polyline points="15 3 21 3 21 9"/>
                <polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/>
                <line x1="3" y1="21" x2="10" y2="14"/>
              </motion.svg>
              <span style={{ fontSize: 10, fontWeight: 800, color: company.accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Flip Card
              </span>
            </div>
          </motion.div>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: isFlipped ? 'relative' : 'absolute',
          inset: isFlipped ? undefined : 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: company.coverSrc ? `url(${company.coverSrc}) center/cover no-repeat` : 'rgba(5,8,30,0.92)',
          border: `1.5px solid ${company.accentColor}88`,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: `0 0 48px ${company.accentColor}44, 0 8px 32px rgba(0,0,0,0.6)`,
        }}>
          {/* cover overlay */}
          {company.coverSrc && <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,30,0.82)', backdropFilter: 'blur(3px)' }} />}

          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 3vw, 28px) clamp(16px, 3vw, 36px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* top accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${company.accentColor}, transparent)`, borderRadius: '20px 20px 0 0' }} />

            {/* role header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 3, height: 36, borderRadius: 99, background: company.accentColor, boxShadow: `0 0 10px ${company.accentColor}` }} />
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: company.accentColor, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>{company.role}</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{company.company}</p>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 11, padding: '3px 12px', borderRadius: 99, background: `${company.accentColor}22`, color: company.accentColor, border: `1px solid ${company.accentColor}44`, whiteSpace: 'nowrap' }}>{company.period}</span>
            </div>

            {/* divider */}
            <div style={{ height: 1, background: `linear-gradient(90deg, ${company.accentColor}44, transparent)`, marginBottom: 14 }} />

            {/* description */}
            <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic', borderLeft: `2px solid ${company.accentColor}55`, paddingLeft: 12 }}>{company.description}</p>

            {/* achievements — 2-col grid so all fit */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, flex: 1 }}>
              {company.achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, background: `${company.accentColor}0d`, border: `1px solid ${company.accentColor}22`, borderRadius: 10, padding: '7px 12px' }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${company.accentColor}22`, border: `1.5px solid ${company.accentColor}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={company.accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.35 }}>{a}</span>
                </motion.div>
              ))}
            </div>

            {/* flip back hint */}
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.45 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={company.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
              <span style={{ fontSize: 9, color: company.accentColor, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Click to flip back</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface ProjectCardProps {
  project: ProjectData
  accentColor: string
  index: number
}

function NDAButton({ isNDA, accentColor, label, icon, href }: { isNDA: boolean; accentColor: string; label: string; icon: React.ReactNode; href: string }) {
  const [hovered, setHovered] = useState(false)
  if (isNDA) {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#475569', fontSize: 12, fontWeight: 600, cursor: 'not-allowed', userSelect: 'none', transition: 'all 0.2s' }}
      >
        {hovered ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span style={{ color: '#ef4444', letterSpacing: '0.08em' }}>NDA</span>
          </>
        ) : (
          <>{icon}{label}</>
        )}
      </div>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: label === 'GitHub' ? 'rgba(255,255,255,0.06)' : `${accentColor}22`, border: label === 'GitHub' ? '1px solid rgba(255,255,255,0.15)' : `1px solid ${accentColor}55`, color: label === 'GitHub' ? '#e2e8f0' : accentColor, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
      {icon}{label}
    </a>
  )
}

function ProjectModal({ project, accentColor, onClose }: { project: ProjectData; accentColor: string; onClose: () => void }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(8px, 3vw, 24px)', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'rgba(5,8,30,0.97)', border: `1.5px solid ${accentColor}66`, borderRadius: 20, overflow: 'hidden', maxWidth: 600, width: '100%', boxShadow: `0 0 60px ${accentColor}33, 0 20px 60px rgba(0,0,0,0.8)` }}
      >
        {/* cover image */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img src={project.imageSrc} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, rgba(5,8,30,0.95))` }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          {/* close btn */}
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(5,8,30,0.7)', border: `1px solid ${accentColor}44`, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', flex: 1 }}>{project.title}</h2>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${accentColor}33`, color: accentColor, border: `1px solid ${accentColor}66`, whiteSpace: 'nowrap' }}>{project.stat}</span>
            </div>
          </div>
        </div>

        {/* body */}
        <div style={{ padding: '20px 24px 24px' }}>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 18 }}>{project.summary}</p>

          {/* highlights */}
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: accentColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Key Highlights</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${accentColor}22`, border: `1px solid ${accentColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 12, color: '#e2e8f0', lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}33` }}>{t}</span>
            ))}
          </div>

          {/* links */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.requestDemo && (
              <button
                onClick={() => { onClose(); navigate('/contact') }}
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 10, background: `${accentColor}22`, border: `1.5px solid ${accentColor}`, color: accentColor, fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Request Demo File
              </button>
            )}
            {project.githubUrl && (
              <NDAButton isNDA={!!project.isNDA} accentColor={accentColor} label="GitHub" icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              } href={project.githubUrl} />
            )}
            {project.demoUrl && (
              <NDAButton isNDA={!!project.isNDA} accentColor={accentColor} label={project.demoUrl.endsWith('.pdf') ? 'View Thesis' : 'Live Demo'} icon={
                project.demoUrl.endsWith('.pdf')
                  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              } href={project.demoUrl} />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, accentColor, index }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 220, damping: 14 }}
        whileHover={{ y: -6, scale: 1.02 }}
        onClick={() => setModalOpen(true)}
        style={{
          position: 'relative',
          background: 'rgba(5,8,30,0.75)',
          border: `1px solid ${accentColor}44`,
          borderRadius: 16,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
        }}
      >
        {/* cover image */}
        <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
          <img src={project.imageSrc} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(5,8,30,0.1) 0%, rgba(5,8,30,0.85) 100%)` }} />
          {/* top accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
          {/* stat badge */}
          <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 10, padding: '2px 8px', borderRadius: 20, background: `rgba(5,8,30,0.8)`, color: accentColor, border: `1px solid ${accentColor}55`, backdropFilter: 'blur(4px)' }}>{project.stat}</span>
        </div>

        {/* content */}
        <div style={{ padding: '14px 16px 16px', backdropFilter: 'blur(12px)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{project.title}</h3>
          <p style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.6, marginBottom: 12 }}>{project.summary}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
            {project.tags.slice(0, 4).map(t => (
              <span key={t} style={{ fontSize: 9, padding: '2px 7px', borderRadius: 20, background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}33` }}>{t}</span>
            ))}
          </div>
          {/* click hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: 0.5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span style={{ fontSize: 9, color: accentColor, letterSpacing: '0.1em' }}>CLICK FOR DETAILS</span>
          </div>
        </div>

        {/* bottom glow */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={project} accentColor={accentColor} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

interface ProjectGridProps {
  projects: ProjectData[]
  accentColor: string
  categoryTabs?: string[]
}

function ProjectGrid({ projects, accentColor, categoryTabs }: ProjectGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 80])
  const [activeTab, setActiveTab] = useState(categoryTabs ? categoryTabs[0] : null)

  const filtered = activeTab ? projects.filter(p => p.category === activeTab) : projects

  return (
    <motion.div ref={ref} style={{ y }}>

      {/* Projects heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${accentColor}44)` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
          <h3 style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textShadow: `0 0 20px ${accentColor}66`,
            margin: 0,
          }}>
            Projects
          </h3>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
        </div>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accentColor}44, transparent)` }} />
      </div>

      {/* category tabs */}
      {categoryTabs && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {categoryTabs.map(tab => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 22px',
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                border: `1.5px solid ${activeTab === tab ? accentColor : 'rgba(255,255,255,0.12)'}`,
                background: activeTab === tab
                  ? `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`
                  : 'rgba(255,255,255,0.04)',
                color: activeTab === tab ? accentColor : '#64748b',
                boxShadow: activeTab === tab
                  ? `0 0 16px ${accentColor}55, inset 0 1px 0 ${accentColor}33`
                  : 'none',
                transition: 'all 0.2s',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(8px)',
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab ?? 'all'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="exp-project-grid"
          style={{ gap: 16 }}
        >
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} project={p} accentColor={accentColor} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

interface MilestoneToastProps {
  company: string
  role: string
  accentColor: string
  onDismiss: () => void
}

function MilestoneToast({ company, role, accentColor, onDismiss }: MilestoneToastProps) {
  useEffect(() => {
    const id = setTimeout(onDismiss, 3000)
    return () => clearTimeout(id)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: -60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.9 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        position: 'fixed',
        top: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(5,8,30,0.95)',
        border: `1.5px solid ${accentColor}`,
        borderRadius: 16,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: `0 0 40px ${accentColor}55, 0 8px 32px rgba(0,0,0,0.7)`,
        backdropFilter: 'blur(16px)',
        minWidth: 280,
        pointerEvents: 'none',
      }}
    >
      {/* trophy icon */}
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${accentColor}22`, border: `1px solid ${accentColor}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, color: accentColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>
          Milestone Unlocked
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{company}</div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>{role}</div>
      </div>
      {/* animated glow ring */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ position: 'absolute', inset: -4, borderRadius: 20, border: `1px solid ${accentColor}44`, pointerEvents: 'none' }}
      />
    </motion.div>
  )
}

export default function ExperiencePage() {
  const [activeIndex, setActiveIndex] = useState<number>(3)
  const [visitedCompanies, setVisitedCompanies] = useState<Set<number>>(new Set([3]))
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [milestoneShown, setMilestoneShown] = useState<Set<number>>(new Set())
  const [toastData, setToastData] = useState<{ company: string; role: string; accentColor: string } | null>(null)

  const visitedColorsList = Array.from(visitedCompanies).sort().map(i => COMPANIES[i].accentColor)

  const handleTabClick = (i: number) => {
    setVisitedCompanies(prev => new Set([...prev, i]))
    if (activeIndex === i) {
      setIsFlipped(f => !f)
    } else {
      setActiveIndex(i)
      setIsFlipped(false)
    }
    // milestone toast — only on first visit of milestone companies
    if (COMPANIES[i].isMilestone && !milestoneShown.has(i)) {
      setMilestoneShown(prev => new Set([...prev, i]))
      setToastData({ company: COMPANIES[i].company, role: COMPANIES[i].role, accentColor: COMPANIES[i].accentColor })
    }
  }

  return (
    <>
    <AnimatePresence>
      {toastData && (
        <MilestoneToast
          company={toastData.company}
          role={toastData.role}
          accentColor={toastData.accentColor}
          onDismiss={() => setToastData(null)}
        />
      )}
    </AnimatePresence>
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: 'url(/experience.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      <style>{`.exp-project-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; } @media (max-width: 640px) { .exp-project-grid { grid-template-columns: 1fr; } }`}</style>
      {/* ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{ position:'absolute', top:'15%', left:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)', filter:'blur(50px)' }}/>
        <div style={{ position:'absolute', bottom:'20%', right:'8%', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)', filter:'blur(50px)' }}/>
      </div>

      <div className="relative z-10 pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* title */}
        <motion.div initial={{ opacity:0, y:-24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }} className="text-center mb-10">
          <h1
            className="font-extrabold mb-4"
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              textShadow: '0 2px 24px rgba(0,0,0,0.7)',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
            }}
          >
            My Experience &amp; Projects
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 4 }}>
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, transparent, #38bdf8)' }} />
            <p style={{ color: '#94a3b8', fontSize: 11, letterSpacing: '0.25em', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>
              Career timeline · Featured work
            </p>
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, #fb923c, transparent)' }} />
          </div>
        </motion.div>

        {/* progress bar */}
        <ProgressBar visited={visitedCompanies.size} total={COMPANIES.length} visitedColors={visitedColorsList} />

        {/* company tabs + timeline */}
        <div className="relative mb-8" style={{ paddingBottom: 16 }}>
          <TimelinePath activeIndex={activeIndex} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
            {COMPANIES.map((company, i) => (
              <motion.div key={i} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.12 }}>
                <CompanyTab
                  company={company}
                  isActive={activeIndex === i}
                  isLocked={!visitedCompanies.has(i)}
                  onClick={() => handleTabClick(i)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* flip card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <FlipCard
              company={COMPANIES[activeIndex]}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(f => !f)}
            />
          </motion.div>
        </AnimatePresence>

        {/* project grid — shown when flip card is on back face */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              style={{ paddingBottom: 80 }}
            >
              <ProjectGrid
                projects={COMPANIES[activeIndex].projects}
                accentColor={COMPANIES[activeIndex].accentColor}
                categoryTabs={activeIndex === 3 ? ['Web', 'AI', 'Wordpress', 'Excel'] : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
    </>
  )
}
