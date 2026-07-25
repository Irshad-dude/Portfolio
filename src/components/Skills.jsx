import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import {
  SiJavascript, SiPython, SiReact, SiNodedotjs,
  SiMongodb, SiMysql, SiGit, SiGithub,
  SiTailwindcss, SiNextdotjs, SiSpring,
  SiCplusplus, SiHtml5, SiCss,
  SiNetlify, SiCloudinary, SiPostgresql, SiJson,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { Database } from 'lucide-react';

/* ── Proficiency metadata ── */
const META = {
  'JavaScript':          { level: 'Expert',    pct: 92 },
  'Java':                { level: 'Advanced',  pct: 80 },
  'C++':                 { level: 'Advanced',  pct: 78 },
  'Python':              { level: 'Proficient',pct: 70 },
  'SQL':                 { level: 'Advanced',  pct: 82 },
  'HTML':                { level: 'Expert',    pct: 95 },
  'CSS':                 { level: 'Expert',    pct: 90 },
  'React':               { level: 'Expert',    pct: 90 },
  'Next.js':             { level: 'Advanced',  pct: 78 },
  'Node.js':             { level: 'Advanced',  pct: 82 },
  'Express.js':          { level: 'Advanced',  pct: 80 },
  'Java Spring Boot':    { level: 'Advanced',  pct: 78 },
  'Tailwind CSS':        { level: 'Expert',    pct: 88 },
  'MongoDB':             { level: 'Advanced',  pct: 80 },
  'MySQL':               { level: 'Advanced',  pct: 82 },
  'Relational Databases':{ level: 'Advanced',  pct: 78 },
  'JSONBin':             { level: 'Proficient',pct: 65 },
  'Git':                 { level: 'Advanced',  pct: 85 },
  'GitHub':              { level: 'Advanced',  pct: 85 },
  'REST APIs':           { level: 'Expert',    pct: 90 },
  'Cloudinary':          { level: 'Proficient',pct: 70 },
  'Netlify':             { level: 'Proficient',pct: 72 },
  'Agile':               { level: 'Proficient',pct: 68 },
};

const LEVEL_COLOR = {
  Expert:     'var(--text-primary)',
  Advanced:   'var(--text-secondary)',
  Proficient: 'var(--text-muted)',
};

const TABS = [
  { key: 'all',        label: 'All' },
  { key: 'languages',  label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'databases',  label: 'Databases' },
  { key: 'tools',      label: 'Tools' },
];

/* ── Icon rows for the marquee ── */
const ROW_1 = [
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'React',      Icon: SiReact },
  { name: 'Node.js',    Icon: SiNodedotjs },
  { name: 'Next.js',    Icon: SiNextdotjs },
  { name: 'Java',       Icon: FaJava },
  { name: 'Spring Boot',Icon: SiSpring },
  { name: 'Python',     Icon: SiPython },
  { name: 'Tailwind',   Icon: SiTailwindcss },
  { name: 'MongoDB',    Icon: SiMongodb },
  { name: 'MySQL',      Icon: SiMysql },
];

const ROW_2 = [
  { name: 'C++',        Icon: SiCplusplus },
  { name: 'HTML5',      Icon: SiHtml5 },
  { name: 'CSS3',       Icon: SiCss },
  { name: 'Git',        Icon: SiGit },
  { name: 'GitHub',     Icon: SiGithub },
  { name: 'Netlify',    Icon: SiNetlify },
  { name: 'Cloudinary', Icon: SiCloudinary },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'JSON',       Icon: SiJson },
  { name: 'REST APIs',  Icon: Database, isLucide: true },
];

/* ── Single marquee row ── */
function MarqueeRow({ items, reverse = false, speed = 30 }) {
  // Duplicate items for seamless infinite loop
  const doubled = [...items, ...items, ...items];

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          gap: 32,
          width: 'max-content',
          animation: `marquee-${reverse ? 'right' : 'left'} ${speed}s linear infinite`,
        }}
      >
        {doubled.map(({ name, Icon, isLucide }, i) => (
          <div
            key={`${name}-${i}`}
            title={name}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
              padding: '14px 16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              minWidth: 76,
              cursor: 'default',
              transition: 'border-color 0.2s, background 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.background  = 'var(--bg-card-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background  = 'var(--bg-card)';
            }}
          >
            {isLucide
              ? <Icon size={26} style={{ color: 'var(--text-secondary)' }} strokeWidth={1.5} />
              : <Icon size={26} style={{ color: 'var(--text-primary)' }} />
            }
            <span className="mono" style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', letterSpacing: '0.06em', textAlign: 'center', lineHeight: 1.3 }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Skill card ── */
function SkillCard({ name, delay }) {
  const { level, pct } = META[name] ?? { level: 'Proficient', pct: 65 };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '18px 20px',
        transition: 'border-color 0.2s, background 0.2s', cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{name}</span>
        <span style={{
          fontSize: '0.62rem', fontFamily: 'JetBrains Mono, monospace',
          color: LEVEL_COLOR[level], background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)', borderRadius: 4,
          padding: '2px 7px', flexShrink: 0, marginLeft: 8,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>{level}</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%', borderRadius: 99,
            background: `rgba(255,255,255,${level === 'Expert' ? 0.55 : level === 'Advanced' ? 0.35 : 0.2})`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { skills } = PORTFOLIO_DATA;
  const [active, setActive] = useState('all');

  const allSkills = [
    ...skills.languages, ...skills.frameworks,
    ...skills.databases, ...skills.tools,
  ];
  const displayed = active === 'all' ? allSkills : skills[active] ?? [];

  return (
    <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="section">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
        >
          <div className="section-heading">
            <span className="num mono">02.</span>
            <h2>Skills</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: -40, marginBottom: 44, maxWidth: 480 }}>
            Technologies and tools I use to build exceptional software.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
          style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 36 }}
        >
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActive(tab.key)} style={{
              padding: '7px 18px', borderRadius: 8,
              border: `1px solid ${active === tab.key ? 'var(--border-active)' : 'var(--border)'}`,
              background: active === tab.key ? 'rgba(255,255,255,0.06)' : 'transparent',
              color: active === tab.key ? 'var(--text-primary)' : 'var(--text-muted)',
              fontSize: '0.8rem', fontWeight: active === tab.key ? 600 : 400,
              cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.02em',
            }}>
              {tab.label}
            </button>
          ))}
          <span className="mono" style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
            {displayed.length} skills
          </span>
        </motion.div>

        {/* Skill grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}
          >
            {displayed.map((skill, i) => (
              <SkillCard key={skill} name={skill} delay={i * 0.035} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Dual icon marquee ── */}
        <div style={{
          marginTop: 64,
          borderTop: '1px solid var(--border)',
          paddingTop: 32,
          display: 'flex', flexDirection: 'column', gap: 14,
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          overflow: 'hidden',
        }}>
          {/* Row 1 — scroll left */}
          <MarqueeRow items={ROW_1} reverse={false} speed={28} />
          {/* Row 2 — scroll right (opposite) */}
          <MarqueeRow items={ROW_2} reverse={true}  speed={24} />
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        @keyframes marquee-left:hover,
        @keyframes marquee-right:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}
