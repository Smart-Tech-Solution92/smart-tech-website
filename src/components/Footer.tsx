import { Github, Linkedin } from 'lucide-react';
import { type AppRoute, useAppRouter } from '../router';

const links: { label: string; path: AppRoute }[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/works' },
  { label: 'Contact', path: '/contact' },
];

export function Footer() {
  const { navigate } = useAppRouter();

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
                key={l.path}
                onClick={() => navigate(l.path)}
                className="font-rajdhani text-sm tracking-widest uppercase text-slate-500 hover:text-blue-600 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/smart-tech-solutions-ethio/"
              className="social-icon"
              aria-label="LinkedIn"
            >
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
