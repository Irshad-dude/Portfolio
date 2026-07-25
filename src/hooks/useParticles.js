import { useEffect, useRef } from 'react';

export const useParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -9999, y: -9999, radius: 160 };
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      spawn();
    };

    const onMove  = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const onBurst = e => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 220) {
          const force = ((220 - dist) / 220) * 12;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onBurst);

    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 0.8; // slightly larger dots
        // More visible — alpha range 0.25 → 0.75
        this.alpha = Math.random() * 0.5 + 0.25;
      }

      update() {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < mouse.radius) {
          const f = ((mouse.radius - dist) / mouse.radius) ** 2 * 6;
          this.vx += (dx / dist) * f;
          this.vy += (dy / dist) * f;
        }
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.vx += (this.baseX - this.x) * 0.001;
        this.vy += (this.baseY - this.y) * 0.001;
        this.baseX += (Math.random() - 0.5) * 0.25;
        this.baseY += (Math.random() - 0.5) * 0.25;
        this.baseX = Math.max(0, Math.min(canvas.width,  this.baseX));
        this.baseY = Math.max(0, Math.min(canvas.height, this.baseY));
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width  + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
      }

      draw() {
        // Glow: soft halo behind each dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.alpha * 0.08})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.fill();
      }
    }

    const spawn = () => {
      // More particles: ~150 on desktop
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 7500), 160);
      particles = Array.from({ length: count }, () => new Particle());
    };

    const connect = () => {
      const maxDist = 160; // longer reach so more connections visible
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < maxDist) {
            // More visible lines: up to 0.22 opacity
            const alpha = (1 - d / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      connect();
      for (const p of particles) { p.update(); p.draw(); }
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onBurst);
      cancelAnimationFrame(raf);
    };
  }, []);

  return canvasRef;
};
