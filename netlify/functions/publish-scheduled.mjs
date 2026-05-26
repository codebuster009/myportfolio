// Netlify Scheduled Function — replaces the Vercel cron in vercel.json.
//
// Vercel ignored on Netlify, so the hourly `GET /api/cron/publish` trigger is
// gone. This function reproduces it: every hour it calls the deployed Next.js
// route with the same `Bearer ${CRON_SECRET}` the route already checks. All
// publish/revalidation logic stays in app/api/cron/publish/route.ts — this is
// only the trigger.

export const config = {
  // Mirrors the old vercel.json schedule ("0 * * * *" = top of every hour).
  schedule: "0 * * * *",
}

export default async () => {
  // Netlify injects URL (canonical prod address) into every function at
  // runtime; fall back to the explicit site URL, then the deploy URL.
  const base =
    process.env.URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.DEPLOY_PRIME_URL

  const secret = process.env.CRON_SECRET

  if (!base) {
    console.error("[publish-scheduled] No site URL available (URL env unset)")
    return new Response("Site URL unavailable", { status: 500 })
  }
  if (!secret) {
    console.error("[publish-scheduled] CRON_SECRET is not set")
    return new Response("CRON_SECRET not set", { status: 500 })
  }

  const endpoint = `${base.replace(/\/$/, "")}/api/cron/publish`

  try {
    const res = await fetch(endpoint, {
      headers: { authorization: `Bearer ${secret}` },
    })
    const body = await res.text()
    console.log(`[publish-scheduled] ${res.status} ${body}`)
    if (!res.ok) {
      return new Response(`Publish failed: ${res.status} ${body}`, { status: 502 })
    }
    return new Response(body, { status: 200 })
  } catch (err) {
    console.error("[publish-scheduled] request threw:", err)
    return new Response(`Request error: ${String(err)}`, { status: 502 })
  }
}
