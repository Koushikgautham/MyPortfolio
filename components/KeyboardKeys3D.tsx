'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface KeyProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  label: string;
  size?: [number, number, number];
  color?: string;
  delay?: number;
}

function Key({ position, rotation = [0, 0, 0], label, size = [1, 1, 0.3], color = '#1a1a1a' }: KeyProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Key base */}
        <RoundedBox
          ref={meshRef}
          args={size}
          radius={0.08}
          smoothness={4}
        >
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.1}
          />
        </RoundedBox>

        {/* Key top surface (slightly inset) */}
        <RoundedBox
          args={[size[0] * 0.85, size[1] * 0.85, 0.05]}
          position={[0, 0, size[2] / 2 - 0.02]}
          radius={0.05}
          smoothness={4}
        >
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            metalness={0.05}
          />
        </RoundedBox>

        {/* Key label */}
        <Text
          position={[0, 0, size[2] / 2 + 0.01]}
          fontSize={size[0] * 0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/geist-mono.woff"
        >
          {label}
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.5}
          />
        </Text>
      </group>
    </Float>
  );
}

function OrangeKey({ position, rotation = [0, 0, 0], label, size = [1, 1, 0.3] }: KeyProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.5 + 1) * 0.02;
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3 + 1) * 0.02;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Key base */}
        <RoundedBox
          args={size}
          radius={0.08}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#ff6b00"
            roughness={0.2}
            metalness={0.3}
            emissive="#ff6b00"
            emissiveIntensity={0.1}
          />
        </RoundedBox>

        {/* Key top surface */}
        <RoundedBox
          args={[size[0] * 0.85, size[1] * 0.85, 0.05]}
          position={[0, 0, size[2] / 2 - 0.02]}
          radius={0.05}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#ff6b00"
            roughness={0.3}
            metalness={0.2}
            emissive="#ff6b00"
            emissiveIntensity={0.05}
          />
        </RoundedBox>

        {/* Key label */}
        <Text
          position={[0, 0, size[2] / 2 + 0.01]}
          fontSize={size[0] * 0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-3, 3, 2]} intensity={0.3} />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#ff6b00" />

      {/* Keyboard keys arranged in a floating pattern */}
      {/* Top row */}
      <Key position={[-0.8, 1.5, 0]} rotation={[-0.2, 0.3, 0.1]} label="<" size={[0.9, 0.9, 0.25]} />
      <OrangeKey position={[0.3, 1.8, 0.5]} rotation={[-0.15, -0.2, -0.05]} label="/" size={[0.9, 0.9, 0.25]} />
      <Key position={[1.4, 1.3, -0.2]} rotation={[-0.25, 0.1, 0.15]} label=">" size={[0.9, 0.9, 0.25]} />

      {/* Middle row */}
      <Key position={[-1.2, 0.3, 0.3]} rotation={[-0.1, 0.4, -0.1]} label="{" size={[0.9, 0.9, 0.25]} />
      <OrangeKey position={[0, 0, 0.8]} rotation={[-0.1, 0, 0]} label="K" size={[1.1, 1.1, 0.3]} />
      <Key position={[1.3, 0.2, 0.2]} rotation={[-0.15, -0.3, 0.1]} label="}" size={[0.9, 0.9, 0.25]} />

      {/* Bottom row */}
      <Key position={[-0.6, -1.2, 0.1]} rotation={[-0.2, 0.2, -0.15]} label="[" size={[0.85, 0.85, 0.25]} />
      <Key position={[0.5, -1.4, 0.4]} rotation={[-0.1, -0.15, 0.1]} label="]" size={[0.85, 0.85, 0.25]} />
      <OrangeKey position={[1.5, -0.8, 0]} rotation={[-0.2, -0.25, -0.1]} label=";" size={[0.85, 0.85, 0.25]} />
    </>
  );
}

export default function KeyboardKeys3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
