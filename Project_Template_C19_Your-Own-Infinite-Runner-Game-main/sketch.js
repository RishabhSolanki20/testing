//Declare all the variables
var park,parkImg;
var dog,dogImg;
var man,manImg;
var wood_log,wood_logImg;
var obstacle,obstacleImg;
var game_ovar,game_ovarImg;
var restart,restartImg;
var gameOvar,gameOvarImg;

var END =0;
var PLAY =1;
var gameState = PLAY;


//Create function preload
function preload(){
parkImg = loadImage("back.png");
dogImg = loadAnimation("dogRun1.png","dogRun2.png");
manImg = loadAnimation("man1.png","man2.png","Man3.png","Man4.png");
wood_logImg = loadImage("wood_log.png");
obstacleImg = loadImage("obstacle.png");
game_ovarImg = loadImage("game_ovar.png");
}


//Create function setup
function setup() {

createCanvas(800,260);

park=createSprite(400,120);
park.addImage(parkImg);

dog=createSprite(80,150);
dog.addAnimation("dog",dogImg);
dog.scale = 0.4;

man=createSprite(230,150);
man.addAnimation("man",manImg);
man.scale = 0.5;

wood_log = new Group();
obstacle = new Group();

}

//Create function draw
function draw() {
    background(0);
     drawSprites();
     spwan_woodLog()
     spwan_obstacles()
     

//Create gamestate play  
    if(gameState===PLAY){

//Create function to jump
      if(keyDown("space")) {
        dog.velocityY = -12;
      }
  
      
//Give velocity to MAN and DOG       
      man.velocityY = dog.velocityY;
     
    
//Create edge sprite     
      edges= createEdgeSprites();
      dog.collide(edges);
      man.collide(edges);

//Give gravity to BOTH
     dog.velocityY = dog.velocityY + 0.8
    //man.velocityY = man.velocityY + 0.8

  
  if(wood_log.isTouching(man)){
    gameState = END;
    dog.remove();
    man.remove();
  }

  if(obstacle.isTouching(man)){
    gameState = END;
    dog.remove();
    man.remove();
  }
  
  }

// Create GameState END
  else if (gameState === END) {
    game_ovar=createSprite(400,150);
    game_ovar.addImage(game_ovarImg);
    dog.changeAnimation("game Ovar",game_ovarImg);

  
    if(keyDown("UP_ARROW")) {
      reset()
    }
 
  }
}

// Create function to spwan WOODLOGs
function spwan_woodLog() {
  if (frameCount % 100 === 0) {
  wood_log =createSprite(700,Math.round(random(250, 250)));
  wood_log.scale =0.2;
  wood_log.velocityX = -6;
  wood_log.addAnimation("woodLog",wood_logImg);
  wood_log.setLifetime= 170;
  }

}

//Create function to spwan OBSTACLEs
function spwan_obstacles() {
  if (frameCount % 260 === 0) {
    obstacle =createSprite(700,Math.round(random(250, 250)));
    //obstacle.scale =0.7;
    obstacle.velocityX = -6;
    obstacle.addAnimation("obstacle",obstacleImg);
    obstacle.setLifetime= 170;
    }
  
}

function reset() {
  gameState = PLAY;
}