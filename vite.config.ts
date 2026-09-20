import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  // './' 让构建产物可在任意路径/子目录运行（CloudBase 默认域名、以后换平台都不用改）
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      // 多入口：主页 + 作品子页面
      // 子页面共用全站外壳（导航/页脚），内容组件在 src/work/ 里
      // 以后加新子页面：在 works/ 下建 <slug>/index.html（复制 kaogong 那份、改标题），再来这里加一行
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        kaogong: fileURLToPath(new URL('./works/kaogong/index.html', import.meta.url)),
      },
    },
  },
});
