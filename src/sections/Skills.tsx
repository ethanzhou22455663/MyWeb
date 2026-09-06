import SectionTitle from '../components/ui/SectionTitle';
import { skills } from '../content/skills';

/**
 * 个人能力：Apple 风磨砂卡片网格
 * 内容在 src/content/skills.ts 改，加技能 = 数组加一项
 * 图片：数据里填 image 字段显示真图，不填则显示大号文字图标
 */
export default function Skills() {
  return (
    <section id="skills" className="section-shell py-24">
      <SectionTitle eyebrow="CRAFT" title="技能与工具（占位，随时改）" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_50px_rgb(var(--c-accent)/0.12)]"
          >
            {/* 图片区：有 image 显示图片，没有则大号文字图标 */}
            <div className="relative h-44 w-full overflow-hidden bg-accent/5">
              {skill.image ? (
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-5xl font-bold text-accent/25">
                    {skill.monogram}
                  </span>
                </div>
              )}
            </div>

            {/* 文字区 */}
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 className="font-medium text-white">{skill.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
