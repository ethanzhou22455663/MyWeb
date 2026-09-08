import SectionTitle from '../components/ui/SectionTitle';
import { SubLabel, BestPicks, MediaGrid } from '../components/ui/Media';
import { animeBestPicks, animeList } from '../content/life';

/**
 * 追番：精选海报（4 排各 5 张）+ 通栏细线双栏清单
 * 数据全在 src/content/life.ts 改
 */
export default function Anime() {
  return (
    <section id="anime" className="section-shell py-24">
      <SectionTitle eyebrow="ANIME" title="追番" />

      {/* 精选海报：4 排各 5 张，和游戏/Galgame 同一套 BestPicks 模板 */}
      <SubLabel>Best Picks</SubLabel>
      <BestPicks items={animeBestPicks.slice(0, 5)} />
      <BestPicks items={animeBestPicks.slice(5, 10)} />
      <BestPicks items={animeBestPicks.slice(10, 15)} />
      <BestPicks items={animeBestPicks.slice(15, 20)} />

      {/* 条目列表：通栏细线双栏清单 */}
      <MediaGrid items={animeList} />
    </section>
  );
}
