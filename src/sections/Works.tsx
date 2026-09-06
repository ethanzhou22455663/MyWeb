import SectionTitle from '../components/ui/SectionTitle';
import Placeholder from '../components/ui/Placeholder';

export default function Works() {
  return (
    <section id="works" className="section-shell py-24">
      <SectionTitle eyebrow="WORKS" title="作品（占位板块，结构可随时改）" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Placeholder key={i} label={`作品 ${i + 1}（占位）`} className="aspect-[4/3]" />
        ))}
      </div>
    </section>
  );
}
