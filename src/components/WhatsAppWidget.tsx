import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

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

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabel(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    'Logo Design',
    'Resume Design',
    'Website Design',
    'Posters & Banners',
    'Social Media Creatives',
    'Festival Banners',
    'Brand & Digital Ads',
    'Website Development',
    'Mobile App UI/UX',
    'Photo Retouching'
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = "918160888895";
    const greeting = userName ? `Hello ${userName},` : "Hello,";
    
    const message = `${greeting}

Thank you for contacting PixelCraft | Creative Studio.

We provide the following services:

*Our Services*
PixelCraft | Creative Studio
${services.map(s => `• ${s}`).join('\n')}

Please let us know which service you are interested in.

Regards,
PixelCraft | Creative Studio

Thanks for contacting us.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div id="whatsapp-widget-container" className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4 scale-90 md:scale-100 origin-bottom-right">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-surface border border-border p-6 rounded-3xl shadow-2xl w-[280px] sm:w-[320px] backdrop-blur-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black uppercase tracking-tighter text-lg leading-none">
                CHAT WITH <span className="text-accent underline">PIXELCRAFT</span>
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-fg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="text-muted text-xs mb-6 leading-relaxed uppercase tracking-widest font-bold">
              Enter your name to personalize your message.
            </p>

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Enter your name (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-bg border border-border px-5 py-4 rounded-full text-xs font-medium focus:border-accent focus:outline-none transition-all placeholder:text-muted/50"
                />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-accent/30 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left" />
              </div>

              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent text-bg font-black uppercase tracking-[0.2em] py-4 rounded-full text-[10px] flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] transition-all"
              >
                Start Chat
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showLabel && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ 
                opacity: 0, 
                x: 10, 
                scale: 0.9,
                transition: { duration: 0.8, ease: "easeIn" } 
              }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-surface border border-border px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest pointer-events-none shadow-lg z-[-1]"
            >
              Chat with us on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          animate={{ 
            y: [0, -4, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: isOpen ? 0 : 8
          }}
          whileTap={{ scale: 0.9 }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl cursor-pointer ${
            isOpen ? 'bg-surface border border-border text-fg' : 'bg-[#25D366] text-white'
          }`}
        >
          {isOpen ? <X size={28} /> : <WhatsAppIcon size={28} />}
          
          {!isOpen && (
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-[#25D366]/30 -z-10 cursor-pointer"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
