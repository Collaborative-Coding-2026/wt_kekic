//--ASSETS--//

//character
const playerSprite = new Image();
playerSprite.src = "./sprites/bunnyright.png";

//background


//--CANVAS--//
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");

//--SKY--//

function drawSky() {
  ctx.fillStyle = "#87CEEB"; // sky blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//--GROUND--//

function drawPlatform() {
  const platformWidth = canvas.width * 0.3;   // 30% of screen width
  const platformHeight = canvas.height * 0.05; // 5% of screen height

  const y = canvas.height * 0.6; // bottom of screen

  ctx.fillStyle = "#76B947";
  ctx.fillRect(0, y, platformWidth, platformHeight);

  ctx.fillRect(1000, y, platformWidth, platformHeight )
}




//--GAME LOOP--//
function gameLoop() {
  drawSky();
  drawPlatform();
  requestAnimationFrame(gameLoop);
}

gameLoop();
