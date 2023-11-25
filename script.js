// Definerar här en global variabel för att spara om användaren startar spelet genom att börja trycka på joysticken för att välja en hand.
let isGameStarted = false;
let endGameAnimation = false
let fuskAktiverat = false;
let joystick = 0;
let win = { score: 0 };
let losses = { score: 0 };
let draw = { score: 0 };


// Denna funktion gör så att spelet börjar med händerna dolda i skärmen. Händerna kommer fram när användaren interagerar med spelet. 

/* function visaUfo(){
    if (endGameAnimation === false) {
        audioPlayer.pause();
        let ufoSound = document.getElementById("ufoSound");
        ufoSound.play();
        let ufoElement = document.querySelector('.ufot');
        let animatedBackground = document.getElementById('animated-background');
        animatedBackground.style.background = "url(/images/alien.png)";
        animatedBackground.style.animation = "slideshowPanY 37s infinite";
        ufoElement.style.background = "url(/images/ufo2.png)";
        ufoElement.style.backgroundSize = "cover"
        ufoElement.style.height = "100px"
        ufoElement.style.display = 'block';
        ufoElement.onclick = döljUfo;
    }
        
} */
   
/* function döljUfo(){
    let ufoElement = document.querySelector('.ufot'); */
  /*   ufoElement.style.animation = "none"; */
   /*  ufoElement.style.background = "url(/images/exp2.gif)";
    ufoElement.style.backgroundSize = "cover"
    ufoElement.style.height = "200px"
    let ufoexp = document.getElementById("ufoexp");
    ufoexp.play()
    setTimeout(function() {
        let animatedBackground = document.getElementById('animated-background');
        animatedBackground.style.animation = "slideshowPanY 37.5s infinite , slideshow 75s infinite";
        animatedBackground.style.background = "url(/images/level1.jfif)";
        audioPlayer.play();
        document.querySelector('.ufot').style.display = 'none';
        ufoElement.style.background = "url(/images/ufo.png)";
        ufoElement.style.backgroundSize = "cover"
        let ufoSound = document.getElementById("ufoSound");
        ufoSound.pause();
        ufoSound.currentTime = 0; 
        let winLifeSound = document.getElementById("winLife");
        winLifeSound.play();
    }, 500);

}
 */
/* setInterval(visaUfo, 30000); */

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
    if (event.key === 'j' || event.key === 'J') {
        joystickChange();
        joystickBend();
    } else if (event.key === 'g' || event.key === 'G') {
        animation();
    } else if (event.key === 'r' || event.key === 'R') {
        resetGame();
    } else if (event.key === 'f' || event.key === 'F') {
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

    document.getElementById('endGameMessage').style.display = 'none';// Denna kodrad gör så att meddelande vid vinst/förlust
    //  återställs tillsammans med resultatet.
}

