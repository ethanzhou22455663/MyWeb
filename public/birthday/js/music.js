// 背景音乐：WebAudio 合成《生日快乐歌》，无音频文件
// 只在点击按钮时创建/恢复 AudioContext（自动播放策略）

import { $ } from './util.js';

const BEAT = 0.6; // 100bpm
// [MIDI 音高, 拍数] —— 生日快乐歌 C 调四句
const MELODY = [
  [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
  [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
  [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 2],
  [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 2],
];
const midiToFreq = (m) => 440 * 2 ** ((m - 69) / 12);

export function initMusic(cfg) {
  const btn = $('#musicBtn');
  const img = btn.querySelector('img');
  let ctx = null;
  let playing = false;
  let loopTimer = null;

  const total = MELODY.reduce((s, [, b]) => s + b, 0) * BEAT;

  function playLine() {
    if (!playing || !ctx) return;
    let t = ctx.currentTime + 0.05;
    const master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    for (const [midi, beats] of MELODY) {
      const dur = beats * BEAT;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = midiToFreq(midi);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02);          // attack
      gain.gain.setValueAtTime(0.16, t + dur * 0.7);              // hold
      gain.gain.linearRampToValueAtTime(0, t + dur * 0.95);       // release
      osc.connect(gain).connect(master);
      osc.start(t);
      osc.stop(t + dur);
      t += dur;
    }
    loopTimer = setTimeout(playLine, total * 1000 + 500);         // 循环
  }

  function start() {
    ctx = new AudioContext();
    ctx.resume().catch(() => {});
    playing = true;
    playLine();
    btn.classList.remove('off', 'pulse');
    btn.title = cfg?.music?.offTitle || '安静一会儿';
    img.style.opacity = '1';
  }

  function stop() {
    playing = false;
    clearTimeout(loopTimer);
    ctx?.close().catch(() => {});
    ctx = null;
    btn.classList.add('off');
    btn.title = cfg?.music?.onTitle || '放一首生日歌';
    img.style.opacity = '';
  }

  btn.addEventListener('click', () => (playing ? stop() : start()));

  // 庆祝高潮后轻推一下：提示可以开音乐
  function pulse() {
    if (!playing) btn.classList.add('pulse');
  }

  return { pulse };
}
