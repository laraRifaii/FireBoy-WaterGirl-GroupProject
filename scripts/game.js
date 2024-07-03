let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
let game = new Phaser.Game(config);

let currentLevel = 0;
if (localStorage.level) {
  currentLevel = localStorage.getItem("level");
}

let keyA;
let keyS;
let keyD;
let keyW;

let player1;
let player2;
let redDoor2 = false;
let blueDoor2 = false;

let touchedRedDoor;
let touchedBlueDoor;

let levels = [
  {
    players: [
      { x: 100, y: 468 },
      { x: 150, y: 468 },
    ],
    redDiamonds: [{ x: 1100, y: 450 }],
    blueDiamonds: [{ x: 1300, y: 450 }],
    boxes: [{ x: 300, y: 568, scale: { x: 0.5, y: 0.5 } }],
    platforms: [
      { x: 400, y: 680, scale: { x: 30, y: 1 } },
      { x: 1200, y: 490, scale: { x: 3, y: 0.3 } },
      { x: 400, y: 530, scale: { x: 1, y: 0.3 } },
      { x: 700, y: 530, scale: { x: 1, y: 0.3 } },
    ],
    greenPlatforms: [{ x: 1200, y: 489, scale: { x: 1, y: 0.3 } }],
    redPlatforms: [{ x: 700, y: 677, scale: { x: 2, y: 1 } }],
    bluePlatforms: [{ x: 400, y: 677, scale: { x: 2, y: 1 } }],
    redDoors: [
      { x: 100, y: 590, scale: { x: 1, y: 1 } },
      { x: 1150, y: 590, scale: { x: 1, y: 1 } },
    ],
    blueDoors: [
      { x: 150, y: 590, scale: { x: 1, y: 1 } },
      { x: 1200, y: 590, scale: { x: 1, y: 1 } },
    ],
  },
  {
    players: [
      { x: 100, y: 568 },
      { x: 150, y: 568 },
    ],
    redDiamonds: [{ x: 1000, y: 450 }],
    blueDiamonds: [{ x: 1200, y: 450 }],
    boxes: [{ x: 1000, y: 100, scale: { x: 0.5, y: 0.5 } }],
    platforms: [
      { x: 400, y: 650, scale: { x: 30, y: 1 } },
      { x: 1100, y: 490, scale: { x: 3, y: 0.3 } },
      { x: 400, y: 530, scale: { x: 1, y: 0.3 } },
      { x: 700, y: 530, scale: { x: 1, y: 0.3 } },
    ],
    greenPlatforms: [{ x: 1100, y: 489, scale: { x: 1, y: 0.3 } }],
    redPlatforms: [{ x: 700, y: 649, scale: { x: 2, y: 1 } }],
    bluePlatforms: [{ x: 400, y: 649, scale: { x: 2, y: 1 } }],
    redDoors: [
      { x: 100, y: 560, scale: { x: 1, y: 1 } },
      { x: 1150, y: 560, scale: { x: 1, y: 1 } },
    ],
    blueDoors: [
      { x: 150, y: 560, scale: { x: 1, y: 1 } },
      { x: 1200, y: 560, scale: { x: 1, y: 1 } },
    ],
  },
];

function preload() {
  const character1Image = localStorage.getItem("character1");
  const character2Image = localStorage.getItem("character2");
  // Load & Define our game assets
  this.load.image("char1", character1Image);
  this.load.image("char2", character2Image);
  this.load.image("box", "assets/images/box.png");
  this.load.image("redDiamond", "assets/images/redDiamond.png");
  this.load.image("blueDiamond", "assets/images/blueDiamond.png");
  this.load.image("Background", "assets/images/underground.jpg");
  this.load.image("greenGround", "assets/images/greenGround.png");
  this.load.image("redGround", "assets/images/redGround.png");
  this.load.image("blueGround", "assets/images/blueGround.png");
  this.load.image("greyGround", "assets/images/greyGround.png");
  this.load.image("blueDoor", "assets/images/blueDoor.png");
  this.load.image("redDoor", "assets/images/redDoor.png");
}

