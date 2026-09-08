import SectionTitle from '../components/ui/SectionTitle';
import { SubLabel, BestPicks, MediaGrid } from '../components/ui/Media';
import { gameBestPicks, galBestPicks, gameCollection, gameList } from '../content/life';

/**
 * 游戏：最佳游戏精选海报 + 玩过的清单 + Galgame 精选（两排）+ Galgame 清单
 * 数据全在 src/content/life.ts 改
 */
export default function Games() {
  return (
    <section id="games" className="section-shell py-24">
      <SectionTitle eyebrow="GAMES" title="游戏" />

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
    </section>
  );
}
