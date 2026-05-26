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
  /** Short witty line shown on the bento tile */
  fieldNote?: string
}

export const projects: Project[] = [
  // Live projects first (have a public URL the user can click)
  {
    id: 0,
    src: "freighkit.ai-project/dashboard.png",
    title: "Freighkit AI",
    tech: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "LLM Integration", "Chatbot"],
    live: "https://freightkit.app/",
    description:
      "AI assistant for freight operators. Built the chatbot UX, streaming responses, conversation memory, and tool-calling pipeline that lets dispatchers query loads, rates, and routes in natural language. React 18, TypeScript, shadcn/ui on the frontend.",
    folderName: "freighkit.ai-project",
    fieldNote: "Trucks plus LLMs. The roadmap was a stand-up bit.",
  },
  {
    id: 1,
    src: "MAI-project/homepage.png",
    title: "Marketing AI (NextViralAI)",
    tech: ["React", "Node.js", "React Query", "Tailwind CSS", "LLM Integration"],
    live: "https://www.nextviralai.com/",
    description:
      "AI marketing platform that generates campaign copy, ad variations, and content briefs end-to-end. Built the content-generation flow, prompt pipeline, React Query data layer, and the dashboard analytics that close the feedback loop on what's working.",
    folderName: "MAI-project",
    fieldNote: "Built the pipeline twice. Liked the second one.",
  },
  {
    id: 2,
    src: "Authnull-project/authnull.png",
    title: "Authnull",
    tech: ["React", "Redux", "OAuth 2.0", "RBAC", "Ant Design"],
    live: "https://authnull.com/",
    description:
      "Enterprise passwordless authentication platform. Shipped the admin dashboard for OAuth 2.0 flows, role-based access control, and session/device management. Ant Design system, Redux for complex permission state.",
    folderName: "Authnull-project",
    fieldNote: "Enterprise auth. Where joy goes to be reviewed.",
  },
  {
    id: 3,
    src: "p2u-project-assets/login.png",
    title: "Party2Users (P2U)",
    tech: ["React", "Node.js", "WebSockets", "Server-Sent Events", "Redis", "Redux", "Framer Motion"],
    live: "https://www.parties2you.com/",
    description:
      "Real-time party / event coordination platform. Designed the WebSocket + SSE architecture for live attendee updates, RSVPs, and chat. Redis pub/sub for fan-out, Redux for client state, sub-200ms perceived latency end-to-end.",
    folderName: "p2u-project-assets",
    fieldNote: "Real-time everything. Slept like it was a side effect.",
  },
  {
    id: 4,
    src: "JAAFAR-car-project/jaafar-home.png",
    title: "JAAFAR Car",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://jaafar-car.netlify.app/",
    description:
      "Premium car dealership platform. Inventory browsing with filters, financing calculators, lead-capture flows. Heavy interaction polish across image galleries and scroll-linked animations, built to match the brand's luxury positioning.",
    folderName: "JAAFAR-car-project",
    fieldNote: "Luxury cars, smoother than my git history.",
  },
  {
    id: 5,
    src: "vantage-cargo-project/home.png",
    title: "Vantage Cargo",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    live: "https://www.vantagecybertech.com/",
    description:
      "Marketing site for a logistics and cybertech firm. Built the full frontend with motion-heavy animations using Framer Motion. Service pages, case studies, contact funnels. Lighthouse score above 90 across the board.",
    folderName: "vantage-cargo-project",
    fieldNote: "Cargo logistics meets Framer Motion. Surprisingly fun.",
  },
  // Projects without a public URL (video / demo on request)
  {
    id: 6,
    src: "custom-ai-service-project/services.png",
    title: "Custom AI Integration Service",
    tech: ["React", "TypeScript", "Tailwind CSS", "RAG", "LLM Integration"],
    live: "#",
    description:
      "White-label AI feature delivery for client SaaS apps. Drop-in RAG search, intelligent autocomplete, and document Q&A modules built to plug into existing React codebases without rewrites. Configurable models, citation UI, streaming.",
    folderName: "custom-ai-service-project",
    fieldNote: "Whatever the client needed. Often at 2 a.m.",
  },
  {
    id: 7,
    src: "Inlyne-project/home.png",
    title: "Inlyne",
    tech: ["React Native", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    live: "#",
    description:
      "Cross-platform consumer app spanning web and React Native, sharing UI primitives and business logic. Set up the design system, navigation patterns, and a shared type layer so iOS, Android, and web stayed in sync without copy-pasted code.",
    folderName: "Inlyne-project",
    fieldNote: "React Native that didn't make me cry. Mostly.",
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


