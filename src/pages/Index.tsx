import { useState } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import MapSection from "@/components/MapSection";
import WasteGameSection from "@/components/WasteGameSection";
import QuizSection from "@/components/QuizSection";
import AboutSection from "@/components/AboutSection";
import GlobeSection from "@/components/GlobeSection";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background smooth-scroll">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      <section id="about" className="py-20">
        <AboutSection />
      </section>

      <section id="globe" className="py-20 bg-muted/30">
        <GlobeSection />
      </section>

      <section id="map" className="py-20 bg-muted/50">
        <MapSection />
      </section>

      <section id="game" className="py-20">
        <WasteGameSection />
      </section>

      <section id="quiz" className="py-20 bg-muted/50">
        <QuizSection />
      </section>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 btn-eco rounded-full p-3 z-50"
        size="sm"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Index;