function create() {
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  cursors = this.input.keyboard.createCursorKeys();

  let bg = this.add.image(0, 0, "Background");

  bg.setOrigin(0, 0);

  bg.setScale(0.5, 0.4);

  //Platforms
  let platforms = this.physics.add.staticGroup();
  let platformsData = levels[currentLevel].platforms;
  for (let i = 0; i < platformsData.length; ++i) {
    platforms
      .create(platformsData[i].x, platformsData[i].y, "greyGround")
      .setScale(platformsData[i].scale.x, platformsData[i].scale.y)
      .refreshBody();
  }

  //Green Platforms
  let greenPlatforms = this.physics.add.staticGroup();
  let greenPlatformsData = levels[currentLevel].greenPlatforms;
  for (let i = 0; i < greenPlatformsData.length; ++i) {
    greenPlatforms
      .create(greenPlatformsData[i].x, greenPlatformsData[i].y, "greenGround")
      .setScale(greenPlatformsData[i].scale.x, greenPlatformsData[i].scale.y)
      .refreshBody();
  }

  //Red Platforms
  let redPlatforms = this.physics.add.staticGroup();
  let redPlatformsData = levels[currentLevel].redPlatforms;
  for (let i = 0; i < redPlatformsData.length; ++i) {
    redPlatforms
      .create(redPlatformsData[i].x, redPlatformsData[i].y, "redGround")
      .setScale(redPlatformsData[i].scale.x, redPlatformsData[i].scale.y)
      .refreshBody();
  }

  //Blue Platforms
  let bluePlatforms = this.physics.add.staticGroup();
  let bluePlatformsData = levels[currentLevel].bluePlatforms;
  for (let i = 0; i < bluePlatformsData.length; ++i) {
    bluePlatforms
      .create(bluePlatformsData[i].x, bluePlatformsData[i].y, "blueGround")
      .setScale(bluePlatformsData[i].scale.x, bluePlatformsData[i].scale.y)
      .refreshBody();
  }

  let doors = this.physics.add.staticGroup();
  //Red doors
  let redDoor1 = levels[currentLevel].redDoors[0];
  let redDoor2 = levels[currentLevel].redDoors[1];
  redDoor1 = doors
    .create(redDoor1.x, redDoor1.y, "redDoor")
    .setScale(redDoor1.scale.x, redDoor1.scale.y)
    .refreshBody();
  redDoor2 = doors
    .create(redDoor2.x, redDoor2.y, "redDoor")
    .setScale(redDoor2.scale.x, redDoor2.scale.y)
    .refreshBody();

  //Blue door
  let blueDoor1 = levels[currentLevel].blueDoors[0];
  let blueDoor2 = levels[currentLevel].blueDoors[1];
  blueDoor1 = doors
    .create(blueDoor1.x, blueDoor1.y, "blueDoor")
    .setScale(blueDoor1.scale.x, blueDoor1.scale.y)
    .refreshBody();
  blueDoor2 = doors
    .create(blueDoor2.x, blueDoor2.y, "blueDoor")
    .setScale(blueDoor2.scale.x, blueDoor2.scale.y)
    .refreshBody();

  //Player 1

  player1 = this.physics.add.sprite(
    levels[currentLevel].players[0].x,
    levels[currentLevel].players[0].y,
    "char1"
  );
  player1.setScale(0.2);
  player1.setBounce(0.2);
  player1.setCollideWorldBounds(true);
  player1.body.setGravityY(300);
  this.physics.add.collider(player1, platforms);
  this.physics.add.overlap(player1, bluePlatforms, killPlayer1, null, this);
  this.physics.add.overlap(player1, greenPlatforms, killPlayer1, null, this);
  // this.physics.add.collider(redDoor2, player1);
  //Player 2

  player2 = this.physics.add.sprite(
    levels[currentLevel].players[1].x,
    levels[currentLevel].players[1].y,

    "char2"
  );

  player2.setScale(0.2);
  player2.setBounce(0.2);
  player2.setCollideWorldBounds(true);
  player2.body.setGravityY(300);
  this.physics.add.collider(player2, platforms);
  this.physics.add.overlap(player2, redPlatforms, killPlayer2, null, this);
  this.physics.add.overlap(player2, greenPlatforms, killPlayer2, null, this);
  // this.physics.add.collider(blueDoor2, player2);

  //Boxes
  let boxData = levels[currentLevel].boxes;
  let boxObjects = [];
  for (let i = 0; i < boxData.length; ++i) {
    let box = this.physics.add.sprite(boxData[i].x, boxData[i].y, "box");
    box.setScale(boxData[i].scale.x, boxData[i].scale.y);
    box.body.setDrag(500);
    box.body.setGravityY(500);
    box.setCollideWorldBounds(true);
    this.physics.add.collider(box, platforms);
    this.physics.add.collider(box, player1);
    this.physics.add.collider(box, player2);
    this.physics.add.collider(box, boxObjects);
    boxObjects.push(box);
  }

  //Red diamonds
  let redDiamondsArray = levels[currentLevel].redDiamonds;
  for (let i = 0; i < redDiamondsArray.length; ++i) {
    redDiamond = this.physics.add.sprite(
      redDiamondsArray[i].x,
      redDiamondsArray[i].y,
      "redDiamond"
    );
    redDiamond.body.setAllowGravity(false);
    this.physics.add.collider(redDiamond, platforms);
    this.physics.add.overlap(player1, redDiamond, collectDiamond, null, this);
  }

  //Blue diamonds
  let blueDiamondsArray = levels[currentLevel].blueDiamonds;
  for (let i = 0; i < blueDiamondsArray.length; ++i) {
    blueDiamond = this.physics.add.sprite(
      blueDiamondsArray[i].x,
      blueDiamondsArray[i].y,
      "blueDiamond"
    );
    blueDiamond.body.setAllowGravity(false);
    this.physics.add.collider(blueDiamond, platforms);
    this.physics.add.overlap(player2, blueDiamond, collectDiamond, null, this);
  }

  this.physics.add.overlap(player1, redDoor2, player1Won, null, this);
  this.physics.add.overlap(player2, blueDoor2, player2Won, null, this);
}

