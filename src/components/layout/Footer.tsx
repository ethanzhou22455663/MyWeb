import { site } from '../../content/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-2 text-xs text-muted md:flex-row">
        <p>{site.footer.note}</p>
        <p>页脚占位文案</p>
      </div>
    </footer>
  );
}
