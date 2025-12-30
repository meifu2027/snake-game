// Game constants
const GRID_SIZE = 20;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const GRID_WIDTH = CANVAS_WIDTH / GRID_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

// Game variables
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let gameSpeed = 150; // milliseconds
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameLoop;
let isPaused = false;

// DOM elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const speedElement = document.getElementById('speed');
const finalScoreElement = document.getElementById('final-score');
const gameOverElement = document.getElementById('game-over');
const welcomeElement = document.getElementById('welcome');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const restartBtn = document.getElementById('restart-btn');
const speedUpBtn = document.getElementById('speed-up');
const speedDownBtn = document.getElementById('speed-down');
const githubRepoLink = document.getElementById('github-repo');

// Initialize game
function initGame() {
    // Initialize snake
    snake = [
        {x: 5, y: 10},
        {x: 4, y: 10},
        {x: 3, y: 10}
    ];
    
    // Generate first food
    generateFood();
    
    // Reset game state
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    gameSpeed = 150;
    
    // Update UI
    updateScore();
    updateSpeedDisplay();
    gameOverElement.style.display = 'none';
    welcomeElement.style.display = 'none';
    
    // Draw initial state
    draw();
}

// Generate food at random position
function generateFood() {
    let foodOnSnake;
    
    do {
        foodOnSnake = false;
        food = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        };
        
        // Check if food is on snake
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                foodOnSnake = true;
                break;
            }
        }
    } while (foodOnSnake);
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.fillStyle = '#0f1525';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw grid
    drawGrid();
    
    // Draw snake
    drawSnake();
    
    // Draw food
    drawFood();
}

// Draw grid lines
function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= CANVAS_WIDTH; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= CANVAS_HEIGHT; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
    }
}

