import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Magnetic from './Magnetic';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const playSuccessSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const now = ctx.currentTime;
      
      // Warm, soft cinematic lowpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.connect(ctx.destination);
      
      // Beautiful layered chime frequency setup
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.quadraticRampToValueAtTime(659.25, now + 0.2);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.15, now + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc1.connect(gain1);
      gain1.connect(filter);
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.08);
      osc2.frequency.quadraticRampToValueAtTime(1046.50, now + 0.28);
      
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.setValueAtTime(0, now + 0.08);
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      
      osc2.connect(gain2);
      gain2.connect(filter);
      
      osc1.start(now);
      osc1.stop(now + 0.85);
      
      osc2.start(now);
      osc2.stop(now + 0.95);
    } catch (error) {
      console.warn("Audio Context init/playback blocked or not supported on this device:", error);
    }
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone: string) => {
    return phone.length === 0 || /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Please enter your name' : undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return undefined;
      case 'phone':
        if (value && !validatePhone(value)) return 'Please enter a valid phone number';
        return undefined;
      case 'message':
        return !value.trim() ? 'Tell us a bit about your project' : undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormState]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
    
    if (showErrorSummary) setShowErrorSummary(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions instantly
    setSubmitError(null);
    
    if (!validateForm()) {
      setShowErrorSummary(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setShowToast(true);
        playSuccessSound();
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
        setErrors({});
        setTimeout(() => setIsSubmitted(false), 8000);
        setTimeout(() => setShowToast(false), 5000); // Auto close toast after 5s
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Failed to connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 md:pl-20 border-t border-border">
      <div className="container mx-auto px-10">
        <div className="grid lg:grid-cols-[1fr,500px] gap-20">
          <div>
            <h2 className="editorial-title text-5xl sm:text-6xl md:text-8xl italic mb-12 flex items-center gap-4">
              LET'S <br />CONNECT<span className="text-accent">.</span>
            </h2>
            <p className="text-muted text-xl mb-12 max-w-md">Ready to start your next creative chapter? Drop us a message and let's build something extraordinary together.</p>
            
            <div className="space-y-8">
              <div>
                <span className="text-accent text-xs font-mono uppercase tracking-widest block mb-1">Email Us</span>
                <a href="mailto:teampixelcraft7@gmail.com" className="text-2xl font-bold hover:text-accent transition-colors">teampixelcraft7@gmail.com</a>
              </div>
              <div>
                <span className="text-accent text-xs font-mono uppercase tracking-widest block mb-1">Call Us</span>
                <a href="tel:8160888895" className="text-2xl font-bold hover:text-accent transition-colors">8160888895</a>
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 md:p-12 rounded-3xl border border-border relative overflow-hidden min-h-[600px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full py-10 flex flex-col items-center justify-center text-center gap-6"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 bg-accent text-bg rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] mb-4"
                  >
                    <CheckCircle2 size={56} strokeWidth={2.5} />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-2">Success!</h3>
                    <p className="text-muted text-lg max-w-[300px] mx-auto text-balance">
                      Your message has been sent successfully. We've also sent you a confirmation email.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4"
                  >
                    <p className="text-[10px] font-mono text-accent uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full">
                      Response expected within 24h
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5" 
                  noValidate
                >
                  {showErrorSummary && Object.keys(errors).length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-4"
                    >
                      <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[10px] mb-2">
                        <AlertCircle size={14} /> Please fix the following errors:
                      </div>
                      <ul className="list-disc list-inside text-xs text-red-400 space-y-1">
                        {Object.values(errors).filter(Boolean).map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-4 text-xs text-red-400">
                      {submitError}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted ml-2">Name</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className={`w-full bg-bg border ${errors.name ? 'border-red-500/50' : 'border-border'} p-4 rounded-xl focus:outline-none focus:border-accent transition-all duration-300 text-sm`}
                        placeholder="Your Name"
                      />
                      <div className="h-4">
                        <AnimatePresence>
                          {errors.name && (
                            <motion.span
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-[10px] text-red-500 font-medium tracking-wide flex items-center gap-1 ml-2"
                            >
                              {errors.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted ml-2">Email</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className={`w-full bg-bg border ${errors.email ? 'border-red-500/50' : 'border-border'} p-4 rounded-xl focus:outline-none focus:border-accent transition-all duration-300 text-sm`}
                        placeholder="your@email.com"
                      />
                      <div className="h-4">
                        <AnimatePresence>
                          {errors.email && (
                            <motion.span
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-[10px] text-red-500 font-medium tracking-wide flex items-center gap-1 ml-2"
                            >
                              {errors.email}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted ml-2">Phone</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        className={`w-full bg-bg border ${errors.phone ? 'border-red-500/50' : 'border-border'} p-4 rounded-xl focus:outline-none focus:border-accent transition-all duration-300 text-sm`}
                        placeholder="+1 234 567 890"
                      />
                      <div className="h-4">
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.span
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-[10px] text-red-500 font-medium tracking-wide flex items-center gap-1 ml-2"
                            >
                              {errors.phone}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted ml-2">Service</label>
                      <div className="relative">
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-bg border border-border p-4 rounded-xl focus:outline-none focus:border-accent transition-all duration-300 appearance-none cursor-pointer text-sm"
                        >
                          <option>General Inquiry</option>
                          <option>Logo Design</option>
                          <option>UI/UX Design</option>
                          <option>Web Development</option>
                          <option>Brand Identity</option>
                          <option>Mobile App</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted ml-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full bg-bg border ${errors.message ? 'border-red-500/50' : 'border-border'} p-4 rounded-xl focus:outline-none focus:border-accent transition-all duration-300 resize-none text-sm`}
                      placeholder="Tell us about your project..."
                    />
                    <div className="h-4">
                      <AnimatePresence>
                        {errors.message && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-[10px] text-red-500 font-medium tracking-wide flex items-center gap-1 ml-2"
                          >
                            {errors.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <Magnetic className="w-full">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { 
                        scale: 1.02, 
                        backgroundColor: "#10b981", 
                        color: "#070708",
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                      } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98, y: 0 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={`w-full group flex items-center justify-center gap-4 py-6 rounded-2xl font-black uppercase tracking-[0.3em] transition-all duration-300 text-xs shadow-2xl relative overflow-hidden ${
                        isSubmitting ? 'bg-muted text-bg opacity-70 cursor-not-allowed' : 'bg-fg text-bg'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-bg border-t-accent rounded-full"
                          />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                        </>
                      )}
                    </motion.button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[425px] bg-[#0c0c0d]/95 backdrop-blur-xl border border-accent/30 rounded-2xl p-4 shadow-[0_10px_50px_rgba(16,185,129,0.15)] z-[100] flex items-start gap-4 select-none pointer-events-auto"
          >
            <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CheckCircle2 size={20} strokeWidth={2.5} className="animate-pulse" />
            </div>
            <div className="flex-grow space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Message Sent</h4>
              <p className="text-xs text-muted leading-relaxed">
                Thank you! Your message has been sent successfully.
              </p>
            </div>
            <button 
              onClick={() => setShowToast(false)} 
              className="text-muted hover:text-white transition-colors p-1 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}