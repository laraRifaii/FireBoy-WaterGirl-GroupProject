let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let text = document.querySelector("h1");
let scrollBox = document.querySelector(".box");
let startBtn = document.querySelector(".btn-start");
let redMountain = document.querySelector(".mountain-red");
let blueMountain = document.querySelector(".mountain-blue");
let farTrees = document.querySelector(".far-trees-layer");
let trees = document.querySelector(".trees-layer");
let overgroundImage = document.querySelector(".overground-image");

// for the parallax effect
window.addEventListener("scroll", () => {
  let value = window.scrollY;

  farTrees.style.marginTop = value / 25 + "px";
  trees.style.marginBottom = value / 11 + "px";
  player1.style.left = value * 0.1 + "px";
  player2.style.right = value * 0.1 + "px";
  text.style.marginTop = value * 1.5 + "px";
  scrollBox.style.transform = `translateY(${value * 1}px)`;
  startBtn.style.transform = `scale(${value / 900})`;
  blueMountain.style.transform = `translate(${-value / 10}px, ${value / 10}px)`;
  redMountain.style.transform = `translate(${value / 10}px, ${value / 10}px)`;
  overgroundImage.transform = `translateY(${value * 6}px)`;
});
