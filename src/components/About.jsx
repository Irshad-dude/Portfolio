import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GraduationCap, Zap, Code2, Server, Layers } from 'lucide-react';

const up = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* ── Inline code-card: renders developer info as JS object ── */
function CodeCard({ data }) {
  const lines = [
    { type: 'keyword', text: 'const ' },
    { type: 'fn',      text: 'developer' },
    { type: 'plain',   text: ' = {' },
  ];

  const fields = [
    { key: 'name',      val: `"${data.name}"`,         color: '#a1a1aa' },
    { key: 'role',      val: `"Software Engineer"`,     color: '#a1a1aa' },
    { key: 'location',  val: `"${data.location}"`,      color: '#a1a1aa' },
    { key: 'education', val: `"B.Tech CSE • 2027"`,     color: '#a1a1aa' },
    { key: 'gpa',       val: `"8.5 / 10"`,              color: '#71717a' },
    { key: 'stack',     val: `["React","Node","Java"]`, color: '#a1a1aa' },
    { key: 'openToWork', val: 'true',                   color: '#d4d4d8' },
  ];

  return (
    <div style={{
      background: '#080808',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {/* Window chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: '#0a0a0a',
      }}>
        {['#333', '#333', '#333'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#3f3f46', letterSpacing: '0.06em' }}>
          irshad.js
        </span>
      </div>

      {/* Code body */}
      <div style={{ padding: '20px 24px', lineHeight: 1.85, fontSize: '0.8rem' }}>
        {/* const developer = { */}
        <div>
          <span style={{ color: '#7c7c7c' }}>const </span>
          <span style={{ color: '#e4e4e4' }}>developer</span>
          <span style={{ color: '#52525b' }}> = {'{'}</span>
        </div>

        {fields.map(({ key, val, color }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
            style={{ paddingLeft: 20 }}
          >
            <span style={{ color: '#52525b' }}>{key}</span>
            <span style={{ color: '#3f3f46' }}>: </span>
            <span style={{ color: key === 'openToWork' ? '#22c55e' : color }}>{val}</span>
            <span style={{ color: '#3f3f46' }}>,</span>
          </motion.div>
        ))}

        {/* closing brace */}
        <div style={{ color: '#52525b' }}>{'}'}</div>

        {/* blank line + comment */}
        <div style={{ marginTop: 12 }}>
          <span style={{ color: '#2a2a2a' }}>// Currently building cool things 🚀</span>
        </div>
      </div>
    </div>
  );
}



/* ── "Currently" focus pill ── */
function FocusPills() {
  const items = [
    { icon: <Server size={12} />,  label: 'Backend Architecture' },
    { icon: <Code2  size={12} />,  label: 'MERN Stack' },
    { icon: <Layers size={12} />,  label: 'System Design' },
    { icon: <Zap    size={12} />,  label: 'DSA & LeetCode' },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
      {items.map(({ icon, label }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.06 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            fontSize: '0.76rem', color: 'var(--text-primary)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>{icon}</span>
          {label}
        </motion.div>
      ))}
    </div>
  );
}

export default function About() {
  const { name, summary } = PORTFOLIO_DATA.personal;
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="about" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
      <div className="section">

        {/* ── Section heading ── */}
        <motion.div {...up()}>
          <div className="section-heading">
            <span className="num mono">01.</span>
            <h2>About Me</h2>
          </div>
        </motion.div>

        {/* ── Two-column main ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

          {/* LEFT — bio */}
          <div>
            <motion.p {...up(0.08)}
              style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-primary)', marginBottom: 22 }}
            >
              {summary}
            </motion.p>

            <motion.p {...up(0.16)}
              style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 36 }}
            >
              My engineering philosophy: write code that's easy to{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>read</span>,{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>scale</span>, and{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>maintain</span>.
              Whether designing a microservice or building a pixel-perfect UI, I care equally about
              what's under the hood and what the user sees.
            </motion.p>

            {/* Currently focused on */}
            <motion.div {...up(0.22)}>
              <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 0 }}>
                Currently focused on
              </p>
              <FocusPills />
            </motion.div>


          </div>

          {/* RIGHT — code card + education */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.div {...up(0.1)}>
              <CodeCard data={{ name, location }} />
            </motion.div>

            {/* Education card — more visual */}
            <motion.div {...up(0.2)}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
              }}>
                {/* Card header bar */}
                <div style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <GraduationCap size={14} style={{ color: 'var(--text-muted)' }} />
                  <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Education
                  </span>
                  <span style={{
                    marginLeft: 'auto', fontSize: '0.68rem',
                    padding: '2px 8px', borderRadius: 4,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>{education.period}</span>
                </div>

                <div style={{ padding: '18px 20px' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4 }}>
                    {education.degree}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                    {education.institution}
                  </p>
                  {/* GPA bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>CGPA</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>8.5 / 10</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--bg-surface)', borderRadius: 99, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: '100%', background: 'rgba(255,255,255,0.35)', borderRadius: 99 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>


      </div>

      <style>{`
        @media (max-width: 860px) {
          #about [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #about [style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
          #about [style*="borderRight"] {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
        }
      `}</style>
    </section>
  );
}
