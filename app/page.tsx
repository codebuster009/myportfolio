import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import ServicesSection from "@/components/sections/ServicesSection"
import WorkflowSection from "@/components/sections/WorkflowSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import TechnologiesSection from "@/components/sections/TechnologiesSection"
import ContactSection from "@/components/sections/ContactSection"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkflowSection />
      <ProjectsSection />
      <TechnologiesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}


