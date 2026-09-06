/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 颜色 token 定义在 src/index.css 的 :root 里，改那里全站生效
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"PingFang SC"', '"Noto Sans SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
