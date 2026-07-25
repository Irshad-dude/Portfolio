import { PORTFOLIO_DATA } from '../data/portfolio';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const { name, links } = PORTFOLIO_DATA.personal;

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '32px', background: 'var(--bg)' }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Designed & built by {name}
        </span>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          {[
            { icon: <FaGithub size={15} />,   href: links.github,   label: 'GitHub' },
            { icon: <FaLinkedin size={15} />,  href: links.linkedin, label: 'LinkedIn' },
          ].map(({ icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >{icon}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
