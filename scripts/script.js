let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let text = document.querySelector("h1");
let scrollBox = document.querySelector(".box");
let startBtn = document.querySelector(".btn-start");

let farTrees = document.querySelector(".far-trees-layer");
let trees = document.querySelector(".trees-layer");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  farTrees.style.marginTop = value / 25 + "px";
  trees.style.marginBottom = value / 11 + "px";

  player1.style.left = value * 0.3 + "px";
  player2.style.right = value * 0.3 + "px";
  text.style.marginTop = value * 1.5 + "px";
  scrollBox.style.top = 430 + value * 1.5 + "px";
  startBtn.style.transform = `scale(${value / 800})`;
});