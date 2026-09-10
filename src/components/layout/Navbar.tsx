import { site } from '../../content/site';
import { useUnlock } from '../../context/UnlockContext';

export default function Navbar() {
  const { unlocked } = useUnlock();

  // 已存活天数：按本地日期从 birthday 算到今天（整天数，不受当天时刻影响）
  const [by, bm, bd] = site.birthday.split('-').map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysLived = Math.round(
    (today.getTime() - new Date(by, bm - 1, bd).getTime()) / 86_400_000,
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="text-lg font-bold tracking-tight">
          {site.name}
          <span className="ml-2.5 align-middle text-xs font-normal tracking-normal text-muted">
            已存活 <span className="font-medium text-accent">{daysLived}</span> 天
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((link) =>
            link.children ? (
              // 带下拉的项：悬停/键盘聚焦展开，本身不跳转；选项锚点跳转
              // 未解锁时整组只有 #profile（PrivateGate）存在，选项一律落到大锁块
              <div key={link.label} className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className="flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-accent group-focus-within:text-accent"
                >
                  {link.label}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* 下拉面板：淡入 + 轻微上浮归位（transition，复用全站缓动 token） */}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-surface/95 py-1 shadow-xl shadow-black/40 backdrop-blur">
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={unlocked ? child.href : '#profile'}
                        className="block whitespace-nowrap px-4 py-2 text-sm text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
