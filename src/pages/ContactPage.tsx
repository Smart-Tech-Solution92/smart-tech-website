import { useState } from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useReveal } from '../hooks/useReveal';

export function ContactPage() {
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
    <div className="page-transition bg-slate-50 min-h-screen">
      <PageHero
        variant="contact"
        eyebrow="Get In Touch"
        title="Let's"
        highlight="Connect"
        subtitle="Ready to transform your business with cutting-edge technology? Our team is standing by."
      />

      <section
        ref={ref as React.RefObject<HTMLElement>}
        className={`py-20 px-4 ${visible ? 'revealed' : ''}`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-rajdhani text-slate-600 text-lg leading-relaxed mb-10">
              Whether you need AI solutions, a new product built, or enterprise systems — tell us what you're working
              on and we'll respond within one business day.
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
                  <span className="font-rajdhani text-slate-700 text-base">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <p className="font-rajdhani text-xs tracking-[0.3em] uppercase text-blue-600 mb-2">Office Hours</p>
              <p className="font-rajdhani text-slate-600">Mon – Fri, 9:00 AM – 6:00 PM EAT</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form space-y-5">
            <div>
              <label className="font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">
                Full Name
              </label>
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
              <label className="font-rajdhani text-xs tracking-widest uppercase text-slate-500 mb-2 block">
                Email Address
              </label>
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
    </div>
  );
}
