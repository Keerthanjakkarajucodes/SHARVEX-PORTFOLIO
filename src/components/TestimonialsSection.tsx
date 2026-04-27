import React from 'react';
import { CircularGallery, type GalleryItem } from './ui/circular-gallery';

const galleryData: GalleryItem[] = [
  {
    common: 'Lumina Store',
    binomial: 'E-Commerce · UI/UX',
    photo: {
      url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&auto=format&fit=crop&q=80',
      text: 'Luxury e-commerce platform',
      by: 'SHARVEX',
    },
  },
  {
    common: 'Aura Dashboard',
    binomial: 'SaaS · Data Viz',
    photo: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
      text: 'Analytics dashboard',
      by: 'SHARVEX',
    },
  },
  {
    common: 'Nexus AI',
    binomial: 'AI Integration · LLM',
    photo: {
      url: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=900&auto=format&fit=crop&q=80',
      text: 'AI productivity tool',
      by: 'SHARVEX',
    },
  },
  {
    common: 'Vanguard Brand',
    binomial: 'Branding · Identity',
    photo: {
      url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80',
      text: 'Corporate branding project',
      by: 'SHARVEX',
    },
  },
  {
    common: 'Orbit Mobile',
    binomial: 'React Native · iOS',
    photo: {
      url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&auto=format&fit=crop&q=80',
      text: 'Mobile application design',
      by: 'SHARVEX',
    },
  },
  {
    common: 'Echo Finance',
    binomial: 'Fintech · Web App',
    photo: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
      text: 'Finance web application',
      by: 'SHARVEX',
    },
  },
  {
    common: 'Stellar Agency',
    binomial: 'Creative · Agency',
    photo: {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80',
      text: 'Creative agency website',
      by: 'SHARVEX',
    },
  },
  {
    common: 'Pulse Health',
    binomial: 'HealthTech · Dashboard',
    photo: {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80',
      text: 'Health monitoring platform',
      by: 'SHARVEX',
    },
  },
];

/**
 * Sticky-scroll 3D gallery section.
 * The outer div is 400vh tall; the inner sticky container stays pinned
 * at the top for that entire scroll range, giving the carousel time to rotate.
 */
const TestimonialsSection: React.FC = () => {
  return (
    <div
      id="testimonials"
      style={{
        width: '100%',
        background: 'var(--bg-color)',
        /* 400vh of scroll travel so the gallery has time to spin */
        height: '400vh',
        position: 'relative',
      }}
    >
      {/* ── sticky viewport ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'absolute',
            top: '5.5rem',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <h2 className="section-title" style={{ marginBottom: '0.4rem' }}>
            Selected <span className="accent">works.</span>
          </h2>
          <p className="section-desc" style={{ marginBottom: 0 }}>
            Scroll to spin the gallery.
          </p>
        </div>

        {/* 
          Gallery container — must have an explicit pixel height.
          We fill the full sticky viewport height.
        */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <CircularGallery
            items={galleryData}
            radius={520}
            autoRotateSpeed={0.012}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
