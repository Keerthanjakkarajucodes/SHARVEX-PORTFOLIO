import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import FeatureGrid from './components/FeatureGrid';
import LogoCloud from './components/LogoCloud';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Preloader from './components/Preloader';
import { CircularTestimonialsDemo } from './components/CircularTestimonialsDemo';
import SplashCursor from './components/ui/SplashCursor';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowCursor(false);
      } else {
        setShowCursor(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <div className="app-container">
      <div style={{
        opacity: showCursor ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 50
      }}>
        <SplashCursor COLOR="#000000" />
      </div>
      {loading ? (
        <Preloader onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <CircularTestimonialsDemo />
            <LogoCloud />
            <FeatureGrid />
            <Pricing />
            <FAQ />

            {/* Call to Action Section */}
            <section className="cta-section container" id="contact">
              <div className="cta-card glass glow-effect">
                <h2>Ready to transform your <span className="accent">vision?</span></h2>
                <p>Let's collaborate to build something extraordinary. Currently accepting new projects</p>
                <div className="cta-btns">
                  <button className="btn-primary large">Start a Conversation</button>
                  <a href="mailto:hello@rahul.studio" className="contact-link">hello@SHARVEX</a>
                </div>
              </div>
            </section>
          </main>

          <footer className="footer container">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="logo">SHARVEX</span>
                <p>High-end web development, UI/UX design, and AI-driven solutions.</p>
              </div>
              <div className="footer-links">
                <div className="link-group">
                  <h4>Services</h4>
                  <a href="#services">Design</a>
                  <a href="#services">Development</a>
                  <a href="#services">AI Solutions</a>
                </div>
                <div className="link-group">
                  <h4>Studio</h4>
                  <a href="#portfolio">Portfolio</a>
                  <a href="#about">About</a>
                  <a href="#contact">Contact</a>
                </div>
                <div className="link-group">
                  <h4>Social</h4>
                  <a href="#">Twitter</a>
                  <a href="#">GitHub</a>
                  <a href="#">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 SHARVEX. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
