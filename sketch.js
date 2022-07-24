var target,targetImg
var crosshair, crosshairImg
var  backgeroundImg
var score 
var invisibleBackground

var x, y

var timer

var bomb, bombImg, blastImg

var gameState = "play"

var reset, resetImg


function preload(){
  targetImg = loadImage("sphere.png")
crosshairImg = loadImage("crosshair.png")
backgroundImg = loadImage("backgroundImage.jpg")
bombImg = loadAnimation("bomb-removebg-preview.png")
blastImg = loadAnimation("blastImg-removebg-preview.png")
resetImg = loadImage("reset.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  invisibleBackground = createSprite(width/2,height/2,width,height)
  invisibleBackground.visible = false
  
  crosshair = createSprite(width/2,height/2,30,30)
  crosshair.addImage(crosshairImg)
  crosshair.scale=0.5
 
  x = Math.round(random(100,width-100))
  y = Math.round(random(100,height-100))

timer = 500

  
target = createSprite(x,y,100,100)
  target.addImage(targetImg)
  target.scale=0.35 

  bomb = createSprite(width-300,75,25,25)
  bomb.addAnimation("bombImg",bombImg)
  bomb.addAnimation("blastImg",blastImg)
  bomb.scale = 0.5

  reset = createSprite(width/2+50,height/2+50,25,25)
  reset.addImage(resetImg)
  reset.scale = 0.15
  reset.visible = false

 

  

  



  score =0
}

function draw() {
  background(backgroundImg);

  if (gameState==="play"){

    crosshair.x = mouseX
  crosshair.y=mouseY

  x = Math.round(random(100,width-100))
  y = Math.round(random(100,height-100))
  if (mousePressedOver(target)){
    target.x = x
    target.y = y

    score = score +500
  }
    if (mousePressedOver(invisibleBackground)){
      score = score-100
    }
   blast()
    if (score<0 ){
      gameState = "end"
    }

  }
  console.log(frameCount)

  crosshair.depth = target.depth+1

  target.depth = invisibleBackground.depth+1

textSize(21)
fill("white")
text("score: "+score,width-200,100)

  
  



  

  if (gameState==="end"){
    textSize(60)
    fill("red")
    stroke("black")
    strokeWeight(2)
    text("Game Over", width/2-100,height/2)
    target.destroy()
      crosshair.destroy()
      bomb.changeAnimation("blastImg",blastImg)
      reset.visible = true

      if (mousePressedOver(reset)){
        restart()
      }
      
    
    
  }
  
  drawSprites();
}
function restart(){
gameState = "play"
score = 0
bomb.changeAnimation("bombImg",bombImg)
reset.visible = false
frameCount = 0
}

function blast(){
 bomb.lifetime = 200

}