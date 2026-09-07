import SectionTitle from '../components/ui/SectionTitle';
import { skills } from '../content/skills';

/**
 * 技能板块：统一尺寸图片墙
 * 图片区固定 16:10 比例框（裁剪填充，不变形），图下是说明文字
 * 悬停图片轻缩放 + 容器描边变粉
 * 内容全在 src/content/skills.ts 改
 */
export default function Skills() {
  return (
    <section id="skills" className="section-shell py-24">
      <SectionTitle eyebrow="SKILLS" title="技能" />

      {/* 统一尺寸图片墙：两列（窄屏）/ 三列（桌面） */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {skills.map((skill) => (
          <figure key={skill.name} className="group">
            {/* 图片区：固定 16:10，统一尺寸 */}
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 transition-colors duration-300 group-hover:border-accent/60">
              {skill.image ? (
                <img
                  src={skill.image}
                  alt={skill.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                /* 没配图片：大字符占位 */
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-5xl font-bold text-accent/20">
                    {skill.monogram}
                  </span>
                </div>
              )}
            </div>

            {/* 图下说明：名称 + 等宽缩写 + 一句话 */}
            <figcaption className="mt-3">
              <div className="flex items-baseline gap-2">
                <h4 className="font-medium text-white">{skill.name}</h4>
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent/80">
                  {skill.monogram}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {skill.description}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
