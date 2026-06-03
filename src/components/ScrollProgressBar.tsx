import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Use a sleek spring tension for a fluid premium inertia feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <motion.div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[99] origin-left pointer-events-none shadow-[0_0_8px_rgba(16,185,129,0.8)]"
      style={{ scaleX }}
    />
  );
}
