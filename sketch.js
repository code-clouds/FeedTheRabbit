var garden,rabbit,apple,orangeL,redL;
var gardenImg,rabbitImg,carrotImg,orangeImg,redImg;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var appleGroup, orangeLGroup, redLGroup;
var gameOver, gameOverImg;

function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  orangeImg = loadImage("orangeLeaf.png");
  redImg = loadImage("redImage.png");
  gameOverImg = loadImage("gameover.png");
}


function setup(){
  createCanvas(800,600);

  //creating boy running
  rabbit = createSprite(160,540,20,20);
  rabbit.scale =0.09;
  rabbit.addImage(rabbitImg);
  rabbit.setCollider("circle", 0,0,600)
  rabbit.debug = false;
  
  appleGroup = new Group();
  orangeLGroup = new Group();
  redLGroup = new Group();
  
  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg);
  
}

function draw() {
  background(0,23,56);
  fill("white");
  textSize(24);
  text("Score: "+ score, 680,50);
  if(gameState == PLAY){
    gameOver.visible = false;
    if(appleGroup.isTouching(rabbit) || orangeLGroup.isTouching(rabbit)){
      score = score + 5;
      appleGroup.destroyEach();
      orangeLGroup.destroyEach();
    }
    
    if(keyDown(RIGHT_ARROW)){
      rabbit.x = rabbit.x + (5+score/2);
    }
    if(keyDown(LEFT_ARROW)){
      rabbit.x = rabbit.x - (5+score/2);
    }
  
    edges= createEdgeSprites();
    rabbit.collide(edges);
    
    var select_sprites = Math.round(random(1,3));
    
    if (frameCount % 80 == 0) {
      if (select_sprites == 1) {
        createApples();
      } 
      else if (select_sprites == 2) {
        createOrange();
      }
      else {
        createRed();
      }
    }
    if(redLGroup.isTouching(rabbit)){
      gameOver.visible = true;
      redLGroup.setVelocityYEach(0);
      orangeLGroup.setVelocityYEach(0);
      redLGroup.setLifetimeEach(-1);
      orangeLGroup.setLifetimeEach(-1);
      gameState = END;
    }
  }
  drawSprites();
}

function createApples() {
  apple = createSprite(random(50, 750),40, 10, 10);
  apple.addImage(appleImg);
  apple.scale=0.07;
  apple.velocityY = (8+(score/5));
  apple.lifetime = 150;
  appleGroup.add(apple);
}

function createOrange() {
  orangeL = createSprite(random(50, 750),40, 10, 10);
  orangeL.addImage(orangeImg);
  orangeL.scale=0.08;
  orangeL.velocityY = (7+(score/4));
  orangeL.lifetime = 150;
  orangeLGroup.add(orangeL);
}

function createRed() {
  redL = createSprite(random(50, 750),40, 10, 10);
  redL.addImage(redImg);
  redL.scale=0.06;
  redL.velocityY = (7+(score/4));
  redL.lifetime = 150;
  redLGroup.add(redL);
}
