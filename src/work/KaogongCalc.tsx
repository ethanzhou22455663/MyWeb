import { useMemo, useState, type ReactNode } from 'react';

/**
 * 考公决策计算器（纯金融视角）
 * 把「考公」当成一次风险投资决策：
 *   投入 = 机会成本 + 直接成本（可残值回收）+ 青春体验成本（不可回收）
 *   收益 = 总胜率 × 逐年净收益折现（体制内 vs 私企两条收入曲线）
 * 结论按 期望收益率 = EV / 总投入 分五档，附档位标尺
 *
 *   单次胜率 p = min(0.9, 1/报录比 × 50/模考百分位)
 *   总胜率   P = 1 − (1−p)^n
 *   总成本 T = 年轻权重 × (金钱成本×(1−残值率) + 体验成本)
 *   EV = P × payoff − T
 */

type Mode = 'full' | 'part'; // 全职备考 / 在职备考

interface Params {
  mode: Mode;
  salary: number; // 当前月薪（机会成本基准）
  growthPriv: number; // 私企年薪涨幅 %
  months: number; // 每次备考时长（月）
  attempts: number; // 计划考几次 n
  directCost: number; // 每次直接成本（报名费 + 资料 + 交通）
  experienceCost: number; // 备考体验成本（元/月）
  youthWeight: number; // 青春权重（倍）：年轻体验 vs 老年财富的换算
  competition: number; // 岗位竞争比（报录比，50 = 50:1）
  percentile: number; // 模考百分位（前 X%，越小越强）
  govIncome: number; // 体制内年综合收入
  growthGov: number; // 体制内年薪涨幅 %
  premium: number; // 稳定性个人溢价（元/年，可负）
  residual: number; // 残值率 %（失败后能回收的技能/认知价值）
  discount: number; // 折现率 %
  years: number; // 收益年限（年到退休）t
}

const DEFAULTS: Params = {
  mode: 'full',
  salary: 8000,
  growthPriv: 5,
  months: 3,
  attempts: 3,
  directCost: 1500,
  experienceCost: 3000,
  youthWeight: 1.5,
  competition: 50,
  percentile: 30,
  govIncome: 150000,
  growthGov: 2,
  premium: 0,
  residual: 25,
  discount: 3,
  years: 30,
};

/** 万元，保留一位小数 */
const wan = (n: number) =>
  (n / 10000).toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** 元，千分位取整 */
const yuan = (n: number) => `¥${Math.round(n).toLocaleString('zh-CN')}`;

