import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
    const heroRef = useRef(null);
    const nameRef = useRef(null);
    const subtitleRef = useRef(null);
    const btnRef = useRef(null);
    const pulseRef = useRef(null);

    useEffect(() => {
        // Wait for initial render
        const ctx = gsap.context(() => {
            // 1. Initial Master Timeline
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                nameRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: 0.2 }
            )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    '-=0.5' // overlap
                )
                .fromTo(
                    btnRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
                    '-=0.4'
                );

            // 2. Continuous Subtle Voltage Pulse Behind Text
            gsap.to(pulseRef.current, {
                opacity: 0.7,
                scale: 1.05,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen w-full flex flex-col items-center justify-center pointer-events-none"
        >
            {/* Background Voltage Pulse Effect */}
            <div
                ref={pulseRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 rounded-[100%] blur-[120px] mix-blend-screen pointer-events-none opacity-0"
            />

            <div className="z-10 text-center flex flex-col items-center">
                <h1
                    ref={nameRef}
                    className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-slate-100 to-slate-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                >
                    RAHUL PAL
                </h1>

                <h2
                    ref={subtitleRef}
                    className="text-xl md:text-2xl font-medium text-blue-300 tracking-wide mb-10 flex flex-wrap justify-center gap-2 md:gap-4"
                >
                    <span>Electrical Engineer</span>
                    <span className="text-yellow-400/70 hidden md:inline">|</span>
                    <span>Power Systems</span>
                    <span className="text-yellow-400/70 hidden md:inline">|</span>
                    <span>Automation</span>
                </h2>

                <button
                    ref={btnRef}
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="pointer-events-auto group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-blue-500/50 hover:border-blue-400 transition-colors duration-300"
                >
                    {/* Button Background Hover Effect */}
                    <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-500/20 transition-colors duration-300 translate-y-full group-hover:translate-y-0 ease-out" />

                    <span className="relative z-10 font-bold text-yellow-400 tracking-wider text-sm uppercase flex items-center gap-3">
                        View My Work
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </button>
            </div>
        </section>
    );
}
