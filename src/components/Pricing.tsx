import React from 'react';
import { Check, Zap } from 'lucide-react';
import './Pricing.css';

const tiers = [
  {
    name: 'Project Based',
    price: '$2k+',
    desc: 'Best for specific, one-off deliverables.',
    features: ['Custom UI/UX Design', 'Full Frontend Dev', 'Mobile Responsive', '3 Rounds of Revisions'],
    btnText: 'Start a Project',
    highlight: false
  },
  {
    name: 'Retainer',
    price: '$5k',
    desc: 'Ongoing support and continuous development.',
    features: ['40 hours / month', 'Priority Support', 'Weekly Strategy Calls', 'Infinite Revisions', 'Direct Slack Access'],
    btnText: 'Secure Retainer',
    highlight: true
  },
  {
    name: 'Consultation',
    price: '$250',
    desc: 'Expert advice on architecture and strategy.',
    features: ['1-Hour Video Call', 'Tech Stack Audit', 'Architecture Review', 'Project Roadmap'],
    btnText: 'Book a Call',
    highlight: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Flexible <span className="accent">engagement</span> models.</h2>
          <p className="section-desc">Transparent pricing designed to scale with your project needs.</p>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier, index) => (
            <div key={index} className={`pricing-card ${tier.highlight ? 'highlight glass' : 'glass'}`}>
              {tier.highlight && <div className="popular-badge"><Zap size={14} /> MOST POPULAR</div>}
              <h3>{tier.name}</h3>
              <div className="price">
                <span className="amount">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="period">/month</span>}
              </div>
              <p className="tier-desc">{tier.desc}</p>
              
              <ul className="tier-features">
                {tier.features.map((feat, i) => (
                  <li key={i}><Check size={16} className="check-icon" /> {feat}</li>
                ))}
              </ul>
              
              <button className={`btn-tier ${tier.highlight ? 'primary' : 'secondary'}`}>
                {tier.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
