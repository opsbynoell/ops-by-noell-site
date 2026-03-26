/**
 * FlowFieldCanvas — Ops by Noell brand particle field
 * Ported from the p5.js generative art system.
 * Runs as a full-bleed canvas background; all drawing is done in a
 * vanilla requestAnimationFrame loop so there are no extra dependencies.
 */

import { useEffect, useRef } from 'react';

// Simple seeded pseudo-random (mulberry32)
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seeded Perlin-style noise (simple value noise with smoothstep)
function createNoise(seed: number) {
  const rng = mulberry32(seed);
  const TABLE_SIZE = 256;
  const table: number[] = Array.from({ length: TABLE_SIZE }, () => rng() * Math.PI * 2);

  function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a: number, b: number, t: number) { return a + t * (b - a); }

  function noise2(x: number, y: number) {
    const xi = Math.floor(x) & (TABLE_SIZE - 1);
    const yi = Math.floor(y) & (TABLE_SIZE - 1);
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const a = table[(xi + table[yi]) & (TABLE_SIZE - 1)];
    const b = table[(xi + 1 + table[yi]) & (TABLE_SIZE - 1)];
    const c = table[(xi + table[(yi + 1) & (TABLE_SIZE - 1)]) & (TABLE_SIZE - 1)];
    const d = table[(xi + 1 + table[(yi + 1) & (TABLE_SIZE - 1)]) & (TABLE_SIZE - 1)];
    return lerp(lerp(Math.cos(a) * xf + Math.sin(a) * yf,
                     Math.cos(b) * (xf - 1) + Math.sin(b) * yf, u),
                lerp(Math.cos(c) * xf + Math.sin(c) * (yf - 1),
                     Math.cos(d) * (xf - 1) + Math.sin(d) * (yf - 1), u), v);
  }

  function noise3(x: number, y: number, z: number) {
    return noise2(x + z * 1.7, y + z * 2.3);
  }

  return { noise2, noise3 };
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

interface Particle {
  x: number;
  y: number;
  weight: number;
  offset: number;
}

const PARAMS = {
  seed: 2026,
  particleCount: 1800,
  flowSpeed: 1.0,
  noiseScale: 0.004,
  trailOpacity: 28,
  pulseIntensity: 4,
  colorPalette: ['#FF2D78', '#FF6B35', '#721DE1'] as string[],
};

export default function FlowFieldCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const rng = mulberry32(PARAMS.seed);
    const { noise3 } = createNoise(PARAMS.seed);

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    // Initialise particles
    const particles: Particle[] = [];
    function spawnParticle(): Particle {
      const angle = rng() * Math.PI * 2;
      const radius = rng() * (Math.min(W, H) * 0.48 - 20) + 20;
      return {
        x: W / 2 + Math.cos(angle) * radius,
        y: H / 2 + Math.sin(angle) * radius,
        weight: rng() * 1.4 + 0.4,
        offset: rng(),
      };
    }
    for (let i = 0; i < PARAMS.particleCount; i++) particles.push(spawnParticle());

    // Fill background once
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    let t = 0;

    function draw() {
      // Fade trail
      ctx.fillStyle = `rgba(10,10,10,${PARAMS.trailOpacity / 255})`;
      ctx.fillRect(0, 0, W, H);

      t += 0.003;

      const cx = W / 2;
      const cy = H / 2;

      for (let i = 0; i < particles.length; i++) {
        const part = particles[i];

        const nx = part.x * PARAMS.noiseScale;
        const ny = part.y * PARAMS.noiseScale;
        const angle = (noise3(nx, ny, t * 0.5) * 0.5 + 0.5) * Math.PI * 2 * 2.5;

        const dx = cx - part.x;
        const dy = cy - part.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pulse = Math.sin(t * 2 + dist * 0.008) * PARAMS.pulseIntensity;

        const vx = Math.cos(angle) * PARAMS.flowSpeed + (dx / dist) * pulse * 0.01;
        const vy = Math.sin(angle) * PARAMS.flowSpeed + (dy / dist) * pulse * 0.01;

        const px2 = part.x + vx;
        const py2 = part.y + vy;

        // Color interpolation
        const colorT = ((dist / (Math.min(W, H) * 0.5) + t * 0.1 + part.offset) % 1 + 1) % 1;
        const [r1, g1, b1] = hexToRgb(PARAMS.colorPalette[0]);
        const [r2, g2, b2] = hexToRgb(PARAMS.colorPalette[1]);
        const [r3, g3, b3] = hexToRgb(PARAMS.colorPalette[2]);

        let cr: number, cg: number, cb: number;
        if (colorT < 0.5) {
          const lt = colorT * 2;
          cr = r1 + (r2 - r1) * lt;
          cg = g1 + (g2 - g1) * lt;
          cb = b1 + (b2 - b1) * lt;
        } else {
          const lt = (colorT - 0.5) * 2;
          cr = r2 + (r3 - r2) * lt;
          cg = g2 + (g3 - g2) * lt;
          cb = b2 + (b3 - b2) * lt;
        }

        const alpha = (180 + Math.sin(t + part.offset * 10) * 60) / 255;
        ctx.strokeStyle = `rgba(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)},${alpha.toFixed(3)})`;
        ctx.lineWidth = part.weight;
        ctx.beginPath();
        ctx.moveTo(part.x, part.y);
        ctx.lineTo(px2, py2);
        ctx.stroke();

        part.x = px2;
        part.y = py2;

        // Respawn out-of-bounds or randomly
        if (part.x < 0 || part.x > W || part.y < 0 || part.y > H || rng() < 0.002) {
          const a = rng() * Math.PI * 2;
          const rad = rng() * (Math.min(W, H) * 0.48 - Math.min(W, H) * 0.1) + Math.min(W, H) * 0.1;
          part.x = W / 2 + Math.cos(a) * rad;
          part.y = H / 2 + Math.sin(a) * rad;
        }
      }

      // Center glow
      const glowSize = 80 + Math.sin(t * 1.5) * 20;
      const [pr, pg, pb] = hexToRgb(PARAMS.colorPalette[2]);
      for (let r = glowSize; r > 0; r -= 8) {
        const a = ((glowSize - r) / glowSize) * 12 / 255;
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${a.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    // Handle resize
    function handleResize() {
      const c = canvasRef.current;
      if (!c) return;
      W = c.offsetWidth;
      H = c.offsetHeight;
      c.width = W;
      c.height = H;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, W, H);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
