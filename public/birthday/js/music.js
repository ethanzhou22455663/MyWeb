// 背景音乐：WebAudio 合成八音盒版《生日快乐歌》，无音频文件
// 八音盒音色 = 起音极快 + 长余音自然衰减 + 基音/倍频泛音的铃片质感
// 只在用户点击时创建/恢复 AudioContext（自动播放策略）

import { $ } from './util.js';

const BEAT = 0.66; // 八音盒版慢一点，更温柔
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

  const RING = 1.7; // 单音余音秒数（八音盒的余韵，允许压过下一个音，叠出闪亮感）

  function playNote(midi, when, dur, master) {
    const f = midiToFreq(midi);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, when);
    env.gain.linearRampToValueAtTime(0.15, when + 0.006);       // 起音极快，像拨动铃片
    env.gain.exponentialRampToValueAtTime(0.0008, when + RING); // 纯衰减，不保持
    env.connect(master);
    // 基音 + 泛音：4 倍频给「金属铃」感，8 倍频给一点空气感
    for (const [mult, vol] of [[1, 1], [4, 0.2], [8, 0.05]]) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f * mult;
      g.gain.value = vol;
      osc.connect(g).connect(env);
      osc.start(when);
      osc.stop(when + RING + 0.1);
    }
  }

  function playLine() {
    if (!playing || !ctx) return;
    const master = ctx.createGain();
    master.gain.value = 0.42;
    master.connect(ctx.destination);
    let t = ctx.currentTime + 0.05;
    for (const [midi, beats] of MELODY) {
      playNote(midi, t, beats * BEAT, master);
      t += beats * BEAT;
    }
    const total = (t - ctx.currentTime - 0.05) * 1000;
    loopTimer = setTimeout(playLine, total + 900); // 循环（余音压着下一段开头，八音盒就是这样）
  }

  function start() {
    if (playing) return;
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

  return { pulse, start, get playing() { return playing; } };
}
