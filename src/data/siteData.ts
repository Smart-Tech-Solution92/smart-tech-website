import { Brain, Cog, Globe } from 'lucide-react';
import mobileImage from '../assets/images/mobile.png';
import aiImage from '../assets/images/ai.webp';
import enterpriseImage from '../assets/images/enterprise.jpg';
import gymtrackImage from '../assets/images/gymtrack.png';

export const services = [
  {
    icon: Globe,
    title: 'Web and Mobile App Development',
    desc: 'Leveraging cutting-edge technologies, agile development practices, and user-centered design that streamline operations, enhance customer engagement, and accelerate digital transformation.',
    tags: ['Web App', 'Web Sites', 'Web page'],
    image: mobileImage,
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    desc: 'Harness the power of machine learning and neural networks to automate decisions, predict outcomes, and unlock insights hidden in your data.',
    tags: ['Machine Learning', 'NLP', 'Computer Vision'],
    image: aiImage,
  },
  {
    icon: Cog,
    title: 'Enterprise Solutions',
    desc: 'We develop intelligent enterprise solutions that streamline operations, automate workflows, and empower businesses with scalable, data-driven systems for sustainable growth.',
    tags: ['Automation', 'Workflows', 'Scalability'],
    image: enterpriseImage,
  },
] as const;

export const stats = [
  { value: 10, suffix: '+', label: 'Clients Worldwide' },
  { value: 98, suffix: '%', label: 'Uptime Guaranteed' },
  { value: 2, suffix: '+', label: 'Years of Innovation' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
] as const;

export const storyCards = [
  {
    title: 'Born from a bold question',
    subtitle: 'Who We Are',
    description:
      ' one conviction. SmartTech was founded in Addis Ababa in 2022 to close the gap between global innovation and local impact — building technology that actually fits the businesses using it.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600',
    cta: 'Our Story',
    badge: 'Est. 2022 · Addis Ababa',
  },
  {
    title: 'Three disciplines. One focused team.',
    subtitle: 'What We Build',
    description:
      'We go deep on AI solutions, web & mobile products, enterprise systems, and cyber security — not a wide agency, a precise one. Every service line feeds the others.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600',
    cta: 'See Our Services',
  },
  {
    title: 'Small team. Real-world impact.',
    subtitle: 'So Far',
    description:
      "In two years we've shipped AI-driven platforms, secured enterprise networks, and delivered digital products used across Ethiopia and beyond. Every project is a proof point — not a portfolio piece.",
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600',
    cta: 'View Our Work',
    badge: '10+ projects delivered',
  },
  {
    title: 'Innovating Tomorrow, Today.',
    subtitle: 'SmartTech',
    description:
      "We don't wait for the future to arrive. We build it — with precision, purpose, and the people who depend on it most.",
    image: '',
    cta: 'Get In Touch',
    isBrandCard: true,
  },
] as const;

export const projects = [
  {
    title: 'GymTrack',
    category: 'Web & Mobile App',
    desc: 'Full-featured gym management platform for memberships, scheduling, and admin operations — built for fitness businesses to run smarter.',
    metric: 'All-in-one',
    metricLabel: 'gym operations',
    image: gymtrackImage,
    gradient: 'from-orange-500/30 via-pink-600/20 to-transparent',
    accent: 'text-orange-400',
    ring: 'border-orange-400/30',
  },
] as const;

export const milestones = [
  { year: '2022', title: 'Founded in Addis Ababa', detail: 'Engineers set out to build technology that fits local businesses.' },
  { year: '2023', title: 'First enterprise deployments', detail: 'AI and security solutions shipped for real-world operations.' },
  { year: '2024', title: 'Cross-border delivery', detail: 'Products adopted across Ethiopia and international markets.' },
  { year: '2026', title: 'Scaling with precision', detail: 'Focused team, deeper expertise, measurable client impact.' },
] as const;

export const values = [
  { title: 'Precision', desc: 'We go deep — not wide. Every line of code serves a purpose.' },
  { title: 'Partnership', desc: 'We build with clients, not for them. Your goals shape our craft.' },
  { title: 'Impact', desc: 'Technology should empower real people and real businesses.' },
] as const;

export type ServiceItem = (typeof services)[number];
export type StoryCard = (typeof storyCards)[number];
export type ProjectItem = (typeof projects)[number];
