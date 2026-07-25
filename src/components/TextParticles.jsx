import { useEffect, useRef } from 'react';

/**
 * Renders "Irshad Alam" as centered particles.
 * Particles spring from random positions → form the name.
 * Mouse hover repels · Click bursts outward then springs back.
 */
export default function TextParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let mouse = { x: -9999, y: -9999, radius: 120 };
    let raf;
    let alive = true;

    const setup = async () => {
      await document.fonts.ready;

      const parent = canvas.parentElement;
      const W = Math.floor(parent?.offsetWidth ?? 900);
      const H = 160; // only the name, no subtitle

      canvas.width  = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);

      /* ── Offscreen: render centered name ── */
      const off   = document.createElement('canvas');
      off.width   = W;
      off.height  = H;
      const oCtx  = off.getContext('2d');

      const fs = Math.min(Math.floor(W * 0.145), 124);

      oCtx.clearRect(0, 0, W, H);
      oCtx.fillStyle    = '#ffffff';
      oCtx.font         = `900 ${fs}px Inter, sans-serif`;
      oCtx.textAlign    = 'center';
      oCtx.textBaseline = 'middle';
      oCtx.fillText('Irshad Alam', W / 2, H / 2);

      /* ── Sample filled pixels ── */
      const { data } = oCtx.getImageData(0, 0, W, H);
      const gap = 4;
      particles = [];

      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          const a = data[(y * W + x) * 4 + 3];
          if (a > 80) {
            const br = data[(y * W + x) * 4] / 255;
            particles.push({
              // Start scattered randomly
              x: (Math.random() - 0.5) * W * 2.5,
              y: (Math.random() - 0.5) * H  * 5,
              tx: x,
              ty: y,
              vx: 0, vy: 0,
              size:  br > 0.5 ? 1.5 : 1.1,
              alpha: br > 0.5 ? 0.95 : 0.5,
            });
          }
        }
      }
    };

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const onBurst = e => {
      const r  = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      for (const p of particles) {
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.hypot(dx, dy) || 1;
        if (d < 220) {
          const f = ((220 - d) / 220) * 16;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click', onBurst);

    const animate = () => {
      if (!alive) return;
      raf = requestAnimationFrame(animate);

      const Wc = canvas.width / DPR;
      const Hc = canvas.height / DPR;
      ctx.clearRect(0, 0, Wc, Hc);

      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d  = Math.hypot(dx, dy) || 1;
        if (d < mouse.radius) {
          const f = ((mouse.radius - d) / mouse.radius) ** 1.8 * 8;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.tx - p.x) * 0.075;
        p.vy += (p.ty - p.y) * 0.075;
        p.vx *= 0.80;
        p.vy *= 0.80;
        p.x  += p.vx;
        p.y  += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }
    };

    setup().then(() => { if (alive) animate(); });

    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      setup().then(() => {});
    };
    window.addEventListener('resize', onResize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click', onBurst);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', cursor: 'crosshair', touchAction: 'none', width: '100%' }}
      aria-label="Irshad Alam"
    />
  );
}
