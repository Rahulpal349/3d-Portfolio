import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const interests = [
    { name: "Playing Cricket", icon: "🏏" },
    { name: "Travelling", icon: "🏔️" },
    { name: "Reading Stories", icon: "📚" },
    { name: "Watching Movies", icon: "🎬" }
];

export function Interests() {
    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Gentle bounce and fade in
            gsap.fromTo(itemsRef.current,
                { opacity: 0, y: 30, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="interests"
            ref={containerRef}
            className="relative w-full py-16 px-6 md:px-20 z-10 pointer-events-auto"
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl font-black text-white mb-12 flex items-center gap-4 text-center">
                    Personal <span className="text-yellow-400">Interests</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {interests.map((item, index) => (
                        <div
                            key={item.name}
                            ref={el => itemsRef.current[index] = el}
                            className="flex items-center gap-3 px-6 py-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:bg-slate-800 hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:-translate-y-1 transition-all duration-300 group cursor-default"
                        >
                            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                            <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
