import SectionTitle from '../components/ui/SectionTitle';
import CompanionGallery from '../components/ui/CompanionGallery';
import { companions } from '../content/life';

/**
 * 伙伴：两张大卡横排占满，圆形头像 + 名字品种，卡内下方竖版画廊
 * 数据全在 src/content/life.ts 改
 */
export default function Companions() {
  return (
    <section id="companions" className="section-shell py-24">
      <SectionTitle eyebrow="COMPANIONS" title="伙伴" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {companions.map((companion) => (
          <div key={companion.name} className="p-7">
            {/* 头部：圆形头像 + 名字品种（居中） */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/5">
                {companion.image ? (
                  <img
                    src={companion.image}
                    alt={companion.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-display text-4xl font-bold text-accent/25">
                    {companion.name[0]}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-center gap-2.5">
                  <h4 className="text-2xl font-semibold text-white">{companion.name}</h4>
                  <span className="rounded-full bg-accent/10 px-3 py-0.5 text-sm text-accent">
                    {companion.breed}
                  </span>
                </div>
                {companion.description && (
                  <p className="mt-1.5 text-base leading-relaxed text-muted">
                    {companion.description}
                  </p>
                )}
              </div>
            </div>

            {/* 下方：竖版画廊（左右切换，收窄居中） */}
            {companion.media && companion.media.length > 0 && (
              <div className="mx-auto mt-5 w-3/5">
                <CompanionGallery media={companion.media} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
