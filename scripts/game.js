let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}
let game = new Phaser.Game(config);

let currentLevel = "level1";

let keyA;
let keyS;
let keyD;
let keyW;

let levels = {
  level1: {
    players: [
      { x: 100, y: 450 },
      { x: 150, y: 450 }
    ],
    redDiamonds: [
      { x: 200, y: 200 },
      { x: 210, y: 200 },
      { x: 220, y: 200 },
      { x: 230, y: 200 },
      { x: 240, y: 200 },
      { x: 250, y: 200 },
      { x: 260, y: 200 },
    ],
    blueDiamonds: [
      { x: 200, y: 240 },
      { x: 210, y: 240 },
      { x: 220, y: 240 },
      { x: 230, y: 240 },
      { x: 240, y: 240 },
      { x: 250, y: 240 },
      { x: 260, y: 240 },
    ],
    boxes: [
      { x: 300, y: 450, scale: { x: 0.5, y: 0.5 } },
      { x: 450, y: 450, scale: { x: 0.3, y: 0.7 } },
    ],
    platforms: [
      { x: 400, y: 568, scale: { x: 20, y: 1 } },
      { x: 600, y: 400, scale: { x: 1, y: 1 } },
      { x: 50, y: 250, scale: { x: 1, y: 1 } },
      { x: 750, y: 220, scale: { x: 1, y: 1 } },
    ],
    greenPlatforms: [
      { x: 450, y: 50, scale: { x: 0.5, y: 0.5 } },
    ],
    redPlatforms: [
      { x: 450, y: 450, scale: { x: 1, y: 1 } },
    ],
    bluePlatforms: [
      { x: 250, y: 450, scale: { x: 1, y: 1 } },
    ]
  }
};

function preload() {
  // Load & Define our game assets
  this.load.image('char1', 'assets/images/char1.png');
  this.load.image('char2', 'assets/images/char2.png');
  this.load.image('box', 'assets/images/box.png');
  this.load.image('redDiamond', 'assets/images/redDiamond.png');
  this.load.image('blueDiamond', 'assets/images/blueDiamond.png');
  this.load.image('Background', 'assets/images/underground.jpg');
  this.load.image('greenGround', 'assets/images/greenGround.png');
  this.load.image('redGround', 'assets/images/redGround.png');
  this.load.image('blueGround', 'assets/images/blueGround.png');
  this.load.image('greyGround', 'assets/images/greyGround.png');
}

function create() {
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(0, 0, 'Background');

  //Platforms
  platforms = this.physics.add.staticGroup();
  let platformsData = levels[currentLevel].platforms;
  for (let i = 0; i < platformsData.length; ++i) {
    platforms.create(platformsData[i].x, platformsData[i].y, 'greyGround').setScale(platformsData[i].scale.x, platformsData[i].scale.y).refreshBody();
  }

  //Green Platforms
  greenPlatforms = this.physics.add.staticGroup();
  let greenPlatformsData = levels[currentLevel].greenPlatforms;
  for (let i = 0; i < greenPlatformsData.length; ++i) {
    greenPlatforms.create(greenPlatformsData[i].x, greenPlatformsData[i].y, 'greenGround').setScale(greenPlatformsData[i].scale.x, greenPlatformsData[i].scale.y).refreshBody();
  }

  //Red Platforms
  redPlatforms = this.physics.add.staticGroup();
  let redPlatformsData = levels[currentLevel].redPlatforms;
  for (let i = 0; i < redPlatformsData.length; ++i) {
    redPlatforms.create(redPlatformsData[i].x, redPlatformsData[i].y, 'redGround').setScale(redPlatformsData[i].scale.x, redPlatformsData[i].scale.y).refreshBody();
  }

  //Blue Platforms
  bluePlatforms = this.physics.add.staticGroup();
  let bluePlatformsData = levels[currentLevel].bluePlatforms;
  for (let i = 0; i < bluePlatformsData.length; ++i) {
    bluePlatforms.create(bluePlatformsData[i].x, bluePlatformsData[i].y, 'blueGround').setScale(bluePlatformsData[i].scale.x, bluePlatformsData[i].scale.y).refreshBody();
  }

  //Player 1
  player1 = this.physics.add.sprite(levels[currentLevel].players[0].x, levels[currentLevel].players[0].y, 'char1');
  player1.setBounce(0.2);
  player1.setCollideWorldBounds(true);
  player1.body.setGravityY(300);
  this.physics.add.collider(player1, platforms);
  this.physics.add.overlap(player1, bluePlatforms, killPlayer1, null, this);
  this.physics.add.overlap(player1, greenPlatforms, killPlayer1, null, this);
  
  //Player 2
  player2 = this.physics.add.sprite(levels[currentLevel].players[1].x, levels[currentLevel].players[1].y, 'char2');
  player2.setBounce(0.2);
  player2.setCollideWorldBounds(true);
  player2.body.setGravityY(300);
  this.physics.add.collider(player2, platforms);
  this.physics.add.overlap(player2, redPlatforms, killPlayer2, null, this);
  this.physics.add.overlap(player2, greenPlatforms, killPlayer2, null, this);

  //Boxes
  let boxes = levels[currentLevel].boxes;
  for (let i = 0; i < boxes.length; ++i) {
    let box = this.physics.add.sprite(boxes[i].x, boxes[i].y, 'box');
    box.setScale(boxes[i].scale.x, boxes[i].scale.y);
    box.body.setDrag(500);
    box.body.setGravityY(500);
    box.setCollideWorldBounds(true);
    this.physics.add.collider(box, platforms);
    this.physics.add.collider(box, player1);
    this.physics.add.collider(box, player2);
  }

  //Red diamonds
  let redDiamondsArray = levels[currentLevel].redDiamonds;
  for (let i = 0; i < redDiamondsArray.length; ++i) {
    redDiamond = this.physics.add.sprite(redDiamondsArray[i].x, redDiamondsArray[i].y, 'redDiamond');
    redDiamond.body.setAllowGravity(false);
    this.physics.add.collider(redDiamond, platforms);
    this.physics.add.overlap(player1, redDiamond, collectStar, null, this);
  }

  //Blue diamonds
  let blueDiamondsArray = levels[currentLevel].blueDiamonds;
  for (let i = 0; i < blueDiamondsArray.length; ++i) {
    blueDiamond = this.physics.add.sprite(blueDiamondsArray[i].x, blueDiamondsArray[i].y, 'blueDiamond');
    blueDiamond.body.setAllowGravity(false);
    this.physics.add.collider(blueDiamond, platforms);
    this.physics.add.overlap(player2, blueDiamond, collectStar, null, this);
  }
}

function update() {
  if (cursors.left.isDown) {
    player1.setVelocityX(-160);
  }
  else if (cursors.right.isDown) {
    player1.setVelocityX(160);
  }
  else {
    player1.setVelocityX(0);
  }
  if (cursors.up.isDown && player1.body.touching.down) {
    player1.setVelocityY(-330);
  }

  if (keyA.isDown) {
    player2.setVelocityX(-160);
  }
  else if (keyD.isDown) {
    player2.setVelocityX(160);
  }
  else {
    player2.setVelocityX(0);
  }
  if (keyW.isDown && player2.body.touching.down) {
    player2.setVelocityY(-330);
  }
}

function collectStar(player, diamond) {
  diamond.disableBody(true, true);
}

function killPlayer1(player, platform) {
  player.setPosition(levels[currentLevel].players[0].x,levels[currentLevel].players[0].y);
}
function killPlayer2(player, platform) {
  player.setPosition(levels[currentLevel].players[1].x,levels[currentLevel].players[1].y);
}