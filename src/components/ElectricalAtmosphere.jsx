import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ElectricalAtmosphere() {
    const pointsRef = useRef();
    const gridHelperRef = useRef();

    // 1. Particle Spark System 
    // Generate random positions for subtle glowing sparks floating around
    const particlesCount = 200;
    const posArray = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            // distribute them randomly in a 30x30x30 cube area
            positions[i] = (Math.random() - 0.5) * 30;
        }
        return positions;
    }, [particlesCount]);

    useFrame((state, delta) => {
        // Smooth orbit for the sparks
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
            // Subtle electric hum visual (slight, fast jitter)
            const hum = Math.sin(state.clock.elapsedTime * 50) * 0.005;
            pointsRef.current.position.y = hum;
        }

        // Oscilloscope Grid Lines - Scrolling Effect
        if (gridHelperRef.current) {
            // Move the grid infinitely towards the camera
            gridHelperRef.current.position.z = (state.clock.elapsedTime * 2) % 1;
        }
    });

    return (
        <>
            {/* Spark Particles */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={posArray.length / 3}
                        array={posArray}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    color="#60a5fa" // light blue
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending} // Make them glow intensely when overlapping
                    depthWrite={false} // Prevent depth sorting issues with bloom
                />
            </points>

            {/* Moving Holographic Oscilloscope Grid Floor */}
            {/* We use a GridHelper that resets its position seamlessly based on the 1-unit size */}
            <group position={[0, -4, 0]}>
                <gridHelper
                    ref={gridHelperRef}
                    args={[100, 100, '#3b82f6', '#1e293b']}
                />
                {/* Fade out the grid smoothly into the distance to hide the hard edge */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshBasicMaterial
                        color="#020617"
                        transparent
                        // A very simple radial gradient to fade the grid based on distance from center
                        onBeforeCompile={(shader) => {
                            shader.fragmentShader = shader.fragmentShader.replace(
                                `#include <color_fragment>`,
                                `
                        #include <color_fragment>
                         float dist = length(vUv - 0.5) * 2.0;
                         diffuseColor.a = smoothstep(0.2, 0.8, dist);
                        `
                            );
                        }}
                    />
                </mesh>
            </group>
        </>
    );
}
