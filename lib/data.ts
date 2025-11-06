export interface Project {
  id: number
  src: string
  title: string
  tech: string[]
  live: string
  github?: string
  video?: string
  description?: string
  folderName: string
}

export const projects: Project[] = [
  {
    id: 0,
    src: "p2u-project-assets/login.png",
    title: "Party2Users(P2U)",
    tech: ["ReactJs", "Javascript", "Framer Motion", "Tailwind CSS", "Redux", "Redis", "Server Events", "Websockets", "Node.js"],
    live: "https://parties2you.com/",
    description: "A real-time party management platform with live updates and WebSocket integration",
    folderName: "p2u-project-assets"
  },
  {
    id: 1,
    src: "MAI-project/homepage.png",
    title: "Marketing AI(MAI)",
    tech: ["ReactJs", "Javascript", "React Query", "Tailwind CSS", "Node.js"],
    live: "https://www.nextviralai.com/",
    description: "AI-powered marketing platform with advanced analytics and automation",
    folderName: "MAI-project"
  },
  {
    id: 2,
    src: "vantage-cargo-project/home.png",
    title: "Vantage Cargo",
    tech: ["ReactJs", "Framer Motion", "Tailwind CSS"],
    live: "https://www.vantagecybertech.com/",
    description: "Modern logistics and cargo management website with smooth animations",
    folderName: "vantage-cargo-project"
  },
  {
    id: 3,
    src: "Authnull-project/authnull.png",
    title: "Authnull",
    tech: ["ReactJs", "Redux", "Ant Design Library"],
    live: "https://authnull.com/",
    description: "Authentication and security platform with enterprise features",
    folderName: "Authnull-project"
  },
  {
    id: 4,
    src: "Inlyne-project/home.png",
    title: "Inlyne",
    tech: ["React Native", "ReactJs", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    live: "#",
    description: "Modern web application with elegant design and smooth user experience",
    folderName: "Inlyne-project"
  },
  {
    id: 5,
    src: "freighkit.ai-project/dashboard.png",
    title: "Freighkit AI",
    tech: ["ReactJs", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI Integration"],
    live: "#",
    description: "AI-powered freight management platform with intelligent chatbot integration",
    folderName: "freighkit.ai-project"
  },
  {
    id: 6,
    src: "custom-ai-service-project/services.png",
    title: "Custom AI Service",
    tech: ["ReactJs", "TypeScript", "Tailwind CSS", "AI/ML"],
    live: "#",
    description: "Custom AI service platform with advanced integration capabilities",
    folderName: "custom-ai-service-project"
  },
  {
    id: 7,
    src: "JAAFAR-car-project/jaafar-home.png",
    title: "JAAFAR Car",
    tech: ["ReactJs", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "#",
    description: "Modern car dealership platform with elegant design and seamless user experience",
    folderName: "JAAFAR-car-project"
  },
]

export const socialLinks = {
  github: "https://github.com/codebuster009",
  linkedin: "https://www.linkedin.com/in/kartavaya-sharma-a17035230/",
  email: "kartavyasharmajs@gmail.com",
}

export const techStack = [
  { name: "React", icon: "fab fa-react" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "Node.js", icon: "fab fa-node-js" },
  { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
  { name: "Express", icon: "fas fa-server" },
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "PostgreSQL", icon: "fas fa-database" },
  { name: "MongoDB", icon: "fas fa-database" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "Redis", icon: "fas fa-memory" },
  { name: "AWS", icon: "fab fa-aws" },
]


