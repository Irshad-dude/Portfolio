import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ArrowDown } from 'lucide-react';
import TextParticles from './TextParticles';

const TITLES = [
  'Software Engineer',
  'Backend Engineer',
  'Backend Developer',
  'MERN Stack Developer',
];

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const word = words[idx];
    let t;
    if (!del && sub <= word.length) {
      t = setTimeout(() => {
        setText(word.slice(0, sub));
        setSub(s => s + 1);
        if (sub === word.length) setTimeout(() => setDel(true), 2200);
      }, 72);
    } else if (del && sub >= 0) {
      t = setTimeout(() => {
        setText(word.slice(0, sub));
        setSub(s => s - 1);
        if (sub === 0) { setDel(false); setIdx(i => (i + 1) % words.length); }
      }, 36);
    }
    return () => clearTimeout(t);
  }, [sub, del, idx, words]);

  return (
    <span style={{ color: 'var(--text-secondary)' }}>
      {text}
      <span style={{
        display: 'inline-block', width: 2, height: '0.85em',
        background: 'var(--text-muted)', marginLeft: 3, verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  );
}

export default function Hero() {
  const { links, email } = PORTFOLIO_DATA.personal;

  return (
    // Note: no canvas here — it's global in App.jsx
    <section id="home" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      background: 'transparent', // let global canvas show
    }}>
      {/* Left social rail */}
      <div style={{
        position: 'fixed', bottom: 0, left: 32, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
      }} className="side-rail">
        {[
          { icon: <FaGithub size={16} />,  href: links.github,   label: 'GitHub' },
          { icon: <FaLinkedin size={16} />, href: links.linkedin, label: 'LinkedIn' },
        ].map(({ icon, href, label }) => (
          <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ color: 'var(--text-muted)', transition: 'color 0.2s, transform 0.2s', display: 'flex' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)';    e.currentTarget.style.transform = 'translateY(0)'; }}
          >{icon}</motion.a>
        ))}
        <div style={{ width: 1, height: 70, background: 'var(--border-hover)' }} />
      </div>

      {/* Right email rail */}
      <div style={{
        position: 'fixed', bottom: 0, right: 32, zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }} className="side-rail">
        <motion.a href={`mailto:${email}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="mono"
          style={{
            fontSize: '0.68rem', letterSpacing: '0.12em',
            color: 'var(--text-muted)', writingMode: 'vertical-rl',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >{email}</motion.a>
        <div style={{ width: 1, height: 70, background: 'var(--border-hover)' }} />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1080, width: '100%',
        margin: '0 auto', padding: '0 32px',
        paddingTop: 96,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>
        <motion.p className="mono"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16, letterSpacing: '0.1em' }}
        >
          Hi, I'm
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ width: '100%', marginBottom: 20 }}
        >
          <TextParticles />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 600,
            letterSpacing: '-0.5px', color: 'var(--text-muted)',
            marginBottom: 28, minHeight: '2.4rem',
          }}
        >
          <Typewriter words={TITLES} />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{
            maxWidth: 480, fontSize: '0.95rem', lineHeight: 1.8,
            color: 'var(--text-muted)', marginBottom: 40,
          }}
        >
          I build scalable web applications and craft clean, performant
          user experiences. Focused on full-stack engineering with attention
          to detail and system design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.45 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
        >
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact"  className="btn-outline">Let's Talk</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{ marginTop: 72, display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {[
            { num: '300+', label: 'LeetCode solved' },
            { num: '1yr',  label: 'Industry experience' },
            { num: '4',    label: 'Production projects' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="mono stat-num">{s.num}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)', color: 'var(--text-muted)', zIndex: 2,
        }}
      >
        <ArrowDown size={18} strokeWidth={1.5} />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (max-width: 900px) { .side-rail { display: none !important; } }
      `}</style>
    </section>
  );
}
