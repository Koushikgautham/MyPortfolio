'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Location {
  name: string;
  lat: number;
  lng: number;
  year: string;
  description: string;
}

const locations: Location[] = [
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, year: '2004', description: 'Born' },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, year: '2014', description: 'Delhi Private School' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, year: '2022', description: 'HITS - B.Tech' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, year: '2024', description: 'Shibaura Institute' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, year: '2025', description: 'Final Year' },
];

// Convert lat/lng to rotation angles for the globe
function getRotationForLocation(lat: number, lng: number): { x: number; y: number } {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  return {
    x: -latRad * 0.3,
    y: -lngRad - Math.PI / 2,
  };
}

// Convert lat/lng to 3D position on sphere surface
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Pulsing sphere wave that expands from marker
function MarkerPulseWave({ delay }: { delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const time = (Date.now() * 0.001 + delay) % 2; // 2 second cycle
      const progress = time / 2;

      // Scale from 0 to 1
      const scale = progress * 0.25;
      // Fade out as it expands
      const opacity = 0.1 * (1 - progress);

      meshRef.current.scale.setScalar(scale);
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#ff6b00" transparent opacity={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Location marker component
function LocationMarker({
  lat,
  lng,
  isActive,
  radius = 1.02
}: {
  lat: number;
  lng: number;
  isActive: boolean;
  radius?: number;
}) {
  const position = useMemo(() => latLngToVector3(lat, lng, radius), [lat, lng, radius]);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isActive) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Core marker dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[isActive ? 0.04 : 0.02, 16, 16]} />
        <meshBasicMaterial color={isActive ? '#ff6b00' : '#888888'} />
      </mesh>

      {/* Pulsing waves expanding in all directions - only for active marker */}
      {isActive && (
        <>
          <MarkerPulseWave delay={0} />
          <MarkerPulseWave delay={0.5} />
          <MarkerPulseWave delay={1} />
          <MarkerPulseWave delay={1.5} />
          <pointLight color="#ff6b00" intensity={1} distance={0.8} />
        </>
      )}
    </group>
  );
}

// Globe grid with latitude and longitude lines
function GlobeGrid() {
  const gridLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const radius = 1.01;

    // Create latitude lines (horizontal circles)
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      const latRad = (lat * Math.PI) / 180;
      const r = radius * Math.cos(latRad);
      const y = radius * Math.sin(latRad);

      for (let lng = 0; lng <= 360; lng += 5) {
        const lngRad = (lng * Math.PI) / 180;
        points.push(new THREE.Vector3(r * Math.cos(lngRad), y, r * Math.sin(lngRad)));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geometry);
    }

    // Create longitude lines (vertical arcs)
    for (let lng = 0; lng < 360; lng += 30) {
      const points: THREE.Vector3[] = [];
      const lngRad = (lng * Math.PI) / 180;

      for (let lat = -90; lat <= 90; lat += 5) {
        const latRad = (lat * Math.PI) / 180;
        const r = radius * Math.cos(latRad);
        const y = radius * Math.sin(latRad);
        points.push(new THREE.Vector3(r * Math.cos(lngRad), y, r * Math.sin(lngRad)));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geometry);
    }

    return lines;
  }, []);

  return (
  <group>
    {gridLines.map((geometry, index) => (
      <line key={index}>
        <primitive object={geometry} attach="geometry" />
        <lineBasicMaterial color="#ff6b00" transparent opacity={0.4} />
      </line>
    ))}
  </group>
);

}

// Main globe component
function Globe({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const location = locations[activeIndex];
    if (location) {
      const rot = getRotationForLocation(location.lat, location.lng);
      targetRotation.current = rot;
    }
  }, [activeIndex]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.05
      );
      // Subtle continuous rotation
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main globe sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.6}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Inner core glow */}
      <Sphere args={[0.95, 32, 32]}>
        <meshBasicMaterial color="#2a2a4a" transparent opacity={0.5} />
      </Sphere>

      {/* Grid lines */}
      <GlobeGrid />

      {/* Location markers */}
      {locations.map((loc, index) => (
        <LocationMarker
          key={`${loc.name}-${loc.year}`}
          lat={loc.lat}
          lng={loc.lng}
          isActive={index === activeIndex}
        />
      ))}

      {/* Atmosphere glow */}
      <Sphere args={[1.08, 32, 32]}>
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere args={[1.15, 32, 32]}>
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

// Scene setup
function Scene({ activeIndex }: { activeIndex: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 2.8);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff6b00" />
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
      <Globe activeIndex={activeIndex} />
    </>
  );
}

interface Globe3DProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  onLocationChange?: (index: number, location: Location) => void;
}

export default function Globe3D({ sectionRef, onLocationChange }: Globe3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.min(Math.floor(progress * 5), 4);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
          onLocationChange?.(newIndex, locations[newIndex]);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [sectionRef, activeIndex, onLocationChange]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}

export { locations };
export type { Location };