const pct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`;

/* ---------- 档位判定 ---------- */

type Tone = 'great' | 'good' | 'mid' | 'bad' | 'awful';

interface Tier {
  name: string;
  tone: Tone;
  note: string;
}

const TONE_STYLE: Record<Tone, { border: string; bg: string; text: string }> = {
  great: { border: 'border-emerald-400/40', bg: 'bg-emerald-400/[0.08]', text: 'text-emerald-400' },
  good: { border: 'border-accent/40', bg: 'bg-accent/[0.08]', text: 'text-accent' },
  mid: { border: 'border-amber-400/40', bg: 'bg-amber-400/[0.08]', text: 'text-amber-300' },
  bad: { border: 'border-orange-400/40', bg: 'bg-orange-400/[0.08]', text: 'text-orange-300' },
  awful: { border: 'border-rose-400/40', bg: 'bg-rose-400/[0.08]', text: 'text-rose-400' },
};

/** 期望收益率（EV/总投入）→ 五档 */
function tierOf(EV: number, payoff: number, totalCost: number): Tier {
  if (payoff <= 0) {
    return {
      name: '强烈不建议',
      tone: 'awful',
      note: '年净收益为负：体制内收入（含溢价）追不上体制外，胜率再高也填不平',
    };
  }
  if (totalCost <= 0) {
    return { name: '强烈建议考', tone: 'great', note: '零成本正收益——这几乎是免费彩票' };
  }
  const ratio = EV / totalCost;
  if (ratio >= 2) return { name: '强烈建议考', tone: 'great', note: '期望回报远超投入，这种机会不多' };
  if (ratio >= 0.5) return { name: '可以考', tone: 'good', note: '纯金融账是正的，风险配得上' };
  if (ratio >= -0.5)
    return { name: '五五开', tone: 'mid', note: '钱的角度打平——交给非金融因素：理想、家庭、稳定感' };
  if (ratio >= -2) return { name: '不建议考', tone: 'bad', note: '期望亏损明显，除非有账外理由' };
  return { name: '强烈不建议', tone: 'awful', note: '纯金融角度完全说不通' };
}

/* ---------- 小组件 ---------- */

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display?: string;
  hint?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
        <span className="text-muted">{label}</span>
        <span className="whitespace-nowrap font-medium text-white">{display ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>}
    </label>
  );
}

function ParamCard({
  title,
  wide,
  twoCol,
  children,
}: {
  title: string;
  wide?: boolean;
  twoCol?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur ${
        wide ? 'lg:col-span-2' : ''
      }`}
    >
      <h3 className="mb-5 font-medium text-white">{title}</h3>
      <div
        className={
          wide ? 'grid gap-5 sm:grid-cols-3' : twoCol ? 'grid gap-5 sm:grid-cols-2' : 'space-y-5'
        }
      >
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value, hint, highlight }: { label: string; value: string; hint?: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${
        highlight ? 'border-accent/40 bg-accent/[0.08]' : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

/** 档位标尺：期望收益率 −3x ~ +3x，标出当前位置 */
function Gauge({ ratio }: { ratio: number }) {
  const pos = ((Math.max(-3, Math.min(3, ratio)) + 3) / 6) * 100;
  return (
    <div>
      <div className="relative">
        <div className="flex h-2.5 overflow-hidden rounded-full">
          <div className="bg-rose-400/60" style={{ width: '16.7%' }} />
          <div className="bg-orange-400/60" style={{ width: '25%' }} />
          <div className="bg-amber-300/60" style={{ width: '16.6%' }} />
          <div className="bg-accent/60" style={{ width: '25%' }} />
          <div className="bg-emerald-400/60" style={{ width: '16.7%' }} />
        </div>
        <div
          className="absolute -top-[3px] h-[16px] w-[3px] rounded-full bg-white shadow-[0_0_8px_rgb(255_255_255/0.8)] transition-all duration-300"
          style={{ left: `calc(${pos}% - 1.5px)` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-muted">
        <span>−3x</span>
        <span>期望收益 ÷ 总投入</span>
        <span>+3x</span>
      </div>
    </div>
  );
}

/* ---------- 主组件 ---------- */

export default function KaogongCalc() {
  const [p, setP] = useState(DEFAULTS);
  const [showGuide, setShowGuide] = useState(false);
  const set = <K extends keyof Params,>(key: K) => (v: Params[K]) =>
    setP((prev) => ({ ...prev, [key]: v }));

  const result = useMemo(() => {
    // 备考时间系数：全职 = 全部工作时间让渡；在职 = 按 30% 时间占用折算
    const timeFactor = p.mode === 'full' ? 1 : 0.3;

    // ---- 投入侧：金钱成本 ----
    const oppCost = p.salary * p.months * timeFactor; // 单次机会成本
    const costPerAttempt = oppCost + p.directCost;
    const moneyCost = p.attempts * costPerAttempt;

    // ---- 胜率侧 ----
    const pSingle = Math.min(0.9, (1 / p.competition) * (50 / p.percentile));
    const P = 1 - Math.pow(1 - pSingle, p.attempts);

    // 期望备考月数：第 k 次考上 → k×months；n 次都没上岸 → n×months
    let evAttempts = p.attempts * Math.pow(1 - pSingle, p.attempts);
    for (let k = 1; k <= p.attempts; k++) {
      evAttempts += k * pSingle * Math.pow(1 - pSingle, k - 1);
    }
    const evPrepMonths = evAttempts * p.months;

    // ---- 投入侧：体验成本（原值，年轻权重统一在最后乘）----
    const experienceRaw = p.experienceCost * evPrepMonths;

    // ---- 收益侧：逐年 Δ(t) 折现 ----
    const r = p.discount / 100;
    const gA = p.growthPriv / 100;
    const gB = p.growthGov / 100;
    const t = Math.round(p.years);
    let payoff = 0;
    for (let year = 1; year <= t; year++) {
      const delta =
        p.govIncome * Math.pow(1 + gB, year - 1) + p.premium - p.salary * 12 * Math.pow(1 + gA, year - 1);
      payoff += delta / Math.pow(1 + r, year);
    }

    // 残值只抵扣金钱成本（技能可迁移，青春不能）；
    // 年轻权重乘全部年轻时失去的价值：金钱净成本 + 体验成本
    const netMoney = moneyCost * (1 - p.residual / 100);
    const totalCost = p.youthWeight * (netMoney + experienceRaw);
    const EV = P * payoff - totalCost;
    const pStar = payoff > 0 ? totalCost / payoff : null;
    const ratio = totalCost > 0 ? EV / totalCost : null;
    const tier = tierOf(EV, payoff, totalCost);

    return {
      oppCost, costPerAttempt, moneyCost, pSingle, P, evPrepMonths, experienceRaw,
      delta1: p.govIncome + p.premium - p.salary * 12, payoff, netMoney, totalCost, EV, pStar, ratio, tier,
    };
  }, [p]);

  const tone = TONE_STYLE[result.tier.tone];
  const premiumDisplay = `${p.premium >= 0 ? '+' : '−'}${yuan(Math.abs(p.premium))}/年`;

  return (
    <section className="section-shell py-24">
      {/* 页头 */}
      <div className="mb-10">
        <p className="font-display text-sm font-bold text-accent">WORK · 小工具</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          考公决策计算器
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          纯经济学金融视角：把「考不考」当成一次
          <span className="text-white">风险投资决策</span>——投入是备考的金钱成本与青春体验，
          收益按胜率（报录比 × 模考水平）和两条收入曲线的逐年差额折算。
          结论分五档：<span className="text-rose-300">强烈不建议</span> →{' '}
          <span className="text-amber-300">五五开</span> →{' '}
          <span className="text-emerald-400">强烈建议考</span>。
        </p>
      </div>

      {/* 参数区：四张卡片 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ParamCard title="备考投入">
          {/* 备考方式：全职 / 在职 切换 */}
          <div>
            <div className="mb-2 text-sm text-muted">备考方式</div>
            <div className="flex gap-2">
              {(['full', 'part'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => set('mode')(m)}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                    p.mode === m
                      ? 'border-accent/60 bg-accent/10 text-accent'
                      : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/25 hover:text-white'
                  }`}
                >
                  {m === 'full' ? '全职备考' : '在职备考'}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-muted">
              {p.mode === 'full'
                ? '机会成本 = 全部月薪 × 备考月数'
                : '在职备考按 30% 时间占用折算机会成本'}
            </p>
          </div>

          <Slider
            label="当前月薪（机会成本基准）"
            value={p.salary}
            min={3000}
            max={50000}
            step={500}
            display={yuan(p.salary)}
            onChange={set('salary')}
          />
          <Slider
            label="私企年薪涨幅"
            value={p.growthPriv}
            min={0}
            max={15}
            step={0.5}
            display={`${p.growthPriv}%`}
            hint="过去三年你的实际涨薪：互联网 8~15%，传统行业 2~5%"
            onChange={set('growthPriv')}
          />
          <Slider
            label="每次备考时长"
            value={p.months}
            min={1}
            max={12}
            step={1}
            display={`${p.months} 个月`}
            onChange={set('months')}
          />
          <Slider
            label="计划考几次"
            value={p.attempts}
            min={1}
            max={5}
            step={1}
            display={`${p.attempts} 次`}
            onChange={set('attempts')}
          />
          <Slider
            label="每次直接成本（报名费 + 资料 + 交通）"
            value={p.directCost}
            min={0}
            max={10000}
            step={100}
            display={yuan(p.directCost)}
            onChange={set('directCost')}
          />
          <p className="text-xs text-muted">
            金钱成本合计 {yuan(result.moneyCost)}（残值抵扣后 {yuan(result.netMoney)}，与体验成本一起乘年轻权重）
          </p>
        </ParamCard>

        <ParamCard title="成功收益 & 共同假设" twoCol>
          <Slider
            label="体制内年综合收入（成功后）"
            value={p.govIncome}
            min={30000}
            max={400000}
            step={5000}
            display={yuan(p.govIncome)}
            onChange={set('govIncome')}
          />
          <Slider
            label="体制内年薪涨幅"
            value={p.growthGov}
            min={0}
            max={8}
            step={0.5}
            display={`${p.growthGov}%`}
            hint="通常很低：职级并行后约 2~3%"
            onChange={set('growthGov')}
          />
          <Slider
            label="稳定性的个人溢价（主观赋值）"
            value={p.premium}
            min={-50000}
            max={50000}
            step={1000}
            display={premiumDisplay}
            hint="问自己：一份干到退休不裁员的工作，每年少拿多少钱也愿意去"
            onChange={set('premium')}
          />
          <Slider
            label="残值率（失败后技能/认知可回收比例）"
            value={p.residual}
            min={0}
            max={100}
            step={5}
            display={`${p.residual}%`}
            hint="备考内容和工作完全无关 0~15%；文字 / 教育 / 咨询类 40~60%"
            onChange={set('residual')}
          />
          <Slider
            label="折现率"
            value={p.discount}
            min={0}
            max={10}
            step={0.5}
            display={`${p.discount}%`}
            hint="未来的钱折算到今天：跟通胀 ≈3%；会理财、看重当下 5~8%；极有耐心 0~2%"
            onChange={set('discount')}
          />
          <Slider
            label="收益年限（年到退休）"
            value={p.years}
            min={5}
            max={40}
            step={1}
            display={`${p.years} 年`}
            hint="预计上岸后还能工作的年数"
            onChange={set('years')}
          />
          <p className="self-end text-xs leading-relaxed text-muted">
            首年净收益 Δ(1) = 体制内 {yuan(p.govIncome)} + 溢价 {premiumDisplay} − 体制外{' '}
            {yuan(p.salary * 12)}/年 ={' '}
            <span className={result.delta1 >= 0 ? 'text-accent' : 'text-white'}>
              {result.delta1 >= 0 ? '+' : '−'}{yuan(Math.abs(result.delta1))}/年
            </span>
            ；之后每年按两边涨幅各自滚动，私企涨得快则 Δ 逐年缩小。
          </p>
        </ParamCard>

        <ParamCard title="胜率估计">
          <Slider
            label="岗位竞争比（报录比）"
            value={p.competition}
            min={5}
            max={500}
            step={5}
            display={`${p.competition} : 1`}
            hint="查目标岗位去年的 报名数 ÷ 录取数；三不限常见 100~300:1"
            onChange={set('competition')}
          />
          <Slider
            label="过往模考百分位（前 X%，越小越强）"
            value={p.percentile}
            min={1}
            max={100}
            step={1}
            display={`前 ${p.percentile}%`}
            hint="用最近几次全真模考的稳定位次，别用单次最高"
            onChange={set('percentile')}
          />
          <p className="text-xs leading-relaxed text-muted">
            基准胜率 1/{p.competition} × 相对中位数倍数{' '}
            <span className="text-white">×{(50 / p.percentile).toFixed(1)}</span>
            （前 {p.percentile}% ≈ 中位水平的 {(50 / p.percentile).toFixed(1)} 倍）
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">单次胜率 p</span>
              <span className="font-medium text-accent">{pct(result.pSingle)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted">{p.attempts} 次内至少成功一次 P</span>
              <span className="font-medium text-accent">{pct(result.P)}</span>
            </div>
          </div>
        </ParamCard>

        <ParamCard title="青春与体验成本">
          <Slider
            label="备考体验成本（元/月）"
            value={p.experienceCost}
            min={0}
            max={10000}
            step={500}
            display={yuan(p.experienceCost)}
            hint="一个月不出游、不应酬、不碰爱好，补偿多少你觉得够；无感填 0"
            onChange={set('experienceCost')}
          />
          <Slider
            label="年轻权重（倍）"
            value={p.youthWeight}
            min={1}
            max={3}
            step={0.1}
            display={`${p.youthWeight.toFixed(1)} 倍`}
            hint="所有年轻时失去的价值都乘它：1 = 等价；2 = 年轻的 1 元值老年的 2 元；3 = 青春无价。「钱生钱」已由折现率体现，这里只管效用差异"
            onChange={set('youthWeight')}
          />
          <p className="text-xs leading-relaxed text-muted">
            所有年轻时失去的价值——放弃的工资、报名费、体验——都乘同一个年轻权重。
            残值只抵扣金钱部分（技能能迁移，青春不能）。
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">期望备考时长</span>
              <span className="font-medium text-white">{result.evPrepMonths.toFixed(1)} 个月</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted">体验成本（原值）</span>
              <span className="font-medium text-white">{wan(result.experienceRaw)} 万</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted">加权后总成本（金钱净成本 + 体验）</span>
              <span className="font-medium text-accent">{wan(result.totalCost)} 万</span>
            </div>
          </div>
        </ParamCard>
      </div>

      {/* 结论横幅 + 档位标尺 */}
      <div className={`mt-5 rounded-3xl border p-6 md:p-8 ${tone.border} ${tone.bg}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full border bg-black/20 px-3.5 py-1 text-sm font-bold ${tone.border} ${tone.text}`}>
            {result.tier.name}
          </span>
          <p className="text-sm text-muted">按纯金融视角的期望净收益（EV）</p>
        </div>
        <p className="mt-3 text-2xl font-bold text-white md:text-3xl">
          EV {result.EV >= 0 ? '+' : '−'} {wan(Math.abs(result.EV))} 万
          {result.ratio !== null && (
            <span className={`ml-3 text-base font-normal ${tone.text}`}>
              = 投入的 {result.ratio >= 0 ? '+' : '−'}{Math.abs(result.ratio).toFixed(2)} 倍
            </span>
          )}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {result.tier.note} · 总胜率 {pct(result.P)} vs 盈亏平衡{' '}
          {result.pStar !== null ? pct(result.pStar) : '—（年净收益 ≤ 0，不可能回本）'}
          {result.pStar !== null && (result.P >= result.pStar ? ' · 胜率过线' : ' · 胜率未达盈亏平衡')}
        </p>
        {result.ratio !== null && (
          <div className="mt-5">
            <Gauge ratio={result.ratio} />
          </div>
        )}
      </div>

      {/* 关键数字 */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="单次胜率 p" value={pct(result.pSingle)} hint={`报录比 ${p.competition}:1 × 个人倍数`} />
        <Stat label={`${p.attempts} 次内至少成功 P`} value={pct(result.P)} highlight />
        <Stat
          label="期望备考时长"
          value={`${result.evPrepMonths.toFixed(1)} 个月`}
          hint={`总成本 ${wan(result.totalCost)} 万（含 ${p.youthWeight.toFixed(1)} 倍年轻权重）`}
        />
        <Stat
          label="成功收益现值 payoff"
          value={`${result.payoff >= 0 ? '' : '−'}${wan(Math.abs(result.payoff))} 万`}
          hint={`逐年 Δ(t) 折现 ${p.years} 年 · r=${p.discount}%`}
        />
      </div>

      {/* 公式 & 简化假设 */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-3 font-medium text-white">公式</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted">{`单次胜率  p = min(0.9, 1/竞争比 × 50/模考百分位)
总胜率    P = 1 − (1−p)^n
备考期望  E[m] = (Σ k·p(1−p)^(k−1) + n·(1−p)^n) × 每次月数
金钱成本  C = n × (月薪×月数×时间系数 + 直接成本)    全职1 / 在职0.3
体验成本  Y = 体验成本/月 × E[m]
总成本    T = 年轻权重 × ( C×(1−残值率) + Y )    残值只抵扣金钱部分
年净收益  Δ(t) = 体制内×(1+g体)^(t−1) + 溢价 − 月薪×12×(1+g私)^(t−1)
成功收益  payoff = Σ Δ(t)/(1+r)^t     (t = 1…收益年限)
期望净收益 EV = P × payoff − T
盈亏平衡  P* = T / payoff`}</pre>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-3 font-medium text-white">简化假设</h3>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
            <li>在职备考按 30% 时间占用折算机会成本（精力分散、加班冲突）</li>
            <li>胜率 = 报录比基准 × 模考相对中位数的倍数，单次封顶 90%</li>
            <li>残值率只抵扣金钱成本；年轻权重乘全部年轻时失去的价值——「钱生钱」的复利已由折现率体现，权重只表达效用差异（同样的钱年轻更经花）</li>
            <li>私企、体制内收入各自按年复合增长——私企涨得快时，年净收益 Δ 会逐年缩小甚至转负</li>
            <li>未建模：备考期间私企涨薪、跳槽跳变、考上后职级晋升、地区与岗位差异</li>
          </ul>
        </div>
      </div>

      {/* 参数怎么选（可展开） */}
      <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <button
          type="button"
          onClick={() => setShowGuide((s) => !s)}
          className="flex w-full items-center justify-between text-left"
        >
          <h3 className="font-medium text-white">📖 参数怎么选？</h3>
          <span className="text-xs text-muted">{showGuide ? '收起 ▲' : '展开 ▼'}</span>
        </button>
        {showGuide && (
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ['报录比', '目标岗位去年 报名人数 ÷ 招录人数。「三不限」岗位常见 100~300:1，专业限制多、要求应届的岗可能 <30:1。'],
              ['模考百分位', '最近几次全真模考的稳定位次百分比（前 10% 就填 10）。不要用单次最高分，用中位水平。'],
              ['私企涨幅', '看过去三年你的实际涨薪。互联网 8~15%，传统行业 2~5%。这条直接决定「不考公」的机会成本涨多快。'],
              ['体制内涨幅', '普遍很低，职级并行后约 2~3%，按目标地区实际情况填。'],
              ['稳定性溢价', '主观题：一份「干到退休不裁员」的工作，每年少拿多少钱你也愿意去？求安稳填正（1~3 万），讨厌束缚填负。'],
              ['残值率', '考不上时，备考学的东西以后还值多少。跨专业、和现在工作完全无关 → 0~15%；文字、教育、咨询、分析类工作 → 40~60%；默认 25%。'],
              ['折现率', '「未来的钱打几折算今天」。跟着通胀走 ≈3%；会理财、更看重眼前 → 5~8%；极度耐心、钱放着不动 → 0~2%。'],
              ['备考体验成本', '一个月不出门、不应酬、不旅游、不碰爱好，补给你多少钱觉得够本？无感填 0，很在意填 5000+。'],
              ['年轻权重', '所有年轻时失去的价值（放弃的工资、报名费、体验）都乘这个倍数。1 = 年轻与老年等价；2 = 年轻失去 1 元值老年 2 元；3 = 青春无价。钱的「生息能力」已由折现率体现，这个倍数只管效用。'],
              ['收益年限', '预计上岸年龄到法定退休的年数。30 岁上岸、60 岁退休就填 30。'],
            ].map(([term, desc]) => (
              <div key={term}>
                <dt className="font-medium text-white">{term}</dt>
                <dd className="mt-0.5 leading-relaxed text-muted">{desc}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
