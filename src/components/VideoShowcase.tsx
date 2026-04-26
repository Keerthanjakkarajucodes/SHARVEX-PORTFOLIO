import React from 'react';
import './VideoShowcase.css';

const VideoShowcase: React.FC = () => {
  return (
    <section className="video-showcase container">
      <div className="video-container glass glow-effect">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="showcase-video"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-working-on-a-laptop-4293-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <div className="video-content">
            <h3>Digital Excellence in Motion</h3>
            <p>We combine strategic design with high-performance engineering.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
