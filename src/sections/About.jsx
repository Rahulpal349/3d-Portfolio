import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const containerRef = useRef(null);
    const textGroupRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                textGroupRef.current.children,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative w-full flex items-center justify-center px-4 md:px-20 py-20 md:py-24 pointer-events-auto"
        >
            <div className="max-w-4xl w-full">

                {/* Text Content */}
                <div className="relative p-6 md:p-12">
                    {/* Glowing border accents */}
                    <div className="absolute inset-0 border border-blue-500/20 rounded-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-3xl pointer-events-none" />

                    {/* Corner highlights */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-400 rounded-tl-3xl shadow-[0_0_15px_rgba(59,130,246,0.3)] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-400 rounded-br-3xl shadow-[0_0_15px_rgba(234,179,8,0.3)] pointer-events-none" />

                    {/* Wrapper for GSAP stagger */}
                    <div ref={textGroupRef} className="relative z-10 flex flex-col gap-6">
                        <h2 className="text-4xl md:text-6xl font-black text-white">
                            About <span className="text-blue-500">Me</span>
                        </h2>

                        <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                            Electrical Engineering graduate with strong academic performance and practical experience in technical support and subject expertise. Recently designed and developed my own e-commerce website, managing complete development, deployment, and maintenance.
                        </p>

                        <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                            Quick learner with a passion for technology and real-world problem solving.
                        </p>

                        <p className="text-sm md:text-base text-slate-400 font-medium">
                            🎂 Date of Birth: <span className="text-white">02 March 1999</span>
                        </p>

                        <div className="mt-4 flex gap-3 flex-wrap">
                            {['Power System Fundamentals', 'AutoCAD Electrical', 'Arduino Projects', 'Electrical Design', 'E-commerce Development'].map((skill) => (
                                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-yellow-400 text-xs font-semibold rounded-full border border-slate-700 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
