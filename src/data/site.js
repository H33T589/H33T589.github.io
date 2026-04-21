/** Single source of truth for portfolio copy and links */
export const site = {
  meta: {
    title: 'Heet Patel | AI, Quantum Computing & Cognitive Systems',
    description:
      'Professional portfolio for Heet Patel, an SFU student focused on artificial intelligence, quantum computing, cognitive systems, and computational models of learning.',
  },

  resume: {
    href: '/Docs/Heet_Patel_CV.pdf',
    label: 'Resume',
  },

  hero: {
    tag: 'SFU Student · AI & Cognitive Systems · Quantum Computing',
    titleLine1: 'AI, Quantum Computing,',
    titleGradient: 'and Cognitive Systems.',
    description:
      'I am a third-year SFU student in cognitive science with a computing science focus, building from a background in psychology and CS towards AI, cognitive systems, and useful software. I am especially interested in how intelligent systems perceive information, hold context, use memory, and turn those pieces into better decisions.',
    ctaProjects: { href: '#projects', label: 'View Work' },
    ctaContact: { href: '#contact', label: 'Contact' },
    quote: {
      text: 'There is nothing impossible to him who will try.',
      author: 'Alexander the Great',
    },
  },

  photos: {
    hero: [
      {
        src: '/images/img1.webp',
        alt: 'Mirror selfie portrait of Heet Patel.',
        caption: 'Heet Patel',
        detail: 'Simon Fraser University',
      },
    ],
  },

  about: {
    label: '02. PROFILE',
    title: 'Academic Foundations',
    lead:
      'I am a Simon Fraser University student building technical foundations across artificial intelligence, cognitive systems, and quantum computation.',
    paragraphs: [
      'The central direction is rigorous and interdisciplinary: neural networks, perception, language, model behavior, and the broader question of how computational systems can represent learning.',
      'Quantum computing remains a deliberate long-term interest rather than a casual side note. The goal is to keep developing strong software, mathematical, and conceptual foundations while working toward more advanced questions in intelligent and computational systems.',
    ],
    stats: [
      { label: 'Institution', value: 'Simon Fraser University' },
      { label: 'Primary Direction', value: 'AI · Cognition · Learning Systems' },
      { label: 'Long-Term Bet', value: 'Quantum Computing' },
    ],
  },

  skillsSection: {
    label: '01. FOCUS',
    title: 'Core Technical Focus',
  },

  skills: [
    {
      category: 'Artificial Intelligence',
      icon: '01',
      items: ['Neural Networks', 'Machine Learning', 'Representation Learning', 'Model Behavior'],
    },
    {
      category: 'Quantum Computing',
      icon: '02',
      items: ['Quantum Algorithms', 'Qiskit', 'Computational Models', 'Long-Term Research Direction'],
    },
    {
      category: 'Cognitive Systems',
      icon: '03',
      items: ['Perception', 'Attention', 'Memory', 'Language'],
    },
    {
      category: 'Software Engineering',
      icon: '04',
      items: ['Python', 'TypeScript', 'React', 'Django', 'FastAPI', 'PostgreSQL'],
      moreLabel: 'More software skills',
      moreItems: [
        'JavaScript',
        'Java',
        'C/C++',
        'Rust',
        'Next.js',
        'Node.js',
        'Docker',
        'Git',
        'Bash / Unix Shell',
        'Vite',
        'Tailwind CSS',
        'Prisma',
        'PHP',
        'CSS',
        'HTML5',
        'Ruby',
      ],
    },
    {
      category: 'Computational Practice',
      icon: '05',
      items: ['Simulation', 'Data Systems', 'Research Tools', 'Technical Interfaces'],
    },
  ],

  projectsSection: {
    label: '03. SELECTED WORK',
    title: 'Projects & Current Work',
  },

  githubSection: {
    enabled: false,
    label: '04. ACTIVITY',
    title: 'Contribution Activity',
    intro:
      'A live read on how often I am actually shipping public work on GitHub, focused on commit volume and active days rather than vanity metrics.',
    note:
      'This section tracks public commit activity across my owned public repositories over the last year. GitHub profile totals can still differ slightly because GitHub also counts things like pull requests, issues, reviews, and any private contributions you choose to show.',
    profileUrl: 'https://github.com/H33T589',
    author: 'H33T589',
  },

  projects: [
    {
      id: 'situate-vancouver',
      icon: '01',
      title: 'Situate Vancouver',
      featured: true,
      featuredLabel: 'Active Work',
      description:
        'A map-first city intelligence workspace for Metro Vancouver built across React, MapLibre, Django, and FastAPI. My work spans mobility lenses, transit layers, richer map interaction, frontend engineering foundations, and iOS/Android QA using Xcode and Android Studio simulators.',
      tech: ['React', 'TypeScript', 'MapLibre', 'Django', 'FastAPI', 'iOS QA', 'Android QA'],
      links: [
        {
          href: 'https://situatevancouver.com',
          label: 'Visit Website',
          external: true,
        },
        {
          href: 'https://github.com/Gabriel-Dalton/Situate-Vancouver',
          label: 'View Source',
          small: true,
          external: true,
        },
      ],
    },
    {
      id: 'spatial-audio',
      icon: '02',
      title: 'Spatial Audio Engine',
      description:
        'A Web Audio experiment around spatial perception. It makes a cognitive and perceptual idea concrete by letting audio sources move through a browser-based three-dimensional sound field.',
      tech: ['Web Audio API', 'JavaScript', 'Canvas'],
      links: [
        { href: '/spatial-audio/', label: 'Launch App', external: true },
        {
          href: 'https://github.com/H33T589/H33T589.github.io/tree/main/public/spatial-audio',
          label: 'View Source',
          small: true,
          external: true,
        },
      ],
    },
    {
      id: 'stitch-n-stab',
      icon: '03',
      title: 'Stitch-n-Stab',
      description:
        'A full-stack storefront and admin publishing workflow with product pages, image handling, database-backed listings, and deployment notes.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      links: [
        { href: 'https://stitchnstab.com', label: 'Visit Website', external: true },
        {
          href: 'https://github.com/H33T589/stitch-n-stab',
          label: 'View Source',
          small: true,
          external: true,
        },
      ],
    },
    {
      id: 'quantum-algorithms',
      icon: '04',
      title: 'Quantum Algorithms',
      description:
        "Implementations and study notes around Grover's and Shor's algorithms in Qiskit, built as part of my long-term interest in quantum computing and computational models beyond classical systems.",
      tech: ['Python', 'Qiskit', 'Math'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
    {
      id: 'derbyos-web',
      icon: '05',
      title: 'DerbyOS Web',
      description:
        'A simulation-heavy web project built around Monte Carlo race modeling, stochastic logic, and interactive state design.',
      tech: ['JavaScript', 'HTML', 'CSS', 'Simulation'],
      links: [
        { href: 'https://h33t589.github.io/DerbyOS-web/', label: 'Launch App', external: true },
        {
          href: 'https://github.com/H33T589/DerbyOS-web',
          label: 'View Source',
          small: true,
          external: true,
        },
      ],
    },
    {
      id: 'rust-cli',
      icon: '06',
      title: 'Rust Tooling Experiments',
      description:
        'A small set of Rust command-line tools and performance experiments that support my broader interest in precise, reliable technical systems.',
      tech: ['Rust', 'Shell', 'CLI'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
  ],

  contact: {
    label: '04. CONTACT',
    title: "Let's Discuss Intelligent Systems.",
    description:
      'For direct contact, professional context, or project discussion, use email, GitHub, or LinkedIn.',
    actions: [
      { href: 'mailto:hitkumarp589@gmail.com', label: 'Email Me' },
      { href: 'https://github.com/H33T589', label: 'GitHub', external: true },
      { href: 'https://www.linkedin.com/in/heet--patel', label: 'LinkedIn', external: true },
    ],
  },

  social: {
    email: 'mailto:hitkumarp589@gmail.com',
    github: 'https://github.com/H33T589',
    linkedin: 'https://www.linkedin.com/in/heet--patel',
  },
};
