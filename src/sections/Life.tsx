import SectionTitle from '../components/ui/SectionTitle';
import PetGallery from '../components/ui/PetGallery';
import {
  hobbies,
  pets,
  animeBestPicks,
  animeList,
  gameBestPicks,
  gameList,
} from '../content/life';

// 内容卡统一悬浮态（定义在 index.css 的 .card-hover），想改全站一起改
const HOVER = 'card-hover';

// 通用小标题（Best Picks 这类分段标）
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-accent/70">
      {children}
    </h4>
  );
}

// 精选竖版海报条：一排 2:3 竖版封面，卡片列表之上；cover 留空显示粉色占位
// flex 均分：不管 4 张还是 5 张都单行撑满左右两边（不再靠左留白）；
// 窄屏自动换行，末行同样顶满；标题在海报下方，居中粉色
function BestPicks({
  items,
}: {
  items: { title: string; cover?: string }[];
}) {
  return (
    <div className="mb-10 flex flex-wrap gap-6">
      {items.map((item) => (
        <div key={item.title} className="group min-w-36 flex-1">
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
        </div>
      ))}
    </div>
  );
}

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
  return (
    <section id="life" className="section-shell py-24">
      <SectionTitle eyebrow="LIFE" title="生活（全是占位，随时改）" />

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
                  <div className="mx-auto mt-5 w-3/5">
                    <PetGallery media={pet.media} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ============ 03 追番：精选海报 + 竖封面条目 ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">03</span>
            <h3 className="text-2xl font-bold text-white">追番</h3>
            <span className="text-xs text-muted">{animeList.length} 部</span>
          </div>

          {/* 精选海报（竖版占位） */}
          <SubLabel>Best Picks</SubLabel>
          <BestPicks items={animeBestPicks} />

          {/* 条目列表 */}
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

        {/* ============ 04 游戏：精选海报 + 竖封面条目 ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">04</span>
            <h3 className="text-2xl font-bold text-white">游戏</h3>
            <span className="text-xs text-muted">{gameList.length} 款</span>
          </div>

          {/* 精选海报（荒野大镖客 / 空洞骑士 / 丝之歌 / 艾尔登法环 / 只狼） */}
          <SubLabel>Best Picks</SubLabel>
          <BestPicks items={gameBestPicks} />

          {/* 条目列表 */}
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
