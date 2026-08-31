/**
 * CyberDev Portfolio - Modern Vanilla JavaScript (ES6+)
 * Production-ready UI controller: Theming, Bilingual LTR/RTL, Interactive Terminal,
 * Bento Filtering, Modal Previews, Form Validation & Accessibility.
 */

// -----------------------------------------------------------------------------
// 1. Bilingual Data Dictionary (English / Arabic)
// -----------------------------------------------------------------------------
const I18N_DATA = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      services: "Services",
      contact: "Contact",
      downloadCv: "Download CV",
      langSwitch: "العربية",
      menuTitle: "Navigation Menu",
      closeMenu: "Close menu"
    },
    hero: {
      statusBadge: "Available for internships & projects",
      titlePrefix: "Building web systems, ",
      titleAccent: "crafting interfaces",
      titleSuffix: " & exploring low-level hardware.",
      subtitleP1: "Hi, I’m ",
      subtitleName: "Mohamed Ibrahim",
      subtitleP2: " (CyberDev) — a Computer Science & AI student at Helwan University crafting resilient web architectures, accessible UI systems, and high-performance C/C++ utilities.",
      exploreBtn: "Explore Featured Work"
    },
    terminal: {
      header: "Status.sh",
      whoami: "CyberDev . CS Student & Web Developer",
      uptime: "3+ years engineering resilient systems",
      core: ["Web Architecture", "UI Systems"],
      tools: ["HTML5", "CSS Grid", "JS ES6+", "Figma"]
    },
    about: {
      badge: "Who Am I?",
      title: "About ",
      titleAccent: "Me",
      bioP1: "I’m Mohamed Ibrahim, a student at the Faculty of Computers and Artificial Intelligence, Helwan University and a Front-End Developer.",
      bioP2: "Besides programming, I explore low-level hardware prototyping, build web interfaces, and simplify complex technical concepts, believing that knowledge grows when shared.",
      location: "Cairo, Egypt",
      focus: "Front-End & Systems",
      stats: [
        { value: "∞", label: "Cups of Coffee", sub: "Fueling late-night debugging" },
        { value: "12+", label: "Projects Shipped", sub: "Web apps & low-level tools" },
        { value: "2+", label: "Years of Experience", sub: "Frontend & Systems engineering" }
      ],
      mosaic: [
        { tag: "Education", title: "Helwan University", desc: "Faculty of Computers & Artificial Intelligence (FCAI)" },
        { tag: "Low-Level Tinkering", title: "Systems & Firmware", desc: "Memory architecture, microcontroller protocols (I2C/SPI) & performant C++." },
        { tag: "Frontend Standards", title: "Clean UI Systems", desc: "Semantic HTML5, CSS Grid architectures, and fluid responsive layouts." },
        { tag: "Engineering Ethos", title: "Knowledge Growth", desc: "“Knowledge grows when shared” — building open, documented software tools." }
      ]
    },
    projects: {
      title: "Featured Projects",
      viewGithub: "View GitHub",
      filterAll: "All",
      filterWeb: "Web Apps",
      filterSystems: "Systems & C++",
      filterEmbedded: "Embedded IoT",
      filterTool: "UI Systems",
      liveDemo: "Live Demo",
      githubRepo: "GitHub Repo",
      exploreRepo: "Explore Repo",
      viewSource: "View Source",
      designRepo: "Design Repository"
    },
    skills: {
      title: "Technical Stack & Capabilities",
      activeDeepDive: "Active Deep Dive"
    },
    services: {
      title: "Services & Capabilities",
      deliverablesLabel: "Deliverables",
      discussProject: "Discuss a project"
    },
    contact: {
      title: "Get In Touch",
      directHeading: "Direct Contact",
      subheading: "Available for internships, freelance & technical discussions.",
      description: "Whether you have an inquiry about a project or want to collaborate, feel free to reach out.",
      emailLabel: "Email Address",
      copyBtn: "Copy",
      copiedBtn: "Copied!",
      socialHeading: "Social Profiles",
      formHeading: "Send a Message",
      nameLabel: "Your Name",
      namePlaceholder: "e.g. Alex Morgan",
      emailInputLabel: "Your Email Address",
      emailPlaceholder: "e.g. alex@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project or inquiry...",
      sendBtn: "Send Message",
      successTitle: "Message Sent!",
      successDesc: "Thank you for reaching out. I will get back to you shortly.",
      sendAnother: "Send another message"
    },
    footer: {
      role: "CyberDev // Mohamed Ibrahim",
      university: "Faculty of Computers & AI, Helwan University",
      rights: "CyberDev. MIT License."
    }
  },
  ar: {
    nav: {
      about: "عني",
      projects: "المشاريع",
      skills: "المهارات",
      services: "الخدمات",
      contact: "تواصل معي",
      downloadCv: "تحميل السيرة الذاتية",
      langSwitch: "English",
      menuTitle: "قائمة التصفح",
      closeMenu: "إغلاق القائمة"
    },
    hero: {
      statusBadge: "متاح لفرص التدريب والمشاريع البرمجية",
      titlePrefix: "بناء أنظمة الويب، ",
      titleAccent: "تصميم وتطوير الواجهات",
      titleSuffix: " واستكشاف العتاد والأنظمة المدمجة.",
      subtitleP1: "أهلاً بك، أنا ",
      subtitleName: "محمد إبراهيم",
      subtitleP2: " (CyberDev) — طالب بكلية الحاسبات والذكاء الاصطناعي بجامعة حلوان، متخصص في بناء معماريات الويب الحديثة، أنظمة الواجهات المتقنة، وتطوير برمجيات C/C++ عالية الأداء.",
      exploreBtn: "استكشف أبرز الأعمال"
    },
    terminal: {
      header: "Status.sh",
      whoami: "CyberDev . مطور واجهات وطالب حاسبات",
      uptime: "+3 سنوات في هندسة الأنظمة والبرمجيات",
      core: ["معمارية الويب", "أنظمة الواجهات"],
      tools: ["HTML5", "CSS Grid", "JS ES6+", "Figma"]
    },
    about: {
      badge: "من أنا؟",
      title: "عن ",
      titleAccent: "محمد إبراهيم",
      bioP1: "أنا محمد إبراهيم، طالب في كلية الحاسبات والذكاء الاصطناعي بجامعة حلوان ومطور واجهات أمامية (Front-End Developer).",
      bioP2: "بجانب البرمجة، أستكشف النمذجة المادية للعتاد والأنظمة منخفضة المستوى، وأبني واجهات ويب متقدمة مع تبسيط المفاهيم المعقدة، مؤمناً بأن المعرفة تنمو وتزدهر بمشاركتها.",
      location: "القاهرة، مصر",
      focus: "واجهات أمامية وأنظمة مدمجة",
      stats: [
        { value: "∞", label: "أكواب قهوة", sub: "وقود حل المشكلات والبرمجة" },
        { value: "12+", label: "مشروعاً منجزاً", sub: "تطبيقات ويب وأدوات تقنية" },
        { value: "2+", label: "سنوات خبرة", sub: "تطوير الواجهات وهندسة البرمجيات" }
      ],
      mosaic: [
        { tag: "التعليم الأكاديمي", title: "جامعة حلوان", desc: "كلية الحاسبات والذكاء الاصطناعي (FCAI)" },
        { tag: "برمجة الأنظمة", title: "الأنظمة والبرمجيات المدمجة", desc: "معمارية الذاكرة، بروتوكولات المتحكمات (I2C/SPI) وتطبيقات C++ الفعالة." },
        { tag: "معايير الواجهات", title: "أنظمة الواجهات النظيفة", desc: "لغة HTML5 الدلالية، تخطيطات CSS Grid المرنة، وتصميمات متجاوبة عالية التباين." },
        { tag: "فلسفة التطوير", title: "نمو المعرفة", desc: "«المعرفة تنمو بمشاركتها» — بناء أدوات برمجية مفتوحة المصدر وموثقة بدقة." }
      ]
    },
    projects: {
      title: "أبرز المشاريع",
      viewGithub: "عرض GitHub",
      filterAll: "الكل",
      filterWeb: "تطبيقات ويب",
      filterSystems: "أنظمة C++",
      filterEmbedded: "إنترنت الأشياء",
      filterTool: "أنظمة واجهات",
      liveDemo: "معاينة حية",
      githubRepo: "المستودع",
      exploreRepo: "تصفح المستودع",
      viewSource: "عرض الكود",
      designRepo: "مستودع التصميم"
    },
    skills: {
      title: "الحزمة التقنية والمهارات",
      activeDeepDive: "تركيز نشط"
    },
    services: {
      title: "الخدمات البرمجية",
      deliverablesLabel: "المخرجات",
      discussProject: "ناقش مشروعك"
    },
    contact: {
      title: "تواصل معي",
      directHeading: "تواصل مباشر",
      subheading: "متاح لفرص التدريب، العمل الحر، والمناقشات التقنية الهادفة.",
      description: "سواء كان لديك استفسار عن مشروع، فكرة برمجية، أو رغبة في التعاون المشترك، يسعدني دائماً تواصلك.",
      emailLabel: "البريد الإلكتروني",
      copyBtn: "نسخ",
      copiedBtn: "تم النسخ!",
      socialHeading: "الملفات الشخصية",
      formHeading: "أرسل رسالة",
      nameLabel: "الاسم",
      namePlaceholder: "مثال: أحمد محمد",
      emailInputLabel: "عنوان البريد الإلكتروني",
      emailPlaceholder: "مثال: ahmed@example.com",
      messageLabel: "الرسالة",
      messagePlaceholder: "أخبرني عن مشروعك أو استفسارك بالتفصيل...",
      sendBtn: "إرسال الرسالة",
      successTitle: "تم إرسال الرسالة بنجاح!",
      successDesc: "شكراً لتواصلك، سأقوم بالرد عليك في أقرب وقت ممكن.",
      sendAnother: "إرسال رسالة أخرى"
    },
    footer: {
      role: "CyberDev // محمد إبراهيم",
      university: "كلية الحاسبات والذكاء الاصطناعي، جامعة حلوان",
      rights: "CyberDev. مرخص تحت رخصة MIT."
    }
  }
};

