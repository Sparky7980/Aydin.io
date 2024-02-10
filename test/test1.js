// Game initialization
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 5,
    color: "blue",
    radius: 20
};

// Define obstacle objects
const obstacles = [
    { x: 100, y: 100, width: 200, height: 20 },
    { x: 400, y: 300, width: 150, height: 20 }
    // Add more obstacles as needed
];

// Handle keyboard input for player movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    } else if (event.key === "Up" || event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "Down" || event.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = false;
    } else if (event.key === "Up" || event.key === "ArrowUp") {
        upPressed = false;
    } else if (event.key === "Down" || event.key === "ArrowDown") {
        downPressed = false;
    }
}

// Collision detection function
function detectCollision(obstacle) {
    const playerLeft = player.x - player.radius;
    const playerRight = player.x + player.radius;
    const playerTop = player.y - player.radius;
    const playerBottom = player.y + player.radius;

    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = obstacle.y;
    const obstacleBottom = obstacle.y + obstacle.height;

    return (
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight &&
        playerBottom > obstacleTop &&
        playerTop < obstacleBottom
    );
}

// Update game state
function update() {
    if (rightPressed && player.x < canvas.width - player.radius) {
        player.x += player.speed;
    } else if (leftPressed && player.x > player.radius) {
        player.x -= player.speed;
    }

    if (downPressed && player.y < canvas.height - player.radius) {
        player.y += player.speed;
    } else if (upPressed && player.y > player.radius) {
        player.y -= player.speed;
    }

    // Check for collisions with obstacles
    for (let obstacle of obstacles) {
        if (detectCollision(obstacle)) {
            // Handle collision - for now, prevent player movement
            return;
        }
    }
}

// Render the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw obstacles
    for (let obstacle of obstacles) {
        ctx.fillStyle = "#654321"; // Brown color
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
