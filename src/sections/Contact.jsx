import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const borderPathRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                    },
                }
            );

            if (borderPathRef.current) {
                const length = borderPathRef.current.getTotalLength();
                gsap.fromTo(
                    borderPathRef.current,
                    { strokeDasharray: length, strokeDashoffset: length },
                    {
                        strokeDashoffset: 0,
                        duration: 3,
                        ease: 'power1.inOut',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative w-full py-20 md:py-24 px-4 md:px-20 z-10 pointer-events-auto flex flex-col items-center justify-center"
        >
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-none -z-10" />

            <h2 className="text-4xl md:text-6xl font-black text-white mb-16 text-center">
                Contact <span className="text-blue-500">Me</span>
            </h2>

            <div
                ref={cardRef}
                className="relative w-full max-w-5xl bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 md:p-16 shadow-2xl"
            >
                {/* Animated SVG Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl" preserveAspectRatio="none">
                    <defs>
                        <filter id="glow-border">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="current-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                            <stop offset="100%" stopColor="#eab308" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <rect
                        x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)"
                        rx="14" ry="14"
                        fill="none" stroke="#1e293b" strokeWidth="2"
                    />
                    <rect
                        ref={borderPathRef}
                        x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)"
                        rx="14" ry="14"
                        fill="none"
                        stroke="url(#current-gradient)"
                        strokeWidth="3"
                        filter="url(#glow-border)"
                    />
                </svg>

                {/* Contact Details */}
                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center text-center">
                    <div className="group">
                        <h3 className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Location
                        </h3>
                        <p className="text-base md:text-xl text-white font-medium whitespace-nowrap">Bankura, West Bengal, India. 722203</p>
                    </div>
                    <div className="group">
                        <h3 className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            Email
                        </h3>
                        <a href="mailto:rahulpal349@gmail.com" className="text-base md:text-xl text-white hover:text-yellow-400 font-medium transition-colors duration-300">rahulpal349@gmail.com</a>
                    </div>
                    <div className="group">
                        <h3 className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            Phone
                        </h3>
                        <a href="https://wa.me/919679727399" target="_blank" rel="noopener noreferrer" className="text-base md:text-xl text-white hover:text-yellow-400 font-medium transition-colors duration-300 whitespace-nowrap">+91 9679727399</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
