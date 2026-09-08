import SectionTitle from '../components/ui/SectionTitle';
import { notes } from '../content/notes';

// 行类型：h = # 日期标题（md 语法高亮成粉色），p = 正文，blank = 空行
interface Line {
  type: 'h' | 'p' | 'blank';
  text: string;
}

// 把 notes 数据拍平成行：每条便签 = # 标题 + 正文（按 \n 拆），便签之间空一行
const lines: Line[] = [];
notes.forEach((note, i) => {
  if (i > 0) lines.push({ type: 'blank', text: '' });
  lines.push({ type: 'h', text: `# ${note.date}` });
  note.text.split('\n').forEach((t) => lines.push({ type: 'p', text: t }));
});

/**
 * 随心记：Linux 文本编辑器风格——bat 带行号地查看 notes.md
 * # 日期是 markdown 标题（粉色），正文白字，末尾一行 ~ 表示文件结束
 * 换行 / 空行 / 空格全部原生：数据里怎么写页面就怎么显示
 * 内容全在 src/content/notes.ts 改
 */
export default function Notes() {
  return (
    <section id="notes" className="section-shell py-24">
      <SectionTitle eyebrow="NOTES" title="随心记" />

      {/* 编辑器窗口：标题栏 + 带行号的文件内容（收窄居中） */}
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-surface">
        {/* 标题栏：三个圆点 + 窗口名 */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="mx-auto font-mono text-xs text-muted">notes.md — bat</span>
          <span className="w-10" />
        </div>

        {/* 文件内容：等宽字体，bat --style=numbers 的样子 */}
        <div className="px-5 py-8 font-mono text-sm md:px-8 md:text-base">
          {/* 查看命令 */}
          <p>
            <span className="text-accent">$</span>{' '}
            <span className="text-white/80">bat --style=numbers notes.md</span>
          </p>

          {/* 带行号的正文 */}
          <div className="mt-6">
            {lines.map((line, i) => (
              <div
                key={i}
                className="group flex gap-3 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                {/* 行号槽：右对齐灰字，竖线分隔 */}
                <span className="w-6 shrink-0 select-none pt-px text-right text-xs leading-6 text-white/25">
                  {i + 1}
                </span>
                <span aria-hidden className="select-none text-white/15">
                  │
                </span>

                {/* 行内容：# 标题粉色加粗，正文白字，空行就是空行 */}
                {line.type === 'blank' ? (
                  <p className="min-h-6 leading-6">&nbsp;</p>
                ) : (
                  <p
                    className={`min-w-0 whitespace-pre-wrap leading-6 ${
                      line.type === 'h'
                        ? 'font-semibold text-accent'
                        : 'text-white/85'
                    }`}
                  >
                    {line.text}
                  </p>
                )}
              </div>
            ))}

            {/* 文件结束的 ~ 空行标记 */}
            <div className="group flex gap-3">
              <span className="w-6 shrink-0 select-none pt-px text-right text-xs leading-6 text-white/25">
                {lines.length + 1}
              </span>
              <span aria-hidden className="select-none text-white/15">
                │
              </span>
              <p className="leading-6 text-white/25">~</p>
            </div>
          </div>

          {/* 空提示行 + 闪烁光标 */}
          <p className="mt-8">
            <span className="text-accent">$</span>{' '}
            <span className="animate-cursor-blink inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] bg-accent" />
          </p>
        </div>
      </div>
    </section>
  );
}
