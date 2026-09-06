import { site } from '../content/site';
import SectionTitle from '../components/ui/SectionTitle';

export default function Contact() {
  const items = [
    { label: '邮箱', value: site.contact.email },
    { label: '微信', value: site.contact.wechat },
    { label: '电话', value: site.contact.phone },
  ];

  return (
    <section id="contact" className="section-shell py-24">
      <SectionTitle eyebrow="CONTACT" title="联系我（占位板块）" />

      <div className="grid gap-4 text-sm md:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-surface p-6">
            <p className="mb-1 text-muted">{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
