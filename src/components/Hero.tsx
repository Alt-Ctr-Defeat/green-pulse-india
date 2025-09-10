import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Recycle, MapPin, GamepadIcon } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce-in">
            <Leaf className="h-4 w-4" />
            <span>AI-Powered Urban Sustainability</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">EcoSphere</span>
            <br />
            <span className="text-foreground text-3xl md:text-5xl">
              Transform India's Cities
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up leading-relaxed">
            An AI-powered unified platform revolutionizing waste management, disposal systems, 
            and sanitization across Indian urban landscapes through innovative technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up">
            <Button 
              className="btn-eco text-lg px-8 py-3"
              onClick={() => scrollToSection("map")}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Explore India Map
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-3 bg-background/50 backdrop-blur-sm hover:bg-background/80"
              onClick={() => scrollToSection("game")}
            >
              <GamepadIcon className="mr-2 h-5 w-5" />
              Play Waste Game
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-scale-in">
            <Card className="card-eco p-6 text-left">
              <Recycle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Waste Segregation</h3>
              <p className="text-muted-foreground">
                AI-powered bins that automatically sort waste into organic, recyclable, and general categories.
              </p>
            </Card>

            <Card className="card-eco p-6 text-left">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive State Mapping</h3>
              <p className="text-muted-foreground">
                Explore waste management challenges and solutions across all Indian states and union territories.
              </p>
            </Card>

            <Card className="card-eco p-6 text-left">
              <GamepadIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Educational Gaming</h3>
              <p className="text-muted-foreground">
                Learn proper waste disposal through interactive games and quizzes with real-world impact.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;