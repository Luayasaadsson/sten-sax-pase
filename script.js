const fetchName = {
    fetchPlayerName: () => {
        return fetch("data.json")
        .then(res => {
            if (!res.ok) {
                console.log("Fetch failed with status: ", res.status);
                throw new Error('Network response was not ok.');
            }
            console.log("Response ok, proceeding to parse JSON.");
            return res.json();
        })
        .then(data => {
            if (!data.userName) {
                console.log("userName not found in the data: ", data);
                return; // Exit the function if userName is not present
            }
            console.log("Setting userName: ", data.userName);
            document.querySelector(".text-left").innerText = data.userName; // Changed to querySelector to target the class
            return data.userName; // If you need to use the userName outside
        })
        
        .catch(error => {
            console.error('Error:', error);
        });
    },
    fetchRobotName: () => {
        return fetch("data.json")
        .then(res => {
            if (!res.ok) {
                console.log("Fetch failed with status: ", res.status);
                throw new Error('Network response was not ok.');
            }
            console.log("Response ok, proceeding to parse JSON.");
            return res.json();
        })

        .then(data => {
            if (!data.robotName) {
                console.log("robotName not found in the data: ", data);
                return; // Exit the function if userName is not present
            }
            console.log("Setting robotName: ", data.robotName);
            document.querySelector(".text-right").innerText = data.robotName; // Changed to querySelector to target the class
            return data.robotName; // If you need to use the userName outside
        })
        // Call the function to fetch and update the player name
        
        .catch(error => {
            console.error('Error:', error);
        });
    }
};

// Now call both methods after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchName.fetchPlayerName();
    fetchName.fetchRobotName();

});

let joystick = 1;

let win = { score: 0 };
let losses = { score: 0 };
let draw = { score: 0 };


//Byter värde mellan på en knapp som sitter på joysticken. Som då byter mellan de olika händerna
function joystickChange() {
    joystick     = (joystick + 1) % 3;
    document.getElementById('displayValue').innerText = joystick;
    document.querySelector('.bag').style.display = 'none';
    document.querySelector('.scissor').style.display = 'none';
    document.querySelector('.stone').style.display = 'none';

    if (joystick === 0) {
        document.querySelector('.bag').style.display = 'block';
    } else if (joystick === 1) {
        document.querySelector('.scissor').style.display = 'block';
    } else if (joystick === 2) {
        document.querySelector('.stone').style.display = 'block';
    }
}


//Ändrar på joystick bilden så den böjer sig när man klickar
function joystickBend() {
    const imageElement = document.getElementById('joystickImage')
    const origionalSrc = imageElement.src;
    imageElement.src = '/images/joystick-2.png'
    setTimeout(() => {
        imageElement.src = origionalSrc;
    }, 100)
}

document.body.addEventListener('keydown',(event) => {
    if (event.key === 'j') {
        joystickChange();
        joystickBend();
    } else if (event.key === 'g') {
        spel();
    } else if (event.key === 'r') {
        resetGame();
    }
})


// början till självaste spelet.
//0 paper
//1 scissor
//2 rock

function resetGame() {
    win.score = 0;
    losses.score = 0;
    draw.score = 0;
    updateScoreElement();
}

function updateScoreElement() {
    document.getElementById('win.score').textContent = "Wins: " + win.score;
    document.getElementById('losses.score').textContent = "Losses: " + losses.score;
    document.getElementById('draw.score').textContent = "Draws: " + draw.score;
}

//Animationen för händerna när man trycker GO

function animation() {
    let handAnimation = document.getElementById('hands');
    let choicesAnimation = document.getElementById('choices');
    let explosionAnimation = document.getElementById('explosion');
    console.log(handAnimation);

    // Set z-index of hands to 10 and hide choices
    handAnimation.style.zIndex = '10';
    choicesAnimation.style.display = 'none';

    // After a delay, change z-index back and call spel()
    setTimeout(function() {
        handAnimation.style.zIndex = '-10';
      
        console.log('z-index changed back to -10');
        explosionAnimation.style.display = 'block';
        console.log("KABOOOM");

        // Hide explosion animation after 1000 milliseconds
        setTimeout(function() {
            explosionAnimation.style.display = 'none';
            choicesAnimation.style.display = 'block'; // Show choices again
        }, 800); // 1000 milliseconds = 1 second
        spel();

        // Show explosion animation
       

    }, 800); // 800 milliseconds = 0.8 seconds
}


function spel () {
    
    let robot = Math.floor(Math.random() * 3)
    console.log(robot)

   /*  let result = '';

    if (joystick === robot) {
        document.getElementById('draw.score').textContent = "Draws: " + (parseInt(document.getElementById('draw.score').textContent.split(" ")[1]) + 1);
        console.log("draw");
        robotHand (robot)
    }else if ((joystick === 0 && robot === 2) || (joystick === 1 && robot === 0) || (joystick === 2 && robot === 1)) {
        console.log("win");
        document.getElementById('win.score').textContent = "Wins: " + (parseInt(document.getElementById('win.score').textContent.split(" ")[1]) + 1);
        robotHand (robot)
    } else {
        console.log("lose");
        document.getElementById('losses.score').textContent = "Losses: " + (parseInt(document.getElementById('losses.score').textContent.split(" ")[1]) + 1);
        result = 'You lose!';
        robotHand (robot)
    } */

    if (joystick === robot) {
        updateScore('draw.score');
        console.log("draw");
        robotHand(robot)
    } else if ((joystick === 0 && robot === 2) || (joystick === 1 && robot === 0) || (joystick === 2 && robot === 1)) {
        console.log("win");
        updateScore('win.score');
        robotHand(robot)
    } else {
        console.log("lose");
        updateScore('losses.score');
        result = 'You lose!';
        robotHand(robot)
    }
}
    if (result === 'You win!') {
        win.score += 1;
      } else if (result === 'You lose!') {
        losses.score += 1;
      } else if (result === 'Draw!') {
        draw.score += 1;
      }

function updateScore(scoreId) {
    const scoreElement = document.getElementById(scoreId);
    let currentScore = parseInt(scoreElement.textContent.split(" ")[1]);
    if (isNaN(currentScore)) {
        currentScore = 0; // Om det inte är ett numeriskt värde, sätt det till 0
    }
    scoreElement.textContent = scoreElement.textContent.split(" ")[0] + " " + (currentScore + 1);
}

function robotHand (robot) {
    document.querySelector('.robot-hand').style.display = 'none';
    document.querySelector('.robot-hand1').style.display = 'none';
    document.querySelector('.robot-hand2').style.display = 'none';

    if (robot === 0) {
        document.querySelector('.robot-hand2').style.display = 'block';
    }else if (robot === 1) {
        document.querySelector('.robot-hand1').style.display = 'block';
    }else if (robot === 2) {
        document.querySelector('.robot-hand').style.display = 'block';
    }

   
/*     setTimeout(function() {
        selectedHand.style.display = 'none';
    }, 2000); */
}
