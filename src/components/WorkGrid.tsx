import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { ExternalLink } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(PROJECTS.map((p) => p.category))];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-24 md:py-40 md:pl-20 bg-bg border-t border-border">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#888] text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em]"
            >
              // DEMO & CONCEPT WORK
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="editorial-title text-5xl sm:text-6xl md:text-8xl leading-none"
            >
              WORK
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white/70 text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] uppercase mt-2"
            >
              DESIGN. BUILD. <span className="text-accent underline decoration-1 underline-offset-[6px]">IMPACT.</span>
            </motion.div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ 
                  y: -4,
                  scale: 1.08,
                  borderColor: "#10b981",
                  boxShadow: "0 10px 20px rgba(16, 185, 129, 0.15)"
                }}
                whileTap={{ scale: 0.92, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className={`px-4 py-2 sm:px-10 sm:py-4 rounded-full text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-black transition-all duration-300 cursor-pointer ${
                  filter === cat 
                  ? 'bg-accent text-bg shadow-[0_15px_30px_rgba(16,185,129,0.4)]' 
                  : 'bg-surface text-fg border border-border'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface active:scale-[0.98] transition-transform cursor-pointer"
              >
                <ProgressiveImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-bg/95 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] flex flex-col justify-between p-10 border border-accent/20 rounded-2xl backdrop-blur-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-accent text-[10px] font-mono uppercase tracking-[0.2em]">{project.category}</span>
                      <span className="text-white/40 text-[10px] font-mono">{project.year}</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="label-micro opacity-40 group-hover:opacity-100"
                    >
                      Project {project.id}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl sm:text-4xl font-black leading-tight uppercase italic">{project.title}</h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-[240px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {project.description}
                    </p>
                    
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="pt-4"
                    >
                      <motion.a
                        href={project.link}
                        whileHover={{ 
                          x: 15, 
                          y: -4,
                          scale: 1.05,
                          backgroundColor: "#10b981", 
                          color: "#fff",
                          boxShadow: "0 15px 30px rgba(16, 185, 129, 0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                        className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl"
                      >
                        View Details
                        <ExternalLink size={16} />
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
