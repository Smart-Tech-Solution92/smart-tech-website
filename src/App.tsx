import { useEffect, useRef, useState } from 'react';
import {
  Brain,
  Globe,
  Cloud,
  Cog,
  Shield,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  Calendar,
  Users,
} from 'lucide-react';

// --- Custom Cursor ---
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = `${e.clientX}px`;
          trailRef.current.style.top = `${e.clientY}px`;
        }
      }, 80);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={trailRef} className="custom-cursor-trail" />
    </>
  );
}

// --- Animated Counter ---
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- Section Reveal Hook ---
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// --- Particles Background ---
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// --- Navbar ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'Services', 'About', 'Portfolio', 'Contact'];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 navbar-animate ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner flex items-center gap-8 px-6 py-3">
        <span className="font-orbitron text-cyan-400 font-bold text-lg tracking-widest mr-4 whitespace-nowrap">
          ST
        </span>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="nav-link font-rajdhani font-semibold text-sm tracking-widest uppercase text-slate-300 hover:text-cyan-400 transition-colors">
              {l}
            </button>
          ))}
        </div>
        <button
          className="md:hidden text-slate-300 hover:text-cyan-400 ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span /><span /><span />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="navbar-mobile md:hidden mt-2 rounded-xl overflow-hidden">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="w-full text-left px-6 py-3 font-rajdhani font-semibold text-sm tracking-widest uppercase text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// --- Hero ---
function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-hero">
      <ParticleCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a]" />

      <div
        className="relative z-10 text-center px-4"
        style={{ transform: `translateY(${offset * 0.4}px)`, opacity: 1 - offset / 500 }}
      >
        <div className="hero-badge font-rajdhani text-cyan-400 text-sm tracking-[0.3em] uppercase mb-6">
          Next-Gen Technology Company
        </div>
        <h1 className="hero-title font-orbitron font-black text-white mb-4 leading-none">
          Smart<span className="text-cyan-400">Tech</span>
        </h1>
        <p className="font-rajdhani font-light text-slate-300 text-xl md:text-2xl tracking-widest mb-10">
          Innovating Tomorrow, <span className="text-cyan-400">Today</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary font-rajdhani font-semibold tracking-widest uppercase"
          >
            Explore Services <ArrowRight size={16} className="inline ml-2" />
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline font-rajdhani font-semibold tracking-widest uppercase"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cyan-400 animate-bounce"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}

// --- Services ---
const services = [
  {
    icon: Globe,
    title: 'Web and Mobile App Development',
    desc: 'Leveraging cutting-edge technologies, agile development practices, and user-centered design that streamline operations, enhance customer engagement, and accelerate digital transformation.',
    tags: ['Web App', 'Web Sites', 'Web page'],
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    desc: 'Harness the power of machine learning and neural networks to automate decisions, predict outcomes, and unlock insights hidden in your data.',
    tags: ['Machine Learning', 'NLP', 'Computer Vision'],
  },
  {
    icon: Cog,
    title: 'Enterprise Solutions',
    desc: 'We develop intelligent enterprise solutions that streamline operations, automate workflows, and empower businesses with scalable, data-driven systems for sustainable growth.',
    tags: ['Machine Learning', 'NLP', 'Computer Vision'],
  },
 
];

function Services() {
  const { ref, visible } = useReveal();
  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className={`section-reveal py-28 px-4 ${visible ? 'revealed' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="section-title">Our <span className="text-cyan-400">Services</span></h2>
          <p className="section-sub">Cutting-edge solutions engineered for enterprises that demand the best.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, tags }) => (
            <div key={title} className="service-card group">
              <div className="service-icon-wrap">
                <Icon size={28} className="text-cyan-400" />
              </div>
              <h3 className="font-orbitron font-bold text-white text-lg mb-3 mt-4">{title}</h3>
              <p className="font-rajdhani text-slate-400 text-base leading-relaxed mb-5">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="tag font-rajdhani text-xs tracking-widest uppercase">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Stats ---
const stats = [
  { value: 10, suffix: '+', label: 'Clients Worldwide' },
  { value: 98, suffix: '%', label: 'Uptime Guaranteed' },
  { value: 2, suffix: '+', label: 'Years of Innovation' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
];

function Stats() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`section-reveal py-20 px-4 stats-bg ${visible ? 'revealed' : ''}`}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="stat-item">
            <div className="font-orbitron font-black text-4xl md:text-5xl text-cyan-400 mb-2">
              <Counter target={value} suffix={suffix} />
            </div>
            <div className="font-rajdhani text-slate-400 tracking-widest text-sm uppercase">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- About ---
function About() {
  const { ref, visible } = useReveal();
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className={`section-reveal py-28 px-4 ${visible ? 'revealed' : ''}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-eyebrow">Who We Are</p>
          <h2 className="section-title">Shaping the <span className="text-cyan-400">Future</span></h2>
          <div className="about-border-accent">
            <p className="font-rajdhani text-slate-300 text-lg leading-relaxed mb-5">
              SmartTech was founded on a simple belief: technology should empower, not complicate. Since 2024, we've partnered with forward-thinking organizations to build the intelligent systems that define tomorrow's competitive landscape.
            </p>
           
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {['AI-First', 'Cloud Native', 'Security Focused', 'Globally Trusted'].map((t) => (
              <span key={t} className="about-badge font-rajdhani font-semibold text-sm tracking-widest uppercase">{t}</span>
            ))}
          </div>
        </div>
        <div className="about-visual">
          <div className="about-grid-overlay" />
          <div className="about-center-orb" />
          <div className="about-ring about-ring-1" />
          <div className="about-ring about-ring-2" />
          <div className="about-ring about-ring-3" />
          <div className="about-floating-tag tag-1 font-rajdhani font-semibold text-xs tracking-widest">AI Engine</div>
          <div className="about-floating-tag tag-2 font-rajdhani font-semibold text-xs tracking-widest">Web and Mobile</div>
          <div className="about-floating-tag tag-3 font-rajdhani font-semibold text-xs tracking-widest">Cyber Shield</div>
        </div>
      </div>
    </section>
  );
}


