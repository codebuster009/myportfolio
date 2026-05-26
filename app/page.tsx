import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import WorkflowSection from "@/components/sections/WorkflowSection"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PulseBentoSection from "@/components/sections/PulseBentoSection"
import Marquee from "@/components/Marquee"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PulseBentoSection />
      <ProjectsSection />
      <WorkflowSection />
      <Marquee />
      <AboutSection />
      <Footer />
    </main>
  )
}
