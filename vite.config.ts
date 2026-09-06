import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // './' 让构建产物可在任意路径/子目录运行（CloudBase 默认域名、以后换平台都不用改）
  base: './',
  plugins: [react()],
});
