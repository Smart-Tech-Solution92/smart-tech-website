import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { storyCards, milestones, values } from '../data/siteData';
import { type AppRoute, useAppRouter } from '../router';

const CARD_COUNT = storyCards.length;
const STEP = 1 / (CARD_COUNT - 1);
const DROP_FRAC = 0.55;

const ctaRoutes: Record<string, AppRoute | undefined> = {
  'Our Story': undefined,
  'See Our Services': '/services',
  'View Our Work': '/works',
  'Get In Touch': '/contact',
};

function StoryCard({
  card,
  rawProgress,
  index,
  onNavigate,
}: {
  card: (typeof storyCards)[number];
  rawProgress: number;
  index: number;
  onNavigate: (path: AppRoute) => void;
}) {
  const isFirst = index === 0;
  const isLast = index === CARD_COUNT - 1;

  const dropStart = index === 0 ? 0 : (index - 1) * STEP + STEP * (1 - DROP_FRAC);
  const dropEnd = index === 0 ? 0 : (index - 1) * STEP + STEP;
  const zoomStart = index * STEP;
  const zoomEnd = zoomStart + STEP * DROP_FRAC;

  const p = rawProgress;

  let scale = 1;
  if (!isLast) {
    if (p <= zoomStart) scale = 1;
    else if (p >= zoomEnd) scale = 0.84;
    else {
      const t = (p - zoomStart) / (zoomEnd - zoomStart);
      const e = t * t * (3 - 2 * t);
      scale = 1 - e * 0.16;
    }
  }

  let y = 0;
  if (!isFirst) {
    if (p < dropStart) y = -560;
    else if (p >= dropEnd) y = 0;
    else {
      const t = (p - dropStart) / (dropEnd - dropStart);
      const eased = 1 - Math.pow(1 - t, 3);
      y = -560 + eased * 580;
    }
  }

  let rotateX = 0;
  if (!isFirst) {
    if (p < dropStart) rotateX = 20;
    else if (p >= dropEnd) rotateX = 0;
    else {
      const t = (p - dropStart) / (dropEnd - dropStart);
      if (t < 0.65) rotateX = 20 - (t / 0.65) * 23;
      else rotateX = -3 + ((t - 0.65) / 0.35) * 3;
    }
  }

  let opacity = 1;
  if (!isFirst) {
    if (p < dropStart) opacity = 0;
    else if (p >= dropStart + (dropEnd - dropStart) * 0.3) opacity = 1;
    else {
      const t = (p - dropStart) / ((dropEnd - dropStart) * 0.3);
      opacity = t;
    }
  }

  let blurVal = 0;
  if (!isFirst) {
    if (p < dropStart) blurVal = 18;
    else if (p >= dropStart + (dropEnd - dropStart) * 0.25) blurVal = 0;
    else {
      const t = (p - dropStart) / ((dropEnd - dropStart) * 0.25);
      blurVal = 18 * (1 - t);
    }
  }

  let imgScale = 1;
  if (!isFirst) {
    if (p < dropStart) imgScale = 1.14;
    else if (p >= dropEnd) imgScale = 1;
    else {
      const t = (p - dropStart) / (dropEnd - dropStart);
      imgScale = 1.14 - t * 0.14;
    }
  }

  const handleCta = () => {
    const route = ctaRoutes[card.cta];
    if (route) onNavigate(route);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        zIndex: 10 + index,
        transform: `perspective(2200px) translateY(${y}px) rotateX(${rotateX}deg) scale(${scale})`,
        opacity,
        filter: `blur(${blurVal}px)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity, filter',
        transition: 'none',
      }}
    >
      <div
        className="relative w-full max-w-[72rem] min-h-[clamp(420px,68vh,600px)] overflow-hidden rounded-[40px] shadow-[0_50px_120px_rgba(0,0,0,0.18)] border border-white/30"
        style={{
          background: 'isBrandCard' in card && card.isBrandCard
            ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 48%, #0c4a6e 100%)'
            : '#0b1220',
        }}
      >
        {'isBrandCard' in card && card.isBrandCard ? (
          <>
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-blue-500/25 blur-3xl" />

            <div className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-center px-8 py-14 text-center">
              <p className="font-rajdhani mb-4 text-xs uppercase tracking-[0.45em] text-cyan-200/90">{card.subtitle}</p>
              <h2 className="font-orbitron mb-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] text-white">
                {card.title}
              </h2>
              <p className="font-rajdhani mb-10 max-w-2xl text-lg leading-relaxed text-blue-100/85">{card.description}</p>
              <button
                onClick={handleCta}
                className="font-rajdhani group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all hover:border-cyan-300/50 hover:bg-white/15"
              >
                {card.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </>
        ) : (
          <>
            <span
              className="font-orbitron pointer-events-none absolute -top-4 z-0 select-none font-black leading-none text-white/[0.05]"
              style={{
                fontSize: 'clamp(7rem, 18vw, 14rem)',
                [index % 2 === 0 ? 'right' : 'left']: 'clamp(0.5rem, 3vw, 2rem)',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div
              className="absolute inset-0 lg:inset-y-0 lg:w-[62%]"
              style={{
                [index % 2 === 0 ? 'right' : 'left']: 0,
                clipPath:
                  index % 2 === 0
                    ? 'polygon(14% 0, 100% 0, 100% 100%, 0 100%)'
                    : 'polygon(0 0, 86% 0, 100% 100%, 0 100%)',
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover"
                style={{ transform: `scale(${imgScale})`, transition: 'none' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    index % 2 === 0
                      ? 'linear-gradient(100deg, rgba(11,18,32,0.92) 0%, rgba(11,18,32,0.35) 42%, transparent 72%)'
                      : 'linear-gradient(260deg, rgba(11,18,32,0.92) 0%, rgba(11,18,32,0.35) 42%, transparent 72%)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/80 via-transparent to-transparent" />
            </div>

            <div
              className="absolute z-20 w-[min(92%,34rem)] rounded-[28px] border border-white/15 bg-white/10 p-[clamp(1.25rem,3vw,2.25rem)] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              style={{
                bottom: 'clamp(1.25rem, 4vw, 2.5rem)',
                [index % 2 === 0 ? 'left' : 'right']: 'clamp(1rem, 4vw, 2.5rem)',
              }}
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-gradient-to-b from-cyan-300 to-blue-600" />
                <p className="font-rajdhani text-xs uppercase tracking-[0.4em] text-cyan-200">{card.subtitle}</p>
                {'badge' in card && card.badge && (
                  <span className="font-rajdhani rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-blue-100">
                    {card.badge}
                  </span>
                )}
              </div>
              <h2 className="font-orbitron mb-4 text-[clamp(1.6rem,3.2vw,2.8rem)] font-bold leading-[1.08] text-white">
                {card.title}
              </h2>
              <p className="font-rajdhani mb-7 text-[clamp(0.95rem,1.5vw,1.125rem)] leading-relaxed text-slate-200/90">
                {card.description}
              </p>
              <button
                onClick={handleCta}
                className="font-rajdhani group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)] transition-transform hover:scale-[1.02]"
              >
                {card.cta}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StoryExperience({ onNavigate }: { onNavigate: (path: AppRoute) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const isActiveRef = useRef(false);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      const target = targetProgressRef.current;
      const current = progressRef.current;
      const diff = target - current;
      if (Math.abs(diff) < 0.0004) {
        if (current !== target) {
          progressRef.current = target;
          setProgress(target);
        }
      } else {
        const next = current + diff * 0.1;
        progressRef.current = next;
        setProgress(next);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const rect = section.getBoundingClientRect();
          const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
          if (Math.abs(centerOffset) > 2) {
            window.scrollBy({ top: centerOffset, behavior: 'auto' });
          }
          setIsActive(true);
          isActiveRef.current = true;
          document.body.style.overflow = 'hidden';
        } else if (targetProgressRef.current >= 1 || targetProgressRef.current <= 0) {
          setIsActive(false);
          isActiveRef.current = false;
          document.body.style.overflow = '';
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const SPEED = 0.0009;
    const onWheel = (e: WheelEvent) => {
      if (!isActiveRef.current) return;
      e.preventDefault();
      const delta = e.deltaY * SPEED;
      const next = Math.min(1, Math.max(0, targetProgressRef.current + delta));
      targetProgressRef.current = next;
      if (next >= 1 && delta > 0) {
        setIsActive(false);
        isActiveRef.current = false;
        document.body.style.overflow = '';
        const section = sectionRef.current;
        if (section) window.scrollBy({ top: section.getBoundingClientRect().bottom, behavior: 'smooth' });
      }
      if (next <= 0 && delta < 0) {
        setIsActive(false);
        isActiveRef.current = false;
        document.body.style.overflow = '';
        const section = sectionRef.current;
        if (section) window.scrollBy({ top: section.getBoundingClientRect().top - window.innerHeight, behavior: 'smooth' });
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    let startY = 0;
    const SPEED = 0.0012;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isActiveRef.current) return;
      e.preventDefault();
      const dy = startY - e.touches[0].clientY;
      startY = e.touches[0].clientY;
      const next = Math.min(1, Math.max(0, targetProgressRef.current + dy * SPEED));
      targetProgressRef.current = next;
      if (next >= 1 && dy > 0) {
        setIsActive(false);
        isActiveRef.current = false;
        document.body.style.overflow = '';
      }
      if (next <= 0 && dy < 0) {
        setIsActive(false);
        isActiveRef.current = false;
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const activeCard = Math.min(CARD_COUNT - 1, Math.round(progress * (CARD_COUNT - 1)));

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        perspective: '2200px',
        background: `
          radial-gradient(circle at 15% 20%, rgba(37,99,235,0.18), transparent 35%),
          radial-gradient(circle at 85% 75%, rgba(14,165,233,0.15), transparent 35%),
          linear-gradient(180deg, #020617 0%, #071124 35%, #0f172a 70%, #020617 100%)
        `,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(120deg, transparent 35%, rgba(59,130,246,0.08) 50%, transparent 65%)',
          transform: `translateX(${progress * 30}%) rotate(-12deg)`,
          filter: 'blur(120px)',
          zIndex: 1,
        }}
      />

      <div className="relative w-full h-full z-10">
        {storyCards.map((card, index) => (
          <StoryCard key={index} card={card} rawProgress={progress} index={index} onNavigate={onNavigate} />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-[100]">
        {storyCards.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === activeCard ? '2.5rem' : '0.6rem',
              height: '0.6rem',
              borderRadius: '9999px',
              background: i === activeCard ? 'linear-gradient(90deg,#3b82f6,#60a5fa)' : 'rgba(255,255,255,0.15)',
              boxShadow: i === activeCard ? '0 0 20px rgba(96,165,250,0.9)' : 'none',
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

      {progress === 0 && (
        <div className="absolute bottom-16 right-10 text-white/55 text-xs tracking-[0.35em] uppercase z-[100] flex flex-col items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Scroll</span>
        </div>
      )}
    </section>
  );
}

export function AboutPage() {
  const { navigate } = useAppRouter();

  return (
    <div className="page-transition">
      <div/>
      <StoryExperience onNavigate={navigate} />

      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-eyebrow">Timeline</p>
            <h2 className="section-title">
              The <span className="text-blue-600">Journey</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-blue-200 md:-translate-x-px" />
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col md:flex-row gap-6 mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-blue-600 -translate-x-1.5 md:-translate-x-1.5 mt-2 ring-4 ring-blue-100" />
                <div className={`md:w-1/2 pl-10 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="font-orbitron text-blue-600 font-bold text-lg">{m.year}</span>
                  <h3 className="font-orbitron text-xl font-bold text-slate-900 mt-1 mb-2">{m.title}</h3>
                  <p className="font-rajdhani text-slate-600">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-slate-200 p-8 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-orbitron text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="font-rajdhani text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
