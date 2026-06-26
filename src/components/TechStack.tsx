const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Docker',
  'Kubernetes',
  'AWS',
  'MongoDB',
  'PostgreSQL',
  'GraphQL',
  'Flutter',
];

function TechChip({ text }: { text: string }) {
  return (
    <div className="flex-shrink-0 px-6 py-3 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-slate-700 font-rajdhani font-medium shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 whitespace-nowrap">
      {text}
    </div>
  );
}

export function TechStack() {
  const row2 = [...technologies].reverse();
  const row3 = [...technologies.slice(5), ...technologies.slice(0, 5)];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-orbitron text-5xl font-bold text-slate-900">Technologies We Use</h2>
          <p className="font-rajdhani text-slate-500 mt-4">Cutting-edge technologies powering modern software.</p>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden">
            <div className="flex gap-6 w-max animate-marquee" style={{ animationDuration: '25s' }}>
              {[...technologies, ...technologies].map((tech, i) => (
                <TechChip key={i} text={tech} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-6 w-max animate-marquee-reverse" style={{ animationDuration: '20s' }}>
              {[...row2, ...row2].map((tech, i) => (
                <TechChip key={i} text={tech} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-6 w-max animate-marquee" style={{ animationDuration: '35s' }}>
              {[...row3, ...row3].map((tech, i) => (
                <TechChip key={i} text={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
