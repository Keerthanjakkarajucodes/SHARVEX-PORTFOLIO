import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  stepDuration?: number;
  onAnimationComplete?: () => void;
  threshold?: number;
}

const BlurText = ({
  text = '',
  delay = 150,
  className = '',
  animateBy = 'words',
  direction = 'top',
  stepDuration = 0.5,
  onAnimationComplete,
  threshold = 0.1,
}: BlurTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const hidden = {
    filter: 'blur(12px)',
    opacity: 0,
    y: direction === 'top' ? -40 : 40,
  };

  const visible = {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
  };

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((word, index) => (
        <motion.span
          key={index}
          initial={hidden}
          animate={isInView ? visible : hidden}
          transition={{
            duration: stepDuration,
            delay: (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {word}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
