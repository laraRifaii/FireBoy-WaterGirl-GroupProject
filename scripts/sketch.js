// Character object with configurable parts
let Character = function (p, x, y, bodyAndArmsColor, legsColor, headEmoji) {
  // Position
  this.x = x;
  this.y = y;

  // Colors and Emoji
  this.bodyAndArmsColor = bodyAndArmsColor;
  this.legsColor = legsColor;
  this.headEmoji = headEmoji;

  // Draw function
  this.draw = function () {
    p.strokeWeight(3);

    // Body
    p.fill(this.bodyAndArmsColor);
    p.rect(this.x - 20, this.y - 40, 40, 60);

    // Legs
    p.fill(this.legsColor);
    p.rect(this.x - 15, this.y + 20, 12, 25);
    p.rect(this.x + 5, this.y + 20, 12, 25);

    // Arms
    p.fill(this.bodyAndArmsColor);
    p.rect(this.x - 25, this.y - 40, 10, 50);
    p.rect(this.x + 15, this.y - 40, 10, 50);

    // Head
    p.textSize(35);
    p.text(this.headEmoji, this.x - 22, this.y - 50);
  };

  // Function to save sketch as PNG
  this.saveAsPNG = function (filename) {
    p.saveCanvas(filename, "png");
  };
};

// p5.js sketches for each character
let sketch1 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(200, 300);
    canvas.parent("character1");
    character = new Character(
      p,
      p.width / 2,
      p.height / 2,
      "#e44d26",
      "#ff8e29",
      "😀"
    );
  };

  p.draw = function () {
    // p.background(240);
    character.draw();
  };

  // Function to handle updates
  function updateCharacter() {
    character.bodyAndArmsColor = p.select("#bodyColor1").value();
    character.legsColor = p.select("#legsColor1").value();
    character.headEmoji = p.select("#headEmoji1").value();
  }

  // Event listeners for inputs
  p.select("#bodyColor1").changed(updateCharacter);
  p.select("#legsColor1").changed(updateCharacter);
  p.select("#headEmoji1").changed(updateCharacter);

  // Function to save sketch as PNG
  p.saveSketch = function () {
    character.saveAsPNG("character1.png");
  };
};

let sketch2 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(200, 300);
    canvas.parent("character2");
    character = new Character(
      p,
      p.width / 2,
      p.height / 2,
      "#0268d7",
      "#5c9ae9",
      "😀"
    );
  };

  p.draw = function () {
    // p.background(240);
    character.draw();
  };

  // Function to handle updates
  function updateCharacter() {
    character.bodyAndArmsColor = p.select("#bodyColor2").value();
    character.legsColor = p.select("#legsColor2").value();
    character.headEmoji = p.select("#headEmoji2").value();
  }

  // Event listeners for inputs
  p.select("#bodyColor2").changed(updateCharacter);
  p.select("#legsColor2").changed(updateCharacter);
  p.select("#headEmoji2").changed(updateCharacter);

  // Function to save sketch as PNG
  p.saveSketch = function () {
    character.saveAsPNG("character2.png");
  };
};

// Initialize p5 instances
let instance1 = new p5(sketch1);
let instance2 = new p5(sketch2);

// Function to save both sketches
function saveSketches() {
  instance1.saveSketch();
  instance2.saveSketch();
}
