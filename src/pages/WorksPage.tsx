import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Layers } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useReveal } from '../hooks/useReveal';
import { projects } from '../data/siteData';

const accentStyles = [
  { bg: 'from-orange-500 to-pink-500', text: 'text-orange-600', border: 'border-orange-200', fill: 'bg-orange-50' },
] as const;

export function WorksPage() {
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
          dir === 'right' ? (prev + 1) % projects.length : (prev - 1 + projects.length) % projects.length
        );
        setAnimDir(null);
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating]
  );

  useEffect(() => {
    if (!visible || projects.length <= 1) return;
    autoRef.current = setInterval(() => goTo('right'), 4000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [visible, goTo]);

  const proj = projects[current];
  const accent = accentStyles[current];

  return (
    <div className="page-transition works-page bg-[#faf8f5]">
      <PageHero
        variant="works"
        eyebrow="Case Studies"
        title="Our"
        highlight="Portfolio"
        subtitle="Real problems. Measurable impact. Proven results across AI, cloud, and cybersecurity."
      />

      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`works-showcase py-20 px-4 min-h-[70vh] ${visible ? 'revealed' : ''}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Layers size={18} className="text-indigo-500" />
            <span className="font-rajdhani text-xs tracking-[0.4em] uppercase text-slate-500">Featured Project</span>
          </div>

          <div className="works-slideshow">
            <div
              className={`works-slide ${animDir === 'right' ? 'slide-exit-left' : animDir === 'left' ? 'slide-exit-right' : 'slide-enter'}`}
            >
              <div className="works-slide-layout">
                <div className="works-slide-visual">
                  <img src={proj.image} alt={proj.title} className="works-slide-image" />
                  <span className="works-slide-index font-orbitron">{String(current + 1).padStart(2, '0')}</span>
                </div>

                <div className="works-slide-body">
                  <span className={`works-category ${accent.text} ${accent.fill} ${accent.border}`}>
                    {proj.category}
                  </span>
                  <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-slate-900 mt-4 mb-4">
                    {proj.title}
                  </h3>
                  <p className="font-rajdhani text-slate-600 text-lg leading-relaxed mb-8">{proj.desc}</p>
                  <button
                    className={`works-cta font-rajdhani ${accent.text} flex items-center gap-2`}
                  >
                    View Case Study <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>

            {projects.length > 1 && (
              <>
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
              </>
            )}
          </div>
        </div>
      </section>

      <section className="works-grid-section py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">All Projects</p>
            <h2 className="section-title">
              Impact in <span className="text-blue-600">Numbers</span>
            </h2>
          </div>

          <div className="works-bento-grid">
            {projects.map((p, i) => {
              const style = accentStyles[i];
              return (
                <article
                  key={p.title}
                  className={`works-bento-card works-bento-card--${i + 1} border ${style.border} ${style.fill}`}
                >
                  <img src={p.image} alt={p.title} className="works-bento-image" />
                  <span className="works-bento-index font-orbitron">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-rajdhani text-xs tracking-[0.3em] uppercase ${style.text}`}>{p.category}</span>
                  <h4 className="font-orbitron text-xl font-bold text-slate-900 mt-3 mb-2">{p.title}</h4>
                  <p className="font-rajdhani text-slate-600 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <div className={`font-orbitron text-3xl font-black ${style.text}`}>{p.metric}</div>
                  <p className="font-rajdhani text-xs uppercase tracking-widest text-slate-400 mt-1">{p.metricLabel}</p>
                  <div className={`works-bento-accent bg-gradient-to-r ${style.bg}`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
