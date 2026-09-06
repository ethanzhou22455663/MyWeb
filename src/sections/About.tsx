import SectionTitle from '../components/ui/SectionTitle';
import Placeholder from '../components/ui/Placeholder';

export default function About() {
  return (
    <section id="about" className="section-shell py-24">
      <SectionTitle eyebrow="ABOUT" title="关于我（占位板块）" />

      <div className="grid gap-8 md:grid-cols-2">
        <Placeholder label="照片 / 画像占位" className="aspect-[3/4]" />
        <div className="flex flex-col gap-4">
          <Placeholder label="介绍文字占位" className="h-24" />
          <Placeholder label="数据 / 标签占位" className="h-24" />
          <Placeholder label="其他信息占位" className="h-24" />
        </div>
      </div>
    </section>
  );
}
