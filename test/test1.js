// Game initialization
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define player object
const player = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    speed: 5,
    color: "blue",
    radius: 20
};

// Define bot object
const bot = {
    x: (canvas.width / 4) * 3,
    y: canvas.height / 2,
    speed: 3,
    color: "green",
    radius: 20
};

// Define obstacle objects
const obstacles = [
    { x: 100, y: 100, width: 200, height: 20 },
    { x: 400, y: 300, width: 150, height: 20 }
    // Add more obstacles as needed
];

// Define bullet object
const bullets = [];

// Handle keyboard input for player movement and shooting
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;

function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    } else if (event.key === "Up" || event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "Down" || event.key === "ArrowDown") {
        downPressed = true;
    } else if (event.key === "Space") {
        spacePressed = true;
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
    } else if (event.key === "Space") {
        spacePressed = false;
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
    // Update player movement
    if (rightPressed && player.x < canvas.width - player.radius) {
        player.x += player.speed;
    }
    if (leftPressed && player.x > player.radius) {
        player.x -= player.speed;
    }
    if (downPressed && player.y < canvas.height - player.radius) {
        player.y += player.speed;
    }
    if (upPressed && player.y > player.radius) {
        player.y -= player.speed;
    }

    // Update bullets
    if (spacePressed) {
        bullets.push({ x: player.x, y: player.y });
    }

    // Update bot movement
    if (bot.x < player.x) {
        bot.x += bot.speed;
    }
    if (bot.x > player.x) {
        bot.x -= bot.speed;
    }
    if (bot.y < player.y) {
        bot.y += bot.speed;
    }
    if (bot.y > player.y) {
        bot.y -= bot.speed;
    }

    // Check for collisions with obstacles
    for (let obstacle of obstacles) {
        if (detectCollision(obstacle)) {
            // Handle collision
            // For now, prevent player movement
            return;
        }
    }

    // Update bullet positions
    for (let bullet of bullets) {
        bullet.x += 2; // Adjust bullet speed
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

    // Draw bullets
    for (let bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Draw bot
    ctx.beginPath();
    ctx.arc(bot.x, bot.y, bot.radius, 0, Math.PI * 2);
    ctx.fillStyle = bot.color;
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
