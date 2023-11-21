// Definerar här en global variabel för att spara om användaren startar spelet genom att börja trycka på joysticken för att välja en hand.
let isGameStarted = false;



// Denna funktion gör så att spelet börjar med händerna dolda i skärmen. Händerna kommer fram när användaren interagerar med spelet. 

function visaUfo(){
        let ufoElement = document.querySelector('.ufot');
        ufoElement.style.display = 'block';
        /* document.querySelector('.ufot').style.display = 'block'; */
        ufoElement.onclick = döljUfo;

}
   
function döljUfo(){
    document.querySelector('.ufot').style.display = 'none';

}




function hideAllHands() {
    document.querySelector('.bag').style.display = 'none';
    document.querySelector('.scissor').style.display = 'none';
    document.querySelector('.stone').style.display = 'none';
    document.querySelector('.robot-hand').style.display = 'none';
    document.querySelector('.robot-hand1').style.display = 'none';
    document.querySelector('.robot-hand2').style.display = 'none';
}

// Anropar funktionen när sidan laddas
hideAllHands();



let fuskAktiverat = false;


let joystick = 0;

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

    // Om spelet inte startas genom att först trycka på joysticken, då körs den här koden.
    if (!isGameStarted) {
        startGame();
    }
}

// Ny funktion som kör spelet ifall användaren börjar med att välja hand genom att trycka på joysticken.
function startGame() {
    isGameStarted = true;
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
        animation();
    } else if (event.key === 'r') {
        resetGame();
    } else if (event.key === 'F' || event.key === 'f') {
        fuskAktiverat = !fuskAktiverat;
        document.getElementById('fuskIndikator').style.display = fuskAktiverat ? 'block' : 'none';
        if (fuskAktiverat) {
            document.getElementById('fuskLjud').play();
        }
    }
})

function updateScoreElement() {
    document.getElementById('win.score').textContent = "Wins: " + win.score;
    document.getElementById('losses.score').textContent = "Losses: " + losses.score;
    document.getElementById('draw.score').textContent = "Draws: " + draw.score;
}

//Animationen för händerna när man trycker GO (EXPLOSION OCH GREJER)
function animation() {

    // Den här if-satsen ser till att spelets animation inte går igång ifall användaren inte interagerar med joysticken först.
    if (!isGameStarted) {
        alert("Please start the game using the joystick!")
        return;
}
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
        //console.log('z-index changed back to -10');


        // Show explosion animation
        expSound.play()
        explosionAnimation.style.display = 'block';
        explosionAnimation.style.opacity = '1';
        explosionAnimation.style.transition = 'opacity 1s ease-in';
        screenborder.style.zIndex = '-10';
        

        //console.log("KABOOOM");

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

    let robot;
    
    if (fuskAktiverat) {
        robot = (joystick + 2) % 3;
    } else {
        robot = Math.floor(Math.random() * 3);
    }
    //console.log(robot)

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
        //console.log("draw");
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/draw2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
        let drawSound = document.getElementById("drawSound");
        setTimeout(function(){drawSound.play();}, 300);
    } else if ((joystick === 0 && robot === 2) || (joystick === 1 && robot === 0) || (joystick === 2 && robot === 1)) {
        //console.log("win");
        updateScore('win.score');
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/win2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
        let winSound = document.getElementById("winSound");
        setTimeout(function(){winSound.play();}, 300);
        let winLifeSound = document.getElementById("winLife");
        setTimeout(function(){winLifeSound.play();}, 2400);
        setTimeout(function(){updateLifebar('robot', 1);}, 2400); // Minskar robotens liv med 1
    } else {
        //console.log("lose");
        updateScore('losses.score');
        console.log(updateScore)
        result = 'You lose!';
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/lose2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
        let loseSound = document.getElementById("loseSound");
        setTimeout(function(){loseSound.play();}, 300);
        let loseLifeSound = document.getElementById("loseLife");
        setTimeout(function(){loseLifeSound.play();}, 2400);
        setTimeout(function(){updateLifebar('human', 1);}, 2400); // Minskar humans liv med 1
        
    }
    
    let resultElement = document.getElementById('result');
    resultElement.style.animation = 'none';
    void resultElement.offsetWidth; 
    resultElement.style.animation = 'result1 2s ease'; ///SKRIVER UT RESULTAT PÅ SKÄRMEN
}
   /*  if (result === 'You win!') {
        win.score += 1;
      } else if (result === 'You lose!') {
        losses.score += 1;
      } else if (result === 'Draw!') {
        draw.score += 1;
      } */

