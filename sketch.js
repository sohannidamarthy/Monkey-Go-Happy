//State Names
var Play = 1;
var End = 1;
var GameState = 1




var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  
  //create monkey
  monkey = createSprite(80,315,200,2)
  monkey.addAnimation("running",monkey_running);
  monkey.scale =0.1
  
  //ground creation and moving ground
  ground= createSprite(400,350,800,10)
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  //creation of score
  score = 0;
  
  //create groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  
  
  //collider
  monkey.setCollider("circle",0,0,monkey.height)
  monkey.debug=true

  
}


function draw() {
  background(225)
 

  console.log(GameState)
  
  monkey.collide(ground);
  
  
  
  
  
 if(GameState===Play){
   createObstacle();
   createFoods();
   
   monkey.velocityY=monkey.velocityY+0.8
   
   text("Banana:"+score, 200,200)
   
   if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     score+=1
  }
   //jumps
   
   if(keyDown("space")&& monkey.y>310){
     monkey.velocityY= -17
  }
   if(ground.x<0){
     ground.x=ground.width/2
  }
   
   if(obstacleGroup.isTouching(monkey)){
     GameState = End;
   
   }
   
   
   
 }
  else if(GameState===End){
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1);
    text("You score is" + score,200,200)
    text("to restart game press spacebar",200,300);
    if(keyDown("space")){
      reset()
  }
}
  
  
   
  
  
  
  drawSprites()
  
}
function reset(){
  GameState = Play;
  FoodGroup.destroyEach()
  obstacleGroup.destroyEach()
  score=0
}


//obstacle creation and addition


function createObstacle(){
  if(frameCount%140===0){
    //creating the obstacle and image
    var obstacle=createSprite(400,310,20,20);
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2
    
    
    //assign lifetime
    obstacle.lifetime=100;
    
    //velocity for obstacle
    obstacle.velocityX=-6
    
    //assigning to groups
    obstacleGroup.add(obstacle);
     }
}
//create food
function createFoods(){
  if (frameCount%60===0){
    //banana creatiion and look
    var banana = createSprite(400,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    //assign lifetime
    banana.lifetime=100;
    
    //banana velocity
    banana.velocityX=-4;
    
    //assigning groups
    FoodGroup.add(banana)
    
  }
}




