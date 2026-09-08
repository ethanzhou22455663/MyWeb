import SectionTitle from '../components/ui/SectionTitle';
import { timeline } from '../content/timeline';

/**
 * 发展历程：按年份分组的相册，年份之间通栏细线隔开（无卡片无底色）
 * 每年 = 大年份数字 + 标题/简介 + 三张照片
 * 数据在 src/content/timeline.ts 改（photos / caption 都可留空）
 */
export default function Timeline() {
  return (
    <section id="timeline" className="section-shell py-24">
      <SectionTitle eyebrow="TIMELINE" title="发展历程（占位，随时改）" />

      <div className="border-b border-white/10">
        {timeline.map((item) => (
          <div key={item.year} className="border-t border-white/10 py-10 md:py-12">
            {/* 年份 + 文字介绍 */}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="font-display text-5xl font-bold leading-none text-white md:text-6xl">
                {item.year}
              </span>
              <span className="text-lg font-medium text-white">{item.title}</span>
              {item.description && (
                <span className="w-full text-sm text-muted md:w-auto">{item.description}</span>
              )}
            </div>

            {/* 照片：每年三张 */}
            {item.photos && item.photos.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
                {item.photos.map((photo, i) => (
                  <figure key={`${photo.src}-${i}`} className="group min-w-0">
                    <img
                      src={photo.src}
                      alt={photo.caption ?? item.title}
                      className="aspect-[4/3] w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    {photo.caption && (
                      <figcaption className="mt-2 truncate font-mono text-xs text-muted">
                        {photo.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
