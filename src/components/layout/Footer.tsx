import { site } from '../../content/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-2 text-xs text-muted md:flex-row">
        <p>{site.footer.note}</p>
        {/* 不蒜子访客数：脚本异步回写数字，服务异常时留空不显示 */}
        <p id="busuanzi_container_site_uv">
          {site.footer.traffic.label}
          <span id="busuanzi_value_site_uv" className="text-accent" />
        </p>
      </div>
    </footer>
  );
}
