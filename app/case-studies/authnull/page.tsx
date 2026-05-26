import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Case Study: Authnull | Kartavaya Sharma",
  description:
    "Building an enterprise passwordless auth admin dashboard: OAuth 2.0, RBAC, session management, and the React + Redux architecture that kept it sane.",
}

export default function AuthnullCaseStudy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <article className="container mx-auto max-w-3xl">
          <Link
            href="/services"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← back to services
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Case Study
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Authnull: an enterprise passwordless admin dashboard that doesn&apos;t feel enterprise
          </h1>
          <p className="text-lg text-foreground/80 mb-10">
            OAuth 2.0, role-based access control, session management, audit logs. The plumbing
            that keeps enterprise auth working, wrapped in a UI that admins actually use.
          </p>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-foreground/10 mb-12">
            <Image
              src="/Authnull-project/authnull.png"
              alt="Authnull admin dashboard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 not-prose text-sm">
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Stack</p>
              <p className="font-medium">React, Redux, Ant Design</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Role</p>
              <p className="font-medium">Frontend lead</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Duration</p>
              <p className="font-medium">6 months</p>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-xs uppercase tracking-wider text-foreground/60 mb-1">Live at</p>
              <a
                href="https://authnull.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                authnull.com
              </a>
            </div>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed">
            <h2>The problem</h2>
            <p>
              Enterprise IT admins manage hundreds of users, dozens of applications, and a
              constantly shifting set of permissions. Most existing tools for this are either
              ancient (think 2008 LDAP consoles) or cloud-native but locked to a single ecosystem.
              Authnull was building a passwordless authentication platform that worked across
              SaaS apps, on-prem systems, and legacy stacks. The pitch was strong. The admin UX
              needed to match.
            </p>

            <h2>What I built</h2>

            <h3>1. OAuth 2.0 + SSO configuration flows</h3>
            <p>
              The admin needs to register applications, configure callback URLs, set token TTLs,
              and connect to identity providers like Okta, Azure AD, and Google Workspace. Each
              of these has its own quirks and failure modes.
            </p>
            <p>
              The UX decisions that mattered:
            </p>
            <ul>
              <li>
                <strong>Inline validation against the real provider.</strong> When you paste a
                callback URL, we make a probe request to verify it resolves. Most admins
                copy-paste from documentation with a trailing slash or missing protocol; catching
                this at config time saves hours of debugging later.
              </li>
              <li>
                <strong>Test connection button.</strong> Every IdP integration has a dry-run mode
                that simulates a login without actually issuing tokens. Hidden behind a button
                that anyone can click. Saves the dreaded &quot;it worked in staging&quot; ticket.
              </li>
            </ul>

            <h3>2. Role-based access control (RBAC) UI</h3>
            <p>
              RBAC is conceptually simple and unfailingly painful in practice. Users get roles.
              Roles get permissions. Permissions get inherited through groups. Now do this for
              200 applications and 50 roles per app.
            </p>
            <p>
              The thing that made this tractable was building a permission matrix view that
              showed every role/permission combination at once, with bulk edit, conflict
              highlighting, and an undo stack. Editing one permission no longer required
              clicking through ten modals.
            </p>

            <h3>3. Session and device management</h3>
            <p>
              When you support passwordless auth across multiple form factors (web, mobile, SDK,
              CLI), session state is everywhere. The admin needs to see every active session,
              revoke individual ones, force a global logout, and audit-log every action.
            </p>
            <p>
              Built a real-time session table with WebSocket updates so revoking on the admin
              side immediately reflects on the user side. The audit log is append-only with
              cryptographic verification of integrity (the kind of thing compliance teams care
              about deeply).
            </p>

            <h2>Three technical decisions worth flagging</h2>

            <h3>Redux for permission state, not for everything</h3>
            <p>
              Most modern React advice says skip Redux. I used Redux here because the permission
              model is deeply normalized and read by approximately every component in the admin.
              Pushing it through context or prop-drilling would have been a nightmare. The Redux
              store is a single normalized graph of users, roles, permissions, and groups, with
              selectors that compose to answer any &quot;can user X do action Y on resource
              Z&quot; query in constant time.
            </p>
            <p>
              For other state (form drafts, UI state, navigation), I used local React state.
              Redux is for the parts that justify it, not for everything.
            </p>

            <h3>Ant Design instead of a custom design system</h3>
            <p>
              Hot take: for enterprise admin dashboards, Ant Design is the right call. It has
              every component you need (tables with bulk actions, transfer lists, complex forms,
              tree selects) and the look matches what enterprise admins expect. Building a
              custom design system here would have cost three months and produced something
              functionally identical and less battle-tested.
            </p>

            <h3>Real-time updates via WebSocket, not polling</h3>
            <p>
              The session and audit-log tables update in real time when other admins or end
              users take actions. We use a single shared WebSocket per session with topic-based
              subscriptions per page. When you open the sessions page, you subscribe to session
              events. When you navigate away, you unsubscribe. The frontend never polls.
            </p>

            <h2>What I would do differently</h2>
            <ol>
              <li>
                <strong>Build the permission matrix view first.</strong> We had standard
                CRUD-table screens for six months before realizing the matrix view was the actual
                primary interface admins wanted. Should have prototyped it on week one.
              </li>
              <li>
                <strong>Add admin-impersonation mode earlier.</strong> Debugging permission
                issues across multiple roles is much easier when you can &quot;become&quot; a
                user in read-only mode. We added this in month four; should have been in v1.
              </li>
              <li>
                <strong>Spend more time on empty states.</strong> Enterprise dashboards are 90%
                full and 10% empty, but the 10% empty (new tenant, first day) is the worst
                onboarding experience if you skip it. Wrote far too much &ldquo;the table is empty&rdquo;
                copy at the last minute.
              </li>
            </ol>

            <h2>Skills demonstrated</h2>
            <ul>
              <li>
                <strong>Auth flows:</strong> OAuth 2.0, SAML, OIDC, passwordless patterns
              </li>
              <li>
                <strong>RBAC:</strong> role/permission/group modeling, conflict resolution UX
              </li>
              <li>
                <strong>Redux at scale:</strong> normalized state, complex selectors, where Redux
                pays off and where it doesn&apos;t
              </li>
              <li>
                <strong>Real-time admin UIs:</strong> WebSocket topic subscriptions, optimistic
                updates, conflict resolution
              </li>
              <li>
                <strong>Ant Design + React:</strong> productive enterprise UI without rebuilding
                primitives
              </li>
              <li>
                <strong>Compliance-friendly logging:</strong> append-only audit trails with
                cryptographic verification
              </li>
            </ul>

            <h2>Want auth or admin work?</h2>
            <p>
              If your product has enterprise customers asking about SSO, RBAC, audit logs, or
              session management, and your team has been putting it off because nobody wants to
              touch auth, that is exactly the work I do.{" "}
              <Link href="/services#say-hi" className="text-primary underline hover:no-underline">
                Send a message
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:kartavyasharmajs@gmail.com"
                className="text-primary underline hover:no-underline"
              >
                kartavyasharmajs@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
              ← back to services
            </Link>
            <Link
              href="/services#say-hi"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Hire me →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
