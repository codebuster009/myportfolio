import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ServicesSection from "@/components/sections/ServicesSection"
import TechnologiesSection from "@/components/sections/TechnologiesSection"
import SayHiSection from "@/components/sections/SayHiSection"

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-3">Services</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient tracking-tight">What I can help with</h1>
          <p className="text-foreground/75 mt-4 max-w-2xl leading-relaxed">
            If you landed here from a referral or a link in an email, same skills, just not the homepage vibe.
          </p>
        </div>
        <ServicesSection />
        <TechnologiesSection />
        <SayHiSection />
      </main>
      <Footer />
    </>
  )
}
