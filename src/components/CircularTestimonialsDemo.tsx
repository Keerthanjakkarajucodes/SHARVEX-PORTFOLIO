
import { CircularTestimonials } from './ui/circular-testimonials';

const testimonials = [
  {
    quote:
      "The cinematic transitions and attention to detail in Rahul Studio's work is unparalleled. They truly understand how to build for the future.",
    name: "Tamar Mendelson",
    designation: "Product Lead @ TechFlow",
    src:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Working with Rahul was a game-changer for our brand. The AI integration was seamless and the design is absolutely stunning.",
    name: "Joe Charlescraft",
    designation: "Founder of Velora",
    src:
      "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "If you need a high-end digital experience, look no further. The craftsmanship and performance are top-tier. Highly recommended!",
    name: "Martina Edelweist",
    designation: "CEO @ Lumina Studio",
    src:
      "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
];

export const CircularTestimonialsDemo = () => (
  <section className="testimonials-section py-20" id="testimonials">
    <div className="container flex flex-col items-center">
      <div className="section-header text-center mb-16">
        <h2 className="section-title">What our <span className="accent">clients</span> say.</h2>
        <p className="section-desc">Voices from visionary brands and innovative startups.</p>
      </div>
      
      {/* Light testimonials section */}
      <div className="w-full flex items-center justify-center relative">
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "var(--fg-color)",
            designation: "var(--muted-text)",
            testimony: "var(--fg-color)",
            arrowBackground: "var(--fg-color)",
            arrowForeground: "var(--bg-color)",
            arrowHoverBackground: "var(--accent-color)",
          }}
          fontSizes={{
            name: "28px",
            designation: "20px",
            quote: "20px",
          }}
        />
      </div>
    </div>
  </section>
);
