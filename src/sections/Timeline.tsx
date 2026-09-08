import SectionTitle from '../components/ui/SectionTitle';
import { timeline } from '../content/timeline';

/**
 * 发展历程：按年份分组的相册
 * 每年一块：大年份数字 + 标题/简介 + 几张白框拍立得（微旋转，悬停转正）
 * 数据在 src/content/timeline.ts 改（photos / caption 都可留空）
 */
export default function Timeline() {
  return (
    <section id="timeline" className="section-shell py-24">
      <SectionTitle eyebrow="TIMELINE" title="发展历程（占位，随时改）" />

      <div className="space-y-20">
        {timeline.map((item) => (
          <div key={item.year}>
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

            {/* 照片：白框拍立得，交替微旋转 */}
            {item.photos && item.photos.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-5">
                {item.photos.map((photo, i) => (
                  <figure
                    key={photo.src}
                    className={`bg-white p-2 pb-7 transition-all duration-300 hover:rotate-0 hover:scale-[1.04] hover:shadow-[0_10px_40px_rgb(var(--c-accent)/0.25)] ${
                      i % 2 === 0 ? '-rotate-[1.5deg]' : 'rotate-[1.5deg]'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption ?? item.title}
                      className="aspect-[4/3] w-52 object-cover md:w-60"
                      loading="lazy"
                    />
                    {photo.caption && (
                      <figcaption className="mt-2 truncate text-center font-mono text-xs text-black/60">
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
