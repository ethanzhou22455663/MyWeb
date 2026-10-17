// 蛋糕蜡烛：DOM/CSS 绘制；吹灭统一入口 extinguishNext()
// 麦克风吹气和手指点蜡烛都汇聚到这里

import { $ } from './util.js';

export function initCake(cfg, { onOneOut, onAllOut }) {
  const box = $('#candles');
  const count = cfg?.candles?.count || 5;
  const candles = [];

  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'candle';
    c.style.left = `${(i + 0.5) * (100 / count)}%`;
    c.innerHTML = '<div class="smoke"></div><div class="flame"></div><div class="wick"></div><div class="body"></div>';
    c.addEventListener('pointerdown', () => extinguishNext());
    box.appendChild(c);
    candles.push(c);
  }

  let outCount = 0;
  let done = false;

  function extinguishNext() {
    const next = candles.find((c) => !c.classList.contains('out'));
    if (!next || done) return;
    next.classList.add('out');
    outCount++;
    onOneOut?.(outCount, count);
    if (outCount >= count) {
      done = true;
      onAllOut?.();
    }
  }

  // ?celebrate=1 预览：全部瞬间熄灭，不触发回调
  function extinguishAllSilently() {
    done = true;
    candles.forEach((c) => c.classList.add('out'));
  }

  return { extinguishNext, extinguishAllSilently };
}
