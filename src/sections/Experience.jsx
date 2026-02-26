import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
    {
        id: 1,
        title: "Subject Matter Expert in Electrical Engineering",
        type: "Freelancer",
        company: "Chegg India",
        duration: "Apr 2021 – Aug 2023",
        description: "Provided expert-level academic guidance and problem-solving support to engineering students.",
    },
    {
        id: 2,
        title: "Invigilator, Tech Support and Team Leader",
        type: "Freelancer",
        company: "AON (Cocubes.com)",
        duration: "Jan 2020 – Aug 2023",
        description: "Managed invigilation duties, provided technical support, and led team operations during critical assessments.",
    }
];

export function Experience() {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Animate the main vertical timeline wire growing downwards
            gsap.fromTo(
                lineRef.current,
                { height: 0 },
                {
                    height: '100%',
                    duration: 1.5,
                    ease: 'power1.inOut',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 60%',
                        end: 'bottom 80%',
                        scrub: 1, // Tie wire growth directly to scroll position
                    }
                }
            );

            // 2. Animate each experience item sliding in and nodes glowing
            itemsRef.current.forEach((item, i) => {
                // Node pulse
                const node = item.querySelector('.timeline-node');
                gsap.fromTo(node,
                    { scale: 0, backgroundColor: '#1e293b', boxShadow: 'none' },
                    {
                        scale: 1,
                        backgroundColor: '#3b82f6',
                        boxShadow: '0 0 20px #3b82f6',
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // Content slide in
                const content = item.querySelector('.timeline-content');
                gsap.fromTo(content,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative w-full py-20 md:py-24 px-4 md:px-20 z-10 pointer-events-auto"
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-20 md:text-center">
                    Professional <span className="text-blue-500">Experience</span>
                </h2>

                <div className="relative pl-8 md:pl-0">

                    {/* Main Vertical Wire Background */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-800 rounded-full" />

                    {/* Animated Active Wire */}
                    <div
                        ref={lineRef}
                        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-blue-500 shadow-[0_0_15px_#3b82f6] rounded-full origin-top"
                    />

                    {/* Timeline Items */}
                    <div className="flex flex-col gap-16">
                        {experienceData.map((job, index) => {
                            // Alternate left/right alignment on desktop
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={job.id}
                                    ref={el => itemsRef.current[index] = el}
                                    className={`relative w-full flex flex-col md:flex-row ${isEven ? 'md:justify-start' : 'md:justify-end'} items-center`}
                                >
                                    {/* Glowing Node Point */}
                                    <div className="timeline-node absolute left-[-37px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-slate-900 z-10" />

                                    {/* Content Card */}
                                    <div className={`timeline-content w-full md:w-[45%] bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-blue-500/50 transition-colors duration-300 relative group`}>
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                            <h3 className="text-lg md:text-2xl font-bold text-white leading-tight">
                                                {job.title}
                                            </h3>
                                            <span className="shrink-0 px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-500/30">
                                                {job.type}
                                            </span>
                                        </div>

                                        <div className="text-yellow-400 font-medium mb-1 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                            {job.company}
                                        </div>

                                        <div className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            {job.duration}
                                        </div>

                                        <p className="text-slate-300 leading-relaxed font-light relative z-10">
                                            {job.description}
                                        </p>

                                        {/* Connection Line to center wire (Desktop only) */}
                                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[10%] h-[2px] bg-slate-800 ${isEven ? 'right-[-10%]' : 'left-[-10%]'}`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
