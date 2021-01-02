var backImage;
var ghost, ghostImage;
var gameState;
const PLAY=0;
const END=1;
var obstaclesGroup;
var score=0;
var obstacleImage;

function preload(){
  backImage=loadImage("tower.png");
  ghostImage=loadImage("ghost-standing.png");
  obstacleImage=loadImage("obstacle.png");
}

function setup(){
  createCanvas(600, 600);
  
  background=createSprite(300,350,20,20);
  background.addImage(backImage);

  ghost=createSprite(200,300,100,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
  obstaclesGroup=new Group();
  
  gameState=PLAY;
  
}


function windowImage(){
  
  if(gameState===PLAY){
  
  if(frameCount%200==0){
var obstacle=createSprite(Math.round(random(110, 490)), 59, 100, 7);  
    obstacle.velocityY=1;
    obstacle.shapeColor="red";
    obstacle.lifeTime=600;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.5;
    obstacle.setCollider("rectangle",0,5,100, 180);
    
    obstaclesGroup.add(obstacle);
    
  }
}
  

  
}

function draw(){
  
  
 
  
  if(gameState===PLAY){
    ghost.visible=true;

    background.velocityY=1;
  
  if(background.y>600){
    background.y=height/2;
  }
  
    
    score=score+Math.round(frameCount%50==0);

  windowImage();
  
  if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8;
    
     if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    ghost.depth++;
    

    
    if(obstaclesGroup.isTouching(ghost)||ghost.y>600){
     ghost.visible=false;
      obstaclesGroup.destroyEach();
      gameState=END;
      
    }
     drawSprites();
    
  } else  if(gameState===END){
    
    fill("red");
    text("Game Over", 200,250,textSize(50));
    text("Press R To restart", 230, 300, textSize(20));
      if(keyDown("r")){
        score=0;
        gameState=PLAY;
        ghost.y=300;
  }
      
      
    }
  
  fill("white");
  text("Score: "+score, 100, 40, textSize(30));
  
}
