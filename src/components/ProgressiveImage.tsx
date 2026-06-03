import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProgressiveImage({ src, alt, className = '' }: ProgressiveImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [isLowResLoaded, setIsLowResLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate deterministic micro placeholder URL for Picsum seed images
  const lowResSrc = src.includes('picsum.photos/seed')
    ? src.replace('/800/600', '/40/30')
    : src;

  // Set up intersection observer to detect when component is close to the viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Pre-triggers loading when the image is within 200px of visible area
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Prefetch low-res placeholder image once component is close to the viewport
  useEffect(() => {
    if (!isInView) return;

    let active = true;
    const lowResImg = new Image();
    lowResImg.src = lowResSrc;
    lowResImg.onload = () => {
      if (active) {
        setIsLowResLoaded(true);
      }
    };
    return () => {
      active = false;
    };
  }, [lowResSrc, isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#070707] rounded-2xl select-none">
      {/* 1. Blur-up Low-Resolution Miniature Placeholder */}
      {isInView && isLowResLoaded && !isHighResLoaded && (
        <img
          src={lowResSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover scale-110 filter blur-xl opacity-60 transition-opacity duration-1000 pointer-events-none"
          referrerPolicy="no-referrer"
        />
      )}

      {/* 2. Premium Shimmer Loader & Minimal Cyber Branding */}
      {!isHighResLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#070707]">
          {/* Hardware-accelerated scanning shimmer overlay */}
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"
          />
          
          {/* Creative Studio Minimal Spinner Indicator */}
          <div className="flex flex-col items-center gap-3 z-10 select-none pointer-events-none">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-accent/15 animate-ping opacity-60" />
              <div className="w-5 h-5 rounded-full border border-white/5 border-t-accent animate-spin" />
            </div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-accent/60 uppercase">
              // IMG.SYS INIT
            </span>
          </div>
        </div>
      )}

      {/* 3. Main Full-Resolution Media Asset */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsHighResLoaded(true)}
          className={`${className} transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHighResLoaded 
              ? 'opacity-100 scale-100 blur-0' 
              : 'opacity-0 scale-105 blur-[6px]'
          }`}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}
