import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    { id: 1, name: "AutoCAD Electrical", x: 50, y: 12, color: "#06b6d4", desc: "Technical electrical design and schematics." },
    { id: 2, name: "Python", x: 22, y: 32, color: "#3b82f6", desc: "Data analysis and automation scripting." },
    { id: 3, name: "Windows OS", x: 78, y: 32, color: "#61dafb", desc: "System administration and environment setup." },
    { id: 4, name: "MS Office", x: 50, y: 50, color: "#f59e0b", desc: "Advanced data management, documentation, and presentations." },
    { id: 5, name: "Innovative Thinking", x: 22, y: 68, color: "#10b981", desc: "Creative approaches to complex engineering problems." },
    { id: 6, name: "Quick Learner", x: 78, y: 68, color: "#8b5cf6", desc: "Rapid adaptation to new technologies and workflows." },
    { id: 7, name: "Hardworking", x: 50, y: 85, color: "#eab308", desc: "Dedicated work ethic and project commitment." },
];

const connections = [
    [1, 2], [1, 3],
    [2, 4], [3, 4],
    [4, 5], [4, 6],
    [5, 7], [6, 7]
];

export function Skills() {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const nodesRef = useRef([]);
    const [hoveredNode, setHoveredNode] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate wires drawing in
            gsap.fromTo(
                ".circuit-wire",
                { strokeDasharray: 1000, strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );

            // Current pulse animation along the wires
            gsap.to(".current-pulse", {
                strokeDashoffset: -100,
                repeat: -1,
                duration: 3,
                ease: "linear",
            });

            // Pop in nodes
            gsap.fromTo(
                nodesRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-20 z-10 pointer-events-auto"
        >
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-none -z-10" />

            <h2 className="text-4xl md:text-6xl font-black text-white mb-16 text-center shadow-blue-500/50 drop-shadow-lg">
                Technical <span className="text-blue-500">Circuitry</span>
            </h2>

            <div className="relative w-full max-w-5xl h-[600px] border border-slate-800/50 rounded-3xl bg-slate-900/40 shadow-2xl">

                {/* SVG for Wires */}
                <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {connections.map(([startId, endId], index) => {
                        const startNode = skillsData.find(s => s.id === startId);
                        const endNode = skillsData.find(s => s.id === endId);
                        if (!startNode || !endNode) return null;

                        return (
                            <g key={`wire-${index}`}>
                                {/* Base Wire */}
                                <line
                                    x1={`${startNode.x}%`} y1={`${startNode.y}%`}
                                    x2={`${endNode.x}%`} y2={`${endNode.y}%`}
                                    className="circuit-wire"
                                    stroke="#334155"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* Animated Current Pulse */}
                                <line
                                    x1={`${startNode.x}%`} y1={`${startNode.y}%`}
                                    x2={`${endNode.x}%`} y2={`${endNode.y}%`}
                                    className="current-pulse opacity-50"
                                    stroke="#3b82f6"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="10 30"
                                    filter="url(#glow)"
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* HTML Nodes for Interactivity */}
                {skillsData.map((skill, index) => {
                    const isHovered = hoveredNode === skill.id;

                    return (
                        <div
                            key={skill.id}
                            ref={el => nodesRef.current[index] = el}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                            onMouseEnter={() => setHoveredNode(skill.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            {/* Node Circle */}
                            <div
                                className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 relative z-10"
                                style={{
                                    backgroundColor: '#0f172a',
                                    borderColor: skill.color,
                                    boxShadow: isHovered ? `0 0 25px ${skill.color}` : `0 0 10px ${skill.color}50`
                                }}
                            >
                                <div
                                    className="w-2 h-2 md:w-4 md:h-4 rounded-full transition-all duration-300"
                                    style={{
                                        backgroundColor: isHovered ? skill.color : '#334155',
                                        boxShadow: isHovered ? `0 0 10px ${skill.color}` : 'none'
                                    }}
                                />
                            </div>

                            {/* Node Label */}
                            <span
                                className={`mt-3 font-bold text-sm md:text-base whitespace-nowrap transition-colors duration-300 ${isHovered ? 'text-white' : 'text-slate-400'}`}
                                style={{ textShadow: isHovered ? `0 0 10px ${skill.color}` : 'none' }}
                            >
                                {skill.name}
                            </span>

                            {/* Tooltip */}
                            <div
                                className={`absolute top-full left-1/2 -translate-x-1/2 mt-8 w-48 p-3 rounded-lg bg-slate-900 border text-xs text-slate-300 text-center shadow-xl pointer-events-none transition-all duration-300 z-50 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                                style={{ borderColor: `${skill.color}50` }}
                            >
                                {skill.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
