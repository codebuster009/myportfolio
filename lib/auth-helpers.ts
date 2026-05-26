/** Comma-separated GitHub logins allowed to use /admin (case-insensitive). */
export function getAdminAllowlist(): string[] {
  return (process.env.ADMIN_GITHUB_LOGINS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

export function isAllowlistedGitHubLogin(login: string | undefined | null): boolean {
  if (!login) return false
  return getAdminAllowlist().includes(login.toLowerCase())
}
