import { Brain, Cog, Globe, MapPin, Sparkles } from 'lucide-react';
import { SectionBackdrop } from './SectionBackdrop';

type PageHeroVariant = 'services' | 'about' | 'works' | 'contact';

const backdropMap = {
  services: 'soft',
  about: 'twilight',
  works: 'gallery',
  contact: 'dawn',
} as const;

export function PageHero({
  variant,
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  variant: PageHeroVariant;
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
}) {
  return (
    <header className="relative overflow-hidden pt-32 pb-20 px-4 min-h-[42vh] flex items-end">
      <SectionBackdrop theme={backdropMap[variant]} />

      {variant === 'services' && (
        <div className="pointer-events-none absolute inset-0">
          {[Globe, Brain, Cog].map((Icon, i) => (
            <div
              key={i}
              className="absolute rounded-2xl border border-blue-200/60 bg-white/60 p-4 shadow-lg backdrop-blur-sm page-hero-float"
              style={{
                top: `${18 + i * 22}%`,
                left: `${8 + i * 28}%`,
                animationDelay: `${i * 0.6}s`,
              }}
            >
              <Icon size={22} className="text-blue-600" />
            </div>
          ))}
          <div className="absolute right-[8%] top-[20%] h-48 w-48 rounded-full border border-blue-300/30 page-hero-spin" />
        </div>
      )}

      {variant === 'about' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
          <div className="h-[500px] w-[500px] rounded-full border border-blue-200/40 page-hero-spin-slow" />
          <div className="absolute h-[320px] w-[320px] rounded-full border border-blue-300/30" />
        </div>
      )}

      {variant === 'works' && (
        <div className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block">
          <span className="font-orbitron text-[12rem] font-black text-indigo-100 leading-none select-none">03</span>
        </div>
      )}

      {variant === 'contact' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[10%]">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-400/15 blur-2xl page-hero-pulse" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-blue-200/50 bg-white/70 backdrop-blur-md shadow-lg">
              <MapPin size={36} className="text-blue-600" />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <p className="font-rajdhani text-xs tracking-[0.45em] uppercase mb-4 flex items-center gap-2 text-blue-600">
          <Sparkles size={14} className="text-blue-500" />
          {eyebrow}
        </p>
        <h1 className="font-orbitron font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] mb-5 text-slate-900">
          {title}
          {highlight && <span className="text-blue-600"> {highlight}</span>}
        </h1>
        <p className="font-rajdhani text-lg max-w-2xl leading-relaxed text-slate-600">{subtitle}</p>
      </div>
    </header>
  );
}
