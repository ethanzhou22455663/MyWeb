import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import Profile from './sections/Profile';
import Timeline from './sections/Timeline';
import Resume from './sections/Resume';
import Skills from './sections/Skills';
import Works from './sections/Works';
import Life from './sections/Life';
import Contact from './sections/Contact';
import PrivateGate from './components/ui/PrivateGate';
import { useUnlock } from './context/UnlockContext';
import { privateGate } from './content/private';

/**
 * 页面组合：首页有哪些板块、什么顺序，都在这里调
 * 加 / 删 / 换板块只改这个文件，不动板块内部
 *
 * 「生活」是私密板块：
 *   未解锁 → 渲染 PrivateGate 占位块（锁 + 提示 + 解锁按钮）
 *   已解锁 → 渲染真实 Life（全局密码一次解锁，密码在 access.ts 改）
 */
export default function App() {
  const { unlocked } = useUnlock();

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />
      <main>
        <Hero />
        <Profile />
        <Timeline />
        <Resume />
        <Skills />
        <Works />
        {unlocked ? <Life /> : <PrivateGate id="life" {...privateGate.life} />}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
