// 抽签运势：摇签筒动画 → 结果面板；不管怎么抽，全部拉满
// 结果行逐条出场：先亮行，再长条拉到底，最后数值弹出来

import { $, pick, reducedMotion } from './util.js';

const ROW_STAGGER = 420;   // 每行间隔 ms（一个个出来）
const FILL_MS = 700;       // 长条拉到底的时长

export function initFortune(cfg) {
  const f = cfg?.fortune || {};
  const btn = $('#fortuneBtn');
  const btnLabel = $('#fortuneBtnLabel');
  const result = $('#fortuneResult');
  const flavorEl = $('#flavorLine');
  const shakeText = $('#shakeText');
  const rowsBox = $('#dimRows');

  // 预渲染全部维度行
  const dims = f.dimensions || [];
  rowsBox.innerHTML = dims.map((d) => `
    <div class="dim-row">
      <div class="dim-top">
        <img class="dim-icon" src="./assets/icon-${d.icon}.webp" alt="">
        <span class="dim-name">${d.name}</span>
        <span class="dim-value">${d.value}</span>
      </div>
      <div class="dim-desc">${d.desc}</div>
      <div class="dim-bar"><i></i></div>
    </div>
  `).join('');
  const rows = [...rowsBox.querySelectorAll('.dim-row')];

  let drawn = false;
  let gen = 0; // 重抽时作废上一轮的动画定时器

  function animateRows() {
    const myGen = gen;
    rows.forEach((row, i) => {
      setTimeout(() => {
        if (myGen !== gen) return;
        row.classList.add('show');
        const fill = row.querySelector('.dim-bar i');
        const val = row.querySelector('.dim-value');
        fill.style.transition = ''; // 恢复 CSS 过渡
        requestAnimationFrame(() => { fill.style.width = '100%'; });
        setTimeout(() => { if (myGen === gen) val.classList.add('show'); }, FILL_MS);
      }, i * ROW_STAGGER);
    });
  }

  function resetRows() {
    gen++;
    rows.forEach((row) => {
      const fill = row.querySelector('.dim-bar i');
      const val = row.querySelector('.dim-value');
      fill.style.transition = 'none';
      fill.style.width = '0%';
      val.classList.remove('show');
      row.classList.remove('show');
    });
  }

  function draw() {
    if (btn.dataset.busy) return;
    btn.dataset.busy = '1';
    resetRows();

    if (drawn) {
      // 再抽一次：重播充能动画
      flavorEl.textContent = pick(f.flavorLines || []);
      requestAnimationFrame(() => requestAnimationFrame(animateRows));
      delete btn.dataset.busy;
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
            row.classList.add('show');
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
    }
  }

  btn.addEventListener('click', draw);
}
