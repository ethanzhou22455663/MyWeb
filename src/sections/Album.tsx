import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import { album } from '../content/album';

/**
 * 相册：每个主题一行——左边主题大字 + 标题/简介，右边四张照片铺满余宽
 * 主题之间通栏细线分隔（无卡片无底色）
 * 数据在 src/content/album.ts 改（title / description / photos / caption 都可留空）
 */
export default function Album() {
  return (
    <section id="album" className="section-shell py-24">
      <SectionTitle eyebrow="ALBUM" title="相册（占位，随时改）" />

      <div className="border-b border-white/10">
        {album.map((item, i) => (
          <Reveal
            key={item.topic}
            variant="up"
            delay={Math.min(i, 3) * 80}
            className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:gap-10 md:py-10"
          >
            {/* 文字块：定宽，照片铺满余下整行 */}
            <div className="shrink-0 md:w-60">
              <h3 className="font-display text-4xl font-bold leading-none text-white md:text-5xl">
                {item.topic}
              </h3>
              {item.title && <p className="mt-3 font-medium text-white">{item.title}</p>}
              {item.description && (
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              )}
            </div>

            {/* 照片：每行四张 */}
            {item.photos && item.photos.length > 0 && (
              <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 md:gap-3">
                {item.photos.map((photo) => (
                  <figure key={photo.src} className="group min-w-0">
                    <img
                      src={photo.src}
                      alt={photo.caption ?? item.topic}
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
