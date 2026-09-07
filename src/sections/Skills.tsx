import SectionTitle from '../components/ui/SectionTitle';
import { skills } from '../content/skills';

/**
 * 个人能力：左右对称卡片（文字一半 / 图片一半，桌面端一行两条）
 * 内容在 src/content/skills.ts 改，加技能 = 数组加一项
 * 图片：数据里填 image 字段显示真图，不填则显示大号文字图标
 */
export default function Skills() {
  return (
    <section id="skills" className="section-shell py-24">
      <SectionTitle eyebrow="CRAFT" title="技能与工具（占位，随时改）" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="card-hover group flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur sm:flex-row sm:items-center"
          >
            {/* 左：文字（占一半，垂直居中） */}
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 font-display text-sm font-bold text-accent">
                  {skill.monogram}
                </span>
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {skill.description}
              </p>
            </div>

            {/* 右：图片（桌面 50% 宽 / 192px 高；手机通栏） */}
            <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-2xl bg-accent/5 sm:h-48 sm:w-1/2">
              {skill.image ? (
                <img
                  src={skill.image}
                  alt={skill.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-accent/25">
                  {skill.monogram}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
