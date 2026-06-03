import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigation } from './NavigationContext';
import Magnetic from './Magnetic';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const { setPage } = useNavigation();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden md:pl-20">
      <div className="container mx-auto px-10 relative z-10">
        <div className="relative">
          {/* Floating Shapes from theme */}
          <div className="absolute -top-20 right-0 w-48 h-48 border border-accent/30 rounded-full opacity-40 -z-10" />
          <div className="absolute bottom-0 -left-10 w-32 h-32 bg-radial from-accent/20 to-transparent blur-3xl opacity-40 -z-10" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="editorial-title mb-8 pl-[6px] pt-[14px]"
          >
            CRAFTING <br />
            DIGITAL <br />
            REVERIE<span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-xl md:text-2xl text-white/60 leading-relaxed mb-12"
          >
            We are a high-end creative agency specializing in immersive experiences, luxury brand identities, and precision-engineered web systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <span className="label-micro text-accent opacity-60 uppercase tracking-[0.3em]">CORE DISCIPLINES</span>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {['EXPERIENCE DESIGN', 'TECHNICAL PROTOTYPING', 'BRAND ARCHITECTURE'].map((item) => (
                <div key={item} className="flex items-center gap-4 group">
                  <div className="w-8 h-[1px] bg-white/20 transition-all duration-500 group-hover:w-12 group-hover:bg-accent" />
                  <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <Magnetic power={0.5}>
              <motion.a
                href="/work"
                onClick={(e) => {
                  e.preventDefault();
                  setPage('work');
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#fff", 
                  color: "#000",
                  boxShadow: "0 30px 60px rgba(255, 255, 255, 0.25)",
                  rotate: -1
                }}
                whileTap={{ scale: 0.95, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="relative overflow-hidden group inline-block border border-white px-8 py-4 sm:px-14 sm:py-7 text-[9px] sm:text-[11px] uppercase font-black tracking-[0.3em] sm:tracking-[0.5em] transition-colors shadow-2xl"
              >
                <span className="relative z-10">Discover Our Work</span>
                <motion.div 
                  className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

