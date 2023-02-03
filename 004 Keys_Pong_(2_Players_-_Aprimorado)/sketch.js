/*
Repo: https://github.com/??????
Created by S_keys based on my second project and improved as I increased my programming knowledge"
Version v0.0.1 | september 23, 2022
*/

console.log("{Keys Pong - 2 Players}");

////////////////////VARIABLE////////////////////

//table
let imageTbale;

//ball dimensions
let xBall = 274;
let yBall = 152;
let ballDiameter = 18;
let radiusBall = ballDiameter / 2;

//ball displacement
let xBallSpeed = 6;
let yBallSpeed = 5;

//racket dimensions
let widthRacket = 10;
let heightRacket = 75;
let cornerRacket = 3;
let hit = false;

//racket p1
let xP1Racket = 0;
let yP1Racket = 117;

//racket p2
let xP2Racket = 539;
let yP2Racket = 117;

//game score
let scoreP1 = 0;
let scoreP2 = 0;

//game sounds
let soundHit;
let soundScore;
let soundTrack;

function preload() {
  soundHit = loadSound("soundhit.mp3");
  soundScore = loadSound("soundscore.mp3");
  soundTrack = loadSound("soundtrack.mp3");
}

////////////////////SETUP AND DRAW////////////////////

function setup() {
  createCanvas(548, 304);
  //////////////soundTrack.loop();
}

function draw() {
  background(imageTable);

  //ball functions
  showBall();
  ballMovement();
  ballCollision();

  //p1 racket functions
  fill(color(50, 205, 50));
  stroke(color(0));
  showRacket(xP1Racket, yP1Racket);
  racketP1();
  hitRacketLibrary(xP1Racket, yP1Racket);

/*racketCollision(); previous collide function paused to use the "collideRect Circle" (inside "hitRacketLibrary") imported from the library
*/

  //p2 Racket functions
  fill(color(139, 0, 0));
  stroke(0);
  showRacket(xP2Racket, yP2Racket);
  racketP2();
  hitRacketLibrary(xP2Racket, yP2Racket);

  //game score functions
  showScore();
  getScore();
  stuckBall();
}

////////////////////FUNCTIOS////////////////////

//table parameters
function preload(){
  imageTable = loadImage ("images/Keys_Table_Pong_2022.png") 
}

//ball parameters
function showBall() {
  fill(color(255, 215, 0));
  stroke(184, 134, 11);
  circle(xBall, yBall, ballDiameter);
}

function ballMovement() {
  xBall += xBallSpeed;
  yBall += yBallSpeed;
}

function ballCollision() {
  if (xBall + radiusBall > width || xBall - radiusBall < 0) {
    xBallSpeed *= -1;
  }

  if (yBall + radiusBall > height || yBall - radiusBall < 0) {
    yBallSpeed *= -1;
  }
}

function racketCollision() {
  if (
    xBall - radiusBall < xP1Racket + widthRacket &&
    yBall - radiusBall < yP1Racket + heightRacket &&
    yBall + radiusBall > yP1Racket - heightRacket
  ) {
    xBallSpeed *= -1;
    //soundHit.play();
  }
}

function hitRacketLibrary(x, y) {
  hit = collideRectCircle(x,y,widthRacket,heightRacket,xBall,yBall,radiusBall);
  if (hit) {
    xBallSpeed *= -1;
    //soundHit.play();
  }
}

//rackets
function showRacket(x, y) {
  rect(x, y, widthRacket, heightRacket, cornerRacket);
}

//p1 parameters
function racketP1() {
  if (keyIsDown(87)) {
    yP1Racket -= 10;
  }
  if (keyIsDown(83)) {
    yP1Racket += 10;
  }
}

//p2 parameters
function racketP2() {
  if (keyIsDown(UP_ARROW)) {
    yP2Racket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yP2Racket += 10;
  }
}

//score parameters
function showScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(15);
  fill(color(255, 140, 0));
  rect(90, 3, 40, 20, 3);
  fill(255);
  text(scoreP1, 110, 18);
  fill(color(255, 140, 0));
  rect(418, 3, 40, 20, 3);
  fill(255);
  text(scoreP2, 438, 18);
}

function getScore() {
  if (xBall + radiusBall > xP2Racket + widthRacket) {
    scoreP1 += 1;
    //soundScore.play();
  }
  if (xBall - radiusBall < xP1Racket) {
    scoreP2 += 1;
    //soundScore.play();
  }
}

function stuckBall(){
    if (xBall - radiusBall < 0){
    xBall = 10
    }
    if (xBall + radiusBall > 548){
      xBall = 524
    }
}