// --- Portfolio ---
const projects = [
  {
    title: 'NeuralOps Platform',
    category: 'AI Solutions',
    desc: 'Real-time ML inference engine processing 2M+ predictions/day for a Fortune 500 retail chain.',
    metric: '2M+ daily predictions',
    bg: 'from-cyan-900/40 to-blue-900/40',
  },
  {
    title: 'CloudFortress',
    category: 'Cloud Infrastructure',
    desc: 'Multi-cloud orchestration platform with zero-downtime deployments across 14 global regions.',
    metric: '99.998% uptime achieved',
    bg: 'from-blue-900/40 to-slate-900/40',
  },
  {
    title: 'SentinelAI',
    category: 'Cybersecurity',
    desc: 'Autonomous threat detection system that blocked 40,000+ attacks in its first month of deployment.',
    metric: '40K+ threats neutralized',
    bg: 'from-slate-900/40 to-cyan-900/40',
  },
];

function Portfolio() {
  const { ref, visible } = useReveal();
  return (
    <section id="portfolio" ref={ref as React.RefObject<HTMLElement>} className={`section-reveal py-28 px-4 ${visible ? 'revealed' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-eyebrow">Case Studies</p>
          <h2 className="section-title">Our <span className="text-cyan-400">Portfolio</span></h2>
          <p className="section-sub">Real problems. Measurable impact. Proven results.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map(({ title, category, desc, metric, bg }) => (
            <div key={title} className="portfolio-card group">
              <div className={`portfolio-thumb bg-gradient-to-br ${bg}`}>
                <div className="portfolio-overlay">
                  <div className="portfolio-metric font-orbitron text-cyan-400 text-sm font-bold mb-2">{metric}</div>
                  <p className="font-rajdhani text-white text-sm leading-relaxed">{desc}</p>
                  <button className="mt-4 font-rajdhani text-xs tracking-widest uppercase text-cyan-400 flex items-center gap-1 hover:gap-2 transition-all">
                    View Case Study <ExternalLink size={12} />
                  </button>
                </div>
                <div className="portfolio-grid-pattern" />
              </div>
              <div className="p-5">
                <span className="tag font-rajdhani text-xs tracking-widest uppercase mb-3 inline-block">{category}</span>
                <h3 className="font-orbitron font-bold text-white text-base">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact ---
function Contact() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className={`section-reveal py-28 px-4 ${visible ? 'revealed' : ''}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">Let's <span className="text-cyan-400">Connect</span></h2>
          <p className="font-rajdhani text-slate-400 text-lg leading-relaxed mb-10">
            Ready to transform your business with cutting-edge technology? Our team is standing by.
          </p>
          <div className="space-y-5">
            {[
             
              { icon: Phone, label: '+251940131696' },
              { icon: MapPin, label: 'Addis Ababa , Ethiopia' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="contact-icon-wrap">
                  <Icon size={16} className="text-cyan-400" />
                </div>
                <span className="font-rajdhani text-slate-300 text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form space-y-5">
          <div>
            <label className="form-label font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input font-rajdhani"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="form-label font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input font-rajdhani"
              placeholder="john@company.com"
            />
          </div>
          <div>
            <label className="form-label font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">Message</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="form-input form-textarea font-rajdhani"
              placeholder="Tell us about your project..."
              rows={5}
            />
          </div>
          <button type="submit" className="btn-primary w-full font-rajdhani font-semibold tracking-widest uppercase">
            {sent ? 'Message Sent!' : 'Send Message'}
            {!sent && <ArrowRight size={16} className="inline ml-2" />}
          </button>
        </form>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  const links = ['Home', 'Services', 'About', 'Portfolio', 'Contact'];

  const scrollTo = (id: string) => {
    if (id === 'Home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-bg border-t border-white/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div>
            <div className="font-orbitron font-black text-2xl text-white mb-1">
              Smart<span className="text-cyan-400">Tech</span>
            </div>
            <p className="font-rajdhani text-slate-500 text-sm tracking-widest">Innovating Tomorrow, Today</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="font-rajdhani text-sm tracking-widest uppercase text-slate-400 hover:text-cyan-400 transition-colors">
                {l}
              </button>
            ))}
          </nav>
          <div className="flex gap-4">
            {[Linkedin].map((Icon, i) => (
              <a key={i} href="https://www.linkedin.com/company/smart-tech-solutions-ethio/" className="social-icon" aria-label="social">
                <Icon size={16} />
              </a>
            ))}
            {[Github].map((Icon, i) => (
              <a key={i} href="https://github.com/Smart-Tech-Solution92" className="social-icon" aria-label="social">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-rajdhani text-slate-600 text-sm">© 2026 SmartTech Inc. All rights reserved.</p>
          <p className="font-rajdhani text-slate-600 text-sm tracking-widest">Engineered for excellence.</p>
        </div>
      </div>
    </footer>
  );
}

// --- App ---
export default function App() {
  return (
    <div className="app-root">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
