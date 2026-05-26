import { AdminPageSkeleton } from "@/components/admin/AdminSkeleton"

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-8">
      <AdminPageSkeleton />
    </div>
  )
}
