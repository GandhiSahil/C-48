var bg,bgImg;
var cat, catImg;
var mouse, mouseImg;
var bullet, bulletImg

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var mouseGroup;
var bulletGroup;
var score=0
var gameState="fight"
var bullets=50
var life=3





function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  catImg = loadImage("assets/cat.png")
  

  mouseImg = loadImage("assets/mouse.png")

  bgImg = loadImage("assets/bg.jpeg")
  bulletImg=loadImage("assets/bullet1.png")
  explosion=loadSound("assets/explosion.mp3")
  lose=loadSound("assets/lose.mp3")
  win=loadSound("assets/win.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the  cat sprite
 cat = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  cat.addImage(catImg)
    cat.scale = 0.3
    cat.debug = true
    cat.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    mouseGroup = new Group();
    bulletGroup = new Group();

   

    

    
}

function draw() {
  background(0); 
 
  if(gameState==="fight"){
    if(life===3){
      heart3.visible=true
      heart1.visible=false
      heart2.visible=false
    }
  
    if(life===2){
      heart3.visible=false
      heart1.visible=false
      heart2.visible=true
    }
    
    if(life===1){
      heart3.visible=false
      heart1.visible=true
      heart2.visible=false
    }

    if(life===0){
     heart1.visible=false
      gameState="lost"
     
    }
  
  if(keyDown("UP_ARROW")||touches.length>0){
     cat.y =  cat.y-30
  }
 
  if(keyDown("DOWN_ARROW")||touches.length>0){
    cat.y =  cat.y+30
   
 }

 if(keyWentDown("space")){
  
   
  shootBullet()
  bullets=bullets-1

 
}

else if(keyWentUp("space")){
   cat.addImage(catImg)
}

if(mouseGroup.isTouching(bulletGroup)){
 

  for(var i=0;i<mouseGroup.length;i++){     
       
   if(mouseGroup[i].isTouching(bulletGroup)){
        
    mouseGroup[i].destroy()
        score=score+2

    bulletGroup.destroyEach()
    explosion.play()

        } 
  }
 }

 if(mouseGroup.isTouching( cat)){
 

  for(var i=0;i<mouseGroup.length;i++){     
       
   if(mouseGroup[i].isTouching( cat)){
        
    mouseGroup[i].destroy()
        
    life=life-1
    
        } 
  }
 }
}


//calling the function to spawn zombies
enemy();

drawSprites();
if(bullets===0){
  gameState="bullet"
}
fill("white")
textSize(30)
text("score: "+score,100,100)

if(gameState==="lost"){
fill("red")
textSize(100)
text("You Lost",400,400)
mouseGroup.destroyEach()
 cat.destroy()
}
else if(gameState==="won"){
fill("blue")
textSize(100)
text("You Won",400,400)
mouseGroup.destroyEach()
 cat.destroy()
win.play()
}
else if(gameState==="bullet"){
  fill("yellow")
  textSize(50)
  lose.play()
  text("You Ran Out Of Bullets",400,400)
  mouseGroup.destroyEach()
   cat.destroy()  
  bulletsGroup.destroyEach()

  
 
}
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    mouse = createSprite(1000,random(100,500),40,40)

    mouse.addImage(mouseImg)
    mouse.scale = 0.30
    mouse.velocityX = -3
    mouse.debug= true
    mouse.setCollider("rectangle",0,0,400,400)
    
    
    mouse.lifetime = 400
   mouseGroup.add(mouse)
  }

}

function shootBullet(){
  bullet=createSprite(displayWidth-1150,width/2,50,20)
  bullet.y= cat.y-35
  bullet.addImage(bulletImg)
  bullet.scale=0.05
  bullet.velocityX=7
  bulletGroup.add(bullet)
}
