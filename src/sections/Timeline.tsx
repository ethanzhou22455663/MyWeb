import SectionTitle from '../components/ui/SectionTitle';
import { timeline } from '../content/timeline';

/**
 * 发展历程：极简纵向时间线
 * 内容在 src/content/timeline.ts 改，这里只管样式和结构
 */
export default function Timeline() {
  return (
    <section id="timeline" className="section-shell py-24">
      <SectionTitle eyebrow="TIMELINE" title="发展历程（占位，随时改）" />

      <ol className="ml-1 space-y-10 border-l border-white/10">
        {timeline.map((item) => (
          <li key={item.year} className="relative pl-8">
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="font-display text-lg font-bold text-accent">{item.year}</p>
            <p className="mt-1 font-medium text-white">{item.title}</p>
            {item.description && (
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
