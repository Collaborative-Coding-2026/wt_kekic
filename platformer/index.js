const playerSprite = new Image();
playerSprite.src = "./sprites/spritewalk.png"

const background = new Image();
background.src = "./background/sunny-mountains-sky.png"

//getting canvas
const canvas = document.getElementById("canvas");

//make sure canvas is spanning entire window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d")

let currentFrame = 0
const spriteWidth = 64
const spriteHeight = 64

//defining ground
const ground = {
    x: 50,
    y: 600,
    height: 256,
    width: 1500,
}

const platform = {
    x: 450,
    y: 200,
    height: 100,
    width: 1000
}

const player = {
    x: 100,
    y: 400,
    height: 128,
    width: 128,
    //velocity on vertical axis
    vy: 0,
    isJumping: false,
    lookingRight: true,

}

//draws background color of canvas
function drawBackground(){
    ctx.fillStyle = '#C8F4F9'
    ctx.fillRect(0,0,window.innerWidth, window.innerHeight)

}

function drawGround(ground){
    ctx.fillStyle = '#98D7C2'
    ctx.fillRect(ground.x,ground.y,ground.width, ground.height)
}


function gameLoop(){
    //keeps calling game loop
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    if (player.lookingRight){
        ctx.drawImage(
            playerSprite,
            currentFrame * 64,
            0,
            spriteWidth,
            spriteHeight,
            player.x,
            player.y,
            player.width,
            player.height,

        )
    }
    drawBackground();
    drawGround(ground);
    drawGround(platform);

    requestAnimationFrame(gameLoop)
}


gameLoop()