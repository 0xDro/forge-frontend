import { useEffect } from 'react';
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ShirtModelProps {
  designUrl: string | null;
}

export function ShirtModel({ designUrl }: ShirtModelProps) {
  const { nodes } = useGLTF('/models/tshirt.glb');

  const tshirtMesh = nodes.tshirt as THREE.Mesh;

  return (
    <group
      scale={0.0007}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, -0.6, 0]}
      dispose={null}
    >
      {/* T-shirt mesh */}
      <mesh geometry={tshirtMesh.geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#f5f5f4"
          roughness={0.85}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
        {designUrl && <DesignDecal designUrl={designUrl} />}
      </mesh>
    </group>
  );
}

function DesignDecal({ designUrl }: { designUrl: string }) {
  const texture = useTexture(designUrl);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return () => texture.dispose();
  }, [texture]);

  return (
    <Decal
      position={[0, 150, -1350]}
      rotation={[0, 0, 0]}
      scale={[300, 400, 300]}
      map={texture}
    />
  );
}

useGLTF.preload('/models/tshirt.glb');
