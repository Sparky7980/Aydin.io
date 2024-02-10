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
    } else if (event.key === "Space") {
        // Space key pressed, shoot a bullet
        const bullet = {
            x: player.x,
            y: player.y,
            speed: 8,
            direction: 1, // 1 represents the direction of player's bullets
            radius: 5,
            color: "red"
        };
        bullets.push(bullet);
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

    // Update bullets' positions and handle collisions
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].speed * bullets[i].direction;

        // Check collision with bot
        if (bullets[i].x > bot.x - bot.radius &&
            bullets[i].x < bot.x + bot.radius &&
            bullets[i].y > bot.y - bot.radius &&
            bullets[i].y < bot.y + bot.radius) {
            // Bot hit, handle accordingly
            // For now, we remove the bullet and reset the bot's position
            bullets.splice(i, 1);
            bot.x = (canvas.width / 4) * 3; // Reset bot's position
            bot.y = canvas.height / 2;
            break;
        }

        // Check if bullet is out of bounds
        if (bullets[i].x < 0 || bullets[i].x > canvas.width) {
            bullets.splice(i, 1);
            break;
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

    // Draw bullets
    for (let bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
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
