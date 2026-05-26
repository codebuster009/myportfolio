/** ~200 wpm; minimum 1 minute for display. */
export function readingMinutes(content: string, wordsPerMinute = 200): number {
  const stripped = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#*_>`|\s]+/g, " ")
  const words = stripped.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}
