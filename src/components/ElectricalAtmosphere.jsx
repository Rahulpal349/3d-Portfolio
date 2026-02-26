import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SHAPES = ['capacitor', 'transformer', 'resistor', 'inductor', 'diode'];
const COLORS = ['#3b82f6', '#60a5fa', '#06b6d4', '#8b5cf6', '#10b981', '#eab308', '#f59e0b', '#ec4899'];

// Generate large floating components
function generateComponents(count) {
    const items = [];
    for (let i = 0; i < count; i++) {
        items.push({
            shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            position: [
                (Math.random() - 0.5) * 45,
                (Math.random() - 0.5) * 25,
                -4 - Math.random() * 20,
            ],
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            speed: 0.08 + Math.random() * 0.2,
            rotSpeed: 0.15 + Math.random() * 0.4,
            scale: 1.5 + Math.random() * 2.5,
            offset: Math.random() * Math.PI * 2,
        });
    }
    return items;
}

// Shared materials (created once, reused by all components for performance)
const matCache = {};
function getSharedMat(color, opacity = 0.25, emissive = false) {
    const key = `${color}-${opacity}-${emissive}`;
    if (!matCache[key]) {
        matCache[key] = new THREE.MeshStandardMaterial({
            color,
            transparent: true,
            opacity,
            metalness: 0.7,
            roughness: 0.3,
            ...(emissive ? { emissive: color, emissiveIntensity: 0.3 } : {}),
        });
    }
    return matCache[key];
}

function FloatingComponent({ data }) {
    const ref = useRef();

    useFrame((state, delta) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;
        const lerpFactor = 1 - Math.pow(0.03, delta); // frame-rate independent smoothing

        // Target positions with gentle sine/cosine drift
        const targetY = data.position[1] + Math.sin(t * data.speed + data.offset) * 0.8;
        const targetX = data.position[0] + Math.cos(t * data.speed * 0.5 + data.offset) * 0.4;
        const targetZ = data.position[2] + Math.sin(t * data.speed * 0.3 + data.offset * 2) * 0.2;

        // Smoothly lerp toward target
        ref.current.position.x += (targetX - ref.current.position.x) * lerpFactor;
        ref.current.position.y += (targetY - ref.current.position.y) * lerpFactor;
        ref.current.position.z += (targetZ - ref.current.position.z) * lerpFactor;

        // Smooth slow rotation
        ref.current.rotation.x += data.rotSpeed * 0.003 * delta * 60;
        ref.current.rotation.y += data.rotSpeed * 0.005 * delta * 60;
        ref.current.rotation.z += data.rotSpeed * 0.002 * delta * 60;
    });

    const mat = getSharedMat(data.color, 0.2, true);
    const matSolid = getSharedMat(data.color, 0.15);
    const matWire = getSharedMat('#94a3b8', 0.15);

    return (
        <group ref={ref} position={data.position} scale={data.scale}>
            {data.shape === 'capacitor' && (
                <group>
                    <mesh position={[0, 0, 0.08]} material={mat}>
                        <boxGeometry args={[0.35, 0.5, 0.025]} />
                    </mesh>
                    <mesh position={[0, 0, -0.08]} material={mat}>
                        <boxGeometry args={[0.35, 0.5, 0.025]} />
                    </mesh>
                    <mesh position={[0, 0.38, 0]} material={matWire}>
                        <cylinderGeometry args={[0.012, 0.012, 0.25]} />
                    </mesh>
                    <mesh position={[0, -0.38, 0]} material={matWire}>
                        <cylinderGeometry args={[0.012, 0.012, 0.25]} />
                    </mesh>
                </group>
            )}
            {data.shape === 'transformer' && (
                <group>
                    <mesh material={matSolid}>
                        <torusGeometry args={[0.2, 0.05, 6, 6]} />
                    </mesh>
                    <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mat}>
                        <torusGeometry args={[0.1, 0.025, 6, 12]} />
                    </mesh>
                    <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <torusGeometry args={[0.1, 0.025, 6, 12]} />
                        <meshStandardMaterial color="#eab308" transparent opacity={0.2} emissive="#eab308" emissiveIntensity={0.3} />
                    </mesh>
                </group>
            )}
            {data.shape === 'resistor' && (
                <group>
                    <mesh material={mat}>
                        <cylinderGeometry args={[0.07, 0.07, 0.4, 6]} />
                    </mesh>
                    <mesh position={[0, 0.08, 0]}>
                        <cylinderGeometry args={[0.075, 0.075, 0.03, 6]} />
                        <meshStandardMaterial color="#ef4444" transparent opacity={0.25} />
                    </mesh>
                    <mesh position={[0, -0.04, 0]}>
                        <cylinderGeometry args={[0.075, 0.075, 0.03, 6]} />
                        <meshStandardMaterial color="#eab308" transparent opacity={0.25} />
                    </mesh>
                    <mesh position={[0, 0.32, 0]} material={matWire}>
                        <cylinderGeometry args={[0.01, 0.01, 0.25]} />
                    </mesh>
                    <mesh position={[0, -0.32, 0]} material={matWire}>
                        <cylinderGeometry args={[0.01, 0.01, 0.25]} />
                    </mesh>
                </group>
            )}
            {data.shape === 'inductor' && (
                <group>
                    <mesh material={mat}>
                        <torusGeometry args={[0.15, 0.035, 6, 16]} />
                    </mesh>
                </group>
            )}
            {data.shape === 'diode' && (
                <group>
                    <mesh rotation={[0, 0, Math.PI / 2]} material={mat}>
                        <coneGeometry args={[0.1, 0.2, 3]} />
                    </mesh>
                    <mesh position={[0.11, 0, 0]} material={matWire}>
                        <boxGeometry args={[0.015, 0.2, 0.2]} />
                    </mesh>
                </group>
            )}
        </group>
    );
}

export function ElectricalAtmosphere() {
    const pointsRef = useRef();
    const gridHelperRef = useRef();

    const componentData = useMemo(() => generateComponents(40), []);

    const particlesCount = 200;
    const posArray = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 30;
        }
        return positions;
    }, [particlesCount]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
            const hum = Math.sin(state.clock.elapsedTime * 50) * 0.005;
            pointsRef.current.position.y = hum;
        }
        if (gridHelperRef.current) {
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
                    color="#60a5fa"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* 100 Floating Electrical Components */}
            {componentData.map((comp, i) => (
                <FloatingComponent key={i} data={comp} />
            ))}

            {/* Moving Grid Floor */}
            <group position={[0, -4, 0]}>
                <gridHelper
                    ref={gridHelperRef}
                    args={[100, 100, '#3b82f6', '#1e293b']}
                />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshBasicMaterial
                        color="#020617"
                        transparent
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
