import { getCurrentReading } from "@/lib/content"
import FooterClient from "@/components/layout/FooterClient"

export default async function Footer() {
  const current = await getCurrentReading()
  return <FooterClient currentReadingTitle={current?.title} />
}
