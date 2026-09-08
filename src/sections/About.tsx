import SectionTitle from '../components/ui/SectionTitle';
import {
  profileFields,
  profileBio,
  profileName,
  profileTagline,
} from '../content/about';
import { img } from '../content/images';

/**
 * 个人档案：左拱形大相框 + 右巨型数据字
 * 全站独一份的构图——没有通栏细线、没有列表行，
 * 字段直接渲染成 40~72px 的大字，标签缩成粉色小等宽字
 * 数据全在 src/content/about.ts 改
 */

// 单个数据块：粉色小标签 + 超大字，左边一条短竖线当刻度
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-accent/40 pl-5 md:pl-6">
      <p className="font-mono text-xs tracking-[0.25em] text-accent">
        {label}
      </p>
      <p className="mt-2 truncate font-display text-[clamp(36px,4.5vw,68px)] font-bold leading-none text-white">
        {value}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-shell py-24">
      <SectionTitle eyebrow="PROFILE" title="个人档案" />

      <div className="grid gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-24">
        {/* 左栏：拱形相框 + 名字（桌面端吸顶跟随） */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative mx-auto max-w-xs md:max-w-sm">
            <div
              aria-hidden
              className="absolute -inset-2.5 rounded-b-3xl rounded-t-full border-2 border-accent"
            />
            <img
              src={img.avatar}
              alt="头像"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-b-3xl rounded-t-full border-2 border-accent/40 object-cover"
            />
          </div>
          <h3 className="mt-8 text-center font-serif text-3xl font-bold text-white md:text-4xl">
            {profileName}
          </h3>
          <p className="mt-2 text-center font-mono text-sm text-accent">
            {profileTagline}
          </p>
        </div>

        {/* 右栏：简介 + 巨型数据墙 */}
        <div>
          <div className="border-l-2 border-accent pl-6 md:pl-8">
            <p className="font-serif text-2xl leading-relaxed text-white md:text-[32px] md:leading-relaxed">
              {profileBio}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-20">
            {profileFields.map((field) => (
              <Stat key={field.label} label={field.label} value={field.value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
