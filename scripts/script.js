
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let text = document.querySelector("h1");
let startBtn = document.querySelector(".btn-start");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  player1.style.left = value * 0.4 + "px";
  player2.style.right = value * 0.4 + "px";
  // text.style.marginTop = value * 0.8 + "px";
  startBtn.style.transform = `scale(${value / 800})`;
});