// Draw snake
function drawSnake() {
    // Draw each segment
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        
        // Head is different color
        if (i === 0) {
            ctx.fillStyle = '#00ff88';
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 10;
        } else {
            // Gradient from head to tail
            const intensity = 1 - (i / snake.length) * 0.7;
            const r = Math.floor(0 * intensity);
            const g = Math.floor(173 * intensity);
            const b = Math.floor(181 * intensity);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }
        
        // Draw segment with rounded corners
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        const radius = 4;
        
        ctx.beginPath();
        ctx.roundRect(x, y, GRID_SIZE, GRID_SIZE, radius);
        ctx.fill();
        
        // Draw eyes on head
        if (i === 0) {
            ctx.fillStyle = '#000';
            const eyeSize = GRID_SIZE / 5;
            
            // Position eyes based on direction
            let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
            
            switch(direction) {
                case 'right':
                    leftEyeX = x + GRID_SIZE - eyeSize * 2;
                    leftEyeY = y + eyeSize * 2;
                    rightEyeX = x + GRID_SIZE - eyeSize * 2;
                    rightEyeY = y + GRID_SIZE - eyeSize * 2;
                    break;
                case 'left':
                    leftEyeX = x + eyeSize;
                    leftEyeY = y + eyeSize * 2;
                    rightEyeX = x + eyeSize;
                    rightEyeY = y + GRID_SIZE - eyeSize * 2;
                    break;
                case 'up':
                    leftEyeX = x + eyeSize * 2;
                    leftEyeY = y + eyeSize;
                    rightEyeX = x + GRID_SIZE - eyeSize * 2;
                    rightEyeY = y + eyeSize;
                    break;
                case 'down':
                    leftEyeX = x + eyeSize * 2;
                    leftEyeY = y + GRID_SIZE - eyeSize;
                    rightEyeX = x + GRID_SIZE - eyeSize * 2;
                    rightEyeY = y + GRID_SIZE - eyeSize;
                    break;
            }
            
            ctx.beginPath();
            ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

// Draw food
function drawFood() {
    const x = food.x * GRID_SIZE;
    const y = food.y * GRID_SIZE;
    
    // Draw food with glow effect
    ctx.fillStyle = '#ff5722';
    ctx.shadowColor = '#ff5722';
    ctx.shadowBlur = 15;
    
    ctx.beginPath();
    ctx.arc(x + GRID_SIZE/2, y + GRID_SIZE/2, GRID_SIZE/2 - 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw inner highlight
    ctx.fillStyle = '#ff8a65';
    ctx.shadowColor = 'transparent';
    
    ctx.beginPath();
    ctx.arc(x + GRID_SIZE/3, y + GRID_SIZE/3, GRID_SIZE/6, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

// Update game state
function update() {
    // Update direction
    direction = nextDirection;
    
    // Calculate new head position
    const head = {...snake[0]};
    
    switch(direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            gameOver();
            return;
        }
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        // Increase score
        score += 10;
        
        // Update high score if needed
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // Update UI
        updateScore();
        
        // Increase speed every 50 points
        if (score % 50 === 0 && gameSpeed > 50) {
            gameSpeed -= 10;
            updateSpeedDisplay();
            
            // Restart game loop with new speed
            if (gameRunning) {
                clearInterval(gameLoop);
                gameLoop = setInterval(gameStep, gameSpeed);
            }
        }
        
        // Generate new food
        generateFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    // Draw updated game
    draw();
}

// Game step (update + draw)
function gameStep() {
    if (!isPaused && gameRunning) {
        update();
    }
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
}

// Update speed display
function updateSpeedDisplay() {
    if (gameSpeed >= 150) {
        speedElement.textContent = 'Slow';
    } else if (gameSpeed >= 100) {
        speedElement.textContent = 'Normal';
    } else if (gameSpeed >= 70) {
        speedElement.textContent = 'Fast';
    } else if (gameSpeed >= 50) {
        speedElement.textContent = 'Very Fast';
    } else {
        speedElement.textContent = 'Extreme';
    }
}

// Game over
function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    // Update final score
    finalScoreElement.textContent = score;
    
    // Show game over screen
    gameOverElement.style.display = 'flex';
}

// Start game
function startGame() {
    if (!gameRunning) {
        initGame();
        gameRunning = true;
        isPaused = false;
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        
        // Start game loop
        gameLoop = setInterval(gameStep, gameSpeed);
        
        // Hide welcome screen
        welcomeElement.style.display = 'none';
    }
}

// Pause/resume game
function togglePause() {
    if (!gameRunning) return;
    
    isPaused = !isPaused;
    
    if (isPaused) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    } else {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
}

// Reset game
function resetGame() {
    gameRunning = false;
    isPaused = false;
    clearInterval(gameLoop);
    
    initGame();
    welcomeElement.style.display = 'flex';
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
}

// Change speed
function changeSpeed(amount) {
    const newSpeed = gameSpeed + amount;
    
    // Limit speed range
    if (newSpeed >= 50 && newSpeed <= 300) {
        gameSpeed = newSpeed;
        updateSpeedDisplay();
        
        // Restart game loop with new speed if game is running
        if (gameRunning) {
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    }
}

// Event listeners for keyboard controls
document.addEventListener('keydown', (e) => {
    // Prevent default behavior for arrow keys
    if ([37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
    }
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') nextDirection = 'right';
            break;
        case ' ':
            // Space to pause/resume
            if (gameRunning) {
                togglePause();
            } else {
                startGame();
            }
            break;
    }
});

// Event listeners for buttons
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', startGame);
speedUpBtn.addEventListener('click', () => changeSpeed(-20));
speedDownBtn.addEventListener('click', () => changeSpeed(20));

// GitHub repo link
githubRepoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('https://github.com/meifu2027/snake-game', '_blank');
});

// Initialize canvas rounded rectangle method if not exists
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
        return this;
    };
}

// Initialize game on load
window.addEventListener('load', () => {
    // Update high score display
    highScoreElement.textContent = highScore;
    
    // Draw initial state
    draw();
    
    // Show welcome screen
    welcomeElement.style.display = 'flex';
});
