import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    {
        id: 1,
        degree: "B.Tech in Electrical Engineering",
        school: "OmDayal Group of Institutions",
        duration: "2020 – 2023",
        location: "Howrah, India",
        score: "CGPA: 9.14"
    },
    {
        id: 2,
        degree: "Diploma in Electrical Engineering",
        school: "Birla Institute of Technology",
        duration: "2017 – 2020",
        location: "Kolkata, India",
        score: "Percentage: 84.7%"
    },
    {
        id: 3,
        degree: "Higher Secondary",
        school: "Beliatore High School",
        duration: "2014 – 2016",
        location: "Bankura",
        score: "79.8%"
    },
    {
        id: 4,
        degree: "Secondary Exam",
        school: "Barkura High School",
        duration: "2013 – 2014",
        location: "",
        score: "85.71%"
    }
];

export function Education() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered fade and slide up for education cards
            gsap.fromTo(cardsRef.current,
                {
                    opacity: 0,
                    y: 60,
                    rotationX: 10
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="education"
            ref={containerRef}
            className="relative w-full py-20 md:py-24 px-4 md:px-20 z-10 pointer-events-auto"
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-16 md:text-center">
                    Education <span className="text-yellow-400">&</span> Academics
                </h2>

                <div className="flex flex-col gap-6 perspective-[1000px]">
                    {educationData.map((edu, index) => (
                        <div
                            key={edu.id}
                            ref={el => cardsRef.current[index] = el}
                            className="group relative bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 transform-gpu overflow-hidden"
                        >
                            {/* Animated Background Gradient on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none" />

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                                        {edu.degree}
                                    </h3>
                                    <h4 className="text-xl text-blue-400 font-medium mb-2">
                                        {edu.school}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            {edu.duration}
                                        </span>
                                        {edu.location && (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                {edu.location}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0 flex shrink-0">
                                    <div className="px-5 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-yellow-400 font-bold whitespace-nowrap shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-shadow duration-300">
                                        {edu.score}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
