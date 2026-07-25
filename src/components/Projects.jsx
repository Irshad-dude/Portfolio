import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const up = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
});

function ProjectCard({ project, index }) {
  // Split description into two parts for the two-card layout seen in the design
  const sentences = project.description.split(/(?<=\.)\s+/).filter(Boolean);
  const desc1 = sentences[0] || project.description;
  const desc2 = sentences.slice(1).join(' ');

  return (
    <motion.div
      {...up(0.1)}
      style={{
        position: 'relative',
        marginBottom: 140,
        width: '100%',
      }}
    >
      {/* ── Main Project Title Pill ── */}
      <div style={{
        position: 'absolute',
        top: -24, left: -16,
        background: '#fff',
        color: '#000',
        padding: '10px 28px',
        borderRadius: 999,
        fontWeight: 700,
        fontSize: '1.05rem',
        zIndex: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        {project.title}
        
        {/* Links inside title pill for quick access */}
        <div style={{ display: 'flex', gap: 12, marginLeft: 12, borderLeft: '1px solid #ddd', paddingLeft: 12 }}>
          {project.github !== '#' && (
            <a href={project.github} target="_blank" rel="noreferrer" style={{ color: '#000' }}>
              <FaGithub size={16} />
            </a>
          )}
          {project.link !== '#' && (
            <a href={project.link} target="_blank" rel="noreferrer" style={{ color: '#000' }}>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: 40,
        alignItems: 'stretch',
      }} className="project-layout">
        
        {/* ── Image Side (Left) ── */}
        <div style={{
          flex: '1.4',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'var(--bg-card)',
          position: 'relative',
          minHeight: 320,
        }} className="proj-image-box">
          <a href={project.link} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
            <img 
              src={project.image} 
              alt={project.title}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                transition: 'transform 0.5s ease',
              }}
              className="proj-img"
            />
          </a>
        </div>

        {/* ── Content Side (Right) ── */}
        <div style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          paddingTop: 24,
        }} className="proj-content-box">
          
          {/* Card 1: About it */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: -14, left: 24,
              background: '#fff',
              color: '#000',
              padding: '6px 20px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '0.85rem',
              zIndex: 2,
            }}>
              About it
            </div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: '36px 28px 28px 28px',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              fontWeight: 400,
            }}>
              {desc1}
            </div>
          </div>

          {/* Card 2: Extra Details (if exists) */}
          {desc2 && (
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: '28px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
            }}>
              {desc2}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div style={{ 
            display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 
          }}>
            {project.techStack.map((tech, i) => (
              <span key={i} style={{
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.8rem',
                color: 'var(--text-primary)',
                background: 'rgba(255,255,255,0.02)',
                fontWeight: 500,
                transition: 'all 0.2s'
              }} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="section">
        
        <motion.div {...up()}>
          <div className="section-heading" style={{ marginBottom: 80 }}>
            <span className="num mono">04.</span>
            <h2>Selected Works</h2>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .proj-image-box:hover .proj-img {
          transform: scale(1.03);
        }
        .tech-pill:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.3) !important;
        }

        @media (max-width: 960px) {
          .project-layout {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .proj-image-box {
            min-height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
