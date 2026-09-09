import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import { demographics } from '../content/demographics';

/**
 * 简介（Demographics）：一张居中的「资料卡」
 * - 版式全站唯一：证件照方头像 + 双语标签字段表 + 简介
 * - 行内文字全部锁 leading-5：纯英文行（如 MBTI）字体回退不会改变行高
 * - 四角粉色取景框标记 + 「已归档」印章，悬浮整卡粉色微光
 * 数据全在 src/content/demographics.ts 改
 */
export default function Demographics() {
  return (
    <section id="demographics" className="section-shell py-24">
      <SectionTitle eyebrow="DEMOGRAPHICS" title="简介" />

      <div className="mx-auto max-w-3xl">
        <Reveal variant="up" className="card-hover relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          {/* 四角取景框标记（纯装饰） */}
          <span aria-hidden className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-accent/50" />
          <span aria-hidden className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-accent/50" />
          <span aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-accent/50" />
          <span aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-accent/50" />

          {/* 「已归档」印章（纯装饰） */}
          <span
            aria-hidden
            className="absolute right-8 top-24 rotate-12 rounded border-2 border-accent/60 px-2.5 py-1 font-serif text-sm font-bold tracking-[0.3em] text-accent/70 md:right-12"
          >
            已归档
          </span>

          {/* 抬头：证件照方头像 + 名字 / 定位，右侧编号 */}
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-7">
            <div className="flex items-center gap-5">
              <img
                src={demographics.avatar}
                alt="资料照片"
                loading="lazy"
                className="h-20 w-20 rounded-lg border border-white/20 object-cover md:h-24 md:w-24"
              />
              <div>
                <h3 className="text-2xl font-bold text-white md:text-3xl">{demographics.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{demographics.tagline}</p>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">File No.</p>
              <p className="mt-1 font-mono text-sm text-white/80">{demographics.fileNo}</p>
            </div>
          </div>

          {/* 社会信息字段表：双语标签 + 细线分隔，悬浮值变粉 */}
          <dl className="divide-y divide-white/10">
            {demographics.fields.map((field) => (
              <div
                key={field.en}
                className="group flex items-center justify-between gap-4 py-3.5 transition-colors"
              >
                <dt className="flex min-w-0 items-center gap-3">
                  <span className="shrink-0 text-sm font-medium leading-5 text-white/70">
                    {field.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase leading-5 tracking-[0.25em] text-muted">
                    {field.en}
                  </span>
                </dt>
                <dd className="shrink-0 text-sm leading-5 text-white transition-colors duration-300 group-hover:text-accent">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* 简介：贴住字段表的下一条细线，间距与字段行一致（细线都是 14px 间距） */}
          <div className="border-t border-white/10 pt-7">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Bio / 简介</p>
            <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {demographics.bio}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
