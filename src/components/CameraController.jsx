import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CameraController() {
    const { camera, scene } = useThree();
    const humTime = useRef(0);
    const scrollProgress = useRef(0);

    useEffect(() => {
        camera.position.set(0, 0, 7);

        const ctx = gsap.context(() => {
            // Master scroll-linked timeline across the full page
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#main-scroll-container',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                    onUpdate: (self) => {
                        scrollProgress.current = self.progress;
                    },
                }
            });

            // Stage 1: Hero → About (0% - 15%) — Slow zoom in, slight tilt
            tl.to(camera.position, {
                z: 6,
                y: -0.3,
                x: 0.5,
                duration: 15,
                ease: 'none',
            }, 0);

            // Stage 2: About → Experience (15% - 30%) — Pan right, look slightly left
            tl.to(camera.position, {
                z: 5.5,
                y: -0.5,
                x: -0.3,
                duration: 15,
                ease: 'none',
            }, 15);

            // Stage 3: Experience → Skills (30% - 50%) — Pull back, rise up
            tl.to(camera.position, {
                z: 5,
                y: 0.3,
                x: 0.2,
                duration: 20,
                ease: 'none',
            }, 30);

            // Stage 4: Skills → Projects (50% - 70%) — Zoom in closer, lower angle
            tl.to(camera.position, {
                z: 4,
                y: -0.8,
                x: -0.2,
                duration: 20,
                ease: 'none',
            }, 50);

            // Stage 5: Projects → Contact (70% - 100%) — Final dramatic push forward
            tl.to(camera.position, {
                z: 3,
                y: -1,
                x: 0,
                duration: 30,
                ease: 'none',
            }, 70);

            // Camera rotation parallax (subtle continuous tilt as you scroll)
            tl.to(camera.rotation, {
                x: 0.08,
                duration: 100,
                ease: 'none',
            }, 0);
        });

        return () => ctx.revert();
    }, [camera, scene]);

    // Continuous subtle effects
    useFrame((state, delta) => {
        humTime.current += delta;
        const t = humTime.current;

        // Gentle breathing sway based on scroll position
        const breatheIntensity = 0.002 + scrollProgress.current * 0.003;
        const swayX = Math.sin(t * 0.8) * breatheIntensity;
        const swayY = Math.cos(t * 0.6) * breatheIntensity;

        // Micro electrical hum vibration (faster, subtler)
        const humX = Math.sin(t * 35) * 0.001;
        const humY = Math.cos(t * 42) * 0.001;

        // Apply rotation-based effects (don't conflict with GSAP position tweens)
        camera.rotation.z = Math.sin(t * 0.5) * 0.003 + swayX + humX;
        camera.rotation.y = swayY + humY;
    });

    return null;
}
