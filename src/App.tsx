import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Brain,
  Globe,
  Cog,
  Github,
  Linkedin,
  Phone,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Float, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = 'home' | 'services' | 'about' | 'works' | 'contact';

// ─── Router context (lightweight) ─────────────────────────────────────────────
import { createContext, useContext } from 'react';

const RouterContext = createContext<{
  page: Page;
  navigate: (p: Page) => void;
}>({ page: 'home', navigate: () => {} });

function useRouter() {
  return useContext(RouterContext);
}

// ─── Custom Cursor ─────────────────────────────────────────────────────────────
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

// ─── Animated Counter ──────────────────────────────────────────────────────────
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

// ─── Section Reveal Hook ───────────────────────────────────────────────────────
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

// ─── Particles Background ──────────────────────────────────────────────────────
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
    const count = 70;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
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
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - dist / 120)})`;
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

// ─── 3D Tech Cube ──────────────────────────────────────────────────────────────
function TechCube() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += 0.003;
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  const radius = 2.2;
  const nodes = [
    [radius, 0, 0],
    [-radius, 0, 0],
    [0, radius, 0],
    [0, -radius, 0],
  ];

  return (
    <Float speed={2} rotationIntensity={0.2}>
      <group ref={group}>
        <Sphere args={[0.45, 64, 64]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={4} />
        </Sphere>
        {nodes.map((position, i) => (
          <group key={i}>
            <Sphere position={position as [number, number, number]} args={[0.18, 32, 32]}>
              <meshStandardMaterial color="#ffffff" emissive="#60a5fa" emissiveIntensity={2} />
            </Sphere>
            <Line points={[[0, 0, 0], position as [number, number, number]]} color="#3b82f6" lineWidth={1} />
          </group>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.02, 32, 100]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.8, 0.02, 32, 100]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
      </group>
    </Float>
  );
}

// ─── 3D Scene ──────────────────────────────────────────────────────────────────
function Scene3D() {
  return (
    <Canvas camera={{ position: [4, 3, 5], fov: 40 }} gl={{ antialias: true }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={15} color="#60a5fa" />
      <TechCube />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
}

// ─── Page Transition Wrapper ───────────────────────────────────────────────────
function PageWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Trigger fade-in on mount
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const { page, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Works', page: 'works' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNav = (p: Page) => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(p);
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 navbar-animate ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner flex items-center gap-8 px-6 py-3">
        <button
          onClick={() => handleNav('home')}
          className="font-orbitron text-blue-600 font-bold text-lg tracking-widest mr-4 whitespace-nowrap"
        >
          ST
        </button>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => handleNav(l.page)}
              className={`nav-link font-rajdhani font-semibold text-sm tracking-widest uppercase transition-colors ${
                page === l.page ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          className="md:hidden text-slate-600 hover:text-blue-600 ml-2"
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
            <button
              key={l.page}
              onClick={() => handleNav(l.page)}
              className={`w-full text-left px-6 py-3 font-rajdhani font-semibold text-sm tracking-widest uppercase hover:text-blue-600 hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-0 ${
                page === l.page ? 'text-blue-600 bg-blue-50' : 'text-slate-700'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero Page ─────────────────────────────────────────────────────────────────
function HeroPage() {
  const { navigate } = useRouter();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <PageWrapper>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-hero">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />

        <div
          className="relative z-10 text-center px-4"
          style={{ transform: `translateY(${offset * 0.4}px)`, opacity: 1 - offset / 500 }}
        >
          <div className="hero-badge font-rajdhani text-blue-600 text-sm tracking-[0.3em] uppercase mb-6">
            Next-Gen Technology Company
          </div>
          <h1 className="hero-title font-orbitron font-black text-slate-900 mb-4 leading-none">
            Smart<span className="text-blue-600">Tech</span>
          </h1>
          <p className="font-rajdhani font-light text-slate-600 text-xl md:text-2xl tracking-widest mb-10">
            Innovating Tomorrow, <span className="text-blue-600">Today</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { window.scrollTo({ top: 0 }); navigate('services'); }}
              className="btn-primary font-rajdhani font-semibold tracking-widest uppercase"
            >
              Explore Services <ArrowRight size={16} className="inline ml-2" />
            </button>
            <button
              onClick={() => { window.scrollTo({ top: 0 }); navigate('contact'); }}
              className="btn-outline font-rajdhani font-semibold tracking-widest uppercase"
            >
              Get In Touch
            </button>
          </div>
        </div>

   
      </section>
    </PageWrapper>
  );
}

// ─── Services Page ─────────────────────────────────────────────────────────────
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
    tags: ['Automation', 'Workflows', 'Scalability'],
  },
];

const stats = [
  { value: 10, suffix: '+', label: 'Clients Worldwide' },
  { value: 98, suffix: '%', label: 'Uptime Guaranteed' },
  { value: 2, suffix: '+', label: 'Years of Innovation' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
];

function ServicesPage() {
  const { ref, visible } = useReveal();
  return (
    <PageWrapper>
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`section-3d py-28 px-4 bg-white min-h-screen ${visible ? 'revealed' : ''}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-eyebrow">What We Do</p>
            <h2 className="section-title">Our <span className="text-blue-600">Services</span></h2>
            <p className="section-sub">Cutting-edge solutions engineered for enterprises that demand the best.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, tags }) => (
              <div key={title} className="service-card group">
                <div className="service-icon-wrap">
                  <Icon size={28} className="text-blue-600" />
                </div>
                <h3 className="font-orbitron font-bold text-slate-800 text-lg mb-3 mt-4">{title}</h3>
                <p className="font-rajdhani text-slate-500 text-xl leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="tag font-rajdhani text-xs tracking-widest uppercase">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats inline on services page */}
          <div className="mt-20 py-16 px-4 stats-bg rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="stat-item">
                  <div className="font-orbitron font-black text-4xl md:text-5xl text-blue-600 mb-2">
                    <Counter target={value} suffix={suffix} />
                  </div>
                  <div className="font-rajdhani text-slate-500 tracking-widest text-sm uppercase">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── About Page ────────────────────────────────────────────────────────────────
function AboutPage() {
  const { ref, visible } = useReveal();
  return (
    <PageWrapper>
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`section-3d py-28 px-4 bg-white min-h-screen ${visible ? 'revealed' : ''}`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title">Shaping the <span className="text-blue-600">Future</span></h2>
            <div className="about-border-accent">
              <p className="font-rajdhani text-slate-600 text-lg leading-relaxed mb-5">
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
            <Scene3D />
            <div className="about-floating-tag tag-1 font-rajdhani font-semibold text-xs tracking-widest">AI Engine</div>
            <div className="about-floating-tag tag-2 font-rajdhani font-semibold text-xs tracking-widest">Web and Mobile</div>
            <div className="about-floating-tag tag-3 font-rajdhani font-semibold text-xs tracking-widest">Cyber Shield</div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── Works (Portfolio) Page ────────────────────────────────────────────────────
const projects = [
  {
    title: 'NeuralOps Platform',
    category: 'AI Solutions',
    desc: 'Real-time ML inference engine processing 2M+ predictions/day for a Fortune 500 retail chain.',
    metric: '2M+ daily predictions',
    bg: 'from-blue-100 to-indigo-100',
    accent: 'text-blue-600',
  },
  {
    title: 'CloudFortress',
    category: 'Cloud Infrastructure',
    desc: 'Multi-cloud orchestration platform with zero-downtime deployments across 14 global regions.',
    metric: '99.998% uptime achieved',
    bg: 'from-sky-100 to-blue-100',
    accent: 'text-sky-600',
  },
  {
    title: 'SentinelAI',
    category: 'Cybersecurity',
    desc: 'Autonomous threat detection system that blocked 40,000+ attacks in its first month of deployment.',
    metric: '40K+ threats neutralized',
    bg: 'from-indigo-100 to-violet-100',
    accent: 'text-indigo-600',
  },
];

function WorksPage() {
  const { ref, visible } = useReveal();
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (dir: 'left' | 'right') => {
      if (isAnimating) return;
      setAnimDir(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) =>
          dir === 'right'
            ? (prev + 1) % projects.length
            : (prev - 1 + projects.length) % projects.length
        );
        setAnimDir(null);
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating]
  );

  useEffect(() => {
    if (!visible) return;
    autoRef.current = setInterval(() => goTo('right'), 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [visible, goTo]);

  const proj = projects[current];

  return (
    <PageWrapper>
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`section-3d py-28 px-4 bg-slate-50 min-h-screen ${visible ? 'revealed' : ''}`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-eyebrow">Case Studies</p>
            <h2 className="section-title">Our <span className="text-blue-600">Portfolio</span></h2>
            <p className="section-sub">Real problems. Measurable impact. Proven results.</p>
          </div>

          <div className="portfolio-slideshow">
            <div className={`portfolio-slide ${animDir === 'right' ? 'slide-exit-left' : animDir === 'left' ? 'slide-exit-right' : 'slide-enter'}`}>
              <div className={`portfolio-slide-thumb bg-gradient-to-br ${proj.bg}`}>
                <div className="portfolio-grid-pattern" />
                <div className="portfolio-slide-content z-10 relative">
                  <div className={`font-orbitron font-bold text-lg mb-3 ${proj.accent}`}>{proj.metric}</div>
                  <p className="font-rajdhani text-slate-700 text-base leading-relaxed mb-5">{proj.desc}</p>
                  <button className={`font-rajdhani text-sm tracking-widest uppercase ${proj.accent} flex items-center gap-1 hover:gap-2 transition-all`}>
                    View Case Study <ExternalLink size={13} />
                  </button>
                </div>
              </div>
              <div className="portfolio-slide-meta">
                <span className="tag font-rajdhani text-xs tracking-widest uppercase mb-3 inline-block">{proj.category}</span>
                <h3 className="font-orbitron font-bold text-slate-800 text-xl">{proj.title}</h3>
              </div>
            </div>

            <div className="portfolio-controls">
              <button onClick={() => goTo('left')} className="slide-btn" aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <div className="slide-dots">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const dir = i > current ? 'right' : 'left';
                      if (!isAnimating && i !== current) {
                        setAnimDir(dir);
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrent(i);
                          setAnimDir(null);
                          setIsAnimating(false);
                        }, 400);
                      }
                    }}
                    className={`slide-dot ${i === current ? 'active' : ''}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={() => goTo('right')} className="slide-btn" aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="slide-progress-track">
              <div key={current} className="slide-progress-bar" style={{ animationDuration: '4s' }} />
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── Contact Page ──────────────────────────────────────────────────────────────
function ContactPage() {
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
    <PageWrapper>
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`section-3d py-28 px-4 bg-white min-h-screen ${visible ? 'revealed' : ''}`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-eyebrow">Get In Touch</p>
            <h2 className="section-title">Let's <span className="text-blue-600">Connect</span></h2>
            <p className="font-rajdhani text-slate-500 text-lg leading-relaxed mb-10">
              Ready to transform your business with cutting-edge technology? Our team is standing by.
            </p>
            <div className="space-y-5">
              {[
                { icon: Phone, label: '+251940131696' },
                { icon: MapPin, label: 'Addis Ababa, Ethiopia' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="contact-icon-wrap">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <span className="font-rajdhani text-slate-600 text-base">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form space-y-5">
            <div>
              <label className="font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">Full Name</label>
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
              <label className="font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">Email Address</label>
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
              <label className="font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">Message</label>
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
    </PageWrapper>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const { navigate } = useRouter();

  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Portfolio', page: 'works' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <footer className="footer-bg border-t border-slate-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div>
            <div className="font-orbitron font-black text-2xl text-slate-800 mb-1">
              Smart<span className="text-blue-600">Tech</span>
            </div>
            <p className="font-rajdhani text-slate-400 text-sm tracking-widest">Innovating Tomorrow, Today</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((l) => (
              <button
                key={l.page}
                onClick={() => { window.scrollTo({ top: 0 }); navigate(l.page); }}
                className="font-rajdhani text-sm tracking-widest uppercase text-slate-500 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/smart-tech-solutions-ethio/" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://github.com/Smart-Tech-Solution92" className="social-icon" aria-label="GitHub">
              <Github size={16} />
            </a>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-rajdhani text-slate-400 text-sm">© 2026 SmartTech Inc. All rights reserved.</p>
          <p className="font-rajdhani text-slate-400 text-sm tracking-widest">Engineered for excellence.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: Page) => setPage(p);

  const renderPage = () => {
    switch (page) {
      case 'home':     return <HeroPage />;
      case 'services': return <ServicesPage />;
      case 'about':    return <AboutPage />;
      case 'works':    return <WorksPage />;
      case 'contact':  return <ContactPage />;
    }
  };

  return (
    <RouterContext.Provider value={{ page, navigate }}>
      <div className="app-root">
        <CustomCursor />
        <Navbar />
        <main key={page}>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </RouterContext.Provider>
  );
}