import { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

export function LoadingScreen({ onStarted }) {
    const { active, progress, errors, item, loaded, total } = useProgress();
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [simulatedProgress, setSimulatedProgress] = useState(0);
    const containerRef = useRef(null);

    // Enforce a minimum display time of 1.5 seconds so the user can see the cool charging animation
    // even if the 3D assets load instantly from cache.
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Simulate progress if no actual external Drei items (like GLTFs/Textures) are loading
    useEffect(() => {
        let interval;
        if (total === 0) {
            interval = setInterval(() => {
                setSimulatedProgress(p => {
                    if (p >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return p + 5; // Fill in about ~1 second
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [total]);

    const displayProgress = total > 0 ? progress : simulatedProgress;

    useEffect(() => {
        // If we're fully loaded AND the minimum time has elapsed, trigger the fade out
        if ((displayProgress >= 100 || !active) && minTimeElapsed) {
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Notify the parent App that loading is finished so we can mount the rest of HTML
                        if (onStarted) onStarted();
                        containerRef.current.style.display = 'none';
                    }
                });
            }
        }
    }, [displayProgress, minTimeElapsed, onStarted, active]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden pointer-events-none"
        >
            {/* Background radial glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">

                {/* Animated electrical symbol (a stylized lightning bolt/capacitor) */}
                <div className="mb-8 relative w-24 h-24 flex items-center justify-center">
                    {/* Outer spinning ring */}
                    <div className="absolute w-full h-full border-2 border-slate-800 rounded-full border-t-blue-500 animate-spin" style={{ animationDuration: '2s' }} />
                    {/* Inner spinning reversed ring */}
                    <div className="absolute w-20 h-20 border-2 border-slate-800 rounded-full border-b-yellow-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

                    {/* Core glowing dot */}
                    <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#3b82f6] animate-ping" />
                </div>

                <h1 className="text-2xl md:text-3xl font-black mb-2 tracking-widest uppercase flex items-center gap-3">
                    System <span className="text-blue-500">Boot</span>
                </h1>

                <p className="text-slate-400 text-sm mb-8 tracking-widest animate-pulse uppercase">
                    {displayProgress < 100 ? 'Charging Capacitors...' : 'Initializing Systems...'}
                </p>

                {/* Progress bar container */}
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden relative">
                    {/* The actual progress fill */}
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-yellow-400 transition-all duration-300 ease-out"
                        style={{ width: `${Math.max(displayProgress, 5)}%` }} // Force a minimum 5% visual width
                    />
                    {/* A glowing thumb on the end of the progress bar */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[4px] transition-all duration-300 ease-out"
                        style={{ left: `calc(${Math.max(displayProgress, 5)}% - 8px)` }}
                    />
                </div>

                {/* Percentage text */}
                <div className="mt-4 w-full flex justify-between text-xs text-slate-500 font-mono">
                    <span>SYS_MEM</span>
                    <span>{Math.round(displayProgress)}%</span>
                </div>
            </div>
        </div>
    );
}
