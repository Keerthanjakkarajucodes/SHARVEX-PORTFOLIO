import React from 'react';
import MagicBento from './ui/MagicBento';
import './FeatureGrid.css';

const FeatureGrid: React.FC = () => {
  return (
    <section className="features" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Elevating your digital <span className="accent">presence.</span></h2>
          <p className="section-desc">Comprehensive creative solutions tailored to your unique vision.</p>
        </div>

        <MagicBento 
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="59, 130, 246" 
        />
      </div>
    </section>
  );
};

export default FeatureGrid;
