import { ProjectItem, SkillCategory, ServiceItem, StatItem } from '../types';

export const STATS_DATA: StatItem[] = [
  {
    value: "∞",
    label: "Cups of Coffee",
    isAccent: true,
    subtitle: "Fueling late-night debugging"
  },
  {
    value: "12+",
    label: "Projects Shipped",
    isAccent: false,
    subtitle: "Web apps & low-level tools"
  },
  {
    value: "2+",
    label: "Years of Experience",
    isAccent: false,
    subtitle: "Frontend & Systems engineering"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "course-organizer",
    title: "Course Organizer & Academic Scheduler",
    description: "An intuitive course management system designed for university students to structure lecture schedules, track assignments, and calculate cumulative GPA dynamically.",
    tags: ["HTML5", "CSS Grid", "JavaScript (ES6+)", "Vercel"],
    githubUrl: "https://github.com/MohamedIbrahim-Cyber/Course-Organizer",
    liveUrl: "https://course-organizer-eight.vercel.app/index.html",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    category: "web",
    metrics: "Active student users with local cache state"
  },
  {
    id: "c-memory-allocator",
    title: "FastPath C/C++ Custom Memory Allocator",
    description: "A high-efficiency heap memory allocator implementation exploring buddy allocation, free-list coalescing, and cache-aligned paging benchmarks.",
    tags: ["C++", "Systems Architecture", "Linux API", "Memory Management"],
    githubUrl: "https://github.com/MohamedIbrahim-Cyber",
    category: "systems",
    terminalOutput: {
      cmd: "./benchmark_alloc --iterations=100000",
      stdout: [
        "Allocated 100k blocks in 4.2ms",
        "Heap fragmentation: < 2.4%",
        "Throughput: 23.8M ops/sec [PASS]"
      ]
    }
  },
  {
    id: "iot-telemetry-controller",
    title: "ESP32 Embedded Telemetry Hub",
    description: "Firmware prototype interfacing environmental sensors over I2C/SPI, broadcasting real-time data packets via MQTT broker to a web telemetry canvas.",
    tags: ["Embedded C++", "ESP32", "MQTT", "Hardware Prototyping"],
    githubUrl: "https://github.com/MohamedIbrahim-Cyber",
    category: "embedded",
    metrics: "< 8ms sensor packet latency over Wi-Fi"
  },
  {
    id: "responsive-ui-engine",
    title: "CyberDesign Fluid Component System",
    description: "An accessible, responsive design library prioritizing WCAG AAA contrast, fluid typography formulas, smooth keyboard navigation, and zero-layout-shift micro-animations.",
    tags: ["TypeScript", "CSS Variables", "Figma", "Accessibility (WCAG)"],
    githubUrl: "https://github.com/MohamedIbrahim-Cyber",
    liveUrl: "#Projects",
    category: "tool",
    metrics: "100/100 Lighthouse Accessibility Score"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C", "C++", "JavaScript (ES6+)", "TypeScript", "Python", "SQL"]
  },
  {
    title: "Frontend & UI Architecture",
    skills: ["HTML5 Semantic", "CSS Grid & Flexbox", "Tailwind CSS", "React.js", "DOM Performance", "Figma Design Systems"]
  },
  {
    title: "Systems & Infrastructure",
    skills: ["Git & GitHub Workflow", "Linux / Bash Scripting", "REST APIs", "Vite", "Node.js", "Hardware Prototyping"]
  },
  {
    title: "Currently Deep Diving",
    isFocus: true,
    skills: [
      "Embedded Systems with C++",
      "Advanced TypeScript Generics",
      "React 19 & State Concurrency",
      "Low-Level Networking & Sockets"
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "frontend-arch",
    iconName: "Layout",
    title: "Modern Web & UI Engineering",
    description: "Building responsive, blazing-fast web interfaces with rock-solid semantic structure, fluid layouts, and zero-layout-shift responsive systems.",
    deliverables: ["Single-Page Applications", "Accessible Design Systems", "Interactive Dashboards", "Performance Audits"]
  },
  {
    id: "systems-embedded",
    iconName: "Cpu",
    title: "Systems & Embedded Prototyping",
    description: "Developing efficient C/C++ routines, firmware controllers for microcontrollers, and performant algorithmic backbones with minimal overhead.",
    deliverables: ["Microcontroller Firmware", "Memory-Efficient Utilities", "Sensor Interfacing (I2C/SPI)", "Data Serialization"]
  },
  {
    id: "technical-architecture",
    iconName: "Terminal",
    title: "Technical Architecture & Tooling",
    description: "Crafting structured developer workflows, RESTful API integrations, and robust client-server architectures with clean Git practices.",
    deliverables: ["API Integration", "Modular Code Refactoring", "Linux/Bash Automation", "Deployment Pipelines"]
  }
];
