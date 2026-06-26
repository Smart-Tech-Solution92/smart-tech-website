import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { Partners } from '../components/Partners';
import { TechStack } from '../components/TechStack';
import { Counter } from '../components/Counter';
import { HomeServices } from '../components/HomeServices';
import { stats } from '../data/siteData';
import { useAppRouter } from '../router';

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
    >
      <div className="w-7 h-11 rounded-[14px] border-2 border-slate-400 flex justify-center pt-1.5">
        <div className="w-1 h-2 rounded-sm bg-slate-400 scroll-dot" />
      </div>
      <span className="font-rajdhani text-xs tracking-[0.3em] uppercase text-slate-400">Scroll</span>
    </div>
  );
}



export function HomePage() {
  const { navigate } = useAppRouter();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
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
              onClick={() => navigate('/services')}
              className="btn-primary font-rajdhani font-semibold tracking-widest uppercase"
            >
              Explore Services <ArrowRight size={16} className="inline ml-2" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn-outline font-rajdhani font-semibold tracking-widest uppercase"
            >
              Get In Touch
            </button>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      <HomeServices />

      <section className="py-16 px-4 stats-bg">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="stat-item text-center">
              <div className="text-4xl md:text-5xl font-orbitron font-black text-blue-600 mb-2">
                <Counter target={value} suffix={suffix} />
              </div>
              <div className="uppercase tracking-[0.2em] text-slate-500 text-xs font-rajdhani">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <TechStack />
    </>
  );
}