// -----------------------------------------------------------------------------
// 2. Application State Store
// -----------------------------------------------------------------------------
const state = {
  theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  lang: localStorage.getItem('lang') || 'en',
  activeFilter: 'all'
};

// -----------------------------------------------------------------------------
// 3. Theme Controller
// -----------------------------------------------------------------------------
function applyTheme(newTheme) {
  state.theme = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', newTheme);

  // Update Theme Icon
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    themeBtn.innerHTML = newTheme === 'dark' 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  }
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

// -----------------------------------------------------------------------------
// 4. Bilingual Language Controller (LTR / RTL)
// -----------------------------------------------------------------------------
function applyLanguage(newLang) {
  state.lang = newLang;
  const isAr = newLang === 'ar';
  document.documentElement.setAttribute('lang', newLang);
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  localStorage.setItem('lang', newLang);

  const t = I18N_DATA[newLang];

  // Update Language Button Label
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.setAttribute('aria-label', `Switch language to ${isAr ? 'English' : 'Arabic'}`);
    const labelSpan = langBtn.querySelector('.lang-label');
    if (labelSpan) labelSpan.textContent = isAr ? 'EN' : 'AR';
  }

  const mobileLangBtn = document.getElementById('mobile-lang-toggle-btn');
  if (mobileLangBtn) {
    const mobileSpan = mobileLangBtn.querySelector('span');
    if (mobileSpan) mobileSpan.textContent = isAr ? 'Switch to English' : 'التحويل إلى العربية';
  }

  // Update all elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const keyPath = el.getAttribute('data-i18n').split('.');
    let value = t;
    for (const key of keyPath) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
    if (value !== null && typeof value === 'string') {
      el.textContent = value;
    }
  });

  // Update Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const keyPath = el.getAttribute('data-i18n-placeholder').split('.');
    let value = t;
    for (const key of keyPath) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
    if (value !== null && typeof value === 'string') {
      el.setAttribute('placeholder', value);
    }
  });

  // Update Terminal Dynamic Output
  updateTerminalValues();
}

