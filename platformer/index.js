const playerSprite = new Image();
playerSprite.src = "./sprites/spritewalk.png"

const background = new Image();
background.src = "./background/background-sky.png"

//getting canvas
const canvas = document.getElementById("canvas");

//make sure canvas is spanning entire window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d")

let currentFrame = 0
const spriteWidth = 64
const spriteHeight = 64

const jumpSpeed = 25
//defining ground
const ground = {
    x: 0,
    y: 900,
    height: 256,
    width: 1500,
}

const platform = {
    x:800,
    y: 600,
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
    // ctx.fillStyle = '#C8F4F9'
    // ctx.fillRect(0,0,window.innerWidth, window.innerHeight)
    // margin:0;
    //     background-image: url(background/sunny-mountains-sky.png);
    //     background-repeat: no-repeat;
    //     background-position: center;
        /*Doesn't scroll with us*/
        // background-attachment: fixed;
        // background-size: cover;
    ctx.drawImage(
        background,
        0,
        0,
        window.innerWidth,
        window.innerHeight,

    )
}

function drawGround(ground){
    ctx.fillStyle = '#98D7C2'
    ctx.fillRect(ground.x,ground.y,ground.width, ground.height)
}

const keyState = {
    
}
window.addEventListener("keydown", (e) =>{
    e.preventDefault()

    keyState(e.key)=true
    
    if (e.key === 'd'){
        player.x +=5

    }
    if (e.key === 'a'){
        player.x -=5
    }

    if (e.key === ' '){
        player.vy -= jumpSpeed;
        
    }
})

window.addEventListener('keyup', (e) => {
    keyState(e.key) = false
} )

function gameLoop(){
    //keeps calling game loop
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    
    drawBackground();
    drawGround(ground);
    drawGround(platform);
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

    requestAnimationFrame(gameLoop)
}


gameLoop()