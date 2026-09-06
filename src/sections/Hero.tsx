import { site } from '../content/site';
import Placeholder from '../components/ui/Placeholder';

export default function Hero() {
  return (
    <section id="top" className="section-shell flex min-h-screen flex-col justify-center gap-8 pt-16">
      <p className="text-sm tracking-widest text-accent">{site.role}</p>

      <h1 className="text-[clamp(56px,10vw,140px)] font-bold leading-[0.95]">
        {site.hero.titleTop}
        <br />
        <span className="text-accent">{site.hero.titleBottom}</span>
      </h1>

      <p className="max-w-xl text-muted">{site.hero.subtitle}</p>

      <div className="flex gap-4">
        <a
          href="#works"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          {site.hero.ctaPrimary}
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/20 px-6 py-3 text-sm transition-colors hover:border-white/50"
        >
          {site.hero.ctaSecondary}
        </a>
      </div>

      <Placeholder label="主视觉占位（待定：3D 场景 / 大图 / 视频）" className="mt-4 h-[320px] w-full" />
    </section>
  );
}
