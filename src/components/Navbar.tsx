import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Globe, MessageSquare } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
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

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="nav-content">
        <a
          href="#"
          className="logo"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img src="/logo.svg" alt="Sharvex Logo" className="logo-icon" />
          <span>SHARVEX</span>
        </a>

        <div className="nav-links desktop-only">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => { e.preventDefault(); scrollToSection(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions desktop-only">
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer"><Code size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Globe size={18} /></a>
            <a href="https://discord.com" target="_blank" rel="noreferrer"><MessageSquare size={18} /></a>
          </div>
          <button
            className="btn-primary"
            onClick={() => scrollToSection('#contact')}
          >
            Hire Me
          </button>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

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
            className="btn-primary"
            onClick={() => { scrollToSection('#contact'); closeMobile(); }}
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