//Animationen för händerna när man trycker GO (EXPLOSION OCH GREJER)
function animation() {

    // Den här if-satsen ser till att spelets animation inte går igång ifall användaren inte interagerar med joysticken först.
    if (!isGameStarted) {
        alert("Please start the game using the joystick to choose hand (✊✋✌️)")
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

    goSound.play()
    wooshSound.play()
    darkAnimation.style.transition = 'opacity 0.8s ease-in';
    darkAnimation.style.opacity = '0.5';

    setTimeout(function() {
        darkAnimation.style.transition = 'opacity 0.2s';
        darkAnimation.style.opacity = '0';


        setTimeout(() => {
            darkAnimation.style.transition = 'opacity 0.01s ease-in';
        }, 50);
    }, 800);
 
    
    handAnimation.style.zIndex = '1';
    choicesAnimation.style.display = 'none';
    choicesAnimation.style.opacity = '0';  

  
    // Efter fördröjningne, ändras z-index tillbaka.
    setTimeout(function() {
        handAnimation.style.zIndex = '-10';
        choicesAnimation.style.display = 'block';
        choicesAnimation.style.zIndex = '10';


        // Visar explosion effekt.
        expSound.play()
        explosionAnimation.style.display = 'block';
        explosionAnimation.style.opacity = '1';
        explosionAnimation.style.transition = 'opacity 1s ease-in';
        screenborder.style.zIndex = '-10';
        

        setTimeout(function() {
            choicesAnimation.style.transition = 'opacity 0.2s ease-in'; 
            choicesAnimation.style.opacity = '1'; 
            spel();     
            setTimeout(function() {
                explosionAnimation.style.display = 'none';
                screenborder.style.zIndex = '10';
                

            }, 1000);
        }, 500);
    }, 800);
}



function spel () {

    let robot;
    
    if (fuskAktiverat) {
        robot = (joystick + 2) % 3;
    } else {
        robot = Math.floor(Math.random() * 3);
    }

    if (joystick === robot) {
        updateScore('draw.score');
        //console.log("draw");
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/draw2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
        let drawSound = document.getElementById("drawSound");
        setTimeout(function(){drawSound.play();}, 300);
    } else if ((joystick === 0 && robot === 2) || (joystick === 1 && robot === 0) || (joystick === 2 && robot === 1)) {
        //console.log("win");
        document.getElementById("goButton").disabled = true;
        updateScore('win.score');
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/win2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
        let winSound = document.getElementById("winSound");
        setTimeout(function(){winSound.play();}, 300);
        let winLifeSound = document.getElementById("winLife");
        setTimeout(function(){winLifeSound.play();}, 2000);
        setTimeout(function(){updateLifebar('robot', 1);
    }, 2000); // Minskar robotens liv med 1
    } else {
        document.getElementById("goButton").disabled = true;
        updateScore('losses.score');
        console.log(updateScore)
        result = 'You lose!';
        robotHand(robot)
        document.getElementById('result').innerHTML = "<img src='/images/lose2.png'>"; //<<<SKRIVER UT RESULTAT PÅ SKÄRMEN
        let loseSound = document.getElementById("loseSound");
        setTimeout(function(){loseSound.play();}, 300);
        let loseLifeSound = document.getElementById("loseLife");
        setTimeout(function(){loseLifeSound.play();}, 2000);
        setTimeout(function(){updateLifebar('human', 1);
    
    }, 2000); // Minskar humans liv med 1
        
    }
    
    let resultElement = document.getElementById('result');
    resultElement.style.animation = 'none';
    void resultElement.offsetWidth; 
    resultElement.style.animation = 'result1 2s ease'; ///SKRIVER UT RESULTAT PÅ SKÄRMEN
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
}

// Här lägger jag till en funkiton som uppdaterar spelarnas liv genom att minska backgrundsfärgen med 1 efter varje runda. 
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
        let loser = humanLivesLost === totalLives ? 'Human' : 'Robot'; // En Ternär operatorn används här för att bestämma vem förloraren är.
        setTimeout(function() { endGame(loser); }, 500); // Genom denna funktion skickar jag förlorarens namn till endGame. I endGame sker då animationer/alert.
    }
}

// Denna funtion kör videon när human vinner.
function playWinnerVideo() {
    let video = document.getElementById('winnerVideo');
    video.style.display = 'block';
    video.play();
    video.currentTime = 0;


    //----------- Tillsammasn med videon körs "Press resset" meddelandet. Koden för det nedan---------// 

    setTimeout(function() { //Väntar tills press reset-animationen börjar
            
        //Animation
            document.getElementById('pressreset').innerHTML = "<img src='/images/reset.png'>"; //Visar pressreset på skärmen
            let resetElement2 = document.getElementById('pressreset');   
            resetElement2.style.opacity = 1; ///SKRIVER reset
            resetElement2.style.display = "block";
            resetElement2.style.animation = 'none';
            void resetElement2.offsetWidth; 
            resetElement2.style.animation = 'pressreset1 2s infinite'; ///SKRIVER UT reset
        }, 16500); //Delay för hjärnan om man har damp
}

// Hämtar vinnarvideon och kör en funktion som stoppar videon.
document.getElementById('winnerVideo').addEventListener('ended', function() {
    this.style.display = 'none'; 
    this.pause(); 
    this.currentTime = 0; 
});

