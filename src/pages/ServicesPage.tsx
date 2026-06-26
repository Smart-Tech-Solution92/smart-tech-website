import { PageHero } from '../components/PageHero';
import { Counter } from '../components/Counter';
import { useReveal } from '../hooks/useReveal';
import { services, stats } from '../data/siteData';

export function ServicesPage() {
  const { ref, visible } = useReveal();

  return (
    <div className="page-transition">
      <PageHero
        variant="services"
        eyebrow="What We Do"
        title="Engineering"
        highlight="Excellence"
        subtitle="Cutting-edge software solutions for businesses that demand innovation, scalability, and exceptional digital experiences."
      />

      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`relative overflow-hidden py-24 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 ${
          visible ? 'revealed' : ''
        }`}
      >
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-100/30 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,64,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,64,175,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[240px] gap-6">
            {services.map(({ icon: Icon, title, desc, tags, image }, index) => {
              const layouts = [
                'md:col-span-4 md:row-span-1',
                'md:col-span-2 md:row-span-2',
                'md:col-span-4 md:row-span-1',
              ];

              return (
                <div
                  key={title}
                  className={`${layouts[index]} group relative overflow-hidden rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-8 bg-cover bg-center`}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="absolute inset-0 bg-slate-900/70 group-hover:bg-slate-900/55 transition-all duration-500" />
                  <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-blue-400/20 blur-3xl group-hover:bg-cyan-400/30 transition-all duration-700" />

                  <div className="relative z-10">
                    <div className="absolute top-0 right-0 text-6xl font-black text-white/10 group-hover:text-white/20 transition-all">
                      0{index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <Icon size={30} className="text-white" />
                    </div>
                    <h3 className="font-orbitron text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="font-rajdhani text-lg text-slate-200 leading-relaxed mb-8">{desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 group-hover:bg-blue-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 group-hover:w-full transition-all duration-700" />
                </div>
              );
            })}
          </div>

          <div className="mt-24 rounded-3xl stats-bg p-12 shadow-lg border border-blue-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="text-center">
                  <div className="text-5xl font-orbitron font-black text-blue-600 mb-3">
                    <Counter target={value} suffix={suffix} />
                  </div>
                  <div className="uppercase tracking-[0.25em] text-slate-500 text-sm font-rajdhani">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
