let sketch1 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(150, 200);
    canvas.parent("character1");
    character = {
      headEmoji: "🧑‍🦰",
    };
    buffer1 = p.createGraphics(150, 200);
  };

  p.draw = function () {
    p.clear();
    p.image(buffer1, 0, 0);

    p.strokeWeight(3);
    p.textSize(60);

    p.text(character.headEmoji, 35, 60);

    p.mouseDragged = () => {
      buffer1.stroke("#f01e2c");
      buffer1.strokeWeight(5);
      buffer1.ellipse(p.mouseX, p.mouseY, 3, 3);
    };
  };

  function updateCharacter() {
    character.headEmoji = p.select("#headEmoji1").value();
  }

  p.select("#headEmoji1").changed(updateCharacter);
  p.select(".player1 .btn-clear").mousePressed(() => buffer1.clear());

  p.saveSketch = function () {
    p.saveCanvas("character1.png", "png");
  };
};

let sketch2 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(150, 200);
    canvas.parent("character2");
    character = {
      headEmoji: "👧",
    };
    buffer2 = p.createGraphics(150, 200);
  };

  p.draw = function () {
    p.clear();
    p.image(buffer2, 0, 0);

    p.strokeWeight(3);
    p.textSize(60);

    p.text(character.headEmoji, 35, 60);

    p.mouseDragged = () => {
      buffer2.stroke("#02b1d7");
      buffer2.strokeWeight(5);
      buffer2.ellipse(p.mouseX, p.mouseY, 3, 3);
    };
  };

  function updateCharacter() {
    character.headEmoji = p.select("#headEmoji2").value();
  }

  p.select("#headEmoji2").changed(updateCharacter);
  p.select(".player2 .btn-clear").mousePressed(() => buffer2.clear());

  p.saveSketch = function () {
    p.saveCanvas("character2.png", "png");
  };
};

let character1 = new p5(sketch1);
let character2 = new p5(sketch2);

function saveSketches() {
  let dataURL1 = character1.canvas.toDataURL("image/png");
  localStorage.setItem("character1", dataURL1);

  let dataURL2 = character2.canvas.toDataURL("image/png");
  localStorage.setItem("character2", dataURL2);

  setTimeout(() => {
    window.location.href = "/game.html";
  }, 1000);
}