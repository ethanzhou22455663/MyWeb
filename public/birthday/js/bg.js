// 背景动画：深空星星 + 烟花（自喷）+ burst()/celebrate() 供其它模块调用
// 单 canvas 单 rAF 循环；reduced-motion 时只画静态星星

import { $, rand, reducedMotion, isSmall } from './util.js';

const PALETTE = ['#E9A5C2', '#ffd9a0', '#ffffff', '#f6a5c9', '#ffe9c4', '#b8a5f6'];
const MAX_SPARKS = isSmall() ? 260 : 420;

export function initBg() {
  const cv = $('#bg');
  const ctx = cv.getContext('2d');
  let W = 0, H = 0;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  fit();
  addEventListener('resize', fit);

  // 静态星星
  const stars = Array.from({ length: 90 }, () => ({
    x: Math.random(), y: Math.random() * 0.75,
    r: rand(0.3, 1.5), tw: rand(0, Math.PI * 2),
  }));

  const rockets = [];
  const sparks = [];

  function spawnRocket() {
    rockets.push({
      x: W * rand(0.15, 0.85), y: H + 10,
      vy: -(H * rand(0.009, 0.013)),
      targetY: H * rand(0.14, 0.42),
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
    });
  }

  // 在 (x,y) 炸开 n 个火花
  function burst(x, y, color, n = 42) {
    if (reducedMotion) return;
    for (let i = 0; i < n && sparks.length < MAX_SPARKS; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = rand(0.6, 4);
      sparks.push({
        x, y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: 1, decay: rand(0.012, 0.026),
        color: Math.random() < 0.7 ? color : PALETTE[(Math.random() * PALETTE.length) | 0],
        r: rand(0.8, 2.4),
      });
    }
  }

  // 庆祝高潮：多点连环炸
  function celebrate() {
    if (reducedMotion) return;
    let i = 0;
    const timer = setInterval(() => {
      burst(rand(W * 0.15, W * 0.85), rand(H * 0.12, H * 0.5), PALETTE[(Math.random() * PALETTE.length) | 0], 60);
      if (++i >= 6) clearInterval(timer);
    }, 260);
  }

  if (reducedMotion) {
    // 静态星空一帧
    ctx.fillStyle = '#fff';
    for (const s of stars) {
      ctx.globalAlpha = 0.4;
      ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, 7); ctx.fill();
    }
    return { burst: () => {}, celebrate: () => {} };
  }

  let t = 0, last = performance.now(), nextSpawn = 0, hidden = false;

  document.addEventListener('visibilitychange', () => {
    hidden = document.hidden;
    if (!hidden) last = performance.now();
  });

  function frame(now) {
    requestAnimationFrame(frame);
    if (hidden) return;
    const dt = Math.min((now - last) / 16.7, 3);
    last = now; t += dt;
    ctx.clearRect(0, 0, W, H);

    // 星星微闪
    for (const s of stars) {
      ctx.globalAlpha = 0.3 + 0.3 * Math.sin(t * 0.02 + s.tw);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 自动放烟花
    if (t > nextSpawn) { spawnRocket(); nextSpawn = t + rand(55, 150); }
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy * dt;
      ctx.fillStyle = r.color;
      ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.arc(r.x, r.y, 1.6, 0, 7); ctx.fill();
      ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.arc(r.x, r.y + 14, 1, 0, 7); ctx.fill();
      if (r.y <= r.targetY) { burst(r.x, r.y, r.color); rockets.splice(i, 1); }
    }

    // 火花
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += 0.028 * dt; p.vx *= 0.985; p.vy *= 0.985;
      p.life -= p.decay * dt;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life + 0.4, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(frame);

  return { burst, celebrate };
}
