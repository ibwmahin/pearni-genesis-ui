
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { Mesh } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  name: string;
  onClick: () => void;
}

const Planet = ({ position, size, color, name, onClick }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[size, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <meshStandardMaterial color={color} />
      </Sphere>
      {hovered && (
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

const planetData = [
  { name: 'Sun', position: [0, 0, 0] as [number, number, number], size: 1.5, color: '#FDB813', info: 'The Sun is the star at the center of the Solar System. It is a massive ball of hot, glowing gases.' },
  { name: 'Mercury', position: [3, 0, 0] as [number, number, number], size: 0.2, color: '#8C7853', info: 'Mercury is the smallest planet and closest to the Sun. A day on Mercury lasts 176 Earth days.' },
  { name: 'Venus', position: [4.5, 0, 0] as [number, number, number], size: 0.3, color: '#FFC649', info: 'Venus is the hottest planet with surface temperatures of 900°F (475°C). It rotates backwards!' },
  { name: 'Earth', position: [6, 0, 0] as [number, number, number], size: 0.35, color: '#6B93D6', info: 'Earth is the only known planet with life. It has liquid water and a protective atmosphere.' },
  { name: 'Mars', position: [8, 0, 0] as [number, number, number], size: 0.25, color: '#C1440E', info: 'Mars is known as the Red Planet. It has the largest volcano in the solar system, Olympus Mons.' },
  { name: 'Jupiter', position: [12, 0, 0] as [number, number, number], size: 0.8, color: '#D8CA9D', info: 'Jupiter is the largest planet. Its Great Red Spot is a storm larger than Earth that has raged for centuries.' },
  { name: 'Saturn', position: [16, 0, 0] as [number, number, number], size: 0.7, color: '#FAD5A5', info: 'Saturn is famous for its beautiful rings made of ice and rock particles.' },
];

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<typeof planetData[0] | null>(null);

  return (
    <div className="relative">
      <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/30 h-96">
        <CardHeader>
          <CardTitle className="text-purple-400">Interactive Solar System</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={2} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            
            {planetData.map((planet) => (
              <Planet
                key={planet.name}
                position={planet.position}
                size={planet.size}
                color={planet.color}
                name={planet.name}
                onClick={() => setSelectedPlanet(planet)}
              />
            ))}
          </Canvas>
        </CardContent>
      </Card>

      {selectedPlanet && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
          <Card className="bg-black/90 border border-purple-500/50 max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-purple-400">{selectedPlanet.name}</CardTitle>
              <button
                onClick={() => setSelectedPlanet(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{selectedPlanet.info}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
