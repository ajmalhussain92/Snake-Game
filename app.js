// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define game settings
const boxSize = 20; // Size of each box in the grid
const rows = canvas.height / boxSize;
const cols = canvas.width / boxSize;

// Initialize snake
let snake = [{ x: 5 * boxSize, y: 5 * boxSize }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;

// Add keyboard event listener for direction control
document.addEventListener("keydown", changeDirection);

// Main game loop
let game = setInterval(updateGame, 100);

// Function to update the game
function updateGame() {
    // Update snake's head position
    const head = { x: snake[0].x, y: snake[0].y };
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;

    // Check for collisions with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }

    // Check for collisions with itself
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        // Remove the tail if no food is eaten
        snake.pop();
    }

    // Add the new head to the snake
    snake.unshift(head);

    // Clear the canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    drawScore();
}

// Function to draw the snake
function drawSnake() {
    ctx.fillStyle = "lime";
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    }
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Function to spawn food at a random position
function spawnFood() {
    return {
        x: Math.floor(Math.random() * cols) * boxSize,
        y: Math.floor(Math.random() * rows) * boxSize,
    };
}

// Function to draw the score
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Function to handle direction change
function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Function to end the game
function gameOver() {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    document.location.reload();
}
