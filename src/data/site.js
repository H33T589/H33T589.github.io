/** Single source of truth for portfolio copy and links */
export const site = {
  meta: {
    title: 'Heet • Rust & Quantum Systems',
    description:
      'Rust developer and quantum enthusiast — high-performance computing, memory safety, and quantum algorithms.',
  },

  hero: {
    tag: 'Rust Developer & Quantum Enthusiast',
    titleLine1: 'Building systems at the',
    titleGradient: 'intersection of logic.',
    description:
      'Specialized in high-performance computing, memory safety, and quantum algorithms. Turning complex problems into efficient code.',
    ctaProjects: { href: '#projects', label: 'View Projects' },
    ctaContact: { href: '#contact', label: 'Init Contact' },
  },

  about: {
    label: '00. PROFILE',
    title: 'About',
    lead:
      'I build reliable, fast software where correctness matters — from systems-level Rust to quantum experiments in Qiskit.',
    paragraphs: [
      'My work sits at the overlap of performance engineering and curiosity-driven research: squeezing efficiency out of runtimes, keeping memory safety first-class, and exploring what quantum circuits can do in practice.',
      'When I am not deep in a compiler error or a circuit diagram, I ship interactive web demos — spatial audio, simulations, and tools that feel good to use.',
    ],
    stats: [
      { label: 'Focus', value: 'Systems · HPC · Quantum' },
      { label: 'Languages', value: 'Rust · Python · TypeScript' },
      { label: 'Stack', value: 'Linux · Docker · Web platform' },
    ],
  },

  skillsSection: {
    label: '01. CAPABILITIES',
    title: 'Tech Stack',
  },

  skills: [
    {
      category: 'Languages',
      icon: '🦀',
      items: ['Rust', 'Python', 'TypeScript', 'C++', 'Solidity'],
    },
    {
      category: 'Quantum & Systems',
      icon: '⚛️',
      items: ['Qiskit', 'Linux', 'Docker', 'Shell Scripting'],
    },
    {
      category: 'Web & Tools',
      icon: '🚀',
      items: ['Next.js', 'React', 'Node.js', 'Git', 'Vim'],
    },
  ],

  projectsSection: {
    label: '02. REPOSITORY',
    title: 'Featured Projects',
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

  typewriterPhrases: ['> cargo build', '> python main.py', '> qiskit assemble', "> git commit -m 'Initial'"],

  contact: {
    label: '03. COMMUNICATION',
    title: 'Secure Channel',
  },

  terminal: {
    welcome: [
      "Welcome to Heet's secure terminal.",
      'Establishing connection...',
      'Connection established.',
      '',
      'Type your message below to send a transmission.',
      'Available commands: just type normally and hit Enter.',
    ],
    email: 'hitkumarp589@gmail.com',
    emailSubject: 'Portfolio Inquiry',
  },

  social: {
    email: 'mailto:hitkumarp589@gmail.com',
    github: 'https://github.com/H33T589',
    linkedin: 'https://www.linkedin.com/in/heet--patel',
  },
};
