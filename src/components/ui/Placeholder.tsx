interface PlaceholderProps {
  label: string;
  className?: string;
}

/**
 * 占位块：骨架阶段用来标示"这里将来放什么"
 * 有真实内容后，逐步替换为真实组件
 */
export default function Placeholder({ label, className = '' }: PlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.02] text-sm text-muted ${className}`}
    >
      {label}
    </div>
  );
}
