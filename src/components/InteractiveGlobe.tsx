import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

const Earth = () => {
  const meshRef = useRef<Mesh>(null);
  
  // Auto-rotate the globe
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#4ade80"
        roughness={0.3}
        metalness={0.1}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

const InteractiveGlobe = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-green-400/20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-10 pointer-events-none" />
      
      {/* Globe Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Globe */}
          <Earth />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            minDistance={5}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute top-8 left-8 z-20 max-w-md">
        <div className="bg-background/90 backdrop-blur-md rounded-xl p-6 border border-border/50">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Global Impact
          </h3>
          <p className="text-muted-foreground mb-4">
            Explore our worldwide sustainability initiatives and see how EcoSphere is making a difference across the globe.
          </p>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50M+</div>
              <div className="text-sm text-muted-foreground">People Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">1B+</div>
              <div className="text-sm text-muted-foreground">Kg Waste Sorted</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="absolute bottom-8 right-8 z-20">
        <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg">
          Join Community
        </button>
      </div>
    </div>
  );
};

export default InteractiveGlobe;