import { useState } from 'react';
import type { PetMedia } from '../../content/life';

/**
 * 竖版图片/视频画廊：左右箭头切换 + 底部圆点，循环翻阅
 * - 没填 src 的项显示粉色文字占位
 * - type: 'video' 时渲染 <video controls>，否则 <img>
 * 每个宠物一份，各自独立翻页
 */
export default function PetGallery({ media }: { media: PetMedia[] }) {
  const [index, setIndex] = useState(0);
  const total = media.length;
  const current = media[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div>
      {/* 竖版画布 3:4 */}
      <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-accent/5">
        {current.src ? (
          current.type === 'video' ? (
            <video
              key={current.src}
              src={current.src}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              key={current.src}
              src={current.src}
              alt={current.caption ?? ''}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          // 占位：粉色序号字
          <div className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-accent/20">
            {String(index + 1).padStart(2, '0')}
          </div>
        )}

        {/* 左箭头 */}
        <button
          onClick={prev}
          aria-label="上一张"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 opacity-0 backdrop-blur transition-all duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
        >
          ‹
        </button>
        {/* 右箭头 */}
        <button
          onClick={next}
          aria-label="下一张"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 opacity-0 backdrop-blur transition-all duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
        >
          ›
        </button>

        {/* 序号角标 */}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-0.5 font-display text-xs text-white/70 backdrop-blur">
          {index + 1} / {total}
        </span>
      </div>

      {/* 底部圆点 */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {media.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`第 ${i + 1} 张`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-5 bg-accent' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
