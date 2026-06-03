import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;

      // Cursor follows immediately
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Follower follows with lag
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { 
        scale: 0, 
        opacity: 0,
        duration: 0.2 
      });
      gsap.to(follower, { 
        scale: 1.5, 
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: '#10b981', 
        borderWidth: '1px',
        opacity: 1, 
        duration: 0.3 
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { 
        scale: 1, 
        opacity: 1,
        backgroundColor: 'white', 
        duration: 0.3 
      });
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)', 
        borderWidth: '1px',
        opacity: 1, 
        duration: 0.3 
      });
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const interactiveEl = target.closest('a, button, [role="button"], .cursor-pointer');
      if (interactiveEl) {
        onMouseEnterLink();
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      
      const currentInteractive = target.closest('a, button, [role="button"], .cursor-pointer');
      const nextInteractive = relatedTarget?.closest('a, button, [role="button"], .cursor-pointer');
      
      if (currentInteractive && !nextInteractive) {
        onMouseLeaveLink();
      }
    };

    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointerdown', onMouseDown);
    window.addEventListener('pointerup', onMouseUp);
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerout', handlePointerOut);

    return () => {
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerdown', onMouseDown);
      window.removeEventListener('pointerup', onMouseUp);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      {/* Lagging Follower Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </div>
  );
}
