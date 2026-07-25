import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const up = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export default function Contact() {
  const formRef = useRef();
  const [state, setState] = useState('idle');

  const handleSubmit = e => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('success');
      formRef.current?.reset();
      setTimeout(() => setState('idle'), 4000);
    }, 1200);
  };

  const { email, phone, location, links } = PORTFOLIO_DATA.personal;

  return (
    <section id="contact" style={{ 
      borderTop: '1px solid var(--border)', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at bottom, rgba(255,255,255,0.03) 0%, transparent 60%)'
    }}>
      {/* Premium ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="section" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div {...up()}>
          <div className="section-heading" style={{ marginBottom: 60 }}>
            <span className="num mono">05.</span>
            <h2>Get In Touch</h2>
          </div>
        </motion.div>

        <div style={{ 
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 24,
          padding: '56px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }} className="contact-box">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80 }} className="contact-grid">
            
            {/* ── Left Side: Info ── */}
            <div>
              <motion.h3 {...up(0.1)} style={{ 
                fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
                fontWeight: 800, 
                letterSpacing: '-1px', 
                color: 'var(--text-primary)', 
                marginBottom: 20, 
                lineHeight: 1.1 
              }}>
                Let's build <br/> something great.
              </motion.h3>
              <motion.p {...up(0.15)} style={{ 
                fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 48 
              }}>
                I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
              </motion.p>

              <motion.div {...up(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
                {[
                  { icon: <Mail size={18} />,   val: email, label: 'Email' },
                  { icon: <Phone size={18} />,  val: phone, label: 'Phone' },
                  { icon: <MapPin size={18} />, val: location, label: 'Location' },
                ].map(({ icon, val, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="contact-item">
                    <div style={{ 
                      width: 44, height: 44, borderRadius: '50%', 
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-primary)', transition: 'all 0.3s'
                    }} className="contact-icon-box">
                      {icon}
                    </div>
                    <div>
                      <p className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>{val}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div {...up(0.25)} style={{ display: 'flex', gap: 16 }}>
                {[
                  { icon: <FaGithub size={20} />,   href: links.github,   label: 'GitHub' },
                  { icon: <FaLinkedin size={20} />,  href: links.linkedin, label: 'LinkedIn' },
                ].map(({ icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    style={{
                      width: 48, height: 48, borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)', transition: 'all 0.3s',
                    }}
                    className="social-btn"
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* ── Right Side: Form ── */}
            <motion.form {...up(0.15)} ref={formRef} onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 10 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-row">
                <div className="input-group">
                  <label htmlFor="name" className="mono">Name</label>
                  <input id="name" name="name" type="text" required placeholder="John Doe" className="premium-input" />
                </div>
                <div className="input-group">
                  <label htmlFor="email" className="mono">Email</label>
                  <input id="email" name="email" type="email" required placeholder="john@example.com" className="premium-input" />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="subject" className="mono">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="Project Inquiry" className="premium-input" />
              </div>

              <div className="input-group">
                <label htmlFor="message" className="mono">Message</label>
                <textarea id="message" name="message" rows={5} required placeholder="Hello Irshad, I'd like to talk about..." 
                  className="premium-input" style={{ resize: 'vertical', minHeight: 120 }} 
                />
              </div>

              <button type="submit" disabled={state === 'loading' || state === 'success'}
                style={{
                  marginTop: 10,
                  padding: '16px 32px', borderRadius: 12,
                  border: state === 'success' ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.8)',
                  background: state === 'success' ? 'rgba(34,197,94,0.1)' : '#fff',
                  color: state === 'success' ? '#4ade80' : '#000',
                  fontSize: '1rem', fontWeight: 700, cursor: state === 'loading' ? 'wait' : 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  boxShadow: state === 'success' ? '0 0 20px rgba(34,197,94,0.2)' : '0 4px 14px rgba(255,255,255,0.1)'
                }}
                className="submit-btn"
              >
                {state === 'idle'    && <><Send size={18} /> Send Message</>}
                {state === 'loading' && 'Sending...'}
                {state === 'success' && <><CheckCircle2 size={20} /> Message Sent Successfully</>}
                {state === 'error'   && 'Failed — try again'}
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      <style>{`
        /* Contact Item Hover */
        .contact-item:hover .contact-icon-box {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.3) !important;
          color: #fff !important;
          transform: translateY(-2px);
        }

        /* Social Button Hover */
        .social-btn:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.4) !important;
          color: #fff !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* Submit Button Hover */
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.2) !important;
          background: #f0f0f0 !important;
        }

        /* Form Inputs */
        .input-group label {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 8px;
          margin-left: 4px;
        }
        
        .premium-input {
          width: 100%;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px 20px;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          outline: none;
        }
        
        .premium-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        
        .premium-input:focus {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 0 0 4px rgba(255,255,255,0.05);
        }

        @media (max-width: 960px) {
          .contact-box { padding: 40px 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
