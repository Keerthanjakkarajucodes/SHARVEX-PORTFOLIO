import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

const BRAND = "SHARVEX";

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    let timeout1: number;
    let timeout2: number;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout1 = window.setTimeout(() => {
          setDone(true);
          // Wait 700ms for the transition-opacity duration-700 to complete
          timeout2 = window.setTimeout(() => onComplete(), 700);
        }, 500);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout1);
      window.clearTimeout(timeout2);
    };
  }, [onComplete]);

  return (
    <div className={`sx-root${done ? " sx-done" : ""}`}>
      <div aria-hidden className="sx-vignette" />
      <div aria-hidden className="sx-grid" />

      <div className="sx-stage">
        <div aria-hidden className="sx-halo" />

        <svg aria-hidden viewBox="0 0 200 200" className="sx-ring-outer">
          <circle
            cx="100" cy="100" r="94"
            fill="none" stroke="currentColor" strokeWidth="0.6"
            strokeDasharray="2 6" opacity="0.55"
          />
        </svg>

        <svg aria-hidden viewBox="0 0 200 200" className="sx-ring-inner">
          <circle cx="100" cy="100" r="86" fill="none" stroke="var(--sx-ring)" strokeWidth="1" />
          <circle
            cx="100" cy="100" r="86"
            fill="none" stroke="currentColor" strokeWidth="1.2"
            strokeLinecap="round" strokeDasharray="60 480"
          />
        </svg>

        <div className="sx-logo">
          <img src="/logo.svg" alt="Sharvex logo" draggable={false} />
        </div>
      </div>

      <div className="sx-wordmark" aria-label="Sharvex">
        {BRAND.split("").map((ch, i) => (
          <span
            key={i}
            className="sx-letter"
            style={{ animationDelay: `${0.6 + i * 0.08}s` }}
          >
            {ch}
          </span>
        ))}
      </div>

      <p className="sx-tagline">Crafting Digital Excellence</p>

      <div className="sx-progress">
        <div className="sx-progress-bar" style={{ width: `${progress}%` }} />
        <div aria-hidden className="sx-shimmer" />
      </div>

      <div className="sx-meta">
        <span className="sx-percent">{String(progress).padStart(3, "0")}%</span>
        <span className="sx-rule" />
        <div className="sx-dots">
          <span className="sx-dot" />
          <span className="sx-dot" />
          <span className="sx-dot" />
        </div>
      </div>

      <div className="sx-footer">
        <span className="sx-footer-rule" />
        <span className="sx-footer-text">Est · Studio</span>
        <span className="sx-footer-rule" />
      </div>
    </div>
  );
};

export default Preloader;