import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
    {
        title: 'AutoCAD Electrical (Basic)',
        issuer: 'MSME Tool Room, Kolkata',
        date: 'March 2019',
        desc: 'Completed course covering Introduction to AutoCAD, 2D Drawing, Electrical Drawing using CAD, and Workbook Practice.',
        color: '#3b82f6',
        image: '/images/cert-autocad.png'
    },
    {
        title: 'V.T at Kharagpur Railway Workshop',
        issuer: 'South Eastern Railway, Kharagpur',
        date: 'October 2019',
        desc: 'Practical training on Relay in Electric Locomotive. 17 working days at B.T.C., S.E. Railway Workshop. Performance: Very Good.',
        color: '#eab308',
        image: '/images/cert-railway.png'
    }
];

export function Certifications() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const [selectedCert, setSelectedCert] = useState(null);
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

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

    const openModal = (cert) => {
        setSelectedCert(cert);
        // Animate in after state update
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
                                onClick={() => openModal(cert)}
                                className="relative p-6 md:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-700 w-full md:w-1/2 cursor-pointer group hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10"
                            >
                                {/* Glowing Award Icon */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                                        style={{
                                            backgroundColor: `${cert.color}15`,
                                            border: `1px solid ${cert.color}40`,
                                        }}
                                    >
                                        <svg className="w-6 h-6" style={{ color: cert.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-slate-200 group-hover:text-white transition-colors duration-300">
                                            {cert.title}
                                        </h3>
                                        <p className="text-xs text-slate-500">{cert.issuer} · {cert.date}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-400 leading-relaxed mb-4">{cert.desc}</p>

                                {/* Click hint */}
                                <span
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all duration-300"
                                    style={{ color: cert.color }}
                                >
                                    View Certificate
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </span>
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
