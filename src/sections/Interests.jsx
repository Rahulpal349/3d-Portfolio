import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const interests = [
    { name: "Playing Cricket", icon: "🏏" },
    {
        name: "Travelling", icon: "🏔️",
        cert: {
            title: 'Kedarkantha Summit',
            issuer: 'TrekYaari',
            date: '16th January 2025',
            detail: 'Successful completion of Kedarkantha Summit, Uttarakhand (India). Max. Altitude 12,500 ft.',
            image: '/images/cert-kedarkantha.png'
        }
    },
    { name: "Reading Stories", icon: "📚" },
    { name: "Watching Movies", icon: "🎬" }
];

export function Interests() {
    const containerRef = useRef(null);
    const itemsRef = useRef([]);
    const [selectedCert, setSelectedCert] = useState(null);
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

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

    const openModal = (cert) => {
        setSelectedCert(cert);
        requestAnimationFrame(() => {
            if (backdropRef.current) {
                gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            }
            if (modalRef.current) {
                gsap.fromTo(modalRef.current,
                    { opacity: 0, scale: 0.85, y: 30 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
                );
            }
        });
    };

    const closeModal = () => {
        if (backdropRef.current) {
            gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
        }
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                opacity: 0, scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in',
                onComplete: () => setSelectedCert(null)
            });
        } else {
            setSelectedCert(null);
        }
    };

    return (
        <>
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
                                onClick={() => item.cert && openModal(item.cert)}
                                className={`flex items-center gap-3 px-6 py-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:bg-slate-800 hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:-translate-y-1 transition-all duration-300 group ${item.cert ? 'cursor-pointer' : 'cursor-default'}`}
                            >
                                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                                <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificate Popup Modal */}
            {selectedCert && (
                <div
                    ref={backdropRef}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto"
                    style={{ backgroundColor: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)' }}
                    onClick={closeModal}
                >
                    <div
                        ref={modalRef}
                        className="relative max-w-lg w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
                        style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                            <h3 className="text-lg font-bold text-white truncate pr-4">{selectedCert.title}</h3>
                            <button
                                onClick={closeModal}
                                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors shrink-0"
                            >
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Certificate Image */}
                        <div className="overflow-y-auto max-h-[calc(85vh-64px)] p-4">
                            <img
                                src={selectedCert.image}
                                alt={selectedCert.title}
                                className="w-full h-auto rounded-xl border border-slate-700/30"
                            />
                            <p className="text-center text-xs text-slate-500 mt-3">
                                {selectedCert.issuer} · {selectedCert.date}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
