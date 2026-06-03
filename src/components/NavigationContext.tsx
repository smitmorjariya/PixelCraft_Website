import React, { createContext, useContext, useState, useEffect } from 'react';
import gsap from 'gsap';

export type PageType = 'home' | 'about' | 'services' | 'work' | 'process' | 'privacy' | 'terms' | 'cookie';

interface NavigationContextType {
  page: PageType;
  setPage: (page: PageType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const PATH_MAP: Record<string, PageType> = {
  '/': 'home',
  '/about': 'about',
  '/services': 'services',
  '/work': 'work',
  '/process': 'process',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/cookie': 'cookie',
};

const PAGE_MAP: Record<PageType, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  work: '/work',
  process: '/process',
  privacy: '/privacy',
  terms: '/terms',
  cookie: '/cookie',
};

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  // Determine initial page state from URL path
  const getPageFromPath = (): PageType => {
    const path = window.location.pathname;
    return PATH_MAP[path] || 'home';
  };

  const [page, setPageState] = useState<PageType>(getPageFromPath);

  useEffect(() => {
    const handlePopState = () => {
      setPageState(getPageFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const setPage = (newPage: PageType) => {
    if (page === newPage) {
      // Standard window scroll if already on same page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const container = document.getElementById('transition-curtain-container');
    const layer1 = document.getElementById('curtain-layer-1');
    const layer2 = document.getElementById('curtain-layer-2');

    if (container && layer1 && layer2) {
      // Prevent interactions or layout fights by canceling active animations
      gsap.killTweensOf([layer1, layer2]);

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { pointerEvents: 'none' });
        }
      });

      // 1. Lock screen clicks & sweep the accent and dark panels upwards
      tl.set(container, { pointerEvents: 'auto' })
        .fromTo(layer1, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' })
        .fromTo(layer2, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' }, '-=0.42')
        .call(() => {
          // 2. Perform the actual page swap silently behind the curtain cover
          setPageState(newPage);
          
          const targetPath = PAGE_MAP[newPage] || '/';
          if (window.location.pathname !== targetPath) {
            window.history.pushState(null, '', targetPath);
          }

          // Zero out the window scroll state instantly so the new page mounts at the top-scroll pivot
          window.scrollTo({ top: 0 });
        })
        // Provide the React state update engine a brief cycle to settle
        .to({}, { duration: 0.18 })
        // 3. Clear the panels upward to reveal the masterpiece
        .to(layer2, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' })
        .to(layer1, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }, '-=0.42')
        .call(() => {
          // Let lazy structures and scroll engines know they can calculate clean heights
          window.dispatchEvent(new Event('resize'));
        })
        // 4. Instant reset: place layers back at yPercent: 100 so they're primed for the next transition
        .set([layer1, layer2], { yPercent: 100 });

    } else {
      // Fallback transition if curtain elements are temporarily unmounted
      const mainEl = document.querySelector('main');
      if (mainEl) {
        gsap.to(mainEl, {
          opacity: 0,
          y: -15,
          duration: 0.35,
          ease: 'power2.inOut',
          onComplete: () => {
            setPageState(newPage);
            const targetPath = PAGE_MAP[newPage] || '/';
            if (window.location.pathname !== targetPath) {
              window.history.pushState(null, '', targetPath);
            }
            window.scrollTo({ top: 0 });
            gsap.fromTo(mainEl, 
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power2.out',
                delay: 0.05,
                clearProps: 'opacity,transform'
              }
            );
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'));
            }, 100);
          }
        });
      } else {
        setPageState(newPage);
        const targetPath = PAGE_MAP[newPage] || '/';
        if (window.location.pathname !== targetPath) {
          window.history.pushState(null, '', targetPath);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <NavigationContext.Provider value={{ page, setPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
