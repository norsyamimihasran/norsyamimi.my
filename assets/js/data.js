/* =========================================================
   All portfolio content lives here — edit this file to update the site.
   x / y  = position on the canvas (pixels), r = tilt in degrees
   kind   = thumbnail style: pay | gold | dash | support | doc | mobile | ai | camp | media | expense
   ========================================================= */
window.PORTFOLIO = {
  name: 'Norsyamimi Hasran',
  shortName: "SYAMIMI'S",
  tag: 'workspace',
  role: 'Software developer',
  location: 'Shah Alam, Malaysia',
  intro: 'Software developer building payment-gateway and fintech systems with PHP, Laravel, NestJS and Vue.',
  email: 'norsyamimihasran@gmail.com',
  links: [
    { label: 'Email', href: 'mailto:norsyamimihasran@gmail.com', icon: 'mail', color: '#e5484d' },
    { label: 'GitHub', href: 'https://github.com/norsyamimihasran', icon: 'github', color: '#24292f' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle', icon: 'linkedin', color: '#0a66c2' },
  ],

  about: [
    'IT Operational Executive at ToyyibPay, where I build and maintain payment-gateway and gold-investment platforms end to end, from PHP and Laravel backends and API integrations to Vue frontends.',
    'Computer Science graduate of UiTM, with experience across software development, project coordination (UAT/FAT) and hands-on technical support.',
  ],

  skills: {
    'Languages': ['PHP', 'SQL', 'JavaScript', 'TypeScript', 'HTML & CSS', 'C#', 'Python', 'Java'],
    'Frameworks': ['Laravel', 'CodeIgniter', 'NestJS', 'Vue 3', 'Tailwind CSS', 'Prisma', 'WordPress'],
    'Tools': ['Git · GitHub · GitLab', 'MariaDB', 'Redis', 'SQL Server', 'Laragon', 'Node.js · pnpm', 'DBeaver'],
    'Speaks': ['Bahasa Melayu', 'English'],
  },

  education: [
    { title: 'Bachelor of Computer Science', org: 'Universiti Teknologi MARA, Jasin', period: '2021 – 2023' },
    { title: 'Diploma in Computer Science', org: 'Universiti Teknologi MARA, Segamat', period: '2018 – 2021' },
  ],

  achievement: {
    year: '2023',
    title: 'Gold Award',
    detail: 'International Jasin Multimedia and Computer Science Invention and Innovation Exhibition (I-JAMCSIIX)',
  },

  leadership: {
    title: 'Jawatankuasa Perwakilan Komander Kesatria',
    org: 'UiTM Segamat',
    roles: ['Biro Korporat, 2018 – 2019', 'Biro Usahawan, 2018 – 2019'],
  },

  experience: [
    {
      role: 'IT Operational Executive', org: 'ToyyibPay Sdn. Bhd.', period: 'Sep 2025 – Present',
      points: [
        'Develop, maintain and enhance the ToyyibPay payment gateway: frontend, backend, modules, plugins and admin system.',
        'Build API integrations; test requests and responses and troubleshoot integration errors.',
        'Design database structures and write SQL queries and operations.',
        'Fix bugs and ship enhancements on the TimurGX and PasGold gold platforms (NestJS, Vue 3).',
        'Collaborate through Git branches, pull requests and code reviews; support UAT and staging.',
        'Support merchants and external developers on payments, refunds and API usage.',
      ],
    },
    {
      role: 'IT Executive', org: 'Industrial Quality Management Sdn. Bhd.', period: 'Apr 2025 – Sep 2025',
      points: [
        'Project management for HRMS and ERP systems: plans, timelines and Gantt charts.',
        'Coordinated internal teams, vendors and clients; tracked milestones and progress.',
        'Took part in UAT and FAT to ensure system reliability.',
        'PC, network, router/switch and Wi-Fi setup and troubleshooting.',
      ],
    },
    {
      role: 'Protege, Application Development', org: 'Redtone Engineering & Network Services Sdn. Bhd.', period: '2024 – 2025',
      points: [
        'Assigned to the Sistem Pengurusan Mail Relay (SPMR) and MyGovUC 3.0 projects.',
        'Managed project documentation, including technical reports.',
        'Managed UAT and FAT, and monitored deliverable quality against requirements.',
      ],
    },
    {
      role: 'Protege, Software Developer', org: 'Advanced Air Traffic Systems (M) Sdn. Bhd.', period: '2023 – 2024',
      points: [
        'Developed a Travel Expenses system (frontend and backend) in C#, PHP, JavaScript and SQL Server.',
        'Gathered requirements with the project manager, IT and Finance teams.',
        'Designed database structures; tested, debugged and optimised code.',
      ],
    },
    {
      role: 'Intern, Registration Department', org: 'Universiti Sains Islam Malaysia', period: 'Internship',
      points: [
        'Prepared the User Requirement Specification (URS) for the ePRESTASI system.',
        'Developed a File Tracking system using PHP, SQL and JavaScript.',
      ],
    },
    {
      role: 'Intern, Multimedia Department', org: 'Pejabat Pendidikan Daerah Sepang', period: 'Internship',
      points: ['Designed educational posters.', 'Assisted in producing a corporate video.'],
    },
  ],

  /* ---------- Canvas groups ---------- */
  groups: [
    { label: 'At ToyyibPay', x: 380, y: 990 },
    { label: 'Earlier work', x: 2950, y: 960 },
    { label: 'University projects', x: 1450, y: 1880 },
  ],

  projects: [
    // --- ToyyibPay ---
    {
      x: 380, y: 1070, r: -3, kind: 'pay', hue: 214,
      title: 'ToyyibPay Payment Gateway', caption: 'Backend | Frontend | API',
      meta: 'ToyyibPay Sdn. Bhd. · 2025 – Present',
      tech: ['PHP (CodeIgniter)', 'Laravel', 'SQL', 'WordPress', 'JavaScript'],
      points: [
        'Develop, maintain and enhance the gateway: frontend, backend, payment modules, plugins and admin system.',
        'Integrate APIs to exchange data between systems, and test requests and responses.',
        'Design database structures, write SQL queries and run database operations.',
        'Troubleshoot issues, ship bug fixes and keep code secure, performant and to standard.',
      ],
    },
    {
      x: 740, y: 1110, r: 2.5, kind: 'gold', hue: 42,
      title: 'TimurGX', caption: 'Gold Investment Platform',
      meta: 'ToyyibPay Sdn. Bhd.',
      tech: ['NestJS', 'TypeScript', 'Prisma', 'MariaDB', 'Vue 3', 'Vite', 'Tailwind CSS'],
      points: [
        'Fixed bugs and built frontend and backend enhancements.',
        'Worked on the ToyyibPay, Tariq (virtual account) and gold-price API integrations.',
      ],
    },
    {
      x: 410, y: 1450, r: 2, kind: 'dash', hue: 28,
      title: 'PasGold', caption: 'White-label Gold Partner Platform',
      meta: 'ToyyibPay Sdn. Bhd.',
      tech: ['NestJS', 'TypeScript', 'Prisma', 'Redis', 'MariaDB', 'Vue 3', 'Tailwind CSS'],
      points: [
        'Fixed bugs and built frontend and backend enhancements.',
        'Supported integration with the TimurGX partner API and the ToyyibPay gateway.',
      ],
    },
    {
      x: 770, y: 1480, r: -2, kind: 'support', hue: 160,
      title: 'Merchant & API Support', caption: 'Customer Experience | Integrations',
      meta: 'ToyyibPay Sdn. Bhd.',
      tech: ['API troubleshooting', 'Payments', 'Issue tracking'],
      points: [
        'Guide customers through login, registration, packages and transaction issues.',
        'Investigate failed payments, refunds and transaction status inquiries.',
        'Help external developers with API usage and integration requirements.',
        'Escalate, follow up and record recurring issues until they are resolved.',
      ],
    },

    // --- Earlier work ---
    {
      x: 2950, y: 1040, r: 2, kind: 'expense', hue: 265,
      title: 'Travel Expenses System', caption: 'Full-stack | Finance',
      meta: 'Advanced Air Traffic Systems (M) · 2023 – 2024',
      tech: ['C#', 'SQL Server', 'PHP', 'JavaScript', 'HTML'],
      points: [
        'Built the frontend and backend of an internal travel-expenses system.',
        'Mapped requirements, calculations and system flow with the Finance and IT teams.',
        'Designed database structures and maintained the system as requirements changed.',
      ],
    },
    {
      x: 3310, y: 1080, r: -2.5, kind: 'doc', hue: 190,
      title: 'SPMR & MyGovUC 3.0', caption: 'Project QA | UAT · FAT',
      meta: 'Redtone Engineering & Network Services · 2024 – 2025',
      tech: ['Documentation', 'UAT', 'FAT', 'Quality assurance'],
      points: [
        'Assigned to the Sistem Pengurusan Mail Relay (SPMR) and MyGovUC 3.0 projects.',
        'Managed project documentation and technical reports.',
        'Ran UAT and FAT, and checked deliverables against requirements.',
      ],
    },
    {
      x: 2970, y: 1420, r: -1.5, kind: 'dash', hue: 330,
      title: 'HRMS & ERP Rollout', caption: 'Project Management | IT Support',
      meta: 'Industrial Quality Management · 2025',
      tech: ['Gantt charts', 'UAT / FAT', 'Networking'],
      points: [
        'Prepared project plans, timelines and Gantt charts for HRMS and ERP systems.',
        'Coordinated teams, vendors and clients, and tracked progress against milestones.',
        'Set up PCs and networks, and troubleshot routers, switches and Wi-Fi.',
      ],
    },
    {
      x: 3330, y: 1450, r: 3, kind: 'doc', hue: 100,
      title: 'File Tracking System', caption: 'Web App | Requirements',
      meta: 'Universiti Sains Islam Malaysia · Internship',
      tech: ['PHP', 'SQL', 'JavaScript'],
      points: [
        'Developed a file tracking system for the Registration Department.',
        'Prepared the User Requirement Specification (URS) for the ePRESTASI system.',
      ],
    },
    {
      x: 3150, y: 1800, r: -2, kind: 'media', hue: 10,
      title: 'Education Posters & Video', caption: 'Multimedia | Design',
      meta: 'Pejabat Pendidikan Daerah Sepang · Internship',
      tech: ['Graphic design', 'Video'],
      points: ['Designed posters for educational campaigns.', 'Assisted in producing a corporate video.'],
    },

    // --- University ---
    {
      x: 1450, y: 1960, r: -2.5, kind: 'ai', hue: 285,
      title: '5W Sign Language → Text', caption: 'Final Year Project | Deep Learning',
      meta: 'UiTM Jasin · Final Year Project',
      tech: ['Python', 'YOLOv3', 'Google Colab', 'HTML'],
      points: [
        'An object detection system that translates the 5W signs (who, what, when, where, why) into text.',
        'Trained a YOLOv3 deep-learning model in Google Colab.',
      ],
    },
    {
      x: 1810, y: 2000, r: 2, kind: 'mobile', hue: 175,
      title: 'Task Management App', caption: 'Android | Mobile',
      meta: 'UiTM · University project',
      tech: ['Java', 'Android Studio', 'XML'],
      points: ['A mobile app where users log in and organise their tasks easily.'],
    },
    {
      x: 2170, y: 1960, r: -1.5, kind: 'camp', hue: 130,
      title: 'Camping Management System', caption: 'Web App | Reservations',
      meta: 'UiTM · University project',
      tech: ['Java', 'Eclipse', 'HTML'],
      points: ['A web app where users log in and reserve a camping site.'],
    },
  ],
};
