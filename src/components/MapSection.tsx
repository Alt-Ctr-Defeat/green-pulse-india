import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MapSection = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample data for Indian states
  const stateData = {
    "Maharashtra": {
      problems: [
        "Mumbai generates 12,000 tons of waste daily",
        "Poor drainage systems causing waterlogging",
        "Air pollution from waste burning"
      ],
      solutions: [
        "Smart bin IoT monitoring system",
        "Waste-to-energy plants in Pune",
        "Mobile app for waste collection scheduling"
      ],
      stats: { wasteGeneration: "25,000 tons/day", recyclingRate: "45%" }
    },
    "Delhi": {
      problems: [
        "Overflowing landfills in Bhalswa and Okhla",
        "Air quality severely affected by waste",
        "Informal waste picking creating health hazards"
      ],
      solutions: [
        "Automated waste segregation facilities",
        "Bio-gas plants for organic waste",
        "Door-to-door collection digitization"
      ],
      stats: { wasteGeneration: "11,000 tons/day", recyclingRate: "25%" }
    },
    "Karnataka": {
      problems: [
        "Electronic waste management in Bangalore",
        "Plastic waste accumulation",
        "Inadequate composting facilities"
      ],
      solutions: [
        "E-waste recycling centers",
        "Community composting programs",
        "Plastic waste buy-back schemes"
      ],
      stats: { wasteGeneration: "8,500 tons/day", recyclingRate: "38%" }
    },
    "Tamil Nadu": {
      problems: [
        "Coastal pollution from plastic waste",
        "Industrial waste contamination",
        "Urban flooding due to blocked drains"
      ],
      solutions: [
        "Coastal cleanup automation",
        "Industrial waste treatment plants",
        "Smart drainage monitoring systems"
      ],
      stats: { wasteGeneration: "15,200 tons/day", recyclingRate: "42%" }
    },
    "Gujarat": {
      problems: [
        "Chemical waste from industrial zones",
        "Water contamination from landfills",
        "Lack of waste segregation awareness"
      ],
      solutions: [
        "Hazardous waste treatment facilities",
        "Groundwater protection systems",
        "Community education programs"
      ],
      stats: { wasteGeneration: "9,800 tons/day", recyclingRate: "35%" }
    }
  };

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedState(null);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/20">
          <MapPin className="mr-2 h-4 w-4" />
          Interactive India Map
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Explore <span className="text-gradient">Waste Management</span>
          <br />Across India
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Click on any state to discover specific waste management challenges, innovative solutions, 
          and sustainability initiatives being implemented across the country.
        </p>
      </div>

      {/* Interactive Map Area */}
      <div className="bg-gradient-earth rounded-2xl p-8 md:p-12 mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Click on States to Explore</h3>
          <p className="text-muted-foreground">Select from the major states below to view detailed information</p>
        </div>

        {/* Simplified State Buttons for Demo */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {Object.keys(stateData).map((state) => (
            <Button
              key={state}
              variant="outline"
              className="map-state p-4 h-auto flex flex-col items-center bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all duration-300"
              onClick={() => handleStateClick(state)}
            >
              <MapPin className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">{state}</span>
            </Button>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground italic">
            Interactive map with all 28 states and union territories coming soon!
          </p>
        </div>
      </div>

      {/* State Information Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="card-eco p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Current Challenges</h3>
          <p className="text-muted-foreground">
            Identify and understand the waste management and sanitization problems affecting each region.
          </p>
        </Card>

        <Card className="card-eco p-6 text-center">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Innovative Solutions</h3>
          <p className="text-muted-foreground">
            Discover AI-powered and technology-driven solutions being implemented to address these challenges.
          </p>
        </Card>

        <Card className="card-eco p-6 text-center">
          <Info className="h-12 w-12 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
          <p className="text-muted-foreground">
            Monitor real-time statistics and improvement metrics for sustainable development goals.
          </p>
        </Card>
      </div>

      {/* State Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-2xl">
              <span className="flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-primary" />
                {selectedState}
              </span>
              <Button variant="ghost" size="sm" onClick={closeDialog}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedState && stateData[selectedState as keyof typeof stateData] && (
            <div className="space-y-6">
              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center bg-primary/5">
                  <div className="text-2xl font-bold text-primary">
                    {stateData[selectedState as keyof typeof stateData].stats.wasteGeneration}
                  </div>
                  <div className="text-sm text-muted-foreground">Daily Waste Generation</div>
                </Card>
                <Card className="p-4 text-center bg-accent/5">
                  <div className="text-2xl font-bold text-accent">
                    {stateData[selectedState as keyof typeof stateData].stats.recyclingRate}
                  </div>
                  <div className="text-sm text-muted-foreground">Recycling Rate</div>
                </Card>
              </div>

              {/* Problems */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
                  Current Challenges
                </h4>
                <div className="space-y-2">
                  {stateData[selectedState as keyof typeof stateData].problems.map((problem, index) => (
                    <Card key={index} className="p-3 bg-warning/5 border-warning/20">
                      <p className="text-sm">{problem}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  Implemented Solutions
                </h4>
                <div className="space-y-2">
                  {stateData[selectedState as keyof typeof stateData].solutions.map((solution, index) => (
                    <Card key={index} className="p-3 bg-primary/5 border-primary/20">
                      <p className="text-sm">{solution}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapSection;