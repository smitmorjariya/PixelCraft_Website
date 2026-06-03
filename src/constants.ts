import { Project, Service, Step } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Nexus',
    category: 'Branding',
    image: 'https://picsum.photos/seed/neon/800/600',
    link: '#',
    description: 'Immersive cyberpunk identity system with dynamic color shifting.',
    year: '2024',
  },
  {
    id: '2',
    title: 'EcoSphere App',
    category: 'UI/UX',
    image: 'https://picsum.photos/seed/eco/800/600',
    link: '#',
    description: 'A sustainable lifestyle tracker with gamified ecological impact metrics.',
    year: '2024',
  },
  {
    id: '3',
    title: 'Modernist Portfolio',
    category: 'Web Design',
    image: 'https://picsum.photos/seed/folio/800/600',
    link: '#',
    description: 'Minimalist editorial-style portfolio for a leading architectural firm.',
    year: '2023',
  },
  {
    id: '4',
    title: 'Vanguard Visuals',
    category: 'Motion',
    image: 'https://picsum.photos/seed/vanguard/800/600',
    link: '#',
    description: 'Set of high-energy motion graphics for a global fintech launch.',
    year: '2023',
  },
  {
    id: '5',
    title: 'Cyber Circuit',
    category: 'Branding',
    image: 'https://picsum.photos/seed/cyber/800/600',
    link: '#',
    description: 'Technical brand architecture for a cutting-edge robotics laboratory.',
    year: '2022',
  },
  {
    id: '6',
    title: 'Aura Studio',
    category: 'UI/UX',
    image: 'https://picsum.photos/seed/aura/800/600',
    link: '#',
    description: 'Clean and ethereal user interface for a holistic wellness platform.',
    year: '2022',
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Logo Design',
    description: 'Crafting memorable visual anchors that define your brand identity.',
    icon: 'PenTool',
  },
  {
    id: 's2',
    title: 'Resume Design',
    description: 'Professional typography and layout to make your career stand out.',
    icon: 'FileText',
  },
  {
    id: 's3',
    title: 'Website Design',
    description: 'Bespoke digital interfaces focused on aesthetics and user experience.',
    icon: 'Layout',
  },
  {
    id: 's4',
    title: 'Posters & Banners',
    description: 'High-impact visual communication for physical and digital spaces.',
    icon: 'Image',
  },
  {
    id: 's5',
    title: 'Social Media Creatives',
    description: 'Engaging content tailored for every social platform and audience.',
    icon: 'Share2',
  },
  {
    id: 's6',
    title: 'Festival Banners',
    description: 'Vibrant and festive designs to celebrate special occasions.',
    icon: 'Sparkles',
  },
  {
    id: 's7',
    title: 'Brand & Digital Ads',
    description: 'Conversion-focused creative strategies for your digital campaigns.',
    icon: 'Megaphone',
  },
  {
    id: 's8',
    title: 'Website Development',
    description: 'Robust, fast, and scalable web systems built with modern tech.',
    icon: 'Code2',
  },
  {
    id: 's9',
    title: 'Mobile App UI/UX',
    description: 'Intuitive mobile experiences designed for modern touch devices.',
    icon: 'Smartphone',
  },
  {
    id: 's10',
    title: 'Photo Retouching',
    description: 'Expert-level image editing to achieve visual perfection.',
    icon: 'Aperture',
  },
];

export const PROCESS_STEPS: Step[] = [
  {
    id: 'p1',
    number: '01',
    title: 'Discovery',
    description: 'Deep diving into your brand, goals, and target audience to define the project compass.',
  },
  {
    id: 'p2',
    number: '02',
    title: 'Strategy',
    description: 'Developing a roadmap and creative concept that aligns with your business objectives.',
  },
  {
    id: 'p3',
    number: '03',
    title: 'System Design',
    description: 'Building a consistent and scalable visual language tailored to your brand.',
  },
  {
    id: 'p4',
    number: '04',
    title: 'Execution',
    description: 'Bringing the vision to life with meticulous attention to detail and craftsmanship.',
  },
];
