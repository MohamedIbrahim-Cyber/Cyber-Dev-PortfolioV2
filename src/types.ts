export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  isFeatured?: boolean;
  image?: string;
  category: 'web' | 'systems' | 'embedded' | 'tool';
  metrics?: string;
  terminalOutput?: {
    cmd: string;
    stdout: string[];
  };
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: string[];
  isFocus?: boolean;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface StatItem {
  value: string;
  label: string;
  isAccent?: boolean;
  subtitle?: string;
}
