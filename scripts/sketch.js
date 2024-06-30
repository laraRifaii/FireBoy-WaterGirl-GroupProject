let Character = function (p, x, y, bodyAndArmsColor, legsColor, headEmoji) {
  this.x = x;
  this.y = y;

  this.bodyAndArmsColor = bodyAndArmsColor;
  this.legsColor = legsColor;
  this.headEmoji = headEmoji;

  this.draw = function () {
    p.strokeWeight(3);

    //Head
    p.textSize(40);
    //Body
    p.clear();
    p.fill(this.bodyAndArmsColor);
    p.rect(this.x - 17, this.y - 20, 35, 60);
    p.text(this.headEmoji, this.x - 27, this.y - 30);

    //Legs
    p.fill(this.legsColor);
    p.rect(this.x - 15, this.y + 40, 14, 27);
    p.rect(this.x + 4, this.y + 40, 14, 27);

    //Arms
    p.fill(this.bodyAndArmsColor);
    p.rotate(0.19);
    p.rect(this.x - 19, this.y - 22, 14, 50);
    p.rotate(-0.4);
    p.rect(this.x + 3, this.y - 6, 14, 50);
  };

  this.saveAsPNG = function (filename) {
    p.saveCanvas(filename, "png");
  };
};

let sketch1 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(80, 137);
    canvas.parent("character1");
    character = new Character(
      p,
      p.width / 2,
      p.height / 2,
      "#e44d26",
      "#ff8e29",
      "🧑‍🦰"
    );
  };

  p.draw = function () {
    character.draw();
  };

  function updateCharacter() {
    character.legsColor = p.select("#legsColor1").value();
    character.headEmoji = p.select("#headEmoji1").value();
  }

  p.select("#legsColor1").changed(updateCharacter);
  p.select("#headEmoji1").changed(updateCharacter);

  p.saveSketch = function () {
    character.saveAsPNG("character1.png");
  };
};

let sketch2 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(80, 137);
    canvas.parent("character2");
    character = new Character(
      p,
      p.width / 2,
      p.height / 2,
      "#0268d7",
      "#5c9ae9",
      "👧"
    );
  };

  p.draw = function () {
    character.draw();
  };

  function updateCharacter() {
    character.legsColor = p.select("#legsColor2").value();
    character.headEmoji = p.select("#headEmoji2").value();
  }

  p.select("#legsColor2").changed(updateCharacter);
  p.select("#headEmoji2").changed(updateCharacter);

  p.saveSketch = function () {
    character.saveAsPNG("character2.png");
  };
};

let instance1 = new p5(sketch1);
let instance2 = new p5(sketch2);

function saveSketches() {
  instance1.saveSketch();
  instance2.saveSketch();
}
