import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
    "AutoCAD Electrical (Basic)",
    "V.T at Kharagpur Railway Workshop"
];

export function Certifications() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current,
                { opacity: 0, scale: 0.8, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="certifications"
            ref={containerRef}
            className="relative w-full py-20 px-6 md:px-20 z-10 pointer-events-auto"
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center">
                    Professional <span className="text-blue-500">Certifications</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="relative p-8 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-700 w-full md:w-1/2 flex items-center gap-4 group hover:border-blue-500/50 transition-colors duration-300 shadow-xl"
                        >
                            {/* Glowing Award Icon */}
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                            </div>
                            <h3 className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                                {cert}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
