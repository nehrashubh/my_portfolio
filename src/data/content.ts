/**
 * ===========================================
 * CONTENT DATA FILE
 * ===========================================
 */

// ============ PROJECTS DATA ============
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  status: 'active' | 'archived' | 'wip';
}

// this is a template
// add project blocks like this
export const projects: Project[] = [
  {
    id: 'portfolio-website',
    title: 'retro_portfolio.sh',
    description:
      'My personal portfolio website with a terminal aesthetic, featuring a custom Markdown blog engine and CRT effects.',
    tech: ['React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/nehrashubh/my_portfolio',
    status: 'active',
  },
];

// ============ BLOG POSTS ============
// blog posts are now stored as individual .md files in /public/posts/
// logic managed in src/lib/blog.ts

// ============ SKILLS DATA ============
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'language' | 'framework' | 'tool' | 'other';
}

// my skills
export const skills: Skill[] = [
  // LANGUAGES (Logic & Scripting)
  { name: "C / C++", level: 85, category: "language" },
  { name: "Python", level: 80, category: "language" },
  { name: "Assembly (x86)", level: 75, category: "language" },
  { name: "SQL", level: 65, category: "language" },
  { name: "Java", level: 70, category: "language" },

  // SECURITY & ANALYSIS TOOLS
  { name: "Linux CLI", level: 90, category: "tool" },
  { name: "Wireshark", level: 70, category: "tool" },
  { name: "Docker", level: 75, category: "tool" },
  { name: "Git", level: 85, category: "tool" },

  // INFRASTRUCTURE & ENVIRONMENT
  { name: "VirtualBox / VMware", level: 80, category: "other" },
  { name: "Network Security", level: 65, category: "other" },
  { name: "GCP (Cloud)", level: 60, category: "other" },
];

// ============ ABOUT/BIO DATA ============
export const aboutInfo = {
  name: 'Shubhankar Nehra',
  role: 'Developer & Creator',
  location: 'Blacksburg, VA',
  bio: [
    'I am a developer focused on simplicity and clean code.',
    'I enjoy building tools that live in the terminal.',
    'Currently working on my personal portfolio and learning new tech.',
    'Cybersecurity enthusiast. Foodie. Dog person.',
  ],
};

// ============ CONTACT INFO ============
export const contactInfo = {
  email: 'nehrashubh6@gmail.com',
  github: 'https://github.com/nehrashubh',
  linkedin: 'https://linkedin.com/in/nehrashubh',
};
