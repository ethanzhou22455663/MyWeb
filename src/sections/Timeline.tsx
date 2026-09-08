import SectionTitle from '../components/ui/SectionTitle';
import { timeline } from '../content/timeline';

/**
 * 发展历程：每年一行——左边文字块（年份/标题/简介），右边一条胶卷（齿孔 + 四格片格）
 * 年份之间通栏细线分隔（无卡片无底色）
 * 数据在 src/content/timeline.ts 改（photos / caption 都可留空）
 */
export default function Timeline() {
  return (
    <section id="timeline" className="section-shell py-24">
      <SectionTitle eyebrow="TIMELINE" title="发展历程（占位，随时改）" />

      <div className="border-b border-white/10">
        {timeline.map((item) => (
          <div
            key={item.year}
            className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:gap-10 md:py-10"
          >
            {/* 文字块：定宽，照片铺满余下整行 */}
            <div className="shrink-0 md:w-60">
              <h3 className="font-display text-4xl font-bold leading-none text-white md:text-5xl">
                {item.year}
              </h3>
              <p className="mt-3 font-medium text-white">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              )}
            </div>

            {/* 照片：胶卷条，上下齿孔 + 四格片格 */}
            {item.photos && item.photos.length > 0 && (
              <div className="min-w-0 flex-1 overflow-hidden rounded-sm border border-white/10 bg-[#101014]">
                <div className="sprocket-row" aria-hidden="true" />
                <div className="grid grid-cols-4 gap-2 p-2 md:gap-3 md:p-3">
                  {item.photos.map((photo, i) => (
                    <figure key={`${photo.src}-${i}`} className="group min-w-0">
                      <img
                        src={photo.src}
                        alt={photo.caption ?? item.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
                <div className="sprocket-row" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
