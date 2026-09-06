import SectionTitle from '../components/ui/SectionTitle';
import { workCategories } from '../content/works';

/**
 * 作品集：8 个分类，各自独立网格
 * 内容全在 src/content/works.ts：
 *   加分类 = 数组加对象；加作品 = items 加一项；数量随意
 */
export default function Works() {
  return (
    <section id="works" className="section-shell py-24">
      <SectionTitle eyebrow="WORKS" title="作品集（分类填充中，随时改）" />

      <div className="space-y-20">
        {workCategories.map((category, index) => (
          <div key={category.id}>
            {/* 分类标题：编号 + 名称 + 数量 */}
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-display text-sm font-bold text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              <span className="text-xs text-muted">{category.items.length} 项</span>
            </div>

            {/* 该分类的作品网格 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => {
                const card = (
                  <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_50px_rgb(var(--c-accent)/0.12)]">
                    {/* 图片区 */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-accent/5">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-muted">
                          图片占位
                        </div>
                      )}
                    </div>
                    {/* 文字区 */}
                    <div className="p-5">
                      <h4 className="font-medium text-white">{item.title}</h4>
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );

                // 有 link 时整卡可点
                return item.link ? (
                  <a key={item.title} href={item.link} target="_blank" rel="noreferrer">
                    {card}
                  </a>
                ) : (
                  <div key={item.title}>{card}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
