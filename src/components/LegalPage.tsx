import React from 'react';
import { motion } from 'motion/react';
import { useNavigation } from './NavigationContext';
import { ArrowLeft, Shield, FileText, Cookie, Mail } from 'lucide-react';

interface PolicySection {
  heading: string;
  text: string;
  email?: string;
}

interface PolicyContent {
  tag: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  sections: PolicySection[];
}

export default function LegalPage() {
  const { page, setPage } = useNavigation();

  if (page === 'home') return null;

  const contentMap: Record<'privacy' | 'terms' | 'cookie', PolicyContent> = {
    privacy: {
      tag: '// legal compliance',
      title: 'Privacy\nPolicy.',
      desc: 'We respect your privacy and process personal information with absolute care, transparency, and integrity.',
      icon: Shield,
      sections: [
        {
          heading: '01. Information Collection',
          text: 'We respect your privacy. This website collects minimal user information such as name, email address, and usage analytics only to improve user experience and services.'
        },
        {
          heading: '02. Third-Party Sharing',
          text: 'We do not sell, rent, or share personal data with third parties except when required by law.'
        },
        {
          heading: '03. Cookies and Diagnostics',
          text: 'Cookies may be used to enhance functionality and analyze website traffic.'
        },
        {
          heading: '04. Data Concerns & Inquiries',
          text: 'Users can contact us anytime for data-related concerns or data removal/rectification requests at: ',
          email: 'teampixelcraft7@gmail.com'
        }
      ]
    },
    terms: {
      tag: '// platform usage terms',
      title: 'Terms of\nService.',
      desc: 'By accessing and utilizing our services, you agree to our platform guidelines, regulatory bounds, and legal code.',
      icon: FileText,
      sections: [
        {
          heading: '01. Lawful Utilization',
          text: 'By using this website, you agree to use it only for lawful purposes. Any misuse, unauthorized access, copying of content, or harmful activity is strictly prohibited.'
        },
        {
          heading: '02. Service Modifications',
          text: 'We reserve the right to update, modify, or discontinue any service without prior notice.'
        },
        {
          heading: '03. Liability & Disclaimers',
          text: 'We are not responsible for any direct or indirect damages caused by the use of this website.'
        },
        {
          heading: '04. Agreement to Terms',
          text: 'Continued use of the website means acceptance of these terms. If you do not agree to these terms, please discontinue your use of the site.'
        }
      ]
    },
    cookie: {
      tag: '// cookie governance',
      title: 'Cookie\nPolicy.',
      desc: 'Information regarding how our platform uses local tracking cookies to streamline and elevate your session experience.',
      icon: Cookie,
      sections: [
        {
          heading: '01. Usage and Purpose',
          text: 'This website uses cookies to improve user experience, remember preferences, and analyze website performance.'
        },
        {
          heading: '02. Behavioral Diagnostics',
          text: 'Cookies help us understand how visitors interact with the site, helping us identify structural bottlenecks and enhance aesthetic loading times.'
        },
        {
          heading: '03. Control & Browser Adjustments',
          text: 'You can disable cookies anytime through your browser settings. Note that disabling cookies may affect technical features of this site.'
        },
        {
          heading: '04. Active Agreement',
          text: 'By continuing to use this website, you agree to the use of cookies in accordance with this policy.'
        }
      ]
    }
  };

  const activeContent = contentMap[page as 'privacy' | 'terms' | 'cookie'] || contentMap.privacy;
  const HeadingIcon = activeContent.icon;


  return (
    <section className="py-24 md:py-40 md:pl-20 min-h-screen bg-bg">
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center mb-12 border-b border-border pb-8">
          <motion.button 
            onClick={() => setPage('home')}
            whileHover={{ x: -5, color: '#10b981' }}
            className="flex items-center gap-2 label-micro hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Go Back Home
          </motion.button>
          
          <div className="flex items-center gap-3 text-accent/60 text-xs font-mono uppercase tracking-widest">
            <HeadingIcon size={16} className="text-accent animate-pulse" />
            <span>Active Policy</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.35fr,1.65fr] gap-12 lg:gap-20">
          <div className="relative">
            <div className="sticky top-40">
              <span className="label-micro mb-6 block text-accent/80 font-mono tracking-widest uppercase">
                {activeContent.tag}
              </span>
              <h1 className="editorial-title text-5xl sm:text-6xl md:text-8xl mb-8 leading-[0.95] max-w-full break-normal text-white">
                {activeContent.title.split('\n').map((line, idx) => (
                  <span key={idx} className="block md:whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="max-w-md text-white/50 text-lg leading-relaxed mb-6 font-sans">
                {activeContent.desc}
              </p>
            </div>
          </div>
          
          <div className="space-y-12">
            {activeContent.sections.map((sec, idx) => (
              <motion.div
                key={sec.heading}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-8 md:p-10 border border-border bg-surface hover:border-accent/40 transition-all duration-500 rounded-lg relative overflow-hidden group"
              >
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white group-hover:text-accent transition-colors duration-300">
                  {sec.heading}
                </h3>
                <p className="text-white/60 text-base leading-relaxed font-sans max-w-2xl">
                  {sec.text}
                  {sec.email && (
                    <a 
                      href={`mailto:${sec.email}`} 
                      className="text-accent hover:underline font-mono ml-1 inline-flex items-center gap-1"
                    >
                      <Mail size={12} className="inline-block" />
                      {sec.email}
                    </a>
                  )}
                </p>
                
                {/* Visual Accent Glow on Hover */}
                <div className="absolute inset-0 bg-accent/2 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
