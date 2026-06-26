import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/siteData';
import { useAppRouter } from '../router';
import { useReveal } from '../hooks/useReveal';

const accents = [
  { bar: 'from-blue-500 to-cyan-400', icon: 'text-blue-600', ring: 'ring-blue-200' },
  { bar: 'from-violet-500 to-indigo-500', icon: 'text-violet-600', ring: 'ring-violet-200' },
  { bar: 'from-sky-500 to-blue-600', icon: 'text-sky-600', ring: 'ring-sky-200' },
] as const;

export function HomeServices() {
  const { navigate } = useAppRouter();
  const { ref, visible } = useReveal();
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`home-services section-reveal ${visible ? 'revealed' : ''}`}
    >
      <div className="home-services-bg" />
      <div className="home-services-noise" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="home-services-header">
          <div>
            <p className="section-eyebrow">What We Do</p>
            <h2 className="section-title text-left mb-0">
              Our <span className="text-blue-600">Services</span>
            </h2>
          </div>
          <p className="home-services-lead font-rajdhani text-slate-600 leading-relaxed">
            Three focused disciplines — precision-built for businesses that need real results, not buzzwords.
          </p>
        </div>

        <div className="home-services-accordion">
          {services.map(({ icon: Icon, title, desc, tags, image }, index) => {
            const isActive = active === index;
            const accent = accents[index];

            return (
              <article
                key={title}
                className={`home-services-panel ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                tabIndex={0}
              >
                <div
                  className="home-services-panel-img"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="home-services-panel-overlay" />
                <div className={`home-services-panel-bar bg-gradient-to-b ${accent.bar}`} />

                <div className="home-services-panel-collapsed">
                  <span className="home-services-num font-orbitron">0{index + 1}</span>
                  <span className="home-services-vertical font-rajdhani">{title}</span>
                  <div className={`home-services-icon ${accent.icon}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="home-services-panel-expanded">
                  <div className="home-services-expanded-top">
                    <span className={`home-services-badge font-rajdhani ${accent.icon}`}>
                      0{index + 1} — Service
                    </span>
                    <div className={`home-services-icon-lg ring-2 ${accent.ring} ${accent.icon}`}>
                      <Icon size={28} />
                    </div>
                  </div>
                  <h3 className="font-orbitron text-2xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="font-rajdhani text-slate-600 leading-relaxed mb-6">{desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                      <span key={tag} className="home-services-tag font-rajdhani">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/services')}
                    className={`home-services-link font-rajdhani ${accent.icon}`}
                  >
                    Learn more <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="home-services-footer">
          <div className="home-services-dots">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`home-services-dot ${active === i ? 'is-active' : ''}`}
                aria-label={`Show service ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => navigate('/services')}
            className="btn-primary font-rajdhani font-semibold tracking-widest uppercase"
          >
            View All Services <ArrowRight size={16} className="inline ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
