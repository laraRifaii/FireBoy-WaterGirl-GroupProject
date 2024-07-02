let sketch1 = function (p) {
  let character;

  p.setup = function () {
    let canvas = p.createCanvas(80, 137);
    canvas.parent("character1");
    character = {
      headEmoji: "🧑‍🦰",
    };
  };

  p.draw = function () {
    p.strokeWeight(3);
    p.textSize(40);

    // Draw character 1
    p.text(character.headEmoji, 14, 40);
    
    p.mouseDragged = () => {
      p.stroke("#f01e2c");
      p.ellipse(p.mouseX, p.mouseY, 3, 3);
    };
  };  



  function updateCharacter() {
    function draw() {
    character.legsColor = p.select("#legsColor1").value();
    character.headEmoji = p.select("#headEmoji1").value();
    }
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
    p.strokeWeight(3);
    p.textSize(40);

    p.text(character.headEmoji, 14, 40);

    p.mouseDragged = () => {
      p.stroke("#0268d7");
      p.ellipse(p.mouseX, p.mouseY, 3, 3);
    };
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