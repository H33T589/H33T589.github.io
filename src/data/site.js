/** Single source of truth for portfolio copy and links */
export const site = {
  meta: {
    title: 'Heet Patel • AI, Cognition, and Learning',
    description:
      'Student portfolio focused on AI, cognitive systems, computational models of learning, and quantum computing.',
  },

  loader: {
    title: 'HEET / AI / NOTES',
    initialStatus: 'Preparing portfolio...',
    messages: [
      'Loading current direction...',
      'Indexing projects and experiments...',
      'Laying out field notes...',
      'Ready.',
    ],
  },

  hero: {
    tag: 'SFU student exploring AI, cognitive systems, and computational models of learning',
    status: 'Spring 2026',
    code: 'Learning ledger',
    titleLine1: 'Heet Patel',
    titleGradient: 'AI, cognition, and computational learning.',
    description:
      'I am most interested in neural networks, perception, language, and the broader question of how intelligent systems learn. This portfolio is a student record of that direction: honest, experimental, and still early, with quantum computing staying visible as a long-term bet.',
    ctaProjects: { href: '#projects', label: 'See Projects' },
    ctaContact: { href: '#contact', label: 'Get in Touch' },
    metrics: [
      { label: 'Center of gravity', value: 'AI + cognitive systems' },
      { label: 'Current questions', value: 'Learning, language, perception' },
      { label: 'Building mode', value: 'Small experiments, clear foundations' },
      { label: 'Long-term bet', value: 'Quantum computing' },
    ],
  },

  photos: {
    hero: [
      {
        src: '/images/img1.webp',
        alt: 'Mirror selfie of Heet Patel wearing a hoodie.',
        caption: 'Between Lectures',
        detail: 'student portrait',
      },
    ],
  },

  fieldLog: {
    title: 'Field log',
    subtitle: 'Current notes',
    entries: [
      {
        time: '08:10',
        label: 'FOCUS',
        message:
          'The site now frames me as a student working toward AI and cognitive systems, not as a generic builder persona.',
      },
      {
        time: '09:25',
        label: 'READ',
        message:
          'Most of my curiosity is pulled toward neural networks, representation, model behavior, and computational accounts of learning.',
      },
      {
        time: '11:05',
        label: 'BUILD',
        message:
          'Projects are the practical side of that interest: small tools, simulations, interface experiments, and public code.',
      },
      {
        time: '13:20',
        label: 'TRACK',
        message:
          'Quantum computing stays here as a real long-term direction, but not as a replacement for the AI core of the portfolio.',
      },
      {
        time: '15:40',
        label: 'MODE',
        message:
          'The honest posture is still early-stage: curious, technically ambitious, and explicit about building foundations first.',
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
  },

  dashboard: {
    statusTitle: 'Current focus',
    statuses: [
      { label: 'AI reading stack', value: 'Active', progress: 88 },
      { label: 'Project experiments', value: 'In motion', progress: 76 },
      { label: 'Research direction', value: 'Getting sharper', progress: 64 },
    ],
    activeNode: {
      label: 'Current project node',
      title: 'Situate Vancouver',
      description:
        'A live contribution thread across React, MapLibre, Django, and FastAPI, with work around city intelligence, transit layers, and frontend interaction.',
      action: { href: '#projects', label: 'Open Project Board' },
    },
  },

  skillsSection: {
    label: '02. RESEARCH LANES',
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
    intro:
      'A mix of active contributions and smaller computational experiments. The emphasis is less on polished product framing and more on what each project lets me learn.',
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
      category: 'Active contribution',
      title: 'Situate Vancouver',
      featured: true,
      featuredLabel: 'Active now',
      tone: 'sage',
      description:
        'A map-first city intelligence workspace for Metro Vancouver built across React, MapLibre, Django, and FastAPI, with work spanning mobility lenses, transit layers, richer map interaction, and frontend engineering foundations.',
      tech: ['React', 'MapLibre', 'Django', 'FastAPI'],
      links: [
        {
          href: 'https://situatevancouver.com',
          label: 'Visit Website',
          external: true,
        },
        {
          href: 'https://github.com/Gabriel-Dalton/Situate-Vancouver',
          label: 'View Project',
          external: true,
        },
      ],
    },
    {
      id: 'spatial-audio',
      icon: '02',
      category: 'Perception experiment',
      title: 'Spatial Audio Engine',
      tone: 'sand',
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
      icon: '03',
      category: 'Long-term direction',
      title: 'Quantum Algorithms',
      tone: 'linen',
      description:
        "Implementations of Grover's and Shor's algorithms in Qiskit, built as part of my long-term interest in quantum computing and computational models beyond classical systems.",
      tech: ['Python', 'Qiskit', 'Math'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
    {
      id: 'derbyos-web',
      icon: '04',
      category: 'Simulation study',
      title: 'DerbyOS Web',
      tone: 'clay',
      description:
        'A simulation-heavy web project built around Monte Carlo race modeling, stochastic logic, and interactive state design. It reflects how I like learning by turning abstract systems into runnable experiments.',
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
      icon: '05',
      category: 'Tooling interest',
      title: 'Rust Tooling Experiments',
      tone: 'ink',
      description:
        'A small set of Rust command-line tools and performance experiments. Tooling work is still part of how I learn, even if it is no longer the center of the portfolio framing.',
      tech: ['Rust', 'Clap', 'CLI'],
      links: [{ href: 'https://github.com/H33T589', label: 'View Code', external: true }],
    },
  ],

  typewriterPhrases: [
    'thinking about how learning systems form representations',
    'exploring perception, language, and model behavior',
    'building small experiments to make abstract questions concrete',
    'keeping quantum computing in view as a long-term bet',
  ],

  contact: {
    label: '05. CONTACT',
    title: 'Say Hello',
    description:
      'The contact section stays simple: email for direct contact, GitHub for code, and LinkedIn for the standard professional channel.',
    actions: [
      { href: 'mailto:hitkumarp589@gmail.com', label: 'Email Me' },
      { href: 'https://github.com/H33T589', label: 'GitHub', external: true },
      { href: 'https://www.linkedin.com/in/heet--patel', label: 'LinkedIn', external: true },
    ],
    location: 'Based in British Columbia',
  },

  footer: {
    note: 'Student portfolio focused on AI, cognition, and computational models of learning.',
    status: 'Portfolio status: active',
    version: 'Edition 2026.1',
  },

  social: {
    email: 'mailto:hitkumarp589@gmail.com',
    github: 'https://github.com/H33T589',
    linkedin: 'https://www.linkedin.com/in/heet--patel',
  },
};
