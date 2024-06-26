var ground, invisibleGround, groundImage;
var trex, trex_running, trex_Collide;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOverImg,gameOver;
var restartImg,restart;
var count;
var jumpSound, dieSound, checkPointSound;
var PLAY=1;
var END=0;
var gameState = PLAY;
var canvas;
function preload(){
groundImage = loadImage("Fundo e rua COM SOL.png");
trex_running = loadImage("Manuel_Andando.png")
trex_Collide = loadImage("Manuel_Morrendo.png");

cloudImage = loadImage("Nuvem.png");
obstacle1 = loadImage("Bic Amarela.png");
obstacle2 = loadImage("Bic Azul.png");
obstacle3 = loadImage("Bic Laranja.png");
obstacle4 = loadImage("Bic ROSAAAAA.png");
obstacle5 = loadImage("Bic Verde.png");
obstacle6 = loadImage("Bic Vermelha.png");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkPointSound = loadSound("checkPoint.mp3");
}
function setup(){
    canvas = createCanvas(1000, 300);
    canvas.position(150,130);

    ground = createSprite(10,150,1000,20);
    trex = createSprite(50,220,30,60);
    invisibleGround = createSprite(200,230,400,10);
    gameOver = createSprite(520,80);
    restart = createSprite(520,180);
    cloudsGroup = new Group();
    obstaclesGroup = new Group();
    ground.addImage("ground", groundImage);
    

    gameOver.addImage("gameOver", gameOverImg);
    restart.addImage("restart", restartImg);
    ground.scale=11;
    trex.scale = 2.3;
    gameOver.scale = 1.3;
    restart.scale = 1.1;
    ground.x =ground.width*2;
    ground.velocityX = -2;
    invisibleGround.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    count = 0;
    trex.addImage("trex_running", trex_running);
}
function draw() {
  
    if(gameState === PLAY){
        ground.velocityX = -(6 + 3*count/100);
        count = count + Math.round(World.frameRate/60);
            if (count>0 && count%100 === 0){
          checkPointSound.play();
        }
        if (ground.x < 0){
          ground.x = ground.width*2;
        }
        if(keyDown("space") && trex.y >= 160){
          trex.velocityY = -12 ;
          //jumpSound.play(avavavvavavaavva);
        }
        trex.velocityY = trex.velocityY + 0.8;
         createClouds();
         createObstacles();

          if(obstaclesGroup.isTouching(trex)){
            gameState = END;
            dieSound.play();
          }
    }
    
    else if(gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

      if(mousePressedOver(restart)) {
        reset();
      }

      ground.velocityX = 0;
      trex.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      trex.addImage("trex_Collide",trex_Collide);
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
    }
    trex.collide(invisibleGround);
    fill(rgb(90,90,90));
    textStyle(BOLD);
    textSize(20);
    drawSprites();
    text("SCORE: "+ count, 450, 50);  

    
  }

    function createObstacles() {
      if(frameCount % 60 === 0) {
var obstacle = createSprite(1000,200,10,40);
obstacle.velocityX = -(6+ 3*count/100);
var rand = Math.round(random(1,6));
switch(rand) {
  case 1: obstacle.addImage(obstacle1);
        break;
 case 2: obstacle.addImage(obstacle2);
 break;
 case 3: obstacle.addImage(obstacle3);
 break;
 case 4: obstacle.addImage(obstacle4);
 break;
 case 5: obstacle.addImage(obstacle5);
 break;
 case 6: obstacle.addImage(obstacle6);
 break;
 default: break;
      }
      obstacle.scale = 1.2;
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
      }
    }

    function createClouds() {
      if (frameCount % 60 === 0) {
        var cloud = createSprite(1000,200,10,40);
        cloud.y = Math.round(round(80,120));
        cloud.addImage(cloudImage);
        cloud.scale = 4;
        cloud.velocityX = -4;
        cloud.lifetime = 350;
        cloud.depth = trex.depth;
        trex.depth = trex.depth + random(0.5,2);
        cloudsGroup.add(cloud);
      }
    }
    function reset(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      trex.addAnimation("trex",trex_running);
      count = 0;
    }