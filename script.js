let joystick = 1;

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


// början till självaste spelet.
//0 paper
//1 scissor
//2 rock

function spel () {
    let robot = Math.floor(Math.random() * 3)
    console.log(robot)

    if (joystick === robot) {
        document.getElementById('result').innerHTML = "DRAW"
        console.log("draw");
    }else if ((joystick === 0 && robot === 2) || (joystick === 1 && robot === 0) || (joystick === 2 && robot === 1)) {
        console.log("win");
        document.getElementById('result').innerHTML = "WIN"
    } else {
        console.log("lose");
        document.getElementById('result').innerHTML = "LOSE"
    }

    setTimeout(() => {
       document.getElementById('result').innerHTML = ''; 
    }, 2000);
}