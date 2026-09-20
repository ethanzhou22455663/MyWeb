import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import KaogongCalc from './KaogongCalc';

/**
 * 作品子页面：全站外壳（导航 / 页脚 / 背景设计）+ 本项目自己的内容组件
 * 本页内容：考公决策计算器（纯金融视角）
 */
export default function WorkApp() {
  return (
    <div className="min-h-screen bg-bg text-white">
      {/* ../../ 退回站点根：导航锚点才能指回主页板块 */}
      <Navbar root="../../" />
      <main>
        <KaogongCalc />
      </main>
      <Footer />
    </div>
  );
}