//-------- Denna funktion kör videon när human förlorar. OBS! (Just nu är den ej aktiv.)-------------//
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
//------------------------------------------------------------------------------------------------------------------------//


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
        item.style.backgroundColor = ''; // Återställer bakgrundsfärgen.
    });   
    
    //Video
    let video = document.getElementById('winnerVideo');
    video.style.display = 'none';
    video.pause()

    //Ljud
    let gameOverSound = document.getElementById("gameOverSound")
    gameOverSound.pause() //Stänger av eventuellt överlappande ljud efter man fått Game over
    let resetSound = document.getElementById("button1");
    resetSound.play();
 /*   audioPlayer.play(); //Återupptar musiken efter game over */

      //Animation
      endGameAnimation = false;
    let flashOverlay = document.getElementById('flash-overlay');
    let mainElement = document.querySelector('main'); 
    mainElement.classList.remove('grayscale'); //Tar bort gråfilter från main (skärmen) i css efter man fått Game Over.
    let background = document.getElementById("animated-background")
let ring = document.getElementById("ring")
background.classList.remove('blur');
ring.classList.remove('blur'); //Tar bort blur

    //Tar bort game over-texten
    document.getElementById('gameover').innerHTML = "<img src='/images/gameover2.png'>"; //Visar game over på skärmen
    let resultElement2 = document.getElementById('gameover');   
    resultElement2.style.opacity = 0; ///tar bort GAME OVER

    document.getElementById('pressreset').innerHTML = "<img src='/images/pressreset.png'>"; //Visar pressreset på skärmen
    let resetElement2 = document.getElementById('pressreset');   
    resetElement2.style.opacity = 0;
    resetElement2.style.display = "none";

    //Återaktiverar Go-knappen
    document.getElementById("goButton").disabled = false;

// Checkar om flashOverlay existerar.
if (flashOverlay) {
    // Gör flashOverlayen synlig.
    flashOverlay.style.opacity = '1';

    // Set a timeout to hide the overlay after a short period
    setTimeout(function() {
        flashOverlay.style.opacity = '0';
    }, 150); // Adjust the time for the length of the flash
}

    /* // Här anropar jag min variabel för att se till att det inte går att köra spelet när användaren trycker på reset knappen. Återigen användaren måste interagera med joysticken först för att kunna fortsätta. 
    isGameStarted = false; */


        // Här kallar jag på min funktion som är högst upp. Jag vill att när användaren trycker på återställningsknappen för att återställa resultatet, så ska det också gå att gömma händerna samtidigt.
        hideAllHands();

        document.getElementById('endGameMessage').style.display = 'none';
}

let resetElement = document.getElementById('pressreset'); 

