

let joystick = 1;

let win = { score: 0 };
let losses = { score: 0 };
let draw = { score: 0 };


//Byter värde mellan på en knapp som sitter på joysticken. Som då byter mellan de olika händerna
function joystickChange() {
    let switchSound = document.getElementById('button3')
   
    joystick     = (joystick + 1) % 3;
    document.getElementById('displayValue').innerText = joystick;
    document.querySelector('.bag').style.display = 'none';
    document.querySelector('.scissor').style.display = 'none';
    document.querySelector('.stone').style.display = 'none';
    switchSound.play()
    

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
    
 
    
    let flashOverlay = document.getElementById('flash-overlay');
    let resetSound = document.getElementById("button1");
    resetSound.play();

    // Check if flashOverlay exists
    if (flashOverlay) {
        // Make the overlay visible
        flashOverlay.style.opacity = '1';

        // Set a timeout to hide the overlay after a short period
        setTimeout(function() {
            flashOverlay.style.opacity = '0';
        }, 150); // Adjust the time for the length of the flash
    }

}

function updateScoreElement() {
    document.getElementById('win.score').textContent = "Wins: " + win.score;
    document.getElementById('losses.score').textContent = "Losses: " + losses.score;
    document.getElementById('draw.score').textContent = "Draws: " + draw.score;
}

//Animationen för händerna när man trycker GO (EXPLOSION OCH GREJER)
function animation() {
    let handAnimation = document.getElementById('hands');
    let choicesAnimation = document.getElementById('choices');
    let explosionAnimation = document.getElementById('explosion');
    let darkAnimation = document.getElementById('dark-overlay');
    let screenborder = document.getElementById('screenborder')
    let expSound = document.getElementById("expSound");
    let goSound = document.getElementById('button2');
    let wooshSound = document.getElementById("wooshSound");
    /* let swishSound = document.getElementById("swishSound"); */
    // Start dark animation with ease-in
    goSound.play()
    wooshSound.play()
  /*   swishSound.play() */
    darkAnimation.style.transition = 'opacity 0.8s ease-in';
    darkAnimation.style.opacity = '0.5';
    // Flash dark animation for 1 second then step out instantly
    setTimeout(function() {
        darkAnimation.style.transition = 'opacity 0.2s';
        darkAnimation.style.opacity = '0';

        // Optional: Reset the transition back to original after a short delay
        setTimeout(() => {
            darkAnimation.style.transition = 'opacity 0.01s ease-in';
        }, 50);
    }, 800);
    // Set z-index of hands to 10 and hide choices with initial opacity set to 0
    handAnimation.style.zIndex = '1';
    choicesAnimation.style.display = 'none';
    choicesAnimation.style.opacity = '0';  // Initially invisible

    // After a delay, change z-index back and call spel()
    setTimeout(function() {
        handAnimation.style.zIndex = '-10';
        choicesAnimation.style.display = 'block';
        choicesAnimation.style.zIndex = '10';
        console.log('z-index changed back to -10');


        // Show explosion animation
        expSound.play()
        explosionAnimation.style.display = 'block';
        explosionAnimation.style.opacity = '1';
        explosionAnimation.style.transition = 'opacity 1s ease-in';
        screenborder.style.zIndex = '-10';
        

        console.log("KABOOOM");

        // After the explosion animation, fade in the choices
        setTimeout(function() {
            choicesAnimation.style.transition = 'opacity 0.2s ease-in'; // Set transition for fade-in
            choicesAnimation.style.opacity = '1'; // Fade in choices
            spel();     
            setTimeout(function() {
                explosionAnimation.style.display = 'none';
                screenborder.style.zIndex = '10';
                

            }, 1000);
        }, 500);
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
        document.getElementById('result').innerHTML = "<img src='/images/draw2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
    } else if ((joystick === 0 && robot === 2) || (joystick === 1 && robot === 0) || (joystick === 2 && robot === 1)) {
        console.log("win");
        updateScore('win.score');
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/win2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
    } else {
        console.log("lose");
        updateScore('losses.score');
        result = 'You lose!';
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/lose2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
    }
    
    let resultElement = document.getElementById('result');
    resultElement.style.animation = 'none';
    void resultElement.offsetWidth; 
    resultElement.style.animation = 'result1 3s ease'; ///SKRIVER UT RESULTAT PÅ SKÄRMEN
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

document.getElementById('väljMusik').addEventListener('change', function(e) {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = this.value;
    audioPlayer.play();
});


//DELAY FÖR KNAPPAR SÅ INTE ANIMATIONER / LJUD BREAKAR:
//GO-BTN:
document.getElementById('goButton').addEventListener('click', function() {
    this.disabled = true;

    setTimeout(() => {
        this.disabled = false;
    }, 3300);
});

//SPAKENN
document.getElementById('joyButton').addEventListener('click', function() {
    this.disabled = true;

    setTimeout(() => {
        this.disabled = false;
    }, 300); // 2000 milliseconds = 2 seconds
});

document.getElementById('resetButton').addEventListener('click', function() {
    this.disabled = true;

    setTimeout(() => {
        this.disabled = false;
    }, 500); // 2000 milliseconds = 2 seconds
});