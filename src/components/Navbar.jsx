import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const NAV = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV.map(l => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 140 >= el.offsetTop) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 0' : '22px 0',
      background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <nav style={{
        maxWidth: 1080, margin: '0 auto', padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <motion.a href="#home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="mono"
          style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}
        >
          
        </motion.a>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none', alignItems: 'center' }} className="desk-nav">
          {NAV.map((link, i) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <motion.li key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.15 }}
              >
                <a href={link.href}
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s',
                    letterSpacing: '-0.2px',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.color = isActive ? 'var(--text-primary)' : 'var(--text-muted)'}
                >
                  {link.label}
                </a>
              </motion.li>
            );
          })}
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: 16 }}>
            <a href="/resume.pdf" download="Irshad_Alam_Resume.pdf" style={{ 
              padding: '8px 18px', fontSize: '0.82rem', borderRadius: '8px', 
              border: '1px solid var(--border)', color: 'var(--text-primary)',
              transition: 'all 0.2s', background: 'rgba(255,255,255,0.03)'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
            >
              Resume
            </a>
            <a href="#contact" className="btn-outline" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
              Hire Me
            </a>
          </motion.li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} aria-label="Menu"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
          className="mob-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
            }}
          >
            {NAV.map(link => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}
                style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '-1px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf" download="Irshad_Alam_Resume.pdf" onClick={() => setOpen(false)}
              style={{ marginTop: 12, padding: '12px 32px', fontSize: '1.2rem', fontWeight: 700, color: '#000', background: '#fff', borderRadius: '12px', letterSpacing: '-0.5px' }}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .desk-nav { display: none !important; } .mob-toggle { display: flex !important; } }
        @media (min-width: 769px) { .mob-toggle { display: none !important; } }
      `}</style>
    </header>
  );
}
