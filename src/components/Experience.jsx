import { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const up = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const KEYWORDS = [
  'Java Spring Boot', 'RESTful APIs', 'JWT', 'SQL', 'relational databases',
  'authentication', 'middleware', 'API', 'endpoints', 'frontend'
];

function highlightText(text) {
  let parts = [text];
  KEYWORDS.forEach(kw => {
    parts = parts.flatMap(part => {
      if (typeof part !== 'string') return [part];
      const regex = new RegExp(`(${kw})`, 'gi');
      const split = part.split(regex);
      return split.map((s, i) => 
        s.toLowerCase() === kw.toLowerCase() 
          ? <span key={`${kw}-${i}`} style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{s}</span>
          : s
      );
    });
  });
  return parts;
}

export default function Experience() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
      <div className="section">
        
        <motion.div {...up()}>
          <div className="section-heading">
            <span className="num mono">03.</span>
            <h2>Experience</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: -40, marginBottom: 44, maxWidth: 480 }}>
            My professional journey and industry experience.
          </p>
        </motion.div>

        <div style={{ maxWidth: 840 }}>
          {experience.map((job, i) => (
            <motion.div key={job.id} {...up(0.1 + i * 0.1)}
              style={{
                position: 'relative',
                paddingLeft: 40,
                paddingBottom: i === experience.length - 1 ? 0 : 48,
              }}
              className="group"
            >
              {/* ── Timeline track & dot ── */}
              {i !== experience.length - 1 && (
                <div style={{
                  position: 'absolute', left: 4.5, top: 28, bottom: -8,
                  width: 1, background: 'var(--border)',
                  transition: 'background 0.3s'
                }} className="timeline-line" />
              )}
              
              <div style={{
                position: 'absolute', left: 0, top: 4,
                width: 10, height: 10, borderRadius: '50%',
                border: '2px solid var(--border)',
                background: 'var(--bg)',
                transition: 'all 0.3s',
                zIndex: 2,
              }} className="timeline-dot" />

              {/* ── Experience Card ── */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '32px 36px',
                  transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="exp-card"
              >
                {/* Subtle top gradient line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.0) 100%)',
                  opacity: 0, transition: 'opacity 0.3s'
                }} className="card-glare" />

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                  
                  {/* Role & Company */}
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', 
                      marginBottom: 6, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: 8 
                    }}>
                      {job.role}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                      <Briefcase size={14} style={{ opacity: 0.7 }} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{job.company}</span>
                    </div>
                  </div>

                  {/* Period badge */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 6,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                  }}>
                    <Calendar size={12} style={{ color: 'var(--text-secondary)' }} />
                    <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {job.period}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {job.description.map((desc, di) => (
                    <li key={di} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }} className="bullet-item">
                      <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 4, transition: 'color 0.2s, transform 0.2s' }} className="bullet-icon" />
                      <span style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                        {highlightText(desc)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-card:hover {
          border-color: var(--border-hover) !important;
          background: var(--bg-card-hover) !important;
        }
        .exp-card:hover .card-glare { opacity: 1 !important; }
        
        .group:hover .timeline-dot {
          border-color: var(--text-primary) !important;
          background: var(--text-primary) !important;
          box-shadow: 0 0 12px rgba(255,255,255,0.4);
        }
        .group:hover .timeline-line {
          background: linear-gradient(to bottom, var(--text-secondary), var(--border)) !important;
        }
        
        .bullet-item:hover .bullet-icon {
          color: var(--text-primary) !important;
          transform: translateX(3px);
        }

        @media (max-width: 600px) {
          #experience [style*="paddingLeft: 40px"] { padding-left: 28px !important; }
          .exp-card { padding: 24px 20px !important; }
        }
      `}</style>
    </section>
  );
}
