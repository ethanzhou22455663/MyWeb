import { useMemo, useState, type ReactNode } from 'react';

/**
 * 考公决策计算器（纯金融视角）
 * 把「考公」与「不考公」两条人生路径折算成期望终身收入现值，再比较
 * 模型：每年上岸概率 p，最多考 K 年；P(k)=p(1-p)^(k-1) 第 k 年上岸，
 *       未上岸 (1-p)^K 则 K 年后重回私企轨道；收入按年折现，养老金按替代率计入
 */

interface Params {
  salary: number; // 当前私企月薪
  growthPriv: number; // 私企年薪涨幅 %
  gapMonths: number; // 私企每年空窗月数（换工作 / 失业间隙）
  prepIncome: number; // 备考期月收入（0 = 全职备考）
  passRate: number; // 每年上岸概率 %
  maxTry: number; // 最多考几年
  govSalary: number; // 公务员起薪月薪
  growthGov: number; // 公务员年薪涨幅 %
  yearsToRetire: number; // 距离退休年数 T
  pensionYears: number; // 退休后领取年数 L
  repPriv: number; // 私企养老金替代率 %
  repGov: number; // 公务员养老金替代率 %
  discount: number; // 年化折现率 %
}

const DEFAULTS: Params = {
  salary: 12000,
  growthPriv: 5,
  gapMonths: 1,
  prepIncome: 0,
  passRate: 30,
  maxTry: 3,
  govSalary: 8000,
  growthGov: 2,
  yearsToRetire: 30,
  pensionYears: 20,
  repPriv: 45,
  repGov: 85,
  discount: 3,
};

/** 元 → 中文万，保留一位小数 */
const wan = (n: number) =>
  (n / 10000).toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display?: string;
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
    </label>
  );
}

