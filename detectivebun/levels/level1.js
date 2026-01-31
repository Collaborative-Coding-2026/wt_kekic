/**
 * Name: level1.js
 * Author: Madison Kekic
 * First level of game — map loading, physics, collisions, animation
 */

//--ASSETS--//

//Player image
const playerSprite = new Image();
playerSprite.src = "./assets/player/kitty.png";

//Setting up canvas
const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

//--HELPER FUNCTIONS FOR MAP--//
//Used Copilot GPT to help debug my original functions for loading json and xml- biggest change was making the functions async
//Prompt: Im having *insert bug* given this code *previously written code* why might that be and how can I fix it
async function loadJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

async function loadXML(url) {
  const res = await fetch(url);
  const text = await res.text();
  return new DOMParser().parseFromString(text, "text/xml");
}

function loadImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });
}

async function loadTileset(tilesetInfo, mapDir) {
  const tsxPath = mapDir + tilesetInfo.source;
  const xml = await loadXML(tsxPath);

  const imageNode = xml.querySelector("image");
  const imageSource = imageNode.getAttribute("source");

  const tileWidth = parseInt(xml.documentElement.getAttribute("tilewidth"));
  const tileHeight = parseInt(xml.documentElement.getAttribute("tileheight"));
  const columns = parseInt(xml.documentElement.getAttribute("columns"));
  const tileCount = parseInt(xml.documentElement.getAttribute("tilecount"));

  const img = await loadImage(mapDir + imageSource);

  return {
    firstgid: tilesetInfo.firstgid,
    image: img,
    tileWidth,
    tileHeight,
    columns,
    tileCount
  };
}

function findTilesetForGID(gid, tilesets) {
  for (const ts of tilesets) {
    if (gid >= ts.firstgid && gid < ts.firstgid + ts.tileCount) {
      return ts;
    }
  }
  return null;
}

//--MAP VARS--//

let map = null;
let tilesets = [];
let collisionRects = [];

//extra vars
let gemRects = [];
let ladderRects = [];
let spikeRects = [];


//drawing player
//followed this tutorial for next functions: https://www.youtube.com/watch?v=i57Gufe3dCk
const player = {
  x: 100,
  y: 100,
  width: 16,
  height: 16,
  vy: 0,
  isJumping: false,
  lookingRight: true
};

//--ANIMATION--//

//vars and consts for animation
let currentFrame = 0;
const spriteWidth = 32;
const spriteHeight = 32;

const numFrames = 7;
const animationFrameLimit = 1;
let animationFrameCurrent = 0;

//animates character
function animate() {
  animationFrameCurrent++;
  if (animationFrameCurrent >= animationFrameLimit) {
    currentFrame = (currentFrame + 1) % numFrames;
    animationFrameCurrent = 0;
  }
}

//--PHYSICS--//

//physics vars
const gravity = 1;
const moveSpeed = 2;
const jumpSpeed = 10;

//--CONTROLS--//
const keyState = {};

window.addEventListener("keydown", e => {
  keyState[e.key] = true;

  if (e.key === "d") player.lookingRight = true;
  if (e.key === "a") player.lookingRight = false;

  if (e.key === " " && !player.isJumping) {
    player.vy = -jumpSpeed;
    player.isJumping = true;
  }
});

window.addEventListener("keyup", e => {
  keyState[e.key] = false;
});

//--CONTINUOUS MOVEMENT--//
function handleMovement() {
  if (keyState["d"]) player.x += moveSpeed;
  if (keyState["a"]) player.x -= moveSpeed;
}
//--COLLISION DETECTION--//
//origianl collision detection function did not account for json file as map- used Copilot GPT-5 to adapt previously
//written function: 
function detectCollision() {
  for (let rect of collisionRects) {
    if (
      player.x < rect.x + rect.width &&
      player.x + player.width > rect.x &&
      player.y < rect.y + rect.height &&
      player.y + player.height > rect.y
    ) {
      //top collision
      if (player.vy > 0) {
        player.y = rect.y - player.height;
        player.vy = 0;
        player.isJumping = false;
      }
      //bottom collision
      else if (player.vy < 0) {
        player.y = rect.y + rect.height;
        player.vy = 0;
      }
    }
  }
}

//actually drawing map
function drawMap() {
  for (const layer of map.layers) {
    if (layer.type !== "tilelayer") continue;

    const data = layer.data;

    for (let i = 0; i < data.length; i++) {
      const gid = data[i];
      if (gid === 0) continue;

      const tileset = findTilesetForGID(gid, tilesets);
      if (!tileset) continue;

      const localId = gid - tileset.firstgid;
      const sx = (localId % tileset.columns) * tileset.tileWidth;
      const sy = Math.floor(localId / tileset.columns) * tileset.tileHeight;

      const x = (i % map.width) * map.tilewidth;
      const y = Math.floor(i / map.width) * map.tileheight;

      ctx.drawImage(
        tileset.image,
        sx, sy, tileset.tileWidth, tileset.tileHeight,
        x - camera.x,
        y - camera.y,
        map.tilewidth,
        map.tileheight
    );

    }
  }
}

//--EXTRA STUFF--//

//first: ADD CAMERA--done
//ideas: damage dealing blocks, hp, gems, jumping animations
//horizontal collisions, menu button - reset, back to title, continue


//checks if player has fallen off map
function checkState(){
  if (player.y>=300){
    //resets player
    player.x=100
    player.y=100
  }
}

//--CAMERA--//

const camera = {
  x:0,
  y:0,
  width: canvas.width,
  height: canvas.height
}

function updateCamera() {
  //updates position
  camera.x = player.x - camera.width / 2;
  camera.y = player.y - camera.height / 2;

  //makes it so the camera only shows the map
  camera.x = Math.max(0, Math.min(camera.x, map.width * map.tilewidth - camera.width));
  camera.y = Math.max(0, Math.min(camera.y, map.height * map.tileheight - camera.height));
}


//--MENU--//
function drawButton(){
  
}

//--GAME LOOP--//
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateCamera();
  drawMap();
  checkState();
  handleMovement();
  animate();

  player.y += player.vy;
  player.vy += gravity;

  detectCollision();
  ctx.drawImage(
    playerSprite,
    currentFrame * spriteWidth,
    0,
    spriteWidth,
    spriteHeight,
    player.x - camera.x,
    player.y - camera.y,
    player.width,
    player.height
  );


  requestAnimationFrame(gameLoop);
}

//loads everything in at once
async function setupLevel() {
  map = await loadJSON("assets/maps/finmap.json");
  const mapDir = "assets/maps/";

  // Load tilesets
  for (const ts of map.tilesets) {
    tilesets.push(await loadTileset(ts, mapDir));
  }

  // Build collision rectangles
  const collisionLayer = map.layers.find(l => l.name === "collision");

  for (let i = 0; i < collisionLayer.data.length; i++) {
    const gid = collisionLayer.data[i];
    if (gid === 0) continue;

    const col = i % map.width;
    const row = Math.floor(i / map.width);

    collisionRects.push({
      x: col * map.tilewidth,
      y: row * map.tileheight,
      width: map.tilewidth,
      height: map.tileheight
    });
  }
  

  gameLoop();
}

window.onload = setupLevel;
