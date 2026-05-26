"use client"

/**
 * Notify public tabs (see SiteEnhancements) to router.refresh after CMS saves.
 * AdminForm calls this on successful server actions.
 */
export function broadcastCmsRefresh() {
  if (typeof BroadcastChannel === "undefined") return
  try {
    new BroadcastChannel("cms-refresh").postMessage({ type: "revalidate" })
  } catch {
    /* ignore */
  }
}
