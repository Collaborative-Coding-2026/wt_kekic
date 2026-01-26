/**
 * Name: level1.js
 * Author: Madison Kekic
 * Creates first level of game
 * Draws game elements- ground, platforms, player
 * Implements core game mechanics- continuous movement, jumping, gravity, and collision detection
 */

//Creates new images and links to assets in background and sprites folders
const playerSprite = new Image();
playerSprite.src = "./sprites/spritewalk.png"
const background = new Image();
background.src = "./background/background-sky.png"

//Gets canvas and sets width and height
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d")

//Defines part of spritesheet that contains the first frame of animation
let currentFrame = 0
const spriteWidth = 64
const spriteHeight = 64

//Declares constants/variables for animating player
const numFrames = 8
const animationFrameLimit = 1
let animationFrameCurrent = 0

//Constants for implementing gravity and movement
const jumpSpeed = 25
const moveSpeed = 5
const gravity = 1

//Defining game elements; ground, platform, and player
//Change this and first set of constants to customize map appearance
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




///Draws background image- pls change background image
function drawBackground(){
    ctx.drawImage(
        background,
        0,
        0,
        window.innerWidth,
        window.innerHeight,

    )
}

//Draws ground and platforms- change to clearer variable name and potentially use image (new variable for ground texture??)
function drawGround(ground){
    ctx.fillStyle = '#334e2dff'
    ctx.fillRect(ground.x,ground.y,ground.width, ground.height)
}




//Empty dictionary for saving key states (true means key is pressed, false means key is not pressed)
const keyState = {
    
}

//Determines whether or not a key is being pressed and moves accordingly
window.addEventListener("keydown", (e) =>{
    e.preventDefault()

    keyState[e.key]=true
    
    // if (e.key === 'd'){
    //     player.x +=5

    // }
    // if (e.key === 'a'){
    //     player.x -= moveSpeed
    // }

    if (e.key === ' ' && !player.isJumping){
        player.vy -= jumpSpeed;
        player.isJumping = true
        
    }
})

//Determines if a player has stopped pressing a key
window.addEventListener('keyup', (e) => {
    keyState[e.key] = false
} )

function continuousMovement(){
    if (keyState['d']){
        player.x += moveSpeed
        animate()
    }

    if (keyState['a']){
        player.x -= moveSpeed
        animate()
    }

    requestAnimationFrame(continuousMovement)
}



//Animates player by moving frame of spritesheet
function animate(){
    animationFrameCurrent +=1;
    if (animationFrameCurrent == animationFrameLimit){
        currentFrame = (currentFrame + 1) % numFrames;
        animationFrameCurrent = 0;
    } 
}



//Determines if player has collided with platform underneath or platform above
function detectCollision(){
    for (let rect of [ground, platform]){
        if (player.x < rect.x + rect.width &&
            player.x + player.width > rect.x &&
            player.y + player.height> rect.y &&
            player.y < rect.y+rect.height
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
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    animate()

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

continuousMovement()
background.onload = () => gameLoop()

/** Current Goals and Stretch Goals
 * 1. Format code I already have
 * 2. Debug and have screen scroll with game
 * 3. Make game look prettier
 * 4. Add health and hearts
 * 5. Add damaging blocks 
 * 6. Add level screen
 * 7. Create additional levels
 * 8. Add items or enemies (probs not gonna get to this)
 */


/**
 * UI Elements: https://pixelfrog-assets.itch.io/tiny-swords
 * 
 */