const aimAreaSlider = document.getElementById('aimAreaSlider');
const aimAreaValue = document.getElementById('aimAreaValue');
const gameContainerArea = document.querySelector('.game-container');

// Function to handle slider input
function handleAimAreaChange() {
    const newValue = aimAreaSlider.value;
    aimAreaValue.textContent = newValue + '%';

    gameContainerArea.style.width = newValue + '%'
}

aimAreaSlider.addEventListener('input', handleAimAreaChange);

handleAimAreaChange();