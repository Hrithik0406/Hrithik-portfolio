/**
 * Hrithik Sarkar Portfolio - Project Data Registry & Admin Studio Bridge
 * Contains real data for all 7 live production deployments and local persistence.
 */

const DEFAULT_PROJECTS_DATA = [
  {
    id: "the-soul-journey",
    title: "The Soul Journey",
    tagline: "Where Science Meets Soul — Integrative Wellness & Akashic Healing",
    liveUrl: "https://www.thesouljourney.in/",
    category: "nextjs",
    categoryLabel: "Next.js 14 & Full-Stack",
    badge: "Production Live",
    image: "assets/project-the-soul-journey.jpg",
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "REST APIs", "CSS Modules"],
    summary: "Architected a responsive, production-ready wellness platform from scratch utilizing the Next.js App Router and TypeScript, guaranteeing end-to-end type safety.",
    metrics: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "Network Optimization", value: "-35% Requests" },
      { label: "Architecture", value: "Next.js App Router" },
      { label: "Availability", value: "99.9%" }
    ],
    highlights: [
      "Engineered modular, reusable UI components styled with Tailwind CSS, achieving 95+ Google Lighthouse performance and accessibility scores.",
      "Implemented client-side caching and dynamic API routing, reducing redundant network requests by 35%.",
      "Built custom interactive multi-layered body diagram ('Soul & Body') explaining 5 layers: Physical, Mental, Emotional, Energy, and Spiritual.",
      "Integrated secure appointment booking flows, video streaming controls, and client testimonial modules."
    ],
    architectureDetails: {
      framework: "Next.js 14 (App Router) + TypeScript",
      rendering: "Hybrid SSR / SSG with dynamic client routing",
      styling: "Tailwind CSS + CSS Modules for component encapsulation",
      features: "Custom video players, interactive diagram layers, mobile-optimized navigation"
    }
  },
  {
    id: "toddlers-town",
    title: "Toddlers Town Preschool",
    tagline: "Full-Stack Preschool & Daycare Web Portal with Real-Time Admissions",
    liveUrl: "https://toddlers-town.vercel.app/",
    category: "nextjs",
    categoryLabel: "Next.js & Full-Stack",
    badge: "Vercel Deployed",
    image: "assets/project-toddlers-town.jpg",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel CI/CD", "Lucide"],
    summary: "An interactive, mobile-first web portal with admissions forms, enquiry workflows, and real-time form validation deployed on Vercel.",
    metrics: [
      { label: "Deployment", value: "Zero Downtime" },
      { label: "Lead Gen Speed", value: "< 2s Form UX" },
      { label: "Mobile Score", value: "98/100" },
      { label: "Pipeline", value: "Vercel Edge" }
    ],
    highlights: [
      "Built an interactive, mobile-first web portal with admissions forms, enquiry workflows, and real-time form validation.",
      "Configured continuous delivery pipelines on Vercel, enabling zero-downtime previews and instant production deployments on Git commits.",
      "Engineered responsive banner slider with Ken Burns animations, program catalogs, and interactive faculty/activities galleries.",
      "Integrated instant enquiry validation with age and program matching logic to streamline prospective parent onboarding."
    ],
    architectureDetails: {
      framework: "Next.js with React & TypeScript",
      hosting: "Vercel Edge Network with global CDN",
      styling: "Custom responsive Tailwind design with child-friendly branding tokens",
      features: "Real-time admissions intake form, animated hero sliders, responsive navigation"
    }
  },
  {
    id: "dla-pharma",
    title: "DLA Pharmaceuticals",
    tagline: "Enterprise Research-Grade Biospecimens & Pharmaceutical Catalog",
    liveUrl: "https://dlapharmaceuticals.com/",
    category: "enterprise",
    categoryLabel: "Enterprise & Next.js",
    badge: "Enterprise Live",
    image: "assets/project-dla-pharma.jpg",
    stack: ["Next.js (App Router)", "React", "TypeScript", "AWS S3", "Tailwind CSS", "REST APIs"],
    summary: "High-availability enterprise platform serving 100,000+ research-grade products, ELISA kits, and biospecimens for global laboratories.",
    metrics: [
      { label: "Products Catalog", value: "100k+ Items" },
      { label: "Media Storage", value: "AWS S3" },
      { label: "SEO Structured Data", value: "JSON-LD" },
      { label: "Lab Partners", value: "1,000+ Labs" }
    ],
    highlights: [
      "Engineered high-scale Next.js platform presenting 100,000+ certified research items with JSON-LD schema for search engines.",
      "Integrated AWS S3 cloud storage for high-resolution scientific assets, blog cover media, and product brochures.",
      "Designed dynamic partner distribution interfaces for international biotech brands (including TCS Biosciences Selectrol®).",
      "Built content engine supporting technical microbiology publications, cadaver skin guides, and diagnostic validation panels."
    ],
    architectureDetails: {
      framework: "Next.js (App Router) + React 19 / TypeScript",
      infrastructure: "AWS S3 for asset delivery, automated DNS, enterprise routing",
      styling: "Tailwind CSS with clean clinical UI & high contrast accessible typography",
      features: "Product taxonomy filters, distributor partnership showcase, technical article reader"
    }
  },
  {
    id: "future-tales",
    title: "FutureTails",
    tagline: "Pet Care Platform & Cloud Infrastructure Migration",
    liveUrl: "https://futuretails.in/",
    category: "ai",
    categoryLabel: "AI & Interactive",
    badge: "Cloud Migrated",
    image: "assets/project-future-tales.jpg",
    stack: ["React", "Vite", "PHP", "MySQL", "Cloud Infrastructure", "DNS Architecture"],
    summary: "Modern interactive web platform with automated cloud hosting, database optimization, and high-performance frontend architecture.",
    metrics: [
      { label: "Query Speedup", value: "30% Faster" },
      { label: "Infrastructure", value: "Cloud Staging/Live" },
      { label: "Security", value: "Automated SSL" },
      { label: "Frontend", value: "Vite SPA" }
    ],
    highlights: [
      "Diagnosed critical database schema mismatches and resolved environment configuration bottlenecks across staging and live servers.",
      "Executed full infrastructure migration to modern cloud hosting with automated SSL/TLS provisioning, backup routines, and DNS records configuration.",
      "Built responsive, interactive frontend client utilizing Vite & React for sub-second page loads.",
      "Established robust environment configuration pipelines ensuring reliable data persistence and zero data-loss transitions."
    ],
    architectureDetails: {
      framework: "Vite + React SPA client paired with robust backend services",
      database: "MySQL with optimized relational queries & indices",
      infrastructure: "Cloud hosting with automated SSL/TLS certificates and automated backups",
      features: "Interactive story reader, account management, dynamic narrative asset loader"
    }
  },
  {
    id: "feaura",
    title: "Feaura",
    tagline: "Modern Indian Women's Fashion & E-Commerce Web Experience",
    liveUrl: "https://feaura.com/",
    category: "ecommerce",
    categoryLabel: "E-Commerce & Retail",
    badge: "Production Brand",
    image: "assets/project-feaura.jpg",
    stack: ["Modern Web Architecture", "Liquid / JS", "Responsive Design", "Performance Tuning", "GTM / Analytics"],
    summary: "Fast, aesthetic women's ethnic and western fashion web platform engineered for high conversion, smooth browsing, and pocket-friendly collections.",
    metrics: [
      { label: "User Experience", value: "Mobile First" },
      { label: "Analytics", value: "GTM + Tagging" },
      { label: "Checkout Flow", value: "Frictionless" },
      { label: "Asset Loading", value: "Optimized CDN" }
    ],
    highlights: [
      "Engineered seamless, high-conversion visual merchandising layouts for contemporary fusion and ethnic collections.",
      "Implemented responsive product filters, search, and intuitive mobile drawer navigation.",
      "Optimized CDN media loading for fast delivery of high-res fashion photography across all viewports.",
      "Configured Google Tag Manager, analytics events, and metadata schemas for optimal organic discovery."
    ],
    architectureDetails: {
      frontend: "Modern performant frontend with responsive micro-animations",
      optimization: "Lazy-loaded imagery, responsive picture tags, edge CDN caching",
      analytics: "Google Tag Manager event tracking and conversion funnels",
      features: "Collection filtering, multi-image product sliders, cart drawer"
    }
  },
  {
    id: "pedals-power",
    title: "Pedals Power",
    tagline: "Modern Performance Cycling & Athletic Hardware Digital Platform",
    liveUrl: "https://www.pedalspower.com/",
    category: "ecommerce",
    categoryLabel: "E-Commerce & Retail",
    badge: "Commercial Site",
    image: "assets/project-pedals-power.jpg",
    stack: ["Modern Web Architecture", "Responsive Commerce", "Asset Delivery", "Performance Tuning"],
    summary: "Sleek, high-energy digital storefront designed for endurance cyclists and fitness enthusiasts, focusing on speed and streamlined cart UX.",
    metrics: [
      { label: "Page Speed", value: "< 1.5s Load" },
      { label: "Design Vibe", value: "High Athletic" },
      { label: "Catalog UX", value: "Instant Filter" },
      { label: "Conversion", value: "Optimized" }
    ],
    highlights: [
      "Crafted modern, dynamic cycling brand identity with high-contrast athletic colorway and telemetry-inspired design.",
      "Tuned asset pipelines to guarantee ultra-fast initial render times even with media-heavy bike specs.",
      "Engineered streamlined category pathways for bikes, indoor trainers, cycling kits, and telemetry accessories.",
      "Implemented mobile-first touch gestures and accessible interactive product showcases."
    ],
    architectureDetails: {
      frontend: "Performance-tuned web interface with responsive typography",
      speed: "Compressed assets, preloaded key fonts, and deferred non-critical scripts",
      features: "Product specifications comparison, mobile cart, customer support integration"
    }
  },
  {
    id: "peach-tassels",
    title: "Peach Tassels",
    tagline: "Affordable Luxury Fashion Jewellery & Designer Accessories",
    liveUrl: "https://peachtassels.com/",
    category: "ecommerce",
    categoryLabel: "E-Commerce & Retail",
    badge: "Brand Storefront",
    image: "assets/project-peach-tassels.jpg",
    stack: ["E-Commerce Architecture", "Modern Web UX", "CDN Asset Pipeline", "SEO & Meta Tags"],
    summary: "Elegant, stylish, and accessible digital jewelry boutique delivering rich visual curation and instant shopping experiences.",
    metrics: [
      { label: "Visual Fidelity", value: "Retina Ready" },
      { label: "Mobile UX", value: "100% Touch Tuned" },
      { label: "Brand Aesthetic", value: "Warm Luxury" },
      { label: "Shipping Funnel", value: "Direct Flow" }
    ],
    highlights: [
      "Engineered warm, boutique-style aesthetic highlighting handcrafted rings, necklaces, bangles, and earrings.",
      "Optimized media pipeline delivering crystal-clear macro jewelry photography with zero latency.",
      "Built smooth collection filtering and curated gift-guide showcases for seasonal campaigns.",
      "Structured comprehensive OpenGraph and Twitter card metadata for viral social sharing."
    ],
    architectureDetails: {
      frontend: "Curated luxury e-commerce layout with fluid micro-interactions",
      catalog: "Dynamic category sorting, variant pickers, quick-view modals",
      features: "Free shipping promo indicators, customer review widgets, secure checkout link"
    }
  }
];

