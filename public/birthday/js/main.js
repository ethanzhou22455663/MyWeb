// 入口：读配置 → 绑文字 → 串起 吹蜡烛 → 庆祝 → 信 → 抽签 的流程

import { $ } from './util.js';
import { initBg } from './bg.js';
import { initCake } from './cake.js';
import { initBlow } from './blow.js';
import { typeLetter } from './letter.js';
import { initFortune } from './fortune.js';
import { initMusic } from './music.js';

const cfg = window.BIRTHDAY_CONFIG || {};

// ---- 把配置文字绑到 [data-cfg] 元素（支持 'fortune.buttonLabel' 点路径）----
const lookup = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);
document.querySelectorAll('[data-cfg]').forEach((el) => {
  const v = lookup(cfg, el.dataset.cfg);
  if (typeof v === 'string') el.textContent = v;
});
document.title = cfg.titleLine || '生日快乐 🎂';

const bg = initBg();
const music = initMusic(cfg);
initFortune(cfg);

// 麦克风的停止句柄由 blow.js 注入（蜡烛全灭时叫停录音）
let stopBlow = null;

// ---- 庆祝解锁：横幅 + 烟花高潮 + 打字机信 → 揭晓抽签 ----
let revealed = false;

function revealFortune() {
  if (revealed) return;
  revealed = true;
  $('#fortune').hidden = false;
}

function unlock() {
  stopBlow?.();               // 蜡烛全灭，麦克风可以下班了
  $('#blowZone').hidden = true;
  $('#celebrate').hidden = false;
  bg.celebrate();
  music.pulse();

  const skipBtn = $('#letterSkip');
  const typer = typeLetter(cfg.letter || '', $('#letterText'), {
    onDone: () => { skipBtn.hidden = true; revealFortune(); },
  });
  skipBtn.hidden = false;
  skipBtn.addEventListener('click', () => typer.skip(), { once: true });

  setTimeout(() => {
    $('#celebrate').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 350);
}

// ---- 蛋糕 + 吹蜡烛 ----
const cake = initCake(cfg, {
  onOneOut: (n) => {
    // 每吹灭一支，在蛋糕上方来一朵小烟花
    const rect = $('#cake').getBoundingClientRect();
    bg.burst(rect.left + rect.width / 2, rect.top + 20, 30);
  },
  onAllOut: () => unlock(),
});

initBlow(cfg, {
  onBlow: () => {
    cake.extinguishNext();
  },
  onStop: (fn) => { stopBlow = fn; },
});

// ---- ?celebrate=1 预览逃逸口：跳过吹蜡烛直看庆祝+信+抽签 ----
const forceParam = cfg?.debug?.forceCelebrateParam || 'celebrate';
if (new URLSearchParams(location.search).has(forceParam)) {
  cake.extinguishAllSilently();
  unlock();
}
