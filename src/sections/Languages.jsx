import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const languages = [
    { name: "Bengali", level: 100, color: "#3b82f6" }, // Native
    { name: "English", level: 90, color: "#10b981" },
    { name: "Hindi", level: 85, color: "#f59e0b" }
];

export function Languages() {
    const containerRef = useRef(null);
    const barsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the widths of the bars from 0 to their target level
            barsRef.current.forEach((bar, index) => {
                const targetWidth = languages[index].level;
                gsap.fromTo(bar,
                    { width: "0%" },
                    {
                        width: `${targetWidth}%`,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="languages"
            ref={containerRef}
            className="relative w-full py-16 px-6 md:px-20 z-10 pointer-events-auto"
        >
            <div className="max-w-3xl mx-auto bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl">
                <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                    Languages
                </h2>

                <div className="flex flex-col gap-6">
                    {languages.map((lang, index) => (
                        <div key={lang.name} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm font-bold text-slate-300">
                                <span className="tracking-wider uppercase">{lang.name}</span>
                            </div>

                            {/* Bar Track */}
                            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
                                {/* Animated Fill */}
                                <div
                                    ref={el => barsRef.current[index] = el}
                                    className="absolute top-0 left-0 h-full rounded-full relative overflow-hidden"
                                    style={{ backgroundColor: lang.color, boxShadow: `0 0 10px ${lang.color}` }}
                                >
                                    {/* Shimmer Effect inside bar */}
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
