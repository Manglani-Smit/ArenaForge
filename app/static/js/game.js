const player = document.getElementById("player");
const coin = document.getElementById("coin");
const gameArea = document.getElementById("game-area");

// --------------------
// Sound
// --------------------

const coinSound = new Audio("/static/sounds/Coin.mp3");
const bgMusic = new Audio("/static/sounds/background.mp3");

bgMusic.loop = true;
bgMusic.volume = 1.0;

// --------------------
// Game Area
// --------------------

const gameWidth = gameArea.clientWidth;
const gameHeight = gameArea.clientHeight;

// --------------------
// Constants
// --------------------

const playerSize = 40;
const coinSize = 25;
const moveSpeed = 3;

// --------------------
// Player State
// --------------------

let playerX = 200;
let playerY = 200;

// --------------------
// Coin State
// --------------------

let coinX = 500;
let coinY = 120;

let coins = 0;

// --------------------
// Coin Collision
// --------------------

// --------------------
// Keyboard State
// --------------------

let keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

// --------------------
// Animation State
// --------------------

let currentAnimation = "idle";
let currentFrame = 0;
let frameWidth = 32;
let totalFrames = 11;
let lastFrameTime = 0;
let facing = "right";
let lastFPSUpdate = 0;
let frames = 0;
const animationSpeed = 100;

function updateFPS(timestamp) {

    frames++;

    if (timestamp - lastFPSUpdate >= 1000) {

        document.getElementById("fps").textContent =
            "FPS : " + frames;

        frames = 0;

        lastFPSUpdate = timestamp;
    }

}



function checkCoinCollision() {

    if (
        playerX < coinX + coinSize &&
        playerX + playerSize > coinX &&
        playerY < coinY + coinSize &&
        playerY + playerSize > coinY
    ) {

        // Increase Score
        coins++;
        document.getElementById("coins").textContent = coins;

        // Play Sound
        coinSound.currentTime = 0;
        coinSound.play();

        // Random Coin Position
        coinX = Math.floor(Math.random() * (gameWidth - coinSize));
        coinY = Math.floor(Math.random() * (gameHeight - coinSize));

        // Update Coin Position
        coin.style.left = coinX + "px";
        coin.style.top = coinY + "px";
    }

}


// --------------------
// Update Animation
// --------------------

function updateAnimation(timestamp) {

    if (keys.w || keys.a || keys.s || keys.d) {

        currentAnimation = "run";

        animateFrames(timestamp);

    } else {

        currentAnimation = "idle";

        currentFrame = 0;

    }

}

// --------------------
// Render Animation
// --------------------

function animateFrames(timestamp) {

    if (timestamp - lastFrameTime > animationSpeed) {

        currentFrame++;

        if (currentFrame >= totalFrames) {
            currentFrame = 0;
        }

        lastFrameTime = timestamp;
    }

}

function renderAnimation() {

    if (currentAnimation === "idle") {
        player.style.backgroundImage = 'url("/static/images/idle.png")';
    } else {
        player.style.backgroundImage = 'url("/static/images/run.png")';
    }

    player.style.backgroundPosition =
        -(currentFrame * frameWidth) + "px 0px";

    if (facing === "right") {

    player.style.transform = "scaleX(1)";

    } else {

    player.style.transform = "scaleX(-1)";

}

}
// --------------------
// Keyboard Input
// --------------------

document.addEventListener("keydown", function (event) {

    if (bgMusic.paused) {
    bgMusic.play();
    }

    if (event.key === "w") keys.w = true;
    if (event.key === "a") keys.a = true;
    if (event.key === "s") keys.s = true;
    if (event.key === "d") keys.d = true;


});

document.addEventListener("keyup", function (event) {

    if (event.key === "w") keys.w = false;
    if (event.key === "a") keys.a = false;
    if (event.key === "s") keys.s = false;
    if (event.key === "d") keys.d = false;

});

// --------------------
// Game Loop
// --------------------

function gameLoop(timestamp) {

    // Move Up
    if (keys.w && playerY > 0) {
        playerY -= moveSpeed;
    }

    // Move Down
    if (keys.s && playerY < gameHeight - playerSize) {
        playerY += moveSpeed;
    }

    // Move Left
    if (keys.a && playerX > 0) {
        playerX -= moveSpeed;
        facing = "left";
    }

    // Move Right
    if (keys.d && playerX < gameWidth - playerSize) {
        playerX += moveSpeed;
        facing = "right";
    }

    // Update Player Position
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    // Update Animation State
    updateAnimation(timestamp);



    // Render Animation
    renderAnimation();

    // Check Collision
    checkCoinCollision();

    // Call Again
    requestAnimationFrame(gameLoop);

    updateFPS(timestamp);

}
    gameLoop();