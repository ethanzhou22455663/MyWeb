// 麦克风吹气检测：只看能量（比环境噪声大一点就算吹气），门槛低好触发
// 点击按钮后才申请麦克风（满足 iOS 手势要求）；任何失败都降级为「点蜡烛」

import { $ } from './util.js';

export function initBlow(cfg, { onBlow, onStop }) {
  const btn = $('#blowBtn');
  const meter = $('#meter');
  const meterFill = $('#meterFill');
  const hint = $('#micHint');
  let running = false;

  function showTapHint(msg) {
    hint.textContent = msg || cfg?.candles?.micDenied || cfg?.candles?.hintTap || '';
    btn.hidden = true;
    meter.hidden = true;
  }

  async function start() {
    if (running) return;
    running = true;

    // 不支持 getUserMedia / 非安全上下文 → 直接降级
    if (!navigator.mediaDevices?.getUserMedia) {
      showTapHint();
      return;
    }

    let stream, ctx, analyser, timeBuf;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      ctx = new AudioContext();
      await ctx.resume();
      const source = ctx.createMediaStreamSource(stream);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      timeBuf = new Uint8Array(analyser.fftSize);
    } catch {
      showTapHint();
      running = false;
      return;
    }

    // 切换 UI：按钮 → 音量条 + 提示
    btn.hidden = true;
    meter.hidden = false;
    hint.textContent = cfg?.candles?.hintBlow || '';

    const rms = () => {
      analyser.getByteTimeDomainData(timeBuf);
      let sum = 0;
      for (let i = 0; i < timeBuf.length; i++) {
        const v = (timeBuf[i] - 128) / 128;
        sum += v * v;
      }
      return Math.sqrt(sum / timeBuf.length);
    };

    // 校准：前 600ms 采环境噪声
    let ambient = 0, samples = 0;
    const calibTimer = setInterval(() => {
      ambient += rms(); samples++;
    }, 50);
    setTimeout(() => {
      clearInterval(calibTimer);
      ambient = ambient / Math.max(samples, 1);
      // 门槛尽量低：稍微大声一点就算吹气
      const gate = Math.max(ambient * 1.6, 0.03);

      let streak = 0, cooling = false;
      const poll = setInterval(() => {
        const level = rms();
        // 音量条：gate 为 100%
        meterFill.style.transform = `scaleX(${Math.min(level / gate, 1.15)})`;
        meterFill.classList.toggle('hot', level > gate);

        if (cooling) {
          // 一口气结束后要求音量回落，防止长气一次吹光
          if (level < gate) cooling = false;
          return;
        }
        if (level > gate) {
          if (++streak >= 2) {   // 持续 ~100ms 判定为一次吹气
            streak = 0;
            cooling = true;
            onBlow();
          }
        } else {
          streak = 0;
        }
      }, 50);

      // 外部叫停（蜡烛全灭）→ 收拾干净
      onStop(() => {
        clearInterval(poll);
        stream.getTracks().forEach((t) => t.stop());
        ctx.close().catch(() => {});
        meter.hidden = true;
        running = false;
      });
    }, 800);
  }

  btn.addEventListener('click', start);
}
