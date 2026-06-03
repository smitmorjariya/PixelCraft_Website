import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;     // Distance of interaction (pixels)
  power?: number;     // Strength of attraction force (0 to 1)
  className?: string; // Optional design wrapper class override
}

export default function Magnetic({ children, range = 90, power = 0.4, className }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Detect touch support to bypass magnetic pull on mobile/tablet devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return;

    const child = element.firstElementChild as HTMLElement;
    if (!child) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < range) {
        // Pull the inner child element towards the cursor
        const pullX = deltaX * power;
        const pullY = deltaY * power;

        gsap.to(child, {
          x: pullX,
          y: pullY,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        // Return back to center with springy physics once cursor leaves interaction range
        gsap.to(child, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.1, 0.45)',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = () => {
      // Return back to center with a buttery elastic spring back
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, power]);

  return (
    <div ref={containerRef} className={className || "inline-block"}>
      {children}
    </div>
  );
}
