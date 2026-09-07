import { site } from '../content/site';
import { img } from '../content/images';

/**
 * 首屏：头像在左、文字在右，两者作为一组整体水平居中
 * slogan 沿用最初 HELLO WORLD 的字号字重，两行，上白下粉
 * 文案全在 site.ts 的 hero 段改
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
        <div className="relative flex-shrink-0">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-full border border-accent/20"
          />
          <img
            src={img.avatar}
            alt="头像"
            className="h-52 w-52 rounded-full border-2 border-accent/40 object-cover shadow-[0_0_80px_rgb(var(--c-accent)/0.25)] md:h-72 md:w-72"
          />
        </div>

        {/* 右：文字（移动端随头像居中，桌面端左对齐） */}
        <div>
          {/* 两行大字：上白下粉 */}
          <h1 className="text-[clamp(44px,7vw,104px)] font-bold leading-[0.95]">
            <span className="text-white">{site.hero.sloganLead}</span>
            <br />
            <span className="text-accent">{site.hero.sloganAccent}</span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-[20px] leading-relaxed text-accent md:mx-0">
            {site.hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
