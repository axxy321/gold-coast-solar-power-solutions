import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

function SolarPanel(props: any) {
  return (
    <group {...props}>
      {/* Panel Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Solar Cells (Blue Glass) */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[3.8, 2.3, 0.05]} />
        <meshStandardMaterial 
          color="#1d4ed8" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#172554"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Grid Lines (Horizontal) */}
      {[...Array(5)].map((_, i) => (
        <mesh key={`h-${i}`} position={[0, (i - 2) * 0.5, 0.09]}>
          <boxGeometry args={[3.8, 0.02, 0.01]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.5} />
        </mesh>
      ))}
      
      {/* Grid Lines (Vertical) */}
      {[...Array(9)].map((_, i) => (
        <mesh key={`v-${i}`} position={[(i - 4) * 0.45, 0, 0.09]}>
          <boxGeometry args={[0.02, 2.3, 0.01]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.5} />
        </mesh>
      ))}

      {/* Stand/Mount */}
      <group position={[0, 0, -0.5]} rotation={[0.5, 0, 0]}>
        <mesh position={[1.5, -1, 0]}>
           <cylinderGeometry args={[0.05, 0.05, 2.5]} />
           <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[-1.5, -1, 0]}>
           <cylinderGeometry args={[0.05, 0.05, 2.5]} />
           <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </group>
    </group>
  )
}

function HVACUnit(props: any) {
    const fanRef = useRef<THREE.Group>(null!);
    
    useFrame((state, delta) => {
        if(fanRef.current) {
            // Spin faster based on mouse x position if available, or just constant
            fanRef.current.rotation.z -= delta * 8;
        }
    });

    return (
        <group {...props}>
            {/* Main Box */}
            <mesh position={[0,0,0]} castShadow receiveShadow>
                <boxGeometry args={[2.2, 2.2, 2.2]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.5} metalness={0.1} />
            </mesh>
            
            {/* Top Cap */}
            <mesh position={[0, 1.15, 0]}>
                <boxGeometry args={[2.3, 0.1, 2.3]} />
                <meshStandardMaterial color="#cbd5e1" />
            </mesh>

            {/* Fan Grille Area (Front) */}
            <mesh position={[0, 0, 1.11]} rotation={[Math.PI/2, 0, 0]}>
                 <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
                 <meshStandardMaterial color="#1e293b" />
            </mesh>
            
            {/* Fan Blades */}
            <group ref={fanRef} position={[0, 0, 1.2]}>
                 <mesh>
                    <boxGeometry args={[0.3, 1.6, 0.05]} />
                    <meshStandardMaterial color="#475569" />
                 </mesh>
                 <mesh rotation={[0, 0, Math.PI/3]}>
                    <boxGeometry args={[0.3, 1.6, 0.05]} />
                    <meshStandardMaterial color="#475569" />
                 </mesh>
                 <mesh rotation={[0, 0, 2*Math.PI/3]}>
                    <boxGeometry args={[0.3, 1.6, 0.05]} />
                    <meshStandardMaterial color="#475569" />
                 </mesh>
            </group>

            {/* Side Vents */}
            <mesh position={[1.11, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                <boxGeometry args={[1.5, 0.1, 1.5]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
            
            {/* Logo Placeholder */}
            <mesh position={[0, 0.8, 1.12]}>
                <boxGeometry args={[0.6, 0.2, 0.01]} />
                <meshStandardMaterial color="#f59e0b" />
            </mesh>
        </group>
    )
}

export default function Hero3D() {
    return (
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
            
            <Environment preset="city" />

            <PresentationControls
                global
                snap
                rotation={[0, -0.2, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
                <Float rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                    {/* Solar Panel Group */}
                    <group position={[-1.5, 0.5, 0]} rotation={[0.2, 0.4, 0]}>
                        <SolarPanel scale={0.8} />
                    </group>
                    
                    {/* HVAC Unit Group */}
                    <group position={[2, -1, 1]} rotation={[0, -0.5, 0]}>
                        <HVACUnit scale={0.7} />
                    </group>
                </Float>
            </PresentationControls>
            
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </Canvas>
    )
}