// Official Production Projects (Immutable & Version Controlled)
const PROJECTS_DATA = DEFAULT_PROJECTS_DATA;

// Tech Skills Matrix Data
const TECH_SKILLS = [
  {
    category: "Frontend Engineering",
    icon: "code",
    skills: [
      { name: "React.js & React 19", level: 95, tag: "Primary" },
      { name: "Next.js (App Router, SSR/SSG)", level: 95, tag: "Primary" },
      { name: "TypeScript", level: 92, tag: "Type-Safe" },
      { name: "Tailwind CSS & Vanilla CSS", level: 94, tag: "Aesthetics" },
      { name: "HTML5 / Semantic Web", level: 96, tag: "SEO & a11y" },
      { name: "Redux Toolkit / State Mgmt", level: 88, tag: "Architecture" }
    ]
  },
  {
    category: "Backend & Systems",
    icon: "hard-drives",
    skills: [
      { name: "Node.js & Express.js", level: 92, tag: "Primary" },
      { name: "RESTful API Architecture", level: 94, tag: "Scalable" },
      { name: "WebSockets (Socket.IO)", level: 85, tag: "Real-Time" },
      { name: "Laravel (PHP)", level: 82, tag: "Backend" },
      { name: "Authentication (JWT & OTP)", level: 93, tag: "Security" },
      { name: "Rate Limiting & Bot Guard", level: 90, tag: "Protection" }
    ]
  },
  {
    category: "Databases & Caching",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 90, tag: "Relational" },
      { name: "MySQL", level: 88, tag: "SQL Query Opt" },
      { name: "Redis", level: 84, tag: "In-Memory Cache" },
      { name: "Firebase", level: 85, tag: "NoSQL & Auth" }
    ]
  },
  {
    category: "Agentic AI & LLMs",
    icon: "cpu",
    skills: [
      { name: "Antigravity IDE & Agent Workflows", level: 96, tag: "Core Edge" },
      { name: "Claude (Architectural Specs & Prompts)", level: 94, tag: "Pairing" },
      { name: "OpenAI Codex & APIs", level: 94, tag: "Code Pipeline" },
      { name: "Prompt Engineering & Mocks", level: 95, tag: "Acceleration" },
      { name: "GitHub Copilot", level: 90, tag: "Velocity" }
    ]
  },
  {
    category: "Cloud, DevOps & Tooling",
    icon: "cloud",
    skills: [
      { name: "Vercel Edge & Zero-Downtime CD", level: 94, tag: "Deployment" },
      { name: "AWS (S3 & CloudFront)", level: 86, tag: "Cloud Storage" },
      { name: "Docker & Container Basics", level: 82, tag: "DevOps" },
      { name: "Git & GitHub CI/CD", level: 92, tag: "Version Control" },
      { name: "Postman & API Testing", level: 90, tag: "Verification" }
    ]
  },
  {
    category: "Computer Science Core",
    icon: "shield",
    skills: [
      { name: "Data Structures & Algorithms", level: 88, tag: "Fundamentals" },
      { name: "Object-Oriented Design (OOD)", level: 90, tag: "Clean Code" },
      { name: "API Security & Sanitization", level: 92, tag: "Defensive" },
      { name: "Performance Tuning & Lighthouse", level: 94, tag: "95+ Standard" }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEFAULT_PROJECTS_DATA, PROJECTS_DATA, TECH_SKILLS };
}
