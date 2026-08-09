import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import DevelopmentJourney from "@/components/DevelopmentJourney";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import CustomCursor from "@/components/CustomCursor";

export default function HomePage() {
  return (
    <>
      <BackgroundEffects />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Projects />
        <DevelopmentJourney />
        <Services />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
