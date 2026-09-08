import SectionTitle from '../components/ui/SectionTitle';
import { profile } from '../content/life';

/**
 * Profile：交友软件风，左大卡（竖版照片 + 底部渐变压名字/年龄/位置）+ 右快速资料速览格
 * 数据全在 src/content/life.ts 改
 */
export default function DatingProfile() {
  return (
    <section id="profile" className="section-shell py-24">
      <SectionTitle eyebrow="PROFILE" title="个人资料" />

      <div className="flex flex-col gap-5 md:flex-row">
        {/* 左：档案大卡（竖版照片 + 底部渐变压 名字/年龄/位置，仿交友软件首卡） */}
        <div className="card-hover relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:w-80 md:flex-shrink-0">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-7xl font-bold text-accent/25">
                {profile.name[0]}
              </span>
            </div>
          )}

          {/* 已认证徽章 */}
          {profile.verified && (
            <span className="absolute left-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white/85 backdrop-blur-sm">
              已认证 ✓
            </span>
          )}

          {/* 底部渐变压字 */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 pt-16">
            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-bold text-white">{profile.name}</h4>
              <span className="text-xl font-medium text-white/80">{profile.age}</span>
              {profile.online && (
                <span className="ml-auto flex items-center gap-1.5 text-xs text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  在线
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-white/75">
              {profile.location} · 距离 {profile.distance}
            </p>
          </div>
        </div>

        {/* 右：快速资料速览格（label 在上、value 在下；gap-px + 底色制造细线格） */}
        <div className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {profile.facts.map((fact) => (
            <div
              key={fact.label}
              className="group bg-surface p-5 transition-colors duration-300 hover:bg-accent/[0.06]"
            >
              <p className="text-xs uppercase tracking-wider text-muted">
                {fact.label} <span className="text-accent/50">{fact.en}</span>
              </p>
              <p className="mt-2 font-bold text-white transition-colors duration-300 group-hover:text-accent">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