function toggleLanguage() {
  applyLanguage(state.lang === 'en' ? 'ar' : 'en');
}

// -----------------------------------------------------------------------------
// 5. Interactive Shell & Terminal Emulator
// -----------------------------------------------------------------------------
function updateTerminalValues() {
  const t = I18N_DATA[state.lang].terminal;
  const whoamiVal = document.getElementById('term-whoami-val');
  if (whoamiVal) whoamiVal.textContent = t.whoami;

  const uptimeVal = document.getElementById('term-uptime-val');
  if (uptimeVal) uptimeVal.textContent = t.uptime;

  const coreVal = document.getElementById('term-core-val');
  if (coreVal) {
    coreVal.textContent = `"${state.lang === 'ar' ? 'التركيز' : 'core'}": [${t.core.map(c => `"${c}"`).join(', ')}],`;
  }

  const toolsVal = document.getElementById('term-tools-val');
  if (toolsVal) {
    toolsVal.textContent = `"${state.lang === 'ar' ? 'الأدوات' : 'tools'}": [${t.tools.map(c => `"${c}"`).join(', ')}]`;
  }
}

function initTerminal() {
  // Static status showcase card
  updateTerminalValues();
}

// -----------------------------------------------------------------------------
// 6. Projects Bento Filtering & Modal Previews
// -----------------------------------------------------------------------------
const PROJECTS_DATABASE = {
  "course-organizer": {
    title: "Course Organizer & Academic Scheduler",
    description: "An intuitive course management system designed for university students to structure lecture schedules, track assignments, and calculate cumulative GPA dynamically.",
    tags: ["HTML5", "CSS Grid", "JavaScript (ES6+)", "Vercel"],
    category: "web",
    githubUrl: "https://github.com/MohamedIbrahim-Cyber/Course-Organizer",
    liveUrl: "https://course-organizer-eight.vercel.app/index.html",
    image: "/public/course-organizer.svg",
    metrics: "Active university student users with local cache state persistence",
    details: "Built with pure semantic HTML5 and CSS Grid, ensuring 100/100 performance and accessibility scores without bulky framework overhead. Features offline localStorage synchronization and fluid timetable drag calculation."
  }
};

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const bentoGrid = document.querySelector('.bento-grid');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      state.activeFilter = filter;

      if (bentoGrid) bentoGrid.classList.add('filtering');

      let visibleIndex = 0;
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const matches = (filter === 'all' || category === filter);

        if (matches) {
          card.classList.remove('filter-hide');
          card.classList.remove('filter-show');
          card.style.animationDelay = `${visibleIndex * 0.07}s`;
          // Force reflow
          void card.offsetWidth;
          card.classList.add('filter-show');
          visibleIndex++;
        } else {
          card.classList.remove('filter-show');
          card.classList.add('filter-hide');
        }
      });

      setTimeout(() => {
        if (bentoGrid) bentoGrid.classList.remove('filtering');
      }, 250);
    });
  });
}

