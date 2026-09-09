import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import { hobbies } from '../content/life';

/**
 * 爱好：大字索引列表（无卡片，悬停整行右移 + 名称变粉）
 * 数据全在 src/content/life.ts 改
 */
export default function Hobbies() {
  return (
    <section id="hobbies" className="section-shell py-24">
      <SectionTitle eyebrow="HOBBIES" title="爱好" />

      <div className="divide-y divide-white/10 border-y border-white/10">
        {hobbies.map((hobby, i) => (
          <Reveal
            key={hobby.name}
            variant="up"
            delay={Math.min(i, 4) * 70}
            className="group flex items-baseline gap-5 py-5 transition-all duration-300 hover:bg-white/[0.03] hover:pl-5 md:gap-8"
          >
            {/* 行号：display 字体（和技能/作品行的编号一致） */}
            <span className="font-display text-sm font-bold text-accent/60">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* 爱好名：和其他标题同字体，悬停变粉 */}
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
