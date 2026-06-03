/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WorkGrid from './components/WorkGrid';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import WhatsAppWidget from './components/WhatsAppWidget';
import { NavigationProvider, useNavigation } from './components/NavigationContext';
import LegalPage from './components/LegalPage';
import ScrollProgressBar from './components/ScrollProgressBar';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { page } = useNavigation();

  return (
    <div className="min-h-screen font-sans">
      <ScrollProgressBar />
      <CustomCursor />
      <Navbar />

      {/* Cinematic Curtain Page Transition Overlay */}
      <div 
        id="transition-curtain-container" 
        className="fixed inset-0 z-[120] pointer-events-none overflow-hidden"
      >
        <div 
          id="curtain-layer-1" 
          className="absolute inset-0 w-full h-full bg-accent" 
          style={{ transform: 'translateY(100%)' }}
        />
        <div 
          id="curtain-layer-2" 
          className="absolute inset-0 w-full h-full bg-[#070708] border-t border-accent/20 flex flex-col items-center justify-center gap-2"
          style={{ transform: 'translateY(100%)' }}
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] uppercase text-accent font-black">
            <span className="w-2 h-2 border border-accent bg-accent/30 animate-pulse rounded-full inline-block"></span>
            PixelCraft
          </div>
          <span className="font-mono text-[7px] tracking-[0.25em] text-white/30 uppercase">creative engineering</span>
        </div>
      </div>

      <main>
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Services />
              <WorkGrid />
              <Process />
              <Contact />
            </motion.div>
          )}

          {page === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-20"
            >
              {/* Profile Intro */}
              <div className="py-24 md:pl-20 px-10 bg-bg border-b border-border">
                <div className="container mx-auto">
                  <span className="label-micro text-accent mb-4 block uppercase tracking-widest font-mono">// Our Agency Profile</span>
                  <h1 className="editorial-title text-5xl sm:text-6xl md:text-8xl text-white mb-6 leading-none">About Us.</h1>
                  <p className="max-w-xl text-white/50 text-lg leading-relaxed font-sans">
                    We are a high-end design engineering agency, creating products and platforms that define the premium web vanguard.
                  </p>
                </div>
              </div>
              <About />
              <Contact />
            </motion.div>
          )}

          {page === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-20"
            >
              {/* Services Intro */}
              <div className="py-24 md:pl-20 px-10 bg-bg border-b border-border">
                <div className="container mx-auto">
                  <span className="label-micro text-accent mb-4 block uppercase tracking-widest font-mono">// What We Do</span>
                  <h1 className="editorial-title text-5xl sm:text-6xl md:text-8xl text-white mb-6 leading-none">Capabilities.</h1>
                  <p className="max-w-xl text-white/50 text-lg leading-relaxed font-sans">
                    A meticulously curated suite of creative and technical specialties. Formed to give your brand an absolute strategic advantage.
                  </p>
                </div>
              </div>
              <Services />
              <Contact />
            </motion.div>
          )}

          {page === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-20"
            >
              {/* Work Intro */}
              <div className="py-24 md:pl-20 px-10 bg-bg border-b border-border">
                <div className="container mx-auto">
                  <span className="label-micro text-accent mb-4 block uppercase tracking-widest font-mono">// Selected Projects</span>
                  <h1 className="editorial-title text-5xl sm:text-6xl md:text-8xl text-white mb-6 leading-none">Case Studies.</h1>
                  <p className="max-w-xl text-white/50 text-lg leading-relaxed font-sans">
                    A high-contrast gallery featuring some of our experimental concepts, technical execution, and artistic direction.
                  </p>
                </div>
              </div>
              <WorkGrid />
              <Contact />
            </motion.div>
          )}

          {page === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-20"
            >
              {/* Process Intro */}
              <div className="py-24 md:pl-20 px-10 bg-bg border-b border-border">
                <div className="container mx-auto">
                  <span className="label-micro text-accent mb-4 block uppercase tracking-widest font-mono">// How We Build</span>
                  <h1 className="editorial-title text-5xl sm:text-6xl md:text-8xl text-white mb-6 leading-none">Our Pipeline.</h1>
                  <p className="max-w-xl text-white/50 text-lg leading-relaxed font-sans">
                    Every landmark digital solution is forged through four strict phases of architectural planning, rigorous execution, and custom design.
                  </p>
                </div>
              </div>
              <Process />
              <Contact />
            </motion.div>
          )}

          {(page === 'privacy' || page === 'terms' || page === 'cookie') && (
            <motion.div
              key="legal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LegalPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </NavigationProvider>
  );
}


