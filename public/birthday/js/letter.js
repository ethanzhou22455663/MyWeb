// 祝福信打字机：逐字显示，标点处多停顿；支持跳过

import { reducedMotion } from './util.js';

const PAUSE_CHARS = '。，！？…；：\n';

export function typeLetter(text, el, { speed = 45, onDone } = {}) {
  let timer = null;
  let i = 0;
  let doneFlag = false;

  function finish() {
    if (doneFlag) return;
    doneFlag = true;
    clearTimeout(timer);
    el.textContent = text;
    onDone?.();
  }

  if (reducedMotion) {
    finish();
    return { skip: finish };
  }

  function step() {
    if (doneFlag) return;
    if (i >= text.length) { finish(); return; }
    const ch = text[i];
    el.textContent += ch;
    i++;
    const extra = PAUSE_CHARS.includes(ch) ? speed * 3.5 : 0;
    timer = setTimeout(step, speed + extra);
  }
  step();

  return { skip: finish };
}
