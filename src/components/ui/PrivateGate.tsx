import { useState } from 'react';
import SectionTitle from './SectionTitle';
import UnlockDialog from './UnlockDialog';
import Reveal from './Reveal';
import { img } from '../../content/images';

/**
 * 私密板块占位块：未解锁时替换真实 section 渲染
 * - 长得和普通 section 一样（有 id + section-shell + 板块标题），锚点/导航都正常
 * - 内容区是一块居中的「锁定卡」：私密头像 + 提示 + 「输入密码解锁」按钮
 * - 解锁后 App 会改渲染真实 section，本组件不再出现
 *
 * 文案集中在 src/content/private.ts，方便随时改
 */
export default function PrivateGate({
  id,
  eyebrow,
  title,
  lockedTitle,
  lockedHint,
  buttonLabel,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lockedTitle: string;
  lockedHint: string;
  buttonLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section id={id} className="section-shell py-24">
      <SectionTitle eyebrow={eyebrow} title={title} />

      {/* 锁定占位卡 */}
      <Reveal variant="up" className="card-hover flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center backdrop-blur">
        <img
          src={img.private}
          alt="私密"
          className="mb-2 h-32 w-32 rounded-full border border-white/10 object-cover"
        />
        <h3 className="text-2xl font-semibold text-white">{lockedTitle}</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted">{lockedHint}</p>
        <button
          onClick={() => setOpen(true)}
          className="mt-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_30px_rgb(var(--c-accent)/0.4)]"
        >
          {buttonLabel}
        </button>
      </Reveal>

      {open && <UnlockDialog onClose={() => setOpen(false)} />}
    </section>
  );
}
