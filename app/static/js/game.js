const player = document.getElementById("player");
const coin = document.getElementById("coin");
const gameArea = document.getElementById("game-area");

// --------------------
// Sound
// --------------------

const coinSound = new Audio("/static/sounds/Coin.mp3");

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
const moveSpeed = 10;

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
// Keyboard Input
// --------------------

document.addEventListener("keydown", function (event) {

    if (event.key === "w" && playerY > 0) {
        playerY -= moveSpeed;
    }

    if (event.key === "s" && playerY < gameHeight - playerSize) {
        playerY += moveSpeed;
    }

    if (event.key === "a" && playerX > 0) {
        playerX -= moveSpeed;
    }

    if (event.key === "d" && playerX < gameWidth - playerSize) {
        playerX += moveSpeed;
    }

    // Update Player Position
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    // Check Collision
    checkCoinCollision();

});