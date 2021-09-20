var player,playerImage,bg,bgimage,alien,alienimage,alien2,alien2image,powercoins,powercoinsimage
var alien1grp,alien2grp,aliengrp
var gameState="start"
var coingrp;
var heart=0
var start,startimage,gameover,gameoverimage,restert,restartimage
function preload(){
  bgimage=loadImage("BG.jpg");
  playerImage=loadImage("BattleShip.png");
  powercoinsimage=loadImage("PowerCoins.png")
  alienimage=loadImage("bluenemy.png")
  alien2image=loadImage("sprite_0.png")

}
function setup() {
  createCanvas(windowWidth,windowHeight);
bg=createSprite(width/2,height/2)
bg.addImage("bg",bgimage)
bg.scale=5.5
bg.velocityX=-4
player=createSprite(100,height/2)
player.addImage("player",playerImage)
player.scale=0.5
alien1grp=new Group()
alien2grp=new Group()
aliengrp=new Group()
coingrp=new Group()
start=createSprite(width/2,height/2)
gameover=createSprite(width/2,height/2)
restart=createSprite(width/2,height/2+100)
gameover.visble=false
restart.visible=false
gameover.scale=0.01
restart.scale=0.01
}
function draw() {
  background(0);
  if(gameState==="start"){
    textSize(30)
    text("Click on Play To Start",width/3,height/3)
    if(mousePressed(start)){
      start.visible=false
      gameState="play"
      start.scale=0.01
    }
  }
  
  if(gameState==="play"){
    
    if(bg.x<0){
      bg.x=width/2
    }
    player.y=World.mouseY
     spawnenemies ()
     spawncoins ()
     if(aliengrp.isTouching(player)){
       gameState="end"
       heart--
      
     }
     player.isTouching(coingrp,collect)
  }
  if(gameState==="end"){
bg.velocityX=0
aliengrp.setVelocityXEach(0)
aliengrp.setLifetimeEach(-22)
coingrp.setVelocityXEach(0)
coingrp.setLifetimeEach(-28)
gameover.visible=true
restart.visible=true
gameover.scale=0.5
restart.scale=0.5
  }
if(mousePressed(restart)){
  gameover.visible=false
  restart.visible=false
  gameover.scale=0.01
restart.scale=0.01
gameState="play"
heart=0
aliengrp.destroyEach()
coingrp.destroyEach()
}
  drawSprites();
  textSize(30)
  text("heart-"+heart,width-200,50)
  
}
function spawnenemies(){
  if(frameCount%300===0){
    alien=createSprite(width,100)
    alien.addImage("enemies",alienimage)
    alien.velocityX=-4
    alien.scale=0.6
    alien.y=Math.round(random(100,height-100))
alien1grp.add(alien)
    alien2=createSprite(width+100,100)
    alien2.addImage("enemies",alien2image)
    alien2.velocityX=-4
    alien2.scale=0.5
    alien2.y=Math.round(random(100,height-100))
    alien2grp.add(alien2)
    aliengrp.add(alien)
    aliengrp.add(alien2)
    alien.lifetime=width/2
    alien2.lifetime=width/2
    
  }
}
function spawncoins(){
  if(frameCount%300===0){
    powercoin=createSprite(width,100)
    powercoin.y=Math.round(random(100,height-100))
    powercoin.addImage("powercoin",powercoinsimage)
    powercoin.velocityX=Math.round(random(-2,-8))
    coingrp.add(powercoin)
    powercoin.scale=0.5
    powercoin.lifetime=width

  }
}
function collect(player,powercoin){
  powercoin.destroy()
  heart++


}