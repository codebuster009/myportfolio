"use client"

import { createContext, useContext, useTransition, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { broadcastCmsRefresh } from "./RevalidateBroadcaster"

const PendingContext = createContext(false)

export function useAdminFormPending() {
  return useContext(PendingContext)
}

/**
 * Wraps server `formAction`s with pending UI, toast, BroadcastChannel for public tabs, and router.refresh.
 */
export function AdminForm({
  action,
  children,
  successMessage,
}: {
  action: (formData: FormData) => Promise<unknown>
  children: ReactNode
  successMessage?: string
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <PendingContext.Provider value={pending}>
      <form
        action={(formData) => {
          startTransition(() => {
            void (async () => {
              try {
                await action(formData)
                if (successMessage) toast.success(successMessage)
                broadcastCmsRefresh()
                router.refresh()
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Something went wrong")
              }
            })()
          })
        }}
      >
        {children}
      </form>
    </PendingContext.Provider>
  )
}
