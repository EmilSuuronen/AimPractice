const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

let score = 0;

function createDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');

    const maxX = gameContainer.clientWidth - 20;
    const maxY = gameContainer.clientHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;

    dot.addEventListener('click', () => {
        score += 10;
        scoreElement.textContent = score;
        gameContainer.removeChild(dot);
    });
    
    gameContainer.appendChild(dot);
}

startButton.addEventListener('click', () => {
    // Hide the "Start" button and show the game container
    startButton.style.display = 'none';
    gameContainer.classList.remove('hidden');

    // Start the game by creating dots
    setInterval(createDot, 1000); // Create a dot every second
});
