import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: 'How do I start a project with you?',
    answer: 'The best way is to reach out via the contact form or book a consultation call. We will discuss your vision, goals, and technical requirements to create a tailored roadmap.'
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'A standard website project takes 4-8 weeks, depending on complexity. UI/UX design usually takes 2-3 weeks, followed by development and final testing.'
  },
  {
    question: 'Do you work with startups on a budget?',
    answer: 'Absolutely. We offer project-based models that can be phased to fit your current funding stage while ensuring the foundation is built for scale.'
  },
  {
    question: 'What tech stack do you specialize in?',
    answer: 'We are experts in React, Next.js, TypeScript, and GSAP for high-end animations. We also specialize in AI integrations and custom LLM workflows.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently asked <span className="accent">questions.</span></h2>
          <p className="section-desc">Got questions? We've got answers.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass ${openIndex === index ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
