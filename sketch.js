var ride,rideImg;
var bgImg;
var database,position;


function preload(){
  bgImg=loadImage("background.png")
  rideImg=loadImage("balloon.png")
}


function setup() {
  createCanvas(800,400);
  ride=createSprite(400, 200, 50, 50);
  ride.addImage(rideImg)
  ride.scale=0.35;

  database=firebase.database();
  var ridePosition=database.ref("ballon/position")
  ridePosition.on("value",readPosition,showError)
}


function draw() {
  background(bgImg);

  if(position!==undefined){
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0)
  }  
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0)
  }  
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10)
    ride.scale=ride.scale+0.01;
  }  
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10)
    ride.scale=ride.scale-0.01;
  }
  }

  drawSprites();
  
  fill("black")
  text("*USE THE ARROWS KEYS TO MOVE THE HOT AIR BALLOON",10,20)
}


function changePosition(x,y){
  ride.x=ride.x+x;
  ride.y=ride.y+y;
}


function readPosition(data){
  position=data.val();
  ride.x=position.x;
  ride.y=position.y;
}


function showError(){
  console.log("there is a error")
}


function writePosition(x,y){
  database.ref("ballon/position").set({
    'x': ride.x+x,
    'y': ride.y+y
  })
}