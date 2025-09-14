import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Heart shape function to generate particle positions
const generateHeartShape = (numPoints: number = 1000) => {
  const points = new Float32Array(numPoints * 3);
  
  for (let i = 0; i < numPoints; i++) {
    const t = Math.random() * Math.PI * 2;
    const u = Math.random();
    
    // Heart equation in 3D
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const z = (Math.random() - 0.5) * 8; // Add depth
    
    // Scale and position (made bigger)
    points[i * 3] = x * 0.08;
    points[i * 3 + 1] = y * 0.08;
    points[i * 3 + 2] = z * 0.08;
  }
  
  return points;
};

interface HeartParticlesProps {
  scrollY: number;
}

const HeartParticles: React.FC<HeartParticlesProps> = ({ scrollY }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateHeartShape(800), []);
  
  // Ethereal gradient colors from warm pinks/oranges to cool blues/teals
  const colors = useMemo(() => {
    const colorArray = new Float32Array(positions.length);
    for (let i = 0; i < positions.length / 3; i++) {
      // Create gradient based on particle position
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const gradientFactor = (x + 0.5) / 1.0; // Normalize to 0-1
      
      if (gradientFactor < 0.33) {
        // Warm oranges: hsl(25, 100%, 70%)
        colorArray[i * 3] = 1.0;      // r
        colorArray[i * 3 + 1] = 0.6;  // g
        colorArray[i * 3 + 2] = 0.4;  // b
      } else if (gradientFactor < 0.66) {
        // Warm pinks: hsl(330, 100%, 75%)
        colorArray[i * 3] = 1.0;      // r
        colorArray[i * 3 + 1] = 0.5;  // g
        colorArray[i * 3 + 2] = 0.8;  // b
      } else {
        // Cool blues/teals: hsl(180, 100%, 70%)
        colorArray[i * 3] = 0.4;      // r
        colorArray[i * 3 + 1] = 0.9;  // g
        colorArray[i * 3 + 2] = 1.0;  // b
      }
    }
    return colorArray;
  }, [positions]);

  useFrame((state) => {
    if (ref.current) {
      // Scroll down = rotate and zoom out, scroll up = reverse (faster movement)
      const rotationSpeed = scrollY * 0.008;
      ref.current.rotation.y = rotationSpeed;
      ref.current.rotation.x = Math.sin(rotationSpeed * 0.7) * 0.3;
      
      // Faster floating animation
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
      
      // Zoom out as scroll down, zoom in as scroll up (bigger scale range)
      const scrollFactor = Math.min(scrollY / 1000, 1); // Normalize scroll
      const scale = 2.0 - (scrollFactor * 1.2); // Scale from 2.0 to 0.8 (bigger)
      ref.current.scale.setScalar(Math.max(0.5, scale));
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        size={0.06}
        sizeAttenuation={true}
        vertexColors
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

interface ParticleHeartProps {
  className?: string;
}

export const ParticleHeart: React.FC<ParticleHeartProps> = ({ className = "" }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <HeartParticles scrollY={scrollY} />
      </Canvas>
    </div>
  );
};