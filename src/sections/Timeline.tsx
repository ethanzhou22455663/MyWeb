import SectionTitle from '../components/ui/SectionTitle';
import { timeline } from '../content/timeline';

/**
 * 发展历程：终端 console log 风格
 * 每个分组是一次 $ cat xxx.log，条目是 [序号] 时间段 标题 + └── 续行，
 * 底部一个闪烁光标。内容在 src/content/timeline.ts 改
 */
export default function Timeline() {
  return (
    <section id="timeline" className="section-shell py-24">
      <SectionTitle eyebrow="TIMELINE" title="发展历程（占位，随时改）" />

      {/* 终端窗口：标题栏 + 日志正文（收窄居中，避免一行拉太宽） */}
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-surface">
        {/* 标题栏：三个圆点 + 窗口名 */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="mx-auto font-mono text-xs text-muted">timeline.log — zsh</span>
          <span className="w-10" />
        </div>

        {/* 日志正文：等宽字体，行即日志 */}
        <div className="overflow-x-auto px-5 py-8 font-mono text-sm md:px-8 md:text-base">
          {timeline.map((group) => (
            <div key={group.file} className="mb-10 last:mb-0">
              {/* 查看命令 */}
              <p>
                <span className="text-accent">$</span>{' '}
                <span className="text-white/80">cat {group.file}</span>
              </p>

              {/* 条目：每条一行日志 */}
              <div className="mt-5 space-y-5">
                {group.entries.map((entry, i) => (
                  <div
                    key={entry.title}
                    className="group -mx-2 rounded px-2 py-1 transition-colors duration-300 hover:bg-white/[0.03]"
                  >
                    <p>
                      <span className="text-white/30">[{String(i + 1).padStart(2, '0')}]</span>{' '}
                      <span className="font-bold text-accent">{entry.period}</span>{' '}
                      <span className="text-accent">{entry.title}</span>
                    </p>
                    {entry.description && (
                      <p className="mt-1 text-white">
                        <span className="text-white/30">└──</span> {entry.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 空提示行 + 闪烁光标 */}
          <p className="mt-10">
            <span className="text-accent">$</span>{' '}
            <span className="animate-cursor-blink inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] bg-accent" />
          </p>
        </div>
      </div>
    </section>
  );
}
