import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { EtheralShadow } from './ui/etheral-shadow';
import BlurText from './ui/BlurText';
import './Hero.css';

const Hero: React.FC = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger in the non-BlurText elements after a short delay
    const targets = [badgeRef.current, btnsRef.current, statsRef.current].filter(Boolean);
    gsap.fromTo(targets,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.6
      }
    );
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg-wrapper">
        <EtheralShadow
          color="rgba(59, 130, 246, 0.1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 0.5, scale: 1.2 }}
          sizing="fill"
          className="absolute inset-0 z-0"
        />
      </div>

      <div className="container hero-content">
        <div className="badge glass" ref={badgeRef} style={{ opacity: 0 }}>
          <Sparkles className="sparkle-icon" size={16} />
          <span>Available for New Projects in 2025</span>
        </div>

        <h1 className="hero-title">
          <BlurText
            text="Crafting Digital Experiences"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            className="hero-blur-line"
          />
          <BlurText
            text="that define the future."
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            className="hero-blur-line accent-line"
          />
        </h1>

        <BlurText
          text="High-end web development, UI/UX design, and AI-driven solutions for visionary brands and startups."
          delay={40}
          animateBy="words"
          direction="bottom"
          stepDuration={0.3}
          className="hero-description"
        />

        <div className="hero-btns" ref={btnsRef} style={{ opacity: 0 }}>
          <button className="btn-primary large">
            View My Work <ArrowRight size={20} />
          </button>
          <button className="btn-secondary large">
            Get in Touch
          </button>
        </div>

        <div className="hero-stats" ref={statsRef} style={{ opacity: 0 }}>
          <div className="stat">
            <span className="stat-num">30+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">5+</span>
            <span className="stat-label">Years Exp.</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
