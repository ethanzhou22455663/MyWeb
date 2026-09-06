import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import Timeline from './sections/Timeline';
import Skills from './sections/Skills';
import Works from './sections/Works';
import About from './sections/About';
import Contact from './sections/Contact';

/**
 * 页面组合：首页有哪些板块、什么顺序，都在这里调
 * 加 / 删 / 换板块只改这个文件，不动板块内部
 */
export default function App() {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Skills />
        <Works />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
