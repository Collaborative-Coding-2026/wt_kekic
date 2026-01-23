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
const moveSpeed = 5
const gravity = 1
const numFrames = 16
const animationFrameLimit = 1
let animationFrameCurrent = 0

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
        player.x -= moveSpeed
    }

    if (e.key === ' ' && !player.isJumping){
        player.vy -= jumpSpeed;
        player.isJumping = true
        
    }
})

window.addEventListener('keyup', (e) => {
    keyState(e.key) = false
} )

function continuousMovement(){
    if (keyState('d')){
        player.x += moveSpeed
        animate()
    }

    if (keyState('a')){
        player.x -= moveSpeed
        animate()
    }

    requestAnimationFrame(continuousMovement)
}

function animate(){
    animationFrameCurrent +=1;
    if (animationFrameCurrent == animationFrameLimit){
        currentFrame = (currentFrame + 1) % numFrames;
        animationFrameCurrent = 0;
    }
    
}
function detectCollision(){
    for (let rect of [ground, platform]){
        if (player.x + 30 < rect.x + rect.width &&
            player.x + player.width - 30 > rect.x &&
            player.y + player.height> rect.y &&
            player.y + 35< rect.y+rect.height
        ){
            if(player.vy > 0){
                player.y= rect.y - player.height;
                player.vy = 0;
                player.isJumping = false;


            }
            else if (player.vy<0) {
                player.y = rect.y + rect.height;
                player.vy = 0;
                
            }
        }
    }
}

function gameLoop(){
    //keeps calling game loop
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    player.y += player.vy;
    player.vy += gravity
    detectCollision()
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

/** Current Goals and Stretch Goals
 * 1. Format code I already have
 * 2. Debug
 * 3. Make game look prettier
 * 4. Add health and hearts
 * 5. Add damaging blocks 
 * 6. Add level screen
 * 7. Create additional levels
 * 8. Add items or enemies (probs not gonna get to this)
 */