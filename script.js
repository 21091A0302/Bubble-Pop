const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const bubbleContainer = document.getElementById('bubble-container');
const timeLeftDisplay = document.getElementById('time-left');

let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let bubbleInterval;
let timeLeft = 30; // Time limit for the game

// Update high score display
highScoreDisplay.textContent = `High Score: ${highScore}`;

// Start game on button click
startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    score = 0; // Reset score
    timeLeft = 30; // Reset time
    scoreDisplay.textContent = `Score: ${score}`;
    timeLeftDisplay.textContent = timeLeft;

    spawnBubbles();
    startTimer();
});

// Spawn bubbles at random positions
function spawnBubbles() {
    bubbleInterval = setInterval(() => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 50 + 30; // Bubble size between 30px and 80px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        bubble.style.top = `${Math.random() * (window.innerHeight - size)}px`;
        bubbleContainer.appendChild(bubble);

        // Bubble pop event
        bubble.addEventListener('click', () => {
            bubbleContainer.removeChild(bubble);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        });

        // Remove bubble after a few seconds if not popped
        setTimeout(() => {
            if (bubble.parentNode) {
                bubbleContainer.removeChild(bubble);
            }
        }, 5000);
    }, 1000); // Spawn a new bubble every second
}

// Start timer countdown
function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000); // Update every second
}

// End game
function endGame() {
    clearInterval(bubbleInterval);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Store new high score
    }
    alert(`Game Over! Your score: ${score}`);
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    location.reload(); // Restart the game
}
