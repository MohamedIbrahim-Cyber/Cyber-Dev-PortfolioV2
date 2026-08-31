export type Language = 'en' | 'ar';

export interface TranslationSchema {
  nav: {
    about: string;
    projects: string;
    skills: string;
    services: string;
    contact: string;
    downloadCv: string;
    themeToggle: string;
    langToggle: string;
    mobileMenu: string;
    closeMenu: string;
  };
  hero: {
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    subtitleP1: string;
    subtitleName: string;
    subtitleP2: string;
    exploreBtn: string;
  };
  terminal: {
    fileName: string;
    whoAmI: string;
    whoAmIVal: string;
    focusCmd: string;
    coreKey: string;
    coreVals: string[];
    toolsKey: string;
    toolsVals: string[];
  };
  about: {
    badge: string;
    title: string;
    titleAccent: string;
    bioP1: string;
    bioP2: string;
    location: string;
    focus: string;
    hardwareInterest: string;
    hardwareInterestDesc: string;
    videoInterest: string;
    videoInterestDesc: string;
    stats: Array<{
      value: string;
      label: string;
      subtitle: string;
      isAccent?: boolean;
    }>;
    mosaic: Array<{
      tag: string;
      title: string;
      desc: string;
      iconType: 'edu' | 'cpu' | 'ui' | 'ethos';
    }>;
  };
  projects: {
    title: string;
    viewGithub: string;
    liveDemo: string;
    githubRepo: string;
    exploreRepo: string;
    viewSource: string;
    designRepo: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      tags: string[];
      metrics?: string;
      terminalOutput?: {
        cmd: string;
        stdout: string[];
      };
      badgeText?: string;
    }>;
  };
  skills: {
    title: string;
    activeDeepDive: string;
    categories: Array<{
      title: string;
      skills: string[];
      isFocus?: boolean;
    }>;
  };
  services: {
    title: string;
    deliverablesLabel: string;
    discussProject: string;
    clickToInquire: string;
    items: Array<{
      id: string;
      iconName: string;
      title: string;
      description: string;
      deliverables: string[];
      inquiryMessage: string;
    }>;
  };
  contact: {
    title: string;
    directContact: string;
    heading: string;
    description: string;
    emailLabel: string;
    copy: string;
    copied: string;
    socialProfiles: string;
    sendMessage: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailPlaceholder: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sentSuccessTitle: string;
    sentSuccessDesc: string;
    sendAnother: string;
  };
  footer: {
    role: string;
    university: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      services: 'Services',
      contact: 'Contact',
      downloadCv: 'Download CV',
      themeToggle: 'Switch Theme',
      langToggle: 'العربية',
      mobileMenu: 'Navigation Menu',
      closeMenu: 'Close menu',
    },
    hero: {
      titlePrefix: 'Building web systems, ',
      titleAccent: 'crafting interfaces',
      titleSuffix: ' & exploring low-level hardware.',
      subtitleP1: 'Hi, I’m ',
      subtitleName: 'Mohamed Ibrahim',
      subtitleP2: ' (CyberDev) — a Computer Science & AI student at Capital University, Helwan, Cairo crafting resilient web architectures, accessible UI systems, and high-performance C/C++ utilities.',
      exploreBtn: 'Explore Featured Work',
    },
    terminal: {
      fileName: 'Status.sh',
      whoAmI: 'whoAmI',
      whoAmIVal: 'CyberDev . CS Student & Web Developer',
      focusCmd: 'cat current_focus.json',
      coreKey: 'core',
      coreVals: ['Web Architecture', 'UI Systems'],
      toolsKey: 'tools',
      toolsVals: ['HTML5', 'CSS Grid', 'JS ES6+', 'Figma'],
    },
    about: {
      badge: 'Who Am I?',
      title: 'About ',
      titleAccent: 'Me',
      bioP1: 'I’m Mohamed Ibrahim, a student at the Faculty of Computers and Artificial Intelligence, Capital University, Helwan, Cairo and a Front-End Developer.',
      bioP2: 'Besides programming, I explore low-level hardware prototyping, build web interfaces, and simplify complex technical concepts, believing that knowledge grows when shared.',
      location: 'Cairo, Egypt',
      focus: 'Front-End & Systems',
      hardwareInterest: 'Hardware Prototyping',
      hardwareInterestDesc: 'Microcontrollers & Embedded Circuits',
      videoInterest: 'Video Editing',
      videoInterestDesc: 'Visual Storytelling & Motion Cuts',
      stats: [
        {
          value: '∞',
          label: 'Cups of Coffee',
          subtitle: 'Fueling late-night debugging',
          isAccent: true,
        },
        {
          value: '5+',
          label: 'Projects Shipped',
          subtitle: 'Web apps & low-level tools',
          isAccent: false,
        },
        {
          value: '2+',
          label: 'Years of Experience',
          subtitle: 'Frontend & Systems engineering',
          isAccent: false,
        },
      ],
      mosaic: [
        {
          tag: 'Education',
          title: 'Capital University, Helwan, Cairo',
          desc: 'Faculty of Computers & Artificial Intelligence (FCAI)',
          iconType: 'edu',
        },
        {
          tag: 'Low-Level Tinkering',
          title: 'Systems & Firmware',
          desc: 'Memory architecture, microcontroller protocols (I2C/SPI) & performant C++.',
          iconType: 'cpu',
        },
        {
          tag: 'Frontend Standards',
          title: 'Clean UI Systems',
          desc: 'Semantic HTML5, CSS Grid architectures, and fluid responsive layouts.',
          iconType: 'ui',
        },
        {
          tag: 'Engineering Ethos',
          title: 'Knowledge Growth',
          desc: '“Knowledge grows when shared” — building open, documented software tools.',
          iconType: 'ethos',
        },
      ],
    },
    projects: {
      title: 'Featured Projects',
      viewGithub: 'View GitHub',
      liveDemo: 'Live Demo',
      githubRepo: 'GitHub',
      exploreRepo: 'Explore Repo',
      viewSource: 'View Source',
      designRepo: 'Design Repository',
      items: [
        {
          id: 'course-organizer',
          title: 'Course Organizer & Academic Scheduler',
          description: 'An intuitive course management system designed for university students to structure lecture schedules, track assignments, and calculate cumulative GPA dynamically.',
          tags: ['HTML5', 'CSS Grid', 'JavaScript (ES6+)', 'Vercel'],
        },
        {
          id: 'c-memory-allocator',
          title: 'FastPath C/C++ Custom Memory Allocator',
          description: 'A high-efficiency heap memory allocator implementation exploring buddy allocation, free-list coalescing, and cache-aligned paging benchmarks.',
          tags: ['C++', 'Systems Architecture', 'Linux API', 'Memory Management'],
          terminalOutput: {
            cmd: './benchmark_alloc --iterations=100000',
            stdout: [
              'Allocated 100k blocks in 4.2ms',
              'Heap fragmentation: < 2.4%',
              'Throughput: 23.8M ops/sec [PASS]',
            ],
          },
        },
        {
          id: 'iot-telemetry-controller',
          title: 'ESP32 Embedded Telemetry Hub',
          description: 'Firmware prototype interfacing environmental sensors over I2C/SPI, broadcasting real-time data packets via MQTT broker to a web telemetry canvas.',
          tags: ['Embedded C++', 'ESP32', 'MQTT', 'Hardware Prototyping'],
          metrics: '< 8ms sensor packet latency over Wi-Fi',
        },
        {
          id: 'responsive-ui-engine',
          title: 'CyberDesign Fluid Component System',
          description: 'An accessible, responsive design library prioritizing WCAG AAA contrast, fluid typography formulas, smooth keyboard navigation, and zero-layout-shift micro-animations.',
          tags: ['TypeScript', 'CSS Variables', 'Figma', 'Accessibility (WCAG)'],
          badgeText: 'Responsive Design',
        },
      ],
    },
    skills: {
      title: 'Technical Stack & Capabilities',
      activeDeepDive: 'Active Deep Dive',
      categories: [
        {
          title: 'Languages',
          skills: ['C', 'C++', 'JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'],
        },
        {
          title: 'Frontend & UI Architecture',
          skills: ['HTML5 Semantic', 'CSS Grid & Flexbox', 'Tailwind CSS', 'React.js', 'DOM Performance', 'Figma Design Systems'],
        },
        {
          title: 'Systems & Infrastructure',
          skills: ['Git & GitHub Workflow', 'Linux / Bash Scripting', 'REST APIs', 'Vite', 'Node.js', 'Hardware Prototyping'],
        },
        {
          title: 'Currently Deep Diving',
          isFocus: true,
          skills: [
            'Embedded Systems with C++',
            'Advanced TypeScript Generics',
            'React 19 & State Concurrency',
            'Low-Level Networking & Sockets',
          ],
        },
      ],
    },
    services: {
      title: 'Services',
      deliverablesLabel: 'Deliverables',
      discussProject: 'Discuss a project',
      clickToInquire: 'Inquire for this service',
      items: [
        {
          id: 'frontend-arch',
          iconName: 'Layout',
          title: 'Modern Web & UI Engineering',
          description: 'Building responsive, blazing-fast web interfaces with rock-solid semantic structure, fluid layouts, and zero-layout-shift responsive systems.',
          deliverables: ['Single-Page Applications', 'Accessible Design Systems', 'Interactive Dashboards', 'Performance Audits'],
          inquiryMessage: "Hello Mohamed, I'd like to discuss a Modern Web & UI Engineering project with you.",
        },
        {
          id: 'fullstack-website',
          iconName: 'Globe',
          title: 'Full Stack Website Service',
          description: 'End-to-end web applications crafted from modern reactive front-ends to scalable backend services, API integrations, and robust database architecture.',
          deliverables: ['Custom Web Applications', 'API & Backend Integration', 'Database & Auth Systems', 'Performance & SEO Optimization'],
          inquiryMessage: "Hello Mohamed, I'm interested in building a Full Stack Website project with you.",
        },
        {
          id: 'automation-service',
          iconName: 'Zap',
          title: 'Automation Service',
          description: 'Automating repetitive workflows, web data extraction, system scripts, and developer pipelines using robust Python, Bash, and Node.js toolchains.',
          deliverables: ['Python & Bash Automations', 'Data Scraping & Extraction', 'Custom Workflow Bots & Scripts', 'Deployment & CI/CD Pipelines'],
          inquiryMessage: "Hello Mohamed, I have an Automation Service inquiry regarding scripting & workflow automation.",
        },
      ],
    },
    contact: {
      title: 'Contact',
      directContact: 'Direct Contact',
      heading: 'Available for internships, freelance & technical discussions.',
      description: 'Whether you have an inquiry about a project or want to collaborate, feel free to reach out.',
      emailLabel: 'Email',
      copy: 'Copy',
      copied: 'Copied',
      socialProfiles: 'Social Profiles',
      sendMessage: 'Send a Message',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Alex',
      emailInputLabel: 'Your Email Address',
      emailPlaceholder: 'e.g. alex@example.com',
      whatsappLabel: 'WhatsApp Number',
      whatsappPlaceholder: '+20 10 1234 5678',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your project or inquiry...',
      sendButton: 'Send Message',
      sentSuccessTitle: 'Message Sent!',
      sentSuccessDesc: 'Thank you for reaching out. I will get back to you shortly.',
      sendAnother: 'Send another message',
    },
    footer: {
      role: 'CyberDev // Mohamed Ibrahim',
      university: 'Faculty of Computers & AI, Capital University, Helwan, Cairo',
      rights: 'CyberDev. MIT License.',
    },
  },
  ar: {
    nav: {
      about: 'عني',
      projects: 'المشاريع',
      skills: 'المهارات',
      services: 'الخدمات',
      contact: 'تواصل معي',
      downloadCv: 'تحميل السيرة الذاتية',
      themeToggle: 'تبديل المظهر',
      langToggle: 'English',
      mobileMenu: 'قائمة التصفح',
      closeMenu: 'إغلاق القائمة',
    },
    hero: {
      titlePrefix: 'بناء أنظمة الويب، ',
      titleAccent: 'تصميم وتطوير الواجهات',
      titleSuffix: ' واستكشاف العتاد والأنظمة المدمجة.',
      subtitleP1: 'أهلاً بك، أنا ',
      subtitleName: 'محمد إبراهيم',
      subtitleP2: ' (CyberDev) — طالب بكلية الحاسبات والذكاء الاصطناعي بجامعة كابيتال (حلوان، القاهرة)، متخصص في بناء معماريات الويب الحديثة، أنظمة الواجهات المتقنة، وتطوير برمجيات C/C++ عالية الأداء.',
      exploreBtn: 'استكشف أبرز الأعمال',
    },
    terminal: {
      fileName: 'Status.sh',
      whoAmI: 'whoAmI',
      whoAmIVal: 'CyberDev . مطور واجهات وطالب حاسبات',
      focusCmd: 'cat current_focus.json',
      coreKey: 'التركيز الأساسي',
      coreVals: ['معمارية الويب', 'أنظمة الواجهات'],
      toolsKey: 'الأدوات',
      toolsVals: ['HTML5', 'CSS Grid', 'JS ES6+', 'Figma'],
    },
    about: {
      badge: 'من أنا؟',
      title: 'عن ',
      titleAccent: 'محمد إبراهيم',
      bioP1: 'أنا محمد إبراهيم، طالب في كلية الحاسبات والذكاء الاصطناعي بجامعة كابيتال (حلوان، القاهرة) ومطور واجهات أمامية (Front-End Developer).',
      bioP2: 'بجانب البرمجة، أستكشف النمذجة المادية للعتاد والأنظمة منخفضة المستوى، وأبني واجهات ويب متقدمة مع تبسيط المفاهيم المعقدة، مؤمناً بأن المعرفة تنمو وتزدهر بمشاركتها.',
      location: 'القاهرة، مصر',
      focus: 'واجهات أمامية وأنظمة مدمجة',
      hardwareInterest: 'نمذجة العتاد والإلكترونيات',
      hardwareInterestDesc: 'متحكمات دقيقة ودوائر مدمجة',
      videoInterest: 'المونتاج وتحرير الفيديو',
      videoInterestDesc: 'سرد بصري ومونتاج إبداعي',
      stats: [
        {
          value: '∞',
          label: 'أكواب قهوة',
          subtitle: 'وقود حل المشكلات والبرمجة',
          isAccent: true,
        },
        {
          value: '5+',
          label: 'مشاريع منجزة',
          subtitle: 'تطبيقات ويب وأدوات تقنية',
          isAccent: false,
        },
        {
          value: '2+',
          label: 'سنوات خبرة',
          subtitle: 'تطوير الواجهات وهندسة البرمجيات',
          isAccent: false,
        },
      ],
      mosaic: [
        {
          tag: 'التعليم الأكاديمي',
          title: 'جامعة كابيتال (حلوان، القاهرة)',
          desc: 'كلية الحاسبات والذكاء الاصطناعي (FCAI)',
          iconType: 'edu',
        },
        {
          tag: 'برمجة الأنظمة',
          title: 'الأنظمة والبرمجيات المدمجة',
          desc: 'معمارية الذاكرة، بروتوكولات المتحكمات (I2C/SPI) وتطبيقات C++ الفعالة.',
          iconType: 'cpu',
        },
        {
          tag: 'معايير الواجهات',
          title: 'أنظمة الواجهات النظيفة',
          desc: 'لغة HTML5 الدلالية، تخطيطات CSS Grid المرنة، وتصميمات متجاوبة عالية التباين.',
          iconType: 'ui',
        },
        {
          tag: 'فلسفة التطوير',
          title: 'نمو المعرفة',
          desc: '«المعرفة تنمو بمشاركتها» — بناء أدوات برمجية مفتوحة المصدر وموثقة بدقة.',
          iconType: 'ethos',
        },
      ],
    },
    projects: {
      title: 'أبرز المشاريع',
      viewGithub: 'عرض GitHub',
      liveDemo: 'معاينة حية',
      githubRepo: 'المستودع',
      exploreRepo: 'تصفح المستودع',
      viewSource: 'عرض الكود',
      designRepo: 'مستودع التصميم',
      items: [
        {
          id: 'course-organizer',
          title: 'منظم المقررات والجدول الأكاديمي',
          description: 'نظام إدارة دراسي تفاعلي صُمم لطلاب الجامعات لتنسيق جداول المحاضرات، متابعة الواجبات، وحساب المعدل التراكمي بدقة وانسيابية.',
          tags: ['HTML5', 'CSS Grid', 'JavaScript (ES6+)', 'Vercel'],
        },
        {
          id: 'c-memory-allocator',
          title: 'مخصص الذاكرة المتقدم بلغة C/C++',
          description: 'محاكي وإدارة ذاكرة عالية الكفاءة يستكشف تقنيات تخصيص الذاكرة Buddy Allocation ودمج القوائم الحرة لتحقيق أقصى سرعة وأقل تجزئة.',
          tags: ['C++', 'معمارية الأنظمة', 'Linux API', 'إدارة الذاكرة'],
          terminalOutput: {
            cmd: './benchmark_alloc --iterations=100000',
            stdout: [
              'تم تخصيص 100 ألف كتلة في 4.2ms',
              'نسبة تجزئة الذاكرة: < 2.4%',
              'معدل المعالجة: 23.8M عملية/ثانية [نجاح]',
            ],
          },
        },
        {
          id: 'iot-telemetry-controller',
          title: 'محطة قياس عن بعد بمتحكم ESP32',
          description: 'نموذج برمجيات مدمجة لقراءة حساسات البيئة عبر بروتوكولات I2C/SPI وبث البيانات اللحظية عبر وسيط MQTT إلى لوحة تحكم ويب تفاعلية.',
          tags: ['C++ المدمجة', 'ESP32', 'MQTT', 'نمذجة العتاد'],
          metrics: 'زمن استجابة أقل من 8ms عبر شبكة Wi-Fi',
        },
        {
          id: 'responsive-ui-engine',
          title: 'نظام مكونات CyberDesign المتجاوب',
          description: 'مكتبة تصميم وواجهات سهلة الوصول تركز على معايير WCAG AAA، خطوط مرنة، وتجربة تنقل متكاملة عبر لوحة المفاتيح بدون اهتزاز في التخطيط.',
          tags: ['TypeScript', 'متغيرات CSS', 'Figma', 'إمكانية الوصول (WCAG)'],
          badgeText: 'تصميم متجاوب',
        },
      ],
    },
    skills: {
      title: 'الحزمة التقنية والمهارات',
      activeDeepDive: 'تركيز نشط',
      categories: [
        {
          title: 'لغات البرمجة',
          skills: ['C', 'C++', 'JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'],
        },
        {
          title: 'تطوير الواجهات ومعمارية الويب',
          skills: ['HTML5 دلالي', 'CSS Grid & Flexbox', 'Tailwind CSS', 'React.js', 'أداء DOM', 'أنظمة تصميم Figma'],
        },
        {
          title: 'الأنظمة والبنية التحتية',
          skills: ['سير عمل Git & GitHub', 'لينكس وسكربتات Bash', 'REST APIs', 'Vite', 'Node.js', 'نمذجة العتاد'],
        },
        {
          title: 'مجالات التركيز والتطوير الحالية',
          isFocus: true,
          skills: [
            'الأنظمة المدمجة بلغة C++',
            'أنواع TypeScript المتقدمة',
            'React 19 وتزامن الحالات',
            'برمجة الشبكات والمقابس (Sockets)',
          ],
        },
      ],
    },
    services: {
      title: 'الخدمات البرمجية',
      deliverablesLabel: 'المخرجات',
      discussProject: 'ناقش مشروعك',
      clickToInquire: 'اطلب هذه الخدمة',
      items: [
        {
          id: 'frontend-arch',
          iconName: 'Layout',
          title: 'هندسة واجهات الويب الحديثة',
          description: 'بناء واجهات ويب متجاوبة وسريعة للغاية مع بنية دلالية قوية وتصميمات تفاعلية خالية من الإزاحة.',
          deliverables: ['تطبيقات أحادية الصفحة (SPA)', 'أنظمة تصميم سهلة الوصول', 'لوحات تحكم تفاعلية', 'تدقيق وتحسين الأداء'],
          inquiryMessage: "مرحباً محمد، أود مناقشة مشروع تطوير واجهات وتصميم ويب حديث معك.",
        },
        {
          id: 'fullstack-website',
          iconName: 'Globe',
          title: 'خدمة بناء مواقع الويب المتكاملة (Full Stack)',
          description: 'بناء تطبيقات ومواقع ويب متكاملة من الواجهات الحديثة وحتى الخوادم وقواعد البيانات وتكامل الـ APIs.',
          deliverables: ['تطبيقات ويب مخصصة', 'بناء وتكامل الـ APIs', 'قواعد البيانات والمصادقة', 'تحسين الأداء ومحركات البحث'],
          inquiryMessage: "مرحباً محمد، أود التعاون معك لبناء موقع ويب متكامل (Full Stack Website).",
        },
        {
          id: 'automation-service',
          iconName: 'Zap',
          title: 'خدمة الأتمتة والسكربتات البرمجية',
          description: 'أتمتة العمليات المتكررة، استخراج وتجميع البيانات، وسكربتات المهام المؤتمتة باستخدام Python وBash وNode.js.',
          deliverables: ['سكربتات أتمتة Python وBash', 'استخراج وجمع البيانات (Scraping)', 'بوتات وسير عمل مؤتمت', 'أتمتة النشر وخطوط العمل'],
          inquiryMessage: "مرحباً محمد، أود طلب خدمة أتمتة المهام والسكربتات البرمجية (Automation Service).",
        },
      ],
    },
    contact: {
      title: 'تواصل معي',
      directContact: 'تواصل مباشر',
      heading: 'متاح لفرص التدريب، العمل الحر، والمناقشات التقنية الهادفة.',
      description: 'سواء كان لديك استفسار عن مشروع، فكرة برمجية، أو رغبة في التعاون المشترك، يسعدني دائماً تواصلك.',
      emailLabel: 'البريد الإلكتروني',
      copy: 'نسخ',
      copied: 'تم النسخ',
      socialProfiles: 'الملفات الشخصية',
      sendMessage: 'أرسل رسالة',
      nameLabel: 'الاسم',
      namePlaceholder: 'مثال: أحمد',
      emailInputLabel: 'عنوان البريد الإلكتروني',
      emailPlaceholder: 'مثال: ahmed@example.com',
      whatsappLabel: 'رقم الواتساب',
      whatsappPlaceholder: '+20 10 1234 5678',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'أخبرني عن مشروعك أو استفسارك بالتفصيل...',
      sendButton: 'إرسال الرسالة',
      sentSuccessTitle: 'تم إرسال الرسالة بنجاح!',
      sentSuccessDesc: 'شكراً لتواصلك، سأقوم بالرد عليك في أقرب وقت ممكن.',
      sendAnother: 'إرسال رسالة أخرى',
    },
    footer: {
      role: 'CyberDev // محمد إبراهيم',
      university: 'كلية الحاسبات والذكاء الاصطناعي، جامعة كابيتال، حلوان، القاهرة',
      rights: 'CyberDev. مرخص تحت رخصة MIT.',
    },
  },
};
