// 抽奖小商店：代币抽奖 → 购物袋 → 结账清单
// 模型很简单：按稀有度权重先抽档位，再在档内均匀挑一件；奖品可重复，购物袋按名字叠数量
// 所有文案/奖品/概率都在 config.js 的 shop 里改

import { $, pick } from './util.js';

export function initShop(cfg, bg) {
  const s = cfg?.shop || {};
  const shelfEl = $('#shopShelf');
  const tokenEl = $('#tokenCount');
  const bagEl = $('#bagList');
  const bagEmptyEl = $('#bagEmpty');
  const drawOverlay = $('#drawOverlay');
  const cardsEl = $('#drawCards');
  const checkoutOverlay = $('#checkoutOverlay');
  const receiptEl = $('#receiptList');
  const draw1Btn = $('#draw1Btn');
  const draw5Btn = $('#draw5Btn');

  let tokens = s.startTokens || 10;
  const bag = new Map(); // 奖品名 → 数量

  const rarities = s.rarities || [];
  const totalWeight = rarities.reduce((sum, r) => sum + r.weight, 0);
  const rarityLabel = Object.fromEntries(rarities.map((r) => [r.key, r.label]));
  const items = s.items || [];
  const groups = Object.fromEntries(rarities.map((r) => [r.key, items.filter((it) => it.rarity === r.key)]));

  // 抽一件：先按权重抽档位，档内均匀
  function pickOne() {
    let roll = Math.random() * totalWeight;
    for (const r of rarities) {
      roll -= r.weight;
      if (roll < 0) {
        const g = groups[r.key];
        return (g && g.length) ? pick(g) : null;
      }
    }
    return pick(items) || null;
  }

  // ---- 货架：奖品全可见，带稀有度标 ----
  shelfEl.innerHTML = items.map((it) => `
    <div class="shelf-item r-${it.rarity}">
      <img src="./assets/icon-${it.icon}.webp" alt="">
      <div class="si-name">${it.name}</div>
      ${it.desc ? `<div class="si-desc">${it.desc}</div>` : ''}
      <span class="si-tag">${rarityLabel[it.rarity] || it.rarity}</span>
    </div>
  `).join('');

  function renderTokens() {
    tokenEl.textContent = `${s.tokensLabel || '代币'} × ${tokens}`;
    draw1Btn.disabled = tokens < 1;
    draw5Btn.disabled = tokens < 5;
  }

  function renderBag() {
    bagEmptyEl.hidden = bag.size > 0;
    bagEl.innerHTML = [...bag.entries()].map(([name, n]) => {
      const it = items.find((i) => i.name === name) || {};
      return `
        <div class="bag-chip r-${it.rarity || 'N'}">
          <img src="./assets/icon-${it.icon || 'gift'}.webp" alt="">
          <span>${name}</span>
          ${n > 1 ? `<b>×${n}</b>` : ''}
        </div>
      `;
    }).join('');
  }

  // ---- 抽奖：结果卡逐张弹进浮层；SSR 来一发全屏庆祝 ----
  function doDraw(n) {
    if (tokens < n || !drawOverlay.hidden) return;
    tokens -= n;

    const results = [];
    for (let i = 0; i < n; i++) {
      const it = pickOne();
      if (!it) break;
      results.push(it);
      bag.set(it.name, (bag.get(it.name) || 0) + 1);
    }
    if (!results.length) { renderTokens(); return; }

    cardsEl.innerHTML = results.map((it, i) => `
      <div class="draw-card r-${it.rarity}" style="animation-delay:${i * 240}ms">
        <img src="./assets/icon-${it.icon}.webp" alt="">
        <div class="dc-name">${it.name}</div>
        <span class="si-tag">${rarityLabel[it.rarity] || it.rarity}</span>
      </div>
    `).join('');

    renderTokens();
    renderBag();
    drawOverlay.hidden = false;

    // 史诗来一发全屏庆祝，稀有一朵小烟花
    const top = results.some((it) => it.rarity === 'SR');
    const mid = results.some((it) => it.rarity === 'R');
    if (top) setTimeout(() => bg.celebrate(), 600);
    else if (mid) setTimeout(() => bg.burst(window.innerWidth / 2, window.innerHeight / 3, 40), 600);
  }

  // ---- 结账：把购物袋打成一张礼物清单小票 ----
  function checkout() {
    if (!bag.size) {
      bagEmptyEl.hidden = false;
      bagEmptyEl.classList.remove('shake-x');
      requestAnimationFrame(() => bagEmptyEl.classList.add('shake-x'));
      return;
    }
    receiptEl.innerHTML = [...bag.entries()].map(([name, n]) => {
      const it = items.find((i) => i.name === name) || {};
      return `
        <div class="receipt-row">
          <img src="./assets/icon-${it.icon || 'gift'}.webp" alt="">
          <span class="rr-name">${name}</span>
          <span class="rr-n">× ${n}</span>
        </div>
      `;
    }).join('');
    checkoutOverlay.hidden = false;
  }

  // ---- 重置：清空购物袋，代币回到初始数 ----
  function reset() {
    if (bag.size && !confirm(s.resetText || '确定重置吗？')) return;
    tokens = s.startTokens || 10;
    bag.clear();
    renderTokens();
    renderBag();
  }

  draw1Btn.addEventListener('click', () => doDraw(1));
  draw5Btn.addEventListener('click', () => doDraw(5));
  $('#shopReset').addEventListener('click', reset);
  $('#shopCheckout').addEventListener('click', checkout);
  $('#drawClose').addEventListener('click', () => { drawOverlay.hidden = true; });
  $('#checkoutClose').addEventListener('click', () => { checkoutOverlay.hidden = true; });
  // 点浮层空白处也能关
  drawOverlay.addEventListener('click', (e) => { if (e.target === drawOverlay) drawOverlay.hidden = true; });
  checkoutOverlay.addEventListener('click', (e) => { if (e.target === checkoutOverlay) checkoutOverlay.hidden = true; });

  draw1Btn.textContent = s.draw1Label || '抽一次';
  draw5Btn.textContent = s.draw5Label || '五连抽';
  $('#shopCheckout').textContent = s.checkoutLabel || '结账';

  renderTokens();
  renderBag();
}
