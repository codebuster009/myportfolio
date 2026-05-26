import type { Project } from "@/lib/data"

export function isProjectLive(live: string): boolean {
  return typeof live === "string" && live.startsWith("http")
}

export function formatCatalogIndex(zeroBasedIndex: number): string {
  return String(zeroBasedIndex + 1).padStart(2, "0")
}

export function getFieldNote(project: Project): string {
  if (project.fieldNote?.trim()) return project.fieldNote.trim()
  const n = project.tech.length
  return `${n} libraries. ${Math.max(0, n - 1)} regrets.`
}

export function stickerFromTech(tech: string[]): string {
  const bits = tech.slice(0, 3).map((t) => t.replace(/\s+/g, " ").trim())
  return `// ${bits.join(" · ")}`
}
