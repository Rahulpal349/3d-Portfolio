import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CameraController() {
    const { camera } = useThree();
    const humTime = useRef(0);

    useEffect(() => {
        // Initial Camera Setup
        camera.position.set(0, 0, 7);

        // Context for easy cleanup
        const ctx = gsap.context(() => {
            // Create the scroll trigger animation for the camera
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#main-scroll-container', // We'll add this ID to the parent scroll container
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1, // Smooth scrub
                }
            });

            tl.to(camera.position, {
                z: 3, // Zoom in
                y: -1, // Move slightly down
                ease: 'power1.inOut',
            }, 0);

            // We can also animate rotation for a parallax effect
            tl.to(camera.rotation, {
                x: 0.1, // Look slightly up
            }, 0);
        });

        return () => ctx.revert();
    }, [camera]);

    // Subtle electrical hum / camera shake
    useFrame((state, delta) => {
        humTime.current += delta;
        // Base position relies on GSAP scroll trigger manipulation. We modify the actual object matrix directly via lookAt or slight rapid offset so we don't conflict with GSAP positional tweens

        // Very subtle rapid jitter based on time
        const jitterX = Math.sin(humTime.current * 45) * 0.003;
        const jitterY = Math.cos(humTime.current * 55) * 0.003;

        // Apply directly adding onto the GSAP managed base value
        camera.position.x += jitterX;
        camera.position.y += jitterY;

        // Counteract immediately so GSAP base line doesn't permanently drift
        camera.position.x -= jitterX;
        camera.position.y -= jitterY;

        // For a cleaner look that doesn't conflict with positional GSAP, we use rotation jitter
        camera.rotation.z = Math.sin(humTime.current * 30) * 0.001;
    });

    return null; // This component just handles logic, no rendering
}
