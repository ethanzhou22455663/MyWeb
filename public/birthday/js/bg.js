// 背景动画：奶油派对彩带飘落 + burst()/celebrate() 供其它模块调用
// 单 canvas 单 rAF 循环；reduced-motion 时静止

import { $, rand, reducedMotion, isSmall } from './util.js';

const PALETTE = ['#f7a1c0', '#ffb86b', '#9ad5c8', '#b7a5f6', '#ffe082', '#f88'];
const COUNT = isSmall() ? 40 : 70;

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

  function spawn(anywhere) {
    return {
      x: rand(0, W),
      y: anywhere ? rand(0, H) : -14,
      w: rand(5, 11), h: rand(8, 16),
      vy: rand(0.6, 1.8),
      ph: rand(0, Math.PI * 2),
      spin: rand(0, Math.PI * 2),
      vspin: rand(-0.06, 0.06),
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
      round: Math.random() < 0.3,
    };
  }

  const bits = Array.from({ length: COUNT }, () => spawn(true));
  const pops = []; // burst 爆出的纸屑

  // 在 (x,y) 炸开一小蓬纸屑
  function burst(x, y, n = 26) {
    if (reducedMotion) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = rand(1, 4.2);
      pops.push({
        x, y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.2,
        w: rand(4, 9), h: rand(6, 12),
        life: 1, decay: rand(0.015, 0.03),
        spin: rand(0, Math.PI * 2), vspin: rand(-0.15, 0.15),
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
        round: Math.random() < 0.4,
      });
    }
  }

  // 庆祝高潮：多点连环喷彩带
  function celebrate() {
    if (reducedMotion) return;
    let i = 0;
    const timer = setInterval(() => {
      burst(rand(W * 0.12, W * 0.88), rand(H * 0.15, H * 0.45), 34);
      if (++i >= 6) clearInterval(timer);
    }, 260);
  }

  if (reducedMotion) {
    // 静态：撒一地彩带
    ctx.globalAlpha = 0.5;
    for (const b of bits) drawBit(ctx, b, 0);
    return { burst: () => {}, celebrate: () => {} };
  }

  function drawBit(ctx2, b, t) {
    ctx2.save();
    ctx2.translate(b.x, b.y);
    ctx2.rotate(b.spin);
    ctx2.fillStyle = b.color;
    ctx2.globalAlpha = 0.85;
    if (b.round) { ctx2.beginPath(); ctx2.arc(0, 0, b.w * 0.6, 0, 7); ctx2.fill(); }
    else ctx2.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * (0.6 + 0.4 * Math.abs(Math.sin(t * 3 + b.ph))));
    ctx2.restore();
  }

  let t = 0, last = performance.now(), hidden = false;

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

    // 持续飘落的环境彩带
    for (let i = 0; i < bits.length; i++) {
      const b = bits[i];
      b.y += b.vy * dt;
      b.x += Math.sin(t * 2 + b.ph) * 0.7 * dt;
      b.spin += b.vspin * dt;
      if (b.y > H + 16) bits[i] = spawn(false);
      drawBit(ctx, b, t);
    }

    // burst 出的纸屑
    for (let i = pops.length - 1; i >= 0; i--) {
      const p = pops[i];
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += 0.09 * dt; p.vx *= 0.985;
      p.spin += p.vspin * dt;
      p.life -= p.decay * dt;
      if (p.life <= 0) { pops.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.globalAlpha = Math.min(p.life * 1.5, 1);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(frame);

  return { burst, celebrate };
}
