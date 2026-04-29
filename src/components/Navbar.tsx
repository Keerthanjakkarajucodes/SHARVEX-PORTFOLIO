import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
];

const scrollToSection = (href: string, closeMobile?: () => void) => {
  if (href === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  closeMobile?.();
};

const Magnetic: React.FC<{ children: React.ReactElement, strength?: number }> = ({ children, strength = 0.15 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return React.cloneElement(children, {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    style: {
      ...children.props.style,
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: position.x === 0 && position.y === 0 
        ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
        : 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
    }
  });
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null && navRefs.current[hoveredIndex]) {
      const el = navRefs.current[hoveredIndex];
      if (el) {
        setIndicatorStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIndex]);

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <div className={`navbar-wrapper ${isScrolled ? 'dark scrolled' : ''}`}>
      <nav className="navbar">
        <div className="nav-content">
          <Magnetic strength={0.1}>
            <a
              href="#"
              className="logo"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="logo-icon-wrapper">
                <img src="/logo.svg" alt="SHARVEX" className="logo-icon" />
              </div>
              <span className="nav-logo-text">SHARVEX</span>
            </a>
          </Magnetic>

          <div className="nav-links desktop-only" onMouseLeave={() => setHoveredIndex(null)}>
            <div 
              className="nav-indicator-pill" 
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />
            {navLinks.map((link, index) => (
              <Magnetic key={link.label} strength={0.15}>
                <a
                  href={link.href}
                  className="nav-item"
                  ref={el => navRefs.current[index] = el}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={e => { e.preventDefault(); scrollToSection(link.href); }}
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="nav-actions desktop-only">
            <Magnetic strength={0.15}>
              <button
                className="btn-premium"
                onClick={() => scrollToSection('#contact')}
              >
                LET'S TALK
              </button>
            </Magnetic>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        <div className="navbar-shimmer"></div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu glass">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => { e.preventDefault(); scrollToSection(link.href, closeMobile); }}
            >
              {link.label}
            </a>
          ))}
          <button
            className="btn-premium"
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={() => { scrollToSection('#contact'); closeMobile(); }}
          >
            LET'S TALK
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
