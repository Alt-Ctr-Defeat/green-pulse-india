import InteractiveGlobe from './InteractiveGlobe';

const GlobeSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Global Sustainability Network
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with our worldwide community working towards a sustainable future. 
          Interact with our 3D globe to explore global environmental initiatives.
        </p>
      </div>
      
      <InteractiveGlobe />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
          <p className="text-muted-foreground">
            Our platform spans across continents, connecting sustainability efforts worldwide.
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤝</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
          <p className="text-muted-foreground">
            Join millions of users contributing to environmental conservation efforts.
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
          <p className="text-muted-foreground">
            Track global sustainability metrics and environmental impact in real-time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobeSection;