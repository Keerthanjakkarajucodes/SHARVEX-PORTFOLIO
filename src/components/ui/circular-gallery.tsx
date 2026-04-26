import React, { useState, useEffect, useRef, type HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 550, autoRotateSpeed = 0.015, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animFrameRef = useRef<number | null>(null);

    // Scroll → rotation
    useEffect(() => {
      const onScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        setRotation(progress * 360);
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    // Auto-rotate when idle
    useEffect(() => {
      const tick = () => {
        if (!isScrolling) setRotation(r => r + autoRotateSpeed);
        animFrameRef.current = requestAnimationFrame(tick);
      };
      animFrameRef.current = requestAnimationFrame(tick);
      return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;
    const CARD_W = 260;
    const CARD_H = 340;

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={{
          width: '100%',
          height: '100%',
          perspective: '1800px',
          perspectiveOrigin: '50% 50%',
        }}
        {...props}
      >
        {/* The rotating stage — must be centered absolutely */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `translateX(-50%) translateY(-50%) rotateY(${rotation}deg)`,
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRot = rotation % 360;
            const rel = (itemAngle + totalRot + 360) % 360;
            const norm = rel > 180 ? 360 - rel : rel;
            const opacity = Math.max(0.2, 1 - norm / 180);

            return (
              <div
                key={item.photo.url}
                style={{
                  position: 'absolute',
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  marginLeft: `-${CARD_W / 2}px`,
                  marginTop: `-${CARD_H / 2}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  transition: 'opacity 0.25s linear',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(59,130,246,0.25)',
                }}
              >
                <img
                  src={item.photo.url}
                  alt={item.photo.text}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: item.photo.pos ?? 'center',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                  }}
                >
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: 0, fontFamily: 'var(--font-heading)' }}>
                    {item.common}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', margin: '0.2rem 0 0' }}>
                    {item.binomial}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export { CircularGallery };
