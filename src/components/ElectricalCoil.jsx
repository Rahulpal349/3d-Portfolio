import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ElectricalCoil() {
    const groupRef = useRef();
    const currentRef = useRef();

    // Procedural geometry for a coil (Helix/Spring shape)
    // We use a TubeGeometry fitted to a spiral curve
    class CoilCurve extends THREE.Curve {
        constructor(scale = 1) {
            super();
            this.scale = scale;
        }
        getPoint(t, optionalTarget = new THREE.Vector3()) {
            // t goes from 0 to 1
            const turns = 5; // Number of loops
            const radius = 1;
            const height = 3;

            const angle = t * Math.PI * 2 * turns;
            const r = radius;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = (t - 0.5) * height; // Center vertically

            return optionalTarget.set(x, y, z).multiplyScalar(this.scale);
        }
    }

    const coilPath = new CoilCurve(1);

    // Animate rotation and the inner glowing "current"
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Slow smooth rotation
            groupRef.current.rotation.y += delta * 0.2;
            groupRef.current.rotation.x += delta * 0.1;
        }
        if (currentRef.current) {
            // Pulsing glow effect based on time
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5; // 0 to 1
            currentRef.current.material.emissiveIntensity = 0.2 + pulse * 1.5;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Outer Copper Coil */}
            <mesh castShadow receiveShadow>
                <tubeGeometry args={[coilPath, 100, 0.15, 8, false]} />
                <meshPhysicalMaterial
                    color="#b87333" // Copper base
                    metalness={0.9}
                    roughness={0.2}
                    clearcoat={0.5}
                />
            </mesh>

            {/* Inner Glowing Current (slightly thinner tube) */}
            <mesh ref={currentRef} castShadow={false}>
                <tubeGeometry args={[coilPath, 100, 0.08, 8, false]} />
                <meshStandardMaterial
                    color="#60a5fa" // Light blue core
                    emissive="#3b82f6" // Emissive blue
                    emissiveIntensity={1}
                    toneMapped={false} // Prevent tone mapping from dulling the emissive color
                />
            </mesh>

            {/* Central Core (Iron Core) */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 3.5, 16]} />
                <meshStandardMaterial
                    color="#334155" // Slate dark
                    metalness={0.7}
                    roughness={0.5}
                />
            </mesh>
        </group>
    );
}
