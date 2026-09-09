import Reveal from './Reveal';

interface SectionTitleProps {
  eyebrow: string; // 英文大标题
  title: string;   // 中文副标题
}

/**
 * 统一的区块标题：所有 section 共用
 * 想改标题样式只改这一个组件
 * （入场动画在 Reveal，一处覆盖全部板块标题）
 */
export default function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <Reveal as="div" variant="up" className="mb-12">
      <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-tight">
        {eyebrow} <span className="text-accent">↘</span>
      </h2>
      <p className="mt-2 text-muted">{title}</p>
    </Reveal>
  );
}
