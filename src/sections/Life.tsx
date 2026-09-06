import SectionTitle from '../components/ui/SectionTitle';
import PetGallery from '../components/ui/PetGallery';
import { useUnlock } from '../context/UnlockContext';
import { hobbies, pets, animeList, gameList } from '../content/life';

// 悬浮高亮（和全站卡片一致的 hover 语言）
const HOVER =
  'transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_50px_rgb(var(--c-accent)/0.12)]';

// 追番 / 游戏共用的列表行：左封面小图 + 标题进度 + 右侧状态徽章
function MediaRow({
  title,
  sub,
  status,
  accent,
  cover,
}: {
  title: string;
  sub: string;
  status: string;
  accent: boolean; // 追更中/在玩 = 粉色徽章，其余灰色
  cover?: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur ${HOVER}`}
    >
      {/* 封面：竖版 3:4，没图显示首字 */}
      <div className="flex h-20 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-accent/5">
        {cover ? (
          <img
            src={cover}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-lg font-bold text-accent/25">
            {title[0]}
          </span>
        )}
      </div>

      {/* 标题 + 进度 */}
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-white">{title}</h4>
        <p className="mt-0.5 truncate text-xs text-muted">{sub}</p>
      </div>

      {/* 状态徽章 */}
      <span
        className={`flex-shrink-0 rounded-full px-3 py-1 text-xs ${
          accent
            ? 'bg-accent/10 font-medium text-accent'
            : 'bg-white/5 text-muted'
        }`}
      >
        {status}
      </span>
    </div>
  );
}

/**
 * 生活板块：爱好(标签) / 宠物(圆形头像卡) / 追番(列表) / 游戏(列表)
 * 四种布局互不重复，刻意与作品(网格)、技能(半半卡片)区分开
 * 内容全在 src/content/life.ts 改，全是占位
 */
export default function Life() {
  const { lock } = useUnlock();

  return (
    <section id="life" className="section-shell py-24">
      {/* 标题 + 锁回去按钮 */}
      <div className="flex items-start justify-between gap-4">
        <SectionTitle eyebrow="LIFE" title="生活（全是占位，随时改）" />
        <button
          onClick={lock}
          title="重新锁定此板块"
          aria-label="重新锁定生活板块"
          className="mt-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-300 hover:border-accent/60 hover:text-accent"
        >
          🔓
        </button>
      </div>

      <div className="space-y-20">
        {/* ============ 01 爱好：文字标签 ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">01</span>
            <h3 className="text-2xl font-bold text-white">爱好</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-muted backdrop-blur transition-all duration-300 hover:border-accent/40 hover:text-white"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* ============ 02 宠物：两张大卡横排占满，卡内下方竖版画廊 ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">02</span>
            <h3 className="text-2xl font-bold text-white">宠物</h3>
            <span className="text-xs text-muted">{pets.length} 只</span>
          </div>
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
                  <div className="mx-auto mt-5 w-4/5">
                    <PetGallery media={pet.media} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ============ 03 追番：竖封面条目 ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">03</span>
            <h3 className="text-2xl font-bold text-white">追番</h3>
            <span className="text-xs text-muted">{animeList.length} 部</span>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {animeList.map((anime) => (
              <MediaRow
                key={anime.title}
                title={anime.title}
                sub={anime.progress}
                status={anime.status}
                accent={anime.status === '追更中'}
                cover={anime.cover}
              />
            ))}
          </div>
        </div>

        {/* ============ 04 游戏：竖封面条目 ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">04</span>
            <h3 className="text-2xl font-bold text-white">游戏</h3>
            <span className="text-xs text-muted">{gameList.length} 款</span>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {gameList.map((game) => (
              <MediaRow
                key={game.title}
                title={game.title}
                sub={game.platform}
                status={game.status}
                accent={game.status === '在玩'}
                cover={game.cover}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
