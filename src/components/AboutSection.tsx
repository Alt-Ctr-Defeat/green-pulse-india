import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Lightbulb, 
  Users, 
  TreePine, 
  Shield, 
  Zap,
  Recycle,
  Heart,
  Globe
} from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart Waste Management",
      description: "AI-driven solutions for efficient waste segregation, collection, and disposal systems across urban areas."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enhanced Sanitization",
      description: "Advanced monitoring and improvement of public health through better sanitation infrastructure and practices."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Live tracking of waste management efficiency and environmental impact across different regions."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Engagement",
      description: "Interactive platforms that educate and involve citizens in sustainable urban development practices."
    }
  ];

  const stats = [
    { number: "28", label: "States & UTs", icon: <Globe className="h-5 w-5" /> },
    { number: "1.4B+", label: "Population Served", icon: <Users className="h-5 w-5" /> },
    { number: "85%", label: "Waste Reduction Target", icon: <Recycle className="h-5 w-5" /> },
    { number: "100%", label: "Sustainability Goal", icon: <TreePine className="h-5 w-5" /> }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/20">
          <Heart className="mr-2 h-4 w-4" />
          About EcoSphere
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Revolutionizing Urban 
          <span className="text-gradient block">Sustainability</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          EcoSphere is India's first comprehensive AI-powered platform designed to tackle urban sustainability challenges. 
          Our mission is to create cleaner, healthier, and more sustainable cities through intelligent waste management, 
          improved sanitization systems, and community-driven environmental solutions.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-eco rounded-2xl p-8 md:p-12 mb-16 text-primary-foreground text-center">
        <Lightbulb className="h-12 w-12 mx-auto mb-6 animate-pulse-eco" />
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h3>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          To transform every Indian city into a model of environmental sustainability where technology, 
          community participation, and innovative policies work together to create a cleaner, greener future.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="card-eco p-8 group">
            <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-eco p-6 text-center group">
            <div className="text-primary mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Key Challenges Section */}
      <div className="mt-20">
        <h3 className="text-3xl font-bold text-center mb-12">
          Key <span className="text-gradient">Challenges</span> We Address
        </h3>
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗑️</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Waste Management Crisis</h4>
              <p className="text-sm text-muted-foreground">
                Improper segregation and disposal leading to environmental pollution and health hazards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦠</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Poor Sanitization</h4>
              <p className="text-sm text-muted-foreground">
                Inadequate sanitation infrastructure affecting public health and quality of life.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Lack of Awareness</h4>
              <p className="text-sm text-muted-foreground">
                Limited public education on sustainable practices and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;