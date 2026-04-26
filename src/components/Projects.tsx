import React from 'react';
import InfiniteMenu from './ui/InfiniteMenu';
import './Projects.css';

const portfolioItems = [
  {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    link: '#',
    title: 'DevFlow',
    description: 'Full-stack SaaS platform with real-time collaboration.'
  },
  {
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop',
    link: '#',
    title: 'Orbit App',
    description: 'Cross-platform mobile app for fitness tracking.'
  },
  {
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    link: '#',
    title: 'Nexus AI',
    description: 'AI chat assistant powered by custom LLM fine-tuning.'
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    link: '#',
    title: 'Echo Finance',
    description: 'Personal finance dashboard with predictive analytics.'
  },
  {
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1000&auto=format&fit=crop',
    link: '#',
    title: 'Lumina Store',
    description: 'High-end fashion e-commerce with 3D product previews.'
  },
  {
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000&auto=format&fit=crop',
    link: '#',
    title: 'Vanguard',
    description: 'Complete rebrand & digital identity for a venture firm.'
  }
];

const Projects: React.FC = () => {
  return (
    <section className="projects-section" id="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured <span className="accent">projects.</span></h2>
          <p className="section-desc">Drag to explore — a universe of work built for visionary brands.</p>
        </div>

        <div className="projects-canvas-wrapper glass">
          <InfiniteMenu items={portfolioItems} scale={1.2} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
