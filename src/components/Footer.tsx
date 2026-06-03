import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, ArrowUp, Mail } from 'lucide-react';
import { useNavigation } from './NavigationContext';

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function Footer() {
  const { setPage } = useNavigation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 md:pl-20 border-t border-border bg-bg">
      <div className="container mx-auto px-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <motion.button
              onClick={() => setPage('home')}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-black tracking-tighter flex items-center gap-2 mb-8 uppercase italic text-3xl inline-flex cursor-pointer text-white"
            >
              PIXELCRAFT<span className="text-accent">.</span>
            </motion.button>
            <p className="text-muted max-w-sm text-lg leading-relaxed font-sans">Leading the next generation of digital design and innovation. Proudly remote, globally connected.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Social</h4>
            <div className="space-y-4">
              <motion.a 
                href="https://www.instagram.com/pixel_craft.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ x: 5, scale: 1.05, color: "#10b981" }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-2 text-muted transition-colors cursor-pointer"
              >
                <Instagram size={18} /> Instagram
              </motion.a>
              <motion.a 
                href="mailto:teampixelcraft7@gmail.com" 
                whileHover={{ x: 5, scale: 1.05, color: "#10b981" }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-2 text-muted transition-colors cursor-pointer"
              >
                <Mail size={18} /> Email
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/smitmorjariya/" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ x: 5, scale: 1.05, color: "#10b981" }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-2 text-muted transition-colors cursor-pointer"
              >
                <Linkedin size={18} /> LinkedIn
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <div className="space-y-4">
              <motion.button 
                onClick={() => setPage('privacy')} 
                whileHover={{ x: 5, color: "#10b981" }} 
                className="block text-muted transition-colors text-left cursor-pointer w-full font-sans"
              >
                Privacy Policy
              </motion.button>
              <motion.button 
                onClick={() => setPage('terms')} 
                whileHover={{ x: 5, color: "#10b981" }} 
                className="block text-muted transition-colors text-left cursor-pointer w-full font-sans"
              >
                Terms of Service
              </motion.button>
              <motion.button 
                onClick={() => setPage('cookie')} 
                whileHover={{ x: 5, color: "#10b981" }} 
                className="block text-muted transition-colors text-left cursor-pointer w-full font-sans"
              >
                Cookie Policy
              </motion.button>
            </div>
          </div>
        </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-border">
          <p className="label-micro italic">© 2026 PixelCraft Studio. All rights reserved.</p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ 
              y: -8, 
              color: "#10b981", 
              scale: 1.1 
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-2 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
