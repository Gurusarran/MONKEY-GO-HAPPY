
var monkey , monkey_running, monkeyOut;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground, invisible;
var survivalTime= 0;
var GameState;
var PLAY, END;
var score= 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeyOut=loadAnimation("sprite_0.png");
 
}



function setup() {
  createCanvas(500,500);
  
  PLAY= 1;
  GameState= PLAY;
  END= 0;
  
  FoodGroup= new  Group();
  obstacleGroup= new Group();
  
  monkey= createSprite(70,350,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale= 0.1;
  
  ground= createSprite(400,383,1000,10);
  ground.velocityX= -4;
  ground.x= ground.width/2;
  
  invisible= createSprite(250,385,1000,10)
  invisible.x= ground.width/2;
  invisible.velocityX= -4;
  
  
  

  
}


function draw() {
  background("lightblue");
  
  if(GameState===PLAY){
    
    if(ground.x<0){
     ground.x=ground.width/2; 
                  }
    
    if(invisible.x<0){
      invisible.x= invisible.width/2;
                     }
    
    if(keyDown("space")&&monkey.isTouching(ground)){
      monkey.velocityY= -15;
    }
     
    score= Math.round(frameCount/3);
    survivalTime= Math.ceil(frameCount/frameRate());
    ground.velocityX= -(5+2* score/100);
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
                                    }
    
    Food();
    Obstacle();
    
    
    
   if(monkey.isTouching(obstacleGroup)) {
     GameState= END;
     ground.velocityX= 0;
     invisible.velocityX= 0;
     monkey.changeAnimation(monkeyOut);
     monkey.collide(obstacleGroup);
                                        }
    
  }
  
  
   monkey.velocityY= monkey.velocityY+ 0.6;
    
    monkey.collide(invisible);
  
  stroke('black');
  textSize(20);
  fill('black');
  text("Survival Time:"+survivalTime,150,50 );
  
  stroke('red');
  textSize(20);
  fill('red');
  text("Score:"+score,350,50 );

  drawSprites();
}

function Food() {
  
  if(frameCount % 80===0){
    var banana= createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX= -(5+2*score/100);
    banana.y= Math.round(random(160,200));
    banana.scale= 0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400)
    
                         }
}

function Obstacle() {
  if(frameCount% 300=== 0){
    var obstacle= createSprite(500,365,23,32);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX= -(5+2*score/100);
    obstacle.scale= 0.1;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle",0,0,200);
    
                          }
}





