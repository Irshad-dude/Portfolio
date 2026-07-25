import { useParticles } from './hooks/useParticles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Global particle canvas — lives here so it spans the whole page
  const canvasRef = useParticles();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative' }}>

      {/* ── Fixed global particle layer — behind everything ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none', // clicks pass through to content
        }}
      />

      {/* ── All page content sits above the canvas ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
