import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function PCBModel() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Gentle floating and precise rotation
            groupRef.current.rotation.y += delta * 0.3;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.5; // slight rocking
            groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Board */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[4, 0.1, 3]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.2} />
            </mesh>

            {/* Processor / Chip */}
            <mesh position={[0, 0.1, 0]} castShadow>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
            </mesh>

            {/* RAM Slots */}
            <mesh position={[1.2, 0.1, 0.8]} castShadow>
                <boxGeometry args={[0.2, 0.15, 1.5]} />
                <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
            </mesh>
            <mesh position={[1.5, 0.1, 0.8]} castShadow>
                <boxGeometry args={[0.2, 0.15, 1.5]} />
                <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
            </mesh>

            {/* Capacitors */}
            <mesh position={[-1.5, 0.1, -1]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.25, 16]} />
                <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-1.2, 0.1, -1]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.25, 16]} />
                <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Glowing Paths / Traces */}
            <group position={[0, 0.06, 0]}>
                {/* Trace 1: Blue Link */}
                <mesh position={[-0.8, 0, 0.5]}>
                    <boxGeometry args={[0.6, 0.01, 0.02]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} toneMapped={false} />
                </mesh>
                <mesh position={[-1.1, 0, 0.2]} rotation={[0, Math.PI / 4, 0]}>
                    <boxGeometry args={[0.4, 0.01, 0.02]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} toneMapped={false} />
                </mesh>

                {/* Trace 2: Yellow Link */}
                <mesh position={[0.7, 0, -0.6]} rotation={[0, -Math.PI / 4, 0]}>
                    <boxGeometry args={[0.5, 0.01, 0.02]} />
                    <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={2} toneMapped={false} />
                </mesh>
                <mesh position={[1.2, 0, -0.77]}>
                    <boxGeometry args={[0.7, 0.01, 0.02]} />
                    <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={2} toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
}