function ParamCard({ title, wide, children }: { title: string; wide?: boolean; children: ReactNode }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur ${
        wide ? 'lg:col-span-2' : ''
      }`}
    >
      <h3 className="mb-5 font-medium text-white">{title}</h3>
      <div className={wide ? 'grid gap-5 sm:grid-cols-3' : 'space-y-5'}>{children}</div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${
        highlight ? 'border-accent/40 bg-accent/[0.08]' : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export default function KaogongCalc() {
  const [p, setP] = useState(DEFAULTS);
  const set = (key: keyof Params) => (v: number) => setP((prev) => ({ ...prev, [key]: v }));

  const result = useMemo(() => {
    const r = p.discount / 100;
    const T = Math.round(p.yearsToRetire); // 工作年数
    const L = Math.round(p.pensionYears); // 退休年数
    const K = Math.round(p.maxTry); // 最多考几年
    const pass = p.passRate / 100;
    const gA = p.growthPriv / 100;
    const gB = p.growthGov / 100;

    // 现值：stream[i] 是第 i+1 年拿到的钱
    const pv = (stream: number[]) =>
      stream.reduce((sum, amt, i) => sum + amt / Math.pow(1 + r, i + 1), 0);

    // 私企第 t 年收入（扣掉空窗月）；公务员第 n 个工龄年收入
    const priv = (t: number) =>
      p.salary * 12 * Math.pow(1 + gA, t - 1) * ((12 - p.gapMonths) / 12);
    const gov = (n: number) => p.govSalary * 12 * Math.pow(1 + gB, n - 1);

    // 路径 A：一直在私企 + 私企养老金
    const streamA: number[] = Array.from({ length: T }, (_, i) => priv(i + 1));
    for (let j = 1; j <= L; j++) streamA.push(priv(T) * (p.repPriv / 100));
    const pvA = pv(streamA);

    // 路径 B 分支：第 k 年上岸（前 k-1 年备考低收入，第 k 年起公务员）
    const pvPassAt = (k: number) => {
      const s: number[] = [];
      for (let t = 1; t <= T; t++) s.push(t < k ? p.prepIncome * 12 : gov(t - k + 1));
      for (let j = 1; j <= L; j++) s.push(gov(T - k + 1) * (p.repGov / 100));
      return pv(s);
    };

    // 路径 B 分支：K 年都没上岸，之后重回私企轨道
    const pvNever = () => {
      const s: number[] = [];
      for (let t = 1; t <= T; t++) s.push(t <= K ? p.prepIncome * 12 : priv(t));
      for (let j = 1; j <= L; j++) s.push(priv(T) * (p.repPriv / 100));
      return pv(s);
    };

    let evB = Math.pow(1 - pass, K) * pvNever();
    const passWithin = 1 - Math.pow(1 - pass, K);
    let prepYears = K * Math.pow(1 - pass, K); // 未上岸的备考年数
    for (let k = 1; k <= K; k++) {
      const prob = pass * Math.pow(1 - pass, k - 1);
      evB += prob * pvPassAt(k);
      prepYears += (k - 1) * prob;
    }

    return { pvA, evB, diff: evB - pvA, passWithin, prepYears };
  }, [p]);

  const win = result.diff >= 0;

  return (
    <section className="section-shell py-24">
      {/* 页头 */}
      <div className="mb-10">
        <p className="font-display text-sm font-bold text-accent">WORK · 小工具</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          考公决策计算器
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          纯经济学金融视角：把「考公」与「不考公」折算成
          <span className="text-white">期望终身收入现值</span>
          再比较——上岸概率、备考成本、收入涨幅、养老金替代率，全部进同一个公式。
        </p>
      </div>

      {/* 参数区 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ParamCard title="私企路径">
          <Slider
            label="当前月薪"
            value={p.salary}
            min={3000}
            max={50000}
            step={500}
            display={`¥${p.salary.toLocaleString('zh-CN')}`}
            onChange={set('salary')}
          />
          <Slider
            label="年薪涨幅"
            value={p.growthPriv}
            min={0}
            max={15}
            step={0.5}
            display={`${p.growthPriv}%`}
            onChange={set('growthPriv')}
          />
          <Slider
            label="每年空窗月数（换工作 / 失业间隙）"
            value={p.gapMonths}
            min={0}
            max={6}
            step={0.5}
            display={`${p.gapMonths} 个月`}
            onChange={set('gapMonths')}
          />
        </ParamCard>

        <ParamCard title="考公路径">
          <Slider
            label="公务员起薪月薪"
            value={p.govSalary}
            min={3000}
            max={30000}
            step={500}
            display={`¥${p.govSalary.toLocaleString('zh-CN')}`}
            onChange={set('govSalary')}
          />
          <Slider
            label="公务员年薪涨幅"
            value={p.growthGov}
            min={0}
            max={10}
            step={0.5}
            display={`${p.growthGov}%`}
            onChange={set('growthGov')}
          />
          <Slider
            label="备考期月收入（0 = 全职备考）"
            value={p.prepIncome}
            min={0}
            max={20000}
            step={500}
            display={`¥${p.prepIncome.toLocaleString('zh-CN')}`}
            onChange={set('prepIncome')}
          />
          <Slider
            label="每年上岸概率"
            value={p.passRate}
            min={5}
            max={90}
            step={1}
            display={`${p.passRate}%`}
            onChange={set('passRate')}
          />
          <Slider
            label="最多考几年"
            value={p.maxTry}
            min={1}
            max={5}
            step={1}
            display={`${p.maxTry} 年`}
            onChange={set('maxTry')}
          />
        </ParamCard>

        <ParamCard title="共同假设" wide>
          <Slider
            label="距离退休"
            value={p.yearsToRetire}
            min={10}
            max={40}
            step={1}
            display={`${p.yearsToRetire} 年`}
            onChange={set('yearsToRetire')}
          />
          <Slider
            label="退休后领取养老金"
            value={p.pensionYears}
            min={10}
            max={30}
            step={1}
            display={`${p.pensionYears} 年`}
            onChange={set('pensionYears')}
          />
          <Slider
            label="私企养老金替代率"
            value={p.repPriv}
            min={20}
            max={60}
            step={1}
            display={`${p.repPriv}%`}
            onChange={set('repPriv')}
          />
          <Slider
            label="公务员养老金替代率"
            value={p.repGov}
            min={60}
            max={95}
            step={1}
            display={`${p.repGov}%`}
            onChange={set('repGov')}
          />
          <Slider
            label="年化折现率"
            value={p.discount}
            min={0}
            max={10}
            step={0.5}
            display={`${p.discount}%`}
            onChange={set('discount')}
          />
          <p className="self-end text-xs leading-relaxed text-muted">
            替代率 = 养老金 ÷ 退休前年薪；折现率可理解为「未来的钱打几折算到今天」。
          </p>
        </ParamCard>
      </div>

      {/* 结论横幅 */}
      <div
        className={`mt-5 rounded-3xl border p-6 md:p-8 ${
          win ? 'border-accent/40 bg-accent/[0.08]' : 'border-white/10 bg-white/[0.03]'
        }`}
      >
        <p className="text-sm text-muted">按纯金融视角的期望值结论</p>
        <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
          {win ? '考公期望更划算' : '不考公期望更划算'}
          <span className="ml-3 font-display text-accent">差 {wan(Math.abs(result.diff))} 万</span>
        </p>
        <p className="mt-2 text-xs text-muted">
          {Math.round(result.passWithin * 100)}% 的概率在 {Math.round(p.maxTry)} 年内上岸 ·
          期望备考 {(result.prepYears).toFixed(1)} 年
        </p>
      </div>

      {/* 三个关键数字 */}
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Stat label="不考公 · 终身收入现值" value={`${wan(result.pvA)} 万`} />
        <Stat label="考公 · 期望终身收入现值" value={`${wan(result.evB)} 万`} highlight />
        <Stat
          label="现值差（考公 − 不考公）"
          value={`${result.diff >= 0 ? '+' : '−'}${wan(Math.abs(result.diff))} 万`}
        />
      </div>

      {/* 公式 & 简化假设 */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-3 font-medium text-white">公式</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted">{`EV(考公) = Σ P(k)·PV(第k年上岸) + (1-p)^K · PV(未上岸)
P(k) = p·(1-p)^(k-1)
PV = Σ 收入_t / (1+r)^t  +  Σ 养老金_j / (1+r)^(T+j)
养老金 = 退休前年薪 × 替代率`}</pre>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-3 font-medium text-white">简化假设</h3>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
            <li>薪资按年复利增长，不考虑跳槽跳变、职级跃升</li>
            <li>私企的职业风险只用「每年空窗月数」粗略刻画</li>
            <li>名义金额折现，通胀影响已含在涨幅与折现率里</li>
            <li>纯货币比较：稳定性、工作满意度、社会地位等不在模型内</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
