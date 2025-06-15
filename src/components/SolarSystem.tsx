
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Ring, Stars } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  name: string;
  onClick: () => void;
  hasRings?: boolean;
  moons?: { distance: number; size: number; speed: number }[];
}

const Planet = ({ position, size, color, name, onClick, hasRings, moons }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
    if (groupRef.current && moons) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position}>
      {/* Main Planet */}
      <Sphere
        ref={meshRef}
        args={[size, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <meshStandardMaterial 
          color={color} 
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* Saturn's Rings */}
      {hasRings && (
        <>
          <Ring args={[size * 1.5, size * 2.2, 64]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#FAD5A5" transparent opacity={0.6} />
          </Ring>
          <Ring args={[size * 2.3, size * 2.8, 64]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#E6C79A" transparent opacity={0.4} />
          </Ring>
        </>
      )}

      {/* Moons */}
      {moons && (
        <group ref={groupRef}>
          {moons.map((moon, index) => (
            <group key={index} rotation={[0, index * Math.PI / 2, 0]}>
              <Sphere args={[moon.size, 16, 16]} position={[moon.distance, 0, 0]}>
                <meshStandardMaterial color="#8C8C8C" roughness={0.9} />
              </Sphere>
            </group>
          ))}
        </group>
      )}

      {/* Planet Name */}
      {hovered && (
        <Text
          position={[0, size + 0.8, 0]}
          fontSize={0.4}
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

const AsteroidBelt = () => {
  const asteroids = Array.from({ length: 50 }, (_, i) => ({
    position: [
      Math.cos(i * 0.5) * (9 + Math.random() * 2),
      (Math.random() - 0.5) * 0.5,
      Math.sin(i * 0.5) * (9 + Math.random() * 2)
    ] as [number, number, number],
    size: 0.02 + Math.random() * 0.03
  }));

  return (
    <group>
      {asteroids.map((asteroid, index) => (
        <Sphere key={index} args={[asteroid.size, 8, 8]} position={asteroid.position}>
          <meshStandardMaterial color="#8C7853" roughness={1} />
        </Sphere>
      ))}
    </group>
  );
};

const planetData = [
  { 
    name: 'Sun', 
    position: [0, 0, 0] as [number, number, number], 
    size: 1.5, 
    color: '#FDB813', 
    info: 'The Sun is the star at the center of the Solar System. It is a massive ball of hot, glowing gases that provides energy for all life on Earth.',
    hasRings: false
  },
  { 
    name: 'Mercury', 
    position: [3, 0, 0] as [number, number, number], 
    size: 0.2, 
    color: '#8C7853', 
    info: 'Mercury is the smallest planet and closest to the Sun. A day on Mercury lasts 176 Earth days, and temperatures can reach 800°F.',
    hasRings: false
  },
  { 
    name: 'Venus', 
    position: [4.5, 0, 0] as [number, number, number], 
    size: 0.3, 
    color: '#FFC649', 
    info: 'Venus is the hottest planet with surface temperatures of 900°F (475°C). It rotates backwards and has a thick, toxic atmosphere!',
    hasRings: false
  },
  { 
    name: 'Earth', 
    position: [6, 0, 0] as [number, number, number], 
    size: 0.35, 
    color: '#6B93D6', 
    info: 'Earth is the only known planet with life. It has liquid water, a protective atmosphere, and the perfect distance from the Sun.',
    hasRings: false,
    moons: [{ distance: 0.8, size: 0.08, speed: 0.02 }]
  },
  { 
    name: 'Mars', 
    position: [8, 0, 0] as [number, number, number], 
    size: 0.25, 
    color: '#C1440E', 
    info: 'Mars is known as the Red Planet. It has the largest volcano in the solar system, Olympus Mons, and evidence of ancient water flows.',
    hasRings: false,
    moons: [
      { distance: 0.6, size: 0.03, speed: 0.03 },
      { distance: 0.9, size: 0.02, speed: 0.015 }
    ]
  },
  { 
    name: 'Jupiter', 
    position: [12, 0, 0] as [number, number, number], 
    size: 0.8, 
    color: '#D8CA9D', 
    info: 'Jupiter is the largest planet. Its Great Red Spot is a storm larger than Earth that has raged for centuries. It has over 80 moons!',
    hasRings: false,
    moons: [
      { distance: 1.2, size: 0.06, speed: 0.02 },
      { distance: 1.5, size: 0.05, speed: 0.015 },
      { distance: 1.8, size: 0.04, speed: 0.01 },
      { distance: 2.1, size: 0.04, speed: 0.008 }
    ]
  },
  { 
    name: 'Saturn', 
    position: [16, 0, 0] as [number, number, number], 
    size: 0.7, 
    color: '#FAD5A5', 
    info: 'Saturn is famous for its beautiful rings made of ice and rock particles. It has 83 known moons and could float in water!',
    hasRings: true,
    moons: [
      { distance: 3.2, size: 0.08, speed: 0.01 },
      { distance: 3.8, size: 0.03, speed: 0.008 }
    ]
  },
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
          <Canvas camera={{ position: [0, 8, 20], fov: 60 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="white" />
            
            {/* Background Stars */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Orbital Controls */}
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={5}
              maxDistance={50}
            />
            
            {/* Planets */}
            {planetData.map((planet) => (
              <Planet
                key={planet.name}
                position={planet.position}
                size={planet.size}
                color={planet.color}
                name={planet.name}
                hasRings={planet.hasRings}
                moons={planet.moons}
                onClick={() => setSelectedPlanet(planet)}
              />
            ))}

            {/* Asteroid Belt */}
            <AsteroidBelt />
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
