import { site } from '../content/site';
import { img } from '../content/images';
import Reveal from '../components/ui/Reveal';

/**
 * 首屏：头像在左、文字在右，两者作为一组整体水平居中
 * slogan 三行：衬线斜体引导（宽字距）→ 白色粗体主题 → 粉色粗体收尾
 * 大字沿用默认无衬线字体重字号（font-bold，clamp(44px,7vw,104px)）
 * 文案全在 site.ts 的 hero 段改
 * （头像/文字错峰入场：两个 Reveal 的 delay 相差 150ms）
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="section-shell flex min-h-screen items-center justify-center pt-16"
    >
      {/* 这一组（头像+文字）在页面里整体居中；内部仍是左头像右文字 */}
      <div className="flex flex-col items-center gap-12 text-center md:flex-row md:gap-16 md:text-left lg:gap-24">
        {/* 左：头像 + 装饰外环 */}
        <Reveal variant="up" delay={0} className="relative flex-shrink-0">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-full border-4 border-accent"
          />
          <img
            src={img.avatar}
            alt="头像"
            className="h-52 w-52 rounded-full border-2 border-accent/40 object-cover shadow-[0_0_80px_rgb(var(--c-accent)/0.25)] md:h-72 md:w-72"
          />
        </Reveal>

        {/* 右：文字（移动端随头像居中，桌面端左对齐） */}
        <Reveal variant="up">
          {/* 三行 slogan：衬线斜体引导（宽字距小号）→ 粗体白字 → 粗体粉色收尾 */}
          <h1 className="leading-none">
            <span className="block font-serif text-[clamp(20px,2.6vw,30px)] italic font-normal tracking-[0.25em] text-white/75">
              {site.hero.sloganEyebrow}
            </span>
            <span className="mt-6 block text-[clamp(44px,7vw,104px)] font-bold leading-[0.95] text-white">
              {site.hero.sloganMain}
            </span>
            <span className="block text-[clamp(44px,7vw,104px)] font-bold leading-[0.95] text-accent">
              {site.hero.sloganAccent}
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-[20px] leading-relaxed text-accent md:mx-0">
            {site.hero.subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
