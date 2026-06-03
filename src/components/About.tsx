import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 md:pl-20 bg-surface border-t border-border">
      <div className="container mx-auto px-10">
        <div>
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="label-micro mb-6 block"
            >
              // Establishing Digital Landmarks
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="editorial-title text-2xl md:text-4xl lg:text-5xl mb-8 !normal-case"
            >
              We are a boutique collective crafting <span className="text-accent underline decoration-accent/20 underline-offset-8">masterful digital platforms</span> and precision beauty.
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
}