function updateScore(scoreId) {
    const scoreElement = document.getElementById(scoreId);
    //console.log(scoreElement)
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

// Här lägger jag till en funkiton som uppdaterar spelarnas liv genom att minska backgrundsfärgen med 1 efter varje match. 
function updateLifebar(human) {
    let lifeItems;
    let updateIndex;

    if (human === 'human') {
        lifeItems = document.querySelectorAll('.life-bar-left .life-item');
        updateIndex = lifeItems.length - 1;
        while (updateIndex >= 0 && lifeItems[updateIndex].style.backgroundColor === 'grey') {
            updateIndex--;
        }
    } else {
        lifeItems = document.querySelectorAll('.life-bar-right .life-item');
        updateIndex = 0;
        while (updateIndex < lifeItems.length && lifeItems[updateIndex].style.backgroundColor === 'grey') {
            updateIndex++;
        }
    }

    if (updateIndex >= 0 && updateIndex < lifeItems.length) {
        lifeItems[updateIndex].style.backgroundColor = 'grey';
    }
    checkGameOver();
}
// Explosionseffekten fortsätter att loopa efter avlutad spel. Så jag lägger till en funktion för att tvinga det att stoppas. 
function stopExplosion() {
    let explosionAnimation = document.getElementById('explosion');
    explosionAnimation.style.display = 'none';
}

// Genom denna funktion bestämmer jag hur många liv ska varje spelare ha. 
function checkGameOver() {
    let humanLivesLost = document.querySelectorAll('.life-bar-left .life-item[style*="background-color: grey"]').length;
    let robotLivesLost = document.querySelectorAll('.life-bar-right .life-item[style*="background-color: grey"]').length;
    const totalLives = 3;

    if (humanLivesLost === totalLives || robotLivesLost === totalLives) {
        stopExplosion(); // Stoppar explosionen
        let loser = humanLivesLost === totalLives ? 'Human' : 'Robot';
        setTimeout(function() { endGame(loser); }, 500); // Genom denna funktion skickar jag förlorarens namn till endGame.
    }
}

// Denna funtion kör videon när human vinner.
function playWinnerVideo() {
    let video = document.getElementById('winnerVideo');
    video.style.display = 'block';
    video.play();
}

// Hämtar vinnarvideon och kör en funktion som stoppar videon.
document.getElementById('winnerVideo').addEventListener('ended', function() {
    this.style.display = 'none'; 
    this.pause(); 
    this.currentTime = 0; 
});

// Denna funktion kör videon när human förlorar.
function loserVideo() {
    let video = document.getElementById('loserVideo');
    video.style.display = 'block';
    video.play();
}

// Hämtar vinnarvideon och kör en funktion som stoppar videon.
document.getElementById('loserVideo').addEventListener('ended', function() {
    this.style.display = 'none';
    this.pause();
    this.currentTime = 0;
});


// Lägger min lyssnare utanför min resetGame funktion så att användaren kan välja att återställa spelet när som helst.
document.getElementById('resetButton').addEventListener('click', resetGame);

// Funktionen återställer livmätarna
function resetGame() {
    win.score = 0;
    losses.score = 0;
    draw.score = 0;
    updateScoreElement();
    let lifeItems = document.querySelectorAll('.life-item');
    lifeItems.forEach(function (item) {
        item.style.backgroundColor = ''; // Återställ bakgrundsfärgen
    });
    let flashOverlay = document.getElementById('flash-overlay');
/*     let resetSound = document.getElementById("button1");
    resetSound.play(); */

    // Check if flashOverlay exists
    if (flashOverlay) {
        // Make the overlay visible
        flashOverlay.style.opacity = '1';

        // Set a timeout to hide the overlay after a short period
        setTimeout(function() {
            flashOverlay.style.opacity = '0';
        }, 150); // Adjust the time for the length of the flash
    }

    // Här anropar jag min variabel för att se till att det inte går att köra spelet när användaren trycker på reset knappen. Återigen användaren måste interagera med joysticken först för att kunna fortsätta. 
    isGameStarted = false;


        // Här kallar jag på min funktion som är högst upp. Jag vill att när användaren trycker på återställningsknappen för att återställa resultatet, så ska det också gå att gömma händerna samtidigt.
        hideAllHands();
}







/* function updateLosses() {
    losses.score++; // Anta att detta är hur du uppdaterar antalet förluster
    // Kalla på UfoFunktion varje gång förlustantalet uppdateras
    UfoFunktion();
} */


/* document.addEventListener('DOMContentLoaded', (event) => {
   
document.querySelector('ufo').addEventListener('click', onUfoClick);

});

function onUfoClick() {
        //resetGame();
        console.log("UFO clicked!")
}; 

window.addEventListener('load', UfoFunktion); */




// Funktionen skriver ut förlorarens namn
function endGame(loser) {
    visaUfo();
    alert("Game Over! " + loser + " lost.");
    }, 100);
    resetGame(); // Återställer spelet automatiskt efter att alert-rutan stängs
}

document.getElementById('väljMusik').addEventListener('change', function(e) {
    let audioPlayer = document.getElementById('audioPlayer');
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


document.getElementById('mario').addEventListener('click', function(event) {
    event.preventDefault();
    const marioSound = document.getElementById('marioSound')
    marioSound.play()
})
