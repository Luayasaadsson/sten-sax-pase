let scores = {
    human: 0,
    robot: 0
};

const startPoints = 3;

function addWin(player) {
    if (scores[player] < startPoints) { 
        scores[player] += 1;
    }
    updateDisplay(player);
}

function updateDisplay(player) {
    const scoreElement = document.getElementById(`score${player}`);
    const progressElement = document.getElementById(`progress${player}`);
    const newWidth = ((startPoints - scores[player]) / startPoints) * 100;

    scoreElement.textContent = scores[player];
    progressElement.style.width = `${newWidth}%`;
}