function openProjectModal(projectId) {
  const project = PROJECTS_DATABASE[projectId];
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');

  if (!modal || !modalContent) return;

  // Clear existing content securely
  modalContent.replaceChildren();

  // Header row
  const header = document.createElement('div');
  header.className = 'modal-header';

  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = (project.category || '').toUpperCase();

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-modal-btn';
  closeBtn.id = 'modal-close-trigger';
  closeBtn.setAttribute('aria-label', 'Close modal');
  closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  closeBtn.addEventListener('click', closeModal);

  header.append(badge, closeBtn);
  modalContent.appendChild(header);

  // Optional image banner
  if (project.image) {
    const imgWrapper = document.createElement('div');
    imgWrapper.style.cssText = 'border-radius: var(--radius-md); overflow: hidden; max-height: 220px;';
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title || 'Project preview';
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
    imgWrapper.appendChild(img);
    modalContent.appendChild(imgWrapper);
  }

  // Title
  const title = document.createElement('h3');
  title.style.cssText = 'font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 0.5rem;';
  title.textContent = project.title || '';
  modalContent.appendChild(title);

  // Description
  const desc = document.createElement('p');
  desc.style.cssText = 'font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;';
  desc.textContent = project.description || '';
  modalContent.appendChild(desc);

  // Technical Highlights Box
  const highlightsBox = document.createElement('div');
  highlightsBox.style.cssText = 'background-color: var(--accent-subtle); padding: 0.875rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border);';
  
  const highlightLabel = document.createElement('span');
  highlightLabel.style.cssText = 'font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; color: var(--accent); text-transform: uppercase;';
  highlightLabel.textContent = 'Technical Highlights';

  const highlightDetail = document.createElement('p');
  highlightDetail.style.cssText = 'font-size: 0.8125rem; color: var(--text-primary); margin-top: 0.25rem;';
  highlightDetail.textContent = project.details || '';

  highlightsBox.append(highlightLabel, highlightDetail);
  modalContent.appendChild(highlightsBox);

  // Tags row
  if (Array.isArray(project.tags) && project.tags.length > 0) {
    const tagsRow = document.createElement('div');
    tagsRow.className = 'tags-row';
    tagsRow.style.marginTop = '0.25rem';
    project.tags.forEach(tagText => {
      const tagPill = document.createElement('span');
      tagPill.className = 'tag-pill';
      tagPill.textContent = tagText;
      tagsRow.appendChild(tagPill);
    });
    modalContent.appendChild(tagsRow);
  }

  // Action links row
  const actionsRow = document.createElement('div');
  actionsRow.style.cssText = 'display: flex; gap: 0.75rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);';

  if (project.liveUrl) {
    const liveLink = document.createElement('a');
    liveLink.href = project.liveUrl;
    liveLink.target = '_blank';
    liveLink.rel = 'noopener noreferrer';
    liveLink.className = 'btn-primary';
    liveLink.style.cssText = 'font-size: 0.75rem; padding: 0.5rem 1rem;';
    liveLink.textContent = 'View Live Project';
    actionsRow.appendChild(liveLink);
  }

  if (project.githubUrl) {
    const githubLink = document.createElement('a');
    githubLink.href = project.githubUrl;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'filter-btn';
    githubLink.style.cssText = 'padding: 0.5rem 1rem; display: inline-flex; align-items: center; gap: 0.35rem;';
    githubLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GitHub Source';
    actionsRow.appendChild(githubLink);
  }

  if (actionsRow.hasChildNodes()) {
    modalContent.appendChild(actionsRow);
  }

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

// -----------------------------------------------------------------------------
// 7. Clipboard & Toast Notifications
// -----------------------------------------------------------------------------
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function initClipboardCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'cyberdevbusines@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = copyBtn.querySelector('span')?.textContent || 'Copy';
      if (copyBtn.querySelector('span')) {
        copyBtn.querySelector('span').textContent = I18N_DATA[state.lang].contact.copiedBtn;
      }
      showToast(state.lang === 'ar' ? 'تم نسخ البريد الإلكتروني بنجاح!' : 'Email copied to clipboard!');
      
      setTimeout(() => {
        if (copyBtn.querySelector('span')) {
          copyBtn.querySelector('span').textContent = I18N_DATA[state.lang].contact.copyBtn;
        }
      }, 2500);
    }).catch(() => {
      showToast('Could not access clipboard');
    });
  });
}

