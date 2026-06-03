import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigation, PageType } from './NavigationContext';
import gsap from 'gsap';
import { Instagram, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

const WHATSAPP_MESSAGE = `Hello,

Thank you for contacting PixelCraft | Creative Studio.

We provide the following services:

*Our Services*
• Logo Design
• Resume Design
• Website Design
• Posters & Banners
• Social Media Creatives
• Festival Banners
• Brand & Digital Ads
• Website Development
• Mobile App UI/UX
• Photo Retouching

Please let us know which service you are interested in.

Regards,
PixelCraft | Creative Studio

Thanks for contacting us.`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState('');
  const { page, setPage } = useNavigation();

  // GSAP Refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowBlueRef = useRef<HTMLDivElement>(null);
  const glowPurpleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const footerItemsRef = useRef<HTMLDivElement>(null);

  // Hamburger lines refs
  const hLine1Ref = useRef<HTMLSpanElement>(null);
  const hLine2Ref = useRef<HTMLSpanElement>(null);
  const hLine3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const indiaTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());
      setTime(indiaTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Work', page: 'work' as const, href: '/work' },
    { name: 'Services', page: 'services' as const, href: '/services' },
    { name: 'About', page: 'about' as const, href: '/about' },
    { name: 'Process', page: 'process' as const, href: '/process' },
  ];

  const menuItems = [
    { name: 'HOME', page: 'home' as const, href: '/' },
    { name: 'WORK', page: 'work' as const, href: '/work' },
    { name: 'SERVICES', page: 'services' as const, href: '/services' },
    { name: 'ABOUT', page: 'about' as const, href: '/about' },
    { name: 'PROCESS', page: 'process' as const, href: '/process' },
    { name: 'CONTACT', page: 'home' as const, href: '/#contact', isContact: true },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetPage: PageType,
    href?: string
  ) => {
    e.preventDefault();
    setPage(targetPage);
    if (href && href.startsWith('#')) {
      setTimeout(() => {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  };

  // Synchronize animations when menu state changes
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    if (isMenuOpen) {
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-active');

      gsap.killTweensOf([
        overlayRef.current,
        glowBlueRef.current,
        glowPurpleRef.current,
        logoRef.current,
        menuItemsRef.current,
        footerItemsRef.current,
        hLine1Ref.current,
        hLine2Ref.current,
        hLine3Ref.current,
      ]);

      // Hamburger morph to X
      gsap.to(hLine1Ref.current, {
        rotate: -45,
        y: 8,
        x: 0,
        width: '24px',
        backgroundColor: '#ef4444',
        duration: 0.45,
        ease: 'power3.out',
      });
      gsap.to(hLine2Ref.current, {
        opacity: 0,
        scaleX: 0,
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(hLine3Ref.current, {
        rotate: 45,
        y: -8,
        x: 0,
        width: '24px',
        backgroundColor: '#ef4444',
        duration: 0.45,
        ease: 'power3.out',
      });

      // Show overlay and scale in
      gsap.set(overlayRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power4.out',
      })
      .fromTo(overlayRef.current, {
        scale: 1.05,
      }, {
        scale: 1,
        duration: 0.9,
        ease: 'power4.out',
      }, 0)
      // Ambient atmospheric lighting animations
      .fromTo([glowBlueRef.current, glowPurpleRef.current], {
        opacity: 0,
        scale: 0.7,
      }, {
        opacity: 0.35,
        scale: 1.15,
        duration: 1.6,
        stagger: 0.2,
        ease: 'power3.out',
      }, 0.1)
      // Logo slide and fade in
      .fromTo(logoRef.current, {
        opacity: 0,
        y: -30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0.25)
      // Masked menu items staggered slide-up with blur-to-clear look
      .fromTo(menuItemsRef.current.filter(Boolean), {
        y: '100%',
        opacity: 0,
        rotateX: 20,
        filter: 'blur(10px)',
      }, {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
      }, 0.2)
      // Footer slide and fade in
      .fromTo(footerItemsRef.current, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, 0.55);

      tl.play();
    } else {
      // Re-enable body scroll
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-active');

      gsap.killTweensOf([
        overlayRef.current,
        glowBlueRef.current,
        glowPurpleRef.current,
        logoRef.current,
        menuItemsRef.current,
        footerItemsRef.current,
        hLine1Ref.current,
        hLine2Ref.current,
        hLine3Ref.current,
      ]);

      // Return hamburger to original state
      gsap.to(hLine1Ref.current, {
        rotate: 0,
        y: 0,
        x: 0,
        width: '24px',
        backgroundColor: '#ffffff',
        duration: 0.45,
        ease: 'power3.out',
      });
      gsap.to(hLine2Ref.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(hLine3Ref.current, {
        rotate: 0,
        y: 0,
        x: 0,
        width: '20px',
        backgroundColor: '#10b981',
        duration: 0.45,
        ease: 'power3.out',
      });

      // Quick reverse stagger details out
      tl.to(menuItemsRef.current.filter(Boolean), {
        y: '-25%',
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.45,
        stagger: 0.04,
        ease: 'power3.in',
      })
      .to([glowBlueRef.current, glowPurpleRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.45,
        ease: 'power3.in',
      }, 0.05)
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: 'hidden', pointerEvents: 'none' });
        }
      }, 0.15);

      tl.play();
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-active');
    };
  }, [isMenuOpen]);

  // Infinite slow motion ambient drift for glows
  useEffect(() => {
    if (isMenuOpen && glowBlueRef.current && glowPurpleRef.current) {
      gsap.to(glowBlueRef.current, {
        x: '40px',
        y: '-30px',
        scale: 1.2,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(glowPurpleRef.current, {
        x: '-50px',
        y: '40px',
        scale: 1.25,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    } else {
      if (glowBlueRef.current) gsap.killTweensOf(glowBlueRef.current);
      if (glowPurpleRef.current) gsap.killTweensOf(glowPurpleRef.current);
    }
  }, [isMenuOpen]);

  const handleItemEnter = (index: number) => {
    gsap.to(`.overlay-menu-item-${index}`, {
      x: 16,
      color: '#10b981',
      duration: 0.4,
      ease: 'power3.out',
    });
    gsap.to(`.overlay-menu-dot-${index}`, {
      scale: 1.2,
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleItemLeave = (index: number) => {
    gsap.to(`.overlay-menu-item-${index}`, {
      x: 0,
      color: '#ffffff',
      duration: 0.4,
      ease: 'power3.out',
    });
    const isCurrentlyActive = page === menuItems[index].page && !menuItems[index].isContact;
    gsap.to(`.overlay-menu-dot-${index}`, {
      scale: isCurrentlyActive ? 1.0 : 0,
      opacity: isCurrentlyActive ? 1.0 : 0,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  return (
    <>
      {/* Rail Nav (Desktop Only) */}
      <aside className="fixed top-0 left-0 h-screen w-20 border-r border-border hidden md:flex flex-col justify-between items-center py-10 z-50 bg-bg">
        <div 
          onClick={() => setPage('home')}
          className="rail-text font-black text-2xl tracking-tighter text-white cursor-pointer hover:text-accent transition-colors duration-300"
        >
          PIXELCRAFT<span className="text-accent">.</span>
        </div>
        <nav className="rail-text flex gap-8 label-micro">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.page)}
              whileHover={{ x: 5, color: "#10b981" }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>
        <div className="label-micro opacity-40">©26</div>
      </aside>

      {/* Main Header */}
      <header className="fixed top-0 left-0 md:left-20 right-0 h-20 border-b border-border flex items-center justify-between px-10 z-40 bg-bg/80 backdrop-blur-md">
        <div className="hidden md:flex gap-8">
          <motion.a 
            href="/" 
            onClick={(e) => handleNavClick(e, 'home', '#home')}
            whileHover={{ y: -2, color: "#fff" }} 
            className="label-micro opacity-40 cursor-pointer hover:opacity-100 transition-opacity text-white"
          >
            Home
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/pixel_craft.in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ y: -2, color: "#fff" }} 
            className="label-micro opacity-40 cursor-pointer hover:opacity-100 transition-opacity text-white"
          >
            Instagram
          </motion.a>
          <motion.a 
            href="/#contact" 
            onClick={(e) => handleNavClick(e, 'home', '#contact')}
            whileHover={{ y: -2, color: "#fff" }} 
            className="label-micro opacity-40 cursor-pointer hover:opacity-100 transition-opacity text-white"
          >
            Let's Connect
          </motion.a>
        </div>
        
        {/* Mobile Logo */}
        <div 
          onClick={() => {
            if (isMenuOpen) setIsMenuOpen(false);
            setPage('home');
          }}
          className="md:hidden font-black text-xl tracking-tighter text-white cursor-pointer hover:text-accent transition-colors duration-300 z-[75]"
        >
          PIXELCRAFT<span className="text-accent">.</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden sm:block text-right min-w-[100px]">
            <span className="block label-micro ml-[1px] pr-[40px] pl-[1px]" style={{ color: '#ffffff', fontWeight: 'bold', fontFamily: 'Georgia' }}>India</span>
            <span className="block text-[10px] font-mono uppercase text-accent pr-[40px] pl-[1px]">{time} IST</span>
          </div>
          <motion.a 
            href="/#contact"
            onClick={(e) => handleNavClick(e, 'home', '#contact')}
            whileHover={{ 
              y: -5,
              scale: 1.05,
              backgroundColor: "#10b981", 
              color: "#fff",
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
              rotate: 1
            }}
            whileTap={{ scale: 0.9, rotate: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="relative overflow-hidden group bg-white text-black px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-4 text-[8px] sm:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl hidden md:block cursor-pointer"
          >
            <span className="relative z-10">Contact Us</span>
            <motion.div 
              className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </motion.a>
        </div>
      </header>

      {/* Mobile Toggle Button (Direct top-level fixed element to bypass layout parent z-index context issues) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-0 right-10 h-20 flex flex-col justify-center items-end gap-[6px] z-[70] md:hidden cursor-pointer w-12"
        aria-label="Toggle Menu"
      >
        <span
          ref={hLine1Ref}
          className="block w-6 h-[2px] bg-white rounded-full origin-center transition-colors duration-300"
        />
        <span
          ref={hLine2Ref}
          className="block w-4 h-[2px] bg-white rounded-full origin-center transition-colors duration-300"
        />
        <span
          ref={hLine3Ref}
          className="block w-5 h-[2px] bg-accent rounded-full origin-center transition-colors duration-300"
        />
      </button>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        ref={overlayRef}
        id="fullscreen-mobile-overlay"
        data-lenis-prevent
        style={{ 
          scale: 1.05,
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5.5rem)',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
          height: '100dvh'
        }}
        className="fixed inset-0 bg-black z-[60] flex flex-col px-6 sm:px-10 md:hidden pointer-events-none opacity-0 invisible overflow-y-auto"
      >
        {/* Soft Ambient Cinematic Glowing Blobs */}
        <div
          ref={glowBlueRef}
          id="overlay-glow-blue"
          className="absolute top-[10%] -right-[15%] w-[320px] h-[320px] bg-blue-600/30 rounded-full filter blur-[100px] pointer-events-none -z-10"
        />
        <div
          ref={glowPurpleRef}
          id="overlay-glow-purple"
          className="absolute bottom-[10%] -left-[15%] w-[350px] h-[350px] bg-purple-700/25 rounded-full filter blur-[100px] pointer-events-none -z-10"
        />

        {/* Premium Cinematic Grain SVG Noise Overlay */}
        <svg id="cinematic-grain-svg" className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.06 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Brand Watermark / Back Label */}
        <div ref={logoRef} id="overlay-logo" className="absolute left-10 top-8 z-[65] pointer-events-none" />

        {/* Inner Scroll Wrapper to prevent overflow constraints on all device heights */}
        <div 
          id="overlay-scroll-container"
          data-lenis-prevent
          className="flex-grow flex flex-col justify-between w-full min-h-full gap-6 select-none pb-8"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Fullscreen Links Navigation Area */}
          <nav id="overlay-mobile-nav" className="flex flex-col justify-center flex-grow gap-2 sm:gap-4 my-auto relative z-10 pl-0 pt-0 pb-0 mb-0 mt-0 min-h-[max-content]">
            {menuItems.map((item, index) => {
              const isActive = page === item.page && !item.isContact;
              
              return (
                <div 
                  key={item.name} 
                  id={`overlay-item-container-${item.name.toLowerCase()}`}
                  className="overflow-hidden py-0.5 flex items-center h-12 min-[360px]:h-14 sm:h-18 md:h-20"
                >
                  <div
                    ref={(el) => { menuItemsRef.current[index] = el; }}
                    className="w-full flex items-center justify-between"
                  >
                    <a
                      id={`overlay-link-${item.name.toLowerCase()}`}
                      href={item.href}
                      onClick={(e) => {
                        setIsMenuOpen(false);
                        if (item.isContact) {
                          handleNavClick(e, 'home', '#contact');
                        } else {
                          handleNavClick(e, item.page);
                        }
                      }}
                      onMouseEnter={() => handleItemEnter(index)}
                      onMouseLeave={() => handleItemLeave(index)}
                      className={`overlay-menu-item-${index} cursor-pointer select-none font-sans text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl font-[900] italic leading-[0.95] tracking-tight uppercase transition-all duration-300 flex items-center gap-4 ${
                        isActive ? 'text-accent' : 'text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span 
                        className={`overlay-menu-dot-${index} w-2 h-2 sm:w-[10px] sm:h-[10px] bg-accent rounded-full transition-all duration-300 origin-center ${
                          isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      />
                    </a>
                    
                    {/* Micro Index Indicating Premium Digital Platform Layout */}
                    <span className="font-mono text-[9px] text-white/20 tracking-widest hidden sm:inline mr-2">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Footer Details */}
          <div 
            ref={footerItemsRef}
            id="overlay-footer-details"
            className="border-t border-white/10 pt-6 flex flex-col gap-6 text-white/50 relative z-10 mt-auto min-h-[max-content]"
          >
            <div className="flex flex-col gap-3">
              <span id="overlay-social-header" className="label-micro text-[9px] tracking-[0.2em] text-accent font-mono opacity-80 uppercase">// GET IN TOUCH</span>
              <div id="overlay-social-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Instagram Card */}
                <motion.a 
                  id="overlay-link-instagram-card"
                  href="https://www.instagram.com/pixel_craft.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.01, borderColor: "rgba(16, 185, 129, 0.4)", backgroundColor: "rgba(255,255,255,0.02)" }}
                  whileTap={{ scale: 0.98 }}
                  className="overlay-social-item flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white">
                      <Instagram size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">Instagram</span>
                      <span className="text-xs font-semibold text-white tracking-tight">@pixel_craft.in</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-white/30" />
                </motion.a>

                {/* Email Card */}
                <motion.a 
                  id="overlay-link-email-card"
                  href="mailto:teampixelcraft7@gmail.com" 
                  whileHover={{ scale: 1.01, borderColor: "rgba(16, 185, 129, 0.4)", backgroundColor: "rgba(255,255,255,0.02)" }}
                  whileTap={{ scale: 0.98 }}
                  className="overlay-social-item flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white">
                      <Mail size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">Email</span>
                      <span className="text-xs font-semibold text-white tracking-tight">teampixelcraft7@gmail.com</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-white/30" />
                </motion.a>

                {/* WhatsApp Card */}
                <motion.a 
                  id="overlay-link-whatsapp-card"
                  href={`https://wa.me/918160888895?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ 
                    scale: 1.01, 
                    borderColor: "rgba(37, 211, 102, 0.4)", 
                    backgroundColor: "rgba(255,255,255,0.02)",
                    boxShadow: "0 0 15px rgba(37, 211, 102, 0.25)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="overlay-social-item flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01] transition-all duration-300 cursor-pointer sm:col-span-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#25D366]">
                      <MessageCircle size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">WhatsApp</span>
                      <span className="text-xs font-semibold text-white tracking-tight">Chat with us instantly</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-white/30" />
                </motion.a>
              </div>
            </div>

            <div id="overlay-meta-footer" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white/30 border-t border-white/5 pt-4">
              <div id="overlay-studio-brand" className="text-left font-mono text-[9px] uppercase tracking-widest flex flex-col gap-1">
                <span className="opacity-50">PIXEL CRAFT STUDIO</span>
              </div>
              <div id="overlay-studio-time" className="text-left sm:text-right font-mono text-[9px] uppercase tracking-widest text-accent">
                TIME: {time} IST
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
