// 抽签运势：摇签筒动画 → 结果面板；不管怎么抽，全部拉满

import { $, pick, reducedMotion } from './util.js';

export function initFortune(cfg) {
  const f = cfg?.fortune || {};
  const btn = $('#fortuneBtn');
  const btnLabel = $('#fortuneBtnLabel');
  const giftImg = $('#fortuneGift');
  const result = $('#fortuneResult');
  const flavorEl = $('#flavorLine');
  const shakeText = $('#shakeText');
  const rowsBox = $('#dimRows');

  // 预渲染全部维度行
  const dims = f.dimensions || [];
  rowsBox.innerHTML = dims.map((d) => `
    <div class="dim-row">
      <img class="dim-icon" src="./assets/icon-${d.icon}.webp" alt="">
      <div class="dim-name">${d.name}</div>
      <div class="dim-desc">${d.desc}</div>
      <div class="dim-bar"><i></i></div>
      <div class="dim-value">${d.value}</div>
    </div>
  `).join('');
  const rows = [...rowsBox.querySelectorAll('.dim-row')];

  let drawn = false;

  function draw() {
    if (btn.dataset.busy) return;
    btn.dataset.busy = '1';

    // 重置：进度条归零（无动画）、数值隐藏
    rows.forEach((row) => {
      const fill = row.querySelector('.dim-bar i');
      const val = row.querySelector('.dim-value');
      fill.style.transition = 'none';
      fill.style.width = '0%';
      val.classList.remove('show');
      row.classList.remove('show');
    });

    if (drawn) {
      // 再抽一次：面板已经在，重播充能动画
      requestAnimationFrame(() => requestAnimationFrame(animateRows));
      flavorEl.textContent = pick(f.flavorLines || []);
    } else {
      // 第一次：摇签筒 1.2s 后揭晓
      btn.classList.add('shaking');
      shakeText.hidden = false;
      btnLabel.hidden = true;
      setTimeout(() => {
        btn.classList.remove('shaking');
        shakeText.hidden = true;
        btnLabel.hidden = false;
        btnLabel.textContent = f.redrawLabel || '再抽一次';
        result.hidden = false;
        flavorEl.textContent = pick(f.flavorLines || []);
        if (reducedMotion) {
          rows.forEach((row) => {
            row.querySelector('.dim-bar i').style.width = '100%';
            row.querySelector('.dim-value').classList.add('show');
          });
        } else {
          animateRows();
        }
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
        drawn = true;
        delete btn.dataset.busy;
      }, reducedMotion ? 100 : 1200);
      return;
    }
    delete btn.dataset.busy;
  }

  function animateRows() {
    rows.forEach((row, i) => {
      const fill = row.querySelector('.dim-bar i');
      const val = row.querySelector('.dim-value');
      setTimeout(() => {
        fill.style.transition = 'width .9s cubic-bezier(.22,1,.36,1)';
        fill.style.width = '100%';
        row.classList.add('show');
        setTimeout(() => val.classList.add('show'), 700);
      }, i * 130);
    });
  }

  btn.addEventListener('click', draw);
}
