import React from 'react';
import './LogoCloud.css';

const logos = [
  "Vercel", "Stripe", "Airbnb", "Supabase", "Linear", "Raycast", "Resend", "Clerk"
];

const LogoCloud: React.FC = () => {
  return (
    <section className="logo-cloud">
      <div className="container">
        <p className="logo-title">TRUSTED BY GLOBAL BRANDS & STARTUPS</p>
        <div className="logo-track">
          <div className="logo-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="logo-item">
                <span className="logo-text">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
