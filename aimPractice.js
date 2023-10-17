const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score');
const missedElement = document.getElementById('missed');
const accuracyElement = document.getElementById('accuracy');
const startButton = document.getElementById('startButton');
const gameContainerElements = document.getElementById('gameContainerElements')

let score = 0;
let missedTargets = 0;
let clickedTargets = 0;
let missClickedTargets = 0;
let createDotInterval = 800;
let createTargetWithTimer;

function createDot() {
    if (missedTargets < 3) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        const maxX = gameContainer.clientWidth - 100;
        const maxY = gameContainer.clientHeight - 100;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        const minCreateDotInterval = 100;
        createDotInterval = Math.max(minCreateDotInterval, 1000 - 100 * score);
        
        dot.style.left = `${randomX}px`;
        dot.style.top = `${randomY}px`;

        const animationDuration = Math.max(3.0 - 0.002 * score, 0.2);
        
        const dotTimeout = setTimeout(() => {
            gameContainer.removeChild(dot);
            dotMissed();
        }, animationDuration * 1000);

        dot.style.animationDuration = `${animationDuration}s`;
        
        dot.addEventListener('click', () => {
            score += 10;
            clickedTargets++;
            scoreElement.textContent = score;
            clearTimeout(dotTimeout);
            dot.style.animation = 'none';
            gameContainer.removeChild(dot)
            accuracyElement.textContent = accuracyElement.textContent = calculateAccuracy().toFixed(1) + '%';
            console.log("clickedtargets" + clickedTargets)
        });

        document.addEventListener('click', () => {
            if (event.target === gameContainer) {
                missClickedTargets++
                accuracyElement.textContent = calculateAccuracy().toFixed(1) + '%';
                event.stopPropagation()
                console.log("MissClickedTargets" + missClickedTargets)
            }
        });
        
        gameContainer.appendChild(dot);
        
    } else {
        startButton.style.display = 'block';
        resetGame()
    }
}

function calculateAccuracy() {
    const totalTargets = clickedTargets + missClickedTargets;

    if (totalTargets === 0) {
        return 100.0; 
    }

    return (clickedTargets / totalTargets) * 100;
}

function dotMissed() {
    missedTargets++
    missedElement.textContent = missedTargets + "/3";
}

function resetGame() {
    clearInterval(createTargetWithTimer);
    const dots = gameContainer.querySelectorAll('.dot');

    dots.forEach((dot) => {
        gameContainer.removeChild(dot);
    });
    
    score = 0;
    missedTargets = 0;
    missClickedTargets = 0;
    clickedTargets = 0;
    createDotInterval = 1000;
    accuracyElement.textContent =
        ((clickedTargets/(clickedTargets + missClickedTargets)) * 100).toFixed(1) + '%';
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameContainer.classList.remove('hidden');

    createTargetWithTimer = setInterval(createDot, createDotInterval);
});