// Funktionen skriver ut förlorarens namn
function endGame(loser) {
    let endGameMessageElement = document.getElementById('endGameMessage');
    
    // Den här if-satsen sköter ett meddelande.
    if (loser === 'Human') {
        // Gömmer meddelandet om spelaren förlorar
        endGameMessageElement.style.display = 'none';
    } else {
        // Visar meddelandet om spelaren vinner
        let message = "Congratz champ, you won! 😁";
        endGameMessageElement.innerText = message;
        endGameMessageElement.style.display = 'block';

        // Spelar upp vinnarvideo
        playWinnerVideo();
    }

        if (loser === 'Human') {
    document.getElementById("goButton").disabled = true;
    endGameAnimation = true

        //Animation
        //Flash
        let flashOverlay = document.getElementById("flash-overlay")
        if (flashOverlay) {
            flashOverlay.style.opacity = '1';
            setTimeout(function() {
                flashOverlay.style.opacity = '0';
            }, 150); //Vit flash
        }

        //Gråfilter/Blur
        let mainElement = document.querySelector('main'); //Lägger till gråfilter till main (skärmen) i css
        mainElement.classList.add('grayscale'); //Gör skärmen grå
        let background = document.getElementById("animated-background")
        let ring = document.getElementById("ring")//Lögger på blur
        background.classList.add('blur');//Lögger på blur
        ring.classList.add('blur'); //Lögger på blur
        /* ring.style.marginTop = "-98%" //zoomar ut lite för extra GTA-ig effekt som inte fungerar ejengklieng */

        //Darkness filter
        let darkAnimation = document.getElementById('dark-overlay');
        // Start dark animation with ease-in
        darkAnimation.style.transition = 'opacity 0.8s';
        darkAnimation.style.opacity = '0.6';
        // Flash dark animation for 1 second then step out instantly
        setTimeout(async function() {
            darkAnimation.style.transition = '5s';
            darkAnimation.style.opacity = '0';
        }, 500);

        //Ljud
        audioPlayer.pause()
        let gtaDeathSound = document.getElementById("gtaDeath") //Gameover-ljudeffekt
        let gameOverSound = document.getElementById("gameOverSound") //Gameover-låt
        let gameOverVoice = document.getElementById("gameOverVoice") //Gameover-röst
        gtaDeathSound.play()   

        //Allt som händer efter flash/grå
        setTimeout(function() { 
            
            //Ljud
            gameOverVoice.play()
            gameOverSound.play()
            gameOverSound.currentTime = 0; //Gör att ljudet spelas från början varje gång man får Game over och inte börjar mitt i från där det pausades.
            audioPlayer.currentTime = 0; 
            
            //Animation

            document.getElementById('gameover').innerHTML = "<img src='/images/gameover2.png'>"; //Visar game over på skärmen
            let resultElement2 = document.getElementById('gameover');   
            resultElement2.style.opacity = 1; ///SKRIVER GAME OVER
    
            setTimeout(function() { //Väntar tills press reset-animationen börjar
            
            //Animation
                document.getElementById('pressreset').innerHTML = "<img src='/images/reset.png'>"; //Visar pressreset på skärmen
                let resetElement2 = document.getElementById('pressreset');   
                resetElement2.style.opacity = 1; ///SKRIVER reset
                resetElement2.style.display = "block";
                resetElement2.style.animation = 'none';
                void resetElement2.offsetWidth; 
                resetElement2.style.animation = 'pressreset1 2s infinite'; ///SKRIVER UT reset
            }, 1000); //Delay för hjärnan om man har damp
    
        }, 1500); //Väntar på att tidigare animationer och ljud slutar innan Game over-animationerna börjar.
    
        } else {
            endGameAnimation = true
            audioPlayer.pause();
            playWinnerVideo();
        }
    } 


// Här hämtas musiken från HMTL.
document.getElementById('väljMusik').addEventListener('change', function(e) {
    let audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = this.value;
    audioPlayer.play();
});
// Här hämtas musikvolymen från HTML.
document.getElementById('volumeControl').addEventListener('input', function(e) {
    let volume = e.target.value;
    let audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = volume;
});


//DELAY FÖR KNAPPAR SÅ INTE ANIMATIONER / LJUD BREAKAR:
//GO-BTN:
document.getElementById('goButton').addEventListener('click', function() {
    this.disabled = true;
/* audioPlayer.play() */
    setTimeout(() => {
        this.disabled = false;
    }, 4200);
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

    revealMario()
})

function revealMario() {
    let currentImage = 1;
    const totalImages = 15;
    const revealTime = 100;
    const displayTime = 5000;

    const revealImage = () => {
        if (currentImage <= totalImages) {
            const bigMario = document.getElementById('bigMario')
            const img = document.getElementById(`mario${currentImage}`);
            bigMario.style.display = 'block'
            img.style.visibility = 'visible';
            currentImage++;
            setTimeout(revealImage, revealTime);
        } else {
            setTimeout(() => {
                for (let i = 1; i <= totalImages; i++) {
                    document.getElementById(`mario${i}`).style.visibility = 'hidden';
                    bigMario.style.display = 'none'
                }
            }, displayTime);
        }
    };

    revealImage();
}

document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector(".go-text img")
    setInterval(() => {
        image.src = "/images/go-2.png"

        setTimeout(() => {
            image.src = "/images/go-1.png"
        }, 100);
    }, 7000);
})