/** Single source of truth for portfolio copy and links */
export const site = {
  meta: {
    title: 'Heet Patel • Cognitive Systems & AI',
    description:
      'Portfolio focused on AI and cognitive systems, with ongoing interest in Rust, systems work, and quantum computing.',
  },

  loader: {
    title: 'HEET / SFU / AI',
    initialStatus: 'Loading portfolio...',
    messages: [
      'Loading notes on intelligence...',
      'Mapping cognition to computation...',
      'Opening current work...',
      'Ready.',
    ],
  },

  hero: {
    tag: 'SFU student exploring AI, cognitive systems, Rust, and quantum computing',
    titleLine1: 'Trying to understand how',
    titleGradient: 'intelligence gets built.',
    description:
      'This portfolio centers the topics I want to keep building toward: AI, neural networks, cognition, and computational models of learning, with Rust and quantum computing remaining two long-term bets I take seriously.',
    ctaProjects: { href: '#projects', label: 'See Projects' },
    ctaContact: { href: '#contact', label: 'Get in Touch' },
  },

  photos: {
    hero: [
      {
        src: '/images/img2.webp',
        alt: 'Portrait of Heet Patel outdoors.',
        caption: 'Field notes',
        detail: 'outdoors',
      },
      {
        src: '/images/img1.webp',
        alt: 'Portrait of Heet Patel in a casual student setting.',
        caption: 'Student mode',
        detail: 'candid',
      },
      {
        src: '/images/img3.webp',
        alt: 'Close portrait of Heet Patel.',
        caption: 'Off-campus',
        detail: 'snapshot',
      },
    ],
  },

  about: {
    label: '01. NOW',
    title: 'What I Am Focused On',
    lead:
      'I am most interested in cognitive systems, AI, and questions about learning, perception, language, and intelligence. At the same time, Rust and systems work still matter to me, and quantum computing is a field I remain deeply optimistic about.',
    paragraphs: [
      'I am still early in that path, so I am focused on building real foundations rather than overstating expertise. What feels honest is saying that I am drawn to neural networks, machine learning, human-centered AI, and the way computational systems can model parts of cognition.',
      'The goal for this site is to feel like a strong student portfolio shaped by curiosity, technical ambition, and a few clear long-term interests. For me, that means AI at the center, with quantum computing and systems work still clearly part of the picture.',
    ],
    stats: [
      { label: 'Center Of Gravity', value: 'AI · Cognition · Learning' },
      { label: 'Other Bets', value: 'Quantum computing' },
      { label: 'Interested In', value: 'Neural nets · HCI · intelligent systems' },
    ],
  },

  skillsSection: {
    label: '02. INTERESTS',
    title: 'Areas I Want To Grow In',
  },

  skills: [
    {
      category: 'AI Questions',
      icon: '01',
      items: ['Neural Networks', 'Machine Learning', 'Model Behavior', 'AI Evaluation'],
    },
    {
      category: 'Cognitive Systems Lens',
      icon: '02',
      items: ['Perception', 'Attention', 'Memory', 'Language'],
    },
    {
      category: 'Current Toolkit',
      icon: '03',
      items: ['JavaScript', 'Python', 'Web Experiments', 'Data Visualization', 'Git'],
    },
    {
      category: 'Long-Term Bets',
      icon: '04',
      items: ['Quantum Computing', 'Rust', 'Systems Thinking', 'Interactive Research Tools'],
    },
  ],

  projectsSection: {
    label: '03. PROJECTS',
    title: 'Current Projects',
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
      id: 'spatial-audio',
      icon: '🎵',
      title: 'Spatial Audio Engine',
      description:
        'Real-time Web Audio API visualization. Drag sources to position sound in 3D space. Features HRTF processing, procedural presets, and an interactive particle-based UI.',
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
      id: 'quantum-algorithms',
      icon: '⚛️',
      title: 'Quantum Algorithms',
      description:
        "Implementation of Grover's and Shor's algorithms using Qiskit. Includes visualization of quantum circuit states.",
      tech: ['Python', 'Qiskit', 'Math'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
    {
      id: 'derbyos-web',
      icon: '🏇',
      title: 'DerbyOS Web',
      description:
        'High-performance Monte Carlo race simulation. Features real-time stochastic logic, a reactive glassmorphism UI, and a functional betting state system.',
      tech: ['Vanilla JS', 'HTML/CSS', 'Simulation'],
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
      icon: '🔧',
      title: 'Rust CLI Tools',
      description:
        'A suite of blazingly fast command-line utilities replacing standard GNU coreutils for specific workflows.',
      tech: ['Rust', 'Clap', 'Terminal'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
  ],

  typewriterPhrases: [
    'thinking about how models learn',
    'exploring AI through small experiments',
    'connecting cognition with computation',
    'trying to make abstract ideas concrete',
  ],

  contact: {
    label: '05. CONTACT',
    title: 'Say Hello',
    description:
      'If you want to reach out, I would keep this simple: email for direct contact, GitHub for code, LinkedIn for the more standard professional channel.',
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
