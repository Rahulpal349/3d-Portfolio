import { Suspense, lazy, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { LoadingScreen } from './components/LoadingScreen';
import { CameraController } from './components/CameraController';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Certifications } from './sections/Certifications';
import { Languages } from './sections/Languages';
import { Interests } from './sections/Interests';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { ScrollTutorial } from './components/ScrollTutorial';

// Lazy Load heavy 3D elements
const ElectricalCoil = lazy(() => import('./components/ElectricalCoil').then(m => ({ default: m.ElectricalCoil })));
const ElectricalAtmosphere = lazy(() => import('./components/ElectricalAtmosphere').then(m => ({ default: m.ElectricalAtmosphere })));

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {!isStarted && <LoadingScreen onStarted={() => setIsStarted(true)} />}
      <ScrollTutorial isStarted={isStarted} />

      {/* Add the ID that CameraController targets for ScrollTrigger */}
      <main
        id="main-scroll-container"
        className={`relative w-full bg-slate-950 text-slate-50 ${!isStarted ? 'h-screen overflow-hidden' : ''}`}
      >

        {/* 3D Canvas Background (Fixed behind scrolling content) */}
        <div className="fixed inset-0 z-0">
          <Canvas
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            gl={{ antialias: !isMobile }}
            shadows={!isMobile}
            camera={{ fov: isMobile ? 75 : 60, position: [0, 0, 7] }}
          >
            {/* GSAP Scroll Trigger Control logic */}
            <CameraController />

            {/* Deep Navy/Black Background */}
            <color attach="background" args={['#020617']} />

            {/* Lights */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 15, 10]}
              intensity={2}
              castShadow
              shadow-mapSize={[1024, 1024]} // Optimize shadow map size
            />
            <pointLight position={[-5, 5, -5]} intensity={1} color="#3b82f6" /> {/* Deep blue rim light */}

            <Suspense fallback={null}>
              {/* Global Environmental Effects */}
              <ElectricalAtmosphere />

              {/* Target Centerpiece 3D Objects */}
              <ElectricalCoil />
            </Suspense>

            {/* Shadow Catcher Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <shadowMaterial transparent opacity={0.3} /> {/* Soft shadow material */}
            </mesh>

            {/* Post Processing Glow */}
            <EffectComposer>
              <Bloom
                intensity={isMobile ? 0.8 : 1.5}
                luminanceThreshold={0.5}
                luminanceSmoothing={0.9}
              />
            </EffectComposer>

            {/* Keep autoRotate but disable user zoom/pan since ScrollTrigger manages camera */}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* HTML Overlay Content (Scrollable layers on top of Canvas) */}
        <div className="relative z-10 w-full flex flex-col pointer-events-none">
          {/* Ensure Sections intercept pointers correctly. We set pointer-events-none on parent but sections handle themselves */}
          <Hero />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Certifications />
          <Languages />
          <Interests />
          <Projects />
          <Contact />
        </div>

      </main>
    </>
  );
}

export default App;
