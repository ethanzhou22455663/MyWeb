import SectionTitle from '../components/ui/SectionTitle';
import PetGallery from '../components/ui/PetGallery';
import { pets } from '../content/life';

/**
 * 宠物：两张大卡横排占满，圆形头像 + 名字品种，卡内下方竖版画廊
 * 数据全在 src/content/life.ts 改
 */
export default function Pets() {
  return (
    <section id="pets" className="section-shell py-24">
      <SectionTitle eyebrow="PETS" title="宠物" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {pets.map((pet) => (
          <div key={pet.name} className="p-7">
            {/* 头部：圆形头像 + 名字品种（居中） */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-36 w-36 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/5">
                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-display text-4xl font-bold text-accent/25">
                    {pet.name[0]}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-center gap-2.5">
                  <h4 className="text-2xl font-semibold text-white">{pet.name}</h4>
                  <span className="rounded-full bg-accent/10 px-3 py-0.5 text-sm text-accent">
                    {pet.breed}
                  </span>
                </div>
                {pet.description && (
                  <p className="mt-1.5 text-base leading-relaxed text-muted">
                    {pet.description}
                  </p>
                )}
              </div>
            </div>

            {/* 下方：竖版画廊（左右切换，收窄居中） */}
            {pet.media && pet.media.length > 0 && (
              <div className="mx-auto mt-5 w-3/5">
                <PetGallery media={pet.media} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
