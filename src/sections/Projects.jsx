import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        title: 'Automatic Power Factor Correction',
        desc: 'Designed and implemented an automatic power factor correction system using Arduino to improve power efficiency.',
        tech: ['Arduino', 'Hardware', 'Power Electronics'],
        tag: 'Arduino',
        color: '#3b82f6', // blue
        date: 'Sept 2022'
    },
    {
        id: 2,
        title: '50VA Electrical Transformer',
        desc: 'Designed and analyzed a 50VA transformer including core design, winding calculations, and performance testing.',
        tech: ['Analysis', 'Core Design', 'Testing'],
        tag: 'Hardware',
        color: '#eab308', // yellow
        date: 'Feb 2020'
    },
    {
        id: 3,
        title: 'Bloom & Burn – E-Commerce Website',
        desc: 'Designed and developed a complete e-commerce website with product listings, cart, checkout, payment and shipping integration.',
        tech: ['React', 'Node.js', 'Supabase', 'JS', 'HTML', 'CSS', 'Razorpay API', 'Delhivery API'],
        tag: 'Web Dev',
        color: '#ec4899', // pink
        date: 'Dec 2025',
        link: 'https://bloomandburn.shop'
    },
    {
        id: 4,
        title: 'SelfieSePassport',
        desc: 'A web app that generates professional passport-size photos from a selfie in 30 seconds, with automatic layout to fit maximum photos on a single sheet.',
        tech: ['React', 'JS', 'CSS', 'Image Processing'],
        tag: 'Web App',
        color: '#10b981', // green
        date: 'Feb 2026',
        link: 'https://readytoprint.rahulxgaming69.workers.dev'
    }
];

export function Projects() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade and slide in cards sequentially on scroll
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 100, rotateX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window);

    const handleMouseMove = (e, index) => {
        if (isTouchDevice) return;
        const card = cardsRef.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: 'power2.out', transformPerspective: 1000, transformOrigin: 'center' });
    };

    const handleMouseLeave = (index) => {
        if (isTouchDevice) return;
        const card = cardsRef.current[index];
        if (!card) return;
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
    };

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative w-full py-20 md:py-24 px-4 md:px-20 z-10 pointer-events-auto"
        >
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm pointer-events-none -z-10" />

            <h2 className="text-4xl md:text-6xl font-black text-white mb-20 text-center">
                Featured <span className="text-yellow-400">Projects</span>
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
                {projectsData.map((project, index) => (
                    <div
                        key={project.id}
                        ref={el => cardsRef.current[index] = el}
                        className="group relative h-[350px] md:h-[420px] w-full cursor-pointer [perspective:1000px]"
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        {/* Inner Flip Container */}
                        <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl rounded-3xl">

                            {/* Front Face */}
                            <div
                                className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl flex flex-col justify-between p-5 md:p-8 border border-white/10 overflow-hidden backdrop-blur-xl"
                                style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
                            >
                                {/* Glowing border accent matching project color */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ boxShadow: `inset 0 0 30px ${project.color}40`, border: `1px solid ${project.color}` }}
                                />

                                <div className="relative z-10 flex flex-col h-full items-center text-center">
                                    <div className="flex justify-between items-start w-full mb-auto">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                                            style={{ backgroundColor: `${project.color}20`, color: project.color, border: `1px solid ${project.color}50` }}
                                        >
                                            {project.tag}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-400">
                                            {project.date}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold text-white leading-tight">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Decorative circuit lines front */}
                                <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none" viewBox="0 0 100 100">
                                    <path d="M100,100 L50,100 L50,50 L0,50" fill="none" stroke={project.color} strokeWidth="2" strokeLinecap="square" />
                                    <circle cx="0" cy="50" r="3" fill={project.color} />
                                    <circle cx="50" cy="50" r="3" fill={project.color} />
                                </svg>
                            </div>

                            {/* Back Face */}
                            <div
                                className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl p-5 md:p-6 flex flex-col justify-center items-center text-center border border-white/10 backdrop-blur-xl"
                                style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}
                            >
                                {/* Glowing core effect on back */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[50px] pointer-events-none opacity-40 mix-blend-screen"
                                    style={{ backgroundColor: project.color }}
                                />

                                <div className="relative z-10">
                                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-3">
                                        {project.desc}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-2 py-0.5 bg-slate-900/80 rounded text-xs text-slate-400 border border-slate-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors duration-300 border pointer-events-auto relative z-30"
                                            style={{ color: project.color, borderColor: `${project.color}50` }}
                                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${project.color}20`; }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            Visit Site
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
