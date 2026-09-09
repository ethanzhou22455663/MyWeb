import { site } from '../content/site';
import SectionTitle from '../components/ui/SectionTitle';

/**
 * 联系方式：三张卡片（邮箱 / B站 / 小红书），card-hover 悬浮效果，点击整卡跳转
 * 数据全在 src/content/site.ts 的 site.contact 改
 */
export default function Contact() {
  return (
    <section id="contact" className="section-shell py-24">
      <SectionTitle eyebrow="CONTACT" title="联系我" />

      <div className="grid gap-4 text-sm md:grid-cols-3">
        {site.contact.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="card-hover block rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="mb-1 text-muted">{item.label}</p>
            <p className="break-all text-white">{item.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
