import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../constants';

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-40 md:pl-20 border-t border-border">
      <div className="container mx-auto px-10">
        <div className="mb-20">
          <h2 className="editorial-title text-5xl sm:text-6xl md:text-8xl italic">The Process<span className="text-accent">.</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                x: 10,
                scale: 1.02,
                borderColor: "#10b981",
              }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                opacity: { duration: 0.5, delay: idx * 0.1 },
                y: { duration: 0.5, delay: idx * 0.1 }
              }}
              className="flex flex-col gap-4 border-l border-border pl-6 transition-colors duration-500"
            >
              <div className="label-micro opacity-30">{step.title}</div>
              <div className={`text-xl font-medium italic ${idx === 2 ? 'text-accent' : 'text-white'}`}>
                {step.description.split('.')[0]}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-20 font-mono mt-auto pt-8">
                Stage {step.number}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

