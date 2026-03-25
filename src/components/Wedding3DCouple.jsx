import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedCouple = () => {
    const groomRef = useRef();
    const brideRef = useRef();
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.2;
        }
        if (groomRef.current && brideRef.current) {
            groomRef.current.position.y = Math.sin(t * 2) * 0.05 + 0.5;
            brideRef.current.position.y = Math.sin(t * 2 + 0.5) * 0.05 + 0.4;

            groomRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
            brideRef.current.rotation.z = Math.sin(t * 1.5 + 0.5) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.8, 0]}>
            {/* Base Pedestal */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[1.5, 1.8, 0.2, 64]} />
                <meshPhysicalMaterial color="#ffffff" roughness={0.1} metalness={0.1} clearcoat={1} />
            </mesh>

            {/* Groom */}
            <group ref={groomRef} position={[-0.4, 0.5, 0]}>
                {/* Head */}
                <mesh position={[0, 1.2, 0]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshPhysicalMaterial color="#ffcda0" roughness={0.3} />
                </mesh>
                {/* Body (Suit) */}
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.25, 0.35, 1.2, 32]} />
                    <meshPhysicalMaterial color="#0f172a" roughness={0.8} />
                </mesh>
                {/* Bow tie */}
                <mesh position={[0, 0.8, 0.26]}>
                    <boxGeometry args={[0.2, 0.08, 0.05]} />
                    <meshPhysicalMaterial color="#ffffff" roughness={0.8} />
                </mesh>
            </group>

            {/* Bride */}
            <group ref={brideRef} position={[0.4, 0.4, 0.2]}>
                {/* Head */}
                <mesh position={[0, 1.1, 0]}>
                    <sphereGeometry args={[0.28, 32, 32]} />
                    <meshPhysicalMaterial color="#ffe0bd" roughness={0.3} />
                </mesh>
                {/* Body (Dress) */}
                <mesh position={[0, 0.1, 0]}>
                    <coneGeometry args={[0.7, 1.4, 64]} />
                    <meshPhysicalMaterial color="#ffffff" roughness={0.1} metalness={0.1} transmission={0.2} opacity={0.9} transparent />
                </mesh>
                {/* Veil */}
                <mesh position={[0, 1.1, -0.2]}>
                    <sphereGeometry args={[0.35, 32, 32, 0, Math.PI]} />
                    <meshPhysicalMaterial color="#ffffff" roughness={0} transmission={0.9} transparent opacity={0.5} />
                </mesh>
            </group>

            {/* Magical Particles */}
            <Sparkles count={60} scale={3} size={2} speed={0.5} opacity={0.6} color="#fbbf24" />
            <Sparkles count={40} scale={4} size={1.5} speed={0.3} opacity={0.4} color="#3b82f6" />
        </group>
    );
};

const Wedding3DCouple = () => {
    return (
        <div className="w-full h-[400px] md:h-[500px] relative z-20 mt-8 mb-4 pointer-events-auto cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <spotLight position={[-5, 5, -5]} intensity={1.5} color="#fbbf24" angle={0.5} penumbra={1} />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                    <AnimatedCouple />
                </Float>

                <Environment preset="city" />
                <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={5} blur={2.5} far={2} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2 + 0.1}
                />
            </Canvas>
        </div>
    );
};

export default Wedding3DCouple;
