"use strict";
let timer = null;
let typing = false;
function typeText(el, text, speed = 50) {
  if (timer !== null) clearInterval(timer);
  typing = true;
  el.textContent = "";
  let i = 0;
  timer = setInterval(() => {
    i++;
    el.textContent = text.slice(0, i);
    if (i >= text.length) {
      clearInterval(timer);
      timer = null;
      typing = false;
    }
  }, speed);
}
function stopType() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  typing = false;
}
window.typeText = typeText;
window.stopType = stopType;
