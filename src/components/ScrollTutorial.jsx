import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function ScrollTutorial({ isStarted }) {
    const overlayRef = useRef(null);
    const [dismissed, setDismissed] = useState(false);
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window);

    useEffect(() => {
        if (!isStarted || !isTouchDevice || dismissed) return;

        const el = overlayRef.current;
        if (!el) return;

        // Fade in
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' });

        // Auto-dismiss after 3.5 seconds
        const autoTimer = setTimeout(() => dismiss(), 3500);

        // Dismiss on first scroll or touch
        const handleDismiss = () => dismiss();
        window.addEventListener('scroll', handleDismiss, { once: true, passive: true });
        window.addEventListener('touchmove', handleDismiss, { once: true, passive: true });

        function dismiss() {
            clearTimeout(autoTimer);
            if (!el) return;
            gsap.to(el, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => setDismissed(true),
            });
        }

        return () => {
            clearTimeout(autoTimer);
            window.removeEventListener('scroll', handleDismiss);
            window.removeEventListener('touchmove', handleDismiss);
        };
    }, [isStarted, isTouchDevice, dismissed]);

    // Don't render on desktop or after dismissal
    if (!isTouchDevice || dismissed || !isStarted) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-40 flex items-end justify-center pb-28 pointer-events-none"
            style={{ opacity: 0 }}
        >
            <div className="flex flex-col items-center gap-3 animate-bounce-slow">
                {/* Hand / finger icon with swipe-up motion */}
                <div className="scroll-hand-anim">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(250,204,21,0.9)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* Hand pointing up */}
                        <path d="M12 2l0 14" />
                        <path d="M5 9l7-7 7 7" />
                    </svg>
                </div>

                <span className="text-sm font-semibold text-yellow-400/90 tracking-widest uppercase">
                    Swipe up to explore
                </span>

                {/* Subtle dots indicating more content */}
                <div className="flex gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>
        </div>
    );
}
