import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    tl.fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' }
    )
      .fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
        "-=0.5"
      )
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 1
      });
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-content">
        <div className="preloader-logo" ref={logoRef}>
        <img src="/logo.svg" alt="Sharvex Logo" className="logo-icon-main" />
        </div>
        <div className="preloader-text" ref={textRef}>
          <span>SHARVEX</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