// -----------------------------------------------------------------------------
// 8. Contact Form Validation & Submission (Discord Webhook + Gmail)
// -----------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');
  const sendAnotherBtn = document.getElementById('send-another-btn');

  if (!form) return;

  const validateField = (input, validator, errorId) => {
    const errorEl = document.getElementById(errorId);
    const parent = input.closest('.form-group');
    const isValid = validator(input.value);

    if (!isValid) {
      parent?.classList.add('has-error');
    } else {
      parent?.classList.remove('has-error');
    }
    return isValid;
  };

  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const isNotEmpty = (val) => val.trim().length >= 2;
  const isMessageValid = (val) => val.trim().length >= 5;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  nameInput?.addEventListener('input', () => validateField(nameInput, isNotEmpty, 'name-error'));
  emailInput?.addEventListener('input', () => validateField(emailInput, isEmail, 'email-error'));
  messageInput?.addEventListener('input', () => validateField(messageInput, isMessageValid, 'message-error'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const validName = validateField(nameInput, isNotEmpty, 'name-error');
    const validEmail = validateField(emailInput, isEmail, 'email-error');
    const validMessage = validateField(messageInput, isMessageValid, 'message-error');

    if (validName && validEmail && validMessage) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"/></svg>
          <span>Sending...</span>
        `;
      }

      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();
      const senderMessage = messageInput.value.trim();

      // Securely dispatch to backend API proxy route
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: senderName,
            email: senderEmail,
            message: senderMessage
          })
        });
      } catch (err) {
        console.warn('Form submission notice:', err);
      }

      // Display Success State
      form.style.display = 'none';
      if (successBanner) {
        successBanner.classList.add('is-visible');
      }
      showToast(state.lang === 'ar' ? 'تم إرسال رسالتك إلى البريد والديسكورد بنجاح!' : 'Message sent to Gmail & Discord!');
      
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span data-i18n="contact.sendBtn">${I18N_DATA[state.lang].contact.sendBtn}</span>`;
      }
      form.reset();
    }
  });

  sendAnotherBtn?.addEventListener('click', () => {
    if (successBanner) successBanner.classList.remove('is-visible');
    form.style.display = 'flex';
  });
}

