import { site } from '../content/site';
import SectionTitle from '../components/ui/SectionTitle';

/**
 * 关注：两张频道卡（B站 / 小红书），card-hover 悬浮效果，点击整卡跳转
 * 卡面：左 频道头像（圆形）+ 平台标志角标（右下）；右 频道名/平台/简介/链接
 * 头像 288px 配 96px 整数倍缩放；窄屏自动上下堆叠
 * 数据全在 src/content/site.ts 的 site.subscribe 改
 */
export default function Subscribe() {
  return (
    <section id="subscribe" className="section-shell py-24">
      <SectionTitle eyebrow="SUBSCRIBE" title="关注我" />

      <div className="grid gap-4 md:grid-cols-2">
        {site.subscribe.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="card-hover group flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:gap-6"
          >
            {/* 左：频道头像 + 平台标志角标（右下，底色描边和卡片融为一体） */}
            <div className="relative flex-shrink-0 self-start">
              <img
                src={item.avatar}
                alt={item.channel}
                className="h-24 w-24 rounded-full border border-white/10 object-cover"
              />
              <img
                src={item.badge}
                alt={item.label}
                title={item.label}
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border-2 border-bg object-cover"
              />
            </div>

            {/* 右：频道名 + 平台 + 简介 + 链接 */}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent">
                  {item.channel}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {item.label} · {item.en}
                </p>
              </div>

              {/* 频道简介 */}
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>

              {/* 底部链接 */}
              <p className="mt-auto break-all font-mono text-xs text-white/40 transition-colors duration-300 group-hover:text-accent/70">
                {item.value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
