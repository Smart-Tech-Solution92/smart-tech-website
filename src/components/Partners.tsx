export function Partners() {
  const partners = ['COMPANY NAME', 'COMPANY NAME', 'COMPANY NAME', 'COMPANY NAME', 'COMPANY NAME', 'COMPANY NAME'];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl font-bold text-slate-900 mb-4">Our Partnerships</h2>
          <p className="font-rajdhani text-slate-600">Trusted by leading companies worldwide</p>
        </div>
        <div className="relative">
          <div className="flex animate-partners-scroll space-x-16">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="text-center flex-shrink-0">
                <div className="font-orbitron text-2xl font-bold text-slate-300 whitespace-nowrap">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
