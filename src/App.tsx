import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import Demographics from './sections/Demographics';
import Timeline from './sections/Timeline';
import Album from './sections/Album';
import Skills from './sections/Skills';
import Works from './sections/Works';
import Hobbies from './sections/Hobbies';
import Pets from './sections/Pets';
import Anime from './sections/Anime';
import Games from './sections/Games';
import DatingProfile from './sections/DatingProfile';
import Contact from './sections/Contact';
import PrivateGate from './components/ui/PrivateGate';
import { useUnlock } from './context/UnlockContext';
import { privateGate } from './content/private';

/**
 * 页面组合：首页有哪些板块、什么顺序，都在这里调
 * 加 / 删 / 换板块只改这个文件，不动板块内部
 *
 * 「生活」这一组（爱好/宠物/追番/游戏/Profile）是私密板块：
 *   未解锁 → 渲染一个 PrivateGate 占位块（锁 + 提示 + 解锁按钮）
 *   已解锁 → 渲染全部五个真实 section（全局密码一次解锁，密码在 access.ts 改）
 */
export default function App() {
  const { unlocked } = useUnlock();

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />
      <main>
        <Hero />
        <Demographics />
        <Timeline />
        <Album />
        <Skills />
        <Works />
        {unlocked ? (
          <>
            <Hobbies />
            <Pets />
            <Anime />
            <Games />
            <DatingProfile />
          </>
        ) : (
          <PrivateGate id="life" {...privateGate.life} />
        )}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
