import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import { skills, type Skill } from '../content/skills';

/**
 * 技能板块：双栏档案列表（无卡片，hairline 横线整宽贯穿，左图右字）
 * - 每行一条通栏细线，行内左右两格；奇数项时末行只占左格（半行）
 * - 悬浮：格底色微亮 + 名称变粉 + 图片粉色光晕
 * 数据在 src/content/skills.ts 改
 */

// 单格：3:2 图片（不变形）+ 行号 / 大字名称 / 介绍
function SkillCell({ skill, index }: { skill: Skill; index: number }) {
  return (
    <Reveal
      variant="up"
      delay={Math.min(Math.floor((index - 1) / 2), 3) * 60}
      className="group flex items-center gap-6 py-8 transition-colors duration-300 hover:bg-white/[0.02] md:gap-10"
    >
      {/* 图片：3:2 锁死，object-cover 不变形 */}
      <div className="w-40 flex-shrink-0 overflow-hidden rounded-xl transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgb(var(--c-accent)/0.15)] sm:w-56 md:w-80">
        <img
          src={skill.image}
          alt={skill.name}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 文字区 */}
      <div className="min-w-0 flex-1 py-1">
        <div className="flex items-baseline gap-4">
          {/* 行号：display 字体，比等宽大一点 */}
          <span className="font-display text-sm font-bold text-accent/60">
            {String(index).padStart(2, '0')}
          </span>
          <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-accent md:text-3xl">
            {skill.name}
          </h3>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          {skill.description}
        </p>
      </div>
    </Reveal>
  );
}

export default function Skills() {
  // 两两成行，行内再分左右格；奇数时最后一行只有左格
  const rows: Skill[][] = [];
  for (let i = 0; i < skills.length; i += 2) {
    rows.push(skills.slice(i, i + 2));
  }

  return (
    <section id="skills" className="section-shell py-24">
      <SectionTitle eyebrow="SKILLS" title="技能" />

      <div className="border-b border-white/10">
        {rows.map((row, rowIndex) => (
          // 一行一条通栏细线，左右两格共用
          <div
            key={rowIndex}
            className="grid grid-cols-1 gap-x-12 border-t border-white/10 md:grid-cols-2"
          >
            {row.map((skill, cellIndex) => (
              <SkillCell
                key={skill.name}
                skill={skill}
                index={rowIndex * 2 + cellIndex + 1}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
