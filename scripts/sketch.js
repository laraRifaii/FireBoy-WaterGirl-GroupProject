let sketch1 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(80, 137);
    p.background(255);
    canvas.parent("character1");
    character = {
      headEmoji: "🧑‍🦰",
    };
  };

  p.draw = function () {
    p.clear();
    p.strokeWeight(3);
    p.textSize(40);

    // Draw character 1
    p.text(character.headEmoji, 14, 40);
    p.fill("#e44d26");
    p.rect(25, 50, 35, 60);

    p.push();
    p.rotate(0.19);
    p.rect(25, 46, 14, 50);
    p.rotate(-0.4);
    p.rect(43, 63, 14, 50);
    p.pop();

    p.rect(25, 110, 14, 27);
    p.rect(45, 110, 14, 27);
  };

  function updateCharacter() {
    character.legsColor = p.select("#legsColor1").value();
    character.headEmoji = p.select("#headEmoji1").value();
  }

  p.select("#legsColor1").changed(updateCharacter);
  p.select("#headEmoji1").changed(updateCharacter);

  p.saveSketch = function () {
    p.saveCanvas("character1.png", "png");
  };
};

let sketch2 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(80, 137);
    canvas.parent("character2");
    character = {
      headEmoji: "👧",
    };
  };

  p.draw = function () {
    p.clear();
    p.strokeWeight(3);
    p.textSize(40);

    p.text(character.headEmoji, 14, 40);
    p.fill("#0268d7");
    p.rect(25, 50, 35, 60);

    p.push();
    p.rotate(0.19);
    p.rect(25, 46, 14, 50);
    p.rotate(-0.4);
    p.rect(43, 63, 14, 50);
    p.pop();

    p.rect(25, 110, 14, 27);
    p.rect(45, 110, 14, 27);
  };

  function updateCharacter() {
    character.legsColor = p.select("#legsColor2").value();
    character.headEmoji = p.select("#headEmoji2").value();
  }

  p.select("#legsColor2").changed(updateCharacter);
  p.select("#headEmoji2").changed(updateCharacter);

  p.saveSketch = function () {
    p.saveCanvas("character2.png", "png");
  };
};

let character1 = new p5(sketch1);
let character2 = new p5(sketch2);

function saveSketches() {
  character1.saveSketch();
  character2.saveSketch();
}