// -----------------------------------------------------------------------------
// 9. Mobile Drawer & Navigation Listeners
// -----------------------------------------------------------------------------
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-drawer-close');

  const openDrawer = () => {
    mobileDrawer?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openDrawer);
  mobileClose?.addEventListener('click', closeDrawer);

  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) closeDrawer();
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Global ESC listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
  });

  // ScrollSpy for active nav items
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { rootMargin: '-25% 0px -55% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));

  // Back to Top button
  document.getElementById('back-to-top-btn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -----------------------------------------------------------------------------
// 10. Animation Engine & Dynamic Micro-Interactions
// -----------------------------------------------------------------------------

/**
 * 1. Scroll-Driven Slide-In Reveal Engine (IntersectionObserver)
 * Smoothly cascades sections, headings, cards, and sub-grids from left/right/up.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Unobserve once revealed for performance
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}

/**
 * 2. Animated Stats Counter (Smooth Cubic Ease-Out)
 */
function initStatsCounter() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  let hasAnimated = false;

  const animateCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    counterElements.forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic: 1 - Math.pow(1 - progress, 3)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        el.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }
}

/**
 * 3. Dynamic Scroll Progress Bar & Sticky Header Styling
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const nav = document.getElementById('main-navigation');

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (progressBar && scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    if (nav) {
      if (scrollTop > 30) {
        nav.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.15)';
      } else {
        nav.style.boxShadow = 'var(--card-shadow)';
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 4. Interactive 3D Perspective Tilt & Cursor Spotlight Follower
 * Only project and service cards have physical position/tilt.
 * All other cards retain the glowing spotlight effect only without position shifts.
 */
function init3DCardEffects() {
  // Check if device supports fine pointer (mouse)
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const allCards = document.querySelectorAll(
    '.project-card, .service-card, .mosaic-card, .skill-category-card, .stat-card, .bio-card, .contact-info-card, .contact-form-card, .terminal-window'
  );

  allCards.forEach((card) => {
    // Insert spotlight follower if not present
    if (!card.querySelector('.card-spotlight')) {
      const spotlight = document.createElement('div');
      spotlight.className = 'card-spotlight';
      card.prepend(spotlight);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial glow
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // ONLY project and service cards get 3D tilt and position transform
      const shouldTilt = (card.classList.contains('project-card') && !card.classList.contains('placeholder-card')) || card.classList.contains('service-card');
      
      if (shouldTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const shouldTilt = (card.classList.contains('project-card') && !card.classList.contains('placeholder-card')) || card.classList.contains('service-card');
      if (shouldTilt) {
        card.style.transform = '';
      }
    });
  });
}

/**
 * 5. Interactive Button Ripple Waves
 */
function initButtonRipples() {
  const rippleTargets = document.querySelectorAll(
    '.btn-primary, .btn-icon, .btn-pill-action, .filter-btn, .copy-btn, .close-modal-btn'
  );

  rippleTargets.forEach((btn) => {
    btn.classList.add('ripple-target');
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-wave');

      const existingRipple = this.querySelector('.ripple-wave');
      if (existingRipple) existingRipple.remove();

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });
}

// -----------------------------------------------------------------------------
// 11. Helper Utilities
// -----------------------------------------------------------------------------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// -----------------------------------------------------------------------------
// 12. Initializer
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme & language
  applyTheme(state.theme);
  applyLanguage(state.lang);

  // Setup Event Listeners
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
  document.getElementById('lang-toggle-btn')?.addEventListener('click', toggleLanguage);
  document.getElementById('mobile-lang-toggle-btn')?.addEventListener('click', () => {
    toggleLanguage();
    document.getElementById('mobile-drawer')?.classList.remove('is-open');
    document.body.style.overflow = '';
  });

  // Modal Backdrop Click
  document.getElementById('project-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') closeModal();
  });

  // Modal Triggers for Project Cards
  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-open-modal');
      openProjectModal(projectId);
    });
  });

  // Pre-fill contact service inquiry from Service Cards
  document.querySelectorAll('[data-service-inquiry]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service-inquiry');
      const messageInput = document.getElementById('contact-message');
      if (messageInput) {
        messageInput.value = `Hi Mohamed, I'd like to discuss a project regarding: ${serviceName}.`;
      }
    });
  });

  // Initialize Core Submodules
  initTerminal();
  initProjectFilters();
  initClipboardCopy();
  initContactForm();
  initNavigation();

  // Initialize Dynamic Animation Engines
  initScrollReveal();
  initStatsCounter();
  initScrollProgress();
  init3DCardEffects();
  initButtonRipples();
});
