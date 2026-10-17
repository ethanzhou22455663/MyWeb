// 小工具函数

export const $ = (sel, root = document) => root.querySelector(sel);

export const rand = (a, b) => a + Math.random() * (b - a);

export const pick = (arr) => arr[(Math.random() * arr.length) | 0];

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isSmall = () => Math.min(innerWidth, innerHeight) < 700;
