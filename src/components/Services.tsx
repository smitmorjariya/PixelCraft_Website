import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { 
  PenTool, 
  FileText, 
  Layout, 
  Image, 
  Share2, 
  Sparkles, 
  Megaphone, 
  Code2, 
  Smartphone, 
  Aperture,
  Globe,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';

const icons = {
  PenTool,
  FileText,
  Layout,
  Image,
  Share2,
  Sparkles,
  Megaphone,
  Code2,
  Smartphone,
  Aperture,
  Globe
};

export default function Services() {
  const openWhatsApp = (serviceName: string) => {
    const phoneNumber = "918160888895";
    const message = `Hello PixelCraft Team,\n\nI’m interested in your *${serviceName}* service.\n\nCould you please share more details regarding:\n• Requirements\n• Pricing\n• Timeline\n• Process\n\nLooking forward to your response.\n\nRegards,\n[User Name]`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="services" className="py-24 md:py-40 md:pl-20">
      <div className="container mx-auto px-10">
        <div className="grid lg:grid-cols-[400px,1fr] gap-20 border-t border-border pt-20">
          <div className="relative">
            <div className="sticky top-40">
              <h2 className="editorial-title text-5xl sm:text-6xl md:text-8xl mb-12">Core<br />Capabilities<span className="text-accent">.</span></h2>
              <p className="max-w-xs text-white/60 text-lg leading-relaxed">We push the boundaries of digital expression through a calculated blend of artistic vision and technical mastery. Our services are tailored for those who demand excellence.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {SERVICES.map((service, idx) => {
              const Icon = icons[service.icon as keyof typeof icons] || Globe;
              return (
                <motion.div
                  key={service.id}
                  initial="initial"
                  whileHover="hover"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  onClick={() => openWhatsApp(service.title)}
                  className="group cursor-pointer border-l border-white/5 pl-8 py-4 hover:border-accent transition-all duration-500 relative"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <motion.div
                      variants={{
                        initial: { scale: 1, rotate: 0, x: 0 },
                        hover: { scale: 1.15, rotate: -8, x: 2 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg text-white/40 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300 flex-shrink-0"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-accent/40 mb-1">0{idx + 1}</span>
                      <motion.h4 
                        variants={{
                          initial: { x: 0, color: "rgba(255, 255, 255, 0.9)" },
                          hover: { x: 5, color: "#10b981" }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-xl font-black uppercase tracking-tight leading-tight"
                      >
                        {service.title}
                      </motion.h4>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/70 transition-colors max-w-sm mb-6">{service.description}</p>
                  
                  <motion.div
                    variants={{
                      initial: { opacity: 0, x: -10 },
                      hover: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent"
                  >
                    <MessageSquare size={14} />
                    <span>Inquire via WhatsApp</span>
                    <ArrowUpRight size={14} />
                  </motion.div>

                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity pointer-events-none -z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


