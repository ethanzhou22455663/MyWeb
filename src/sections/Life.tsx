import SectionTitle from '../components/ui/SectionTitle';
import PetGallery from '../components/ui/PetGallery';
import {
  hobbies,
  pets,
  animeBestPicks,
  animeList,
  gameBestPicks,
  galBestPicks,
  gameCollection,
  gameList,
  datingProfile,
} from '../content/life';

// 通用小标题（精选海报这类分段标）：大号加粗粉色，突出分段；上下对称留白
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-8 mt-8 text-center font-display text-lg font-bold uppercase tracking-[0.15em] text-accent">
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

// 追番 / 游戏共用的清单行：无卡片无封面，标题 + 右侧类型徽章（统一粉色）
// odd 列右侧留白当栏距，细线通栏不断
function MediaRow({ title, tag }: { title: string; tag?: string }) {
  return (
    <div className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition-colors duration-300 hover:bg-white/[0.02] md:odd:pr-12">
      <h4 className="min-w-0 truncate font-medium text-white transition-colors duration-300 group-hover:text-accent">
        {title}
      </h4>

      {/* 类型徽章：只保留粉色一款；数据没填 tag 则不显示 */}
      {tag && (
        <span className="flex-shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {tag}
        </span>
      )}
    </div>
  );
}

// 双栏清单容器：上下通栏细线，行内左右两格（奇数项时末行只占左格）
function MediaGrid({
  items,
  className = '',
}: {
  items: { title: string; tag?: string }[];
  className?: string;
}) {
  return (
    <div className={`border-b border-white/10 ${className}`}>
      <div className="grid grid-cols-1 border-t border-white/10 md:grid-cols-2">
        {items.map((item) => (
          <MediaRow key={item.title} title={item.title} tag={item.tag} />
        ))}
      </div>
    </div>
  );
}

/**
 * 生活板块：爱好(大字索引列表) / 宠物(圆形头像卡) / 追番(列表) / 游戏(列表)
 * 四种布局互不重复，刻意与作品(网格)、技能(半半卡片)区分开
 * 内容全在 src/content/life.ts 改，全是占位
 */
export default function Life() {
  return (
    <section id="life" className="section-shell py-24">
      <SectionTitle eyebrow="LIFE" title="生活（全是占位，随时改）" />

      <div className="space-y-20">
        {/* ============ 01 爱好：大字索引列表（无卡片，悬停整行右移+名称变粉） ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">01</span>
            <h3 className="text-2xl font-bold text-white">爱好</h3>
            <span className="text-xs text-muted">{hobbies.length} 项</span>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {hobbies.map((hobby, i) => (
              <div
                key={hobby.name}
                className="group flex items-baseline gap-5 py-5 transition-all duration-300 hover:bg-white/[0.03] hover:pl-5 md:gap-8"
              >
                {/* 行号：等宽字体 */}
                <span className="font-mono text-sm font-bold text-accent/60">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* 爱好名：和其他标题同字体，字号收敛，悬停变粉 */}
                <h4 className="text-2xl font-bold tracking-normal text-white transition-colors duration-300 group-hover:text-accent md:text-4xl">
                  {hobby.name}
                  <span className="ml-6 font-sans text-sm font-medium uppercase tracking-[0.2em] text-accent/70">
                    {hobby.en}
                  </span>
                </h4>

                {/* 一句话介绍：右侧基线对齐，窄屏隐藏 */}
                <span className="ml-auto hidden pl-6 text-right text-sm leading-relaxed text-muted sm:block">
                  {hobby.description}
                </span>
              </div>
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

          {/* 精选海报：4 排各 5 张，和游戏/Galgame 同一套 BestPicks 模板 */}
          <SubLabel>Best Picks</SubLabel>
          <BestPicks items={animeBestPicks.slice(0, 5)} />
          <BestPicks items={animeBestPicks.slice(5, 10)} />
          <BestPicks items={animeBestPicks.slice(10, 15)} />
          <BestPicks items={animeBestPicks.slice(15, 20)} />

          {/* 条目列表：通栏细线双栏清单 */}
          <MediaGrid items={animeList} />
        </div>

        {/* ============ 04 游戏：精选海报 + 竖封面条目 ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">04</span>
            <h3 className="text-2xl font-bold text-white">游戏</h3>
            <span className="text-xs text-muted">{gameList.length} 款</span>
          </div>

          {/* 精选海报（荒野大镖客 / 空洞骑士 / 丝之歌 / 艾尔登法环 / 只狼） */}
          <SubLabel>最佳游戏</SubLabel>
          <BestPicks items={gameBestPicks} />

          {/* 玩过的游戏清单：和底部 Galgame 清单共用 MediaGrid 样式 */}
          <MediaGrid className="mb-8" items={gameCollection} />

          {/* Galgame 精选：两排各 5 张，版式同上 */}
          <SubLabel>Galgame</SubLabel>
          <BestPicks items={galBestPicks.slice(0, 5)} />
          <BestPicks items={galBestPicks.slice(5)} />

          {/* 条目列表 */}
          <MediaGrid items={gameList} />
        </div>

        {/* ============ 05 约会档案：交友软件风，左大卡右速览格（全新版式） ============ */}
        <div>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="font-display text-sm font-bold text-accent">05</span>
            <h3 className="text-2xl font-bold text-white">约会档案</h3>
            <span className="text-xs text-muted">{datingProfile.facts.length} 项</span>
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            {/* 左：档案大卡（竖版照片 + 底部渐变压 名字/年龄/位置，仿交友软件首卡） */}
            <div className="card-hover relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:w-80 md:flex-shrink-0">
              {datingProfile.photo ? (
                <img
                  src={datingProfile.photo}
                  alt={datingProfile.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-7xl font-bold text-accent/25">
                    {datingProfile.name[0]}
                  </span>
                </div>
              )}

              {/* 已认证徽章 */}
              {datingProfile.verified && (
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/85 backdrop-blur-sm">
                  已认证 ✓
                </span>
              )}

              {/* 底部渐变压字 */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 pt-16">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-bold text-white">{datingProfile.name}</h4>
                  <span className="text-xl font-medium text-white/80">{datingProfile.age}</span>
                  {datingProfile.online && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      在线
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-white/75">
                  {datingProfile.location} · 距离 {datingProfile.distance}
                </p>
              </div>
            </div>

            {/* 右：快速资料速览格（label 在上、value 在下；gap-px + 底色制造细线格） */}
            <div className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
              {datingProfile.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="group bg-surface p-5 transition-colors duration-300 hover:bg-accent/[0.06]"
                >
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {fact.label} <span className="text-accent/50">{fact.en}</span>
                  </p>
                  <p className="mt-2 font-bold text-white transition-colors duration-300 group-hover:text-accent">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
