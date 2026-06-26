import { useEffect, useState } from 'react';
import { type AppRoute, useAppRouter } from '../router';

const links: { label: string; path: AppRoute }[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Works', path: '/works' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const { path, navigate } = useAppRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const handleNav = (to: AppRoute) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 navbar-animate ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-inner flex items-center justify-between gap-3 px-4 py-2.5">
        <button
          onClick={() => handleNav('/')}
          className="font-orbitron font-bold text-base tracking-widest whitespace-nowrap text-blue-600"
        >
          ST
        </button>
        <div className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => handleNav(l.path)}
              className={`nav-link font-rajdhani font-semibold text-xs tracking-widest uppercase transition-colors ${
                path === l.path ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          className="md:hidden ml-auto text-slate-600 hover:text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="mt-2 rounded-xl overflow-hidden md:hidden navbar-mobile">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => handleNav(l.path)}
              className={`w-full text-left px-6 py-3 font-rajdhani font-semibold text-sm tracking-widest uppercase transition-colors border-b last:border-0 border-slate-100 hover:text-blue-600 hover:bg-blue-50 ${
                path === l.path ? 'text-blue-600 bg-blue-50' : 'text-slate-700'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