function update() {
  if (cursors.left.isDown) {
    player1.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player1.setVelocityX(160);
  } else {
    player1.setVelocityX(0);
  }
  if (cursors.up.isDown && player1.body.touching.down) {
    player1.setVelocityY(-330);
  }

  if (keyA.isDown) {
    player2.setVelocityX(-160);
  } else if (keyD.isDown) {
    player2.setVelocityX(160);
  } else {
    player2.setVelocityX(0);
  }
  if (keyW.isDown && player2.body.touching.down) {
    player2.setVelocityY(-330);
  }
}

function collectDiamond(player, diamond) {
  diamond.disableBody(true, true);
}

function nextLevel() {
  if (touchedBlueDoor && touchedRedDoor) {
    if (!localStorage.level) {
      localStorage.setItem("level", 1);
    }
    if (localStorage.level) {
      localStorage.setItem("level", 1);
    }
    localStorage.setItem("level", localStorage.getItem("level") + 1);
    location.reload();
  }
}

function killPlayer1(player, platform) {
  player.setPosition(
    levels[currentLevel].players[0].x,
    levels[currentLevel].players[0].y
  );
}
function killPlayer2(player, platform) {
  player.setPosition(
    levels[currentLevel].players[1].x,
    levels[currentLevel].players[1].y
  );
}
function player1Won(player, platform) {
  player.disableBody(true, true);
  touchedRedDoor = true;
  nextLevel();
}
function player2Won(player, platform) {
  player.disableBody(true, true);
  touchedBlueDoor = true;
  nextLevel();
}
