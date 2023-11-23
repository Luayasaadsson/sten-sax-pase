

// Sparar ner namnen till huvudsidan
function sparaFormular(){ // Funktionen triggas av knappen Continue från secong page
    let humanName = document.getElementById('userNameInput').value;
    let robotName = document.getElementById('robotNameInput').value;

localStorage.setItem('mittHumanName', humanName);
localStorage.setItem('mittRobotName', robotName);

uppdatteraVisning(); //Kör i gång funktionen nedan

return false;

}

// Laddar upp namnen på huvudsidan
function uppdatteraVisning(){
    let sparatHumanName = localStorage.getItem('mittHumanName');
    let sparatRobotName = localStorage.getItem('mittRobotName');

    console.log(sparatHumanName)
    console.log(sparatRobotName)
    if (sparatHumanName + sparatRobotName){
        document.getElementById('user').innerText = sparatHumanName;
    }
    if (sparatRobotName){
        document.getElementById('robot').innerText = sparatRobotName;
    }
};


window.onload = uppdatteraVisning;









const avatarIds = ['demon', 'man', 'alien', 'ape'];

function sparaAvatar() {
    avatarIds.forEach(function(id) {
        let element = document.getElementById(id); 
            if (element) {
            element.addEventListener('click', function() {
            localStorage.setItem('sparadAvatar', this.src);
            });
        }
    });
}

function visaSparadAvatar() {
    let sparadUrl = localStorage.getItem('sparadAvatar');
    if (sparadUrl) {
        let avatarBild = document.getElementById('avatarBild');
        if (avatarBild) {
            avatarBild.src = sparadUrl;
        }
    }
}


window.onload = uppdatteraVisning;
document.addEventListener('DOMContentLoaded', (event) => {
    sparaAvatar();
    visaSparadAvatar();
});




const avatarRobotIds = ['terminator', 'r2d2', 'hal', 'kenny'];

function sparaRobotAvatar() {
    avatarRobotIds.forEach(function(id) {
        let element = document.getElementById(id); 
            if (element) {
            element.addEventListener('click', function() {
            localStorage.setItem('sparadRobotAvatar', this.src);
            });
        }
    });
}

function visaSparadRobotAvatar() {
    let sparadRobotUrl = localStorage.getItem('sparadRobotAvatar');
    if (sparadRobotUrl) {
        let avatarRobotBild = document.getElementById('avatarRobotBild');
        if (avatarRobotBild) {
            avatarRobotBild.src = sparadRobotUrl;
        }
    }
}





window.onload = uppdatteraVisning;
document.addEventListener('DOMContentLoaded', (event) => {
    sparaAvatar();
    visaSparadAvatar();
    sparaRobotAvatar();
    visaSparadRobotAvatar();

});

let firstPage = document.getElementById('firstPage')
let secondPage = document.getElementById('secondPage')
const startMusic = document.getElementById('startMusic')

function nextPage() {
    secondPage.style.display = 'block'
    firstPage.style.display = 'none'
    startMusic.play()
}
function prevPage() {
    secondPage.style.display = 'none'
    firstPage.style.display = 'block'
}

function howToPlay() {
    document.getElementById('howToPlayPopUp').style.display = 'block';
}

function howToPlayClose() {
    document.getElementById('howToPlayPopUp').style.display = 'none';
}


const rulePop = document.getElementById('popUp')

function rules() {
    rulePop.style.display = 'block'
}

function rulesClose() {
    rulePop.style.display = 'none'
}



//-----------------Visa och dolja popup fönster med input av player och robot namn--------------
const pName = document.querySelector(".playerName-btn");
const rName = document.querySelector(".robotName-btn");
const playerNamePopup = document.querySelector(".name-popup1");
const robotNamePopup = document.querySelector(".name-popup2");
const closeBtnL = document.querySelector(".close-symbol-left");
const closeBtnR = document.querySelector(".close-symbol-right");
const okBtn1 = document.querySelector(".ok-btn1");
const okBtn2 = document.querySelector(".ok-btn2");
const input1 = document.querySelector("#userNameInput");
const input2 = document.querySelector("#robotNameInput");
const contBtn = document.querySelector("#continueButton");

//Tar bort klassen "hidden" och fönstret syns
pName.addEventListener("click", ()=> {
    playerNamePopup.classList.remove("hidden");
})
rName.addEventListener("click", ()=> {
    robotNamePopup.classList.remove("hidden");
})
//Sätter tillbaka klassen "hidden" och fönstret syns inte igen
closeBtnL.addEventListener("click", ()=> {
    playerNamePopup.classList.add("hidden");
})
closeBtnR.addEventListener("click", ()=> {
    robotNamePopup.classList.add("hidden");
})
//Vad gör knapparna "OK"
okBtn1.addEventListener("click", ()=> {
    playerNamePopup.classList.add("hidden");
})
okBtn2.addEventListener("click", ()=> {
    robotNamePopup.classList.add("hidden");
})


input1.addEventListener('input', function () {
    // Kollar om det finns text i input
    if (input1.value.trim() !== '') {
        //Om ja - aktiverar knappen "Ok"
        okBtn1.removeAttribute('disabled');
    } else {
        //deaktiverar knappen
        okBtn1.setAttribute('disabled', 'disabled');
    }
});
//Samma sak för det andra knappen "Ok"
input2.addEventListener('input', function () {
    
    if (input2.value.trim() !== '') {
        
        okBtn2.removeAttribute('disabled');

    } else {
        
        okBtn2.setAttribute('disabled', 'disabled');
    }
});

function checkInputs() {
    // om båda input har textinnehåll då aktiveras knappen "continue"
    if (input1.value.trim() !== '' && input2.value.trim() !== '') {
      contBtn.removeAttribute('disabled');
    } else {
      // annars deaktiveras knappen
      contBtn.setAttribute('disabled', 'true');
    }
  }
  input1.addEventListener('input', checkInputs);
    input2.addEventListener('input', checkInputs);




