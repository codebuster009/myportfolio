export type AssistantReply = { text: string; cta?: { label: string; href: string } }
export type AssistantPrompt = { id: string; chip: string; reply: AssistantReply }

export const ASSISTANT_PROMPTS: AssistantPrompt[] = [
  {
    id: "who",
    chip: "Who are you?",
    reply: {
      text: "I'm K. I build things, read too much, and dump notes here so I remember what I learned.",
      cta: { label: "About me", href: "/#about" },
    },
  },
  {
    id: "build",
    chip: "What are you building?",
    reply: {
      text: "This site, plus side experiments in real-time UIs and tiny tools. Freshest writing lives under /writing.",
      cta: { label: "Open writing", href: "/writing" },
    },
  },
  {
    id: "hire",
    chip: "Can I hire you?",
    reply: {
      text: "Usually yes for small teams with clear scope. Web and full-stack. Hit Say hi and we can figure it out.",
      cta: { label: "Say hi", href: "/services#say-hi" },
    },
  },
  {
    id: "read",
    chip: "What are you reading?",
    reply: {
      text: "One-line book takes only. No hot takes for clicks.",
      cta: { label: "Bookshelf", href: "/writing/books" },
    },
  },
  {
    id: "play",
    chip: "Listening to?",
    reply: {
      text: "Albums, films, games. Updated when I remember to.",
      cta: { label: "Playlist", href: "/playlist" },
    },
  },
  {
    id: "stack",
    chip: "Tech stack?",
    reply: {
      text: "Next.js, TypeScript, Tailwind, Framer Motion. Decap CMS. Static export to Netlify.",
    },
  },
]

/**
 * Auto-open is per-session now (sessionStorage), not per-machine. The old
 * localStorage key is kept as a constant so any callers still importing it
 * keep compiling, but the popover no longer reads or writes it.
 */
export const STORAGE_ASSISTANT_AUTO = "portfolio_assistant_auto_v1"
export const SESSION_ASSISTANT_AUTO = "portfolio_assistant_session_v1"
export const AUTO_OPEN_DELAY_MS = 600

export const INTRO_MESSAGE =
  "Hey. Tap a chip to skip the small talk, or close me and poke around the site."
