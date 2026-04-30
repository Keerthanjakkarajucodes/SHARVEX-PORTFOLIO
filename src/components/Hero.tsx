import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const MARQUEE_TEXT = '\u2726 Design \u2726 Build \u2726 Launch \u2726 Scale \u2726 Automate \u2726 Grow \u2726';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Set initial hidden states immediately to prevent flicker
    gsap.set([labelRef.current, line1Ref.current, line2Ref.current, subContentRef.current], {
      opacity: 0,
    });
    gsap.set(labelRef.current, { y: 15 });
    gsap.set(line1Ref.current, { y: 30, filter: 'blur(8px)' });
    gsap.set(line2Ref.current, { y: 20 });
    gsap.set(subContentRef.current, { y: 10 });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(labelRef.current,
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .to(line1Ref.current,
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      '-=0.4'
    )
    .to(line2Ref.current,
      { opacity: 0.7, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.9'
    )
    .to(subContentRef.current,
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    );

    // Subtle parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !gridRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 10;
      const yPos = (clientY / innerHeight - 0.5) * 10;

      gsap.to(gridRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="hero theme-2">
      {/* Corner UI Marks */}
      <div className="ui-mark top-left"></div>
      <div className="ui-mark top-right"></div>
      <div className="ui-mark bottom-left"></div>
      <div className="ui-mark bottom-right"></div>

      {/* Grid Background */}
      <div className="hero-bg-wrapper" ref={gridRef}>
        <div className="perspective-grid"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-label" ref={labelRef}>
          — CREATIVE DEVELOPER &amp; DESIGNER —
        </div>

        <div className="hero-title-container">
          <div className="hero-title-line1" ref={line1Ref}>
            Building
          </div>
          <div className="hero-title-line2" ref={line2Ref}>
            the future.
          </div>
        </div>

        <div ref={subContentRef} className="hero-sub-container">
          <div className="hero-sub-line">
            High-end web development · UI/UX · AI-driven solutions
          </div>
          <p className="hero-description">
            Crafting digital experiences that live at the intersection of beauty, function, and intention.
          </p>
        </div>
      </div>

      {/* Bottom marquee — two identical groups, track moves -50% for seamless loop.
           Each group repeats the text 5× so it is always wider than the viewport. */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(g => (
            <div className="marquee-group" key={g}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span className="marquee-text" key={i}>{MARQUEE_TEXT}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;