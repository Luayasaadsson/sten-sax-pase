let joystick = 0;

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

// början till självaste spelet. Kan vara bättre med array???
if (joystick === 0) {
    let rock = Math.floor(Math.random() * 3)

    if (rock === 0) {
        console.log("Player: Rock - Robot: Rock - Draw!")
    } else if (rock === 1) {
        console.log("Player: Rock - Robot: Paper - You Lose!")
    } else if (rock === 2) {
        console.log("Player: Rock - Robot: Scissor - You Win!")
    }
} else if  (joystick === 0) {
    let paper = Math.floor(Math.random() * 3)

    if (paper === 0) {
        console.log("Player: Paper - Robot: Rock - You Win!")
    } else if (paper === 1) {
        console.log("Player: Paper - Robot: Paper - Draw!")
    } else if (paper === 2) {
        console.log("Player: Paper - Robot: Scissor - You Lose!")
    }
} else if  (joystick === 0) {
    let scissor = Math.floor(Math.random() * 3)

    if (scissor === 0) {
        console.log("Player: Scissor - Robot: Rock - You Lose!")
    } else if (scissor === 1) {
        console.log("Player: Scissor - Robot: Paper - You Win!")
    } else if (scissor === 2) {
        console.log("Player: Scissor - Robot: Scissor - Draw!")
    }
}