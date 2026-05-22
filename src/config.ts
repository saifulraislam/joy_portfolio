export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  target: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  videoPath: string
  name: string
  tagline: string
  taglineAccent: string
  descriptor: string
  ctaPrimary: string
  ctaPrimaryTarget: string
  ctaSecondary: string
  ctaSecondaryTarget: string
}

export interface AboutConfig {
  sectionLabel: string
  videoPath: string
  bio: string
  languages: string[]
}

export interface Project {
  number: string
  title: string
  description: string
  link: string
  linkLabel: string
  image: string
}

export interface ProjectsConfig {
  sectionLabel: string
  title: string
  projects: Project[]
}

export interface ExperienceEntry {
  organization: string
  role: string
  date: string
}

export interface ExperienceConfig {
  sectionLabel: string
  title: string
  entries: ExperienceEntry[]
}

export interface SkillsConfig {
  sectionLabel: string
  title: string
  coreSkills: string[]
  supportingSkills: string[]
}

export interface ContactConfig {
  sectionLabel: string
  heading: string
  subline: string
  linkedinLabel: string
  linkedinUrl: string
  phone: string
  email: string
  whatsapp: string
  instagram: string
  instagramUrl: string
  formNameLabel: string
  formEmailLabel: string
  formMessageLabel: string
  submitText: string
}

export interface FooterConfig {
  brandName: string
  tagline: string
  copyright: string
}

// ─── CONFIGURATION ───

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Jamali Founder & Creative",
  siteDescription: "Brand founder. Creative thinker. MIS student building from Dhaka to the world.",
}

export const navigationConfig: NavigationConfig = {
  brandName: "Jamali",
  links: [
    { label: "About", target: "#about" },
    { label: "Work", target: "#work" },
    { label: "Experience", target: "#experience" },
    { label: "Skills", target: "#skills" },
    { label: "Contact", target: "#contact" },
  ],
}

export const heroConfig: HeroConfig = {
  videoPath: "videos/hero.mp4",
  name: "Jamali",
  tagline: "Building quietly.",
  taglineAccent: "Growing loudly.",
  descriptor: "Brand founder. Creative thinker. MIS student building from Dhaka to the world.",
  ctaPrimary: "See My Work",
  ctaPrimaryTarget: "#work",
  ctaSecondary: "Let's Connect",
  ctaSecondaryTarget: "#contact",
}

export const aboutConfig: AboutConfig = {
  sectionLabel: "About",
  videoPath: "videos/about.mp4",
  bio: "I'm Jamali. I build brands, solve problems, and think in systems. Currently studying MIS at IUB while founding Jamaliè a luxury lifestyle brand growing from Dhaka toward the world. I believe great things are built quietly, one decision at a time.",
  languages: ["Bangla", "English", "Hindi", "Urdu"],
}

export const projectsConfig: ProjectsConfig = {
  sectionLabel: "Selected Work",
  title: "Projects",
  projects: [
    {
      number: "01",
      title: "Jamaliè",
      description: "A luxury lifestyle brand built from Dhaka. Fragrance, aesthetics, and identity.",
      link: "https://jamalie.vercel.app",
      linkLabel: "View Project",
      image: "images/project-jamalie.jpg",
    },
    {
      number: "02",
      title: "Zivro",
      description: "A file sharing tool built for university presentations. Upload, get a key code, download anywhere.",
      link: "https://zivro.lovable.app",
      linkLabel: "View Project",
      image: "images/project-zivro.jpg",
    },
    {
      number: "03",
      title: "IUB GPA Calculator",
      description: "Upload your transcript, calculate your CGPA, simulate grade improvements.",
      link: "https://iubcgpacalculator.tiiny.site",
      linkLabel: "View Project",
      image: "images/project-gpa.jpg",
    },
  ],
}

export const experienceConfig: ExperienceConfig = {
  sectionLabel: "Journey",
  title: "Experience",
  entries: [
    {
      organization: "Independent Marketers Association",
      role: "Research Assistant",
      date: "2024 — 2025",
    },
    {
      organization: "IUB Theatre",
      role: "Assistant Event Coordinator",
      date: "2024 — 2025",
    },
    {
      organization: "Minddropper",
      role: "Social Media Manager",
      date: "2023 — 2024",
    },
    {
      organization: "MetaOasis Inc",
      role: "Community Manager",
      date: "2022 — 2024",
    },
    {
      organization: "IUB E-Business Club",
      role: "Media & PR",
      date: "2026 — Present",
    },
  ],
}

export const skillsConfig: SkillsConfig = {
  sectionLabel: "Capabilities",
  title: "Expertise",
  coreSkills: ["Brand Building", "Digital Marketing", "Social Media Management", "Community Management"],
  supportingSkills: ["SEO", "Event Coordination", "Vibe Coding", "AI Tools"],
}

export const contactConfig: ContactConfig = {
  sectionLabel: "Connect",
  heading: "Let's build something.",
  subline: "Open to thoughtful ideas, collaborations, and conversations.",
  linkedinLabel: "LinkedIn",
  linkedinUrl: "https://linkedin.com/in/jamalimahmud",
  phone: "+8801881445154",
  email: "jamalimahmudjoy@gmail.com",
  whatsapp: "+8801881445154",
  instagram: "@joyfeesh",
  instagramUrl: "https://www.instagram.com/joyfeesh/",
  formNameLabel: "Name",
  formEmailLabel: "Email",
  formMessageLabel: "Message",
  submitText: "Send",
}

export const footerConfig: FooterConfig = {
  brandName: "Md Jamali Mahmud Joy",
  tagline: "Building quietly. Growing loudly.",
  copyright: "© 2026 Jamali. Crafted with intention.",
}
