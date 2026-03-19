"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ShirtModel } from "./shirt-geometry";

interface ShirtSceneProps {
  imageUrl: string;
}

function AutoRotatingShirt({ imageUrl }: { imageUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <ShirtModel designUrl={imageUrl} />
      </Suspense>
    </group>
  );
}

export function ShirtScene({ imageUrl }: ShirtSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 2.5], fov: 35 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      {/* Hemisphere light for natural sky/ground ambient */}
      <hemisphereLight args={["#ffffff", "#8888aa", 0.5]} />
      {/* Key light */}
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      {/* Fill light */}
      <directionalLight position={[-3, 2, 3]} intensity={0.5} />
      {/* Rim/back light for edge definition */}
      <directionalLight position={[0, 3, -5]} intensity={0.4} />
      {/* Subtle indigo accent from below */}
      <pointLight position={[0, -2, 3]} intensity={0.2} color="#818cf8" />
      <AutoRotatingShirt imageUrl={imageUrl} />
    </Canvas>
  );
}
