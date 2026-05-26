import Link from "next/link"

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md text-center rounded-3xl border border-border bg-card/80 p-8 shadow-lg">
        <h1 className="text-xl font-bold text-foreground mb-2">Forbidden</h1>
        <p className="text-sm text-muted-foreground mb-6">
          You shouldn&apos;t be here. Sign in is already blocked at OAuth.
        </p>
        <Link href="/" className="text-primary text-sm font-medium hover:underline">
          Home
        </Link>
      </div>
    </div>
  )
}
