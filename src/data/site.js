/** Single source of truth for portfolio copy and links */
export const site = {
  meta: {
    title: 'Heet Patel • Cognitive Systems & AI',
    description:
      'Student portfolio focused on AI, cognitive systems, computational models of learning, and quantum computing.',
  },

  loader: {
    title: 'HEET / SFU / AI',
    initialStatus: 'Loading portfolio...',
    messages: [
      'Loading notes on learning...',
      'Mapping cognition to computation...',
      'Opening current experiments...',
      'Ready.',
    ],
  },

  hero: {
    tag: 'SFU student exploring AI, cognitive systems, and computational models of learning',
    titleLine1: 'Trying to understand how',
    titleGradient: 'intelligence gets built.',
    description:
      'This site tracks the direction I want to grow into: AI, neural networks, perception, language, and computational approaches to cognition. Quantum computing remains a long-term bet, and I still like building tools and experiments along the way.',
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
      'I am most interested in AI and cognitive systems, especially questions about learning, perception, language, and how computational systems can model parts of intelligence.',
    paragraphs: [
      'I am still early in that path, so the priority is building real foundations rather than overstating expertise. What feels most honest is saying that I am drawn to neural networks, machine learning, model behavior, and the broader question of how minds and models learn.',
      'The portfolio is meant to read like a thoughtful student record of that direction: experimental, technically ambitious, and clear about what sits at the center. For me, that means AI first, cognition close behind it, and quantum computing as an important long-term interest.',
    ],
    stats: [
      { label: 'Center Of Gravity', value: 'AI · Cognition · Learning' },
      { label: 'Current Questions', value: 'Perception · Language · Model behavior' },
      { label: 'Long-Term Bet', value: 'Quantum computing' },
    ],
  },

  skillsSection: {
    label: '02. INTERESTS',
    title: 'Areas I Am Exploring',
  },

  skills: [
    {
      category: 'AI Questions',
      icon: '01',
      items: ['Neural Networks', 'Machine Learning', 'Representation Learning', 'AI Evaluation'],
    },
    {
      category: 'Cognitive Systems Lens',
      icon: '02',
      items: ['Perception', 'Attention', 'Memory', 'Language'],
    },
    {
      category: 'Current Practice',
      icon: '03',
      items: ['Python', 'JavaScript', 'Small AI Experiments', 'Data Visualization'],
    },
    {
      category: 'Long-Term Direction',
      icon: '04',
      items: ['Quantum Computing', 'Cognitive Modeling', 'Research Tools', 'Human-Centered AI'],
    },
  ],

  projectsSection: {
    label: '03. PROJECTS',
    title: 'Selected Projects & Current Work',
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
      icon: '🗺️',
      title: 'Situate Vancouver',
      featured: true,
      featuredLabel: '★ Active Now',
      description:
        'An active project I am contributing to right now: a map-first city intelligence workspace for Metro Vancouver built across React, MapLibre, Django, and FastAPI, with work spanning mobility lenses, transit layers, richer map interaction, and frontend engineering foundations.',
      tech: ['React', 'MapLibre', 'Django', 'FastAPI'],
      links: [
        {
          href: 'https://github.com/Gabriel-Dalton/Situate-Vancouver',
          label: 'View Project',
          external: true,
        },
      ],
    },
    {
      id: 'spatial-audio',
      icon: '🎵',
      title: 'Spatial Audio Engine',
      description:
        'An interactive Web Audio experiment around spatial perception. It lets you position sources in 3D space, hear the scene shift in real time, and make a perceptual idea concrete in the browser.',
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
        "Implementations of Grover's and Shor's algorithms in Qiskit, built as part of my long-term interest in quantum computing and computational models beyond classical systems.",
      tech: ['Python', 'Qiskit', 'Math'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
    {
      id: 'derbyos-web',
      icon: '🏇',
      title: 'DerbyOS Web',
      description:
        'A simulation-heavy web project built around Monte Carlo race modeling, stochastic logic, and interactive state design. It is less directly AI-focused, but it reflects how I like learning through computational experiments.',
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
      title: 'Rust Tooling Experiments',
      description:
        'A small set of Rust command-line tools and performance experiments. Tooling work is no longer the center of this site, but it still captures part of how I learn by building.',
      tech: ['Rust', 'Clap', 'Terminal'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
  ],

  typewriterPhrases: [
    'thinking about learning and representation',
    'exploring perception through computation',
    'building small AI and interface experiments',
    'trying to make abstract questions concrete',
  ],

  contact: {
    label: '05. CONTACT',
    title: 'Say Hello',
    description:
      'If you want to reach out, I would keep it simple: email for direct contact, GitHub for code, and LinkedIn for the standard professional channel.',
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
