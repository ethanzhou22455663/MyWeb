import type { ReactNode } from 'react';
import Reveal from './Reveal';

/**
 * 追番 / 游戏板块的共用组件：分段小标题 SubLabel、精选海报条 BestPicks、双栏清单 MediaGrid
 * 三个板块（Anime / Games）从这里取，样式只改这一处
 * （入场动画也在这统一接：海报条按张交错、清单行按左右格交错）
 */

// 通用小标题（精选海报这类分段标）：大号加粗粉色，突出分段；上下对称留白
export function SubLabel({ children }: { children: ReactNode }) {
  return (
    <Reveal as="h4" variant="up" className="mb-8 mt-8 text-center font-display text-lg font-bold uppercase tracking-[0.15em] text-accent">
      {children}
    </Reveal>
  );
}

// 精选竖版海报条：一排 2:3 竖版封面，卡片列表之上；cover 留空显示粉色占位
// flex 均分：不管 4 张还是 5 张都单行撑满左右两边（不再靠左留白）；
// 窄屏自动换行，末行同样顶满；标题在海报下方，居中粉色
export function BestPicks({
  items,
}: {
  items: { title: string; cover?: string }[];
}) {
  return (
    <div className="mb-10 flex flex-wrap gap-6">
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          variant="up"
          delay={Math.floor(i / 5) * 60}
          className="group min-w-36 flex-1"
        >
          <div className="card-hover aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {item.cover ? (
              <img
                src={item.cover}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-2 text-center font-display text-sm font-bold text-accent/25">
                {item.title}
              </div>
            )}
          </div>

          {/* 海报下方：居中白色标题 */}
          <h5 className="mt-3 text-center text-base font-semibold text-white">
            {item.title}
          </h5>
        </Reveal>
      ))}
    </div>
  );
}

// 追番 / 游戏共用的清单行：无卡片无封面，标题 + 右侧类型徽章（统一粉色）
// odd 列右侧留白当栏距，细线通栏不断
function MediaRow({ title, tag, index }: { title: string; tag?: string; index: number }) {
  return (
    <Reveal
      variant="up"
      delay={Math.floor(index / 2) * 60}
      className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition-colors duration-300 hover:bg-white/[0.02] md:odd:pr-12"
    >
      <h4 className="min-w-0 truncate font-medium text-white transition-colors duration-300 group-hover:text-accent">
        {title}
      </h4>

      {/* 类型徽章：只保留粉色一款；数据没填 tag 则不显示 */}
      {tag && (
        <span className="flex-shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {tag}
        </span>
      )}
    </Reveal>
  );
}

// 双栏清单容器：上下通栏细线，行内左右两格（奇数项时末行只占左格）
export function MediaGrid({
  items,
  className = '',
}: {
  items: { title: string; tag?: string }[];
  className?: string;
}) {
  return (
    <div className={`border-b border-white/10 ${className}`}>
      <div className="grid grid-cols-1 border-t border-white/10 md:grid-cols-2">
        {items.map((item, i) => (
          <MediaRow key={item.title} title={item.title} tag={item.tag} index={i} />
        ))}
      </div>
    </div>
  );
}
