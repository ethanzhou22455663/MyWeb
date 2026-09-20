"use strict";
let MODE = "fwd";
const START_ID = "s33";
const NAME = { X: "", B: "\u4ED6", G: "\u5979" };
function splitWho(s) {
  const p = s.indexOf("|");
  return p >= 0 ? { who: s.slice(0, p).trim(), text: s.slice(p + 1).trim() } : { who: s.trim(), text: "" };
}
function parseStory(text) {
  const scenes = [];
  let cur = null;
  let bucket = null;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    if (line.startsWith("@")) {
      const p = line.indexOf("|");
      const id = p >= 0 ? line.slice(1, p).trim() : line.slice(1).trim();
      const image = p >= 0 ? line.slice(p + 1).trim() : "";
      cur = { id, image, forwardLines: [], backwardLines: [] };
      scenes.push(cur);
      bucket = cur.forwardLines;
    } else {
      if (!cur) throw new Error("\u6709\u53F0\u8BCD\u51FA\u73B0\u5728\u7B2C\u4E00\u4E2A @ \u573A\u666F\u4E4B\u524D\uFF1A" + line);
      if (line.startsWith(">>")) {
        bucket = cur.backwardLines;
        cur.backwardLines.push(splitWho(line.slice(2)));
      } else {
        bucket.push(splitWho(line));
      }
    }
  }
  return scenes;
}
const script = parseStory(STORY_TEXT);
let sceneIndex = Math.max(0, script.findIndex((s) => s.id === START_ID));
let STEP = MODE === "rev" ? -1 : 1;
let lineIndex = 0;
let isEnd = false;
function curScene() {
  return script[sceneIndex];
}
function curLines() {
  return MODE === "fwd" ? curScene().forwardLines : curScene().backwardLines;
}
const layerA = document.getElementById("bg-a");
const layerB = document.getElementById("bg-b");
let curLayer = layerA;
let shownSceneId = "";
let sliding = false;
const GAP = 4;
function showImage(src, direction) {
  sliding = true;
  const oldLayer = curLayer;
  const incoming = oldLayer === layerA ? layerB : layerA;
  const shift = direction * (100 + GAP);
  incoming.src = src;
  incoming.style.transition = "none";
  incoming.style.transform = `translateX(${shift}%)`;
  void incoming.offsetWidth;
  incoming.style.transition = "";
  incoming.style.transform = "translateX(0)";
  oldLayer.style.transform = `translateX(${-shift}%)`;
  incoming.addEventListener("transitionend", () => {
    sliding = false;
  }, { once: true });
  curLayer = incoming;
}
function render() {
  const speakerEl = document.getElementById("speaker");
  const textEl = document.getElementById("text");
  const endPage = document.getElementById("title");
  if (isEnd) {
    speakerEl.textContent = "";
    stopType();
    endPage.style.display = "flex";
    return;
  }
  endPage.style.display = "none";
  const scene = curScene();
  if (scene.id !== shownSceneId) {
    showImage(scene.image, STEP);
    shownSceneId = scene.id;
  }
  const lines = curLines();
  const line = lines.length > 0 ? lines[Math.min(lineIndex, lines.length - 1)] : { who: "X", text: "" };
  speakerEl.textContent = NAME[line.who];
  typeText(textEl, line.text);
}
function advance() {
  if (isEnd) return;
  startBgm();
  if (typing || sliding) return;
  const lines = curLines();
  const next = sceneIndex + STEP;
  if (lineIndex < lines.length - 1) {
    lineIndex++;
  } else if (next >= 0 && next < script.length) {
    sceneIndex = next;
    lineIndex = 0;
  } else {
    isEnd = true;
  }
  render();
}
function rewind() {
  MODE = MODE === "fwd" ? "rev" : "fwd";
  STEP = MODE === "rev" ? -1 : 1;
  lineIndex = 0;
  isEnd = false;
  render();
}
const titleEl = document.getElementById("title");
document.getElementById("start").addEventListener("click", (ev) => {
  ev.stopPropagation();
  rewind();
});
const bgm = document.getElementById("bgm");
let bgmStarted = false;
function startBgm() {
  if (bgmStarted) return;
  bgmStarted = true;
  bgm.volume = 0.5;
  void bgm.play();
}
window.addEventListener("click", advance);
render();
